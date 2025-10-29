import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../../pages/LoginPage';
import { HomePage } from '../../../../../pages/HomePage';
import { GamePage } from '../../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../../utils/utils';



test('@ClickOnAdditionalStepMobile Max Win Gaming', async ({ context }) => {
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const gamePage = new GamePage(page);

  console.log('Launching Max Win Gaming');

  // Авторизация
  await page.goto('https://luckystake.com/');
  await homePage.closePopupIfVisible();
  await loginPage.openLoginForm();
  await loginPage.login('wiztest+70001@gmail.com', 'Qwerty1!');
  await delay5Seconds();

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


//28509

  await page.goto('https://luckystake.com/game/real/28509');

    // screenshot before Play now
    let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_28509_before_playnow`, {
      body: screenshot,
      contentType: 'image/png',
    });

    // Нажимаем Play now
    try {
      await page.getByRole('button', { name: 'Play now' }).click();
    } catch (err) {
      console.warn('⚠️ clicking on Play now is not succesful:', err);
    }

    try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('⏱️ Network idle is not reached after 30 sec, continuing...');
    }
    await delay10Seconds();
    await delay5Seconds();
    await delay10Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('#stageOverlay').click({
      position: {
        x: 187,
        y: 545
      }
    });

    await delay10Seconds();

    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_28509_after`, {
      body: screenshot,
      contentType: 'image/png',
    });

await delay5Seconds();




    //28508

  await page.goto('https://luckystake.com/game/real/28508');

    // screenshot before Play now
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_28508_before_playnow`, {
      body: screenshot,
      contentType: 'image/png',
    });

    // Нажимаем Play now
    try {
      await page.getByRole('button', { name: 'Play now' }).click();
    } catch (err) {
      console.warn('⚠️ clicking on Play now is not succesful:', err);
    }

    try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('⏱️ Network idle is not reached after 30 sec, continuing...');
    }
    await delay10Seconds();
    await delay5Seconds();
    await delay10Seconds();

    await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('#stageOverlay').click({
      position: {
        x: 192,
        y: 375
      }
    });

    await delay5Seconds();

    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_28508_after`, {
      body: screenshot,
      contentType: 'image/png',
    });

await delay5Seconds();

//28506

 await page.goto('https://luckystake.com/game/real/28506');

    // screenshot before Play now
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_28506_before_playnow`, {
      body: screenshot,
      contentType: 'image/png',
    });

    // Нажимаем Play now
    try {
      await page.getByRole('button', { name: 'Play now' }).click();
    } catch (err) {
      console.warn('⚠️ clicking on Play now is not succesful:', err);
    }

    try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('⏱️ Network idle is not reached after 30 sec, continuing...');
    }
    await delay10Seconds();
    await delay5Seconds();
    await delay10Seconds();


    await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('#stageOverlay').click({
      position: {
        x: 197,
        y: 453
      }
    });

        await delay5Seconds();

    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_28506_after_wait`, {
      body: screenshot,
      contentType: 'image/png',
    });

    await delay5Seconds();
});
