import { test as base, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { HomePage } from '../../../pages/HomePage';
import { delay5Seconds } from '../../../utils/utils';

// --- утилиты ---
async function waitAndScreenshot(page: Page, name: string) {
  try {
    await page.waitForLoadState('networkidle', { timeout: 10000 });
  } catch {
    console.warn('⏱️ Network idle is not found after 10 сек, continue...');
  }
  await delay5Seconds();
  const screenshot = await page.screenshot({ fullPage: true });
  test.info().attach(name, {
    body: screenshot,
    contentType: 'image/png',
  });
}

async function openProvider(page: Page, providerName: string, shots: string[], loadMoreClicks: number = 0, finalClickText?: string) {
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: providerName }).click();
  await waitAndScreenshot(page, shots[0]);

  for (let i = 0; i < loadMoreClicks; i++) {
    await page.getByRole('button', { name: 'Load More' }).click();
    await waitAndScreenshot(page, shots[i + 1]);
  }

  if (finalClickText) {
    await page.getByText(finalClickText).click();
    await waitAndScreenshot(page, shots[shots.length - 1]);
  }
}

// контекст с httpCredentials
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

test('@CheckPresenceOfGames Mobile Checking All Games Sections', async ({ context }) => {
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  // --- открываем сайт ---
  await page.goto('https://luckystake.com/');
  await homePage.closePopupIfVisible();
  await waitAndScreenshot(page, 'start');

  // --- логин ---
  await loginPage.openLoginForm();
  await loginPage.login('wiztest+70001@gmail.com', 'Qwerty1!');
  await waitAndScreenshot(page, 'after_login');

  // --- поиск и все провайдеры ---
  await page.getByRole('button').filter({ hasText: 'Search' }).click();
  await page.getByRole('button', { name: 'Providers 22' }).click();
  await waitAndScreenshot(page, 'All 22 Providers');

  // --- Platipus ---
  await page.locator('.SearchGames_search_games__cards_wrapper__8c4ac > a').first().click();
  await waitAndScreenshot(page, 'Platipus 1');
  await page.getByRole('button', { name: 'Load More' }).click();
  await waitAndScreenshot(page, 'Platipus 2');
  await page.getByRole('button', { name: 'Load More' }).click();
  await waitAndScreenshot(page, 'Platipus 3');
  await page.getByText('Load More109 /').click();
  await waitAndScreenshot(page, 'Platipus 4');

  // --- Novomatic ---
  await openProvider(page, 'Novomatic', ['Novomatic', 'Novomatic 2', 'Novomatic 3', 'Novomatic 4'], 2, '/ 91');

  // --- Relax ---
  await openProvider(page, 'Relax', ['Relax', 'Relax 2', 'Relax 3'], 1, '/ 75');

  // --- RubyPlay ---
  await openProvider(page, 'Rubyplay', ['RubyPlay', 'RubyPlay 2', 'RubyPlay 3', 'RubyPlay 4'], 2, '/ 120');

  // --- Slotmill ---
  await openProvider(page, 'Slotmill', ['SLotmill', 'SLotmill 2', 'SLotmill 3'], 1, '/ 44');

  // --- RedRake ---
  await openProvider(page, 'RedRake', ['RedRake', 'RedRake 2', 'RedRake 3'], 1, '/ 57');

  // --- 1spin4win ---
  await openProvider(page, '1spin4win', ['1spin4win']);

  // --- Four7 ---
  await openProvider(page, 'Four7', ['Four7']);

  // --- Max Win Gaming ---
  await openProvider(page, 'Max Win Gaming', ['Max Win Gaming']);

  // --- Four Leaf Gaming ---
  await openProvider(page, 'Four Leaf Gaming', ['Four Leaf Gaming']);

  // --- Storm Gaming ---
  await openProvider(page, 'Storm Gaming', ['Storm Gaming']);

  // --- Gamzix ---
  await openProvider(page, 'Gamzix', ['Gamzix']);

  // --- Print Studios ---
  await openProvider(page, 'Print Studios', ['Print Studios']);

  // --- 4ThePlayer ---
  await openProvider(page, '4ThePlayer', ['4ThePlayer']);

  // --- Fantasma Games ---
  await openProvider(page, 'Fantasma Games', ['Fantasma Games']);

  // --- Peter & Sons ---
  await openProvider(page, 'Peter & Sons', ['Peter & Sons']);

  // --- Octoplay ---
  await openProvider(page, 'Octoplay', ['Octoplay', 'Octoplay 2', 'Octoplay 3', 'Octoplay 4'], 2, '/ 98');

  // --- Trigger ---
  await openProvider(page, 'Trigger', ['Trigger']);

  // --- Microgaming ---
  await openProvider(page, 'Microgaming', ['Microgaming']);

  // --- Playson ---
  await openProvider(page, 'Playson', ['Playson']);

  // --- Spinomenal ---
  await openProvider(page, 'Spinomenal', ['Spinomenal']);

  // --- Iconic21 ---
  await openProvider(page, 'Iconic21', ['Iconic21']);
});
