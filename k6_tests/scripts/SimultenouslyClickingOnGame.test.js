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

export const options = {
  scenarios: {
    all_at_once: {
      executor: 'per-vu-iterations',
      vus: 30,        // 30 пользователей
      iterations: 1,  // каждый VU делает только 1 клик
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.05'],
  },
};

export default function () {
  // уникальный аккаунт для каждого VU
  const account = ACCOUNTS[(__VU - 1) % ACCOUNTS.length];

  // ======= LOGIN =======
  console.log(`VU=${__VU} account=${account} START login`);

  const loginPayload = JSON.stringify({ email: account, password: PASSWORD });
  const loginHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*',
    'x-platform': 'web',
    'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
    'Referer': 'https://luckystake.com/',
    'User-Agent': 'k6loadtest/1.0 (+https://k6.io/)',
  };

  const loginRes = http.post(LOGIN_URL, loginPayload, { headers: loginHeaders });

  const loginSuccess = check(loginRes, {
    'login succeeded': (r) => r.status === 200 || r.status === 201,
  });

  if (!loginSuccess) {
    console.log(`❌ Login failed for ${account}: ${loginRes.status}`);
    return;
  }

  let token = null;
  try {
    token = loginRes.json('token') || loginRes.json('accessToken');
    if (!token) {
      console.log(`❌ Token not found for ${account}`);
      return;
    }
  } catch (e) {
    console.log(`❌ Failed to parse token for ${account}`);
    return;
  }

  // ======= ПАУЗА перед одновременным кликом =======
  sleep(5);

  // ======= ОДНОВРЕМЕННЫЙ КЛИК =======
  const gameHeaders = {
    'Authorization': `Bearer ${token}`,
    'x-platform': 'web',
    'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
    'Accept': 'application/json, text/plain, */*',
    'Referer': 'https://luckystake.com/',
    'User-Agent': 'k6loadtest/1.0 (+https://k6.io/)',
  };

  const gameRes = http.get(GAME_URL, { headers: gameHeaders });
  const gameSuccess = check(gameRes, { 'game status 200': (r) => r.status === 200 });

  console.log(`✅ VU=${__VU} account=${account} clicked game, status=${gameRes.status}, success=${gameSuccess}`);
}
