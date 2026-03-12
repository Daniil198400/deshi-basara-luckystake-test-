import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { GamePage } from '../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';

// Массив айдишников игр
const gameIds = [
        "24088",
        "24099",
        "24165",
        "32892",
        "23231",
        "32893",
        "32894",
        "32895",
        "32896",
        "32897",
        "32898",
        "44801",
        "44270",
        "32899",
        "32900",
        "32901",
        "32902",
        "45937",
        "32903",
        "32904",
        "32905",
        "32906",
        "45938",
        "24086",
        "44811",
        "38802",
        "32923",
        "32918",
        "32891",
        "24084",
        "24087",
        "32907",
        "46158",
        "32909",
        "32934",
        "32933",
        "32932",
        "32931",
        "32930",
        "32929",
        "32928",
        "32927",
        "32922",
        "32921",
        "32920",
        "32919",
        "32915",
        "32914",
        "32913",
        "32912",
        "32910",
        "24098",
        "21849",
        "40842",
        "40827",
        "38809",
        "38801",
        "35542",
        "35541",
        "35203",
        "24089",
        "24090",
        "24092",
        "44807",
        "24094"
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
        await delay5Seconds();

        // waiting
        try {
      await page.waitForLoadState('networkidle', { timeout: 20000 });
    } catch {
      console.warn('Network idle is not found after 50 сек, continue...');
    }
        await delay10Seconds();



        // второй скриншот
        screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_${id}_after_wait`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });


        await delay5Seconds();
    }
}

test('Redrake (Additional step is not needed)', async ({ context }) => {
    const page = await context.newPage();


    // autorization

await page.goto('https://luckystake.com/');

await page.getByTestId('login-header').click();
await page.getByTestId('email-input-login').click();
await page.getByTestId('email-input-login').fill('dksld1@gmail.com');
await page.getByTestId('password-input-login').click();
await page.getByTestId('password-input-login').fill('Qwerty1!');
await page.getByTestId('submit-button-login').click();
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
//     // launching the games
    await playGames(page);
}); 
