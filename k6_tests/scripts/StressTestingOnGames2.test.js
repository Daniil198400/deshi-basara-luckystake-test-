import http from 'k6/http';
import { check } from 'k6';

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

export const options = {
  vus: 30,           // 30 виртуальных пользователей
  iterations: 30,     // каждый делает только 1 итерацию
};

export default function () {
  // выбираем аккаунт для данного VU
  const vuIndex = (__VU - 1) % ACCOUNTS.length;
  const account = ACCOUNTS[vuIndex];

  // === LOGIN ===
  const loginRes = http.post(LOGIN_URL, JSON.stringify({
    email: account,
    password: PASSWORD,
  }), {
    headers: {
      'Content-Type': 'application/json',
      'x-platform': 'web',
      'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
    },
  });

  const token = loginRes.json('token') || loginRes.json('accessToken');
  if (!token) {
    console.log(`VU=${__VU} login failed for ${account}`);
    return;
  }

  // === GAME CLICK ===
  const res = http.get(GAME_URL, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'x-platform': 'web',
      'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
    },
  });

  check(res, { 'game status 200': (r) => r.status === 200 });

  console.log(`VU=${__VU} account=${account} clicked the game`);
}
