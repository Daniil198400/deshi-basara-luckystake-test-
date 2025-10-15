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
const BALANCE_URL = 'https://api.luckystake.com/currency-account/balances';

export const options = {
  stages: [
    { duration: '15s', target: 5 },
    { duration: '20s', target: 8 },
    { duration: '20s', target: 10 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500'],
  },
};

// Функция логина с retry
function login(account, headers) {
  for (let i = 0; i < 3; i++) {
    const res = http.post(LOGIN_URL, JSON.stringify({ email: account, password: PASSWORD }), { headers });
    if (res.status === 200 || res.status === 201) return res;
    console.warn(`Login attempt ${i+1} failed for ${account}: HTTP ${res.status}`);
    sleep(1);
  }
  return null;
}

export default function () {
  const account = ACCOUNTS[Math.floor(Math.random() * ACCOUNTS.length)];

  const commonHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-platform': 'web',
    'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
  };

  // LOGIN с retry
  const loginRes = login(account, commonHeaders);
  if (!loginRes) {
    console.error(`All login attempts failed for ${account}`);
    return;
  }

  const loginOk = check(loginRes, {
    'login status 200/201': (r) => r.status === 200 || r.status === 201,
    'accessToken exists': (r) => r.json('accessToken') !== undefined,
  });

  if (!loginOk) {
    console.error(`Login validation failed for ${account}: HTTP ${loginRes.status}`);
    return;
  }

  const token = loginRes.json('accessToken');
  const headers = {
    Authorization: `Bearer ${token}`,
    'x-platform': 'web',
    'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
  };

  // BALANCE
  const balanceRes = http.get(BALANCE_URL, { headers });
  const balances = balanceRes.json();

  console.log(`Full balance JSON for ${account}:\n${JSON.stringify(balances, null, 2)}`);

  // Проверка всех полей summary каждой валюты
  balances.forEach((b, i) => {
    const summary = b.summary || {};
    check(summary, {
      [`balance #${i} total exists`]: () => summary.total !== undefined,
      [`balance #${i} total >= 0`]: () => summary.total >= 0,
      [`balance #${i} cash >= 0`]: () => summary.cash >= 0,
      [`balance #${i} withdrawal >= 0`]: () => summary.withdrawal >= 0,
      [`balance #${i} promo >= 0`]: () => summary.promo >= 0,
      [`balance #${i} block >= 0`]: () => summary.block >= 0,
      [`balance #${i} pending >= 0`]: () => summary.pending >= 0,
      [`balance #${i} committedFunds >= 0`]: () => summary.committedFunds >= 0,
      [`balance #${i} sportPromo >= 0`]: () => summary.sportPromo >= 0,
    });
  });

  // Пауза, чтобы тест был более реалистичным
  sleep(Math.random() * 5 + 2); // 2-7 секунд
}
