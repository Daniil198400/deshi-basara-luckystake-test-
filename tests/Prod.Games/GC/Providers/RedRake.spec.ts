import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { GamePage } from '../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';

// Массив айдишников игр
const gameIds = [
        "32921",
        "32922",
        "32923",
        "32927",
        "32928",
        "32929",
        "32930",
        "32931",
        "32932",
        "32933",
        "32934",
        "35542",
        "35541",
        "35203",
        "24087",
        "24089",
        "24084",
        "21849",
        "38809",
        "24090",
        "24092",
        "24094",
        "24088",
        "38802",
        "38801",
        "24086",
        "24098",
        "24099",
        "24165",
        "32891",
        "32892",
        "23231",
        "32893",
        "32894",
        "32895",
        "32896",
        "32897",
        "32898",
        "32899",
        "32900",
        "32901",
        "32902",
        "32903",
        "32904",
        "32905",
        "32906",
        "32907",
        "32909",
        "32910",
        "32912",
        "32913",
        "32914",
        "32915",
        "32918",
        "32919",
        "32920"
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

test('@providers Redrake', async ({ context }) => {
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
    await page.getByRole('link', { name: 'Redrake' }).click();
    await delay5Seconds();

    // launching the games
    await playGames(page);
}); 
