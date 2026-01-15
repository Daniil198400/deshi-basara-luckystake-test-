import { test as base, expect, devices } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import { delay5Seconds } from '../../utils/utils';

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


// Универсальная безопасная функция клика
async function safeClick(locator: import('@playwright/test').Locator) {
  try {
    if (await locator.count() > 0 && await locator.first().isVisible()) {
      await locator.first().click({ timeout: 2000 }).catch(() => {});
      console.log(`Clicked: ${await locator.first().toString()}`);
      return true;
    }
  } catch {}
  return false;
}

// Функция, которая пытается закрыть все окна до 4 раз подряд
export async function handleAllPopups(page: import('@playwright/test').Page, attempts = 4, delayMs = 1000) {
  for (let i = 0; i < attempts; i++) {
    console.log(`Попытка ${i + 1} закрыть модалки...`);

    //  close icon
    await safeClick(page.getByRole('img', { name: /close/i }));
    await page.waitForTimeout(delayMs);

    //  Claim button
    await safeClick(page.getByRole('button', { name: 'Claim' }));
    await page.waitForTimeout(delayMs);

    // элементы внутри iframe (динамический доступ, не кэшируем)
    const f = page.frameLocator('iframe').nth(2);
    await safeClick(f.getByRole('link', { name: '' }));
    await page.waitForTimeout(delayMs);

    await safeClick(f.getByRole('link', { name: 'START PLAYING' }));
    await page.waitForTimeout(delayMs);
  }

  console.log('Все попытки закрытия окон завершены');
}

test('@Regress luckystake searching', async ({ page }) => {

await page.goto('https://luckystake.dev/');

await page.getByTestId('login-header').click();
await page.getByTestId('email-input-login').click();
await page.getByTestId('email-input-login').fill('dksld1@gmail.com');
await page.getByTestId('password-input-login').click();
await page.getByTestId('password-input-login').fill('Qwerty1!');
await page.getByTestId('submit-button-login').click();
await delay5Seconds();
await handleAllPopups(page, 4, 1000);
await delay5Seconds();
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search' }).fill('aztec');
  await page.getByRole('textbox', { name: 'Search' }).press('Enter');
  await delay5Seconds();
  // await page.locator('.SearchGames_search_games__cards_wrapper__8c4ac > div > .WizGameCard_container_gameImage__cFsR9').first().click();
  // await page.getByRole('button', { name: 'Play now' }).click();
  // await delay5Seconds();
  let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game after searching`, {
      body: screenshot,
      contentType: 'image/png',
    });
  // await page.screenshot({ path: 'screenshots/login_searching.png', fullPage: true });
  await delay5Seconds();


  await page.getByRole('img', { name: 'Aztec Coins' }).click();
  await page.goto('https://luckystake.dev/game/real/3751?place=aztec&category=search');

  await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
  screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game page`, {
      body: screenshot,
      contentType: 'image/png',
    });
    await delay5Seconds();
});