import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { delay5Seconds, delay10Seconds } from '../../../../utils/utils';

// httpCredentials
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

// function for working on all oid
async function fetchAllOids(): Promise<string[]> {
  const url = "https://wiztechgroup-cdn.com/stage/games_pack/5138631f-8d60-4327-b46c-8a4e41d68c93.json";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Не удалось скачать JSON: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.games || !Array.isArray(data.games)) {
    console.warn("Поле games не найдено или не массив");
    return [];
  }

  // All oids in an array
  const allOids = data.games.map((g: any) => g.oid);
  console.log(`Всего oid для проверки: ${allOids.length}`);
  return allOids;
}

// The main function to play games by their IDs
async function playGames(page, gameIds: string[]) {
  for (const id of gameIds) {
    const gameUrl = `https://luckystake.dev/game/real/${id}`;
    console.log(`Открываю игру ${id}: ${gameUrl}`);
    await page.goto(gameUrl);
    await page.waitForLoadState('networkidle');

    // Screenshot before Play now
    let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_before_playNow`, {
      body: screenshot,
      contentType: 'image/png',
    });

    // Click on Play now
    const playNowButton = page.getByRole('button', { name: 'Play now' });
    if (await playNowButton.isVisible({ timeout: 5000 })) {
      await playNowButton.click();
    }

    // Waiting
    await page.waitForLoadState('networkidle');

    // Screenshot after wait
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_after_wait`, {
      body: screenshot,
      contentType: 'image/png',
    });

    // checking "Explore games" button  
const exploreButton = page.getByRole('button', { name: 'Explore games' });
if (await exploreButton.isVisible({ timeout: 5000 })) {
  await exploreButton.click();
  await delay5Seconds();
  console.log(`Explore games button for game ${id} found and clicked, пропускаем поиск searchButton.`);
  continue; // going to the next oid
}

// seeking searchButton
const searchButton = page.getByRole('button').filter({ hasText: /^$/ });
if (await searchButton.first().isVisible({ timeout: 3000 })) {
  await searchButton.first().click();
  await delay5Seconds();

      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`game_${id}_after_search_button`, {
        body: screenshot,
        contentType: 'image/png',
      });

      if (await searchButton.nth(1).isVisible({ timeout: 5000 })) {
        await searchButton.nth(1).click();
      }
    }

    // buy button
    const buyButton = page.getByRole('button', { name: 'buy' });

    if (await buyButton.isVisible({ timeout: 10000 })) {
      await buyButton.click();
      
      await page.waitForLoadState('networkidle');

      screenshot = await page.screenshot();
      test.info().attach(`game_${id}_buy_button`, {
        body: screenshot,
        contentType: 'image/png',
      });

      // Random price
      const prices = ["$1.99", "$4.99", "$9.99", "$24.99", "$34.99"];
      const randomPrice = prices[Math.floor(Math.random() * prices.length)];
      const priceButton = page.getByRole('button', { name: randomPrice });

      if (await priceButton.isVisible({ timeout: 10000 })) {
        console.log(`Click on price button: ${randomPrice}`);
        await priceButton.click();

        await delay10Seconds();
        await delay10Seconds();

        screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_${id}_card_proposition_after_clicking_on_random_price`, {
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
        console.log(`Кнопка с ценой ${randomPrice} не найдена, пропускаем...`);
      }
    }

    // Click on Back button
    const backButton = page.getByTestId('ArrowBackIosIcon');
    if (await backButton.isVisible({ timeout: 6000 })) {
      await backButton.click();
    }

    await page.waitForLoadState('networkidle');

    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_after_clicking_Back`, {
      body: screenshot,
      contentType: 'image/png',
    });
  }
}

// the very Test
test('games from JSON - all by oid', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await page.goto('https://luckystake.dev/');
  await homePage.closePopupIfVisible();
  await loginPage.openLoginForm();
  await loginPage.login('dksld1@gmail.com', 'Qwerty1!!');
  await delay5Seconds();

  // Take all oids
  const oids = await fetchAllOids();

  if (oids.length === 0) {
    test.skip();
    return;
  }

  // laucnhing the games
  await playGames(page, oids);
});
