import { test as base, Page, expect, devices, chromium } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { HomePage } from '../../../pages/HomePage';
import { UserFormHelper, fillField, clickButton, clickCheckboxByLabel } from '../../../pages/UserFormPage';
import { PaymentForm } from '../../../pages/PaymentForm';
import { generateRandomEmail, delay5Seconds, delay10Seconds } from '../../../utils/utils';

const test = base.extend<{}>({
  context: async ({}, use) => {
    const browser = await chromium.launch({
      // headless: false,
      // args: ['--start-maximized'],
    });

    const context = await browser.newContext({
      // viewport: { width: 1920, height: 1080 },
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

function generateEmail() {
  const unique = Date.now();
  return `wiztest+${unique}@gmail.com`;
}

// Универсальная безопасная функция клика
async function safeClick(locator: import('@playwright/test').Locator) {
  try {
    if ((await locator.count()) > 0 && (await locator.first().isVisible())) {
      await locator.first().click({ timeout: 2000 }).catch(() => {});
      console.log(`Clicked: ${await locator.first().toString()}`);
      return true;
    }
  } catch {}
  return false;
}

// Функция, которая пытается закрыть все окна до 4 раз подряд
export async function handleAllPopups(page: import('@playwright/test').Page, attempts = 4, delayMs = 1000) {
  for (let i = 0; i < attempts; i++) {
    console.log(`Попытка ${i + 1} закрыть модалки...`);
    await safeClick(page.getByRole('img', { name: /close/i }));
    await page.waitForTimeout(delayMs);

    await safeClick(page.getByRole('button', { name: 'Claim' }));
    await page.waitForTimeout(delayMs);

    const f = page.frameLocator('iframe').nth(2);
    await safeClick(f.getByRole('link', { name: '' }));
    await page.waitForTimeout(delayMs);

    await safeClick(f.getByRole('link', { name: 'START PLAYING' }));
    await page.waitForTimeout(delayMs);
  }

  console.log('Все попытки закрытия окон завершены');
}

test('@Regress cool off', async ({ page }) => {
  // ---------- Генерим и запоминаем e-mail текущего прогона ----------
  const registeredEmail = generateEmail();
  const registeredPassword = 'Qwerty1!';

  // также сохраним артефакт с e-mail для отчёта
  await test.info().attach('registered_email.txt', {
    body: registeredEmail,
    contentType: 'text/plain',
  });

  await page.goto('https://luckystake.com/');
  await page.getByTestId('signup-header').click();

  await page.getByTestId('email-input-signup').click();
  await page.getByTestId('email-input-signup').fill(registeredEmail);
  await page.getByTestId('password-input-signup').click();
  await page.getByTestId('password-input-signup').fill(registeredPassword);
  await page.locator('label').filter({ hasText: 'I am at least 18 years old' }).locator('span').click();
  await delay5Seconds();
  let screenshot = await page.screenshot({ fullPage: true });
  test.info().attach(`user name`, {
    body: screenshot,
    contentType: 'image/png',
  });
  await delay5Seconds();

  await page.getByTestId('submit-button-signup').click();

//   await page.getByTestId('first-name-input-complete-profile').click();
//   await page.getByTestId('first-name-input-complete-profile').fill('up');
//   await page.getByTestId('last-name-input-complete-profile').click();
//   await page.getByTestId('last-name-input-complete-profile').fill('ce');
// //   await page.getByTestId('state-select-complete-profile').click();
// //   await page.getByText('Arizona').click();

// await delay5Seconds();
// await page.getByTestId('state-select-complete-profile').click();
// await delay5Seconds();
// await page.getByRole('listitem').filter({ hasText: 'Alaska' }).click();
await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach(`registration is completed`, {
    body: screenshot,
    contentType: 'image/png',
  });
  await delay5Seconds();

  await page.goto('https://luckystake.com/');
  
  // await page.getByRole('img', { name: 'close' }).click();
  // await page.locator('iframe').nth(3).contentFrame().getByRole('link', { name: 'START PLAYING' }).click();
  

  await page.locator('#scrollBait__scrollable_layout').getByRole('link', { name: 'Player Safety' }).click();
  await delay5Seconds();
  await page.getByRole('link', { name: 'Take a Break' }).click();
  await delay5Seconds();

  



  await page.locator('div').filter({ hasText: /^30 Days$/ }).getByRole('button').click();
  await delay5Seconds();
  await page.getByRole('button', { name: 'Submit' }).click();
    await delay5Seconds();
  await page.getByRole('button', { name: 'Submit' }).click();

  await delay5Seconds();
  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach(`after submit button`, {
    body: screenshot,
    contentType: 'image/png',
  });
    await delay5Seconds();
  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach(`user is self-excluded`, {
    body: screenshot,
    contentType: 'image/png',
  });
  await delay5Seconds();

  // Выход из аккаунта
  await page.goto('https://luckystake.com/');
//   await page.getByRole('button', { name: 'Log out' }).click();
//   await page.getByRole('button', { name: 'Log out' }).nth(1).click();

//   // ---------- Логинимся именно тем пользователем, которого только что зарегистрировали ----------
//   await page.getByTestId('login-header').click();
//   await page.getByTestId('email-input-login').click();
//   await page.getByTestId('email-input-login').fill(registeredEmail); // используем сохранённый e-mail
//   await page.getByTestId('password-input-login').click();
//   await page.getByTestId('password-input-login').fill(registeredPassword);
  await delay5Seconds();
  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach(`user can't do login`, {
    body: screenshot,
    contentType: 'image/png',
  });
  await delay5Seconds();
//   await page.getByTestId('submit-button-login').click();
//   await delay5Seconds();

// screenshot = await page.screenshot({ fullPage: true });
//   test.info().attach(`user is logined`, {
//     body: screenshot,
//     contentType: 'image/png',
//   });
//   await delay5Seconds();
//   // Закрыть возможную модалку
//   await page.getByRole('img', { name: 'close' }).click().catch(() => {});
//   await delay5Seconds();
});




