import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { GamePage } from '../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';

// Массив айдишников игр
const gameIds = [
         "3771",
        "3763",
        "13527",
        "22548",
        "14875",
        "3765",
        "13529",
        "3770",
        "3781",
        "3776",
        "3787",
        "3737",
        "3752",
        "3729",
        "3744",
        "13530",
        "3741",
        "3724",
        "3774",
        "3762",
        "3772",
        "3768",
        "35547",
        "35549",
        "21434",
        "22167",
        "3755",
        "3746",
        "3731",
        "3760",
        "3727",
        "3751",
        "3750",
        "3730",
        "3797",
        "3786",
        "3722",
        "13534",
        "3757",
        "3794",
        "3721",
        "3761",
        "3789",
        "3753",
        "3788",
        "3767",
        "3743",
        "3739",
        "3756",
        "3764",
        "3738",
        "3795",
        "3791",
        "3754",
        "3784",
        "3793",
        "3720",
        "3783",
        "3726",
        "3775",
        "3785",
        "3796",
        "22773",
        "23276",
        "35674",
        "3733",
        "3735",
        "3778",
        "3758",
        "3777",
        "22346",
        "35676",
        "35675",
        "13537",
        "13533",
        "13531",
        "13528",
        "13538",
        "13526",
        "13535",
        "13532",
        "3748",
        "3723",
        "3790",
        "3792",
        "3742",
        "3734",
        "3747",
        "3749",
        "3782",
        "3779",
        "3732",
        "3719",
        "3759",
        "3718",
        "3740",
        "3725",
        "3769",
        "3736",
        "3780",
        "3717",
        "3773",
        "3728",
        "3766",
        "23887",
        "3745",
        "24166",
        "13536"
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

test('@providers Platipus', async ({ context }) => {
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
    await page.getByRole('link', { name: 'Platipus' }).click();
    await delay5Seconds();

    // launching the games
    await playGames(page);
}); 