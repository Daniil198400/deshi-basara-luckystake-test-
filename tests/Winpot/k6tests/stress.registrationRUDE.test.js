// @ts-nocheck
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Counter } from 'k6/metrics';
import exec from 'k6/execution';

/* ===== ФИКСИРОВАННЫЕ НАСТРОЙКИ (env НЕ нужны) ===== */
const BASE_URL   = 'https://api.stage-winpot.mx';
const URL        = `${BASE_URL}/player/crm/sign-up`;

const PASSWORD     = 'Qwerty1!';   // пароль для регистрации
const SCALE        = 1;            // множитель нагрузки
const AVG_IT_SEC   = 2.0;          // средняя длительность итерации (для расчёта VU)
const AFFILIATE_ID = '';           // при необходимости можно вписать ID (строкой)
const RETRY_429    = true;         // один короткий ретрай при 429

// Целочисленные таргеты (k6 требует int)
const WARM_RPS  = Math.max(1, Math.round(1 * SCALE)); // 30s @ ~1 rps
const SPIKE_RPS = Math.max(1, Math.round(3 * SCALE)); // 20s @ ~3 rps (умеренно)
const REC_RPS   = Math.max(1, Math.round(1 * SCALE)); // 40s @ ~1 rps

// Расчёт VU с запасом
const MAX_RPS = Math.max(WARM_RPS, SPIKE_RPS, REC_RPS);
const PRE_VUS = Math.ceil(MAX_RPS * AVG_IT_SEC * 1.2);
const MAX_VUS = Math.ceil(PRE_VUS * 1.5);

export const options = {
  discardResponseBodies: true,
  scenarios: {
    warm: {
      executor: 'constant-arrival-rate',
      rate: WARM_RPS, timeUnit: '1s', duration: '30s',
      preAllocatedVUs: PRE_VUS, maxVUs: MAX_VUS, tags: { step: 'warm' },
    },
    spike: {
      executor: 'constant-arrival-rate',
      rate: SPIKE_RPS, timeUnit: '1s', duration: '20s',
      preAllocatedVUs: PRE_VUS, maxVUs: MAX_VUS, tags: { step: 'spike' },
      startTime: '30s',
    },
    recover: {
      executor: 'constant-arrival-rate',
      rate: REC_RPS, timeUnit: '1s', duration: '40s',
      preAllocatedVUs: PRE_VUS, maxVUs: MAX_VUS, tags: { step: 'recover' },
      startTime: '50s',
    },
  },
  thresholds: {
    // цели по качеству (можно подстроить)
    'signup_success_rate{step:warm}':    ['rate>0.80'],
    'signup_success_rate{step:spike}':   ['rate>0.30'],
    'signup_success_rate{step:recover}': ['rate>0.80'],
    http_req_duration: ['p(95)<2000'],
  },
};

/* ===== Метрики ===== */
const signupSuccess = new Rate('signup_success_rate');
const rate429       = new Rate('signup_429_rate');
const statusCounter = new Counter('signup_status_count');

/* ===== Хелперы ===== */
function rnd(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min; }
function genEmail(){ return `wiztest+${String(rnd(0, 999999)).padStart(6,'0')}@gmail.com`; }
function genPhoneMX_78(){ let t=''; for (let i=0;i<8;i++) t+=rnd(0,9); return `+5278${t}`; }
function uuid4(){
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.floor(Math.random()*16), v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
const FIRST = ['Carlos','Lucia','Miguel','Sofia','Diego','Elena','Pablo','Ana','Javier','Ines'];
const LAST  = ['Garcia','Martinez','Lopez','Sanchez','Gonzalez','Perez','Ruiz','Diaz','Fernandez','Moreno'];
function pick(a){ return a[rnd(0, a.length - 1)]; }

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Origin': 'https://stage-winpot.mx',
  'User-Agent': 'k6',
  'x-platform': 'web-android',
  'x-site-id': 'f15c56e2-baf1-4a31-ba50-4f95eaff2c18',
};

function makePayload(){
  const firstName = pick(FIRST);
  const lastName  = pick(LAST);
  const year  = rnd(1990, 2003);
  const month = String(rnd(1,12)).padStart(2,'0');
  const day   = String(rnd(1,28)).padStart(2,'0');

  const affiliateInformation = {
    appsFlyerId: uuid4(),
    mediaSource: 'k6-load',
    campaign: 'signup-stress-fixed',
    adset: 'k6',
    ad: 'k6',
    clickId: uuid4(),
  };
  if (AFFILIATE_ID) affiliateInformation.affiliateId = AFFILIATE_ID;

  return {
    email: genEmail(),
    password: PASSWORD,
    passwordConfirmation: PASSWORD,
    phoneNumber: genPhoneMX_78(),
    firstName, lastName,
    day, month, year,
    termsAccepted: true,
    privacyAccepted: true,
    product: 1,
    locale: 'es',
    siteId: 'f15c56e2-baf1-4a31-ba50-4f95eaff2c18',
    currency: 'MXN',
    affiliateInformation,
  };
}



//test

export default function () {
  // небольшой джиттер
  if (Math.random() < 0.4) sleep(Math.random() * 0.1);

  const step = exec.scenario.name; // warm | spike | recover
  const payload = makePayload();
  let res = http.post(URL, JSON.stringify(payload), { headers });

  // один короткий ретрай при 429
  if (RETRY_429 && res.status === 429) {
    const ra = Number(res.headers['Retry-After'] || 0);
    const pause = Math.min(Math.max(ra, 0.2), 0.5);
    sleep(pause);
    res = http.post(URL, JSON.stringify(payload), { headers });
  }

  const ok = res.status === 200 || res.status === 201;

  statusCounter.add(1, { status: String(res.status), step });
  signupSuccess.add(ok, { step });
  rate429.add(res.status === 429, { step });

  if (ok) {
    check(res, { created: r => [200,201].includes(r.status) });
    console.info(`[${step}] ✅ OK ${res.status} email=${payload.email} phone=${payload.phoneNumber}`);
  } else {
    let msg = '', details = '';
    try {
      const j = res.json();
      msg = j?.message || '';
      details = j?.validation || j?.errors ? JSON.stringify(j.validation || j.errors) : '';
    } catch (_) {}
    console.warn(
      `[${step}] ❌ FAIL ${res.status} email=${payload.email} phone=${payload.phoneNumber}` +
      (msg ? ` | msg="${msg}"` : '') +
      (details ? ` | details=${details}` : '')
    );
  }
}
