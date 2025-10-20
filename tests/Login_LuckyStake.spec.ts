import { test as base, expect } from '@playwright/test';
import { delay5Seconds } from '../utils/utils';

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

test('@Regress luckystake login using test-ids', async ({ context }) => {
  const page = await context.newPage();

  await page.goto('https://luckystake.dev/');

  // Открываем модальное окно логина через test-id
  await page.getByTestId('login-header').click();

  // Ждем, пока откроется модалка логина
  const loginModal = page.getByTestId('login-modal');
  await expect(loginModal).toBeVisible();

  // Заполняем логин
  await loginModal.getByTestId('email-input-login').fill('wiztestIsabell_Borer@hotmail.com');
  await loginModal.getByTestId('password-input-login').fill('password');

  await delay5Seconds();
  // "Remember me" disabled for now
  // await loginModal.getByTestId('remember-me-toggle-login').click();

  // Отправляем форму
  await loginModal.getByTestId('submit-button-login').click();

  // Ждем немного для завершения логина
  await delay5Seconds();

  // Делаем скриншот после логина
  await page.screenshot({ path: 'screenshots/login.png', fullPage: true });
});
