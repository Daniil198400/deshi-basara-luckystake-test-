import http from 'k6/http';
import { check, sleep } from 'k6';

const ACCOUNTS = [
  'prod_test1@gmail.com','prod_test2@gmail.com','prod_test3@gmail.com',
  'prod_test4@gmail.com','prod_test5@gmail.com','prod_test6@gmail.com',
  'prod_test7@gmail.com','prod_test8@gmail.com','prod_test9@gmail.com',
  'prod_test10@gmail.com','prod_test11@gmail.com','prod_test12@gmail.com',
  'prod_test13@gmail.com','prod_test14@gmail.com','prod_test15@gmail.com',
  'prod_test16@gmail.com','prod_test17@gmail.com','prod_test18@gmail.com',
  'prod_test19@gmail.com','prod_test20@gmail.com','prod_test21@gmail.com',
  'prod_test22@gmail.com','prod_test23@gmail.com','prod_test24@gmail.com',
  'prod_test25@gmail.com','prod_test26@gmail.com','prod_test27@gmail.com',
  'prod_test28@gmail.com','prod_test29@gmail.com','prod_test30@gmail.com',
];

const PASSWORD = 'Qwerty1!';
const LOGIN_URL = 'https://api.luckystake.com/player/crm/login';
const INFO_URL = 'https://api.luckystake.com/player/crm/info';

export const options = {
  stages: [
    { duration: '10s', target: 5 },
    { duration: '15s', target: 10 },
    { duration: '20s', target: 15 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500'],
  },
};

export default function () {
  const account = ACCOUNTS[Math.floor(Math.random() * ACCOUNTS.length)];

  // === LOGIN ===
  const loginRes = http.post(LOGIN_URL, JSON.stringify({ email: account, password: PASSWORD }), {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-platform': 'web',
      'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
    },
  });

  check(loginRes, {
    'login status 200/201': (r) => r.status === 200 || r.status === 201,
    'accessToken exists': (r) => r.json('accessToken') !== undefined,
  });

  const token = loginRes.json('accessToken');
  if (!token) return;

  const headers = {
    Authorization: `Bearer ${token}`,
    'x-platform': 'web',
    'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
  };

  // === PLAYER INFO ===
  const infoRes = http.get(INFO_URL, { headers });

  check(infoRes, { 'player info status 200': (r) => r.status === 200 });

  const playerInfo = infoRes.json();

  console.log(`Full player info for ${account}:\n${JSON.stringify(playerInfo, null, 2)}`);

  // === VALIDATION ===
  check(playerInfo, {
    'playerId exists': (r) => r.id !== undefined,
    'email exists': (r) => r.email !== undefined,
    'email valid': (r) => typeof r.email === 'string' && r.email.includes('@'),
    'status is active': (r) => r.accountStatus === 'Active',
    'currency exists': (r) => r.currency !== undefined,
});


  sleep(Math.random() * 2 + 1);
}
