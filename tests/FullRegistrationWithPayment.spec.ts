import { test as base, expect, devices, chromium } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { UserFormHelper, fillField, clickButton, clickCheckboxByLabel } from '../pages/UserFormPage';
import { PaymentForm } from '../pages/PaymentForm';
import { generateRandomEmail, delay5Seconds } from '../utils/utils';



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

test('@Regress Full Registration with pay card', async ({ context }) => {
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const randomEmail = generateRandomEmail();
  const userForm = new UserFormHelper(page);
  const paymentPage = new PaymentForm(page);

//FILLING FIRST USER FORM
    await page.goto('https://luckystake.dev/');
    await homePage.closePopupIfVisible();
    await clickButton(page, 'JOIN NOW');
    await fillField(page, 'Email', randomEmail);
    await fillField(page, 'Password', 'password1');
    await clickCheckboxByLabel(page, 'I am at least 18 years old');
    await clickButton(page, 'Continue');
  
//FILLING SECOND USER FORM
  await userForm.fillUserForm(
    'Ffss',
    'fldsl',
    'Colorado',
    'March',
    '20',
    '2002'
  );

  await delay5Seconds();
  
// //FILLING PAYMENT FORM

await page.getByRole('navigation').getByRole('link', { name: 'Store' }).click();

const chatWidget = page.frameLocator('iframe[name="chat-widget-minimized"]');
await chatWidget.getByRole('button', { name: 'Hide greeting' }).click();

await page.getByRole('button', { name: '$1.99' }).click();

const paymentForm = new PaymentForm(page);

await paymentForm.fillBillingInfo('fds', 'Orrr', '54356');
await paymentForm.continueToPayment();

await delay5Seconds();

await paymentForm.fillCardData(
  'Dffff',
  '4242 4242 4242 4242',
  '04 / 56',
  '345'
);

await paymentForm.deposit();


await page.getByText('GC 4,000').click();

await page.getByRole('button', { name: 'Close' }).click();

await page.getByText('GC0123456789,').click();
await delay5Seconds();
});




