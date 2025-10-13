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
  stages: [
    { duration: '10s', target: 10 },    
    { duration: '20s', target: 30 }, 
    { duration: '30s', target: 50 }, // пик нагрузки (стресс)
    { duration: '20s', target: 30 }, 
    { duration: '10s', target: 10 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.05'],     // допускается <5% ошибок
    http_req_duration: ['p(95)<2000'],  // 95% запросов быстрее 2 сек
  },
};

export default function () {
  // выбираем случайный аккаунт
  const account = ACCOUNTS[Math.floor(Math.random() * ACCOUNTS.length)];

  // === LOGIN ===
  const payload = JSON.stringify({
    email: account,
    password: PASSWORD,
  });

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*',
    'x-platform': 'web',
    'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
  };

  const res = http.post(LOGIN_URL, payload, { headers });

  // Логируем неудачные логины
  if (res.status !== 200 && res.status !== 201) {
    console.log(`❌ Login failed: ${res.status} for user ${account}`);
  }

  check(res, {
    'login status 200/201': (r) => r.status === 200 || r.status === 201,
  });

  sleep(Math.random() * 2 + 1); // пауза между логинами (1–3 сек)
}
