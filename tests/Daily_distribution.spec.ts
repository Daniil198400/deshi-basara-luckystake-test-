import { test as base, Page, expect, devices } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage';
import { delay5Seconds } from '../utils/utils';
import { PaymentForm } from '../pages/PaymentForm';
import { LoggedInPaymentForm } from '../pages/LoggedInPaymentForm';


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

test('@Regress luckystake payment test', async ({ context }) => {
const page = await context.newPage();
const loginPage = new LoginPage(page);
const homePage = new HomePage(page);
const paymentForm = new LoggedInPaymentForm(page);


await page.goto('https://luckystake.dev/');


await page.getByTestId('login-header').click();
await page.getByTestId('email-input-login').click();
await page.getByTestId('email-input-login').fill('dksld1@gmail.com');
await page.getByTestId('password-input-login').click();
await page.getByTestId('password-input-login').fill('Qwerty1!!');
await page.getByTestId('submit-button-login').click();

await page.getByRole('navigation').getByRole('link', { name: 'Store' }).click();
await page.getByTestId('daily-rewards-button-shop').click();
await page.locator('div').filter({ hasText: /^1250GC\+0\.35SC$/ }).getByRole('img').click();
await page.getByText('Day 3').click();
await page.getByText('Day 31250GC+0.35SC').click();
await page.getByText('Your free reward is ready152230Day 11500GC+0.2SCDay 22000GC+0.25SCDay 31250GC+0').click();
await page.getByText('Day 3').click();
await page.getByText('Your free reward is ready152230Day 11500GC+0.2SCDay 22000GC+0.25SCDay 31250GC+0').click();

await delay5Seconds();
let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`before getting distribution`, {
      body: screenshot,
      contentType: 'image/png',
    });

await delay5Seconds();

await page.getByRole('img', { name: 'close' }).click();

await delay5Seconds();
});