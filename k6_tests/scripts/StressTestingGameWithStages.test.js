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

// Время ожидания перед кликом на игру, чтобы синхронизировать VU
const SYNC_WAIT_SEC = 2;

export const options = {
  stages: [
    { duration: '20s', target: 10 },
    { duration: '30s', target: 30 },
    { duration: '40s', target: 50 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<2000'],
  },
};

export function setup() {
  const tokens = [];
  for (const account of ACCOUNTS) {
    console.log(`SETUP: Logging in ${account}`);
    const res = http.post(LOGIN_URL, JSON.stringify({
      email: account,
      password: PASSWORD,
    }), {
      headers: {
        'Content-Type': 'application/json',
        'x-platform': 'web',
        'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
      },
    });

    if (res.status === 200 || res.status === 201) {
      const token = res.json('token') || res.json('accessToken');
      if (token) {
        console.log(`SETUP: Token received for ${account}`);
        tokens.push(token);
      } else {
        console.log(`SETUP: No token received for ${account}`);
      }
    } else {
      console.log(`SETUP: Login failed for ${account} status=${res.status}`);
    }
  }
  return { tokens };
}

export default function (data) {
  const token = data.tokens[Math.floor(Math.random() * data.tokens.length)];
  if (!token) {
    console.log(`VU=${__VU} WARNING: no token available`);
    return;
  }

  console.log(`VU=${__VU} START: waiting ${SYNC_WAIT_SEC}s before clicking game`);
  sleep(SYNC_WAIT_SEC);

  const headers = {
    'Authorization': `Bearer ${token}`,
    'x-platform': 'web',
    'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
  };

  console.log(`VU=${__VU} ACTION: clicking game`);
  const res = http.get(GAME_URL, { headers });
  const ok = check(res, { 'game status 200': (r) => r.status === 200 });
  console.log(`VU=${__VU} END: game click status=${res.status} ok=${ok}`);

  // Случайная пауза между итерациями
  const sleepTime = Math.random() * 2 + 1;
  console.log(`VU=${__VU} sleeping for ${sleepTime.toFixed(2)}s`);
  sleep(sleepTime);
}
