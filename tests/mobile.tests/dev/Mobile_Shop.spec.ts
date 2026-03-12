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

test('@Regress luckystake shop test', async ({ page }) => {


await page.goto('https://luckystake.dev/');

await page.getByTestId('login-header').click();
await page.getByTestId('email-input-login').click();
await page.getByTestId('email-input-login').fill('dksld144@gmail.com');
await page.getByTestId('password-input-login').click();
await page.getByTestId('password-input-login').fill('Qwerty1!!');
await page.getByTestId('submit-button-login').click();
await delay5Seconds();
let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`login is completed`, {
      body: screenshot,
      contentType: 'image/png', 
    });

await delay5Seconds();

await page.goto('https://luckystake.dev/store');



const closeBtn = page.locator('iframe').first().contentFrame()
  .getByRole('link', { name: '×' });

if (await closeBtn.isVisible().catch(() => false)) {
  await closeBtn.click();
}

const claimPromo = page.locator('[id="__btgPromo7341673e-a543-4106-83c3-89aaed7beb5d"]')
  .contentFrame()
  .getByRole('button', { name: 'Claim' });

if (await claimPromo.isVisible().catch(() => false)) {
  await claimPromo.click();
}

const claimBtn = page.locator('iframe').nth(3).contentFrame()
  .getByRole('button', { name: 'Claim' });

if (await claimBtn.isVisible().catch(() => false)) {
  await claimBtn.click();
}


const lobbyClose = page.getByTestId('close-button-lobbywidget');

if (await lobbyClose.isVisible().catch(() => false)) {
  await lobbyClose.click();
}

const closeImg = page.getByRole('img', { name: 'close' });

if (await closeImg.isVisible().catch(() => false)) {
  await closeImg.click();
}

await page.getByTestId('daily-rewards-button-shop').click();
await page.getByRole('button', { name: 'Claim', exact: true }).click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`daily reward`, {
      body: screenshot,
      contentType: 'image/png', 
    });
    await delay5Seconds();

await page.getByRole('img', { name: 'close' }).click();


await page.locator('div').filter({ hasText: /^10k\+ free 5\$4\.99$/ }).getByTestId('bundle-buy-button-shop').click();
await page.locator('iframe[title="WizCashier"]').contentFrame().locator('div').filter({ hasText: /^Credit Card$/ }).first().click();
await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().locator('iframe[name="hosted-field-frmCCCVC"]').contentFrame().getByRole('textbox', { name: 'Security Code' }).click();
await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().locator('iframe[name="hosted-field-frmCCCVC"]').contentFrame().getByRole('textbox', { name: 'Security Code' }).fill('333');
await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().getByRole('button', { name: 'Deposit' }).click();

screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`purchase is succesful`, {
      body: screenshot,
      contentType: 'image/png', 
    });

await delay5Seconds();
  
});
