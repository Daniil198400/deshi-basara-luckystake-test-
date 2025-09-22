import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { GamePage } from '../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';

// Массив айдишников игр
const gameIds = [
     "24245",
        "40491",
        "40492",
        "40493",
        "24171",
        "24168",
        "24170",
        "24172",
        "24173",
        "24174",
        "24175",
        "24176",
        "24177",
        "24178",
        "24179",
        "24181",
        "24182",
        "24183",
        "24184",
        "24185",
        "24186",
        "24187",
        "24188",
        "24189",
        "24190",
        "24191",
        "24192",
        "24193",
        "24195",
        "24196",
        "24197",
        "24198",
        "24200",
        "24201",
        "24202",
        "24203",
        "24205",
        "24207",
        "24208",
        "24212",
        "24214",
        "24215",
        "24216",
        "24217",
        "24219",
        "24220",
        "24221",
        "24222",
        "24223",
        "24224",
        "24225",
        "24226",
        "24229",
        "24230",
        "24231",
        "24232",
        "24233",
        "24234",
        "24235",
        "24236",
        "24237",
        "24238",
        "24239",
        "24240",
        "24241",
        "24242",
        "24243",
        "24244",
        "24246",
        "24247",
        "24248",
        "24249",
        "24250",
        "24251",
        "24253",
        "24267",
        "24333",
        "24337",
        "24194",
        "24227",
        "24228",
        "24427",
        "26213",
        "34489",
        "34490",
        "34491",
        "34492",
        "34493",
        "34494",
        "34495",
        "34496",
        "34497",
        "34498",
        "34499",
        "34500",
        "34501",
        "34502",
        "34503",
        "34504",
        "34505",
        "34506",
        "34507",
        "34508",
        "34509",
        "34510",
        "34511",
        "34512",
        "34513",
        "34514",
        "34515",
        "34517",
        "34518",
        "34519",
        "24431",
        "34331",
        "35555",
        "34484",
        "38810",
        "38815"
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

test('@providers Rubyplay', async ({ context }) => {
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
    await page.getByRole('link', { name: 'Rubyplay' }).click();
    await delay5Seconds();

    // launching the games
    await playGames(page);
}); 
