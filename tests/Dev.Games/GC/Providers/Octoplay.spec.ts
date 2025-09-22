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
        "29255",
        "29254",
        "29253",
        "29252",
        "29251",
        "29249",
        "29248",
        "29247",
        "29246",
        "29245",
        "29244",
        "29243",
        "29242",
        "29241",
        "29240",
        "29239",
        "29238",
        "29237",
        "29235",
        "29234",
        "29233",
        "29232",
        "29231",
        "29230",
        "29229",
        "29228",
        "29227",
        "29226",
        "29225",
        "29224",
        "29223",
        "29222",
        "29221",
        "29220",
        "29219",
        "29218",
        "29217",
        "29216",
        "29268",
        "29214",
        "29213",
        "29212",
        "29211",
        "29210",
        "29209",
        "29208",
        "29207",
        "29206",
        "29205",
        "29204",
        "29203",
        "29202",
        "29201",
        "29200",
        "29199",
        "29198",
        "29197",
        "29195",
        "29193",
        "29192",
        "29191",
        "29190",
        "29189",
        "29188",
        "29187",
        "29186",
        "29185",
        "29184",
        "29183",
        "29182",
        "29181",
        "29180",
        "29250",
        "29179",
        "29178",
        "29177",
        "29215",
        "29267",
        "29266",
        "29265",
        "29264",
        "29263",
        "29262",
        "29261",
        "29260",
        "29259",
        "29257",
        "29256",
        "29273",
        "29272",
        "29271",
        "29270",
        "29269"
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
  


test('@providersDev Octoplay', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const gamePage = new GamePage(page);

  await page.goto('https://luckystake.dev/');
  await homePage.closePopupIfVisible();
  await loginPage.openLoginForm();
  await loginPage.login('dksld1@gmail.com', 'Qwerty1!!');
  await page.getByText('Social Games').click();
  await page.getByRole('link', { name: 'Providers' }).click();
  await page.getByRole('link', { name: 'Octoplay' }).click();
  await delay5Seconds();

  // launching the games
  await playGames(page);
});
