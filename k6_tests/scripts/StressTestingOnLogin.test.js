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

const TARGET_TOKENS = 50;

export const options = {
  vus: 30,
  duration: '1m30s',
};

// ------------ LOGIN ONE ACCOUNT ------------
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

// ------------ SETUP: CREATE TOKENS ------------
export function setup() {
  const tokens = [];
  let accountIndex = 0;
  const maxAttemptsPerToken = 3;

  console.log(`\n===== SETUP STARTED: Trying to create ${TARGET_TOKENS} tokens =====`);

  while (tokens.length < TARGET_TOKENS) {
    const account = ACCOUNTS[accountIndex % ACCOUNTS.length];
    let attempt = 0;
    let success = false;

    while (attempt < maxAttemptsPerToken && !success) {
      attempt++;
      const res = loginOnce(account);

      if (res.status === 200 || res.status === 201) {
        let token = null;
        try {
          const json = res.json();
          token = json.token || json.accessToken || null;
        } catch (_) {}

        if (token) {
          tokens.push(token);
          success = true;

          console.log(`✔️ SETUP: LOGIN OK → ${account} (attempt ${attempt}) -> Token #${tokens.length}`);
        } else {
          console.log(`⚠️ SETUP WARN: login OK but NO TOKEN → ${account} (attempt ${attempt})`);
        }

      } else {
        console.log(`❌ SETUP LOGIN FAIL → ${account} | status=${res.status} (attempt ${attempt})`);
      }

      if (!success) sleep(0.2);
    }

    accountIndex++;

    if (accountIndex >= ACCOUNTS.length * 5) {
      console.log(`⚠️ SETUP STOPPED: too many attempts. Tokens: ${tokens.length}`);
      break;
    }
  }

  console.log(`===== SETUP FINISHED: Created tokens: ${tokens.length} =====\n`);
  return { tokens };
}

// ------------ MAIN LOAD PHASE ------------
export default function (data) {
  const tokens = data.tokens || [];
  if (tokens.length === 0) {
    console.log(`VU ${__VU}: ❌ NO TOKENS AVAILABLE → skipping`);
    return;
  }

  // Привязка VU → Token
  const tokenIndex = (__VU - 1) % tokens.length;
  const token = tokens[tokenIndex];

  console.log(`VU ${__VU}: 🎫 USING TOKEN #${tokenIndex + 1}`);

  const gameHeaders = {
    'Accept': 'application/json, text/plain, */*',
    'Authorization': `Bearer ${token}`,
    'x-platform': 'web',
    'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
  };

  const endTime = Date.now() + 30000;

  while (Date.now() < endTime) {
    console.log(`VU ${__VU} →  CLICKING GAME...`);

    const res = http.get(GAME_URL, { headers: gameHeaders });

    if (res.status === 200) {
      console.log(`VU ${__VU}: GAME OK (status 200)`);
    } else {
      console.log(`VU ${__VU}: GAME ERROR: status=${res.status} body=${String(res.body).slice(0, 120)}`);
    }

    check(res, { 'game status 200': (r) => r.status === 200 });

    sleep(Math.random() * 2 + 1);
  }
}
