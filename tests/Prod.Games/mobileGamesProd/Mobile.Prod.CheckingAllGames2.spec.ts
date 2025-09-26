
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

test('Mobile Checking All Games Sections', async ({ context }) => {
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  // --- открываем сайт ---
  await page.goto('https://luckystake.com/');
  await homePage.closePopupIfVisible();

  let screenshot = await page.screenshot({ fullPage: true });
 
  // --- логин ---
  await loginPage.openLoginForm();
  await loginPage.login('wiztest+70001@gmail.com', 'Qwerty1!');

  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`after_login`, {
        body: screenshot,
        contentType: 'image/png',
      });

  await page.getByRole('button').filter({ hasText: 'Search' }).click();

  await page.getByRole('button', { name: 'Providers 22' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`All 22 Providers`, {
        body: screenshot,
        contentType: 'image/png',
      });



await page.getByRole('link', { name: 'Four Leaf Gaming' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Four Leaf Gaming`, {
        body: screenshot,
        contentType: 'image/png',
      });

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.getByRole('link', { name: 'Storm Gaming' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Storm Gaming`, {
        body: screenshot,
        contentType: 'image/png',
      });

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.getByRole('link', { name: 'Gamzix' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Gamzix`, {
        body: screenshot,
        contentType: 'image/png',
      });

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.getByRole('link', { name: 'Print Studios' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Print Studios`, {
        body: screenshot,
        contentType: 'image/png',
      });

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.getByRole('link', { name: '4ThePlayer' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`4ThePlayer`, {
        body: screenshot,
        contentType: 'image/png',
      });

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.getByRole('link', { name: 'Fantasma Games' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Fantasma Games`, {
        body: screenshot,
        contentType: 'image/png',
      });

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.getByRole('link', { name: 'Peter & Sons' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Peter & Sons`, {
        body: screenshot,
        contentType: 'image/png',
      });

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.getByRole('link', { name: 'Octoplay' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Octoplay`, {
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
      test.info().attach(`Octoplay 2`, {
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
      test.info().attach(`Octoplay 3`, {
        body: screenshot,
        contentType: 'image/png',
      });

  await page.getByText('/ 98').click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Octoplay 4`, {
        body: screenshot,
        contentType: 'image/png',
      });

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.getByRole('link', { name: 'Trigger' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Trigger`, {
        body: screenshot,
        contentType: 'image/png',
      });

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.getByRole('link', { name: 'Microgaming' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Microgaming`, {
        body: screenshot,
        contentType: 'image/png',
      });

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.getByRole('link', { name: 'Playson' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Playson`, {
        body: screenshot,
        contentType: 'image/png',
      });

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.getByRole('link', { name: 'Spinomenal' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Spinomenal`, {
        body: screenshot,
        contentType: 'image/png',
      });

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.getByRole('link', { name: 'Iconic21' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 10 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Iconic21`, {
        body: screenshot,
        contentType: 'image/png',
      });

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

    });