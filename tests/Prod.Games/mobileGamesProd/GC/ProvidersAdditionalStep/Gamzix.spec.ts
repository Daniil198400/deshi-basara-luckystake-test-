import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../../pages/LoginPage';
import { HomePage } from '../../../../../pages/HomePage';
import { GamePage } from '../../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../../utils/utils';

// array of IDs
const gameIds = [
        "40476",
        "32479",
        "32476",
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

        try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('⏱️ Network idle is not found after 30 сек, continue...');
    }
    await delay5Seconds
    
    
    await page.locator('iframe[title="Real game"]').contentFrame().locator('canvas').click({
      position: {
        x: 199,
        y: 589
      }
    });


    await page.locator('iframe[title="Real game"]').contentFrame().locator('canvas').click({
      position: {
        x: 204,
        y: 443
      }
    });

    await page.locator('iframe[title="Real game"]').contentFrame().locator('canvas').click({
      position: {
        x: 198,
        y: 605
      }
    });

// await page.locator('iframe[src="https://cdn-v2.fmk0.com/only-coins/v1.0.19/?gid=2011&host=play-game-service.fmk0.com&port=443&client=desktop&lang=en&home=https%3A%2F%2Fluckystake.com&sid=97b43870-aad2-11f0-abf3-fd736ad16f32&wss=1&assets=cdn-v2.fmk0.com&debug=false&promoVersion=v3.2.29&cid=0"]').contentFrame().locator('canvas').click({
//           position: {
//             x: 642,
//             y: 519
//           }
//         });

       await delay5Seconds();

        // второй скриншот
        screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_${id}_after_wait`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });

    }
}

test('@ClickOnAdditionalStepMobile Gamzix', async ({ context }) => {
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const gamePage = new GamePage(page);

    // autorization
    await page.goto('https://luckystake.com/');
    await homePage.closePopupIfVisible();
    await loginPage.openLoginForm();
    await loginPage.login('wiztest+70001@gmail.com', 'Qwerty1!');
    
    await delay5Seconds();

const closeBtn = page.locator('.WizIconButton_base__JfGpY.WizPopupWrapper_close__hKtRn');
if (await closeBtn.isVisible()) {
  await closeBtn.click();
}
    await delay5Seconds();
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

