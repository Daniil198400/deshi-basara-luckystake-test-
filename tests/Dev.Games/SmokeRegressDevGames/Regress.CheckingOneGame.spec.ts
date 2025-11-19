import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { HomePage } from '../../../pages/HomePage';
import { GamePage } from '../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../utils/utils';

test.use({
  httpCredentials: {
    username: 'luckystake',
    password: 'luckystake1!',
  },
});

test('@regressFastCheckingGame regress', async ({ page }) => {

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


    // helper: пытаем первый пароль, при ошибке — пробуем запасной
async function tryLoginWithFallback(page: Page, primary = 'Qwerty1!', fallback = 'Qwerty1!!') {
  const pwd = page.getByTestId('password-input-login');
  const submit = page.getByTestId('submit-button-login');
  const errorLocator = page.getByTestId('login-error'); // <- подставьте реальный селектор ошибки, если он иной
  const successProbe = page.getByRole('img', { name: 'close' }); // <- индикатор удачного логина (из вашего скрипта)

  await pwd.fill(primary);
  await submit.click();

  // подождём коротко — если увидим ошибку, попробуем fallback
  try {
    // ждём либо успеха, либо появления ошибки (короткий таймаут)
    await Promise.race([
      successProbe.waitFor({ timeout: 2500 }),
      errorLocator.waitFor({ timeout: 2500 }),
    ]);
  } catch {
    // ничего не найдено в отведённое время — считаем это как "возможная ошибка"
  }

  // если есть сообщение об ошибке — пробуем запасной пароль
  if (await errorLocator.count() > 0) {
    await pwd.fill(fallback);
    await submit.click();
  }
}


await page.goto('https://luckystake.dev/');

await page.getByTestId('login-header').click();
await page.getByTestId('email-input-login').click();
await page.getByTestId('email-input-login').fill('dksld1@gmail.com');
await page.getByTestId('password-input-login').click();
await tryLoginWithFallback(page);


await delay5Seconds();
  await clickCloseIfPresent(page);
await delay5Seconds();

await page.goto('https://luckystake.dev/game/real/21849');
await delay5Seconds();

let screenshot = await page.screenshot();
            test.info().attach(`game_before_play_now`, { 
                body: screenshot, 
                contentType: 'image/png' 
            });
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();

await page.getByRole('button').filter({ hasText: /^$/ }).click();
await delay5Seconds();
screenshot = await page.screenshot();
            test.info().attach(`search sectrion play now`, { 
                body: screenshot, 
                contentType: 'image/png' 
            });
            await delay5Seconds();
await page.getByRole('button', { name: 'Providers' }).click();
await delay5Seconds();
screenshot = await page.screenshot();
            test.info().attach(`providers in game`, { 
                body: screenshot, 
                contentType: 'image/png' 
            });
await delay5Seconds();
await page.getByRole('button', { name: 'Categories' }).click();
await delay5Seconds();
screenshot = await page.screenshot();
            test.info().attach(`categories in game`, { 
                body: screenshot, 
                contentType: 'image/png' 
            });
            await delay5Seconds();
await page.getByTestId('close-button-searchgames').click();
await delay5Seconds();





await page.getByRole('button', { name: 'buy' }).click();
await delay5Seconds();
screenshot = await page.screenshot();
            test.info().attach(`bundles`, { 
                body: screenshot, 
                contentType: 'image/png' 
            });
            await delay5Seconds();
await page.getByRole('button', { name: '$49.99' }).click();
await delay5Seconds();

await page.locator('iframe[title="WizCashier"]').contentFrame().locator('svg').click();
await delay5Seconds();


await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().locator('iframe[name="hosted-field-frmCCCVC"]').contentFrame().getByRole('textbox', { name: 'Security Code' }).click();
await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().locator('iframe[name="hosted-field-frmCCCVC"]').contentFrame().getByRole('textbox', { name: 'Security Code' }).fill('411');
await delay5Seconds();

await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().getByRole('button', { name: 'Deposit' }).click();
await delay10Seconds();
await delay5Seconds();
screenshot = await page.screenshot();
            test.info().attach(`deposit is done`, { 
                body: screenshot, 
                contentType: 'image/png' 
            });
            await delay5Seconds();
await page.getByRole('button', { name: 'Close' }).click();
await delay5Seconds();
}); 



