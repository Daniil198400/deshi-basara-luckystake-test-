import { test as base, expect, devices, chromium, Page } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { HomePage } from '../../../pages/HomePage';
import { UserFormHelper, fillField, clickButton, clickCheckboxByLabel } from '../../../pages/UserFormPage';
import { PaymentForm } from '../../../pages/PaymentForm';
import { generateRandomEmail, delay5Seconds, delay10Seconds } from '../../../utils/utils';



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
export function generateWizEmail() {
  const random = Math.floor(100000 + Math.random() * 900000); // 6-значное число
  return `wiztest+${random}@gmail.com`;
}

test('@mobile Full Registration with pay card', async ({ page }) => {
async function clickStartPlaying(page: Page) {
  // await page
  //   .locator('iframe')
  //   .first()
  //   .contentFrame()
  //   .getByRole('link', { name: 'START PLAYING' })
  //   .click();
}

  await page.goto('https://luckystake.com/');
  await page.getByTestId('signup-header').click();
  
  const randomEmail = generateWizEmail();
  console.log("Generated email:", randomEmail);

  await page.getByTestId('email-input-signup').fill(randomEmail);
  await page.getByTestId('password-input-signup').click();
  await page.getByTestId('password-input-signup').fill('Qwerty1!');

await page.locator('label').filter({ hasText: 'I am at least 18 years old' }).locator('span').click();

await page.getByTestId('submit-button-signup').click();

// await delay10Seconds();

// await clickStartPlaying(page);

await delay5Seconds();

await page.getByTestId('first-name-input-complete-profile').click();
await page.getByTestId('first-name-input-complete-profile').fill('hygf');
await page.getByTestId('last-name-input-complete-profile').click();
await page.getByTestId('last-name-input-complete-profile').fill('hgf');
await page.getByTestId('state-select-complete-profile').click();
await delay5Seconds();
await page.getByRole('listitem').filter({ hasText: 'Alaska' }).click();
await delay5Seconds();
await page.getByTestId('month-select-complete-profile').click();
await delay5Seconds();
await page.getByText('January').click();
await delay5Seconds();
let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`registr 1`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await page.getByTestId('day-input-complete-profile').click();
await page.getByTestId('day-input-complete-profile').fill('22');
await page.getByTestId('year-input-complete-profile').click();
await page.getByTestId('year-input-complete-profile').fill('2000');
await page.getByTestId('submit-button-complete-profile').click();
 screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`registr 2`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await page.getByTestId('close-button-verification').click();
await page.getByRole('img', { name: 'close' }).click();

await delay5Seconds();
});




