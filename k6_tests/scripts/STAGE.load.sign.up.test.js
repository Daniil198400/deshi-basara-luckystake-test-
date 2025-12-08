import http from 'k6/http';
import { check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.4/index.js';

// 1 регистрация каждые 2 сек, 30 сек
export const options = {
  scenarios: {
    signup_rate: {
      executor: 'constant-arrival-rate',
      rate: 1,
      timeUnit: '2s',
      duration: '30s',
      preAllocatedVUs: 5,
      maxVUs: 50,
    },
  },
  thresholds: {
    'http_req_failed': ['rate<0.05'],
  },
};

const URL = 'https://api.luckystake.dev/player/crm/sign-up';

const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json, text/plain, */*',
  'Origin': 'https://luckystake.dev',
  'Referer': 'https://luckystake.dev/',
  'x-platform': 'web',
  'x-site-id': '5138631f-8d60-4327-b46c-8a4e41d68c93',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36 OPR/123.0.0.0',
};

// можно включать/выключать affiliate
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

export default function () {
  const rnd = Math.floor(Math.random() * 900000 + 100000);

  // email по шаблону testing12345@gmail.com
  const EMAIL = `testing${rnd}@gmail.com`;

  const payload = {
    email: EMAIL,
    password: 'Qwerty1!',
    confirmPassword: 'Qwerty1!',
    nickName: `user${rnd}`,
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
  };

  if (USE_AFFILIATE) {
    payload.affiliateInformation = DEFAULT_AFFILIATE;
  }

  const res = http.post(URL, JSON.stringify(payload), { headers: HEADERS });

  const ms = Math.round(res.timings.duration);

  let id = '-';
  let nick = '-';
  let msg = '';

  try {
    const j = res.json();
    id = j?.id || j?.playerId || '-';
    nick = j?.nickName || '-';
    msg = j?.message || j?.error || '';
  } catch (_) {}

  const ok = check(res, {
    'status is 201': (r) => r.status === 201,
  });

  if (ok) {
    console.log(`[OK 201] email=${EMAIL} id=${id} nick=${nick} ${ms}ms`);
  } else {
    if (!msg) {
      msg = String(res.body).slice(0, 200).replace(/\s+/g, ' ');
    }
    console.log(`[ERR ${res.status}] email=${EMAIL} ${ms}ms :: ${msg}`);
  }
}

// компактный summary
export function handleSummary(data) {
  return {
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
