import { test as base, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { GamePage } from '../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';

// расширяем test, добавляем httpCredentials
const test = base.extend<{}>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      httpCredentials: {
        username: 'luckystake',
        password: 'luckystake1!',
      },
    });
    await use(context);
    await context.close();
  },
});

// array of IDs
const gameIds = [
        "32667",
        "32666",
        "32676",
        "32665",
        "32663",
        "32661",
        "32660",
        "32659",
        "32658",
        "32657",
        "32656",
        "32655",
        "32687",
        "32686",
        "32685",
        "32671",
        "32672",
        "32684",
        "32683",
        "32650",
        "32651",
        "32652",
        "32681",
        "32680",
        "32678",
        "32670",
        "32668"
];

// function
async function playGames(page:Page) {
    for (const id of gameIds) {
        const gameUrl = `https://luckystake.dev/game/real/${id}`;
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
        await delay10Seconds();
        await delay10Seconds();
        await delay10Seconds();




screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_${id}_after_playnow`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });

        await delay5Seconds();
    }
}

test('DISABLED DevClickOnAdditionalStep  TurboGames', async ({ context }) => {
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const gamePage = new GamePage(page);

    // autorization
    await page.goto('https://luckystake.dev/');
    await homePage.closePopupIfVisible();
    await loginPage.openLoginForm();
    await loginPage.login('dksld1@gmail.com', 'Qwerty1!!');
    await page.getByText('Social Games').click();
    await page.getByRole('link', { name: 'Providers' }).click();
    await page.getByRole('link', { name: 'TurboGames' }).click();
    await delay5Seconds();

    // launching the games
    await playGames(page);
}); 
