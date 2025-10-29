import http from 'k6/http';
import { check, sleep } from 'k6';
import { scenario } from 'k6/execution';
import { Rate } from 'k6/metrics';

// ── МЕТРИКИ ────────────────────────────────────────────────────────────────────
const serverErrors = new Rate('server_errors'); // 5xx
const tooMany429   = new Rate('too_many_429');  // 429

// ── СЦЕНАРИИ ──────────────────────────────────────────────────────────────────
export const options = {
  scenarios: {
    // Спайк нагрузки
    surge_vus: {
      executor: 'ramping-vus',
      startTime: '0s',
      startVUs: 1,
      stages: [
        { duration: '10s', target: 40 }, // резкий рост
        { duration: '10s', target: 80 }, // пик
        { duration: '10s', target: 20 }, // просадка
        { duration: '10s', target: 0  }, // сворачивание
      ],
      gracefulRampDown: '5s',
      gracefulStop: '5s',
      tags: { phase: 'surge' },
    },

    // Проверочный бёрст после длинной паузы (даём лимитеру «остыть»)
    verify_burst: {
      executor: 'constant-arrival-rate',
      startTime: '120s',          // ~80s «тишины» после спайка
      duration: '10s',
      rate: 2,                    // ~20 логинов за 10s
      timeUnit: '1s',
      preAllocatedVUs: 20,
      maxVUs: 20,
      tags: { phase: 'verify' },
    },
  },

  // Раздельные пороги по фазам
  thresholds: {
    'http_req_failed{phase:surge}':  ['rate<0.70'], // во время удара 429 допустимы
    'http_req_failed{phase:verify}': ['rate==0'],   // после паузы фейлов быть не должно
    http_req_duration:               ['p(95)<3000'],
    server_errors:                   ['rate<0.10'],
    'too_many_429{phase:verify}':    ['rate==0'],   // в проверке 429 не допускаем
  },

  // Меньше давления на сеть/GC
  discardResponseBodies: true,
};

// ── ДАННЫЕ ─────────────────────────────────────────────────────────────────────
const PASSWORD = 'Qwerty1!';
const RAW_EMAILS = `
wiztest+711573@gmail.com wiztest+351654@gmail.com wiztest+837919@gmail.com wiztest+826429@gmail.com wiztest+695484@gmail.com
wiztest+682456@gmail.com wiztest+504853@gmail.com wiztest+997600@gmail.com wiztest+562000@gmail.com wiztest+449796@gmail.com
wiztest+554759@gmail.com wiztest+416387@gmail.com wiztest+641833@gmail.com wiztest+586961@gmail.com wiztest+370627@gmail.com
wiztest+954053@gmail.com wiztest+206387@gmail.com wiztest+654564@gmail.com wiztest+617522@gmail.com wiztest+571572@gmail.com
wiztest+470746@gmail.com wiztest+285611@gmail.com wiztest+634400@gmail.com wiztest+446848@gmail.com wiztest+592283@gmail.com
wiztest+042675@gmail.com wiztest+006442@gmail.com wiztest+544095@gmail.com wiztest+666683@gmail.com wiztest+591502@gmail.com
wiztest+305694@gmail.com wiztest+104037@gmail.com wiztest+426580@gmail.com wiztest+565027@gmail.com wiztest+374682@gmail.com
wiztest+713663@gmail.com wiztest+058382@gmail.com wiztest+374209@gmail.com wiztest+313421@gmail.com wiztest+404121@gmail.com
wiztest+251025@gmail.com wiztest+813520@gmail.com wiztest+097552@gmail.com wiztest+184137@gmail.com wiztest+549504@gmail.com
wiztest+514580@gmail.com wiztest+884177@gmail.com wiztest+521681@gmail.com wiztest+119598@gmail.com wiztest+312628@gmail.com
wiztest+787281@gmail.com wiztest+242791@gmail.com wiztest+502582@gmail.com wiztest+379542@gmail.com wiztest+429785@gmail.com
wiztest+323614@gmail.com wiztest+044914@gmail.com wiztest+393068@gmail.com wiztest+951193@gmail.com wiztest+354971@gmail.com
wiztest+614595@gmail.com wiztest+789129@gmail.com wiztest+405902@gmail.com wiztest+588738@gmail.com wiztest+769445@gmail.com
wiztest+517167@gmail.com wiztest+327660@gmail.com wiztest+290101@gmail.com wiztest+641586@gmail.com wiztest+636413@gmail.com
wiztest+096258@gmail.com wiztest+262598@gmail.com wiztest+746701@gmail.com wiztest+686848@gmail.com wiztest+547308@gmail.com
wiztest+301428@gmail.com wiztest+720138@gmail.com wiztest+500448@gmail.com wiztest+828961@gmail.com wiztest+946042@gmail.com
wiztest+178447@gmail.com wiztest+710822@gmail.com wiztest+685768@gmail.com wiztest+891792@gmail.com wiztest+889022@gmail.com
wiztest+846611@gmail.com
`;
const USERS = Array.from(new Set(RAW_EMAILS.split(/\s+/).map(s => s.trim()).filter(Boolean)));

