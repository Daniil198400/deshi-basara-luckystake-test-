import { test as base, expect, devices } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { HomePage } from '../../../pages/HomePage';
import { delay10Seconds, delay5Seconds } from '../../../utils/utils';
import { PaymentForm } from '../../../pages/PaymentForm';
import { LoggedInPaymentForm } from '../../../pages/LoggedInPaymentForm';


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

test('@Regress luckystake payment test', async ({ page }) => {


await page.goto('https://luckystake.dev/');

await page.getByTestId('login-header').click();
await page.getByTestId('email-input-login').click();
await page.getByTestId('email-input-login').fill('dksld1@gmail.com');
await page.getByTestId('password-input-login').click();
await page.getByTestId('password-input-login').fill('Qwerty1!');
await page.getByTestId('submit-button-login').click();
await delay10Seconds();
let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`after login`, {
      body: screenshot,
      contentType: 'image/png',
    });
// await handleAllPopups(page, 4, 1000);
await delay5Seconds();
await page.goto('https://luckystake.dev/store');

await page.locator('div').filter({ hasText: /^10k\+ free 5\$4\.99$/ }).getByTestId('bundle-buy-button-shop').click();
// await page.getByRole('textbox', { name: 'Billing Address' }).click();
// await page.getByRole('textbox', { name: 'Billing Address' }).fill('jhgfd');
// await page.getByRole('textbox', { name: 'City' }).click();
// await page.getByRole('textbox', { name: 'City' }).fill('jhgf');
// await page.getByRole('textbox', { name: 'Post Code' }).click();
// await page.getByRole('textbox', { name: 'Post Code' }).fill('23456');
// await page.getByRole('button', { name: 'Continue the payment' }).click();
await page.locator('iframe[title="WizCashier"]').contentFrame().locator('div').filter({ hasText: /^Credit Card$/ }).first().click();
await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().locator('.dropdown-selected').click();
await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().locator('div').filter({ hasText: /^New account$/ }).nth(1).click();
await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().locator('iframe[name="hosted-field-single-iframe"]').contentFrame().getByRole('textbox', { name: 'Name' }).click();
await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().locator('iframe[name="hosted-field-single-iframe"]').contentFrame().getByRole('textbox', { name: 'Name' }).fill('jodrdano ');
await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().locator('iframe[name="hosted-field-single-iframe"]').contentFrame().getByRole('textbox', { name: 'Card number' }).click();
await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().locator('iframe[name="hosted-field-single-iframe"]').contentFrame().getByRole('textbox', { name: 'Card number' }).fill('4012001037141112');
await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().locator('iframe[name="hosted-field-single-iframe"]').contentFrame().getByRole('textbox', { name: '•• / ••' }).fill('02 / 29');
await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().locator('iframe[name="hosted-field-single-iframe"]').contentFrame().getByRole('textbox', { name: 'Security Code' }).fill('422');




await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().getByRole('button', { name: 'Deposit' }).click();
await delay10Seconds()
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`after deposit`, {
      body: screenshot,
      contentType: 'image/png',
    });
await delay5Seconds();

await page.getByRole('button', { name: 'Close' }).click();
await delay5Seconds();

});


