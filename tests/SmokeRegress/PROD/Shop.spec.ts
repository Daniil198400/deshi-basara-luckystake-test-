import { test as base, Page, expect, devices } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { HomePage } from '../../../pages/HomePage';
import { delay10Seconds, delay5Seconds } from '../../../utils/utils';
import { ProfilePage } from '../../../pages/ProfilePage';

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

test('@Regress shop', async ({ context }) => {
  const page = await context.newPage();

  await page.goto('https://luckystake.com/');

  await page.getByTestId('login-header').click();
  await page.getByTestId('email-input-login').click();
  await page.getByTestId('email-input-login').fill('dksld2012@gmail.com');
  await page.getByTestId('password-input-login').click();
  await page.getByTestId('password-input-login').fill('Qwerty1!');
  await page.getByTestId('submit-button-login').click();
  await delay5Seconds();



  // await page.locator('iframe[name="chat-widget-minimized"]').contentFrame().getByRole('button', { name: 'Hide greeting' }).click();
await delay5Seconds();
  await page.goto('https://luckystake.com/store');

  // await page.getByRole('navigation').getByRole('link', { name: 'Store' }).click();
  await delay5Seconds();
  let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`store`, {
      body: screenshot,
      contentType: 'image/png',
    });

await delay5Seconds();

  await page.getByTestId('daily-rewards-button-shop').click();
    await delay5Seconds();
 screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`daily reward`, {
      body: screenshot,
      contentType: 'image/png',
    });

  await page.getByRole('img', { name: 'close' }).click();

  await delay5Seconds();

  });