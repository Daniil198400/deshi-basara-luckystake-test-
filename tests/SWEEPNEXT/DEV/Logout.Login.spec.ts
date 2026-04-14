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
 username: 'sweepnext',
 password: 'sweepnext!',
},
 });
 await use(context);
 await context.close();
},
});

test('@Regress daily reward test', async ({ context }) => {
const page = await context.newPage();

await page.goto('https://sweepnext-stage.wiztechgroup-services.com');
await delay5Seconds();

await page.getByTestId('login-button').click();

await page.getByTestId('login-email-input').click();
await page.getByTestId('login-email-input').fill('dksld1@gmail.com');
await page.getByTestId('login-password-input').click();
await page.getByTestId('login-password-input').fill('Qwerty1!');
await page.getByTestId('login-submit-button').click();
await page.getByTestId('avatar-progress').click();

await delay5Seconds();
let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`I am in lobby`, {
      body: screenshot,
      contentType: 'image/png', 
    });

await delay5Seconds();

await page.getByRole('button', { name: 'Log out' }).click();
await page.getByRole('button', { name: 'Log out' }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`I am logged out`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds();

await page.getByTestId('login-email-input').click();
await page.getByTestId('login-email-input').fill('dksld1@gmail.com');
await page.getByTestId('login-password-input').click();
await page.getByTestId('login-password-input').fill('Qwerty1!');

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`I am logging in again`, {
      body: screenshot,
      contentType: 'image/png', 
    });

await page.getByTestId('login-submit-button').click();

await delay5Seconds();

screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`I am logged in again`, {
      body: screenshot,
      contentType: 'image/png', 
    });

    await delay5Seconds();

});
