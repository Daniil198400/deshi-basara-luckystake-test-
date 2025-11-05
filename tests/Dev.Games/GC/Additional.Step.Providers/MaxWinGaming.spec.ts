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
        "28507",
        "28509",
        "28506",
        "28508"
];

/**
 * Кликает по #stageOverlay внутри вложенного iframe.
 * Проходит по всем координатам из списка и кликает по каждой по очереди.
 */
async function clickOnStageOverlay(page: Page): Promise<boolean> {
  const clickPositions = [
    { x: 640, y: 545 }, // первая точка
    { x: 622, y: 529 }, // вторая точка
    { x: 635, y: 552 },
    { x: 650, y: 540 },
    { x: 628, y: 560 },
    { x: 646, y: 489 }
  ];

  try {
    // используем frameLocator для вложенных iframe
    const innerFrame = page.frameLocator('iframe[title="Real game"]').frameLocator('#game');
    const overlay = innerFrame.locator('#stageOverlay');

    // ждем появления overlay
    await overlay.waitFor({ state: 'visible', timeout: 15000 });

    console.log(`#stageOverlay is found, starting ${clickPositions.length} positions`);

    for (const [index, pos] of clickPositions.entries()) {
      console.log(`👉 Кликаем #${index + 1}: x=${pos.x}, y=${pos.y}`);
      await overlay.click({
        position: pos,
        force: true,
      });
      await page.waitForTimeout(400); // небольшая пауза между кликами
    }

    console.log('all clickings #stageOverlay completed');
    return true;
  } catch (err) {
    console.warn('error during #stageOverlay:', err);
    return false;
  }
}

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
  await page.waitForLoadState('networkidle', { timeout: 40000 }); 
} catch (e) {
  console.warn('Network idle is not found after 30 sec, keep going...');
}
    await delay10Seconds();
    await delay10Seconds();
        // Кликаем по stageOverlay во всех координатах
    const overlayClicked = await clickOnStageOverlay(page);
    if (!overlayClicked) {
      console.warn('not succesful clicking');
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
  


test('@providersDev Max Win Gaming', async ({ page }) => {
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
