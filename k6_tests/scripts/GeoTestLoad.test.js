import http from 'k6/http';
import { check, sleep } from 'k6';

const ACCOUNTS = [
  'prod_test1@gmail.com',
  'prod_test2@gmail.com',
  'prod_test3@gmail.com','prod_test4@gmail.com','prod_test5@gmail.com',
  'prod_test6@gmail.com','prod_test7@gmail.com','prod_test8@gmail.com','prod_test9@gmail.com','prod_test10@gmail.com',
  'prod_test11@gmail.com','prod_test12@gmail.com','prod_test13@gmail.com','prod_test14@gmail.com','prod_test15@gmail.com',
  'prod_test16@gmail.com','prod_test17@gmail.com','prod_test18@gmail.com','prod_test19@gmail.com','prod_test20@gmail.com',
  'prod_test21@gmail.com','prod_test22@gmail.com','prod_test23@gmail.com','prod_test24@gmail.com','prod_test25@gmail.com',
  'prod_test26@gmail.com','prod_test27@gmail.com','prod_test28@gmail.com','prod_test29@gmail.com','prod_test30@gmail.com',

];

const PASSWORD = 'Qwerty1!';
const LOGIN_URL = 'https://api.luckystake.com/player/crm/login';
const INFO_URL = 'https://api.luckystake.com/player/crm/info';

// Regions with delay
const REGIONS = [
  { name: 'US', delay: 50 },
  { name: 'EU', delay: 100 },
  { name: 'ASIA', delay: 200 },
];

export const options = {
  stages: [
    { duration: '10s', target: 5 },   // медленный старт, 5 VU
    { duration: '20s', target: 10 },  // увеличение до 10 VU
    { duration: '10s', target: 0 },   // снижение до 0 VU
  ],
  thresholds: {
    'http_req_failed': ['rate<0.1'], // <10% ошибок
    'http_req_duration': ['p(95)<800'], // 95% запросов <800ms
  },
};

export default function () {
  const account = ACCOUNTS[(__VU - 1) % ACCOUNTS.length];

  // ======= LOGIN =======
  const loginPayload = JSON.stringify({ email: account, password: PASSWORD });
  const loginHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-platform': 'web',
    'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
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

  // ======= Geo-тесты =======
  REGIONS.forEach((region) => {
    sleep(region.delay / 1000); // симуляция задержки сети

    const infoHeaders = {
      'Authorization': `Bearer ${token}`,
      'x-platform': 'web',
      'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
      'Accept': 'application/json',
    };

    const infoRes = http.get(INFO_URL, { headers: infoHeaders });
    const infoSuccess = check(infoRes, {
      'info status 200': (r) => r.status === 200,
    });

    console.log(`🌍 VU=${__VU} region=${region.name} delay=${region.delay}ms status=${infoRes.status}, success=${infoSuccess}`);
  });

  // ======= Пауза между итерациями =======
  sleep(Math.random() * 3 + 1); // 1-4 секунды
}
