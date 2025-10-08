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
        "3759",
        "3741",
        "3744",
        "3750",
        "3729",
        "27037",
        "23888",
        "23887",
        "3786",
        "3722",
        "3757",
        "3721",
        "3761",
        "3794",
        "3789",
        "3753",
        "3788",
        "3767",
        "3743",
        "3739",
        "3756",
        "3764",
        "3738",
        "3752",
        "3803",
        "3804",
        "3801",
        "3805",
        "3802",
        "3800",
        "3730",
        "3737",
        "24166",
        "3787",
        "3795",
        "3791",
        "3776",
        "3781",
        "27727",
        "3770",
        "27867",
        "13533",
        "28651",
        "13531",
        "27868",
        "3777",
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
        "3758",
        "3720",
        "3783",
        "3726",
        "3775",
        "3785",
        "3796",
        "3778",
        "22773",
        "3735",
        "3765",
        "23276",
        "3774",
        "3734",
        "3762",
        "3772",
        "3797",
        "3763",
        "13527",
        "22548",
        "14875",
        "3747",
        "27033",
        "33173",
        "24030",
        "23988",
        "23277",
        "3749",
        "3782",
        "3779",
        "3732",
        "3719",
        "3771",
        "3768",
        "21433",
        "3718",
        "23232",
        "25110",
        "3740",
        "25333",
        "3746",
        "25506",
        "3784",
        "3793",
        "25541",
        "3731",
        "25581",
        "3760",
        "3754",
        "13530",
        "13529",
        "13536",
        "13534",
        "13537",
        "3727",
        "3751",
        "22346",
        "22167",
        "3725",
        "21434",
        "21354",
        "21352",
        "3769",
        "3736",
        "3780",
        "3717",
        "3773",
        "3728",
        "3766",
        "3745",
        "3733",
        "3755",
        "3724",
        "26403"
];


// function
async function playGames(page: Page) {
  for (const id of gameIds) {
    const gameUrl = `https://luckystake.dev/game/real/${id}`;
    await page.goto(gameUrl);
    await delay5Seconds();

    // screenshot before Play now button
    let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_before_playNow`, {
      body: screenshot,
      contentType: 'image/png',
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
      contentType: 'image/png',
    });

    // проверяем кнопку "Explore games"
    const exploreButton = page.getByRole('button', { name: 'Explore games' });
    if (await exploreButton.isVisible({ timeout: 5000 })) {
      await exploreButton.click();
      await delay5Seconds();
    } else {
      console.log(`Explore games button for game ${id} not found, continuing...`);
    }

    // Click on empty button 
    const searchButton = page.getByRole('button').filter({ hasText: /^$/ });
    if (await searchButton.first().isVisible({ timeout: 3000 })) {
      await searchButton.first().click();
      await delay5Seconds();

      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`game_${id}_after_search_button`, {
        body: screenshot,
        contentType: 'image/png',
      });

      if (await searchButton.nth(1).isVisible({ timeout: 3000 })) {
        await searchButton.nth(1).click();
      }
    }

    // Проверяем buy button
    const buyButton = page.getByRole('button', { name: 'buy' });
    await delay5Seconds();

    if (await buyButton.isVisible({ timeout: 10000 })) {
      await buyButton.click();
      await delay5Seconds();

      // Screenshot after clicking buy button
      screenshot = await page.screenshot();
      test.info().attach(`game_${id}_buy_button`, {
        body: screenshot,
        contentType: 'image/png',
      });

      // массив цен
      const prices = ["$1.99", "$4.99", "$9.99", "$24.99", "$34.99"];
      const randomPrice = prices[Math.floor(Math.random() * prices.length)];

      const priceButton = page.getByRole('button', { name: randomPrice });
      if (await priceButton.isVisible({ timeout: 7000 })) {
        console.log(`Click on price button: ${randomPrice}`);
        await priceButton.click();
        
        await delay10Seconds();

        screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`game_${id}_after_clicking_on_random_price`, {
        body: screenshot,
        contentType: 'image/png',
      });

        const confirmButton = page.getByRole('button').nth(2);
        if (await confirmButton.isVisible({ timeout: 10000 })) {
          await confirmButton.click();
        } else {
          console.log(`Confirm button для ${randomPrice} не найден, пропускаем...`);
        }
      } else {
        console.log(`Кнопка с ценой ${randomPrice} не найдена, пробуем другой вариант...`);
      }

      const confirmButton = page.getByRole('button').nth(2);
      if (await confirmButton.isVisible({ timeout: 10000 })) {
        await confirmButton.click();
      } else {
        console.log(`Confirm button for game ${id} is not available, skipping...`);
      }
    }

    // click on Back button
    const backButton = page.getByTestId('ArrowBackIosIcon');
    if (await backButton.isVisible({ timeout: 10000 })) {
      await backButton.click();
    }

    await delay5Seconds();

    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_after_clicking_Back`, {
      body: screenshot,
      contentType: 'image/png',
    });
  }
};
  


test('@providersDev Platipus', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const gamePage = new GamePage(page);

  await page.goto('https://luckystake.dev/');
  await homePage.closePopupIfVisible();
  await loginPage.openLoginForm();
  await loginPage.login('dksld1@gmail.com', 'Qwerty1!!');
  await page.getByText('Social Games').click();
  await page.getByRole('link', { name: 'Providers' }).click();
  await page.getByRole('link', { name: 'Platipus' }).click();
  await delay5Seconds();

  // launching the games
  await playGames(page);
});
