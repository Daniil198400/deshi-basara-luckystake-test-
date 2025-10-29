import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { GamePage } from '../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';

// Массив айдишников игр
const gameIds = [
  "28509",
  "28508",
  "28506"
];

/**
 * Кликает по #stageOverlay внутри вложенного iframe.
 * Проходит по всем координатам из списка и кликает по каждой по очереди.
 */
async function clickOnStageOverlay(page: Page): Promise<boolean> {
  const clickPositions = [
    { x: 640, y: 545 }, // первая точка
    { x: 622, y: 529 }, // вторая точка
    { x: 635, y: 552 },
    { x: 650, y: 540 },
    { x: 628, y: 560 },
    { x: 646, y: 489 }
  ];

  try {
    // используем frameLocator для вложенных iframe
    const innerFrame = page.frameLocator('iframe[title="Real game"]').frameLocator('#game');
    const overlay = innerFrame.locator('#stageOverlay');

    // ждем появления overlay
    await overlay.waitFor({ state: 'visible', timeout: 15000 });

    console.log(`#stageOverlay is found, starting ${clickPositions.length} positions`);

    for (const [index, pos] of clickPositions.entries()) {
      console.log(`👉 Кликаем #${index + 1}: x=${pos.x}, y=${pos.y}`);
      await overlay.click({
        position: pos,
        force: true,
      });
      await page.waitForTimeout(400); // небольшая пауза между кликами
    }

    console.log('✅ all clickings #stageOverlay completed');
    return true;
  } catch (err) {
    console.warn('❗ error during #stageOverlay:', err);
    return false;
  }
}

// Основная функция запуска игр
async function playGames(page: Page) {
  for (const id of gameIds) {
    const gameUrl = `https://luckystake.com/game/real/${id}`;
    console.log(`opening game ${id}: ${gameUrl}`);

    await page.goto(gameUrl);
    await delay5Seconds();

    // Скриншот до кнопки Play now
    let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_before_playnow`, {
      body: screenshot,
      contentType: 'image/png',
    });

    // Нажимаем Play now
    try {
      await page.getByRole('button', { name: 'Play now' }).click();
    } catch (err) {
      console.warn('⚠️ clicking on Play now is not succesful:', err);
    }

    try {
      await page.waitForLoadState('networkidle', { timeout: 50000 });
    } catch {
      console.warn('⏱️ Network idle is not reached after 50 sec, continuing...');
    }
    await delay10Seconds();
    await delay5Seconds();
    await delay10Seconds();
    await delay10Seconds();

    // Кликаем по stageOverlay во всех координатах
    const overlayClicked = await clickOnStageOverlay(page);
    if (!overlayClicked) {
      console.warn('not succesful clicking');
    }

    await delay5Seconds();

    // Скриншот после действий
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_after_wait`, {
      body: screenshot,
      contentType: 'image/png',
    });

    console.log(`Completed game ${id}\n`);
  }
}

// Тест
test('@ClickOnAdditionalStep Max Win Gaming', async ({ context }) => {
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const gamePage = new GamePage(page);

  console.log('Launching Max Win Gaming');

  // Авторизация
  await page.goto('https://luckystake.com/');
  await homePage.closePopupIfVisible();
  await loginPage.openLoginForm();
  await loginPage.login('wiztest+70001@gmail.com', 'Qwerty1!');
  await delay5Seconds();
const closeBtn = page.locator('.WizIconButton_base__JfGpY.WizPopupWrapper_close__hKtRn');
if (await closeBtn.isVisible()) {
  await closeBtn.click();
}
    await delay5Seconds();
       const scImage = page.getByRole('img', { name: 'SC', exact: true });
        if (await scImage.isVisible()) {
          await scImage.scrollIntoViewIfNeeded();
          await scImage.click({ force: true });
          console.log('Клик по SC');
        }
      
        await delay5Seconds();
  // Запуск игр
  await playGames(page);

  console.log('🏁 Тест завершён');
});
