import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { GamePage } from '../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';

// Массив айдишников игр
const gameIds = [
        "23913",
        "23944",
        "23943",
        "23942",
        "23941",
        "23940",
        "23939",
        "23938",
        "23937",
        "23936",
        "23935",
        "23934",
        "23933",
        "23932",
        "23931",
        "23930",
        "23929",
        "23928",
        "35200",
        "35550",
        "35551",
        "35552",
        "38798",
        "40479",
        "38807",
        "29172",
        "27050",
        "28639",
        "28154",
        "27049",
        "26293",
        "26228",
        "26059",
        "25574",
        "25505",
        "25430",
        "25106",
        "23978",
        "23977",
        "23976",
        "23975",
        "23974",
        "23973",
        "23972",
        "23971",
        "23970",
        "23969",
        "23968",
        "23967",
        "23966",
        "23965",
        "23964",
        "23963",
        "23962",
        "23961",
        "23960",
        "23959",
        "23958",
        "23957",
        "23956",
        "23955",
        "23954",
        "23953",
        "23927",
        "23925",
        "23924",
        "23923",
        "23920",
        "23919",
        "23918",
        "23917",
        "23916",
        "23915",
        "23914",
        "23912",
        "23911",
        "23910",
        "23909",
        "23908",
        "23907",
        "23906",
        "23905",
        "23952",
        "23951",
        "23950",
        "23949",
        "23948",
        "23947",
        "23946",
        "23945"
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

test('@providers Novomatic', async ({ context }) => {
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
    await page.getByRole('link', { name: 'Novomatic' }).click();
    await delay5Seconds();

    // launching the games
    await playGames(page);
}); 
