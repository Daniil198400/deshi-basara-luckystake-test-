import ws from 'k6/ws';
import { check, sleep } from 'k6';

const LIVECHAT_WS_URL = 'wss://api.livechatinc.com/v3.5/customer/rtm/ws?organization_id=50d5b725-c659-40d6-833b-f9b9b3d22cad&x-region=us-south1';

export const options = {
  vus: 1,
  duration: '60s',
};

export default function () {
  console.log('🚀 Connecting to LiveChat WS...');

  const res = ws.connect(LIVECHAT_WS_URL, {}, (socket) => {
    socket.on('open', () => {
      console.log('✅ WebSocket connected');

      // === 1️⃣ Логин (анонимный) ===
      const loginPayload = JSON.stringify({
        action: 'login',
        payload: {
          organization_id: '50d5b725-c659-40d6-833b-f9b9b3d22cad'
        }
      });
      socket.send(loginPayload);
      console.log('➡️ Sent login');

      // === 2️⃣ После паузы — старт чата ===
      sleep(1);
      const startChatPayload = JSON.stringify({
        action: 'start_chat',
        payload: {
          chat: {
            thread: {
              events: [
                {
                  type: 'message',
                  text: 'Привет из K6!'
                }
              ]
            }
          }
        }
      });
      socket.send(startChatPayload);
      console.log('➡️ Sent start_chat (message: "Привет из K6!")');

      // === 3️⃣ Поддерживаем соединение пингами ===
      socket.setInterval(() => {
        socket.send(JSON.stringify({ action: 'ping' }));
      }, 5000);
    });

    socket.on('message', (msg) => {
      console.log(`📩 MESSAGE: ${msg}`);
    });

    socket.on('error', (e) => console.log(`❌ ERROR: ${e}`));
    socket.on('close', () => console.log('🔚 WS CLOSED'));
  });

  check(res, { 'connected successfully': (r) => r && r.status === 101 });

  sleep(5);
}
