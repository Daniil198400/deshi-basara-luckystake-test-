import { test as base, expect } from '@playwright/test';
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
        "24084",
        "10601",
        "10699",
        "10590",
        "10697",
        "10585",
        "10581",
        "10580",
        "10700",
        "10600",
        "10584",
        "10591",
        "10588",
        "10596",
        "10586",
        "10702",
        "10592",
        "10595",
        "10587",
        "10582",
        "10613",
        "10622",
        "10612",
        "10614",
        "10611",
        "10604",
        "10608",
        "10624",
        "10629",
        "10610",
        "10646",
        "10642",
        "10635",
        "10638",
        "10643",
        "10579",
        "10605",
        "32934",
        "32933",
        "32932",
        "32931",
        "32930",
        "32929",
        "32928",
        "32927",
        "32923",
        "32922",
        "32921",
        "32920",
        "32919",
        "32918",
        "32915",
        "32914",
        "32913",
        "32912",
        "32910",
        "32909",
        "32907",
        "32906",
        "32905",
        "32904",
        "32903",
        "32902",
        "32901",
        "32900",
        "32899",
        "32898",
        "32897",
        "32896",
        "21849",
        "32895",
        "32894",
        "32893",
        "23231",
        "32892",
        "32891",
        "24165",
        "24099",
        "24098",
        "24096",
        "24095",
        "24094",
        "24092",
        "24091",
        "24090",
        "24089",
        "24088",
        "24087",
        "24086",
        "24085"
];


// function
async function playGames(page) {
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
  


test('@providersDev RedRake', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const gamePage = new GamePage(page);

  await page.goto('https://luckystake.dev/');
  await homePage.closePopupIfVisible();
  await loginPage.openLoginForm();
  await loginPage.login('dksld1@gmail.com', 'Qwerty1!!');
  await page.getByText('Social Games').click();
  await page.getByRole('link', { name: 'Providers' }).click();
  await page.getByRole('link', { name: 'RedRake' }).click();
  await delay5Seconds();

  // launching the games
  await playGames(page);
});
