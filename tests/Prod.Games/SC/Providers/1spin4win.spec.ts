import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { GamePage } from '../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';

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
        console.warn('⏱️ Network idle is not found after 25 сек, continue...');
      }
        await delay5Seconds();
        
// --- КЛИКИ ВНУТРИ IFRAME (исправлено: используем frameLocator + force: true) ---
  const frame = page.frameLocator('iframe[title="Real game"]');

  await frame.locator('#canvas').first().click({
    position: {
      x: 584,
      y: 616
    },
    force: true
  });

  await frame.locator('#canvas').first().click({
    position: {
      x: 580,
      y: 610
    },
    force: true
  });

  await frame.locator('#canvas').first().click({
    position: {
      x: 590,
      y: 600
    },
    force: true
  });
// --- конец правки ---

  await delay5Seconds();
  
        // second screenshot
        screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_${id}_after_wait`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });
    }
}

test('@ClickOnAdditionalStep 1spin4win', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const gamePage = new GamePage(page);

  // Авторизация
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
    // launching the games
    await playGames(page);
});


// await page.getByRole('img', { name: 'SC', exact: true }).click();
// await page.getByRole('img', { name: 'GC' }).click();
