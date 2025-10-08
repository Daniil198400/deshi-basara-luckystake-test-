import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { GamePage } from '../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';

// array of IDs
const gameIds = [
        "32510",
        "40476",
        "32479",
        "32482",
        "32476",
        "32483",
        "32493",
        "32494",
        "35554",
        "32495",
        "32499",
        "32500",
        "32502",
        "32504",
        "32505",
        "32509"
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
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('⏱️ Network idle is not found after 30 сек, continue...');
    }
    await delay5Seconds
    
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button').nth(3).click();
  
       await delay5Seconds();

        // второй скриншот
        screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_${id}_after_wait`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });

    }
}

test('@ClickOnAdditionalStep Gamzix', async ({ context }) => {
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

    // launching the games
    await playGames(page);
}); 

