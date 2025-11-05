import { test as base, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { GamePage } from '../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';
import { networkConnections } from 'systeminformation';

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
          "28457",
  "28459",
  "34477",
  "28463",
  "28466",
  "34228",
  "28465",
  "28464",
  "14620",
  "28460",
  "28458",
  "35545",
  "28456"
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
  await page.waitForLoadState('networkidle', { timeout: 35000 }); // 30 секунд
} catch (e) {
  console.warn('Network idle is not found after 35 sec, keep going...');
}
  
    await delay10Seconds();
await delay10Seconds();

    // Получаем iframe и кнопку "NO" внутри
    const outerFrame = await page.locator('iframe[title="Real game"]').contentFrame();
    if (!outerFrame) {
      console.warn(' Не найден iframe[title="Real game"]');
      continue;
    }

    const gameFrame = await outerFrame.locator('#game').contentFrame();
    if (!gameFrame) {
      console.warn(' Не найден внутренний iframe #game');
      continue;
    }

    const noButton = gameFrame.getByText('NO', { exact: true });

    if (await noButton.isVisible()) {
      await noButton.click();
      console.log('click on "NO" is done');
    } else {
      console.log('"NO" is not visible, continue...');
    }

    await delay5Seconds();

    // Работа с canvas внутри gameFrame
    const canvas = gameFrame.locator('canvas').first();

    await canvas.waitFor({ state: 'visible' });

    await canvas.click({ position: { x: 621, y: 586 } });
    await canvas.click({ position: { x: 625, y: 596 } });
    await canvas.click({ position: { x: 615, y: 586 } });

    
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_after_click`, {
      body: screenshot,
      contentType: 'image/png',
    })

  }
};
  


test('@providersDev 4ThePlayer', async ({ page }) => {
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
