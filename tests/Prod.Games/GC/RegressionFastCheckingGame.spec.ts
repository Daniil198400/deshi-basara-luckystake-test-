import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { HomePage } from '../../../pages/HomePage';
import { GamePage } from '../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../utils/utils';

test.use({
  httpCredentials: {
    username: 'luckystake',
    password: 'luckystake1!',
  },
});

test('@regressFastCheckingGame regress', async ({ page }) => {

         /**
     * Clicks the "close" button if it exists on the page.
     * @param {import('@playwright/test').Page} page - The Playwright page object.
     */
    async function clickCloseIfPresent(page: Page) {
      const closeButton = page.getByRole('img', { name: 'close' });
      if (await closeButton.count() > 0) {
        await closeButton.first().click();
        console.log('Close button clicked');
      } else {
        console.log('Close button not found, skipping click');
      }
    }





await page.goto('https://luckystake.com/');

await page.getByTestId('login-header').click();
await page.getByTestId('email-input-login').click();
await page.getByTestId('email-input-login').fill('wiztest+80001@gmail.com');
await page.getByTestId('password-input-login').click();
await page.getByTestId('password-input-login').fill('Qwerty1!');
await page.getByTestId('submit-button-login').click();

await delay5Seconds();
  await clickCloseIfPresent(page);
await delay5Seconds();

await page.goto('https://luckystake.com/game/real/21849');
await delay5Seconds();

let screenshot = await page.screenshot();
            test.info().attach(`game_before_play_now`, { 
                body: screenshot, 
                contentType: 'image/png' 
            });
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();

await page.getByRole('button').filter({ hasText: /^$/ }).click();
await delay5Seconds();
screenshot = await page.screenshot();
            test.info().attach(`search sectrion play now`, { 
                body: screenshot, 
                contentType: 'image/png' 
            });
            await delay5Seconds();
await page.getByRole('button', { name: 'Providers' }).click();
await delay5Seconds();
screenshot = await page.screenshot();
            test.info().attach(`providers in game`, { 
                body: screenshot, 
                contentType: 'image/png' 
            });
await delay5Seconds();
await page.getByRole('button', { name: 'Categories' }).click();
await delay5Seconds();
screenshot = await page.screenshot();
            test.info().attach(`categories in game`, { 
                body: screenshot, 
                contentType: 'image/png' 
            });
            await delay5Seconds();
await page.getByTestId('close-button-searchgames').click();
await delay5Seconds();





await page.getByRole('button', { name: 'buy' }).click();
await delay5Seconds();
screenshot = await page.screenshot();
            test.info().attach(`bundles`, { 
                body: screenshot, 
                contentType: 'image/png' 
            });
            await delay5Seconds();
await page.getByRole('button', { name: '$49.99' }).click();
await delay5Seconds();

screenshot = await page.screenshot();
            test.info().attach(`deposit cannot be done in prod`, { 
                body: screenshot, 
                contentType: 'image/png' 
            });
            await delay5Seconds();
await delay5Seconds();

await page.getByTestId('close-button-deposit').click();
await delay5Seconds();
}); 



