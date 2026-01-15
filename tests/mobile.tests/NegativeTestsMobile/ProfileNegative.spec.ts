import { test as base, Page, expect, devices, chromium } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { HomePage } from '../../../pages/HomePage';
import { UserFormHelper, fillField, clickButton, clickCheckboxByLabel } from '../../../pages/UserFormPage';
import { PaymentForm } from '../../../pages/PaymentForm';
import { generateRandomEmail, delay5Seconds, delay10Seconds } from '../../../utils/utils';



const test = base.extend({
  context: async ({}, use) => {

    const browser = await chromium.launch({
      headless: false,
      args: ['--start-maximized']
    });

    const context = await browser.newContext({
    //   viewport: null,
      httpCredentials: {
        username: 'luckystake',
        password: 'luckystake1!'
      }
    });

    // Автоматический zoom для всех страниц
    context.addInitScript(() => {
      document.documentElement.style.zoom = "0.8";
    });

    await use(context);

    await context.close();
    await browser.close();
  },

  page: async ({ context }, use) => {
    const page = await context.newPage();

    await page.addInitScript(() => {
      document.documentElement.style.zoom = "0.8";
    });

    await use(page);
  }
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
    console.log(`Попытка ${i + 1} закрыть модалки...`);

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

  console.log(' все попытки закрытия окон завершены');
}

test('@Regress Negative test on profile page', async ({ page }) => {
async function clickStartPlayingIfExists(page: Page) {
  try {
    const frame = await page.locator('iframe').first().contentFrame();
    if (!frame) return false;

    const btn = frame.getByRole('link', { name: 'START PLAYING' });

    if (await btn.isVisible().catch(() => false)) {
      await btn.click().catch(() => {});
      console.log('▶ START PLAYING clicked');
      return true;
    }
  } catch {}

  return false;
}

await page.goto('https://luckystake.dev/');
await page.getByTestId('signup-header').click();

await page.getByTestId('email-input-signup').click();
await page.getByTestId('email-input-signup').fill(generateEmail());
await page.getByTestId('password-input-signup').click();
await page.getByTestId('password-input-signup').fill('Qwerty1!');
await page.locator('label').filter({ hasText: 'I am at least 18 years old' }).locator('span').click();
await page.getByTestId('submit-button-signup').click();
await delay10Seconds(); 

let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`registration is completed`, {
      body: screenshot,
      contentType: 'image/png',
    });

await delay5Seconds();
await page.goto('http://luckystake.dev/account/details');

await delay10Seconds();  

await clickStartPlayingIfExists(page); 

await delay10Seconds();

// await page.getByRole('textbox', { name: 'First Name' }).click();
// await page.getByRole('textbox', { name: 'First Name' }).fill('пааппп');




await page.getByRole('textbox', { name: 'First Name' }).click();
await page.getByRole('textbox', { name: 'First Name' }).fill('паааап');
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`not latin words`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();



await page.getByRole('textbox', { name: 'First Name' }).click();
await page.getByRole('textbox', { name: 'First Name' }).fill('d');
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`at least 2 signs`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();

await page.getByRole('textbox', { name: 'First Name' }).click();
await page.getByRole('textbox', { name: 'First Name' }).fill('пааппаввакпмитопп');
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`not latin words`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();

await page.getByRole('textbox', { name: 'First Name' }).click();
await page.getByRole('textbox', { name: 'First Name' }).fill('djhgfddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddf');
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`maximum 50 signs`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();


await page.getByRole('textbox', { name: 'Month' }).click();
await page.getByRole('listitem').filter({ hasText: 'December' }).click();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`scroll works`, {   body: screenshot,   contentType: 'image/png', });

await page.getByRole('textbox', { name: 'Day' }).click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`day must content at least something`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();

await page.getByRole('textbox', { name: 'Month' }).click();
await page.getByRole('listitem').filter({ hasText: 'February' }).click();
await page.getByRole('textbox', { name: 'Day' }).click();
await page.getByRole('textbox', { name: 'Day' }).fill('30');
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`30th february doesn't exist`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();


await page.getByRole('textbox', { name: 'Month' }).click();
await page.getByRole('listitem').filter({ hasText: 'February' }).click();
await page.getByRole('textbox', { name: 'Day' }).click();
await page.getByRole('textbox', { name: 'Day' }).fill('40');
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`max is 31`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();

await page.getByRole('textbox', { name: 'Year' }).click();
await page.getByRole('textbox', { name: 'Year' }).fill('1000');
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`user can be no older than 120 years`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();


await page.getByRole('textbox', { name: 'Year' }).click();
await page.getByRole('textbox', { name: 'Year' }).fill('2010');
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`user can't be such young`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();


await page.getByRole('textbox', { name: 'Phone number' }).click();
await page.getByRole('textbox', { name: 'Phone number' }).fill('+15');
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`at least 7 numbers are needed`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();



await page.getByRole('textbox', { name: 'Full Address' }).click();
await page.getByRole('textbox', { name: 'Phone number' }).click();
await page.getByRole('textbox', { name: 'Phone number' }).fill('+1565435566677666555');
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`too big number`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();


await page.getByRole('textbox', { name: 'Full Address' }).click();
await page.getByRole('textbox', { name: 'Full Address' }).fill('f');
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`too little name of address`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();


await page.getByRole('textbox', { name: 'Full Address' }).click();
await page.getByRole('textbox', { name: 'Full Address' }).fill(' tkreldkedkekek 234');
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`space before the first sign is not allowed`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();

await page.getByRole('textbox', { name: 'Full Address' }).click();
await page.getByRole('textbox', { name: 'Full Address' }).fill('tkreldkedkekek 234 ');
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`space after the adress is not allowed`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();


await page.getByRole('textbox', { name: 'Full Address' }).click();
await page.getByRole('textbox', { name: 'Full Address' }).fill('рпавввсвс');
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`no latin words are not allowed`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();





await page.getByRole('textbox', { name: 'City' }).click();
await page.getByRole('textbox', { name: 'City' }).fill(' gfdsddd ');
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`spaces are not allowed before or after text`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();


await page.getByRole('textbox', { name: 'City' }).click();
await page.getByRole('textbox', { name: 'City' }).fill('ffrаувппк');
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`cyrrilica is not allowed too`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();


await page.getByRole('textbox', { name: 'ZIP' }).click();
await page.getByRole('textbox', { name: 'ZIP' }).fill('fvvfvf');
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`zip can content the numbers only`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();


await page.getByRole('textbox', { name: 'ZIP' }).click();
await page.getByRole('textbox', { name: 'ZIP' }).fill(' 54334');
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`zip can not content space before text`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();


await page.getByRole('textbox', { name: 'ZIP' }).click();
await page.getByRole('textbox', { name: 'ZIP' }).fill('544');
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`zip can not content less than 5 signs`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();


await page.getByRole('textbox', { name: 'ZIP' }).click();
await page.getByRole('textbox', { name: 'ZIP' }).fill('7654544');
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`zip can not content more than 5 signs`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();

await page.getByRole('textbox', { name: 'ZIP' }).click();
await page.getByRole('textbox', { name: 'ZIP' }).fill('рпавыаа');
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`zip can not content no latin or no numbers`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();

// await page.locator('iframe[name="chat-widget-minimized"]').contentFrame().getByRole('button', { name: 'Hide greeting' }).click();
await delay5Seconds();

await page.getByRole('textbox', { name: 'Current password' }).click();
await page.getByRole('textbox', { name: 'Current password' }).fill('Qwerty1!');
await page.locator('div').filter({ hasText: /^Current passwordHideShow$/ }).getByRole('button').click();
await page.getByRole('textbox', { name: 'New password', exact: true }).click();
await page.getByRole('textbox', { name: 'New password', exact: true }).fill('Qwerty1!');
await page.getByRole('button', { name: 'Show' }).first().click();
await page.getByRole('textbox', { name: 'Confirm New Password' }).click();
await page.getByRole('textbox', { name: 'Confirm New Password' }).fill('Qwerty1!');
await page.getByRole('button', { name: 'Show' }).click();
await page.getByRole('button', { name: 'Change password' }).click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`you can not change password for the same`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();



await page.getByRole('textbox', { name: 'Current password' }).click();
await page.getByRole('textbox', { name: 'Current password' }).fill('рпавмаамам');
await page.getByRole('textbox', { name: 'New password', exact: true }).click();
await page.getByRole('textbox', { name: 'New password', exact: true }).fill('ппмпипиппи');
await page.getByRole('textbox', { name: 'Confirm New Password' }).click();
await page.getByRole('textbox', { name: 'Confirm New Password' }).fill('пипипипмипири');
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`you can not change password with no latin words`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();



await page.getByRole('textbox', { name: 'Current password' }).click();
await page.getByRole('textbox', { name: 'Current password' }).fill('Qwerty1!');
await page.getByRole('textbox', { name: 'New password', exact: true }).click();
await page.getByRole('textbox', { name: 'New password', exact: true }).fill(' Qwertyyy543');
await page.getByRole('textbox', { name: 'Confirm New Password' }).click();
await page.getByRole('textbox', { name: 'Confirm New Password' }).fill(' Qwertyyy543');
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`you can not change password with space at the beggining`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();


await page.getByRole('textbox', { name: 'Current password' }).click();
await page.getByRole('textbox', { name: 'Current password' }).fill('Qwerty1!');
await page.getByRole('textbox', { name: 'New password', exact: true }).click();
await page.getByRole('textbox', { name: 'New password', exact: true }).fill('1234567890');
await page.getByRole('textbox', { name: 'Confirm New Password' }).click();
await page.getByRole('textbox', { name: 'Confirm New Password' }).fill('1234567890');
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`you can not change password for numbers only`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();


await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
await page.locator('div').filter({ hasText: /^Phone$/ }).getByRole('button').click();
await page.getByRole('button', { name: 'Save' }).nth(1).click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`just checking checkboxes`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();
await page.locator('div').filter({ hasText: /^Phone$/ }).getByRole('button').click();
await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
await page.getByRole('button', { name: 'Save' }).nth(1).click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`just checking checkboxes 2`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();
await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
await page.getByRole('button', { name: 'Save' }).nth(1).click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`just checking checkboxes 3`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();
await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
await page.locator('div').filter({ hasText: /^Phone$/ }).getByRole('button').click();
await page.getByRole('button', { name: 'Save' }).nth(1).click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`just checking checkboxes 4`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();



await page.getByText('Contact Customer Support.').click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`customer support works`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();

await page.locator('iframe[name="chat-widget"]').contentFrame().getByRole('button', { name: 'Minimize window' }).click();



await page.getByRole('textbox', { name: 'First Name' }).click();
await page.getByRole('textbox', { name: 'First Name' }).fill('fooo');
await page.getByRole('textbox', { name: 'Last Name' }).click();
await page.getByRole('textbox', { name: 'Last Name' }).fill('llll');
await page.getByRole('textbox', { name: 'Month' }).click();
await page.getByRole('listitem').filter({ hasText: 'February' }).click();
await page.getByRole('textbox', { name: 'Day' }).click();
await page.getByRole('textbox', { name: 'Day' }).fill('22');
await page.getByRole('textbox', { name: 'Year' }).click();
await page.getByRole('textbox', { name: 'Year' }).fill('2000');
await page.getByRole('textbox', { name: 'Phone number' }).click();
await page.getByRole('textbox', { name: 'Phone number' }).fill('+18547831232');
await page.getByRole('textbox', { name: 'Phone number' }).press('ArrowLeft');
await page.getByRole('textbox', { name: 'Phone number' }).press('ArrowLeft');
await page.getByRole('textbox', { name: 'Phone number' }).press('ArrowLeft');
await page.getByRole('textbox', { name: 'Phone number' }).fill('+11223344');
await page.getByRole('textbox', { name: 'Full Address' }).click();
await page.getByRole('textbox', { name: 'Full Address' }).fill('gkfkdkd');


await page.getByRole('textbox', { name: 'City' }).click();
await page.getByRole('textbox', { name: 'City' }).fill('DDD');
await page.getByRole('textbox', { name: 'ZIP' }).click();
await page.getByRole('textbox', { name: 'ZIP' }).fill('65432');

await page.locator('form').filter({ hasText: 'First NameLast' }).getByRole('button').click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true }); test.info().attach(`phone number is already exist`, {   body: screenshot,   contentType: 'image/png', });
await delay5Seconds();


  });