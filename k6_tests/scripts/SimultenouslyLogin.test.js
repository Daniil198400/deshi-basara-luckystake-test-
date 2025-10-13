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

export const options = {
  scenarios: {
    simultaneous_login: {
      executor: 'per-vu-iterations',
      vus: ACCOUNTS.length, // 30 VU
      iterations: 1,        // каждый VU делает 1 логин
      maxDuration: '2m',    // таймаут
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'], // ошибки <1%
    http_req_duration: ['p(95)<500'], // 95% < 500ms
  },
};

export default function () {
  // Назначаем аккаунт на каждый VU
  const account = ACCOUNTS[(__VU - 1) % ACCOUNTS.length];

  // Пейлоад логина
  const payload = JSON.stringify({
    email: account,
    password: PASSWORD,
  });

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*',
    'x-platform': 'web',
    'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
    'Referer': 'https://luckystake.com/',
    'User-Agent': 'k6loadtest/1.0 (+https://k6.io/)',
  };

  console.log(`VU=${__VU} account=${account} START login`);

  const res = http.post(LOGIN_URL, payload, { headers });

  const success = check(res, {
    'login succeeded (200|201)': (r) => r.status === 200 || r.status === 201,
  });

  console.log(`VU=${__VU} account=${account} END login status=${res.status} success=${success}`);

  // Если хочешь имитировать небольшую паузу после логина:
  sleep(1);
}
