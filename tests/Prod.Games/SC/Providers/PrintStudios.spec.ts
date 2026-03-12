import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { GamePage } from '../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';

// array of IDs
const gameIds = [
        "28526",
        "28521",
        "28514",
        "28512",
        "28528",
        "28522",
        "28516",
        "28520",
        "28531",
        "28529",
        "28517",
        "28519",
        "28527",
        // "40487",
        "28523",
        "28530"
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
        await delay5Seconds();

        // waiting
        try {
      await page.waitForLoadState('networkidle', { timeout: 45000 });
    } catch {
      console.warn('⏱️ Network idle is not found after 30 сек, continue...');
    }
        await delay10Seconds();

        await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('#renderer-canvas').click({
          position: {
            x: 563,
            y: 586
          }
        });
        
        await delay5Seconds();

        await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('#renderer-canvas').click({
          position: {
            x: 563,
            y: 586
          }
        });

        // second screenshot
        screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_${id}_after_wait`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });


        await delay5Seconds();
    }
}

test('@ClickOnAdditionalStep Print Studios', async ({ context }) => {
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const gamePage = new GamePage(page);

await page.goto('https://luckystake.com/');

await page.getByTestId('login-header').click();
await page.getByTestId('email-input-login').click();
await page.getByTestId('email-input-login').fill('dksld1@gmail.com');
await page.getByTestId('password-input-login').click();
await page.getByTestId('password-input-login').fill('Qwerty1!');
await page.getByTestId('submit-button-login').click();
await delay5Seconds();

const closeBtn = page.locator('.WizIconButton_base__JfGpY.WizPopupWrapper_close__hKtRn');
if (await closeBtn.isVisible()) {
  await closeBtn.click();
}
    await delay5Seconds();
       const scImage = page.getByRole('img', { name: 'GC', exact: true });
        if (await scImage.isVisible()) {
          await scImage.scrollIntoViewIfNeeded();
          await scImage.click({ force: true });
          console.log('Клик по SC');
        }
      
    await delay5Seconds();

    // launching the games
    await playGames(page);
}); 

// await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('#renderer-canvas').click({
//     position: {
//       x: 623,
//       y: 581
//     }
//   });

