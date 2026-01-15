import http from 'k6/http';
import { check } from 'k6';
import { Counter } from 'k6/metrics';

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

// счётчик оборванных запросов (status=0)
const status0 = new Counter('http_status_0');

export const options = {
  scenarios: {
    warmup: {
      executor: 'ramping-arrival-rate',
      startRate: 1, timeUnit: '1s',
      preAllocatedVUs: 30, maxVUs: 200,
      stages: [{ target: 1, duration: '20s' }],
      gracefulStop: '90s',
    },
    ramp: {
      executor: 'ramping-arrival-rate',
      startTime: '20s',
      startRate: 1, timeUnit: '1s',
      preAllocatedVUs: 50, maxVUs: 250,
      stages: [{ target: 3, duration: '20s' }],
      gracefulStop: '90s',
    },
    spike1: {
      executor: 'ramping-arrival-rate',
      startTime: '40s',
      startRate: 3, timeUnit: '1s',
      preAllocatedVUs: 120, maxVUs: 400,
      stages: [
        { target: 12, duration: '8s' },
        { target: 12, duration: '4s' },
        { target: 2,  duration: '8s' },
      ],
      gracefulStop: '90s',
    },
    waves: {
      executor: 'ramping-arrival-rate',
      startTime: '60s',
      startRate: 2, timeUnit: '1s',
      preAllocatedVUs: 80, maxVUs: 300,
      stages: [
        { target: 5, duration: '6s' },
        { target: 5, duration: '6s' },
        { target: 2, duration: '8s' },
      ],
      gracefulStop: '90s',
    },
    recovery: {
      executor: 'constant-arrival-rate',
      startTime: '80s',
      rate: 1, timeUnit: '1s',
      duration: '20s',
      preAllocatedVUs: 40, maxVUs: 150,
      gracefulStop: '90s',
    },
    spike2: {
      executor: 'ramping-arrival-rate',
      startTime: '100s',
      startRate: 1, timeUnit: '1s',
      preAllocatedVUs: 160, maxVUs: 500,
      stages: [
        { target: 15, duration: '5s' },
        { target: 2,  duration: '5s' },
      ],
      gracefulStop: '90s',
    },
    cooldown: {
      executor: 'constant-arrival-rate',
      startTime: '110s',
      rate: 1, timeUnit: '2s',
      duration: '10s',
      preAllocatedVUs: 20, maxVUs: 120,
      gracefulStop: '90s',
    },
  },
  thresholds: {
    http_status_0: ['count==0'],
    http_req_failed: ['rate<0.20'],
    http_req_duration: ['p(95)<60000'],
  },
  discardResponseBodies: true,
};

// ==== DEV окружение ====
const URL = 'https://api.luckystake.dev/player/crm/sign-up';
const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json, text/plain, */*',
  'Origin': 'https://luckystake.dev',
  'Referer': 'https://luckystake.dev/',
  'x-platform': 'web',
  'x-site-id': '5138631f-8d60-4327-b46c-8a4e41d68c93',
  'User-Agent': 'k6/dev-stress',
};

const USE_AFFILIATE = true;
const DEFAULT_AFFILIATE = {
  affiliateId: '02C',
  sourceId: '1',
  product: 1,
  couponCode: '',
  var1: '{var1}', var2: '{var2}', var3: '{var3}',
  var4: '{var4}', var5: '{var5}', offer: '{offer}',
};

// =====================================
//       ОСНОВНОЙ СЦЕНАРИЙ
// =====================================
export default function () {

  // ---- выбираем прокси ----
  const proxy = pickProxy();
  // console.log(`Proxy: ${proxy.label}`);

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
    address: { addressCountryAlfa2: 'US', city: 'Miami', state: 'FL', street: 'Ocean Drive', zipCode: '33139' },
    language: 'ru',
    currency: 'GC',
    ...(USE_AFFILIATE ? { affiliateInformation: DEFAULT_AFFILIATE } : {}),
  };

  const res = http.post(
    URL,
    JSON.stringify(payload),
    {
      headers: HEADERS,
      timeout: '70s',
      proxy: proxy.url,      // ← вставлен рандомный прокси
    }
  );

  const ms = Math.round(res.timings.duration);

  if (res.status === 0) {
    status0.add(1);
    console.log(`[${proxy.label}] [ERR 0] ${EMAIL} ${ms}ms :: interrupted/timeout`);
    return;
  }

  let pid = '-', nick = '-', msg = '';
  try {
    const j = res.json();
    pid = j?.id || j?.info?.id || j?.playerId || '-';
    nick = j?.nickName || '-';
    msg  = j?.message || j?.error || (Array.isArray(j?.validation) ? j.validation.join(', ') : '') || '';
  } catch (_) {}

  if (res.status === 200 || res.status === 201) {
    console.log(`[${proxy.label}] [OK ${res.status}] email=${EMAIL} pid=${pid} nick=${nick} ${ms}ms`);
  } else {
    if (!msg) msg = String(res.body || '').replace(/\s+/g, ' ').slice(0, 140);
    console.log(`[${proxy.label}] [ERR ${res.status}] email=${EMAIL} ${ms}ms :: ${msg}`);
  }

  check(res, { 'status 200/201': (r) => r.status === 200 || r.status === 201 });
}
