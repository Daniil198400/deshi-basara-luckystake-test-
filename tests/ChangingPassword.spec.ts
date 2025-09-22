import { test as base, expect, devices } from '@playwright/test';
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


test('login, change password and logout, login', async ({ page }) => {
 
 const profile = new ProfilePage(page);

  // First Login
  await page.goto('https://luckystake.dev/');
  await page.getByRole('banner').getByRole('button', { name: 'LOG IN' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('dksld@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Qwerty1!');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Profile and Change Password
  await page.getByRole('link', { name: 'Profile' }).click();

  await page.getByRole('textbox', { name: 'Current password' }).fill('Qwerty1!');
  await page.getByRole('textbox', { name: 'New password', exact: true }).fill('Qwerty1!!');
  await page.getByRole('textbox', { name: 'Confirm New Password' }).fill('Qwerty1!!');
  await page.getByRole('button', { name: 'Change password' }).click();

  // Логаут
  await page.getByRole('button', { name: 'Log out' }).click();
  await page.getByRole('button', { name: 'Log out' }).nth(1).click();

  // Login Again
  await page.getByRole('banner').getByRole('button', { name: 'LOG IN' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('dksld@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Qwerty1!');
  await page.getByRole('button', { name: 'Sign in' }).click();
});
