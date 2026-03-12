import { test as base, Page, expect } from '@playwright/test';
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

// =======================
// CHANGED PART — ONLY THIS
// =======================
async function fetchAllOids(): Promise<string[]> {
  const url =
    "https://static.genetiko.com/prod/vendors_pack/1a2a9023-dd0c-4052-93ef-b5e696daeb32.json";

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Не удалось скачать JSON: ${response.status} ${response.statusText}`);
  }

  const data: any = await response.json();

  if (!data.vendors || !Array.isArray(data.vendors)) {
    console.warn("Поле vendors не найдено или не массив");
    return [];
  }

  const allGameIds: string[] = [];

  for (const v of data.vendors) {
    if (!v?.games || !Array.isArray(v.games)) {
      console.warn(`Vendor ${v?.name ?? v?.id ?? "unknown"}: поле games не найдено или не массив`);
      continue;
    }

    for (const g of v.games) {
      if (g === null || g === undefined) continue;
      allGameIds.push(String(g));
    }
  }

  const unique = [...new Set(allGameIds)];
  console.log(`Всего game ids для проверки: ${unique.length}`);
  return unique;
}
// =======================


// The main function to play games by their IDs
async function playGames(page: Page, gameIds: string[]) {
  for (const id of gameIds) {
    const gameUrl = `https://luckystake.com/game/real/${id}`;
    console.log(`Открываю игру ${id}: ${gameUrl}`);
    await page.goto(gameUrl);

    try {
      await page.waitForLoadState('networkidle', { timeout: 40000 });
    } catch (e) {
      console.warn('Network idle is not found after 30 sec, keep going...');
    }

    await delay5Seconds();

    let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_before_playNow`, {
      body: screenshot,
      contentType: 'image/png',
    });

    const playNowButton = page.getByRole('button', { name: 'Play now' });
    if (await playNowButton.isVisible({ timeout: 5000 })) {
      await playNowButton.click();
    }

    try {
      await page.waitForLoadState('networkidle', { timeout: 45000 });
    } catch (e) {
      console.warn('Network idle is not found after 45 sec, keep going...');
    }

    await delay10Seconds();

    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_after_wait`, {
      body: screenshot,
      contentType: 'image/png',
    });

    const exploreButton = page.getByRole('button', { name: 'Explore games' });
    if (await exploreButton.isVisible({ timeout: 5000 })) {
      await exploreButton.click();
      await delay5Seconds();
      console.log(`Explore games button for game ${id} found and clicked`);
      continue;
    }


// seeking searchButton
// const searchButton = page.getByRole('button').filter({ hasText: /^$/ });
// if (await searchButton.first().isVisible({ timeout: 3000 })) {
//   await searchButton.first().click();
  
// try {
//   await page.waitForLoadState('networkidle', { timeout: 30000 }); // 30 секунд
// } catch (e) {
//   console.warn('Network idle is not found after 30 sec, keep going...');
//   // continue – next steps
// }
//   await delay5Seconds();

//       screenshot = await page.screenshot({ fullPage: true });
//       test.info().attach(`game_${id}_after_search_button`, {
//         body: screenshot,
//         contentType: 'image/png',
//       });

//       if (await searchButton.nth(1).isVisible({ timeout: 5000 })) {
//         await searchButton.nth(1).click();
//       }
//     }

//     // buy button
//     const buyButton = page.getByRole('button', { name: 'buy' });

//     if (await buyButton.isVisible({ timeout: 10000 })) {
//       await buyButton.click();
      
// try {
//   await page.waitForLoadState('networkidle', { timeout: 30000 }); // 30 секунд
// } catch (e) {
//   console.warn(' Network idle is not found after 30 sec, keep going...');
//   // continue – next steps
// }
//       await delay5Seconds();

//       screenshot = await page.screenshot();
//       test.info().attach(`game_${id}_buy_button`, {
//         body: screenshot,
//         contentType: 'image/png',
//       });

//       // Random price
//       const prices = ["$1.99", "$4.99", "$9.99", "$24.99", "$34.99"];
//       const randomPrice = prices[Math.floor(Math.random() * prices.length)];
//       const priceButton = page.getByRole('button', { name: randomPrice });

//       if (await priceButton.isVisible({ timeout: 10000 })) {
//         console.log(`Click on price button: ${randomPrice}`);
//         await priceButton.click();

// try {
//   await page.waitForLoadState('networkidle', { timeout: 30000 }); // 30 секунд
// } catch (e) {
//   console.warn(' Network idle is not found after 30 sec, keep going...');
//   // continue – next steps
// }
//         await delay10Seconds();

//         screenshot = await page.screenshot({ fullPage: true });
//         test.info().attach(`game_${id}_card_proposition_after_clicking_on_random_price`, {
//           body: screenshot,
//           contentType: 'image/png',
//         });

//         const confirmButton = page.getByRole('button').nth(2);
//         if (await confirmButton.isVisible({ timeout: 10000 })) {
//           await confirmButton.click();
//         } else {
//           console.log(`Confirm button для ${randomPrice} не найден, пропускаем...`);
//         }
//       } else {
//         console.log(`Кнопка с ценой ${randomPrice} не найдена, пропускаем...`);
//       }
//     }

//     // Click on Back button
//     const backButton = page.getByTestId('ArrowBackIosIcon');
//     if (await backButton.isVisible({ timeout: 6000 })) {
//       await backButton.click();
//     }

// try {
//   await page.waitForLoadState('networkidle', { timeout: 30000 }); // 30 секунд
// } catch (e) {
//   console.warn('Network idle is not found after 30 sec, keep going...');
//   // continue – next steps
// }
//     await delay5Seconds();
//     screenshot = await page.screenshot({ fullPage: true });
//     test.info().attach(`game_${id}_after_clicking_Back`, {
//       body: screenshot,
//       contentType: 'image/png',
//     });
  }
}

// the very Test
test('PROD, GC ONLY, ALL GAMES', async ({ page }) => {
  await page.goto('https://luckystake.com/');
  
  await page.getByTestId('login-header').click();
  await page.getByTestId('email-input-login').click();
  await page.getByTestId('email-input-login').fill('wiztest+80001@gmail.com');
  await page.getByTestId('password-input-login').click();
  await page.getByTestId('password-input-login').fill('Qwerty1!');
  await page.getByTestId('submit-button-login').click();

    // await delay5Seconds();
    // await page.getByRole('img', { name: 'close' }).click();
await delay5Seconds();
  await page.goto('https://luckystake.com/');
       const scImage = page.getByRole('img', { name: 'SC', exact: true });
        if (await scImage.isVisible()) {
          await scImage.scrollIntoViewIfNeeded();
          await scImage.click({ force: true });
          console.log('Клик по SC');
        }
      
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



