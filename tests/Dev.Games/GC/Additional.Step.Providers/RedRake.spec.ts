// import { test as base, Page, expect } from '@playwright/test';
// import { LoginPage } from '../../../../pages/LoginPage';
// import { HomePage } from '../../../../pages/HomePage';
// import { GamePage } from '../../../../pages/ClickOnPlayPage';
// import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';

// // расширяем test, добавляем httpCredentials
// const test = base.extend<{}>({
//   context: async ({ browser }, use) => {
//     const context = await browser.newContext({
//       httpCredentials: {
//         username: 'luckystake',
//         password: 'luckystake1!',
//       },
//     });
//     await use(context);
//     await context.close();
//   },
// });

// // array of IDs
// const gameIds = [
//         "24084",
//         "10601",
//         "10699",
//         "10590",
//         "10697",
//         "10585",
//         "10581",
//         "10580",
//         "10700",
//         "10600",
//         "10584",
//         "10591",
//         "10588",
//         "10596",
//         "10586",
//         "10702",
//         "10592",
//         "10595",
//         "10587",
//         "10582",
//         "10613",
//         "10622",
//         "10612",
//         "10614",
//         "10611",
//         "10604",
//         "10608",
//         "10624",
//         "10629",
//         "10610",
//         "10646",
//         "10642",
//         "10635",
//         "10638",
//         "10643",
//         "10579",
//         "10605",
//         "32934",
//         "32933",
//         "32932",
//         "32931",
//         "32930",
//         "32929",
//         "32928",
//         "32927",
//         "32923",
//         "32922",
//         "32921",
//         "32920",
//         "32919",
//         "32918",
//         "32915",
//         "32914",
//         "32913",
//         "32912",
//         "32910",
//         "32909",
//         "32907",
//         "32906",
//         "32905",
//         "32904",
//         "32903",
//         "32902",
//         "32901",
//         "32900",
//         "32899",
//         "32898",
//         "32897",
//         "32896",
//         "21849",
//         "32895",
//         "32894",
//         "32893",
//         "23231",
//         "32892",
//         "32891",
//         "24165",
//         "24099",
//         "24098",
//         "24096",
//         "24095",
//         "24094",
//         "24092",
//         "24091",
//         "24090",
//         "24089",
//         "24088",
//         "24087",
//         "24086",
//         "24085"
// ];


// // function
// async function playGames(page: Page) {
//   for (const id of gameIds) {
//     const gameUrl = `https://luckystake.dev/game/real/${id}`;
//     await page.goto(gameUrl);
//     await delay5Seconds();

//     // screenshot before Play now button
//     let screenshot = await page.screenshot({ fullPage: true });
//     test.info().attach(`game_${id}_before_playNow`, {
//       body: screenshot,
//       contentType: 'image/png',
//     });

//     // click on Play now
//     await page.getByRole('button', { name: 'Play now' }).click();
// try {
//   await page.waitForLoadState('networkidle', { timeout: 30000 }); 
// } catch (e) {
//   console.warn('Network idle is not found after 30 sec, keep going...');
// }
//     await delay10Seconds();





//     await delay5Seconds();
//     // второй скриншот
//     screenshot = await page.screenshot({ fullPage: true });
//     test.info().attach(`game_${id}_after_wait`, {
//       body: screenshot,
//       contentType: 'image/png',
//     });

//     await delay5Seconds();
//   }
// };
  


// test('@providersDev CHECKING IS NOT NEEDED - RedRake', async ({ page }) => {
//      /**
//  * Clicks the "close" button if it exists on the page.
//  * @param {import('@playwright/test').Page} page - The Playwright page object.
//  */
// async function clickCloseIfPresent(page: Page) {
//   const closeButton = page.getByRole('img', { name: 'close' });
//   if (await closeButton.count() > 0) {
//     await closeButton.first().click();
//     console.log('Close button clicked');
//   } else {
//     console.log('Close button not found, skipping click');
//   }
// }

// // await clickCloseIfPresent(page);

//   await page.goto('https://luckystake.dev/');
//   await page.getByTestId('login-header').click();
//   await page.getByTestId('email-input-login').click();
//   await page.getByTestId('email-input-login').fill('dksld123@gmail.com');
//   await page.getByTestId('password-input-login').click();
//   await page.getByTestId('password-input-login').fill('Qwerty1!');
//   await page.getByTestId('submit-button-login').click();
//   await delay5Seconds();

//   await clickCloseIfPresent(page);
//   await delay5Seconds();
//   const scImage = page.getByRole('img', { name: 'SC', exact: true });
//         if (await scImage.isVisible()) {
//           await scImage.scrollIntoViewIfNeeded();
//           await scImage.click({ force: true });
//           console.log('click on GC');
//         }
//       await delay5Seconds();  
//   // launching the games
//   await playGames(page);
// });
