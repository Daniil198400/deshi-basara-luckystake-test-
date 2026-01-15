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
  await page.goto('https://luckystake.dev/');

await page.getByTestId('login-header').click();
await page.getByTestId('email-input-login').click();
await page.getByTestId('email-input-login').fill('dksld1@gmail.com');
await page.getByTestId('password-input-login').click();
await page.getByTestId('password-input-login').fill('Qwerty1!');
await page.getByTestId('submit-button-login').click();

await delay5Seconds();
await page.getByRole('img', { name: 'close' }).click();
await delay5Seconds();

  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn(' Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
     let  screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`after_login`, {
        body: screenshot,
        contentType: 'image/png',
      });

  
  await page.getByRole('button').filter({ hasText: 'Search' }).click();

  await page.getByRole('button', { name: 'Categories' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Categories`, {
        body: screenshot,
        contentType: 'image/png',
      }); 
  
      await delay5Seconds();


      //New & Exclusive
  await page.locator('.CategoryLinkCard_link__1tEIH').first().click();

  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`New & Exclusive`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  

//Popular
await page.locator('.CategoryLinkCard_link__1tEIH').first().click();

  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Popular`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

      await page.getByRole('button', { name: 'Load More' }).click();

      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Popular 2`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

  await page.getByRole('button').filter({ hasText: /^$/ }).click();


  //Slots
  await page.locator('div:nth-child(2) > a:nth-child(3)').first().click();
try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
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
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Slots2`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

  await page.getByRole('button', { name: 'Load More' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
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
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Slots4`, {
        body: screenshot,
        contentType: 'image/png',
      }); 
  await page.getByRole('button', { name: 'Load More' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Slots5`, {
        body: screenshot,
        contentType: 'image/png',
      }); 
  await page.getByRole('button', { name: 'Load More' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Slots6`, {
        body: screenshot,
        contentType: 'image/png',
      }); 
  await page.getByRole('button', { name: 'Load More' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Slots7`, {
        body: screenshot,
        contentType: 'image/png',
      }); 
  await page.getByRole('button', { name: 'Load More' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Slots8`, {
        body: screenshot,
        contentType: 'image/png',
      }); 
  await page.getByRole('button', { name: 'Load More' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Slots9`, {
        body: screenshot,
        contentType: 'image/png',
      }); 
  await page.getByRole('button', { name: 'Load More' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Slots10`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  
  // await page.locator('div:nth-child(2) > a:nth-child(4)').click();
  // try {
  //       await page.waitForLoadState('networkidle', { timeout: 10000 });
  //     } catch {
  //       console.warn('Network idle is not found after 30 сек, continue...');
  //     }
  //     await delay5Seconds();
  //     screenshot = await page.screenshot({ fullPage: true });
  //     test.info().attach(`Live Games`, {
  //       body: screenshot,
  //       contentType: 'image/png',
  //     }); 
  // await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.locator('a:nth-child(5)').click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn(' Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Blackjack`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.locator('a:nth-child(6)').click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Roulette`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.locator('a:nth-child(7)').click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Game Shows`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.locator('a:nth-child(8)').click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Crash Games`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.locator('a:nth-child(9)').click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Table Games`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.locator('a:nth-child(10)').click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Unlimited Play`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await delay5Seconds();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Lobby`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

await delay5Seconds();

await page.waitForTimeout(1000); 
await page.close();


// --- закрываем страницу и контекст ---
// await page.close();
// await context.close();
 
});