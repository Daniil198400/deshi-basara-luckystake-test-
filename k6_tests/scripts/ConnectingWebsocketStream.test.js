import ws from 'k6/ws';
import http from 'k6/http';
import { check, sleep } from 'k6';

const ACCOUNTS = [
  'prod_test1@gmail.com', 'prod_test2@gmail.com', 'prod_test3@gmail.com',
  'prod_test4@gmail.com', 'prod_test5@gmail.com'
];

const PASSWORD = 'Qwerty1!';
const LOGIN_URL = 'https://api.luckystake.com/player/crm/login';
const STREAM_WS_URL = 'wss://stream.luckystake.com/socket.io/?EIO=4&transport=websocket';

export const options = {
  vus: 5,
  duration: '60s',
};

export default function () {
  const vuIndex = (__VU - 1) % ACCOUNTS.length;
  const account = ACCOUNTS[vuIndex];

  // ======= LOGIN =======
  console.log(`VU=${__VU} ACCOUNT=${account} → START login`);
  const loginPayload = JSON.stringify({ email: account, password: PASSWORD });
  const loginHeaders = {
    'Content-Type': 'application/json',
    'x-platform': 'web',
    'x-site-id': '1a2a9023-dd0c-4052-93ef-b5e696daeb32',
    'Referer': 'https://luckystake.com/',
  };

  const loginRes = http.post(LOGIN_URL, loginPayload, { headers: loginHeaders });
  check(loginRes, { 'login status 200|201': (r) => r.status === 200 || r.status === 201 });
  console.log(`VU=${__VU} ACCOUNT=${account} → LOGIN status=${loginRes.status}`);

  const token = loginRes.json('token') || loginRes.json('accessToken');
  if (!token) return;

  // ======= SOCKET.IO WS =======
  console.log(`VU=${__VU} ACCOUNT=${account} → CONNECTING to Socket.IO stream with token`);

  const streamRes = ws.connect(STREAM_WS_URL, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }, (socket) => {

    socket.on('open', () => {
      console.log(`VU=${__VU} WS stream OPENED`);

      // Socket.IO требует отправить "40" после открытия
      socket.send('40');

      // Подписка на каналы через событие "42"
      const subscribePayload = '42["subscribe",{"channels":["game_updates","bets","rounds"]}]';
      socket.send(subscribePayload);

      // Поддержка ping/pong вручную
      socket.setInterval(() => {
        socket.ping();
      }, 20000); // каждые 20 секунд
    });

    socket.on('message', (msg) => {
      console.log(`VU=${__VU} WS stream MESSAGE: ${msg}`);

      // Socket.IO ping/pong обработка
      if (msg === '3') {
        socket.send('3'); // pong
      }
    });

    socket.on('close', () => console.log(`VU=${__VU} WS stream CLOSED`));
    socket.on('error', (e) => console.log(`VU=${__VU} WS stream ERROR: ${e}`));
  });

  check(streamRes, { 'ws connected stream': (r) => r && r.status === 101 });

  // Ждем немного, чтобы получать сообщения
  sleep(5);
}
