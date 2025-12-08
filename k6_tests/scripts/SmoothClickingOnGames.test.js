import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter, Trend, Rate } from 'k6/metrics';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.4/index.js';

// ─────────────────────────────────────────────
//                 METRICS
// ─────────────────────────────────────────────

// удачные регистрации
export const signup_success = new Counter('signup_success');
// неудачные регистрации
export const signup_fail = new Counter('signup_fail');

// удачные открытия игры
export const game_success = new Counter('game_success');
// ошибки открытия игры
export const game_fail = new Counter('game_fail');

// скорость sign-up
export const signup_time = new Trend('signup_time');
// скорость game
export const game_time = new Trend('game_time');

// коэффициент успешности регистраций
export const signup_rate = new Rate('signup_rate');
// коэффициент успешности игр
export const game_rate = new Rate('game_rate');

// ─────────────────────────────────────────────
//                 LOAD SETTINGS
// ─────────────────────────────────────────────
export const options = {
  scenarios: {
    signup_load: {
      executor: 'constant-arrival-rate',
      rate: 1,                    // 1 регистрация/сек
      timeUnit: '1s',
      duration: '30s',            // длительность
      preAllocatedVUs: 10,
      maxVUs: 50,
    },
  },
};

// ─────────────────────────────────────────────
//                 API CONFIG
// ─────────────────────────────────────────────
const BASE = "https://api.luckystake.dev";
const SIGNUP = `${BASE}/player/crm/sign-up`;
const LOGIN = `${BASE}/player/crm/login`;
const GAME = `${BASE}/games/link/3765?platform=2&locale=en&country_code=US&currency=GC&p=%2F`;

const HEADERS = {
  "Content-Type": "application/json",
  "Origin": "https://luckystake.dev",
  "Referer": "https://luckystake.dev/",
  "x-site-id": "5138631f-8d60-4327-b46c-8a4e41d68c93",
  "x-platform": "web",
};

// ─────────────────────────────────────────────
//                 HELPERS
// ─────────────────────────────────────────────
function j(r) { try { return r.json(); } catch { return {}; } }
function short(s, n = 150) { return String(s || "").replace(/\s+/g, " ").slice(0, n); }
function extractToken(body) { return body?.accessToken || null; }

// ─────────────────────────────────────────────
//                 MAIN LOGIC
// ─────────────────────────────────────────────
export default function () {

  const email = `lt_${__VU}_${__ITER}_${Date.now()}@gmail.com`;
  const password = "Qwerty1!";

  const payload = {
    email,
    password,
    isUserAgreement: true,
    isEmailNewsletter: true,
    allowPromotions: true,
    currency: "GC",
    referralCode: "",
    citizenship: "US",
    language: "ru",
    gender: "other",
    birthDate: null,
    address: {
      state: "FL",
      addressCountryAlfa2: "US"
    },
    affiliateInformation: {
      fullUrl: "https://luckystake.dev/",
      product: 1
    }
  };

  // SIGN-UP
  const s_start = Date.now();
  const s = http.post(SIGNUP, JSON.stringify(payload), { headers: HEADERS });
  signup_time.add(Date.now() - s_start);

  const sb = j(s);
  let token = extractToken(sb);

  // fallback login
  if (!token && (s.status === 200 || s.status === 409)) {
    const l = http.post(LOGIN, JSON.stringify({ email, password }), { headers: HEADERS });
    token = extractToken(j(l));
  }

  if (token) {
    signup_success.add(1);
    signup_rate.add(true);
    console.log(`[SIGNUP OK ${s.status}] email=${email}`);
  } else {
    signup_fail.add(1);
    signup_rate.add(false);
    console.log(`[SIGNUP ERR ${s.status}] email=${email} :: ${short(s.body)}`);
    console.log(`[GAME SKIP]`);
    return;
  }

  // GAME
  const g_start = Date.now();
  const g = http.get(GAME, {
    headers: { ...HEADERS, Authorization: `Bearer ${token}` }
  });
  game_time.add(Date.now() - g_start);

  if (g.status === 200) {
    game_success.add(1);
    game_rate.add(true);
    console.log(`[GAME OK] ${email}`);
  } else {
    game_fail.add(1);
    game_rate.add(false);
    console.log(`[GAME ERR ${g.status}] :: ${short(g.body)}`);
  }

  sleep(0.2 + Math.random() * 0.4);
}

// ─────────────────────────────────────────────
//                 SUMMARY
// ─────────────────────────────────────────────
export function handleSummary(data) {
  return {
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
