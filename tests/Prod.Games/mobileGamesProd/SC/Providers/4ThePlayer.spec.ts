import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../../pages/LoginPage';
import { HomePage } from '../../../../../pages/HomePage';
import { GamePage } from '../../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../../utils/utils';

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
    const gameUrl = `https://luckystake.com/game/real/${id}`;
    await page.goto(gameUrl);
    await delay5Seconds();

    // screenshot before Play now button
    let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_before_playnow`, {
      body: screenshot,
      contentType: 'image/png'
    });

    // click on Play now
    await page.getByRole('button', { name: 'Play now' }).click();

    try {
      await page.waitForLoadState('networkidle', { timeout: 100000 });
    } catch {
      console.warn('Network idle is not found after 100 сек, continue...');
    }

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
      console.log('Клик по кнопке "NO" выполнен');
    } else {
      console.log('Кнопка "NO" не видна — клик пропущен');
    }

    await delay5Seconds();

    // Работа с canvas внутри gameFrame
    const canvas = gameFrame.locator('canvas').first();

    await canvas.waitFor({ state: 'visible' });

    await canvas.click({ position: { x: 177, y: 586 } });
    await canvas.click({ position: { x: 180, y: 589 } });
    await canvas.click({ position: { x: 175, y: 586 } });

    await delay5Seconds();

    // второй скриншот
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_after_wait`, {
      body: screenshot,
      contentType: 'image/png'
    });
  }
}

test('@ClickOnAdditionalStepMobile 4ThePlayer', async ({ page }) => {
   await page.goto('https://luckystake.com/');

  await page.getByTestId('login-header').click();
  await page.getByTestId('email-input-login').click();
  await page.getByTestId('email-input-login').fill('wiztest+80001@gmail.com');
  await page.getByTestId('password-input-login').click();
  await page.getByTestId('password-input-login').fill('Qwerty1!');
  await page.getByTestId('submit-button-login').click();

    await delay5Seconds();

  await page.goto('https://luckystake.com/');
       const scImage = page.getByRole('img', { name: 'GC', exact: true });
        if (await scImage.isVisible()) {
          await scImage.scrollIntoViewIfNeeded();
          await scImage.click({ force: true });
          console.log('click on SC');
        }
  // launching the games
  await playGames(page);
});
