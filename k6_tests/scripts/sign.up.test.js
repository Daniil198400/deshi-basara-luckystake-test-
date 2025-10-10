import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 1,
  iterations: 1,
};

// unique names
const now = Date.now();
const EMAIL = `prod_${now}@gmail.com`;
const PASSWORD = 'Qwerty1!!';
// nickName no longer than 20 symbols
const NICKNAME = (`u${now}`).substring(0, 20);

// affiliate code from the link
const AFFILIATE = '170538_8E6HGLDH';

export default function () {
  const payload = JSON.stringify({
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
    language: 'ru',
    currency: 'GC',
    affiliate: AFFILIATE, // ← здесь используется код из твоей ссылки
  });

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*',
    'Origin': 'https://luckystake.com',
    'Referer': 'https://luckystake.com/',
    'x-platform': 'web',
    'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 OPR/122.0.0.0',
  };

  const res = http.post('https://api.luckystake.com/player/crm/sign-up', payload, { headers });

  console.log('HTTP status: ' + res.status);
  console.log('Response body: ' + res.body);

  check(res, {
    'sign-up created (200|201)': (r) => r.status === 200 || r.status === 201,
  });

  // для отладки: если 422 с affiliate, можно логнуть рекомендацию
  if (res.status === 422) {
    console.log('Server returned 422 — вероятно, affiliate не найден или недействителен.');
    console.log('Проверь ссылку/код партнёра или попробуй убрать поле affiliate для теста.');
  }
}
