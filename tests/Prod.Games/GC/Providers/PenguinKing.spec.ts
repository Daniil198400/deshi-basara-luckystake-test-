import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { GamePage } from '../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';

// array of IDs
const gameIds = [
        "29272",
        "29273",
        "40481",
        "40482",
        "29177",
        "29178",
        "29179",
        "29180",
        "29181",
        "29182",
        "29183",
        "29184",
        "29185",
        "29186",
        "29187",
        "29188",
        "29189",
        "29190",
        "29191",
        "29192",
        "29193",
        "29195",
        "29197",
        "29198",
        "29199",
        "29200",
        "29201",
        "29202",
        "29203",
        "29204",
        "29205",
        "29206",
        "29207",
        "29208",
        "29209",
        "29210",
        "29211",
        "29212",
        "29213",
        "29214",
        "29215",
        "29216",
        "29217",
        "29218",
        "29219",
        "29220",
        "29221",
        "29222",
        "29223",
        "29224",
        "29225",
        "29226",
        "29227",
        "29228",
        "29229",
        "29230",
        "29231",
        "29232",
        "29233",
        "29234",
        "29235",
        "29237",
        "29238",
        "29239",
        "29240",
        "29241",
        "29242",
        "29243",
        "29244",
        "29245",
        "29246",
        "29247",
        "29248",
        "29249",
        "29250",
        "29251",
        "29252",
        "29253",
        "29254",
        "29255",
        "29256",
        "29257",
        "29259",
        "29260",
        "29261",
        "29262",
        "29263",
        "29264",
        "29265",
        "29266",
        "29267",
        "29268",
        "29269",
        "29270",
        "29271"
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
      await page.waitForLoadState('networkidle', { timeout: 50000 });
    } catch {
      console.warn(' Network idle is not found after 50 сек, continue...');
    }
        await delay5Seconds();

        
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

test('ClickOnAdditionalStep (AVAILABLE ONLY IN CHROME) Penguin King', async ({ page }) => {

    // autorization
  await page.goto('https://luckystake.com/');
  
  await page.getByTestId('login-header').click();
  await page.getByTestId('email-input-login').click();
  await page.getByTestId('email-input-login').fill('wiztest+80001@gmail.com');
  await page.getByTestId('password-input-login').click();
  await page.getByTestId('password-input-login').fill('Qwerty1!');
  await page.getByTestId('submit-button-login').click();

await delay5Seconds();
  await page.goto('https://luckystake.com/');

       const scImage = page.getByRole('img', { name: 'SC', exact: true });
        if (await scImage.isVisible()) {
          await scImage.scrollIntoViewIfNeeded();
          await scImage.click({ force: true });
          console.log('Клик по SC');
        }
      
        await delay5Seconds();
    // launching the games
    await playGames(page);
}); 
