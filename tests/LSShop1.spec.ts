import { test as base, Page, expect, devices } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { delay10Seconds, delay5Seconds } from '../utils/utils';
import { ProfilePage } from '../pages/ProfilePage';

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

  await page.goto('https://luckystake.dev/');

  // Открываем модальное окно логина через test-id
  await page.getByTestId('login-header').click();

  // Ждем, пока откроется модалка логина
  const loginModal = page.getByTestId('login-modal');
  await expect(loginModal).toBeVisible();

  // Заполняем логин
  await loginModal.getByTestId('email-input-login').fill('dksld144@gmail.com');
  await loginModal.getByTestId('password-input-login').fill('Qwerty1!');

  // Включаем "Remember me" (если нужно)
  //await loginModal.getByTestId('remember-me-toggle-login').click();

  // Отправляем форму
  await loginModal.getByTestId('submit-button-login').click();

  // Ждем немного для завершения логина
  await delay10Seconds();

await page.locator('.WizIconButton_base__JfGpY.WizPopupWrapper_close__hKtRn').click();

// await page.locator('.WizIconButton_base__JfGpY.WizPopupWrapper_close__hKtRn').click();

  //Screenshot before 
    let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`prosto shop`, {
      body: screenshot,
      contentType: 'image/png',
    });

  await delay5Seconds();

await page.goto('https://luckystake.dev/store');

await delay10Seconds();

await page.getByTestId('go-back-button-shop').click();
  
  screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`after checking the shop`, {
      body: screenshot,
      contentType: 'image/png',
    });

  });