import http from 'k6/http';
import { check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.4/index.js';

/**
 * Профиль нагрузки (~2 мин):
 * 00–20s  WARMUP       → 1 ит/с (раньше было 0.5/с)
 * 20–40s  RAMP         → 3 ит/с
 * 40–60s  SPIKE#1      → 12 ит/с пик
 * 60–80s  WAVES        → 2→5→2 ит/с
 * 80–100s RECOVERY     → 1 ит/с
 * 100–110s SPIKE#2     → 15 ит/с
 * 110–120s COOL DOWN   → 1 ит/2с (эквивалент 0.5/с, без дробных таргетов)
 */
export const options = {
  scenarios: {
    // было: startRate: 0.5 при timeUnit '1s' — НЕЛЬЗЯ дроби.
    // делаем старт сразу 1/с (это всё равно мягкий прогрев)
    warmup: {
      executor: 'ramping-arrival-rate',
      startRate: 1,              // 1 ит/с
      timeUnit: '1s',
      preAllocatedVUs: 30,
      maxVUs: 200,
      stages: [{ target: 1, duration: '20s' }],
    },

    ramp: {
      executor: 'ramping-arrival-rate',
      startTime: '20s',
      startRate: 1,
      timeUnit: '1s',
      preAllocatedVUs: 50,
      maxVUs: 250,
      stages: [{ target: 3, duration: '20s' }], // 1→3 ит/с
    },

    spike1: {
      executor: 'ramping-arrival-rate',
      startTime: '40s',
      startRate: 3,
      timeUnit: '1s',
      preAllocatedVUs: 120,
      maxVUs: 400,
      stages: [
        { target: 12, duration: '8s' },
        { target: 12, duration: '4s' },
        { target: 2, duration: '8s' },
      ],
    },

    waves: {
      executor: 'ramping-arrival-rate',
      startTime: '60s',
      startRate: 2,
      timeUnit: '1s',
      preAllocatedVUs: 80,
      maxVUs: 300,
      stages: [
        { target: 5, duration: '6s' },
        { target: 5, duration: '6s' },
        { target: 2, duration: '8s' },
      ],
    },

    recovery: {
      executor: 'constant-arrival-rate',
      startTime: '80s',
      rate: 1,                   // 1 ит/с
      timeUnit: '1s',
      duration: '20s',
      preAllocatedVUs: 40,
      maxVUs: 150,
    },

    spike2: {
      executor: 'ramping-arrival-rate',
      startTime: '100s',
      startRate: 1,
      timeUnit: '1s',
      preAllocatedVUs: 160,
      maxVUs: 500,
      stages: [
        { target: 15, duration: '5s' },
        { target: 2,  duration: '5s' },
      ],
    },

    // БЫЛО: target: 0.5 (это ломало парсер). Делаем эквивалент:
    // 1 итерация каждые 2 секунды.
    cooldown: {
      executor: 'constant-arrival-rate',
      startTime: '110s',
      rate: 1,                   // 1 итерация
      timeUnit: '2s',            // каждые 2 секунды (эквивалент 0.5/с)
      duration: '10s',
      preAllocatedVUs: 20,
      maxVUs: 120,
    },
  },

  thresholds: {
    http_req_failed: ['rate<0.10'],
    http_req_duration: ['p(95)<1500', 'p(99)<5000'],
  },
};

// ==== PROD endpoint/headers (как у тебя) ====
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

// affiliate можно выключать флагом
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
    currency: 'GC',
  };
  if (USE_AFFILIATE) payload.affiliateInformation = DEFAULT_AFFILIATE;

  const res = http.post(URL, JSON.stringify(payload), { headers: HEADERS });
  const ms = Math.round(res.timings.duration);

  let pid = '-';
  let nick = '-';
  let msg = '';
  try {
    const j = res.json();
    pid = j?.id || j?.info?.id || j?.playerId || '-';
    nick = j?.nickName || '-';
    msg = j?.message || j?.error || (Array.isArray(j?.validation) ? j.validation.join(', ') : '') || '';
  } catch (_) {}

  const ok = check(res, { 'status 200/201': (r) => r.status === 200 || r.status === 201 });

  if (ok) {
    console.log(`[OK ${res.status}] email=${EMAIL} pid=${pid} nick=${nick} ${ms}ms`);
  } else {
    if (!msg) {
      const short = String(res.body || '').replace(/\s+/g, ' ').slice(0, 140);
      msg = short;
    }
    console.log(`[ERR ${res.status}] email=${EMAIL} ${ms}ms :: ${msg}`);
  }
}

export function handleSummary(data) {
  return {
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
