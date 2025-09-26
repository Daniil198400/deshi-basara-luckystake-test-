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
  },
});

test('Mobile Checking All Games Sections', async ({ context }) => {
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  // --- открываем сайт ---
  await page.goto('https://luckystake.dev/');
  await homePage.closePopupIfVisible();

  let screenshot = await page.screenshot({ fullPage: true });
 
  // --- логин ---
  await loginPage.openLoginForm();
  await loginPage.login('dksld1@gmail.com', 'Qwerty1!!');

  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`after_login`, {
        body: screenshot,
        contentType: 'image/png',
      });

  
  await page.getByRole('button').filter({ hasText: 'Search' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 30000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Games in Search`, {
        body: screenshot,
        contentType: 'image/png',
      });

  await page.getByRole('button', { name: 'Load More' }).click();
try {
        await page.waitForLoadState('networkidle', { timeout: 30000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Games in Search 2`, {
        body: screenshot,
        contentType: 'image/png',
      });

  await page.getByRole('button', { name: 'Providers 21' }).click();
try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`providers 21`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

  await page.locator('.SearchGames_search_games__cards_wrapper__CRmvI > a').first().click();
try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Platipus`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

  await page.getByRole('button', { name: 'Load More' }).click();
try {
        await page.waitForLoadState('networkidle', { timeout: 30000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Platipus 2`, {
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
      test.info().attach(`Platipus 3`, {
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
      test.info().attach(`Platipus 3`, {
        body: screenshot,
        contentType: 'image/png',
      }); 
  await page.getByRole('button').filter({ hasText: /^$/ }).click();


  await page.getByRole('link', { name: 'Novomatic' }).click();
try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Novomatic`, {
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
      test.info().attach(`Novomatic 2`, {
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
      test.info().attach(`Novomatic3`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

  await page.getByRole('button').filter({ hasText: /^$/ }).click();



  await page.getByRole('link', { name: 'Gamzix' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Gamzix`, {
        body: screenshot,
        contentType: 'image/png',
      }); 
  await page.getByRole('button').filter({ hasText: /^$/ }).click();


  await page.getByRole('link', { name: 'Octoplay' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
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
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
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
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Octoplay 3`, {
        body: screenshot,
        contentType: 'image/png',
      }); 
  await page.getByRole('button').filter({ hasText: /^$/ }).click();



  await page.getByRole('link', { name: 'Iconic21' }).click();
   try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Iconic21`, {
        body: screenshot,
        contentType: 'image/png',
      }); 
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'RedRake' }).click();
   try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`RedRake`, {
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
      test.info().attach(`RedRake 2`, {
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
      test.info().attach(`RedRake 3`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.getByRole('link', { name: 'TurboGames' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`TurboGames`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.getByRole('link', { name: '1spin4win' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`1spin4win`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.getByRole('link', { name: 'Four7' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Four7`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.getByRole('link', { name: 'Max Win Gaming' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Max Win Gaming`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.getByRole('link', { name: 'Felt' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Felt`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.getByRole('link', { name: 'Four Leaf Gaming' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
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
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Storm Gaming`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.getByRole('link', { name: 'Relax' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Relax`, {
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
      test.info().attach(`Relax 2`, {
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
      test.info().attach(`Relax 3`, {
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
      test.info().attach(`Relax4`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.getByRole('link', { name: 'Print Studios' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
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
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
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
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Fantasma Games`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.getByRole('link', { name: 'Rubyplay' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`RubyPlay`, {
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
      test.info().attach(`RubyPlay 2`, {
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
      test.info().attach(`RubyPlay 3`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.getByRole('link', { name: 'Peter & Sons' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Peter & Sons`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.getByRole('link', { name: 'Trigger' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Trigger`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await page.getByRole('link', { name: 'Spinomenal' }).click();
  try {
        await page.waitForLoadState('networkidle', { timeout: 30000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
      await delay5Seconds();
      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`Spinomenal`, {
        body: screenshot,
        contentType: 'image/png',
      }); 

  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await delay5Seconds();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await delay5Seconds();

//   await page.getByRole('button').filter({ hasText: 'Search' }).click();

//   await page.getByRole('button', { name: 'Categories' }).click();
//   try {
//         await page.waitForLoadState('networkidle', { timeout: 10000 });
//       } catch {
//         console.warn('⏱️ Network idle is not found after 30 сек, continue...');
//       }
//       await delay5Seconds();
//       screenshot = await page.screenshot({ fullPage: true });
//       test.info().attach(`Categories`, {
//         body: screenshot,
//         contentType: 'image/png',
//       }); 
  
//       await delay5Seconds();


//       //New & Exclusive
//   await page.locator('.CategoryLinkCard_link__1tEIH').first().click();

//   try {
//         await page.waitForLoadState('networkidle', { timeout: 10000 });
//       } catch {
//         console.warn('⏱️ Network idle is not found after 30 сек, continue...');
//       }
//       await delay5Seconds();
//       screenshot = await page.screenshot({ fullPage: true });
//       test.info().attach(`New & Exclusive`, {
//         body: screenshot,
//         contentType: 'image/png',
//       }); 

//   await page.getByRole('button').filter({ hasText: /^$/ }).click();
  

// //Popular
// await page.locator('.CategoryLinkCard_link__1tEIH').first().click();

//   try {
//         await page.waitForLoadState('networkidle', { timeout: 10000 });
//       } catch {
//         console.warn('⏱️ Network idle is not found after 30 сек, continue...');
//       }
//       await delay5Seconds();
//       screenshot = await page.screenshot({ fullPage: true });
//       test.info().attach(`Popular`, {
//         body: screenshot,
//         contentType: 'image/png',
//       }); 

//       await page.getByRole('button', { name: 'Load More' }).click();

//       await delay5Seconds();
//       screenshot = await page.screenshot({ fullPage: true });
//       test.info().attach(`Popular 2`, {
//         body: screenshot,
//         contentType: 'image/png',
//       }); 

//   await page.getByRole('button').filter({ hasText: /^$/ }).click();


//   //Slots
//   await page.locator('div:nth-child(2) > a:nth-child(3)').first().click();
// try {
//         await page.waitForLoadState('networkidle', { timeout: 10000 });
//       } catch {
//         console.warn('⏱️ Network idle is not found after 30 сек, continue...');
//       }
//       await delay5Seconds();
//       screenshot = await page.screenshot({ fullPage: true });
//       test.info().attach(`Slots`, {
//         body: screenshot,
//         contentType: 'image/png',
//       }); 

//   await page.getByRole('button', { name: 'Load More' }).click();
//   try {
//         await page.waitForLoadState('networkidle', { timeout: 10000 });
//       } catch {
//         console.warn('⏱️ Network idle is not found after 30 сек, continue...');
//       }
//       await delay5Seconds();
//       screenshot = await page.screenshot({ fullPage: true });
//       test.info().attach(`Slots2`, {
//         body: screenshot,
//         contentType: 'image/png',
//       }); 

//   await page.getByRole('button', { name: 'Load More' }).click();
//   try {
//         await page.waitForLoadState('networkidle', { timeout: 10000 });
//       } catch {
//         console.warn('⏱️ Network idle is not found after 30 сек, continue...');
//       }
//       await delay5Seconds();
//       screenshot = await page.screenshot({ fullPage: true });
//       test.info().attach(`Slots 3`, {
//         body: screenshot,
//         contentType: 'image/png',
//       }); 

//   await page.getByRole('button', { name: 'Load More' }).click();
//   try {
//         await page.waitForLoadState('networkidle', { timeout: 10000 });
//       } catch {
//         console.warn('⏱️ Network idle is not found after 30 сек, continue...');
//       }
//       await delay5Seconds();
//       screenshot = await page.screenshot({ fullPage: true });
//       test.info().attach(`Slots4`, {
//         body: screenshot,
//         contentType: 'image/png',
//       }); 
//   await page.getByRole('button', { name: 'Load More' }).click();
//   try {
//         await page.waitForLoadState('networkidle', { timeout: 10000 });
//       } catch {
//         console.warn('⏱️ Network idle is not found after 30 сек, continue...');
//       }
//       await delay5Seconds();
//       screenshot = await page.screenshot({ fullPage: true });
//       test.info().attach(`Slots5`, {
//         body: screenshot,
//         contentType: 'image/png',
//       }); 
//   await page.getByRole('button', { name: 'Load More' }).click();
//   try {
//         await page.waitForLoadState('networkidle', { timeout: 10000 });
//       } catch {
//         console.warn('⏱️ Network idle is not found after 30 сек, continue...');
//       }
//       await delay5Seconds();
//       screenshot = await page.screenshot({ fullPage: true });
//       test.info().attach(`Slots6`, {
//         body: screenshot,
//         contentType: 'image/png',
//       }); 
//   await page.getByRole('button', { name: 'Load More' }).click();
//   try {
//         await page.waitForLoadState('networkidle', { timeout: 10000 });
//       } catch {
//         console.warn('⏱️ Network idle is not found after 30 сек, continue...');
//       }
//       await delay5Seconds();
//       screenshot = await page.screenshot({ fullPage: true });
//       test.info().attach(`Slots7`, {
//         body: screenshot,
//         contentType: 'image/png',
//       }); 
//   await page.getByRole('button', { name: 'Load More' }).click();
//   try {
//         await page.waitForLoadState('networkidle', { timeout: 10000 });
//       } catch {
//         console.warn('⏱️ Network idle is not found after 30 сек, continue...');
//       }
//       await delay5Seconds();
//       screenshot = await page.screenshot({ fullPage: true });
//       test.info().attach(`Slots8`, {
//         body: screenshot,
//         contentType: 'image/png',
//       }); 
//   await page.getByRole('button', { name: 'Load More' }).click();
//   try {
//         await page.waitForLoadState('networkidle', { timeout: 10000 });
//       } catch {
//         console.warn('⏱️ Network idle is not found after 30 сек, continue...');
//       }
//       await delay5Seconds();
//       screenshot = await page.screenshot({ fullPage: true });
//       test.info().attach(`Slots9`, {
//         body: screenshot,
//         contentType: 'image/png',
//       }); 
//   await page.getByRole('button', { name: 'Load More' }).click();
//   try {
//         await page.waitForLoadState('networkidle', { timeout: 10000 });
//       } catch {
//         console.warn('⏱️ Network idle is not found after 30 сек, continue...');
//       }
//       await delay5Seconds();
//       screenshot = await page.screenshot({ fullPage: true });
//       test.info().attach(`Slots10`, {
//         body: screenshot,
//         contentType: 'image/png',
//       }); 

//   await page.getByRole('button').filter({ hasText: /^$/ }).click();
  
//   await page.locator('div:nth-child(2) > a:nth-child(4)').click();
//   try {
//         await page.waitForLoadState('networkidle', { timeout: 10000 });
//       } catch {
//         console.warn('⏱️ Network idle is not found after 30 сек, continue...');
//       }
//       await delay5Seconds();
//       screenshot = await page.screenshot({ fullPage: true });
//       test.info().attach(`Live Games`, {
//         body: screenshot,
//         contentType: 'image/png',
//       }); 
//   await page.getByRole('button').filter({ hasText: /^$/ }).click();

//   await page.locator('a:nth-child(5)').click();
//   try {
//         await page.waitForLoadState('networkidle', { timeout: 10000 });
//       } catch {
//         console.warn('⏱️ Network idle is not found after 30 сек, continue...');
//       }
//       await delay5Seconds();
//       screenshot = await page.screenshot({ fullPage: true });
//       test.info().attach(`Blackjack`, {
//         body: screenshot,
//         contentType: 'image/png',
//       }); 

//   await page.getByRole('button').filter({ hasText: /^$/ }).click();

//   await page.locator('a:nth-child(6)').click();
//   try {
//         await page.waitForLoadState('networkidle', { timeout: 10000 });
//       } catch {
//         console.warn('⏱️ Network idle is not found after 30 сек, continue...');
//       }
//       await delay5Seconds();
//       screenshot = await page.screenshot({ fullPage: true });
//       test.info().attach(`Roulette`, {
//         body: screenshot,
//         contentType: 'image/png',
//       }); 

//   await page.getByRole('button').filter({ hasText: /^$/ }).click();

//   await page.locator('a:nth-child(7)').click();
//   try {
//         await page.waitForLoadState('networkidle', { timeout: 10000 });
//       } catch {
//         console.warn('⏱️ Network idle is not found after 30 сек, continue...');
//       }
//       await delay5Seconds();
//       screenshot = await page.screenshot({ fullPage: true });
//       test.info().attach(`Game Shows`, {
//         body: screenshot,
//         contentType: 'image/png',
//       }); 

//   await page.getByRole('button').filter({ hasText: /^$/ }).click();

//   await page.locator('a:nth-child(8)').click();
//   try {
//         await page.waitForLoadState('networkidle', { timeout: 10000 });
//       } catch {
//         console.warn('⏱️ Network idle is not found after 30 сек, continue...');
//       }
//       await delay5Seconds();
//       screenshot = await page.screenshot({ fullPage: true });
//       test.info().attach(`Crash Games`, {
//         body: screenshot,
//         contentType: 'image/png',
//       }); 

//   await page.getByRole('button').filter({ hasText: /^$/ }).click();

//   await page.locator('a:nth-child(9)').click();
//   try {
//         await page.waitForLoadState('networkidle', { timeout: 10000 });
//       } catch {
//         console.warn('⏱️ Network idle is not found after 30 сек, continue...');
//       }
//       await delay5Seconds();
//       screenshot = await page.screenshot({ fullPage: true });
//       test.info().attach(`Table Games`, {
//         body: screenshot,
//         contentType: 'image/png',
//       }); 

//   await page.getByRole('button').filter({ hasText: /^$/ }).click();

//   await page.locator('a:nth-child(10)').click();
//   try {
//         await page.waitForLoadState('networkidle', { timeout: 10000 });
//       } catch {
//         console.warn('⏱️ Network idle is not found after 30 сек, continue...');
//       }
//       await delay5Seconds();
//       screenshot = await page.screenshot({ fullPage: true });
//       test.info().attach(`Unlimited Play`, {
//         body: screenshot,
//         contentType: 'image/png',
//       }); 

//   await page.getByRole('button').filter({ hasText: /^$/ }).click();

//   await delay5Seconds();
//   try {
//         await page.waitForLoadState('networkidle', { timeout: 10000 });
//       } catch {
//         console.warn('⏱️ Network idle is not found after 30 сек, continue...');
//       }
//       await delay5Seconds();
//       screenshot = await page.screenshot({ fullPage: true });
//       test.info().attach(`Lobby`, {
//         body: screenshot,
//         contentType: 'image/png',
//       }); 

// await delay5Seconds();

// await page.waitForTimeout(1000); 
// await page.close();


// // --- закрываем страницу и контекст ---
// // await page.close();
// // await context.close();


});