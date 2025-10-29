import http from 'k6/http';
import { check } from 'k6';
import { scenario } from 'k6/execution';

// === параметры нагрузки (можно менять через ENV) ===
const RATE     = Number(__ENV.RATE || '6');   // rps
const DURATION = __ENV.DURATION || '90s';     // короче 10 минут
const TIMEUNIT = __ENV.TIMEUNIT || '1s';

const TOLERATE_429 = false; // true → 429 не считаем ошибкой
if (TOLERATE_429) {
  http.setResponseCallback(http.expectedStatuses(200, 201, 429));
}

export const options = {
  scenarios: {
    steady_load: {
      executor: 'constant-arrival-rate',
      rate: RATE,
      timeUnit: TIMEUNIT,
      duration: DURATION,
      preAllocatedVUs: Math.max(40, RATE * 4),
      maxVUs: Math.max(200, RATE * 10),
      gracefulStop: '15s',
    },
  },
  thresholds: {
    http_req_failed:   ['rate<0.01'],
    http_req_duration: ['p(95)<1000'],
  },
};

// === данные ===
const PASSWORD = 'Qwerty1!';
const RAW_EMAILS = `
wiztest+711573@gmail.com wiztest+351654@gmail.com wiztest+837919@gmail.com wiztest+826429@gmail.com wiztest+695484@gmail.com
wiztest+682456@gmail.com
 wiztest+504853@gmail.com
wiztest+997600@gmail.com
 wiztest+562000@gmail.com
 wiztest+449796@gmail.com
 wiztest+554759@gmail.com
 wiztest+416387@gmail.com
 wiztest+641833@gmail.com
 wiztest+586961@gmail.com
 wiztest+370627@gmail.com
 wiztest+954053@gmail.com
 wiztest+206387@gmail.com
wiztest+654564@gmail.com
 wiztest+617522@gmail.com
 wiztest+571572@gmail.com
wiztest+470746@gmail.com
 wiztest+285611@gmail.com
 wiztest+634400@gmail.com
wiztest+446848@gmail.com
wiztest+592283@gmail.com
wiztest+042675@gmail.com
wiztest+006442@gmail.com
 wiztest+544095@gmail.com
wiztest+666683@gmail.com
wiztest+591502@gmail.com
wiztest+305694@gmail.com
wiztest+104037@gmail.com
wiztest+426580@gmail.com
wiztest+565027@gmail.com
wiztest+374682@gmail.com
wiztest+713663@gmail.com
wiztest+058382@gmail.com
wiztest+374209@gmail.com
wiztest+313421@gmail.com
wiztest+404121@gmail.com
wiztest+251025@gmail.com
wiztest+813520@gmail.com
wiztest+097552@gmail.com
wiztest+184137@gmail.com
wiztest+549504@gmail.com
wiztest+514580@gmail.com
wiztest+884177@gmail.com
wiztest+521681@gmail.com
wiztest+119598@gmail.com
 wiztest+312628@gmail.com wiztest+787281@gmail.com
wiztest+242791@gmail.com
wiztest+502582@gmail.com
wiztest+379542@gmail.com
wiztest+429785@gmail.com
wiztest+323614@gmail.com
wiztest+044914@gmail.com
wiztest+393068@gmail.com
wiztest+951193@gmail.com
wiztest+354971@gmail.com
wiztest+614595@gmail.com
wiztest+789129@gmail.com
wiztest+405902@gmail.com
wiztest+588738@gmail.com
wiztest+769445@gmail.com
wiztest+517167@gmail.com
wiztest+327660@gmail.com
wiztest+290101@gmail.com
wiztest+641586@gmail.com
wiztest+636413@gmail.com
wiztest+096258@gmail.com
wiztest+262598@gmail.com
 wiztest+746701@gmail.com wiztest+686848@gmail.com
wiztest+547308@gmail.com
 wiztest+301428@gmail.com
wiztest+720138@gmail.com
wiztest+500448@gmail.com
wiztest+828961@gmail.com
wiztest+946042@gmail.com
wiztest+178447@gmail.com
wiztest+710822@gmail.com
wiztest+685768@gmail.com
wiztest+891792@gmail.com
wiztest+889022@gmail.com
wiztest+846611@gmail.com
`;
const USERS = Array.from(new Set(RAW_EMAILS.split(/\s+/).map(s => s.trim()).filter(Boolean)));

// === API ===
const BASE_URL = 'https://api.stage-winpot.mx';
const LOGIN_PATH = '/player/crm/login';
const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json, text/plain, */*',
  'Origin': 'https://stage-winpot.mx',
  'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36',
  'x-platform': 'web-android',
  'x-site-id': 'f15c56e2-baf1-4a31-ba50-4f95eaff2c18',
};

// === выбор пользователя без повторов до «обхода» всего списка ===
// используем глобальный номер итерации сценария -> round-robin по USERS
function pickUniqueUser() {
  if (USERS.length === 0) throw new Error('Пустой список USERS');
  const idx = Number(scenario.iterationInTest % USERS.length);
  return USERS[idx];
}

// мягкий ретрай на 429/5xx (чтобы не шуметь лишними фейлами)
const MAX_RETRIES = 1;
const BACKOFF_BASE = 0.3;   // сек
const BACKOFF_JITTER = 0.2; // сек

function doLogin(email, password) {
  const url = `${BASE_URL}${LOGIN_PATH}`;
  const body = JSON.stringify({ email, password });

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const res = http.post(url, body, { headers, tags: { name: 'crm_login' } });
    if (res.status === 200 || res.status === 201) return res;

    if ((res.status === 429 || (res.status >= 500 && res.status <= 599)) && attempt < MAX_RETRIES) {
      // короткий джиттер, без sleep в steady CAR не обязателен, но допустим
      const wait = BACKOFF_BASE + Math.random() * BACKOFF_JITTER;
      // eslint-disable-next-line no-undef
      sleep(wait);
      continue;
    }
    return res;
  }
}

export default function () {
  const email = pickUniqueUser();
  const res = doLogin(email, PASSWORD);

  // лаконичный лог: только статус и email
  console.log(`[${res.status}] ${email}`);

  // базовые проверки
  let json = null;
  try { json = res.json(); } catch (_) {}
  check(res, {
    'status 200/201': (r) => r.status === 200 || r.status === 201,
    'json parseable': (_) => json !== null,
  });
}
