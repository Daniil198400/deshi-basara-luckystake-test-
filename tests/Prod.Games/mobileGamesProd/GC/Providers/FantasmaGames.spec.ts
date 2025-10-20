import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../../pages/LoginPage';
import { HomePage } from '../../../../../pages/HomePage';
import { GamePage } from '../../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../../utils/utils';

// массив ID игр
const gameIds = [
  "28492", "28484", "28493", "28479", "28481", "28494", "28485",
  "28478", "28487", "28490", "28480", "28482", "28488", "28491",
  "28495", "28483", "28489", "28486"
];

// основная функция, проходящая по всем играм
async function playGames(page: Page) {
  for (const id of gameIds) {
    const gameUrl = `https://luckystake.com/game/real/${id}`;
    console.log(`🎮 Открываем игру ${id} → ${gameUrl}`);

    await page.goto(gameUrl);
    await delay5Seconds();

    // Скриншот до Play now
    let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_before_playnow`, {
      body: screenshot,
      contentType: 'image/png'
    });

    // Нажимаем Play now
    await page.getByRole('button', { name: 'Play now' }).click();

    try {
      await page.waitForLoadState('networkidle', { timeout: 60000 });
    } catch {
      console.warn('network idle is not found after 60 sec await page.locator');
    }

    await delay10Seconds();
    await delay10Seconds();

    // --- Работа с iframe и кликами ---
    const outerFrameHandle = await page.locator('iframe[title="Real game"]').elementHandle();
    const outerFrame = await outerFrameHandle?.contentFrame();

    if (!outerFrame) {
      console.warn('❗ Не удалось получить внешний iframe');
      continue;
    }

    await outerFrame.waitForSelector('#game', { timeout: 15000 });
    const innerFrameHandle = await outerFrame.locator('#game').elementHandle();
    const innerFrame = await innerFrameHandle?.contentFrame();

    if (!innerFrame) {
      console.warn('❗ Не удалось получить внутренний iframe');
      continue;
    }

    // Проверяем наличие #GameCanvas
    const hasGameCanvas = await innerFrame.locator('#GameCanvas').count();

    if (hasGameCanvas > 0) {
      console.log('✅ Найден #GameCanvas — кликаем несколько раз вокруг точки');

      const clickPositions = [
        { x: 178, y: 567 },
        { x: 182, y: 583 },
        { x: 189, y: 587 },
        { x: 172, y: 590 },
        { x: 176, y: 580 }
      ];

      for (const pos of clickPositions) {
        console.log(`🖱️ Кликаем по x:${pos.x}, y:${pos.y}`);
        await innerFrame.locator('#GameCanvas').click({
          position: pos,
          force: true
        });
        await page.waitForTimeout(200); // пауза 200 мс между кликами
      }

    } else {
      console.log('⚠️ Элемент #GameCanvas не найден, пробуем canvas');
      await innerFrame.locator('canvas').click({
        position: { x: 617, y: 596 },
        force: true
      });
    }

    await delay10Seconds();

    // Скриншот после кликов
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_after_wait`, {
      body: screenshot,
      contentType: 'image/png'
    });

    console.log(`✅ Завершено выполнение для игры ${id}`);
  }
}

// --- Основной тест ---
test('@ClickOnAdditionalStepMobile Fantasma Games', async ({ context }) => {
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const gamePage = new GamePage(page);

  console.log('🚀 Запуск теста Fantasma Games');

  // Авторизация
  await page.goto('https://luckystake.com/');
  await homePage.closePopupIfVisible();
  await loginPage.openLoginForm();
  await loginPage.login('wiztest+70001@gmail.com', 'Qwerty1!');
  await delay5Seconds();

  // Запуск игр
  await playGames(page);
});
