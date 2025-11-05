import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../../pages/LoginPage';
import { HomePage } from '../../../../../pages/HomePage';
import { GamePage } from '../../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../../utils/utils';

// Массив ID игр
const gameIds = [
  "34255",
  "28501",
  "28503",
  "14621",
  "28502",
  "28504"
];

test('@ClickOnAdditionalStepMobile Four Leaf Gaming', async ({ context }) => {
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const gamePage = new GamePage(page);

  console.log('Four Leaf Gaming');

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
          console.log('click on SC');
        }

  await delay5Seconds();


let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`autorization`, { 
      body: screenshot, 
      contentType: 'image/png' 
    });

        await delay5Seconds();

    //34255
  await page.goto('https://luckystake.com/game/real/34255');
    await delay5Seconds();
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`34255 before play now`, { 
      body: screenshot, 
      contentType: 'image/png' 
    });
    await page.getByRole('button', { name: 'Play now' }).click();
    await delay10Seconds();
    await delay10Seconds();
    await delay10Seconds();

        await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'WILD MULTIPLIER FREE SPINS' }).click();
    
    await delay10Seconds();

            screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`34255 game_after_wait`, { 
      body: screenshot, 
      contentType: 'image/png' 
    });

    await delay5Seconds();

//28501
  await page.goto('https://luckystake.com/game/real/28501');
    await delay5Seconds();
        screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`28501 before play now`, { 
      body: screenshot, 
      contentType: 'image/png' 
    });
            await page.getByRole('button', { name: 'Play now' }).click();
    await delay10Seconds();
    await delay10Seconds();
    await delay10Seconds();

        await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'Land clovers to win up to 10,' }).click();
    
    await delay5Seconds();

            screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`28501 game_after_wait`, { 
      body: screenshot, 
      contentType: 'image/png' 
    });

        await delay5Seconds();

//28503
  await page.goto('https://luckystake.com/game/real/28503');
    await delay5Seconds();
        screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`28503 before play now`, { 
      body: screenshot, 
      contentType: 'image/png' 
    });
            await page.getByRole('button', { name: 'Play now' }).click();
    await delay10Seconds();
    await delay10Seconds();
    await delay10Seconds();

        await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'COLLECT BATTERIES TO ACTIVATE' }).click();
    await delay5Seconds();

            screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`28503 game_after_wait`, { 
      body: screenshot, 
      contentType: 'image/png' 
    });
        await delay5Seconds();


//14621
  await page.goto('https://luckystake.com/game/real/14621');
    await delay5Seconds();
        screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`14621 before play now`, { 
      body: screenshot, 
      contentType: 'image/png' 
    });
            await page.getByRole('button', { name: 'Play now' }).click();
    await delay10Seconds();
    await delay10Seconds();
    await delay10Seconds();

        await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button').nth(3).click();
    
    await delay5Seconds();

            screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`14621 game_after_wait`, { 
      body: screenshot, 
      contentType: 'image/png' 
    });

    await delay5Seconds();

//28502
  await page.goto('https://luckystake.com/game/real/28502');
    await delay5Seconds();
        screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`28502 before play now`, { 
      body: screenshot, 
      contentType: 'image/png' 
    });
    await page.getByRole('button', { name: 'Play now' }).click();
    await delay10Seconds();
    await delay10Seconds();
    await delay10Seconds();

        await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button').nth(3).click();
    await delay10Seconds();

            screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`28502 game_after_wait`, { 
      body: screenshot, 
      contentType: 'image/png' 
    });

    await delay5Seconds();

//28504
  await page.goto('https://luckystake.com/game/real/28504');
    await delay5Seconds();
        screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`28504 before play now`, { 
      body: screenshot, 
      contentType: 'image/png' 
    });
    await page.getByRole('button', { name: 'Play now' }).click();

    await delay10Seconds();
    await delay10Seconds();
    await delay10Seconds();


        await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'CLIMBING WILDS AVALANCHE' }).click();
    

    await delay5Seconds();

    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`28504 game_after_wait`, { 
      body: screenshot, 
      contentType: 'image/png' 
    });
  

await delay5Seconds();

});