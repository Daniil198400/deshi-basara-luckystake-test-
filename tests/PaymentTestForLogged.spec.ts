import { test as base, expect, devices } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
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

test('luckystake payment test', async ({ context }) => {
const page = await context.newPage();
const loginPage = new LoginPage(page);
const homePage = new HomePage(page);
const paymentForm = new LoggedInPaymentForm(page);


await page.goto('https://luckystake.dev/');
await homePage.closePopupIfVisible();
await loginPage.openLoginForm();
await loginPage.login('wiztestIsabell_Borer@hotmail.com', 'password');


await homePage.closePopupIfVisible();
  // Going to Store
await page.getByRole('navigation').getByRole('link', { name: 'Store' }).click();

await delay5Seconds();
await page.getByRole('button', { name: '$1.99' }).click();
await delay5Seconds();
// Choosing Credit Card
  const cashierContent = page.locator('iframe[title="WizCashier"]').contentFrame();
  await cashierContent.locator('div').filter({ hasText: /^Credit Card$/ }).first().click();


const loggedInPaymentForm = new LoggedInPaymentForm(page); 
await loggedInPaymentForm.fillSecurityCode('345');         
await loggedInPaymentForm.deposit();    

await delay5Seconds();

  await page.getByRole('button', { name: 'Close' }).click();
await delay5Seconds();
});