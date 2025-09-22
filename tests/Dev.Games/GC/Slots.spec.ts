import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { HomePage } from '../../../pages/HomePage';
import { GamePage } from '../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../utils/utils';

// Массив айдишников игр
const gameIds = [
        "29260",
        "3717",
        "3718",
        "3719",
        "3720",
        "3721",
        "3722",
        "3723",
        "3724",
        "3725",
        "3726",
        "3727",
        "3728",
        "3729",
        "3730",
        "3731",
        "3732",
        "3733",
        "3734",
        "3735",
        "3736",
        "3737",
        "3738",
        "3739",
        "3740",
        "3741",
        "3742",
        "3743",
        "3744",
        "3745",
        "3746",
        "3747",
        "3748",
        "3749",
        "3750",
        "3751",
        "3752",
        "3753",
        "3754",
        "3755",
        "3756",
        "3757",
        "3758",
        "3759",
        "3760",
        "3761",
        "3762",
        "3763",
        "3764",
        "3765",
        "3766",
        "3767",
        "3768",
        "3769",
        "3770",
        "3771",
        "3772",
        "3773",
        "3774",
        "3775",
        "3776",
        "3777",
        "3778",
        "3779",
        "3780",
        "3781",
        "3782",
        "3783",
        "3784",
        "3785",
        "3786",
        "3787",
        "3788",
        "3789",
        "3790",
        "3791",
        "3792",
        "3793",
        "3794",
        "3795",
        "3796",
        "3797",
        "10580",
        "10592",
        "10595",
        "10596",
        "10600",
        "10601",
        "10604",
        "10605",
        "10608",
        "10610",
        "10611",
        "10612",
        "10613",
        "10614",
        "10622",
        "10624",
        "10635",
        "10642",
        "13526",
        "13527",
        "13528",
        "13529",
        "13530",
        "13531",
        "13532",
        "13533",
        "13534",
        "13535",
        "13536",
        "13537",
        "13538",
        "14620",
        "14621",
        "14814",
        "14875",
        "21012",
        "21014",
        "21015",
        "21016",
        "21017",
        "21018",
        "21019",
        "21020",
        "21022",
        "21023",
        "21024",
        "21026",
        "21027",
        "21029",
        "21030",
        "21031",
        "21032",
        "21034",
        "21035",
        "21036",
        "21037",
        "21038",
        "21039",
        "21040",
        "21041",
        "21042",
        "21043",
        "21044",
        "21046",
        "21048",
        "21049",
        "21050",
        "21051",
        "21052",
        "21053",
        "21054",
        "21055",
        "21056",
        "21058",
        "21059",
        "21060",
        "21061",
        "21062",
        "21063",
        "21064",
        "21065",
        "21067",
        "21068",
        "21069",
        "21070",
        "21849",
        "22144",
        "22703",
        "22773",
        "23224",
        "23353",
        "23887",
        "23905",
        "23906",
        "23907",
        "23908",
        "23909",
        "23910",
        "23911",
        "23912",
        "23913",
        "23914",
        "23915",
        "23916",
        "23917",
        "23918",
        "23919",
        "23920",
        "23921",
        "23922",
        "23923",
        "23924",
        "23925",
        "23926",
        "23927",
        "23928",
        "23929",
        "23930",
        "23931",
        "23932",
        "23933",
        "23934",
        "23935",
        "23936",
        "23937",
        "23938",
        "23939",
        "23940",
        "23941",
        "23942",
        "23943",
        "23944",
        "23945",
        "23946",
        "23947",
        "23948",
        "23949",
        "23950",
        "23951",
        "23952",
        "23953",
        "23954",
        "23955",
        "23956",
        "23957",
        "23958",
        "23959",
        "23960",
        "23961",
        "23962",
        "23963",
        "23964",
        "23965",
        "23966",
        "23967",
        "23968",
        "23969",
        "23970",
        "23971",
        "23972",
        "23973",
        "23974",
        "23975",
        "23976",
        "23977",
        "23978",
        "24085",
        "24087",
        "24096",
        "24099",
        "24165",
        "24166",
        "24176",
        "25106",
        "25115",
        "25333",
        "25430",
        "25505",
        "25506",
        "25541",
        "25574",
        "25581",
        "26059",
        "26228",
        "26293",
        "26403",
        "27037",
        "27050",
        "27727",
        "27867",
        "27868",
        "28154",
        "28506",
        "28507",
        "28508",
        "28509",
        "28510",
        "28532",
        "28534",
        "28535",
        "28536",
        "28542",
        "28543",
        "28544",
        "28545",
        "28546",
        "28547",
        "28548",
        "28549",
        "28551",
        "28554",
        "28555",
        "28558",
        "28559",
        "28560",
        "28563",
        "28564",
        "28565",
        "28567",
        "28568",
        "28569",
        "28570",
        "28575",
        "28576",
        "28577",
        "28578",
        "28579",
        "28580",
        "28581",
        "28582",
        "28583",
        "28584",
        "28586",
        "28587",
        "28588",
        "28589",
        "28590",
        "28591",
        "28592",
        "28593",
        "28596",
        "28598",
        "28599",
        "28600",
        "28601",
        "28602",
        "28605",
        "28606",
        "28607",
        "28609",
        "28611",
        "28612",
        "28614",
        "28615",
        "28616",
        "28617",
        "28618",
        "28619",
        "28620",
        "28621",
        "28622",
        "28629",
        "28639",
        "28651",
        "28660",
        "28661",
        "32476",
        "32479",
        "32482",
        "32483",
        "32493",
        "32494",
        "32495",
        "32499",
        "32500",
        "32502",
        "32504",
        "32505",
        "32509",
        "32510",
        "32511",
        "32513",
        "32515",
        "32892",
        "32897",
        "32907",
        "32909",
        "32910",
        "32912",
        "32913",
        "32914",
        "32915",
        "32918",
        "32919",
        "32920",
        "32921",
        "32922",
        "32923",
        "32927",
        "32928",
        "32930",
        "32932"
];

// function
async function playGames(page) {
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

test('@Slots Slots', async ({ context }) => {
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const gamePage = new GamePage(page);

    // autorization
    await page.goto('https://luckystake.dev/');
    await homePage.closePopupIfVisible();
    await loginPage.openLoginForm();
    await loginPage.login('dksld@gmail.com', 'Qwerty1!!');
    await page.getByText('Social Games').click();
    await page.getByRole('link', { name: 'Slots' }).click();
    await delay5Seconds();

    // launching the games
    await playGames(page);
}); 
