import { test as base, expect, Page } from '@playwright/test';
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

// -----------------
// Force click Buy button
async function forceClickBuy(page: Page) {
  try {
    await page.getByRole('button', { name: 'buy' }).click();
    console.log('✅ Buy button clicked');
    try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('⏱️ Network idle is not found after 30 sec, continue......');
    }
    await delay10Seconds();
  } catch (e) {
    console.error('❌ Buy button is not found:', e);
  }
}

// -----------------
// Getting all OID
async function fetchAllOids(): Promise<string[]> {
  const url = "https://static.genetiko.com/prod/games_pack/1a2a9023-dd0c-4052-93ef-b5e696daeb32.json";
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Не удалось скачать JSON: ${response.status} ${response.statusText}`);
  const data = await response.json();
  if (!data.games || !Array.isArray(data.games)) return [];
  return data.games.map((g: any) => g.oid);
}

// -----------------
// The main function
async function playGames(page: Page, gameIds: string[]) {
  for (const id of gameIds) {
    const gameUrl = `https://luckystake.com/game/real/${id}`;
    console.log(`Открываю игру ${id}: ${gameUrl}`);
    await page.goto(gameUrl);

    try {
      await page.waitForLoadState('networkidle', { timeout: 10000 });
    } catch {
      console.warn('⏱️ Network idle is not found after 30 sec, continue......');
    }
    await delay5Seconds();

    // Screenshot Play now
    let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_before_playNow`, {
      body: screenshot,
      contentType: 'image/png',
    });

    // Play now
    await page.getByRole('button', { name: 'Play now' }).click();
    try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('⏱️ Network idle is not found after 30 sec, continue...');
    }
    await delay10Seconds();

    // Screenshot after Play now
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_after_wait`, {
      body: screenshot,
      contentType: 'image/png',
    });

    // Explore games button
const exploreButton = page.getByRole('button', { name: 'Explore games' });
if (await exploreButton.isVisible({ timeout: 16000 })) {
  await exploreButton.click();
  await delay5Seconds();

  // after clicking on Explore games
  const screenshot = await page.screenshot({ fullPage: true });
  test.info().attach(`game_${id}_explore_clicked`, {
    body: screenshot,
    contentType: 'image/png',
  });

  console.log(`Explore games button for game ${id} is found, giving up searching searchButton.`);
  continue; // next OID...
}

    // searchButton
    const searchButton = page.getByRole('button').filter({ hasText: /^$/ });
    if (await searchButton.first().isVisible({ timeout: 12000 })) {
      await searchButton.first().click();
      try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 15 sec, continue...');
      }
      await delay10Seconds();

      screenshot = await page.screenshot({ fullPage: true });
      test.info().attach(`game_${id}_after_search_button`, {
        body: screenshot,
        contentType: 'image/png',
      });

      if (await searchButton.nth(1).isVisible({ timeout: 30000 })) {
        await searchButton.nth(1).click();
      }
    }

    await delay5Seconds();

    // -----------------
// Clicking on Buy
await page.locator('div').filter({ hasText: /^buy$/ }).click();
await page.getByRole('button', { name: 'buy' }).click();

try {
  await page.waitForLoadState('networkidle', { timeout: 10000 });
} catch {
  console.warn('⏱️ Network idle is not found after 10 сек, continue...');
}

// Скриншот после клика на Buy
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_${id}_after_clicking_on_buy`, {
  body: screenshot,
  contentType: 'image/png',
});

// -----------------
// Random price selection
const prices = ["$1.99", "$4.99", "$9.99", "$24.99", "$34.99"];
const randomPrice = prices[Math.floor(Math.random() * prices.length)];

let priceClicked = false;

try {
  const priceButton = page.getByRole('button', { name: randomPrice });
  await priceButton.waitFor({ timeout: 60000 });
  await priceButton.click({ force: true });
  console.log(`✅ Clicked random price button: ${randomPrice}`);
  priceClicked = true;

  // Ждём 35 секунд после клика по цене
  await new Promise(r => setTimeout(r, 35000));

} catch {
  console.warn(`⚠️ Random price button ${randomPrice} не найден, пробуем другие секции...`);
}

// -----------------
// Bullets / pagination — только если цена не нажата
const paginationSelectors = [
  '.Swiper_bullet__iYkFo',
  '.Swiper_pagination__4QdJy > span:nth-child(2)',
  '.Swiper_pagination__4QdJy > span:nth-child(3)',
  '.Swiper_pagination__4QdJy > span:nth-child(4)'
];

if (!priceClicked) {
  for (const selector of paginationSelectors) {
    try {
      const element = page.locator(selector);
      if (await element.isVisible({ timeout: 10000 })) {
        await element.click();
        console.log(`📄 Clicked pagination/bullet: ${selector}`);
        await new Promise(r => setTimeout(r, 5000)); // 5 секунд между буллетами
      }
    } catch {
      console.warn(`⚠️ Элемент ${selector} не найден, пропускаем`);
    }
  }
}

// -----------------
// Финальный скриншот с окном оплаты
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_${id}_after_price_and_bullets`, {
  body: screenshot,
  contentType: 'image/png',
});

    // Exit button 
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();;

    // Back button
    const backButton = page.getByTestId('ArrowBackIosIcon');
    if (await backButton.isVisible({ timeout: 6000 })) {
      await backButton.click();
    }

    try {
      await page.waitForLoadState('networkidle', { timeout: 7000 });
    } catch {
      console.warn('⏱️ Network idle is not found after 30 сек, continue...');
    }
    await delay5Seconds();

    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_after_clicking_Back`, {
      body: screenshot,
      contentType: 'image/png',
    });
  }
}

// -----------------
// Main Test
test('MOBILE PROD, GC ONLY, ALL GAMES', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await page.goto('https://luckystake.com/');
  await homePage.closePopupIfVisible();
  await loginPage.openLoginForm();
  await loginPage.login('wiztest+80001@gmail.com', 'Qwerty1!');
  await delay5Seconds();
  
  const oids = await fetchAllOids();
  if (oids.length === 0) {
    test.skip();
    return;
  }

  await playGames(page, oids);
});



// await page.locator('.Swiper_pagination__4QdJy > span:nth-child(2)').click();

// await page.getByRole('button', { name: '$299.99' }).click();
// "$34.99"
// await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
// await page.getByRole('button', { name: 'buy' }).click();
// await page.getByRole('button', { name: '$9.99' }).click();


// '.Swiper_bullet__iYkFo',
// '.Swiper_pagination__4QdJy > span:nth-child(2)',
// '.Swiper_pagination__4QdJy > span:nth-child(3)',
// '.Swiper_pagination__4QdJy > span:nth-child(4)',
// '.Swiper_pagination__4QdJy > span:nth-child(5)',
// '.Swiper_pagination__4QdJy > span:nth-child(6)',
// '.Swiper_pagination__4QdJy > span:nth-child(7)',
// '.Swiper_pagination__4QdJy > span:nth-child(8)',
// '.Swiper_pagination__4QdJy > span:nth-child(9)',
// '.Swiper_pagination__4QdJy > span:nth-child(10)',
// '.Swiper_pagination__4QdJy > span:nth-child(11)',


// await page.getByRole('button', { name: '$34.99' }).click();







