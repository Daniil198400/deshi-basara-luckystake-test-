import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../../../pages/LoginPage';
import { HomePage } from '../../../../../pages/HomePage';
import { GamePage } from '../../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../../utils/utils';


test('@ClickOnAdditionalStep Novomatic', async ({ context }) => {
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

    //23913
        await page.goto('https://luckystake.com/game/real/23913');
        // screenshot before Play now button
        let screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_23913_before_playnow`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });

    // click on Play now
        await page.getByRole('button', { name: 'Play now' }).click();
       
        try {
      await page.waitForLoadState('networkidle', { timeout: 50000 });
    } catch {
      console.warn('⏱️ Network idle is not found after 30 сек, continue...');
    }
        await delay5Seconds();

const frame = await page.frameLocator('iframe[title="Real game"]');
await frame.locator('#canvas1').click({
  position: { x: 395, y: 513 },
  force: true
});


            await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_23913_after_wait`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });


    //35552
await page.goto('https://luckystake.com/game/real/35552');
        // screenshot before Play now button
        screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_35552_before_playnow`, { 
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
        await delay10Seconds();


        await page.locator('iframe[title="Real game"]').contentFrame().getByText('CONTINUE').click();

        await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_35552_after_wait`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });

          await delay5Seconds();

//38798
await page.goto('https://luckystake.com/game/real/38798');
        // screenshot before Play now button
        screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_38798_before_playnow`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });

    // click on Play now
        await page.getByRole('button', { name: 'Play now' }).click();
       
        try {
      await page.waitForLoadState('networkidle', { timeout: 50000 });
    } catch {
      console.warn('⏱️ Network idle is not found after 30 сек, continue...');
    }
        await delay5Seconds();

        await page.locator('iframe[title="Real game"]').contentFrame().getByText('CONTINUE').click();

await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_38798_after_wait`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });

          await delay5Seconds();



//40479
await page.goto('https://luckystake.com/game/real/40479');
        // screenshot before Play now button
        screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_40479_before_playnow`, { 
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
        await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().getByText('CONTINUE').click();

          await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_40479_after_wait`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });

                  await delay5Seconds();

//23978
await page.goto('https://luckystake.com/game/real/23978');
        // screenshot before Play now button
        screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_23978_before_playnow`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });

    // click on Play now
        await page.getByRole('button', { name: 'Play now' }).click();
       
        try {
      await page.waitForLoadState('networkidle', { timeout: 50000 });
    } catch {
      console.warn('Network idle is not found after 50 сек, continue...');
    }
        await delay5Seconds();

await frame.locator('#canvas1').click({
  position: { x: 395, y: 513 },
  force: true
});

            await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_23978_after_wait`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });

     await delay5Seconds();    

//23969
await page.goto('https://luckystake.com/game/real/23969');
        // screenshot before Play now button
        screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_23969_before_playnow`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });

    // click on Play now
        await page.getByRole('button', { name: 'Play now' }).click();
       
        try {
      await page.waitForLoadState('networkidle', { timeout: 50000 });
    } catch {
      console.warn('⏱️ Network idle is not found after 30 сек, continue...');
    }
        await delay5Seconds();
    

   await frame.locator('#canvas1').click({
  position: { x: 395, y: 508 },
  force: true
});

          await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_23969_after_wait`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });

          await delay5Seconds();



  //23906
  await page.goto('https://luckystake.com/game/real/23906');
        // screenshot before Play now button
        screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_23906_before_playnow`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });

    // click on Play now
        await page.getByRole('button', { name: 'Play now' }).click();
       
        try {
      await page.waitForLoadState('networkidle', { timeout: 50000 });
    } catch {
      console.warn('⏱️ Network idle is not found after 30 сек, continue...');
    }
        await delay5Seconds();
   
   
   
   await frame.locator('#canvas1').click({
  position: { x: 405, y: 517 },
  force: true
});

  await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_23906_after_wait`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });
  
   await delay5Seconds();

}); 

