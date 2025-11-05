import { test, Page } from '@playwright/test';
import { LoginPage } from '../../../../../pages/LoginPage';
import { HomePage } from '../../../../../pages/HomePage';
import { GamePage } from '../../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../../utils/utils';

// Все айдишники игр
const gameIds = [
  35512, 35532, 35534, 35519, 35503, 35525, 35528, 35550,
  35499, 35507, 35513, 35498, 35496, 35493, 35505, 35506,
  35510, 35511, 35504, 35517
];

// Координаты для кликов
const clickPoints = [
  { x: 580, y: 590 }, { x: 593, y: 589 }, { x: 580, y: 594 },
  { x: 618, y: 603 }, { x: 602, y: 581 }, { x: 589, y: 587 },
  { x: 582, y: 586 }, { x: 619, y: 590 }, { x: 581, y: 587 },
  { x: 585, y: 573 }, { x: 590, y: 588 }, { x: 585, y: 587 },
  { x: 568, y: 581 }, { x: 589, y: 593 }, { x: 589, y: 597 },
  { x: 603, y: 576 }, { x: 587, y: 605 }, { x: 589, y: 598 },
  { x: 574, y: 591 }, { x: 577, y: 597 },
  // дополнительные точки
  { x: 600, y: 600 }, { x: 610, y: 580 }, { x: 595, y: 610 }
];

// Функция случайного выбора точки
function getRandomPoint() {
  return clickPoints[Math.floor(Math.random() * clickPoints.length)];
}

// Функция клика по случайной точке
async function clickGameCanvasRandom(page: Page) {
  const iframe = await page.locator('iframe[title="Real game"]').contentFrame();
  if (!iframe) {
    console.warn('⚠️ Iframe не найден');
    return;
  }

  // Проверяем оба варианта селектора
  const selectors = ['#game_canvas', '#game-canvas'];
  for (const selector of selectors) {
    const canvas = iframe.locator(selector);
    if (await canvas.count()) {
      const { x, y } = getRandomPoint();
      await canvas.click({ position: { x, y } });
      console.log(`🎯 Клик по ${selector} в позиции (${x}, ${y})`);
      return;
    }
  }

  console.warn('⚠️ Canvas не найден.');
}

// Основная функция для прохождения игр
async function playGames(page: Page) {
  for (const id of gameIds) {
    const gameUrl = `https://luckystake.com/game/real/${id}`;
    await page.goto(gameUrl);
    await delay5Seconds();

    // Скриншот до клика
    let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_before_playnow`, {
      body: screenshot,
      contentType: 'image/png'
    });

    // Нажимаем Play now
    await page.getByRole('button', { name: 'Play now' }).click();
    await delay10Seconds();

    // Дожидаемся загрузки
    try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('⏱️ Network idle не наступил за 30 сек, продолжаем...');
    }

    await delay10Seconds();

    // click canvas
    await clickGameCanvasRandom(page);
    await delay5Seconds();

    // screenshot after click
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_after_click`, {
      body: screenshot,
      contentType: 'image/png'
    });

    await delay5Seconds();
  }
}


test('@ClickOnAdditionalStepMobile Playson', async ({ context }) => {
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const gamePage = new GamePage(page);

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
       const scImage = page.getByRole('img', { name: 'GC', exact: true });
        if (await scImage.isVisible()) {
          await scImage.scrollIntoViewIfNeeded();
          await scImage.click({ force: true });
          console.log('click on SC');
        }
      
        await delay5Seconds();
  // Запуск игр
  await playGames(page);
});