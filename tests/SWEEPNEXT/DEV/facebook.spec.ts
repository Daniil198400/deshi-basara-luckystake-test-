
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

  await page.getByTestId('social-media-facebook').first().click();

  
  await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`facebook`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds();

});


