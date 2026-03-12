import { test as base, Page, expect, devices } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage'
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

test('@Regress daily reward test', async ({ context }) => {
const page = await context.newPage();
const loginPage = new LoginPage(page);
const homePage = new HomePage(page);
const paymentForm = new LoggedInPaymentForm(page);
// универсальная функция
async function clickCloseIfVisible(page: import('@playwright/test').Page) {
  try {
    const closeIcon = page.getByRole('img', { name: /close/i }).first();

    if (await closeIcon.count() > 0 && await closeIcon.isVisible()) {
      await closeIcon.click({ timeout: 2000 }).catch(() => {});
      console.log('Close icon clicked');
    } else {
      console.log('Close icon not visible — skipping click');
    }
  } catch (err) {
    console.log('Error checking or clicking close icon:', err);
  }
}



await page.goto('https://luckystake.dev/');
await delay5Seconds();





const claimFrame = page.locator('iframe').first().contentFrame();
const claimButton = claimFrame.getByRole('button', { name: 'Claim' });

if (await claimButton.isVisible().catch(() => false)) {
  await claimButton.click();
}


const closeImageButton = page.getByRole('img', { name: 'close' });

if (await closeImageButton.isVisible().catch(() => false)) {
  await closeImageButton.click();
}


const lobbyCloseButton = page.getByTestId('close-button-lobbywidget');

if (await lobbyCloseButton.isVisible().catch(() => false)) {
  await lobbyCloseButton.click();
}





await page.getByTestId('login-header').click();
await delay5Seconds();

await page.getByTestId('email-input-login').click();
await page.getByTestId('email-input-login').fill('dksld1@gmail.com');
await page.getByTestId('password-input-login').click();
await page.getByTestId('password-input-login').fill('Qwerty1!');
await page.getByTestId('submit-button-login').click();
await delay10Seconds();
await clickCloseIfVisible(page);
await page.goto('https://luckystake.dev/store');

await page.getByTestId('close-button-lobbywidget').count() && await page.getByTestId('close-button-lobbywidget').click();

await page.getByTestId('daily-rewards-button-shop').click();
await page.getByRole('button', { name: 'Claim', exact: true }).click();

await delay5Seconds();
let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`claim`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds();

await page.getByRole('img', { name: 'close' }).click();
await delay5Seconds();
});