import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 1,        // количество виртуальных пользователей
  iterations: 20, // общее количество запросов
};

const GAME_URL = 'https://api.luckystake.com/games/link/35816?platform=2&locale=en&country_code=US&currency=GC&c=Popular&p=2';

// Token should be pasted every single time
const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsYW5ndWFnZSI6InJ1IiwiZW1haWwiOiJ3aXp0ZXN0KzcwMDAxQGdtYWlsLmNvbSIsInBsYXllcklkIjoiNDg2MDFmNmQtNzM5MS00MDIzLTllOWUtODZmNzIzY2VjNThmIiwicGxheWVyT0lkIjoiMTcwNTM4Iiwic2l0ZUlkIjoiMWEyYTkwMjMtZGQwYy00MDUyLTkzZWYtYjVlNjk2ZGFlYjMyIiwic2l0ZU9JZCI6IjIiLCJzZXNzaW9uSWQiOiJkZWU1Zjc5Yy04OWYyLTQ1Y2QtYTdiYi05MzRiOTMxOTM2ZmQiLCJpYXQiOjE3NjAxMTI5MTUsImV4cCI6MTc2MjcwNDkxNX0.Exao8Cb5GyZFIaYHIW9EBM6o9-S1Cot_DySIEKoV6kk';

export default function () {
  const headers = {
    'Accept': 'application/json, text/plain, */*',
    'Authorization': TOKEN,
    'Origin': 'https://luckystake.com',
    'Referer': 'https://luckystake.com/',
    'x-platform': 'web',
    'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 OPR/122.0.0.0',
  };

  const res = http.get(GAME_URL, { headers });

  console.log('HTTP status: ' + res.status);
  console.log('Response body: ' + res.body);

  check(res, {
    'game link succeeded (200)': (r) => r.status === 200,
  });
}
