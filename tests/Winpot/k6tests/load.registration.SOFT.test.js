// @ts-nocheck
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Counter } from 'k6/metrics';
import exec from 'k6/execution';

/* ===== FIXED LOAD: ~5 users in ~20s =====
   1 итерация каждые 4 секунды → за 20s получится ровно 5 попыток.
*/
export const options = {
  discardResponseBodies: true,
  scenarios: {
    load_5_in_20s: {
      executor: 'constant-arrival-rate',
      rate: 2,                 // 1 итерация ...
      timeUnit: '4s',          // ... каждые 4 секунды
      duration: '20s',         // итого ~5 итераций
      preAllocatedVUs: 3,      // с запасом
      maxVUs: 5,
      tags: { step: 'steady' },
    },
  },
  thresholds: {
    signup_success_rate: ['rate>0.80'],  // хотим ≥80% успешных
    http_req_duration: ['p(95)<2000'],   // p95 < 2s
  },
};

/* ===== METRICS ===== */
const signupSuccess = new Rate('signup_success_rate');
const statusCounter = new Counter('signup_status_count');
const createdCount  = new Counter('signup_created');
const failedCount   = new Counter('signup_failed');

/* ===== HELPERS ===== */
function rnd(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min; }
function genEmail(){ return `wiztest+${String(rnd(0, 999999)).padStart(6,'0')}@gmail.com`; }
function genPhoneMX_78(){ let t=''; for (let i=0;i<8;i++) t+=rnd(0,9); return `+5278${t}`; }
function uuid4(){
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c=>{
    const r = Math.floor(Math.random()*16), v = c==='x' ? r : (r&0x3)|0x8; return v.toString(16);
  });
}
const FIRST=['Carlos','Lucia','Miguel','Sofia','Diego','Elena','Pablo','Ana','Javier','Ines'];
const LAST =['Garcia','Martinez','Lopez','Sanchez','Gonzalez','Perez','Ruiz','Diaz','Fernandez','Moreno'];
function pick(a){ return a[rnd(0, a.length - 1)]; }

/* ===== CONSTANTS ===== */
const BASE_URL = 'https://api.stage-winpot.mx';
const URL      = `${BASE_URL}/player/crm/sign-up`;
const PASSWORD = 'Qwerty1!';

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

  return {
    email: genEmail(),
    password: PASSWORD,
    passwordConfirmation: PASSWORD,
    phoneNumber: genPhoneMX_78(),      // +5278XXXXXXXX
    firstName, lastName,
    day, month, year,
    termsAccepted: true,
    privacyAccepted: true,
    product: 1,
    locale: 'es',
    siteId: 'f15c56e2-baf1-4a31-ba50-4f95eaff2c18',
    currency: 'MXN',
    // чтобы backend не падал на affiliateInformation = null
    affiliateInformation: {
      appsFlyerId: uuid4(),
      mediaSource: 'k6-load',
      campaign: 'signup-flat-5-in-20s',
      adset: 'k6',
      ad: 'k6',
      clickId: uuid4(),
      // affiliateId: 'опционально',
    },
  };
}

/* ===== TEST ===== */
export default function () {
  // небольшой джиттер, чтобы запросы не били ровно в один тик
  sleep(Math.random() * 0.15);

  const payload = makePayload();
  const res = http.post(URL, JSON.stringify(payload), { headers });

  const ok = res.status === 200 || res.status === 201;
  signupSuccess.add(ok, { step: 'steady' });
  statusCounter.add(1, { status: String(res.status) });

  if (ok) {
    createdCount.add(1);
    check(res, { created: r => [200,201].includes(r.status) });
    console.info(`OK ${res.status} email=${payload.email} phone=${payload.phoneNumber}`);
  } else {
    failedCount.add(1);
    let msg = '', details = '';
    try { const j = res.json(); msg = j?.message || ''; details = j?.validation || j?.errors ? JSON.stringify(j.validation || j.errors) : ''; } catch {}
    console.warn(`FAIL ${res.status} email=${payload.email} phone=${payload.phoneNumber}` +
      (msg ? ` | msg="${msg}"` : '') + (details ? ` | details=${details}` : ''));
  }
}

/* ===== OPTIONAL: итоговая сводка в конце ===== */
export function teardown() {
  console.log('--- Test finished: target ≈ 5 signups in 20s ---');
}
