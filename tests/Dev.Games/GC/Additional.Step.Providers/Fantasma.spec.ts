import { test as base, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { GamePage } from '../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';

// расширяем test, добавляем httpCredentials
const test = base.extend<{}>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      httpCredentials: {
        username: 'luckystake',
        password: 'luckystake1!',
      },
    });
    await use(context);
    await context.close();
  },
});

// массив ID игр
const gameIds = [
  "28492", "28484", "28493", "28479", "28481", "28494", "28485",
  "28478", "28487", "28490", "28480", "28482", "28488", "28491",
  "28495", "28483", "28489", "28486"
];

// основная функция, проходящая по всем играм
async function playGames(page: Page) {
  for (const id of gameIds) {
    const gameUrl = `https://luckystake.dev/game/real/${id}`;
    console.log(`Открываем игру ${id} → ${gameUrl}`);

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
      await page.waitForLoadState('networkidle', { timeout: 40000 });
    } catch {
      console.warn('Network idle не достигнут за 40 сек, продолжаем...');
    }

    await delay10Seconds();
    await delay10Seconds();

    // --- Работа с iframe и кликами ---
    const outerFrameHandle = await page.locator('iframe[title="Real game"]').elementHandle();
    const outerFrame = await outerFrameHandle?.contentFrame();

    if (!outerFrame) {
      console.warn(' Не удалось получить внешний iframe');
      continue;
    }

    await outerFrame.waitForSelector('#game', { timeout: 15000 });
    const innerFrameHandle = await outerFrame.locator('#game').elementHandle();
    const innerFrame = await innerFrameHandle?.contentFrame();

    if (!innerFrame) {
      console.warn(' Не удалось получить внутренний iframe');
      continue;
    }

    // Проверяем наличие #GameCanvas
    const hasGameCanvas = await innerFrame.locator('#GameCanvas').count();

    if (hasGameCanvas > 0) {
      console.log('Найден #GameCanvas — кликаем несколько раз вокруг точки');



      const clickPositions = [
        { x: 618, y: 597 },
        { x: 612, y: 593 },
        { x: 619, y: 610 },
        { x: 620, y: 600 },
        { x: 626, y: 613 }
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
      console.log('Элемент #GameCanvas не найден, пробуем canvas');
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

    console.log(` Завершено выполнение для игры ${id}`);
  }
}

test('@providersDev Fantasma Games', async ({ page }) => {
     /**
 * Clicks the "close" button if it exists on the page.
 * @param {import('@playwright/test').Page} page - The Playwright page object.
 */
async function clickCloseIfPresent(page: Page) {
  const closeButton = page.getByRole('img', { name: 'close' });
  if (await closeButton.count() > 0) {
    await closeButton.first().click();
    console.log('Close button clicked');
  } else {
    console.log('Close button not found, skipping click');
  }
}

// await clickCloseIfPresent(page);
  await page.goto('https://luckystake.dev/');
  
  await page.getByTestId('login-header').click();
  await page.getByTestId('email-input-login').click();
  await page.getByTestId('email-input-login').fill('dksld123@gmail.com');
  await page.getByTestId('password-input-login').click();
  await page.getByTestId('password-input-login').fill('Qwerty1!');
  await page.getByTestId('submit-button-login').click();
  await delay5Seconds();

  await clickCloseIfPresent(page);

  const scImage = page.getByRole('img', { name: 'SC', exact: true });
        if (await scImage.isVisible()) {
          await scImage.scrollIntoViewIfNeeded();
          await scImage.click({ force: true });
          console.log('click on GC');
        }
      await delay5Seconds();  
  // launching the games
  await playGames(page);
});

