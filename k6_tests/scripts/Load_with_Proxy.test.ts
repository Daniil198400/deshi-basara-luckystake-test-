import http from 'k6/http';
import { check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.4/index.js';

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

// ===========================
//      ПРОКСИ (как в Jest)
// ===========================
const PROXIES = [
  { label: "New York", url: "http://eakpnvxn-US:0u5tgdyktk1e@154.6.83.196:6667" },
  { label: "Dulles",   url: "http://eakpnvxn-US:0u5tgdyktk1e@173.239.219.78:5987" },
  { label: "Chicago",  url: "http://eakpnvxn-US:0u5tgdyktk1e@136.0.194.76:6813" },
];

function pickProxy() {
  return PROXIES[Math.floor(Math.random() * PROXIES.length)];
}

// ===========================
//     DEV окружение signup
// ===========================

const URL = 'https://api.luckystake.dev/player/crm/sign-up';
const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json, text/plain, */*',
  'Origin': 'https://luckystake.dev',
  'Referer': 'https://luckystake.dev/',
  'x-platform': 'web',
  'x-site-id': '5138631f-8d60-4327-b46c-8a4e41d68c93',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
};

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

// =====================================
//       ОСНОВНАЯ ЛОГИКА СЦЕНАРИЯ
// =====================================

export default function () {
  // ---- выбираем прокси ----
  const proxy = pickProxy();
  // console.log(`Using proxy: ${proxy.label}`);

  // ---- генерим email ----
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
    currency: 'GC',
  };
  if (USE_AFFILIATE) payload.affiliateInformation = DEFAULT_AFFILIATE;

  // ---- запрос через ПРОКСИ ----
  const res = http.post(
    URL,
    JSON.stringify(payload),
    {
      headers: HEADERS,
      proxy: proxy.url,          // <-------  ВАЖНО! ВСТАВЛЕН ПРОКСИ
      timeout: '30s',
    }
  );

  const ms = Math.round(res.timings.duration);

  let pid = '-', nick = '-', msg = '';
  try {
    const j = res.json();
    pid = j?.id || j?.info?.id || j?.playerId || '-';
    nick = j?.nickName || '-';
    msg =
      j?.message ||
      j?.error ||
      (Array.isArray(j?.validation) ? j.validation.join(', ') : '') ||
      '';
  } catch (_) {}

  const ok = check(res, { 'status 200/201': (r) => r.status === 200 || r.status === 201 });

  if (ok) {
    console.log(
      `[${proxy.label}] [OK ${res.status}] email=${EMAIL} pid=${pid} nick=${nick} ${ms}ms`
    );
  } else {
    if (!msg) {
      msg = String(res.body || '').replace(/\s+/g, ' ').slice(0, 160);
    }
    console.log(
      `[${proxy.label}] [ERR ${res.status}] email=${EMAIL} ${ms}ms :: ${msg}`
    );
  }
}

export function handleSummary(data) {
  return {
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
