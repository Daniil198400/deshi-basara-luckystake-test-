import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { GamePage } from '../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';


test('@ClickOnAdditionalStep Novomatic', async ({ context }) => {
      const page = await context.newPage();
      const loginPage = new LoginPage(page);
      const homePage = new HomePage(page);
      const gamePage = new GamePage(page);
    
      // helpful function
    async function clickCloseButtonIfExists(page: Page) {
      const selector = '.WizIconButton_base__JfGpY.WizPopupWrapper_close__hKtRn';
      try {
        const button = await page.waitForSelector(selector, { timeout: 10000 });
        await button.click();
        console.log('Кнопка закрытия найдена и нажата');
        await page.waitForTimeout(5000);
      } catch {
        console.log('Кнопка закрытия не найдена за 10 секунд');
      }
    }
    
    // вспомогательная функция — кликает по элементу, если он существует
    async function clickIfExists(page: Page, role: string, name: string) {
      const locator = page.getByRole(role as any, { name });
      if (await locator.count() > 0) {
        await locator.first().click();
        console.log(`Нажали на элемент с role=${role}, name=${name}`);
      } else {
        console.log(`Элемент с role=${role}, name=${name} не найден`);
      }
    }
    
      // авторизация
      await page.goto('https://luckystake.com/');
      await homePage.closePopupIfVisible();
      await loginPage.openLoginForm();
      await loginPage.login('wiztest+80001@gmail.com', 'Qwerty1!');
    
      await delay5Seconds();
    
      // если появится кнопка закрытия — нажать
      await clickCloseButtonIfExists(page);
    
      // подождать немного, потом попытаться нажать по картинке GC
      await delay5Seconds();
      await clickIfExists(page, 'img', 'GC');

await delay5Seconds(); 

    //23913 (Should be tested manually)
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
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('⏱️ Network idle is not found after 30 сек, continue...');
    }
        await delay5Seconds();
    
        // Надёжный клик по координатам внутри iframe
async function clickCanvasButtonStrong(page: Page) {
  const iframeLocator = page.frameLocator('iframe[title="Real game"]');
  const canvas = iframeLocator.locator('#canvas1');

  // Ждём появления iframe и canvas
  await page.waitForSelector('iframe[title="Real game"]', { timeout: 15000 });
  await canvas.waitFor({ state: 'visible', timeout: 10000 });

  // Кликаем по нужной позиции с force:true
  await canvas.click({
    position: { x: 1189, y: 616 },
    force: true,           // "сильный" клик — даже если Playwright считает, что элемент перекрыт
    timeout: 5000
  });

  console.log('✅ Сильный клик по canvas выполнен.');
}

await clickCanvasButtonStrong(page);



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
      await page.waitForLoadState('networkidle', { timeout: 35000 });
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
      await page.waitForLoadState('networkidle', { timeout: 35000 });
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
      await page.waitForLoadState('networkidle', { timeout: 35000 });
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
      await page.waitForLoadState('networkidle', { timeout: 35000 });
    } catch {
      console.warn('⏱️ Network idle is not found after 30 сек, continue...');
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
      await page.waitForLoadState('networkidle', { timeout: 35000 });
    } catch {
      console.warn('⏱️ Network idle is not found after 30 сек, continue...');
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
      await page.waitForLoadState('networkidle', { timeout: 35000 });
    } catch {
      console.warn('⏱️ Network idle is not found after 30 сек, continue...');
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
  
}); 