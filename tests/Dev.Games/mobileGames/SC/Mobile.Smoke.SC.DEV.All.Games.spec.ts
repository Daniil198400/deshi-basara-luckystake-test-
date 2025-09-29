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

// -----------------
// Force click Buy button
async function forceClickBuy(page : Page) {
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
  const url = "https://wiztechgroup-cdn.com/stage/games_pack/5138631f-8d60-4327-b46c-8a4e41d68c93.json";
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
    const gameUrl = `https://luckystake.dev/game/real/${id}`;
    console.log(`Открываю игру ${id}: ${gameUrl}`);
    await page.goto(gameUrl);

    try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
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
      await page.waitForLoadState('networkidle', { timeout: 20000 });
    } catch {
      console.warn('⏱️ Network idle is not found after 30 sec, continue...');
    }
    await delay10Seconds();
    await delay10Seconds();

    // Screenshot after Play now
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
      console.log(`Explore games button for game ${id} is found, giving up searching searchButton.`);
      continue; // next OID...
    }


    // Back button
    const backButton = page.getByTestId('ArrowBackIosIcon');
    if (await backButton.isVisible({ timeout: 5000 })) {
      await backButton.click();
    }

    try {
      await page.waitForLoadState('networkidle', { timeout: 5000 });
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
test('MOBILE DEV, Smoke, SC ONLY, ALL GAMES', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await page.goto('https://luckystake.dev/');
  await homePage.closePopupIfVisible();
  await loginPage.openLoginForm();
  await loginPage.login('dksld2@gmail.com', 'Qwerty1!!');
  await delay5Seconds();
  async function clickIfExists(page: Page, role: string, name: string) {
  const locator = page.getByRole(role as any, { name });
  if (await locator.count() > 0) {
    await locator.first().click();
  }
}
  await clickIfExists(page, 'img', 'GC');

  const oids = await fetchAllOids();
  if (oids.length === 0) {
    test.skip();
    return;
  }

  await playGames(page, oids);
});









