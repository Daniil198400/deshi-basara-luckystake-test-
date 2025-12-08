// import { test, Page, expect } from '@playwright/test';
// import { LoginPage } from '../../../../../pages/LoginPage';
// import { HomePage } from '../../../../../pages/HomePage';
// import { GamePage } from '../../../../../pages/ClickOnPlayPage';
// import { delay10Seconds, delay5Seconds } from '../../../../../utils/utils';

// // Массив айдишников игр
// const gameIds = [
//     "28629"
// ];

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

//         try {
//                 await page.waitForLoadState('networkidle', { timeout: 25000 });
//               } catch {
//                 console.warn('⏱️ Network idle is not found after 20 сек, continue...');
//               }
//         await delay10Seconds();

        
//         await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('#stormCanvas0').click({
//           position: {
//             x: 603,
//             y: 499
//           }
//         });

//         // второй скриншот
//         screenshot = await page.screenshot({ fullPage: true });
//         test.info().attach(`game_${id}_after_wait`, { 
//             body: screenshot, 
//             contentType: 'image/png' 
//         });

        

//         await delay5Seconds();
//     }
// }

// test('@ClickOnAdditionalStepMobile (DISABLED) Storm Gaming', async ({ page }) => {
//  await page.goto('https://luckystake.com/');

//   await page.getByTestId('login-header').click();
//   await page.getByTestId('email-input-login').click();
//   await page.getByTestId('email-input-login').fill('wiztest+80001@gmail.com');
//   await page.getByTestId('password-input-login').click();
//   await page.getByTestId('password-input-login').fill('Qwerty1!');
//   await page.getByTestId('submit-button-login').click();

//     await delay5Seconds();

//   await page.goto('https://luckystake.com/');
    //    const scImage = page.getByRole('img', { name: 'SC', exact: true });
    //     if (await scImage.isVisible()) {
    //       await scImage.scrollIntoViewIfNeeded();
    //       await scImage.click({ force: true });
    //       console.log('Клик по SC');
    //     }
      
//         await delay5Seconds();
//     // launching the games
//     await playGames(page);
// }); 
