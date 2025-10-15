import http from 'k6/http';
import { check, sleep } from 'k6';

const ACCOUNTS = [
  'prod_test1@gmail.com','prod_test2@gmail.com','prod_test3@gmail.com',
  'prod_test4@gmail.com','prod_test5@gmail.com','prod_test6@gmail.com',
  'prod_test7@gmail.com','prod_test8@gmail.com','prod_test9@gmail.com',
  'prod_test10@gmail.com'
];

const PASSWORD = 'Qwerty1!';
const LOGIN_URL = 'https://api.luckystake.com/player/crm/login';
const BALANCE_URL = 'https://api.luckystake.com/currency-account/balances';
const INFO_URL = 'https://api.luckystake.com/player/crm/info';
const FAVORITES_URL = 'https://api.luckystake.com/games/favorites';
const GAME_URL = 'https://api.luckystake.com/games/link/38815?platform=2&locale=en&country_code=US&currency=GC&c=Popular&p=0';

export const options = {
  stages: [
    { duration: '10s', target: 5 },
    { duration: '10s', target: 10 },
    { duration: '10s', target: 10 },
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

  // === BALANCE ===
  const balanceRes = http.get(BALANCE_URL, { headers });
  check(balanceRes, {
    'balance status 200': (r) => r.status === 200,
    'has balance field': (r) => r.json('balance') !== undefined,
    'balance positive': (r) => r.json('balance') > 0,
  });
  console.log(`Balance for ${account}: HTTP ${balanceRes.status}, value=${balanceRes.json('balance')}`);

  // === PLAYER INFO ===
  const infoRes = http.get(INFO_URL, { headers });
  check(infoRes, { 'player info status 200': (r) => r.status === 200 });
  console.log(`Player info for ${account}: HTTP ${infoRes.status}`);

  // === FAVORITES ===
  const favRes = http.get(FAVORITES_URL, { headers });
  check(favRes, { 'favorites status 200': (r) => r.status === 200 });
  console.log(`Favorites for ${account}: HTTP ${favRes.status}`);

  // === GAME CHECK ===
  const gameRes = http.get(GAME_URL, { headers });
  check(gameRes, { 'game status 200/201': (r) => r.status === 200 || r.status === 201 });
  console.log(`Game 38815 for ${account}: HTTP ${gameRes.status}`);

  sleep(Math.random() * 2 + 1);
}
