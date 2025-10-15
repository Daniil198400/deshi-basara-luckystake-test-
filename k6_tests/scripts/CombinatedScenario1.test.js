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
const INFO_URL = 'https://api.luckystake.com/player/crm/info';

export const options = {
  stages: [
    { duration: '10s', target: 5 },
    { duration: '20s', target: 20 },
    { duration: '30s', target: 30 },
    { duration: '5s', target: 5 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500'],
  },
};

// Глобальный кэш токенов — чтобы не логиниться каждый раз
let TOKENS = {};

export default function () {
  const account = ACCOUNTS[(__VU - 1) % ACCOUNTS.length];

  // ======= LOGIN только один раз =======
  if (!TOKENS[account]) {
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
      console.log(`❌ Login failed for ${account}, status=${loginRes.status}`);
      return;
    }

    const token = loginRes.json('token') || loginRes.json('accessToken');
    if (!token) {
      console.log(`❌ Token not found for ${account}`);
      return;
    }

    TOKENS[account] = token;
    console.log(`🔐 Logged in once for ${account}`);
  }

  const token = TOKENS[account];

  // ======= ВЫБОР ДЕЙСТВИЯ =======
  const randomNum = Math.random() * 100;

  if (randomNum < 70) {
    // 70% пользователей — просто авторизовались
    console.log(`✅ VU=${__VU} account=${account} logged in only`);

  } else if (randomNum < 90) {
    // 20% пользователей — открывают игру
    const gameHeaders = {
      'Authorization': `Bearer ${token}`,
      'x-platform': 'web',
      'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
      'Accept': 'application/json, text/plain, */*',
      'Referer': 'https://luckystake.com/',
      'User-Agent': 'k6loadtest/1.0 (+https://k6.io/)',
    };

    const gameRes = http.get(GAME_URL, { headers: gameHeaders });
    const gameSuccess = check(gameRes, {
      'game status 200': (r) => r.status === 200,
    });
    console.log(`🎮 VU=${__VU} account=${account} opened game, status=${gameRes.status}, success=${gameSuccess}`);

  } else {
    // 10% пользователей — делают запрос к /player/crm/info
    const infoHeaders = {
      'Authorization': `Bearer ${token}`,
      'x-platform': 'web',
      'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
      'Accept': 'application/json, text/plain, */*',
      'Referer': 'https://luckystake.com/',
      'User-Agent': 'k6loadtest/1.0 (+https://k6.io/)',
    };

    const infoRes = http.get(INFO_URL, { headers: infoHeaders });
    const infoSuccess = check(infoRes, {
      'info status 200': (r) => r.status === 200,
    });
    console.log(`ℹ️ VU=${__VU} account=${account} checked info, status=${infoRes.status}, success=${infoSuccess}`);
  }

  // ======= ПАУЗА =======
  sleep(Math.random() * 2 + 1);
}
