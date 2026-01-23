import { test as base, expect, devices } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { HomePage } from '../../../pages/HomePage';
import { delay10Seconds, delay5Seconds } from '../../../utils/utils';
import { PaymentForm } from '../../../pages/PaymentForm';
import { LoggedInPaymentForm } from '../../../pages/LoggedInPaymentForm';


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

    //  close icon
    await safeClick(page.getByRole('img', { name: /close/i }));
    await page.waitForTimeout(delayMs);

    //  Claim button
    await safeClick(page.getByRole('button', { name: 'Claim' }));
    await page.waitForTimeout(delayMs);

    // элементы внутри iframe (динамический доступ, не кэшируем)
    const f = page.frameLocator('iframe').nth(2);
    await safeClick(f.getByRole('link', { name: '' }));
    await page.waitForTimeout(delayMs);

    await safeClick(f.getByRole('link', { name: 'START PLAYING' }));
    await page.waitForTimeout(delayMs);
  }

  console.log('Все попытки закрытия окон завершены');
}

test('@Regress login logout', async ({ page }) => {


await page.goto('https://luckystake.com/');

await page.getByTestId('login-header').click();
await page.getByTestId('email-input-login').click();
await page.getByTestId('email-input-login').fill('wiztest+70001@gmail.com');
await page.getByTestId('password-input-login').click();
await page.getByTestId('password-input-login').fill('Qwerty1!');
await page.getByTestId('submit-button-login').click();
await delay5Seconds();
let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`login is completed`, {
      body: screenshot,
      contentType: 'image/png', 
    });

await page.goto('https://luckystake.com/');

await page.getByRole('link', { name: 'Popular' }).click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`navigated to popular`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds();


await page.locator('#scrollBait__scrollable_layout').getByRole('link', { name: 'New & Exclusive' }).click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`navigated to new and exclusive`, {
      body: screenshot,
      contentType: 'image/png', 
    }); 
await delay5Seconds();



await page.locator('#scrollBait__scrollable_layout').getByRole('link', { name: 'Slots' }).click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`navigated to slots`, {
        body: screenshot,
        contentType: 'image/png',
    });
await delay5Seconds();


await page.locator('#scrollBait__scrollable_layout').getByRole('link', { name: 'Themes' }).click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`navigated to themes`, {
        body: screenshot,
        contentType: 'image/png',
    });
await delay5Seconds();




await page.getByRole('link', { name: 'About Us' }).click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`navigated to about us`, {
        body: screenshot,
        contentType: 'image/png',
    });
await delay5Seconds();

await page.goto('https://luckystake.com/');

await page.locator('#scrollBait__scrollable_layout').getByRole('link', { name: 'Help Center' }).click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`navigated to help center`, {
        body: screenshot,
        contentType: 'image/png',
    });
await delay5Seconds();


await page.goto('https://luckystake.com/');



await page.getByRole('link', { name: 'About Us' }).click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`navigated to about us`, {
      body: screenshot,
      contentType: 'image/png', 
    }); 
await delay5Seconds();  

await page.goto('https://luckystake.com/');

await page.locator('#scrollBait__scrollable_layout').getByRole('link', { name: 'Help Center' }).click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`navigated to help center`, {
      body: screenshot,
      contentType: 'image/png', 
    }); 
await delay5Seconds();      


await page.goto('https://luckystake.com/');


await page.getByRole('link', { name: 'Sweepstake Rules' }).click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`navigated to sweepstake rules`, {  
        body: screenshot,
        contentType: 'image/png',
    });
await delay5Seconds();

await page.goto('https://luckystake.com/');


await page.locator('#scrollBait__scrollable_layout').getByRole('link', { name: 'Player Safety' }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`navigated to player safety`, {  
        body: screenshot,
        contentType: 'image/png',
    });
await delay5Seconds();




await page.goto('https://luckystake.com/');

await page.getByRole('link', { name: 'Privacy Policy' }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`navigated to privacy policy`, {  
        body: screenshot,
        contentType: 'image/png',
    });
await delay5Seconds();


await page.goto('https://luckystake.com/');

await page.getByRole('link', { name: 'Terms of Service' }).nth(1).click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`navigated to terms of service`, {  
        body: screenshot,
        contentType: 'image/png',
    });
await delay5Seconds();


await page.goto('https://luckystake.com/');

await page.getByRole('button', { name: 'Support' }).click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`support chat works`, {  
        body: screenshot,
        contentType: 'image/png',
    });
await delay5Seconds();



});

