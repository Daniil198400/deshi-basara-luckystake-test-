import { test as base, expect, devices, chromium } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { UserFormHelper, fillField, clickButton, clickCheckboxByLabel } from '../pages/UserFormPage';
import { PaymentForm } from '../pages/PaymentForm';
import { generateRandomEmail, delay5Seconds, delay10Seconds } from '../utils/utils';



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

test('@Regress Incompleted registration of invited user', async ({ context }) => {
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const randomEmail = generateRandomEmail();
  const userForm = new UserFormHelper(page);
  const paymentPage = new PaymentForm(page);

  await page.goto('https://luckystake.dev/?c=50249_2M5esBx1');
  await homePage.closePopupIfVisible();
  await clickButton(page, 'JOIN NOW');
  await fillField(page, 'Email', randomEmail);
  await fillField(page, 'Password', 'password1');
  await clickCheckboxByLabel(page, 'I am at least 18 years old');
  await clickButton(page, 'Continue');

  await delay10Seconds();

  await page.locator('.WizIconButton_base__JfGpY.WizPopupWrapper_close__hKtRn').click();

let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`invited user has done deshi basara`, {
      body: screenshot,
      contentType: 'image/png',
    });

  await delay5Seconds();
});