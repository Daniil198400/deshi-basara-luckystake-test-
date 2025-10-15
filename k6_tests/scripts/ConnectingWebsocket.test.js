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
const LIVECHAT_WS_URL = 'wss://api.livechatinc.com/v3.5/customer/rtm/ws?organization_id=50d5b725-c659-40d6-833b-f9b9b3d22cad&x-region=us-south1';
const SMARTICO_WS_URL = 'wss://api.smartico.ai/websocket/services?master&domain=luckystake.com&version=1.3.307';

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

  let token = null;
  try {
    token = loginRes.json('token') || loginRes.json('accessToken');
  } catch (e) {
    console.log(`VU=${__VU} ACCOUNT=${account} → failed to get token`);
  }

  if (!token) return;

  // ======= LIVECHAT WS =======
  console.log(`VU=${__VU} ACCOUNT=${account} → CONNECTING to WS livechat`);
  const livechatRes = ws.connect(LIVECHAT_WS_URL, {}, (socket) => {
    socket.on('open', () => {
      console.log(`VU=${__VU} WS livechat OPENED`);
      // Пробуем отправить корректное событие join_chat
      const joinPayload = JSON.stringify({ type: 'join', payload: { chat_id: 'default' } });
      socket.send(joinPayload);
    });

    socket.on('message', (msg) => {
      console.log(`VU=${__VU} WS livechat MESSAGE: ${msg}`);
    });

    socket.on('close', () => console.log(`VU=${__VU} WS livechat CLOSED`));
    socket.on('error', (e) => console.log(`VU=${__VU} WS livechat ERROR: ${e}`));
  });
  check(livechatRes, { 'ws connected livechat': (r) => r && r.status === 101 });

  // ======= STREAM WS (socket.io) =======
  console.log(`VU=${__VU} ACCOUNT=${account} → CONNECTING to WS stream`);
  const streamRes = ws.connect(STREAM_WS_URL, {}, (socket) => {
    socket.on('open', () => {
      console.log(`VU=${__VU} WS stream OPENED`);
      // socket.io формат: отправим ping или subscribe на каналы
      // В socket.io, "42" это событие message, [channel, data]
      const subscribePayload = '42["subscribe",{"channels":["game_updates","bets","rounds"]}]';
      socket.send(subscribePayload);
    });

    socket.on('message', (msg) => {
      console.log(`VU=${__VU} WS stream MESSAGE: ${msg}`);
    });

    socket.on('close', () => console.log(`VU=${__VU} WS stream CLOSED`));
    socket.on('error', (e) => console.log(`VU=${__VU} WS stream ERROR: ${e}`));
  });
  check(streamRes, { 'ws connected stream': (r) => r && r.status === 101 });

  // ======= SMARTICO WS (без изменений) =======
  console.log(`VU=${__VU} ACCOUNT=${account} → CONNECTING to WS smartico`);
  const smarticoRes = ws.connect(SMARTICO_WS_URL, {}, (socket) => {
    socket.on('open', () => console.log(`VU=${__VU} WS smartico OPENED`));
    socket.on('message', (msg) => console.log(`VU=${__VU} WS smartico MESSAGE: ${msg}`));
    socket.on('close', () => console.log(`VU=${__VU} WS smartico CLOSED`));
    socket.on('error', (e) => console.log(`VU=${__VU} WS smartico ERROR: ${e}`));
  });
  check(smarticoRes, { 'ws connected smartico': (r) => r && r.status === 101 });

  sleep(2); // немного подождем, чтобы успеть получить сообщения
}
