import http from 'k6/http';
import { check, sleep } from 'k6';

// === CONFIG: 1 VU, 1 iteration (smoke) ===
export const options = {
  vus: 1,
  iterations: 1,
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500'],
  },
};

// === credentials / endpoints ===
const TEST_EMAIL = 'prod_test1@gmail.com';
const TEST_PASSWORD = 'Qwerty1!';
const LOGIN_URL = 'https://api.luckystake.com/player/crm/login';
const BALANCE_URL = 'https://api.luckystake.com/currency-account/balances';
const INFO_URL = 'https://api.luckystake.com/player/crm/info';
const GAME_URL =
  'https://api.luckystake.com/games/link/40489?platform=2&locale=en&country_code=US&currency=SC&c=Popular&p=4';
const LOGOUT_URL = 'https://api.luckystake.com/player/crm/logout';

export default function () {
  const baseHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-platform': 'web',
    'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
    Referer: 'https://luckystake.com/',
    'User-Agent': 'k6-smoke/1.0',
  };

  // --- LOGIN ---
  console.log('➡️  LOGIN: sending credentials...');
  const loginRes = http.post(
    LOGIN_URL,
    JSON.stringify({ email: TEST_EMAIL, password: TEST_PASSWORD }),
    { headers: baseHeaders }
  );

  const loginOk = check(loginRes, {
    'login: status 200/201': (r) => r.status === 200 || r.status === 201,
    'login: token exists': (r) => !!r.json('accessToken'),
  });

  console.log(`LOGIN result: HTTP ${loginRes.status}`);
  if (!loginOk) {
    console.error('❌ Login failed — aborting smoke test.');
    console.error(`Body: ${loginRes.body}`);
    return;
  }

  const token = loginRes.json('accessToken');
  const authHeaders = { ...baseHeaders, Authorization: `Bearer ${token}` };

  // --- BALANCE ---
  console.log('➡️  BALANCE: requesting balances...');
  const balanceRes = http.get(BALANCE_URL, { headers: authHeaders });

  check(balanceRes, {
    'balance: status 200': (r) => r.status === 200,
  });

  let balances;
  try {
    balances = balanceRes.json();
    console.log(`Balance response (pretty):\n${JSON.stringify(balances, null, 2)}`);
  } catch (e) {
    console.warn('⚠️ Failed to parse balance JSON:', e);
    console.log('Raw body:', balanceRes.body);
  }

  if (Array.isArray(balances)) {
    balances.forEach((b, i) => {
      const s = b.summary || {};
      check(s, {
        [`balance #${i} total exists`]: () => s.total !== undefined,
        [`balance #${i} total >= 0`]: () => typeof s.total === 'number' && s.total >= 0,
      });
    });
  }

  // --- PLAYER INFO ---
  console.log('➡️  PLAYER INFO: requesting profile data...');
  const infoRes = http.get(INFO_URL, { headers: authHeaders });

  check(infoRes, { 'player info: status 200': (r) => r.status === 200 });

  let playerInfo;
  try {
    playerInfo = infoRes.json();
    console.log(`Full player info:\n${JSON.stringify(playerInfo, null, 2)}`);
  } catch (e) {
    console.warn('⚠️ Failed to parse player info JSON:', e);
    console.log('Raw body:', infoRes.body);
  }

  if (playerInfo) {
    check(playerInfo, {
      'playerId exists': (r) => r.id !== undefined,
      'email exists': (r) => r.email !== undefined,
      'email valid': (r) => typeof r.email === 'string' && r.email.includes('@'),
      'status is active': (r) => r.accountStatus === 'Active',
      'currency exists': (r) => r.currency !== undefined,
    });
  }

  // --- GAME ---
  console.log(`➡️  GAME: requesting game link ${GAME_URL} ...`);
  const gameRes = http.get(GAME_URL, { headers: authHeaders });

  check(gameRes, {
    'game: status 200 or 201': (r) => r.status === 200 || r.status === 201,
  });
  console.log(`GAME result: HTTP ${gameRes.status}`);

  // --- LOGOUT ---
  console.log('➡️  LOGOUT: sending logout request...');
  const logoutRes = http.post(LOGOUT_URL, null, { headers: authHeaders });

  check(logoutRes, {
    'logout: status 200/201/204': (r) =>
      r.status === 200 || r.status === 201 || r.status === 204,
  });
  console.log(`LOGOUT result: HTTP ${logoutRes.status}`);

  // Short sleep (for CI stability)
  sleep(1);
}
