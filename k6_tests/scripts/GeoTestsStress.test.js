import http from 'k6/http';
import { check, sleep } from 'k6';

const ACCOUNTS = [
  'prod_test1@gmail.com',
  'prod_test2@gmail.com',
  'prod_test3@gmail.com',
];

const PASSWORD = 'Qwerty1!';
const LOGIN_URL = 'https://api.luckystake.com/player/crm/login';
const INFO_URL = 'https://api.luckystake.com/player/crm/info';

// Regions with delay
const REGIONS = [
  { name: 'US', delay: 50 },
  { name: 'EU', delay: 100 },
  { name: 'ASIA', delay: 200 },
];

export const options = {
  vus: 10,
  duration: '20s',
};

export default function () {
  const account = ACCOUNTS[(__VU - 1) % ACCOUNTS.length];
  
  // ======= LOGIN =======
  const loginPayload = JSON.stringify({ email: account, password: PASSWORD });
  const loginHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-platform': 'web',
    'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
    'User-Agent': 'k6loadtest/1.0 (+https://k6.io/)',
  };
  
  const loginRes = http.post(LOGIN_URL, loginPayload, { headers: loginHeaders });
  const loginSuccess = check(loginRes, {
    'login succeeded': (r) => r.status === 200 || r.status === 201,
  });

  if (!loginSuccess) {
    console.log(`❌ Login failed for ${account}, status=${loginRes.status}`);
    return;
  }

  const token = loginRes.json('token') || loginRes.json('accessToken');
  if (!token) {
    console.log(`❌ Token not found for ${account}`);
    return;
  }

  // ======= Geo-тесты =======
  REGIONS.forEach((region) => {
    // Симуляция сетевой задержки
    sleep(region.delay / 1000);

    const infoHeaders = {
      'Authorization': `Bearer ${token}`,
      'x-platform': 'web',
      'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
      'Accept': 'application/json',
    };

    const infoRes = http.get(INFO_URL, { headers: infoHeaders });
    const infoSuccess = check(infoRes, {
      'info status 200': (r) => r.status === 200,
    });

    console.log(`🌍 VU=${__VU} region=${region.name} delay=${region.delay}ms status=${infoRes.status}, success=${infoSuccess}`);
  });

  // ======= Пауза =======
  sleep(Math.random() * 2 + 1);
}
