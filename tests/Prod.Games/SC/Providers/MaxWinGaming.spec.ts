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

await delay5Seconds();

test('@ClickOnAdditionalStep MaxWinGaming', async ({ context }) => {
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const gamePage = new GamePage(page);

  // helpful function
async function clickCloseButtonIfExists(page: Page) {
  const selector = '.WizIconButton_base__JfGpY.WizPopupWrapper_close__hKtRn';
  try {
    const button = await page.waitForSelector(selector, { timeout: 10000 });
    await button.click();
    console.log('Кнопка закрытия найдена и нажата');
    await page.waitForTimeout(5000);
  } catch {
    console.log('Кнопка закрытия не найдена за 10 секунд');
  }
}

// вспомогательная функция — кликает по элементу, если он существует
async function clickIfExists(page: Page, role: string, name: string) {
  const locator = page.getByRole(role as any, { name });
  if (await locator.count() > 0) {
    await locator.first().click();
    console.log(`Нажали на элемент с role=${role}, name=${name}`);
  } else {
    console.log(`Элемент с role=${role}, name=${name} не найден`);
  }
}

  // авторизация
  await page.goto('https://luckystake.com/');
  await homePage.closePopupIfVisible();
  await loginPage.openLoginForm();
  await loginPage.login('wiztest+80001@gmail.com', 'Qwerty1!');

  await delay5Seconds();

  // если появится кнопка закрытия — нажать
  await clickCloseButtonIfExists(page);

  // подождать немного, потом попытаться нажать по картинке GC
  await delay5Seconds();
  await clickIfExists(page, 'img', 'GC');

  // запуск игр
  await playGames(page);
});