// import { test, Page, expect } from '@playwright/test';
// import { delay10Seconds, delay5Seconds } from '../../../utils/utils';

// // array of IDs
// const gameIds = [
//         "23941",
//         "23964",
//         "23963",
//         "23962",
//         "23961",
//         "23960",
//         "23959",
//         "23958",
//         "23957",
//         "23956",
//         "23955",
//         "23954",
//         "23953",
//         "23927",
//         "23925",
//         "23924",
//         "23923",
//         "23920",
//         "23919",
//         "23918",
//         "23917",
//         "23916",
//         "23915",
//         "23914",
//         "23913",
//         "23912",
//         "23911",
//         "23910",
//         "23909",
//         "23908",
//         "23907",
//         "23906",
//         "23905",
//         "23952",
//         "23951",
//         "23950",
//         "23949",
//         "23948",
//         "23947",
//         "23946",
//         "23945",
//         "23944",
//         "23943",
//         "23942",
//         "23965",
//         "23940",
//         "23939",
//         "23938",
//         "23937",
//         "23936",
//         "23935",
//         "23934",
//         "23933",
//         "23932",
//         "23931",
//         "23930",
//         "23929",
//         "23928",
//         "35200",
//         "35550",
//         "35551",
//         "35552",
//         "40825",
//         "44803",
//         "40480",
//         "40479",
//         "44809",
//         "44814",
//         "38798",
//         "38807",
//         "40831",
//         "44261",
//         "44262",
//         "44263",
//         "44264",
//         "27049",
//         "28154",
//         "27050",
//         "29172",
//         "26293",
//         "26228",
//         "26059",
//         "25574",
//         "25505",
//         "25430",
//         "25106",
//         "23978",
//         "23977",
//         "23976",
//         "23975",
//         "23974",
//         "23973",
//         "23972",
//         "23971",
//         "23970",
//         "23969",
//         "23968",
//         "23967",
//         "23966"
//     ];


// // function
// async function playGames(page: Page) {
//     for (const id of gameIds) {
//         const gameUrl = `https://luckystake.com/game/real/${id}`;
//         await page.goto(gameUrl);
//         await delay5Seconds();

//         // screenshot before Play now button
//         let screenshot = await page.screenshot({ fullPage: true });
//         test.info().attach(`game_${id}_before_playnow`, { 
//             body: screenshot, 
//             contentType: 'image/png' 
//         });

//         // click on Play now
//         await page.getByRole('button', { name: 'Play now' }).click();
//         await delay5Seconds();

//         // waiting
//         try {
//       await page.waitForLoadState('networkidle', { timeout: 10000 });
//     } catch {
//       console.warn(' Network idle is not found after 10 сек, continue...');
//     }
//         await delay5Seconds();


//         // второй скриншот
//         screenshot = await page.screenshot({ fullPage: true });
//         test.info().attach(`game_${id}_after_wait`, { 
//             body: screenshot, 
//             contentType: 'image/png' 
//         });


//         await delay5Seconds();
//     }
// }

// test('ClickOnAdditionalStep (AVAILABLE ONLY IN CHROME) Penguin King', async ({ page }) => {

//     // autorization
//   await page.goto('https://luckystake.com/');
  
//   await page.getByTestId('login-header').click();
//   await page.getByTestId('email-input-login').click();
//   await page.getByTestId('email-input-login').fill('wiztest+80001@gmail.com');
//   await page.getByTestId('password-input-login').click();
//   await page.getByTestId('password-input-login').fill('Qwerty1!');
//   await page.getByTestId('submit-button-login').click();

// await delay5Seconds();
// //   await page.goto('https://luckystake.com/');

// //        const scImage = page.getByRole('img', { name: 'SC', exact: true });
// //         if (await scImage.isVisible()) {
// //           await scImage.scrollIntoViewIfNeeded();
// //           await scImage.click({ force: true });
// //           console.log('Клик по SC');
// //         }
      
//     // launching the games
//     await playGames(page);
// }); 
