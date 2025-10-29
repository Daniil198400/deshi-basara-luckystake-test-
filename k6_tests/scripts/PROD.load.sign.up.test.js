import http from 'k6/http';
import { check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.4/index.js';

// 1 регистрация каждые 2 сек, 30 сек всего
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

const URL = 'https://api.luckystake.com/player/crm/sign-up';
const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json, text/plain, */*',
  'Origin': 'https://luckystake.com',
  'Referer': 'https://luckystake.com/',
  'x-platform': 'web',
  'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 OPR/122.0.0.0',
};

// если affiliate мешает — поставь false
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
  const rnd = Math.floor(10000 + Math.random() * 90000);
  const unique = `${Date.now()}_${rnd}_${__VU}_${__ITER}`;
  const EMAIL = `wiztest+${unique}@gmail.com`;

  const payload = {
    email: EMAIL,
    password: 'Test12345!',
    confirmPassword: 'Test12345!',
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
    currency: 'GC', // или "USD" если нужно
  };
  if (USE_AFFILIATE) payload.affiliateInformation = DEFAULT_AFFILIATE;

  const res = http.post(URL, JSON.stringify(payload), { headers: HEADERS });
  const ms = Math.round(res.timings.duration);

  // пытаемся аккуратно достать полезные поля без слива всего body
  let pid = '-';
  let nick = '-';
  let msg = '';
  try {
    const j = res.json();
    pid = j?.id || j?.info?.id || j?.playerId || '-';
    nick = j?.nickName || '-';
    msg =
      j?.message ||
      j?.error ||
      (Array.isArray(j?.validation) ? j.validation.join(', ') : '') ||
      '';
  } catch (_) {
    // ignore parse errors
  }

  const ok = check(res, {
    'status 200/201': (r) => r.status === 200 || r.status === 201,
  });

  if (ok) {
    // лаконичная строка успеха
    console.log(`[OK ${res.status}] email=${EMAIL} pid=${pid} nick=${nick} ${ms}ms`);
  } else {
    // лаконичная строка ошибки
    if (!msg) {
      // коротко обрежем body, если нет явного message
      const short = String(res.body || '').replace(/\s+/g, ' ').slice(0, 160);
      msg = short;
    }
    console.log(`[ERR ${res.status}] email=${EMAIL} ${ms}ms :: ${msg}`);
  }
}

// компактный итог в конце запуска
export function handleSummary(data) {
  return {
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
    // раскомментируй строку ниже, если хочешь сохранить полный summary в файл
    // 'summary.json': JSON.stringify(data, null, 2),
  };
}
