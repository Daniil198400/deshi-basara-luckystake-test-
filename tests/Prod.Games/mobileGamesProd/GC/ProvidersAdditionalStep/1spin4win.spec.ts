import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../../pages/LoginPage';
import { HomePage } from '../../../../../pages/HomePage';
import { GamePage } from '../../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../../utils/utils';

// Массив айдишников игр
const gameIds = [
        "38804",
        "38797",
        "32643",
        "32632",
        "32588",
        "40823",
        "38812",
        "38813",
        "38808",
        "40472",
        "38806",
        "38811"
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

        // waiting
        try {
        await page.waitForLoadState('networkidle', { timeout: 25000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 30 сек, continue...');
      }
        await delay5Seconds();
        
        await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas').click({
    position: {
      x: 203,
      y: 198
    }
  });
await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas').click({
    position: {
      x: 199,
      y: 206
    }
  });
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas').click({
    position: {
      x: 205,
      y: 208
    }
  });


  await delay5Seconds();
  
        // second screenshot
        screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_${id}_after_wait`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });
    }
}

test('@ClickOnAdditionalStepMobile 1spin4win', async ({ context }) => {
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const gamePage = new GamePage(page);

    // autorization
    await page.goto('https://luckystake.com/');
    await homePage.closePopupIfVisible();
    await loginPage.openLoginForm();
    await loginPage.login('wiztest+70001@gmail.com', 'Qwerty1!');
    await delay10Seconds();
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
    // launching the games
    await playGames(page);
}); 