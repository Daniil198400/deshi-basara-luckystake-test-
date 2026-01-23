import { test as base, Page, expect, devices, chromium } from '@playwright/test';
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

function generateEmail() {
  const unique = Date.now(); // можно заменить на Math.floor(Math.random() * 100000)
  return `wiztest+${unique}@gmail.com`;
}

// Универсальная безопасная функция клика
async function safeClick(locator: import('@playwright/test').Locator) {
  try {
    if (await locator.count() > 0 && await locator.first().isVisible()) {
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
    console.log(`🌀 Попытка ${i + 1} закрыть модалки...`);

    // 1️⃣ close icon
    await safeClick(page.getByRole('img', { name: /close/i }));
    await page.waitForTimeout(delayMs);

    // 2️⃣ Claim button
    await safeClick(page.getByRole('button', { name: 'Claim' }));
    await page.waitForTimeout(delayMs);

    // 3️⃣ элементы внутри iframe (динамический доступ, не кэшируем)
    const f = page.frameLocator('iframe').nth(2);
    await safeClick(f.getByRole('link', { name: '' }));
    await page.waitForTimeout(delayMs);

    await safeClick(f.getByRole('link', { name: 'START PLAYING' }));
    await page.waitForTimeout(delayMs);
  }

  console.log(' Все попытки закрытия окон завершены');
}

test('@Regress Incompleted registration of invited user', async ({ page }) => {

  await page.goto('https://luckystake.dev/');
    await page.getByTestId('login-header').click();
  await page.getByTestId('email-input-login').click();
  await page.getByTestId('email-input-login').fill('dksld111@gmail.com');
  await page.getByTestId('password-input-login').click();
  await page.getByTestId('password-input-login').fill('Qwerty1!');
  await page.getByTestId('submit-button-login').click();
await delay10Seconds(); 

  await page.goto('https://luckystake.dev/refer_friend');


  await page.getByText('Invited Friends').click();

await delay5Seconds();
let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`invited users 1`, {
      body: screenshot,
      contentType: 'image/png',
    });
await delay5Seconds();
  await page.goto('https://luckystake.dev/');
  await page.getByRole('button', { name: 'Log out' }).click();
  await page.getByRole('button', { name: 'Log out' }).nth(1).click();




  await page.goto('http://luckystake.dev/?c=65270_BWVbNT7S');

  await page.getByTestId('signup-header').click();
await page.getByTestId('email-input-signup').click();
await page.getByTestId('email-input-signup').fill(generateEmail());
await page.getByTestId('password-input-signup').click();
await page.getByTestId('password-input-signup').fill('Qwerty1!');
await page.locator('label').filter({ hasText: 'I am at least 18 years old' }).locator('span').click();
await page.getByTestId('submit-button-signup').click();

  await delay10Seconds();
  screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`invited user is signed up`, {
      body: screenshot,
      contentType: 'image/png',
    });
    await delay5Seconds();
    await page.goto('http://luckystake.dev/?c=65270_BWVbNT7S');





    // await page.getByRole('img', { name: 'close' }).click();
async function clickIfExists(page:Page, timeout = 15000) {
  const locator = page.getByRole('img', { name: 'close' });

  try {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.click();
  } catch {
    // элемент не появился за timeout — ничего не делаем
  }
}


await clickIfExists(page);



  await page.getByRole('button', { name: 'Log out' }).click();
  await page.getByRole('button', { name: 'Log out' }).nth(1).click();

    await page.goto('https://luckystake.dev/');
    await page.getByTestId('login-header').click();
  await page.getByTestId('email-input-login').click();
  await page.getByTestId('email-input-login').fill('dksld111@gmail.com');
  await page.getByTestId('password-input-login').click();
  await page.getByTestId('password-input-login').fill('Qwerty1!');
  await page.getByTestId('submit-button-login').click();
await delay10Seconds(); 

  await page.goto('https://luckystake.dev/refer_friend');
  await delay5Seconds();
  await page.goto('https://luckystake.dev/refer_friend')
    await page.getByText('Invited Friends').click();
  await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`invited users 2`, {
      body: screenshot,
      contentType: 'image/png',
    });

await delay5Seconds();


});


