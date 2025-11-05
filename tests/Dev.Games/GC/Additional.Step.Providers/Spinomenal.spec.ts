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

// array of IDs
const gameIds = [
        "13517",
        "13512",
        "13520",
        "13513",
        "10157",
        "10122",
        "10111",
        // "9983" - disabled 
        "23263",
        "21946",
        "25562",
        "13511"
];


// Универсальная функция для кликов по canvas
async function clickCanvasPoints(page: Page) {
  const canvasPoints = [
    { x: 611, y: 563 },
    { x: 608, y: 549 },
    { x: 614, y: 517 },
    { x: 623, y: 521 },
    { x: 610, y: 499 },
    { x: 620, y: 550 },
    { x: 619, y: 510 },
    { x: 601, y: 595 },
  ];



  console.log('searching iframe with game...');

  // Ожидание iframe с игрой
  const outerFrameHandle = await page.waitForSelector('iframe[title="Real game"]', { timeout: 30000 });
  if (!outerFrameHandle) {
    console.warn(' Не найден iframe [title="Real game"]');
    return;
  }

  const outerFrame = await outerFrameHandle.contentFrame();
  if (!outerFrame) {
    console.warn('Не удалось получить contentFrame внешнего iframe');
    return;
  }

  // Иногда игра не имеет вложенного фрейма #game, иногда имеет
  let gameFrame = outerFrame;
  try {
    const innerHandle = await outerFrame.waitForSelector('#game', { timeout: 10000 });
    if (innerHandle) {
      const maybeInnerFrame = await innerHandle.contentFrame();
      if (maybeInnerFrame) {
        gameFrame = maybeInnerFrame;
        console.log('Найден вложенный iframe #game');
      } else {
        console.log('ℹ#game не является iframe, кликаем внутри outerFrame');
      }
    }
  } catch {
    console.log(' #game не найден, используем outerFrame');
  }

  // Ожидание canvas
  const canvas = gameFrame.locator('canvas');
  await canvas.first().waitFor({ timeout: 20000 });

  console.log('Найден canvas. Начинаем серию кликов...');

  // Кликаем по 10 точкам подряд
  for (let i = 0; i < canvasPoints.length && i < 10; i++) {
    const { x, y } = canvasPoints[i];
    try {
      console.log(`Клик по canvas (${x}, ${y})`);
      await canvas.first().click({ position: { x, y }, force: true });
      await page.waitForTimeout(1000);
    } catch (err) {
      console.warn(` Ошибка при клике на (${x}, ${y}): ${err}`);
    }
  }

  console.log('10 clicks on canvas');
}

// 🔹 Основная функция прохождения игр
async function playGames(page: Page) {
  for (const id of gameIds) {
    const gameUrl = `https://luckystake.dev/game/real/${id}`;
    console.log(`🎮 Открываем игру: ${gameUrl}`);

    await page.goto(gameUrl);
    await delay5Seconds();

    // скриншот до
    let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_before_playnow`, { body: screenshot, contentType: 'image/png' });

    // клик по "Play now"
    try {
      await page.getByRole('button', { name: 'Play now' }).click({ force: true });
    } catch {
      console.warn('Не удалось кликнуть по кнопке Play now');
    }

    try {
      await page.waitForLoadState('networkidle', { timeout: 35000 });
    } catch {
      console.warn(' Network idle не наступил, продолжаем...');
    }

    await delay10Seconds();

    // клики по canvas
    await clickCanvasPoints(page);

    await delay5Seconds();

    // скриншот после
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_after_clicks`, { body: screenshot, contentType: 'image/png' });

    console.log(` Игра ${id} завершена`);
    await delay5Seconds();
  }
}

await delay5Seconds();


test('@providersDev Spinomenal', async ({ page }) => {
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
await delay5Seconds();

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
