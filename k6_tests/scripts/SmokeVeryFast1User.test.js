import http from 'k6/http';
import { check, sleep } from 'k6';

// 🔧 Config
export const options = {
  vus: 1,            // one VU
  iterations: 1,     // one run
  thresholds: {
    http_req_failed: ['rate<0.01'], // no more than 1% of errors
    http_req_duration: ['p(95)<500'], // 95% of requests are faster than 500ms
  },
};

// 🔑 Test credentials
const TEST_EMAIL = 'prod_test1@gmail.com';
const TEST_PASSWORD = 'Qwerty1!';

const LOGIN_URL = 'https://api.luckystake.com/player/crm/login';
const BALANCE_URL = 'https://api.luckystake.com/currency-account/balances';

export default function () {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-platform': 'web',
    'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
  };

  // === LOGIN ===
  const loginRes = http.post(LOGIN_URL, JSON.stringify({
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
  }), { headers });

  check(loginRes, {
    'login: status 200/201': (r) => r.status === 200 || r.status === 201,
    'login: token exists': (r) => !!r.json('accessToken'),
  });

  const token = loginRes.json('accessToken');
  if (!token) {
    console.error('❌ Token not found — skipping balance check');
    return;
  }

  // === BALANCE ===
  const authHeaders = { ...headers, Authorization: `Bearer ${token}` };
  const balanceRes = http.get(BALANCE_URL, { headers: authHeaders });
  const balances = balanceRes.json();

  console.log(`Full balance JSON:\n${JSON.stringify(balances, null, 2)}`);

  // checking summary of every currency
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

  // === CI/CD log ===
  console.log(`✅ Smoke test OK: Login ${loginRes.status}, Balance ${balanceRes.status}`);

  // pause
  sleep(1);
}
