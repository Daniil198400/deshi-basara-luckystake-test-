import { test as base, Page, expect, devices, chromium } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import { UserFormHelper, fillField, clickButton, clickCheckboxByLabel } from '../../pages/UserFormPage';
import { PaymentForm } from '../../pages/PaymentForm';
import { generateRandomEmail, delay5Seconds, delay10Seconds } from '../../utils/utils';



const test = base.extend<{}>({
  context: async ({}, use) => {
    const browser = await chromium.launch({
    //   headless: false,
    //   args: ['--start-maximized'], 
    });

    const context = await browser.newContext({
    //   viewport: { width: 1920, height: 1080 }, // apparently set window size explicitly
      httpCredentials: {
        username: 'luckystake',
        password: 'luckystake1!',
      },
    });

    await use(context);

    await context.close();
    await browser.close();
  },
});

function generateEmail() {
  const unique = Date.now(); // можно заменить на Math.floor(Math.random() * 100000)
  return `wiztest+${unique}@gmail.com`;
}

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
    console.log(`🌀 Попытка ${i + 1} закрыть модалки...`);

    // 1️⃣ close icon
    await safeClick(page.getByRole('img', { name: /close/i }));
    await page.waitForTimeout(delayMs);

    // 2️⃣ Claim button
    await safeClick(page.getByRole('button', { name: 'Claim' }));
    await page.waitForTimeout(delayMs);

    // 3️⃣ элементы внутри iframe (динамический доступ, не кэшируем)
    const f = page.frameLocator('iframe').nth(2);
    await safeClick(f.getByRole('link', { name: '' }));
    await page.waitForTimeout(delayMs);

    await safeClick(f.getByRole('link', { name: 'START PLAYING' }));
    await page.waitForTimeout(delayMs);
  }

  console.log(' Все попытки закрытия окон завершены');
}




test('@Regress Full Registration with pay card', async ({ page }) => {


await page.goto('https://luckystake.dev/');
await page.getByTestId('signup-header').click();

await page.getByTestId('email-input-signup').click();
await page.getByTestId('email-input-signup').fill(generateEmail());
await page.getByTestId('password-input-signup').click();
await page.getByTestId('password-input-signup').fill('Qwerty1!');
await page.locator('label').filter({ hasText: 'I am at least 18 years old' }).locator('span').click();
await page.getByTestId('submit-button-signup').click();

await page.getByTestId('first-name-input-complete-profile').click();
await page.getByTestId('first-name-input-complete-profile').fill('up');
await page.getByTestId('last-name-input-complete-profile').click();
await page.getByTestId('last-name-input-complete-profile').fill('ce');

await delay5Seconds();

await page.getByTestId('state-select-complete-profile').click();
await delay5Seconds();

await page.getByText('Alaska').click();

await delay5Seconds();

await page.getByTestId('month-select-complete-profile').click();
await page.getByRole('listitem').filter({ hasText: 'February' }).click();
await page.getByTestId('day-input-complete-profile').click();
await page.getByTestId('day-input-complete-profile').fill('22');
await page.getByTestId('year-input-complete-profile').click();
await page.getByTestId('year-input-complete-profile').fill('1999');
await page.getByTestId('submit-button-complete-profile').click();
let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`registration is completed`, {
      body: screenshot,
      contentType: 'image/png',
    });
await delay5Seconds();

await handleAllPopups(page, 4, 1000);
await delay10Seconds();
await delay5Seconds();
await page.goto('https://luckystake.dev/store');

// await page.locator('.HeaderContent_plusButtonWrapper_inner__PU_d1').click();

// await page.getByRole('button', { name: '$1.99' }).click();
// await page.getByRole('textbox', { name: 'Billing Address' }).click();
// await page.getByRole('textbox', { name: 'Billing Address' }).fill('kanzas');
// await page.getByRole('textbox', { name: 'City' }).click();
// await page.getByRole('textbox', { name: 'City' }).fill('gotham');
// await page.getByRole('textbox', { name: 'Post Code' }).click();
// await page.getByRole('textbox', { name: 'Post Code' }).fill('411');
// await page.getByRole('button', { name: 'Continue the payment' }).click();
// await page.locator('iframe[title="WizCashier"]').contentFrame().locator('div').filter({ hasText: /^Credit Card$/ }).first().click();
// await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().locator('iframe[name="hosted-field-single-iframe"]').contentFrame().getByRole('textbox', { name: 'Card number' }).click();
// await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().locator('iframe[name="hosted-field-single-iframe"]').contentFrame().getByRole('textbox', { name: 'Card number' }).fill('5223450000000007');
// await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().locator('iframe[name="hosted-field-single-iframe"]').contentFrame().getByRole('textbox', { name: 'Name' }).click();
// await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().locator('iframe[name="hosted-field-single-iframe"]').contentFrame().getByRole('textbox', { name: 'Name' }).fill('zagadochnik');
// await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().locator('iframe[name="hosted-field-single-iframe"]').contentFrame().getByRole('textbox', { name: '•• / ••' }).click();
// await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().locator('iframe[name="hosted-field-single-iframe"]').contentFrame().getByRole('textbox', { name: '•• / ••' }).fill('02 / 35');
// await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().locator('iframe[name="hosted-field-single-iframe"]').contentFrame().getByRole('textbox', { name: 'Security Code' }).fill('411');
// await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().getByRole('button', { name: 'Deposit' }).click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`success`, {
      body: screenshot,
      contentType: 'image/png',
    });

await delay5Seconds();

await page.getByRole('button', { name: 'Close' }).click();



await delay5Seconds();


screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`incompleted, verification is required`, {
      body: screenshot,
      contentType: 'image/png',
    });
await delay5Seconds();

});

