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

// Настройте под ваш запуск: должен совпадать с options.vus
const TARGET_TOKENS = 50;

export const options = {
  vus: 30,
  duration: '1m30s',
  // можно заменить на stages и thresholds по вкусу
};

function loginOnce(account) {
  const payload = JSON.stringify({ email: account, password: PASSWORD });
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*',
    'x-platform': 'web',
    'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
  };
  return http.post(LOGIN_URL, payload, { headers });
}

export function setup() {
  const tokens = [];
  let accountIndex = 0;
  const maxAttemptsPerToken = 3;

  // Создаём токены выбранного количества TARGET_TOKENS
  while (tokens.length < TARGET_TOKENS) {
    const account = ACCOUNTS[accountIndex % ACCOUNTS.length];
    let attempt = 0;
    let success = false;

    while (attempt < maxAttemptsPerToken && !success) {
      attempt++;
      const res = loginOnce(account);

      if (res.status === 200 || res.status === 201) {
        // Попытка достать токен (проверь реальное имя поля)
        let token = null;
        try {
          token = res.json('token') || res.json('accessToken') || null;
        } catch (e) {
          token = null;
        }

        if (token) {
          tokens.push(token);
          success = true;
          // лог для диагностики
          console.log(`SETUP: token ${tokens.length} created for account ${account} (attempt ${attempt})`);
        } else {
          console.log(`SETUP WARN: login succeeded but token not found for ${account} (attempt ${attempt})`);
        }
      } else {
        console.log(`SETUP WARN: login failed for ${account} status=${res.status} (attempt ${attempt})`);
      }

      // небольшая пауза между ретраями, чтобы не спамить авторизацию
      if (!success) {
        // sleep здесь в setup() допустим
        sleep(0.2);
      }
    }

    // Если не удалось получить токен для текущего аккаунта за maxAttemptsPerToken,
    // просто переходим к следующему аккаунту (чтобы не застрять на одном аккаунте)
    accountIndex++;

    // Безопасный выход при недостатке аккаунтов: если цикл долго не может набрать токены,
    // избегаем бесконечного цикла — после попытки по всем аккаунтам выходим.
    if (accountIndex >= ACCOUNTS.length && tokens.length === 0) {
      console.log('SETUP ERROR: no tokens could be created from any account. Exiting setup with empty tokens.');
      break;
    }
    // Если прошли полный круг и токенов всё ещё слишком мало, попробуем ещё один круг:
    if (accountIndex >= ACCOUNTS.length * 5) { // лимит кругов (измените при необходимости)
      console.log(`SETUP: stopped after ${accountIndex} attempts, tokens created: ${tokens.length}`);
      break;
    }
  }

  console.log(`SETUP finished. tokens created: ${tokens.length}`);
  return { tokens };
}

export default function (data) {
  const tokens = data.tokens || [];
  if (tokens.length === 0) {
    // нет токенов — ничего не делаем
    console.log(`VU=${__VU} no tokens available, skipping`);
    return;
  }

  // Привязываем VU к токену: если токенов >= VU => уникален, иначе токены будут переиспользоваться равномерно
  const tokenIndex = (__VU - 1) % tokens.length;
  const token = tokens[tokenIndex];

  const gameHeaders = {
    'Accept': 'application/json, text/plain, */*',
    'Authorization': `Bearer ${token}`,
    'x-platform': 'web',
    'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
  };

  // Пример: делаем серию запросов к игре в течение 30 секунд
  const endTime = Date.now() + 30000;
  while (Date.now() < endTime) {
    const res = http.get(GAME_URL, { headers: gameHeaders });
    check(res, { 'game status 200': (r) => r.status === 200 });

    sleep(Math.random() * 2 + 1);
  }
}