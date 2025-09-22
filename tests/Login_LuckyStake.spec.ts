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

test('luckystake login', async ({ context }) => {
const page = await context.newPage();
const loginPage = new LoginPage(page);
const homePage = new HomePage(page);

await page.goto('https://luckystake.dev/');
await homePage.closePopupIfVisible();
await loginPage.openLoginForm();
await loginPage.login('wiztestIsabell_Borer@hotmail.com', 'password');
await delay5Seconds();
await page.screenshot({ path: 'screenshots/login.png', fullPage: true });  
});