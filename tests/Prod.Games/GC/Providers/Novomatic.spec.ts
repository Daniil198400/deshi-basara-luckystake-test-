import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { GamePage } from '../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';


test('@ClickOnAdditionalStep Novomatic', async ({ context }) => {
    const page = await context.newPage();

     /**
 * Clicks the "close" button if it exists on the page.
 * @param {import('@playwright/test').Page} page - The Playwright page object.
 */
async function clickCloseIfPresent(page: Page) {
  const closeButton = page.getByRole('img', { name: 'close' });
  if (await closeButton.count() > 0) {
    await closeButton.first().click();
    console.log('Close button clicked');
  } else {
    console.log('Close button not found, skipping click');
  }
}

    // autorization
    await page.goto('https://luckystake.com/');

    await page.getByTestId('login-header').click();
    await page.getByTestId('email-input-login').click();

    await page.getByTestId('email-input-login').fill('wiztest+70001@gmail.com');
    await page.getByTestId('password-input-login').click();
    await page.getByTestId('password-input-login').fill('Qwerty1!');
    await page.getByTestId('submit-button-login').click();
    await delay5Seconds();

await clickCloseIfPresent(page);

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
      console.warn('Network idle is not found after 30 сек, continue...');
    }
        await delay5Seconds();
    await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas1').click({
    position: {
      x: 1134,
      y: 624
    }
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
      console.warn('Network idle is not found after 50 сек, continue...');
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
      console.warn('Network idle is not found after 30 сек, continue...');
    }
        await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().getByText('CONTINUE').click();
          await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_38798_after_wait`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });










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
      console.warn('Network idle is not found after 30 сек, continue...');
    }
        await delay5Seconds();
    await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas1').click({
    position: {
      x: 1156,
      y: 624
    }
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
      console.warn('Network idle is not found after 30 сек, continue...');
    }
        await delay5Seconds();
    await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas1').click({
    position: {
      x: 1070,
      y: 610
    }
  });

          await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_23969_after_wait`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });






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
      console.warn('Network idle is not found after 30 сек, continue...');
    }
        await delay5Seconds();
    await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas1').click({
    position: {
      x: 1144,
      y: 621
    }
  });

  await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_23906_after_wait`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });
  
   await delay5Seconds();

}); 

