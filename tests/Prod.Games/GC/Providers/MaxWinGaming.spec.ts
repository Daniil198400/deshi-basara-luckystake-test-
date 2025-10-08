import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { GamePage } from '../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';

// Массив айдишников игр
const gameIds = [
        "28509",
        "28508",
        "28506" 
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
      await page.waitForLoadState('networkidle', { timeout: 500000 });
    } catch {
      console.warn('⏱️ Network idle is not found after 30 сек, continue...');
    }
    await delay5Seconds
    
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('#stageOverlay').click({
    position: {
      x: 640,
      y: 545
    }
  });  
       await delay5Seconds();

        // второй скриншот
        screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_${id}_after_wait`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });

    }
}
       await delay5Seconds();




test('@ClickOnAdditionalStep Max Win Gaming', async ({ context }) => {
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
