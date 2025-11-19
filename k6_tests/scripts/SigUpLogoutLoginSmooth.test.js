import http from 'k6/http';
import { check, sleep, group } from 'k6';

// ==== DEV окружение ====
const URL = 'https://api.luckystake.dev/player/crm/sign-up';
const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json, text/plain, */*',
  'Origin': 'https://luckystake.dev',
  'Referer': 'https://luckystake.dev/',
  'x-platform': 'web',
  'x-site-id': '5138631f-8d60-4327-b46c-8a4e41d68c93', // dev
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
};

// Оставляем тот же affiliate
const USE_AFFILIATE = true;
const DEFAULT_AFFILIATE = {
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

// ==== Настройки нагрузки ====
export const options = {
  vus: __ENV.K6_VUS ? parseInt(__ENV.K6_VUS) : 10,
  duration: __ENV.K6_DURATION ? __ENV.K6_DURATION : '30s',
  thresholds: {
    http_req_duration: ['p(95)<2000'],
  },
};

// ==== URLы для операций ====
const BASE = 'https://api.luckystake.dev';
const SIGNUP_URL = `${BASE}/player/crm/sign-up`;
const LOGIN_URL = `${BASE}/player/crm/login`;
const LOGOUT_URL = `${BASE}/player/crm/logout`;

// ==== Основной сценарий ====
export default function () {
  const rnd = Math.floor(10000 + Math.random() * 90000);
  const unique = `${Date.now()}_${rnd}_${__VU}_${__ITER}`;
  const EMAIL = `wiztest+${unique}@gmail.com`;
  const PASSWORD = 'Test12345!';

  // ==== PAYLOAD SIGN-UP ====
  const payload = {
    email: EMAIL,
    password: PASSWORD,
    confirmPassword: PASSWORD,
    nickName: (`u${unique}`).substring(0, 20),
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
    currency: 'GC', // оставил как в прод-тесте
  };

  if (USE_AFFILIATE) payload.affiliateInformation = DEFAULT_AFFILIATE;

  // === SIGN-UP ===
  group('SIGN-UP', function () {
    const res = http.post(SIGNUP_URL, JSON.stringify(payload), { headers: HEADERS });
    console.log(
      `SIGN-UP | email=${EMAIL} | status=${res.status} | body=${res.body ? res.body.substring(0, 200) : ''}`
    );

    check(res, {
      'signup status is 201': (r) => r.status === 200 || r.status === 201,
    });
  });

  sleep(0.3);

  // === LOGIN ===
  let token = null;
  group('LOGIN', function () {
    const loginPayload = JSON.stringify({
      email: EMAIL,
      password: PASSWORD,
    });
    const res = http.post(LOGIN_URL, loginPayload, { headers: HEADERS });
    console.log(
      `LOGIN | email=${EMAIL} | status=${res.status} | body=${res.body ? res.body.substring(0, 200) : ''}`
    );

    check(res, {
      'login status is 201': (r) => r.status === 200 || r.status === 201,
    });

    try {
      const j = res.json ? res.json() : JSON.parse(res.body || '{}');
      token = j.token || j.accessToken || j.access_token || null;
    } catch (e) {
      token = null;
    }

    if (token) {
      console.log(`LOGIN token found (truncated): ${token.substring(0, 30)}...`);
    } else {
      console.log('LOGIN token not found in response');
    }
  });

  sleep(0.3);

  // === LOGOUT ===
  group('LOGOUT', function () {
    const logoutHeaders = Object.assign({}, HEADERS);
    if (token) logoutHeaders['Authorization'] = `Bearer ${token}`;
    const res = http.post(LOGOUT_URL, JSON.stringify({}), { headers: logoutHeaders });
    console.log(
      `LOGOUT | email=${EMAIL} | status=${res.status} | body=${res.body ? res.body.substring(0, 200) : ''}`
    );

    check(res, {
      'logout status is 201': (r) => r.status === 200 || r.status === 201,
    });
  });

  sleep(0.5);
}
