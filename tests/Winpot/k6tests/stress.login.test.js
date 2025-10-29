import http from 'k6/http';
import { check, sleep } from 'k6';
import { scenario } from 'k6/execution';
import { Rate } from 'k6/metrics';

// ── МЕТРИКИ ────────────────────────────────────────────────────────────────────
const serverErrors = new Rate('server_errors'); // 5xx
const tooMany429   = new Rate('too_many_429');  // 429

// ── СЦЕНАРИЙ: только всплеск VU (короче, жёсткие спайки) ──────────────────────
export const options = {
  scenarios: {
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
    },
  },
  thresholds: {
    http_req_failed:   ['rate<0.20'],
    http_req_duration: ['p(95)<3000'],
    server_errors:     ['rate<0.10'],
    // too_many_429:   ['rate<0.50'], // включи, если хочешь контролить долю 429
  },
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
  'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36',
  'x-platform': 'web-android',
  'x-site-id': 'f15c56e2-baf1-4a31-ba50-4f95eaff2c18',
};

// ── Глобальный выбор e-mail: новый на каждую итерацию; после конца — цикл ─────
function pickNextUserCyclic() {
  const i = Number(scenario.iterationInTest);
  return USERS[i % USERS.length];
}

// ── Логика логина с мягкими ретраями для 429/5xx ──────────────────────────────
const MAX_RETRIES = 2;
const BACKOFF_BASE = 0.3;
const BACKOFF_JITTER = 0.2;

function doLogin(email, password) {
  const url = `${BASE_URL}${LOGIN_PATH}`;
  const body = JSON.stringify({ email, password });

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const res = http.post(url, body, { headers, tags: { name: 'crm_login' } });

    // метрики
    serverErrors.add(res.status >= 500 && res.status <= 599 ? 1 : 0);
    tooMany429.add(res.status === 429 ? 1 : 0);

    if (res.status === 200 || res.status === 201) return res;

    if ((res.status === 429 || (res.status >= 500 && res.status <= 599)) && attempt < MAX_RETRIES) {
      const wait = BACKOFF_BASE * Math.pow(2, attempt) + Math.random() * BACKOFF_JITTER;
      sleep(wait);
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

  sleep(0.2 + Math.random() * 0.3); // небольшой джиттер
}
