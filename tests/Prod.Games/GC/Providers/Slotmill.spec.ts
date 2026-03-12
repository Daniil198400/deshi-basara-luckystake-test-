import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { GamePage } from '../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';

// Array of IDs
const gameIds = [
        "46065",
        "46048",
        "46047",
        "46046",
        "35829",
        "35828",
        "35827",
        "35826",
        "35825",
        "35824",
        "35823",
        "35822",
        "35821",
        "35820",
        "35819",
        "35818",
        "35815",
        "35814",
        "35813",
        "35812",
        "35811",
        "35810",
        "35809",
        "35808",
        "35807",
        "35806",
        "35802",
        "46049",
        "46045",
        "46050",
        "46044",
        "46042",
        "46051",
        "46052",
        "46053",
        "46054",
        "46055",
        "46056",
        "46057",
        "46058",
        "46059",
        "46060",
        "46061",
        "46062",
        "46063",
        "46064",
        "46043",
        "44815"
];

// function
async function playGames(page: Page) {
    for (const id of gameIds) {
        const gameUrl = `https://luckystake.com/game/real/${id}`;
        await page.goto(gameUrl);
        await delay5Seconds();

        // screenshot before Play now button
        let screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_${id}_before_playnow`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });

        // click on Play now
        await page.getByRole('button', { name: 'Play now' }).click();
        
        try {
                await page.waitForLoadState('networkidle', { timeout: 40000 });
              } catch {
                console.warn('Network idle is not found after 40 сек, continue...');
              }
                await delay10Seconds();

     //   await page.locator('iframe[title="Real game"]').contentFrame().locator('canvas').click({
            //      position: {
             //       x: 595,
         //           y: 559
                  }
         //       });

 
      //  await delay5Seconds();

        // второй скриншот
       let screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_${id}_after_wait`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });

        await delay5Seconds();
    }


test('@ClickOnAdditionalStep Slotmill', async ({ context }) => {
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const gamePage = new GamePage(page);

    // autorization
  await page.goto('https://luckystake.com/');
  
  await page.getByTestId('login-header').click();
  await page.getByTestId('email-input-login').click();
  await page.getByTestId('email-input-login').fill('wiztest+80001@gmail.com');
  await page.getByTestId('password-input-login').click();
  await page.getByTestId('password-input-login').fill('Qwerty1!');
  await page.getByTestId('submit-button-login').click();

    await delay5Seconds();

  await page.goto('https://luckystake.com/');
       const scImage = page.getByRole('img', { name: 'SC', exact: true });
        if (await scImage.isVisible()) {
          await scImage.scrollIntoViewIfNeeded();
          await scImage.click({ force: true });
          console.log('Клик по SC');
        }
      
    await delay5Seconds();
      
        await delay5Seconds();
    // launching the games
    await playGames(page);
}); 


// await page.locator('iframe[title="Real game"]').contentFrame().locator('canvas').click({
//     position: {
//       x: 611,
//       y: 603
//     }
//   });


//   await page.locator('iframe[title="Real game"]').contentFrame().locator('canvas').click({
//     position: {
//       x: 618,
//       y: 449
//     }
//   });
