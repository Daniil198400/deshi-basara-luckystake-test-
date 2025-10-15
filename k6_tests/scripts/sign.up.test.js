import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  iterations: 1,
};

// === 1️⃣ Уникальные данные пользователя ===
const RAND_NUM = Math.floor(Math.random() * 1000) + 2000;
const EMAIL = `wiztest+${RAND_NUM}@gmail.com`;
const PASSWORD = 'Qwerty1!';
const NICKNAME = EMAIL.split('@')[0].substring(0, 20);

// === 2️⃣ Affiliate code ===
const AFFILIATE_LINK = 'https://luckystake.com/?c=222627_cFCYNg9h';
const AFFILIATE = AFFILIATE_LINK.match(/c=([^&]+)/)?.[1] || '';

// === 3️⃣ Общие заголовки ===
const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json, text/plain, */*',
  'Origin': 'https://luckystake.com',
  'Referer': 'https://luckystake.com/',
  'x-platform': 'web',
  'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 OPR/122.0.0.0',
};

export default function () {
  // === 4️⃣ Validate email ===
  const validateEmail = JSON.stringify({
    type: 'email',
    payload: EMAIL,
  });
  const resValidateEmail = http.post('https://api.luckystake.com/player/crm/validate', validateEmail, { headers: HEADERS });
  console.log('validate email status:', resValidateEmail.status, resValidateEmail.body);
  check(resValidateEmail, { 'validate email 201': (r) => r.status === 201 });

  // === 5️⃣ Validate nickName ===
  const validateNick = JSON.stringify({
    type: 'nickName', // правильный enum для nickname
    payload: NICKNAME,
  });
  const resValidateNick = http.post('https://api.luckystake.com/player/crm/validate', validateNick, { headers: HEADERS });
  console.log('validate nickName status:', resValidateNick.status, resValidateNick.body);
  check(resValidateNick, { 'validate nickName 201': (r) => r.status === 201 });

  sleep(0.5);

  // === 6️⃣ Sign-up ===
  const signUpPayload = JSON.stringify({
    email: EMAIL,
    password: PASSWORD,
    confirmPassword: PASSWORD,
    nickName: NICKNAME,
    firstName: 'John',
    lastName: 'Doe',
    birthDate: '2000-02-10T00:00:00.000Z',
    gender: 'other',
    citizenship: 'US',
    address: {
      addressCountryAlfa2: 'US',
      city: 'Miami',
      state: 'FL',
      street: 'Ocean Drive',
      zipCode: '33139',
    },
    language: 'en',   // корректный формат
    currency: 'USD',  // корректный формат
    affiliate: AFFILIATE,
  });

  const resSignUp = http.post('https://api.luckystake.com/player/crm/sign-up', signUpPayload, { headers: HEADERS });
  console.log('sign-up status:', resSignUp.status, resSignUp.body);
  check(resSignUp, { 'sign-up 201': (r) => r.status === 201 });

  // === 7️⃣ Извлекаем Bearer token ===
  let accessToken = '';
  try {
    const json = resSignUp.json();
    if (json && json.token) {
      accessToken = json.token; // предполагаемое поле с токеном
      console.log('accessToken получен:', accessToken);
    } else {
      console.log('token в ответе sign-up не найден');
    }
  } catch (e) {
    console.log('Не удалось распарсить JSON sign-up:', e);
  }

  if (accessToken) {
    // === 8️⃣ GET /shop/player ===
    const shopHeaders = { ...HEADERS, 'Authorization': `Bearer ${accessToken}` };
    const resShop = http.get('https://api.luckystake.com/shop/player', { headers: shopHeaders });
    console.log('shop/player status:', resShop.status);
    console.log('shop/player body:', resShop.body);
  }
}
