import { test as base, Page, expect, devices } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { delay5Seconds } from '../utils/utils';
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



test('test', async ({ page }) => {
await page.goto('https://luckystake.com/');
await page.getByRole('button', { name: 'LOG IN' }).click();

await page.getByRole('textbox', { name: 'Email or Username' }).click();
await page.getByRole('textbox', { name: 'Email or Username' }).fill('wiztest+70001@gmail.com');
await page.getByRole('textbox', { name: 'Password' }).click();
await page.getByRole('textbox', { name: 'Password' }).fill('Qwerty1!');
await page.getByRole('button', { name: 'Sign in' }).click();

await delay5Seconds();
await page.goto('https://luckystake.com/game/real/28593');

await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('START').click();
await delay5Seconds();
await delay5Seconds();

});