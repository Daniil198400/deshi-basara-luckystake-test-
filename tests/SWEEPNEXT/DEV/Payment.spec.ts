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


    await page.getByTestId('buy-coins-button').getByRole('img').click();
    await delay5Seconds();

    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`I am in payment form`, {
      body: screenshot,
      contentType: 'image/png', 
    });
    await delay5Seconds();

    await page.getByText('$ 9.99').click();
    await page.locator('iframe[title="WizCashier"]').contentFrame().getByText('New Method', { exact: true }).click();
    await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().locator('iframe[name="hosted-field-frmCCCVC"]').contentFrame().getByRole('textbox', { name: 'Security Code' }).click();
    await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().locator('iframe[name="hosted-field-frmCCCVC"]').contentFrame().getByRole('textbox', { name: 'Security Code' }).fill('333');
    await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().getByRole('button', { name: 'Deposit' }).click();
    await delay10Seconds();
    await delay10Seconds();
        await delay10Seconds();
    await delay10Seconds();
    await delay10Seconds();
    await delay10Seconds();

    await page.getByRole('button', { name: 'Close' }).click();

    await delay5Seconds();

    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`I bought coins`, {
      body: screenshot,
      contentType: 'image/png', 
    });

    await delay5Seconds();
});

//4012001037141112