import { test, Page } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { GamePage } from '../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';

// Массив ID игр
const gameIds = [
  28549, 
  28609, 28568, 28534, 28563, 28555, 28551, 28550, 28547, 21067, 28616, 
  28545, 28561, 28613, 28606, 28533, 28546, 28565, 28603, 28596, 40489, 40490, 38799, 28591, 35543,
  28539, 28569, 28570, 28601, 28619, 28559, 28587, 28618, 28605, 28614,
  28620, 28617, 28590, 28574, 28543, 28611, 28583, 28535, 28621, 28579,
  28554, 28542, 28584, 28536, 28586, 28580, 28576, 28532, 28600, 28564,
  28602, 28567, 28604, 28571, 28558, 28560, 28589, 28615, 28577, 28562, 
  28544, 28599, 28537, 28578, 28573, 28588, 28612, 28607, 28549, 
  28609, 28568, 28534, 28563, 28555, 28551, 28550, 28547, 21067, 28616, 
  28545, 28561, 28613, 28606, 28533
];

// Типизация возможных целей клика
type ClickCandidate =
  | { type: 'role'; role: string; name: string; exact?: boolean }
  | { type: 'text'; value: string }
  | { type: 'selector'; selector: string };

// Координаты для кликов по canvas
const canvasPoints = [
  { x: 580, y: 590 }, { x: 593, y: 589 }, { x: 580, y: 594 },
  { x: 618, y: 603 }, { x: 602, y: 581 }, { x: 589, y: 587 },
  { x: 582, y: 586 }, { x: 619, y: 590 }, { x: 581, y: 587 },
  { x: 585, y: 573 }, { x: 590, y: 588 }, { x: 585, y: 587 },
  { x: 568, y: 581 }, { x: 589, y: 593 }, { x: 589, y: 597 },
  { x: 603, y: 576 }, { x: 587, y: 605 }, { x: 589, y: 598 },
  { x: 574, y: 591 }, { x: 577, y: 597 }
];

// Основная функция клика
async function clickGameElement(page: Page) {
  const outerFrameHandle = await page.locator('iframe[title="Real game"]').elementHandle();
  if (!outerFrameHandle) return;

  const outerFrame = await outerFrameHandle.contentFrame();
  if (!outerFrame) return;

  const gameFrameHandle = await outerFrame.locator('#game').elementHandle();
  if (!gameFrameHandle) return;

  const gameFrame = await gameFrameHandle.contentFrame();
  if (!gameFrame) return;

  const candidates: ClickCandidate[] = [
    { type: 'role', role: 'button', name: 'START', exact: true },
    { type: 'text', value: 'Click to continue' },
    { type: 'text', value: 'CLICK TO CONTINUE' },
    { type: 'text', value: 'START' },
    { type: 'selector', selector: '.logo' },
    { type: 'selector', selector: '.fadeOverlay' },
    { type: 'selector', selector: '.gameLogo' },
    { type: 'selector', selector: 'canvas' },
    { type: 'selector', selector: '#test-id canvas' }
  ];

  for (const c of candidates) {
    try {
      if (c.type === 'role') {
        const el = gameFrame.getByRole(c.role as any, { name: c.name, exact: c.exact ?? false });
        if (await el.count()) {
          await el.first().click({ force: true });
          console.log(`🎯 Клик по кнопке: ${c.name}`);
          return;
        }
      } else if (c.type === 'text') {
        const el = gameFrame.getByText(c.value, { exact: false });
        if (await el.count()) {
          await el.first().click({ force: true }); // force применён
          console.log(`🎯 Клик по тексту: ${c.value}`);
          return;
        }
      } else if (c.type === 'selector') {
        const el = gameFrame.locator(c.selector);
        if (await el.count()) {
          if (c.selector.includes('canvas')) {
            const { x, y } = canvasPoints[Math.floor(Math.random() * canvasPoints.length)];
            await el.first().click({ position: { x, y }, force: true });
            console.log(`🎯 Клик по canvas (${x}, ${y})`);
          } else {
            await el.first().click({ force: true });
            console.log(`🎯 Клик по селектору: ${c.selector}`);
          }
          return;
        }
      }
    } catch (err) {
      console.warn(`⚠️ Ошибка при клике по ${JSON.stringify(c)}: ${err}`);
    }
  }

  // 🔹 Фоллбек: принудительный клик по 'START'
  try {
    await gameFrame.getByText('START').click({ force: true });
    console.log(`🎯 Фоллбек клик по START`);
  } catch {}
}

// Основная функция прохождения игр
async function playGames(page: Page) {
  for (const id of gameIds) {
    const gameUrl = `https://luckystake.com/game/real/${id}`;
    console.log(`🎮 Открываем игру: ${gameUrl}`);

    await page.goto(gameUrl);
    await delay5Seconds();

    let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_before_playnow`, {
      body: screenshot,
      contentType: 'image/png'
    });

    try {
      await page.getByRole('button', { name: 'Play now' }).click({ force: true }); // force применён
    } catch {
      console.warn('⚠️ Не удалось кликнуть по кнопке Play now');
    }

    await delay5Seconds();

    try {
      await page.waitForLoadState('networkidle', { timeout: 20000 });
    } catch {
      console.warn('⏱️ Network idle не наступил за 30 сек, продолжаем...');
    }

    await delay5Seconds();

    await clickGameElement(page);

    await delay5Seconds();

    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_after_click`, {
      body: screenshot,
      contentType: 'image/png'
    });

    console.log(`✅ Игра ${id} завершена`);
    await delay5Seconds();
  }
}

// Тест Relax
test('@ClickOnAdditionalStep Relax', async ({ context }) => {
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const gamePage = new GamePage(page);

  console.log('🚀 Запуск теста Relax');

  await page.goto('https://luckystake.com/');
  await homePage.closePopupIfVisible();
  await loginPage.openLoginForm();
  await loginPage.login('wiztest+70001@gmail.com', 'Qwerty1!');
  await delay5Seconds();

//Playing 28593 game cause of trouble button
await page.goto('https://luckystake.com/game/real/28593');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
let screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28593_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
try {
      await page.waitForLoadState('networkidle', { timeout: 20000 });
    } catch {
      console.warn('⏱️ Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('START').click();

await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28593_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();

  await playGames(page);

  console.log('🏁 Тест Relax завершён');
});
