import { test as base, expect, devices } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
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

test('@Regress luckystake searching', async ({ context }) => {
const page = await context.newPage();
const loginPage = new LoginPage(page);
const homePage = new HomePage(page);

await page.goto('https://luckystake.dev/');
await homePage.closePopupIfVisible();
await loginPage.openLoginForm();
await loginPage.login('wiztestIsabell_Borer@hotmail.com', 'password');

await delay5Seconds();

await page.locator('.WizIconButton_base__JfGpY.WizPopupWrapper_close__hKtRn').click();

await page.waitForSelector('.NewHeader_wrapper__8_z0Y', { state: 'detached', timeout: 5000 })
.catch(() => {});
await homePage.closePopupIfVisible();
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search' }).fill('aztec');
  await page.getByRole('textbox', { name: 'Search' }).press('Enter');
  // await page.locator('.SearchGames_search_games__cards_wrapper__8c4ac > div > .WizGameCard_container_gameImage__cFsR9').first().click();
  // await page.getByRole('button', { name: 'Play now' }).click();
  // await delay5Seconds();
  let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_before_playNow`, {
      body: screenshot,
      contentType: 'image/png',
    });
  // await page.screenshot({ path: 'screenshots/login_searching.png', fullPage: true });
  await delay5Seconds();
});