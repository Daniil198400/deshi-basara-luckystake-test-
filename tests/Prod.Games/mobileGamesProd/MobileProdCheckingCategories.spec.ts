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
  await page.getByRole('button', { name: 'Categories' }).click();
  await page.locator('.CategoryItem_link__HgTQG').first().click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`New Games`, {
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
      test.info().attach(`New Games 2`, {
        body: screenshot,
        contentType: 'image/png',
      });

  await page.getByText('/ 72').click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`New Games 3`, {
        body: screenshot,
        contentType: 'image/png',
      });

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.locator('div:nth-child(2) > a:nth-child(3)').first().click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Slots`, {
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
      test.info().attach(`Slots 2`, {
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
      test.info().attach(`Slots 3`, {
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
      test.info().attach(`Slots 4`, {
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
      test.info().attach(`Slots 5`, {
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
      test.info().attach(`Slots 6`, {
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
      test.info().attach(`Slots 7`, {
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
      test.info().attach(`Slots 8`, {
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
      test.info().attach(`Slots 9`, {
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
      test.info().attach(`Slots 10`, {
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
      test.info().attach(`Slots 11`, {
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
      test.info().attach(`Slots 12`, {
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
      test.info().attach(`Slots 13`, {
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
      test.info().attach(`Slots 14`, {
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
      test.info().attach(`Slots 15`, {
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
      test.info().attach(`Slots 16`, {
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
      test.info().attach(`Slots 17`, {
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
      test.info().attach(`Slots 18`, {
        body: screenshot,
        contentType: 'image/png',
      });
  await page.getByText('/ 717').click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Slots 19`, {
        body: screenshot,
        contentType: 'image/png',
      });

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.locator('.CategoryItem_link__HgTQG').first().click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Popular`, {
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
      test.info().attach(`Popular 2`, {
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
      test.info().attach(`Popular 3`, {
        body: screenshot,
        contentType: 'image/png',
      });
  await page.getByText('/ 95').click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Popular 4`, {
        body: screenshot,
        contentType: 'image/png',
      });

  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Back button`, {
        body: screenshot,
        contentType: 'image/png',
      });
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Back button 2`, {
        body: screenshot,
        contentType: 'image/png',
      });
});