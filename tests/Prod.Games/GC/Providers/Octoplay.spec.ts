import { test, expect } from '@playwright/test';
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
async function playGames(page) {
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
        await delay10Seconds();
        await delay10Seconds();
        await delay10Seconds();

        // второй скриншот
        screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_${id}_after_wait`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });

        // проверяем кнопку "Explore games"
        const exploreButton = page.getByRole('button', { name: 'Explore games' });
        if (await exploreButton.isVisible({ timeout: 5000 })) {
            await exploreButton.click();
            await delay5Seconds();
        } else {
            console.log(`Explore games button for game ${id} not found, continuing...`);
        }

        // Click on buy button
        const buyButton = page.getByRole('button', { name: 'buy' });
        await delay5Seconds();

        if (await buyButton.isVisible({ timeout: 1000 })) {
            await buyButton.click();
            await delay5Seconds();

            // Screenshot after clicking buy button
            screenshot = await page.screenshot();
            test.info().attach(`game_${id}_buy_button`, { 
                body: screenshot, 
                contentType: 'image/png' 
            });

            const priceButton = page.getByRole('button', { name: '$19.99' });
            if (await priceButton.isVisible({ timeout: 3000 })) {
                await priceButton.click();
                await delay10Seconds();

                const confirmButton = page.getByRole('button').nth(2);
                if (await confirmButton.isVisible({ timeout: 3000 })) {
                    await confirmButton.click();
                } else {
                    console.log(`Confirm button for game ${id} is not available, skipping...`);
                }
            }
        }

        // click on Back button
        const backButton = page.getByTestId('ArrowBackIosIcon');
        if (await backButton.isVisible({ timeout: 3000 })) {
            await backButton.click();
        }

        await delay5Seconds();
    }
}

test('@providers Octoplay', async ({ context }) => {
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const gamePage = new GamePage(page);

    // autorization
    await page.goto('https://luckystake.com/');
    await homePage.closePopupIfVisible();
    await loginPage.openLoginForm();
    await loginPage.login('wiztest+70001@gmail.com', 'Qwerty1!');
    await page.getByText('Social Games').click();
    await page.getByRole('link', { name: 'Providers' }).click();
    await page.getByRole('link', { name: 'Octoplay' }).click();
    await delay5Seconds();

    // launching the games
    await playGames(page);
}); 
