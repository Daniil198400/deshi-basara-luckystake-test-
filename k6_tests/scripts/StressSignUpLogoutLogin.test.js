import http from 'k6/http';
import { check, sleep, group } from 'k6';

// ==========================
// Константы и настройки
// ==========================
const BASE = 'https://api.luckystake.dev';
const SIGNUP_URL = `${BASE}/player/crm/sign-up`;
const LOGIN_URL  = `${BASE}/player/crm/login`;
const LOGOUT_URL = `${BASE}/player/crm/logout`;

const PASSWORD = 'Test12345!';
const TOTAL_USERS = 500;

const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json, text/plain, */*',
  'Origin': 'https://luckystake.dev',
  'Referer': 'https://luckystake.dev/',
  'x-platform': 'web',
  'x-site-id': '5138631f-8d60-4327-b46c-8a4e41d68c93',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
};

// ==========================
// Расписание
// - setup регистрирует ~4–5 минут
// - потом стартуют фазы logout и login
// ==========================
export const options = {
  setupTimeout: '15m',
  scenarios: {
    // Умеренный LOGOUT: ~5 rps, 2 минуты
    logout_phase: {
      executor: 'constant-arrival-rate',
      startTime: '5m',              // после завершения регистрации
      rate: 5,                      // запросов в секунду
      timeUnit: '1s',
      duration: '2m',
      preAllocatedVUs: 30,
      maxVUs: 60,
      exec: 'logoutPhase',
      tags: { phase: 'logout' },
    },

    // Умеренный LOGIN: плавный рост до 8 rps и спад (~2.5 минуты)
    login_phase: {
      executor: 'ramping-arrival-rate',
      startTime: '7m15s',           // после logout
      timeUnit: '1s',
      preAllocatedVUs: 40,
      maxVUs: 80,
      stages: [
        { duration: '45s', target: 4 },  // разгон
        { duration: '45s', target: 8 },  // до 8 rps
        { duration: '30s', target: 8 },  // удержание
        { duration: '30s', target: 0 },  // спад
      ],
      exec: 'loginPhase',
      tags: { phase: 'login' },
    },
  },
  thresholds: {
    'http_req_failed': ['rate<0.3'],
    'http_req_duration{phase:logout}': ['p(95)<3000'],
    'http_req_duration{phase:login}':  ['p(95)<3000'],
  },
  maxDuration: '12m',
};

// ==========================
// setup(): регистрация 500 юзеров ~2 rps (sleep 0.5s)
// ==========================
export function setup() {
  const users = [];
  const seed = Date.now();

  console.log(`\n=== Регистрация ${TOTAL_USERS} пользователей (умеренно, ~2 rps) ===`);

  for (let i = 0; i < TOTAL_USERS; i++) {
    const unique = `${seed}_${i}`;
    const email = `wiztest+${unique}@gmail.com`;
    const nick = `u_${unique}`;

    const payload = JSON.stringify({
      email,
      password: PASSWORD,
      confirmPassword: PASSWORD,
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
      affiliateInformation: {
        affiliateId: '02C',
        sourceId: '1',
        product: 1,
        couponCode: '',
      },
    });

    const res = http.post(SIGNUP_URL, payload, { headers: HEADERS });
    console.log(`Регистрация ${i + 1}/${TOTAL_USERS} | ${email} | status=${res.status}`);

    if (res.status === 200 || res.status === 201) {
      users.push({ email, password: PASSWORD });
    }

    // умеренная частота: ~2 запроса/сек
    sleep(1);
  }

  console.log(`=== Успешно зарегистрировано: ${users.length}/${TOTAL_USERS} пользователей ===`);
  return { users };
}

// ==========================
// Вспомогательные
// ==========================
function ok(r) {
  return r && (r.status === 200 || r.status === 201);
}
function loginPayload(email) {
  return JSON.stringify({ email, password: PASSWORD });
}
function pickUser(users) {
  return users[Math.floor(Math.random() * users.length)];
}

// ==========================
// Этап 1 — LOGOUT (умеренно)
// ==========================
export function logoutPhase(data) {
  const u = pickUser(data.users);

  // логинимся, чтобы взять токен
  const lr = http.post(LOGIN_URL, loginPayload(u.email), { headers: HEADERS });
  let token = null;
  if (ok(lr)) {
    try {
      const j = lr.json();
      token = j.token || j.accessToken || j.access_token || null;
    } catch (_) {}
  }

  group('LOGOUT', () => {
    const h = { ...HEADERS };
    if (token) h['Authorization'] = `Bearer ${token}`;
    const res = http.post(LOGOUT_URL, JSON.stringify({}), { headers: h });
    console.log(`LOGOUT | ${u.email} | status=${res.status}`);
    check(res, { 'logout ok': (r) => ok(r) });
  });

  // чуть разбавим поток
  sleep(0.15);
}

// ==========================
// Этап 2 — LOGIN (тоже медленнее)
// ==========================
export function loginPhase(data) {
  const u = pickUser(data.users);

  group('LOGIN', () => {
    const res = http.post(LOGIN_URL, loginPayload(u.email), { headers: HEADERS });
    console.log(`LOGIN | ${u.email} | status=${res.status}`);
    check(res, { 'login ok': (r) => ok(r) });
  });

  // помедленнее, чем раньше
  sleep(0.2);
}
