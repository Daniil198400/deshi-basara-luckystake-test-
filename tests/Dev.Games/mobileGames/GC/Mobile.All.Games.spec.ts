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

// -----------------
// Универсальная функция клика по кнопке
async function clickButtonAlways(page, role: string, name: string, timeout = 10000) {
  const button = page.getByRole(role, { name });
  try {
    await button.waitFor({ timeout });
    await button.click();
    console.log(`✅ Клик по кнопке "${name}" выполнен`);
    try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('⏱️ Network idle не наступил за 30 сек, продолжаем...');
    }
  } catch {
    console.warn(`⚠️ Кнопка "${name}" не найдена, но продолжаем выполнение`);
  }
}

// -----------------
// Получение всех OID
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

  const allOids = data.games.map((g: any) => g.oid);
  console.log(`Всего oid для проверки: ${allOids.length}`);
  return allOids;
}

// -----------------
// Основная функция проигрыша игр
async function playGames(page, gameIds: string[]) {
  for (const id of gameIds) {
    const gameUrl = `https://luckystake.dev/game/real/${id}`;
    console.log(`Открываю игру ${id}: ${gameUrl}`);
    await page.goto(gameUrl);

    try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('⏱️ Network idle не найден за 30 сек, продолжаем...');
    }
    await delay5Seconds();

    // Скриншот перед Play now
    let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_before_playNow`, {
      body: screenshot,
      contentType: 'image/png',
    });

    // Play now
    await clickButtonAlways(page, 'button', 'Play now');
    await delay5Seconds();

    // Скриншот после Play now
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_after_wait`, {
      body: screenshot,
      contentType: 'image/png',
    });

    // Explore games button
    const exploreButton = page.getByRole('button', { name: 'Explore games' });
    if (await exploreButton.isVisible({ timeout: 5000 })) {
      await exploreButton.click();
      await delay5Seconds();
      console.log(`Explore games button для игры ${id} найден и кликнут, пропускаем поиск searchButton.`);
      continue; // переход к следующему OID
    }

    // Поиск searchButton
    const searchButton = page.getByRole('button').filter({ hasText: /^$/ });
    if (await searchButton.first().isVisible({ timeout: 3000 })) {
      await searchButton.first().click();
      try {
        await page.waitForLoadState('networkidle', { timeout: 30000 });
      } catch {
        console.warn('⏱️ Network idle не найден за 30 сек, продолжаем...');
      }
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

    // Buy button
    await clickButtonAlways(page, 'button', 'buy');
    await delay5Seconds();

    screenshot = await page.screenshot();
    test.info().attach(`game_${id}_buy_button`, {
      body: screenshot,
      contentType: 'image/png',
    });

    // Random price
    const prices = ["$1.99", "$4.99", "$9.99", "$24.99", "$34.99"];
    const randomPrice = prices[Math.floor(Math.random() * prices.length)];
    await clickButtonAlways(page, 'button', randomPrice);
    await delay10Seconds();

    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_card_proposition_after_clicking_on_random_price`, {
      body: screenshot,
      contentType: 'image/png',
    });

    // Confirm button — 3-я кнопка на странице
    const confirmButton = page.getByRole('button').nth(2);
    try {
      if (await confirmButton.isVisible({ timeout: 10000 })) {
        await confirmButton.click();
      } else {
        console.log(`Confirm button для ${randomPrice} не найден, пропускаем...`);
      }
    } catch {
      console.warn('Confirm button не найден, продолжаем...');
    }

    // Back button
    const backButton = page.getByTestId('ArrowBackIosIcon');
    if (await backButton.isVisible({ timeout: 6000 })) {
      await backButton.click();
    }

    try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('⏱️ Network idle не найден за 30 сек, продолжаем...');
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
// Основной тест
test('DEV, GC ONLY, ALL GAMES', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await page.goto('https://luckystake.dev/');
  await homePage.closePopupIfVisible();
  await loginPage.openLoginForm();
  await loginPage.login('dksld1@gmail.com', 'Qwerty1!!');
  await delay5Seconds();

  // Получаем все OID
  const oids = await fetchAllOids();
  if (oids.length === 0) {
    test.skip();
    return;
  }

  // Проигрываем все игры
  await playGames(page, oids);
});
