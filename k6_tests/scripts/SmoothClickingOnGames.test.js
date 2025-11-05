import http from 'k6/http';
import { check, sleep } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.4/index.js';

// ── НАГРУЗКА: 1 регистрация/сек • 30 сек (≈30 юзеров)
export const options = {
  scenarios: {
    signup_then_game: {
      executor: 'constant-arrival-rate',
      rate: 1,           // 1 итерация
      timeUnit: '1s',    // каждую секунду
      duration: '30s',   // всего 30 сек
      preAllocatedVUs: 5,
      maxVUs: 50,
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.2'],
    'checks{step:signup}': ['rate>0.8'],
    'checks{step:game}': ['rate>0.8'],
  },
};

// ── КОНСТАНТЫ DEV
const BASE = 'https://api.luckystake.dev';
const SITE_ID = '5138631f-8d60-4327-b46c-8a4e41d68c93';
const SIGN_UP_URL = `${BASE}/player/crm/sign-up`;
const LOGIN_URL   = `${BASE}/player/crm/login`;
const GAME_URL    = `${BASE}/games/link/3765?platform=2&locale=en&country_code=US&currency=GC&p=%2F`;

const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json, text/plain, */*',
  'Origin': 'https://luckystake.dev',
  'Referer': 'https://luckystake.dev/',
  'x-platform': 'web',
  'x-site-id': SITE_ID,
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
};

// Партнёрка — оставляю, как в твоём примере (можно отключить)
const USE_AFFILIATE = true;
const AFF = {
  affiliateId: '02C',
  sourceId: '1',
  product: 1,
  couponCode: '',
  var1: '{var1}',
  var2: '{var2}',
  var3: '{var3}',
  var4: '{var4}',
  var5: '{var5}',
  offer: '{offer}',
};

// ── HELPERS
function j(res) { try { return res.json(); } catch { return null; } }
function short(s, n = 160) { return String(s || '').replace(/\s+/g, ' ').slice(0, n); }
function extractToken(res) {
  const body = j(res);
  if (body?.token) return body.token;
  if (body?.accessToken) return body.accessToken;
  if (body?.access_token) return body.access_token;

  // из куки
  const names = ['AuthorizationToken', 'Authorization', 'token', 'accessToken', 'access_token'];
  for (const n of names) {
    const arr = res.cookies?.[n];
    if (Array.isArray(arr) && arr.length) {
      let v = decodeURIComponent(arr[arr.length - 1].value || '');
      if (v.toLowerCase().startsWith('bearer%20')) v = v.slice(7);
      else if (v.toLowerCase().startsWith('bearer ')) v = v.slice(7);
      if (v) return v;
    }
  }
  return null;
}

// ── ТЕСТ
export default function () {
  // уникальные данные
  const rnd = Math.floor(10000 + Math.random() * 90000);
  const uniq = `${Date.now()}_${rnd}_${__VU}_${__ITER}`;
  const email = `deshi_basara${uniq}@gmail.com`;
  const password = 'Test12345!';
  const nick = (`u${uniq}`).substring(0, 20);

  // payload из твоего образца + обязательные поля, что уже просил бек
  const payload = {
    email,
    password,
    confirmPassword: password,
    nickName: nick,
    firstName: 'Load',
    lastName: 'Tester',
    birthDate: '1995-01-01T00:00:00.000Z',
    gender: 'other',
    citizenship: 'US',
    address: {
      addressCountryAlfa2: 'US',
      city: 'Miami',
      state: 'FL',
      street: 'Ocean Drive',
      zipCode: '33139',
    },
    language: 'ru',
    currency: 'GC',
    // иногда бек ждёт эти флаги — безопасно добавить
    age_confirmed: true,
    terms_accepted: true,
    platform: 2,
  };
  if (USE_AFFILIATE) payload.affiliateInformation = AFF;

  // ── SIGN-UP
  const sRes = http.post(SIGN_UP_URL, JSON.stringify(payload), { headers: HEADERS, tags: { step: 'signup' } });
  let token = extractToken(sRes);

  // если уже существует — логинимся теми же данными
  if (sRes.status === 409 || (!token && (sRes.status === 200 || sRes.status === 201))) {
    const lRes = http.post(
      LOGIN_URL,
      JSON.stringify({ email, password }),
      { headers: HEADERS, tags: { step: 'login' } },
    );
    if (lRes.status === 200 || lRes.status === 201) token = extractToken(lRes);
    else console.log(`[LOGIN ERR ${lRes.status}] email=${email} :: ${short(lRes.body)}`);
  }

  // лог по регистрации
  let pid = '-'; let msg = '';
  const body = j(sRes);
  pid = body?.id || body?.playerId || '-';
  msg = body?.message || body?.error || (Array.isArray(body?.validation) ? body.validation.join(', ') : '') || '';
  const okSignup = check(sRes, { 'signup 200/201/409': (r) => [200, 201, 409].includes(r.status) }, { step: 'signup' });

  if (okSignup) {
    console.log(`[SIGNUP ${sRes.status}] email=${email} pid=${pid} ${Math.round(sRes.timings.duration)}ms`);
  } else {
    if (!msg) msg = short(sRes.body);
    console.log(`[SIGNUP ERR ${sRes.status}] email=${email} :: ${msg}`);
  }

  // ── GAME (только если есть токен)
  if (token) {
    const gRes = http.get(GAME_URL, {
      headers: { ...HEADERS, Authorization: `Bearer ${token}` },
      tags: { step: 'game' },
    });
    const okGame = check(gRes, { 'game 200': (r) => r.status === 200 }, { step: 'game' });
    if (okGame) {
      console.log(`[GAME OK 200] ${Math.round(gRes.timings.duration)}ms`);
    } else {
      console.log(`[GAME ERR ${gRes.status}] :: ${short(gRes.body)}`);
    }
  } else {
    console.log('[GAME SKIP] нет токена после sign-up/login');
  }

  // лёгкий джиттер чтобы сгладить rps
  sleep(0.2 + Math.random() * 0.4);
}

// ── Компактный summary
export function handleSummary(data) {
  return { stdout: textSummary(data, { indent: ' ', enableColors: true }) };
}
