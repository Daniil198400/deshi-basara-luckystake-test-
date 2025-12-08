
import { test as base, expect, devices, chromium } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import { UserFormHelper, fillField, clickButton, clickCheckboxByLabel } from '../../pages/UserFormPage';
import { PaymentForm } from '../../pages/PaymentForm';
import { generateRandomEmail, delay5Seconds } from '../../utils/utils';



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

test('@Regress searching popular', async ({ page }) => {


await page.goto('https://luckystake.dev/');

await page.getByTestId('login-header').click();
await page.getByTestId('email-input-login').click();
await page.getByTestId('email-input-login').fill('dksld123@gmail.com');
await page.getByTestId('password-input-login').click();
await page.getByTestId('password-input-login').fill('Qwerty1!');
await page.getByTestId('submit-button-login').click();
await delay5Seconds();
let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`login is completed`, {
      body: screenshot,
      contentType: 'image/png', 
    });

await delay5Seconds();

    await page.goto('https://luckystake.dev/');

  await page.getByRole('button').filter({ hasText: 'Search' }).click();
  await page.getByRole('button', { name: 'Providers 21' }).click();
  await delay5Seconds();
  await page.getByRole('button', { name: 'Categories' }).click();
  await delay5Seconds();
});