import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { GamePage } from '../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';

// Array of IDs
const gameIds = [
        "35816",
        "35818",
        "35819",
        "35820",
        "35821",
        "35822",
        "35823",
        "35824",
        "35825",
        "35826",
        "35827",
        "35828",
        "35829",
        "38805",
        "35798",
        "35799",
        "35800",
        "35801",
        "35802",
        "35803",
        "35804",
        "35806",
        "35807",
        "35808",
        "35809",
        "35810",
        "35811",
        "35812",
        "35813",
        "35814",
        "35815",
        "35817",
        "35786",
        "35787",
        "35788",
        "35789",
        "35790",
        "35791",
        "35792",
        "35793",
        "35794",
        "35795",
        "35796",
        "35797"
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
                await page.waitForLoadState('networkidle', { timeout: 50000 });
              } catch {
                console.warn('⏱️ Network idle is not found after 50 сек, continue...');
              }
                await delay10Seconds();

        await page.locator('iframe[title="Real game"]').contentFrame().locator('canvas').click({
                  position: {
                    x: 595,
                    y: 559
                  }
                });

 
        await delay5Seconds();

        // второй скриншот
        screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_${id}_after_wait`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });

        await delay5Seconds();
    }
}

test('@ClickOnAdditionalStep Slotmill', async ({ context }) => {
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
       const scImage = page.getByRole('img', { name: 'GC', exact: true });
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
