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
//         "29255",
//         "29254",
//         "29253",
//         "29252",
//         "29251",
//         "29249",
//         "29248",
//         "29247",
//         "29246",
//         "29245",
//         "29244",
//         "29243",
//         "29242",
//         "29241",
//         "29240",
//         "29239",
//         "29238",
//         "29237",
//         "29235",
//         "29234",
//         "29233",
//         "29232",
//         "29231",
//         "29230",
//         "29229",
//         "29228",
//         "29227",
//         "29226",
//         "29225",
//         "29224",
//         "29223",
//         "29222",
//         "29221",
//         "29220",
//         "29219",
//         "29218",
//         "29217",
//         "29216",
//         "29268",
//         "29214",
//         "29213",
//         "29212",
//         "29211",
//         "29210",
//         "29209",
//         "29208",
//         "29207",
//         "29206",
//         "29205",
//         "29204",
//         "29203",
//         "29202",
//         "29201",
//         "29200",
//         "29199",
//         "29198",
//         "29197",
//         "29195",
//         "29193",
//         "29192",
//         "29191",
//         "29190",
//         "29189",
//         "29188",
//         "29187",
//         "29186",
//         "29185",
//         "29184",
//         "29183",
//         "29182",
//         "29181",
//         "29180",
//         "29250",
//         "29179",
//         "29178",
//         "29177",
//         "29215",
//         "29267",
//         "29266",
//         "29265",
//         "29264",
//         "29263",
//         "29262",
//         "29261",
//         "29260",
//         "29259",
//         "29257",
//         "29256",
//         "29273",
//         "29272",
//         "29271",
//         "29270",
//         "29269"
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

// await delay5Seconds();

//   }
// };
  


// test('@providersDev Should BE TESTED MANUALLY Octoplay', async ({ page }) => {
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
// await clickCloseIfPresent(page); 
// await delay5Seconds();
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
