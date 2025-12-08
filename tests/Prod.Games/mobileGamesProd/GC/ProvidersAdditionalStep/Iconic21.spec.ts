// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../../../../pages/LoginPage';
// import { HomePage } from '../../../../pages/HomePage';
// import { GamePage } from '../../../../pages/ClickOnPlayPage';
// import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';

// // array of IDs
// const gameIds = [
//        "35138",
//         "35136",
//         "35134",
//         "35132",
//         "35130",
//         "35128",
//         "35126",
//         "35124",
//         "35122",
//         "35120",
//         "35118",
//         "35116",
//         "35114",
//         "35112",
//         "35110",
//         "40477",
//         "38814",
//         "35553"
//     ];



// // function
// async function playGames(page) {
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
//         await delay10Seconds();
//         await delay10Seconds();
//         await delay10Seconds();

//         // второй скриншот
//         screenshot = await page.screenshot({ fullPage: true });
//         test.info().attach(`game_${id}_after_wait`, { 
//             body: screenshot, 
//             contentType: 'image/png' 
//         });

//         // проверяем кнопку "Explore games"
//         const exploreButton = page.getByRole('button', { name: 'Explore games' });
//         if (await exploreButton.isVisible({ timeout: 5000 })) {
//             await exploreButton.click();
//             await delay5Seconds();
//         } else {
//             console.log(`Explore games button for game ${id} not found, continuing...`);
//         }

//         // Click on buy button
//         const buyButton = page.getByRole('button', { name: 'buy' });
//         await delay5Seconds();

//         if (await buyButton.isVisible({ timeout: 1000 })) {
//             await buyButton.click();
//             await delay5Seconds();

//             // Screenshot after clicking buy button
//             screenshot = await page.screenshot();
//             test.info().attach(`game_${id}_buy_button`, { 
//                 body: screenshot, 
//                 contentType: 'image/png' 
//             });

//             const priceButton = page.getByRole('button', { name: '$19.99' });
//             if (await priceButton.isVisible({ timeout: 3000 })) {
//                 await priceButton.click();
//                 await delay10Seconds();

//                 const confirmButton = page.getByRole('button').nth(2);
//                 if (await confirmButton.isVisible({ timeout: 3000 })) {
//                     await confirmButton.click();
//                 } else {
//                     console.log(`Confirm button for game ${id} is not available, skipping...`);
//                 }
//             }
//         }

//         // click on Back button
//         const backButton = page.getByTestId('ArrowBackIosIcon');
//         if (await backButton.isVisible({ timeout: 3000 })) {
//             await backButton.click();
//         }

//         await delay5Seconds();
//     }
// }

// test('@ClickOnAdditionalStep Iconic21', async ({ page }) => {
   //await page.goto('https://luckystake.com/');

 // await page.getByTestId('login-header').click();
  //await page.getByTestId('email-input-login').click();
 // await page.getByTestId('email-input-login').fill('wiztest+80001@gmail.com');
 // await page.getByTestId('password-input-login').click();
  //await page.getByTestId('password-input-login').fill('Qwerty1!');
 // await page.getByTestId('submit-button-login').click();

    //await delay5Seconds();

  //await page.goto('https://luckystake.com/');
    //    const scImage = page.getByRole('img', { name: 'SC', exact: true });
    //     if (await scImage.isVisible()) {
    //       await scImage.scrollIntoViewIfNeeded();
    //       await scImage.click({ force: true });
    //       console.log('Клик по SC');
    //     }
//     await delay5Seconds();

//     // launching the games
//     await playGames(page);
// }); 
