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
        "34255",
        "14621",
        "28504",
        "28503",
        "28502",
        "28501"
];


// function
async function playGames(page: Page) {
  for (const id of gameIds) {
    const gameUrl = `https://luckystake.dev/game/real/${id}`;
    await page.goto(gameUrl);
    await delay5Seconds();

    // screenshot before Play now button
    let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_before_playNow`, {
      body: screenshot,
      contentType: 'image/png',
    });

    // click on Play now
    await page.getByRole('button', { name: 'Play now' }).click();
try {
  await page.waitForLoadState('networkidle', { timeout: 30000 }); 
} catch (e) {
  console.warn('Network idle is not found after 30 sec, keep going...');
};
    await delay10Seconds();

      // Работа с iframe
    const outerFrameHandle = await page.locator('iframe[title="Real game"]').elementHandle();
    const outerFrame = await outerFrameHandle?.contentFrame();

    if (!outerFrame) {
      console.warn('не удалось получить внешний iframe');
      continue;
    }

    await outerFrame.waitForSelector('#game', { timeout: 15000 });
    const innerFrameHandle = await outerFrame.locator('#game').elementHandle();
    const innerFrame = await innerFrameHandle?.contentFrame();

    if (!innerFrame) {
      console.warn('не удалось получить внутренний iframe');
      continue;
    }

    // --- Пытаемся нажать START или третью кнопку ---
    const hasStartButton = await innerFrame
      .getByRole('button', { name: 'START', exact: true })
      .count();

    if (hasStartButton > 0) {
      console.log(' Найдена кнопка START — кликаем по ней');
      await innerFrame
        .getByRole('button', { name: 'START', exact: true })
        .click({ force: true });
    } else {
      console.log(' Кнопка START не найдена — пробуем третью кнопку');
      const allButtons = await innerFrame.getByRole('button').count();
      if (allButtons >= 4) {
        await innerFrame.getByRole('button').nth(3).click({ force: true });
        console.log(' Нажата третья кнопка (nth(3))');
      } else {
        console.warn('Недостаточно кнопок для выбора nth(3)');
      }
    }

await delay5Seconds(); 

    // второй скриншот
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_after_wait`, {
      body: screenshot,
      contentType: 'image/png',
    });

    await delay5Seconds();

  }
};
  


test('@providersDev Four Leaf Gaming', async ({ page }) => {
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
