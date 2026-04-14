
import { test as base, expect, devices } from '@playwright/test';
import { delay10Seconds, delay5Seconds } from '../../../utils/utils';



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


test('@Regress insta', async ({ page }) => {

await page.goto('https://sweepnext-stage.wiztechgroup-services.com');


await page.getByTestId('login-button').click();

await page.getByTestId('login-email-input').click();
await page.getByTestId('login-email-input').fill('dksld1@gmail.com');
await page.getByTestId('login-password-input').click();
await page.getByTestId('login-password-input').fill('Qwerty1!');
await page.getByTestId('login-submit-button').click();
await page.getByTestId('avatar-progress').click();

await delay5Seconds();
let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`I am in lobby`, {
      body: screenshot,
      contentType: 'image/png', 
    });

await delay5Seconds();
await page.goto('https://sweepnext-stage.wiztechgroup-services.com');


await page.getByTestId('burger-menu-button').getByRole('img').click();


await page.getByText('Get Coins').click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`get coins button is enabled`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds();


await page.getByTestId('sidebar-item-promotions').click();

 await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`promotions`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds();

await page.getByTestId('sidebar-item-shop').click();

 await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`shop`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds();

await page.getByTestId('sidebar-item-for-you').click();

 await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`for you`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds();

await page.getByTestId('sidebar-item-jackpot-play').click();

 await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`facebook`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds();

await page.getByTestId('sidebar-item-trending').click();

 await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`trending`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds();

await page.getByTestId('sidebar-item-classics').click();

 await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`classics`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds();

await page.getByTestId('sidebar-item-new').click();

 await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`new`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds();

await page.getByTestId('sidebar-item-favorites').click();

 await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`favorites`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds();

await page.getByTestId('sidebar-item-hold-and-win').click();

 await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`hold and win`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds();

await page.getByTestId('sidebar-item-animals').click();

 await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`animals`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds();

await page.getByText('VIP Arena').click();

  
  await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`VIP Arena`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds();

});


