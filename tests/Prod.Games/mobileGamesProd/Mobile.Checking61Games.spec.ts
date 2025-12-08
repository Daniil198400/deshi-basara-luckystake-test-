import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { HomePage } from '../../../pages/HomePage';
import { delay5Seconds, delay10Seconds } from '../../../utils/utils';

// контекст с httpCredentials
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

test('@CheckPresenceOfGames Mobile Checking All Games Sections', async ({ context }) => {
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  // --- открываем сайт ---
  await page.goto('https://luckystake.com/');
  await homePage.closePopupIfVisible();

  let screenshot = await page.screenshot({ fullPage: true });
 
  // --- логин ---
  await loginPage.openLoginForm();
  await loginPage.login('wiztest+80001@gmail.com', 'Qwerty1!');

  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn(' Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`after_login`, {
        body: screenshot,
        contentType: 'image/png',
      });

  await page.getByRole('button').filter({ hasText: 'Search' }).click();
   try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Games Recommended for you`, {
        body: screenshot,
        contentType: 'image/png',
      });

  await page.getByRole('button', { name: 'Load More' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Games Recommended for you 2`, {
        body: screenshot,
        contentType: 'image/png',
      });
  await page.getByRole('button', { name: 'Load More' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Games Recommended for you 3`, {
        body: screenshot,
        contentType: 'image/png',
      });
});