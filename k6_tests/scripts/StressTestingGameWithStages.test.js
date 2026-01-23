import http from 'k6/http';
import { check, sleep, fail } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.4/index.js';

/**
 * ───────────────── ФАЗЫ ─────────────────
 * 1) setup(): последовательно регистрируем N пользователей, ВСЁ логируем.
 * 2) stages: прожарка игры только этими пользователями.
 */
export const options = {
  setupTimeout: '15m', // даём времени нормально нарегистрировать
  stages: [
    { duration: '30s',  target: 50  },
    { duration: '1m',   target: 150 },
    { duration: '2m',   target: 300 },
    { duration: '2m',   target: 300 },
    { duration: '1m',   target: 0   },
  ],
  thresholds: {
    http_req_failed: ['rate<0.25'],
    http_req_duration: ['p(95)<3000', 'p(99)<6000'],
    'checks{step:game}': ['rate>0.75'],
  },
  discardResponseBodies: false, // оставим тело для логов, тебе надо видеть детали
};

// ─────────────── КОНСТАНТЫ DEV ───────────────
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

const REQ_TIMEOUT = '10s';          // fail-fast, чтобы не висеть
const SYNC_WAIT_SEC = 2;            // пауза перед кликом, как просил
const NUM_USERS = 10;              // СКОЛЬКО зарегать
const RETRIES    = 2;               // сколько раз ретраить 429/5xx/timeout при sign-up
const PWD        = 'Test12345!';    // общий пароль

// ─────────────── HELPERS ───────────────
function j(res) { try { return res.json(); } catch { return null; } }
function short(s, n = 200) { return String(s || '').replace(/\s+/g, ' ').slice(0, n); }
function backoff(attempt) {
  const t = 0.2 * Math.pow(2, attempt) * (0.8 + Math.random() * 0.4);
  sleep(t);
}
function extractToken(res) {
  const body = j(res);
  if (body?.token) return body.token;
  if (body?.accessToken) return body.accessToken;
  if (body?.access_token) return body.access_token;
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
function makeSignupPayload(email, password, nick) {
  return {
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
    age_confirmed: true,
    terms_accepted: true,
    platform: 2,
    //...(USE_AFFILIATE ? { affiliateInformation: DEFAULT_AFFILIATE } : {}),
    // партнёрка при необходимости — раскомментируй:
    affiliateInformation: { affiliateId:'02C', sourceId:'1', product:1, couponCode:'', var1:'{var1}', var2:'{var2}', var3:'{var3}', var4:'{var4}', var5:'{var5}', offer:'{offer}' },
  };
}

// ─────────────── ФАЗА 1: последовательная регистрация с ПОСТРОЧНЫМИ логами ───────────────
export function setup() {
  const users = []; // { email, password, token? }

  const startedAt = Date.now();
  for (let i = 0; i < NUM_USERS; i++) {
    const uid = `${Date.now()}_${i}_${Math.floor(Math.random()*1e6)}`;
    const email = `abrurahman${uid}@gmail.com`;
    const password = PWD;
    const nick = (`u${uid}`).substring(0,20);
    const payload = makeSignupPayload(email, password, nick);

    let res = null;
    let ok = false;
    for (let a = 0; a <= RETRIES; a++) {
      try {
        res = http.post(SIGN_UP_URL, JSON.stringify(payload), { headers: HEADERS, timeout: REQ_TIMEOUT });
      } catch (e) {
        console.log(`[SIGNUP TIMEOUT] email=${email} attempt=${a+1}/${RETRIES+1}`);
        if (a < RETRIES) { backoff(a); continue; }
        break;
      }
      const body = j(res);
      const pid = body?.id || body?.playerId || '-';
      const msg = body?.message || body?.error || (Array.isArray(body?.validation) ? body.validation.join(', ') : '') || '';

      if (res.status === 201) {
        console.log(`[SIGNUP 201] email=${email} pid=${pid} ${Math.round(res.timings.duration)}ms`);
        users.push({ email, password, token: extractToken(res) || null });
        ok = true;
        break;
      }
      if (res.status === 409) {
        console.log(`[SIGNUP 409] email=${email} (exists) :: ${short(msg)}`);
        users.push({ email, password, token: null }); // залогинимся на клике
        ok = true;
        break;
      }
      if (res.status === 429 || (res.status >= 500 && res.status < 600)) {
        console.log(`[SIGNUP ${res.status}] email=${email} soft-error, retry... :: ${short(msg)}`);
        if (a < RETRIES) { backoff(a); continue; }
      } else {
        console.log(`[SIGNUP ERR ${res.status}] email=${email} :: ${short(msg || res.body)}`);
      }
      break;
    }

    if (!ok) {
      // не удалось — пропускаем этого пользователя
      continue;
    }

    // чтобы не улетать совсем в спайк на DEV
    sleep(0.02); // 20мс между регистрациями
  }

  const took = ((Date.now() - startedAt)/1000).toFixed(1);
  console.log(`[SETUP DONE] created_or_prepared=${users.length}/${NUM_USERS} in ${took}s`);

  if (!users.length) {
    console.log('[FATAL] Не удалось подготовить ни одного пользователя. Тест остановлен.');
    fail('no prepared users');
  }

  return { users };
}

// ─────────────── ФАЗА 2: прожарка клика с подробными логами ───────────────
export default function (data) {
  const users = data?.users || [];
  if (!users.length) {
    console.log('[FATAL] users list empty at runtime');
    fail('empty users in runtime');
  }

  // выбираем пользователя
  const u = users[Math.floor(Math.random() * users.length)];
  let token = u.token;

  // если токена нет — логинимся
  if (!token) {
    try {
      const lr = http.post(
        LOGIN_URL,
        JSON.stringify({ email: u.email, password: u.password }),
        { headers: HEADERS, tags: { step: 'login' }, timeout: REQ_TIMEOUT },
      );
      const lbody = j(lr);
      const lmsg = lbody?.message || lbody?.error || '';
      const okLogin = (lr.status === 200 || lr.status === 201);
      console.log(`[LOGIN ${lr.status}] email=${u.email} ${okLogin ? 'OK' : 'ERR'} :: ${short(lmsg || lr.body)}`);
      if (okLogin) token = extractToken(lr);
    } catch (e) {
      console.log(`[LOGIN TIMEOUT] email=${u.email}`);
    }
  }

  // синхронизирующая пауза, как просил
  sleep(SYNC_WAIT_SEC);

  if (!token) {
    console.log(`[GAME SKIP] email=${u.email} нет токена`);
    return;
  }

  try {
    const gr = http.get(GAME_URL, {
      headers: { ...HEADERS, Authorization: `Bearer ${token}` },
      tags: { step: 'game' },
      timeout: REQ_TIMEOUT,
    });
    const okGame = check(gr, { 'game 200': (r) => r.status === 200 }, { step: 'game' });
    console.log(`[GAME ${gr.status}] ${okGame ? 'OK' : 'ERR'} :: ${Math.round(gr.timings.duration)}ms`);
  } catch (e) {
    console.log(`[GAME TIMEOUT] email=${u.email}`);
  }

  // лёгкий джиттер
  sleep(Math.random() * 1.5 + 0.5);
}

// ─────────────── summary ───────────────
export function handleSummary(data) {
  return { stdout: textSummary(data, { indent: ' ', enableColors: true }) };
}
