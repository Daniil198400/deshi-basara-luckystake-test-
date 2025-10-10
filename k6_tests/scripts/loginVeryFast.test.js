import http from 'k6/http';
import { check, sleep } from 'k6';

const ACCOUNTS = [
  'prod_test1@gmail.com',
  'prod_test2@gmail.com',
  'prod_test3@gmail.com',
  'prod_test4@gmail.com',
  'prod_test5@gmail.com',
  'prod_test6@gmail.com',
  'prod_test7@gmail.com',
  'prod_test8@gmail.com',
  'prod_test9@gmail.com',
  'prod_test10@gmail.com',
];

export const options = {
  vus: ACCOUNTS.length, // количество виртуальных пользователей
  duration: '30s',       // прогон длится 30 секунд
  // iterations можно убрать, чтобы VU повторяли сценарий пока длится duration
  thresholds: {
    http_req_failed: ['rate<0.01'], // допустимый процент ошибок <1%
    http_req_duration: ['p(95)<500'], // 95% запросов < 500ms
  },
};

const PASSWORD = 'Qwerty1!'; 
const LOGIN_URL = 'https://api.luckystake.com/player/crm/login';

export default function () {
  const vuIndex = (__VU || 1) - 1;
  const account = ACCOUNTS[vuIndex % ACCOUNTS.length];

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

  const res = http.post(LOGIN_URL, payload, { headers });

  console.log(`VU=${__VU} account=${account} HTTP status: ${res.status}`);

  check(res, {
    'login succeeded (200|201)': (r) => r.status === 200 || r.status === 201,
  });

  // Ждем 1 секунду, чтобы нагрузка была более реалистичной
  sleep(1);
}
