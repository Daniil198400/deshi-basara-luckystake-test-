import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../../pages/LoginPage';
import { HomePage } from '../../../../../pages/HomePage';
import { GamePage } from '../../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../../utils/utils';

// Массив ID игр
const gameIds = [
  "34255",
  "28501",
  "28503",
  "14621",
  "28502",
  "28504"
];

// Основная функция запуска игр
async function playGames(page: Page) {
  for (const id of gameIds) {
    const gameUrl = `https://luckystake.com/game/real/${id}`;
    console.log(`🎮 Открываем игру ${id}: ${gameUrl}`);

    await page.goto(gameUrl);
    await delay5Seconds();

    // Скриншот до кнопки Play now
    let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_before_playnow`, { 
      body: screenshot, 
      contentType: 'image/png' 
    });

    // Нажимаем Play now
    await page.getByRole('button', { name: 'Play now' }).click();

    try {
      await page.waitForLoadState('networkidle', { timeout: 50000 });
    } catch {
      console.warn('⏱️ Network idle не достигнут за 30 сек, продолжаем...');
    }

    await delay10Seconds();

 async function clickAllGames(page: Page) {
    if (await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'WILD MULTIPLIER FREE SPINS' }).isVisible()) {
        await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'WILD MULTIPLIER FREE SPINS' }).click();
    }

    if (await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'Land clovers to win up to 10,' }).isVisible()) {
        await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'Land clovers to win up to 10,' }).click();
    }

    if (await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'COLLECT BATTERIES TO ACTIVATE' }).isVisible()) {
        await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'COLLECT BATTERIES TO ACTIVATE' }).click();
    }

    if (await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button').nth(3).isVisible()) {
        await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button').nth(3).click();
    }

    if (await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button').nth(3).isVisible()) {
        await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button').nth(3).click();
    }

    if (await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'CLIMBING WILDS AVALANCHE' }).isVisible()) {
        await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'CLIMBING WILDS AVALANCHE' }).click();
    }
}


    await delay5Seconds();

    // Скриншот после нажатия
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_after_wait`, { 
      body: screenshot, 
      contentType: 'image/png' 
    });

    console.log(`✅ Игра ${id} завершена`);
  }
}

await delay5Seconds();

test('@ClickOnAdditionalStep Four Leaf Gaming', async ({ context }) => {
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const gamePage = new GamePage(page);

  console.log('🚀 Запуск теста Four Leaf Gaming');

  // Авторизация
  await page.goto('https://luckystake.com/');
  await homePage.closePopupIfVisible();
  await loginPage.openLoginForm();
  await loginPage.login('wiztest+70001@gmail.com', 'Qwerty1!');
  await delay5Seconds();

  // Запуск игр
  await playGames(page);

  console.log('🏁 Все игры из списка завершены');
});

test('@ClickOnAdditionalStepMobile Four Leaf Gaming', async ({ context }) => {
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const gamePage = new GamePage(page);

  console.log('🚀 Запуск теста Four Leaf Gaming');

  await page.goto('https://luckystake.com/');
  await homePage.closePopupIfVisible();
  await loginPage.openLoginForm();
  await loginPage.login('wiztest+70001@gmail.com', 'Qwerty1!');
  await delay5Seconds();

  const emptyButton = page.getByRole('button').filter({ hasText: /^$/ });
  if (await emptyButton.isVisible()) {
    await emptyButton.click({ force: true });
    console.log('🟢 Нажата пустая кнопка');
  }


 const scImage = page.getByRole('img', { name: 'SC', exact: true });
  if (await scImage.isVisible()) {
    await scImage.scrollIntoViewIfNeeded();
    await scImage.click({ force: true });
    console.log('✅ Клик по SC');
  }

  await delay5Seconds();
  
  await playGames(page);


});