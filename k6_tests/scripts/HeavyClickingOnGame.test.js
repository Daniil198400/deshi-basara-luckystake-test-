import http from 'k6/http';
import { check, sleep } from 'k6';

const ACCOUNTS = [
  'prod_test1@gmail.com','prod_test2@gmail.com','prod_test3@gmail.com','prod_test4@gmail.com','prod_test5@gmail.com',
  'prod_test6@gmail.com','prod_test7@gmail.com','prod_test8@gmail.com','prod_test9@gmail.com','prod_test10@gmail.com',
  'prod_test11@gmail.com','prod_test12@gmail.com','prod_test13@gmail.com','prod_test14@gmail.com','prod_test15@gmail.com',
  'prod_test16@gmail.com','prod_test17@gmail.com','prod_test18@gmail.com','prod_test19@gmail.com','prod_test20@gmail.com',
  'prod_test21@gmail.com','prod_test22@gmail.com','prod_test23@gmail.com','prod_test24@gmail.com','prod_test25@gmail.com',
  'prod_test26@gmail.com','prod_test27@gmail.com','prod_test28@gmail.com','prod_test29@gmail.com','prod_test30@gmail.com',
];

const PASSWORD = 'Qwerty1!';
const LOGIN_URL = 'https://api.luckystake.com/player/crm/login';
const GAME_URL = 'https://api.luckystake.com/games/link/35816?platform=2&locale=en&country_code=US&currency=GC&c=Popular&p=2';

// Логин “лесенкой”: каждый следующий VU стартует на STEP_SEC позже.
// 30 VU * 0.3s = ~9s растяжки — обычно хватает, чтобы не поймать WAF.
const LOGIN_STEP_SEC = 0.3;

// После того как ПОСЛЕДНИЙ VU начнёт логиниться (лесенка), даём буфер
// и назначаем общий момент клика.
const AFTER_LAST_LOGIN_START_BUFFER_SEC = 8;

export const options = {
  scenarios: {
    one_round_per_vu: {
      executor: 'per-vu-iterations',
      vus: ACCOUNTS.length,
      iterations: 1,
      maxDuration: '3m',
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<1500'],
  },
};

const loginHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json, text/plain, */*',
  'x-platform': 'web',
  'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
  'Referer': 'https://luckystake.com/',
  'User-Agent': 'k6loadtest/1.0 (+https://k6.io/)',
};

const gameHeadersBase = {
  'Accept': 'application/json, text/plain, */*',
  'Origin': 'https://luckystake.com',
  'Referer': 'https://luckystake.com/',
  'x-platform': 'web',
  'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
  'User-Agent': 'k6loadtest/1.0 (+https://k6.io/)',
};

export function setup() {
  const totalSpread = (ACCOUNTS.length - 1) * LOGIN_STEP_SEC; // сколько растянется старт логинов
  const sync_at = Date.now() + (totalSpread + AFTER_LAST_LOGIN_START_BUFFER_SEC) * 1000;

  console.log(
    `SETUP: login spread ~${totalSpread.toFixed(2)}s, sync_at=${sync_at} (click after buffer ${AFTER_LAST_LOGIN_START_BUFFER_SEC}s)`
  );

  return { sync_at };
}

export default function (data) {
  const vuIndex = (__VU - 1) % ACCOUNTS.length;
  const account = ACCOUNTS[vuIndex];

  // === РАСТЯГИВАЕМ СТАРТ ЛОГИНА ===
  const loginDelay = vuIndex * LOGIN_STEP_SEC;
  if (loginDelay > 0) sleep(loginDelay);

  // === LOGIN ===
  console.log(`VU=${__VU} account=${account} ACTION=login START delay=${loginDelay.toFixed(2)}s`);
  const loginPayload = JSON.stringify({ email: account, password: PASSWORD });

  const loginRes = http.post(LOGIN_URL, loginPayload, { headers: loginHeaders });
  const loginOk = check(loginRes, { 'login status 200/201': (r) => r.status === 200 || r.status === 201 });
  console.log(`VU=${__VU} account=${account} ACTION=login END status=${loginRes.status} ok=${loginOk}`);

  let token = null;
  try {
    token = loginRes.json('token') || loginRes.json('accessToken') || null;
  } catch (e) {
    token = null;
  }

  if (!token) {
    console.log(`VU=${__VU} account=${account} WARNING=no token -> skipping game click`);
    return;
  }

  // === ЖДЁМ ОБЩИЙ МОМЕНТ КЛИКА ===
  const msLeft = (data.sync_at || Date.now()) - Date.now();
  if (msLeft > 0) sleep(msLeft / 1000);

  // === GAME CLICK (СИНХРОННО) ===
  const gameHeaders = { ...gameHeadersBase, Authorization: `Bearer ${token}` };

  console.log(`VU=${__VU} account=${account} ACTION=game_click START`);
  const gameRes = http.get(GAME_URL, { headers: gameHeaders });
  const gameOk = check(gameRes, { 'game status 200': (r) => r.status === 200 });
  console.log(`VU=${__VU} account=${account} ACTION=game_click END status=${gameRes.status} ok=${gameOk}`);
}
