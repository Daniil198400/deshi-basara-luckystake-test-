import { test as base, Page, expect, devices } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import { delay10Seconds, delay5Seconds } from '../../utils/utils';
import { ProfilePage } from '../../pages/ProfilePage';

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

test('@Regress promotions', async ({ context }) => {
  const page = await context.newPage();

  await page.goto('https://luckystake.com/');

  await page.getByTestId('login-header').click();
  await page.getByTestId('email-input-login').click();
  await page.getByTestId('email-input-login').fill('dksld122@gmail.com');
  await page.getByTestId('password-input-login').click();
  await page.getByTestId('password-input-login').fill('Qwerty1!');
  await page.getByTestId('submit-button-login').click();
  await delay10Seconds();

  await page.goto('https://luckystake.com/promotions#')

  await delay5Seconds();

let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`promotion page`, {
      body: screenshot,
      contentType: 'image/png',
    });
  await delay5Seconds();




  await page.locator('.PromotionCardGeneral_image__e83RA').first().click();
  await delay5Seconds();
  screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`promotion_details 1`, {
      body: screenshot,
      contentType: 'image/png',
    });
    await delay5Seconds();

await page.getByRole('button').filter({ hasText: 'Back' }).click();

  await page.locator('div:nth-child(2) > div > .PromotionCardGeneral_image__e83RA').click();
    await delay5Seconds();
  screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`promotion_details 2`, {
      body: screenshot,
      contentType: 'image/png',
    });
    await delay5Seconds();
await page.getByRole('button').filter({ hasText: 'Back' }).click();


  await page.locator('div:nth-child(3) > div > .PromotionCardGeneral_image__e83RA').click();
  await delay5Seconds();
  screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`promotion_details 3`, {
      body: screenshot,
      contentType: 'image/png',
    });
    await delay5Seconds();
await page.getByRole('button').filter({ hasText: 'Back' }).click();



  await page.locator('div:nth-child(4) > div > .PromotionCardGeneral_image__e83RA').click();
    await delay5Seconds();
  screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`promotion_details 4`, {
      body: screenshot,
      contentType: 'image/png',
    });
    await delay5Seconds();
await page.getByRole('button').filter({ hasText: 'Back' }).click();



  await page.getByRole('button', { name: 'CLAIM' }).click();
      await delay5Seconds();
  screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`daily rewards button`, {
      body: screenshot,
      contentType: 'image/png',
    });
    await delay5Seconds();
  await page.getByRole('img', { name: 'close' }).click();


  await page.getByRole('button', { name: 'My promotions' }).click();
      await delay5Seconds();
  screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`history of promotions button`, {
      body: screenshot,
      contentType: 'image/png',
    });
    await delay5Seconds();
  await page.getByRole('button', { name: 'All promotions' }).click();
      await delay5Seconds();
  screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`promotion page again`, {
      body: screenshot,
      contentType: 'image/png',
    });
    await delay5Seconds();
});