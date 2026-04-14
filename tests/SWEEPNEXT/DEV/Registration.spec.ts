import { test as base } from '@playwright/test';
import { delay5Seconds } from '../../../utils/utils';

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

function generateRandomEmail(): string {
  const timestamp = Date.now();
  const randomNumber = Math.floor(Math.random() * 100000);
  return `new_registered_user_${timestamp}_${randomNumber}@gmail.com`;
}

test('@Regress daily reward test', async ({ context }) => {
  const page = await context.newPage();
  const randomEmail = generateRandomEmail();

  await page.goto('https://sweepnext-stage.wiztechgroup-services.com');
  await delay5Seconds();

  await page.getByTestId('signup-button').click();
  await page.getByTestId('signup-email-input').click();
  await page.getByTestId('signup-email-input').fill(randomEmail);
  await page.getByTestId('signup-password-input').click();
  await page.getByTestId('signup-password-input').fill('Qwerty1!');
  await page.locator('label').filter({ hasText: 'I am at least 21 years old; I' }).locator('span').click();

  await delay5Seconds();
  let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`Filled registration form`, {
      body: screenshot,
      contentType: 'image/png', 
    });
  await delay5Seconds();

  await page.getByTestId('signup-submit-button').click();

    await delay5Seconds();

    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`Filled registration form`, {
      body: screenshot,
      contentType: 'image/png', 
    });

    await delay5Seconds();

});