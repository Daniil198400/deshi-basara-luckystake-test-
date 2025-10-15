import http from 'k6/http';
import { check, sleep } from 'k6';
import { exec } from 'k6/execution';

const ACCOUNTS = [
  'prod_test1@gmail.com','prod_test2@gmail.com','prod_test3@gmail.com','prod_test4@gmail.com','prod_test5@gmail.com',
  // … остальные аккаунты
];

const PASSWORD = 'Qwerty1!';
const LOGIN_URL = 'https://api.luckystake.com/player/crm/login';

export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '20s', target: 30 },
    { duration: '30s', target: 50 },
    { duration: '20s', target: 30 },
    { duration: '10s', target: 10 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<2000'],
  },
};

export default function () {
  // --- Выбираем случайный аккаунт ---
  const account = ACCOUNTS[Math.floor(Math.random() * ACCOUNTS.length)];

  // --- Логин ---
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

  let accessToken;
  try {
    accessToken = res.json('accessToken');
  } catch (e) {
    console.log(`❌ Failed to parse token for user ${account}`);
  }

  check(res, {
    'login status 200/201': (r) => r.status === 200 || r.status === 201,
    'accessToken exists': () => !!accessToken,
  });

  if (accessToken) {
    // --- Пример защищённого запроса ---
    const protectedRes = http.get('https://api.luckystake.com/some-protected-endpoint', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'x-platform': 'web',
        'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
      },
    });

    check(protectedRes, {
      'protected endpoint status 200': (r) => r.status === 200,
    });
  }

  // --- Логирование системных метрик через Node.js скрипт ---
  try {
    const stats = exec('node', ['getSystemMetrics.js']); // getSystemMetrics.js возвращает JSON
    console.log(`💻 System metrics: ${stats}`);
  } catch (err) {
    console.log(`❌ Failed to get system metrics: ${err}`);
  }

  sleep(Math.random() * 2 + 1);
}
