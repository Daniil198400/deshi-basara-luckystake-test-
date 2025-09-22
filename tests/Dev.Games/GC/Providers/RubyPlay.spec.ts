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
        "24207",
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
        "24199",
        "24200",
        "24201",
        "24202",
        "24203",
        "24204",
        "24205",
        "24206",
        "24208",
        "24209",
        "24210",
        "24211",
        "24212",
        "24213",
        "24214",
        "24215",
        "24216",
        "24217",
        "24218",
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
        "24245",
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
        "34514"
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
  


test('@providersDev 4ThePlayer', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const gamePage = new GamePage(page);

  await page.goto('https://luckystake.dev/');
  await homePage.closePopupIfVisible();
  await loginPage.openLoginForm();
  await loginPage.login('dksld1@gmail.com', 'Qwerty1!!');
  await page.getByText('Social Games').click();
  await page.getByRole('link', { name: 'Providers' }).click();
  await page.getByRole('link', { name: 'Rubyplay' }).click();
  await delay5Seconds();

  // launching the games
  await playGames(page);
});