// ── API ────────────────────────────────────────────────────────────────────────
const BASE_URL = 'https://api.stage-winpot.mx';
const LOGIN_PATH = '/player/crm/login';
const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json, text/plain, */*',
  'Origin': 'https://stage-winpot.mx',
  // слегка варьируем UA (по желанию можно убрать)
  'User-Agent': `k6-mobile/${__ENV.RUN_ID || 'default'}`,
  'x-platform': 'web-android',
  'x-site-id': 'f15c56e2-baf1-4a31-ba50-4f95eaff2c18',
};

// ── Выбор e-mail (циклично) ────────────────────────────────────────────────────
function pickNextUserCyclic() {
  const i = Number(scenario.iterationInTest);
  return USERS[i % USERS.length];
}

// ── Ретраи с уважением Retry-After ────────────────────────────────────────────
const MAX_RETRIES = 1;     // было 2
const BACKOFF_BASE = 0.8;  // было 0.3
const BACKOFF_JITTER = 0.4;
const BACKOFF_CAP = 4;

function respectRetryAfter(res) {
  const h = res.headers || {};
  const ra = h['Retry-After'] ?? h['retry-after'];
  if (!ra) return false;

  let wait = 0;
  const n = Number(ra);
  if (!Number.isNaN(n)) {
    wait = n;
  } else {
    const t = Date.parse(ra);
    if (!Number.isNaN(t)) wait = Math.max(0, (t - Date.now()) / 1000);
  }
  if (wait > 0) {
    sleep(Math.min(wait + Math.random(), BACKOFF_CAP));
    return true;
  }
  return false;
}

function doLogin(email, password) {
  const url = `${BASE_URL}${LOGIN_PATH}`;
  const body = JSON.stringify({ email, password });

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const res = http.post(url, body, { headers, tags: { name: 'crm_login' } });

    // метрики
    serverErrors.add(res.status >= 500 && res.status <= 599 ? 1 : 0);
    tooMany429.add(res.status === 429 ? 1 : 0);

    if (res.status === 200 || res.status === 201) return res;

    const retryable = res.status === 429 || (res.status >= 500 && res.status <= 599);
    if (retryable && attempt < MAX_RETRIES) {
      if (!respectRetryAfter(res)) {
        const wait = Math.min(BACKOFF_BASE * Math.pow(2, attempt) + Math.random() * BACKOFF_JITTER, BACKOFF_CAP);
        sleep(wait);
      }
      continue;
    }
    return res;
  }
}

export default function () {
  const email = pickNextUserCyclic();
  const res = doLogin(email, PASSWORD);

  console.log(`[${res.status}] ${email}`);

  let json = null;
  try { json = res.json(); } catch (_) {}

  check(res, {
    'status 200/201': r => r.status === 200 || r.status === 201,
    'json parseable': () => json !== null,
  });

  // небольшой «think time» и джиттер между попытками
  sleep(0.3 + Math.random() * 0.4);
}
