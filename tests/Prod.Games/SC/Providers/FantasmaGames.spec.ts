import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { GamePage } from '../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';

// массив ID игр
const gameIds = [
  "28492", "28484", "28493", "28479", "28481", "28494", "28485",
  "28478", "28487", "28490", "28480", "28482", "28488", "28491",
  "28495", "28483", "28489", "28486"
];

// основная функция, проходящая по всем играм
async function playGames(page: Page) {
  for (const id of gameIds) {
    const gameUrl = `https://luckystake.com/game/real/${id}`;
    console.log(`🎮 Открываем игру ${id} → ${gameUrl}`);

    await page.goto(gameUrl);
    await delay5Seconds();

    // Скриншот до Play now
    let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_before_playnow`, {
      body: screenshot,
      contentType: 'image/png'
    });

    // Нажимаем Play now
    await page.getByRole('button', { name: 'Play now' }).click();

    try {
      await page.waitForLoadState('networkidle', { timeout: 40000 });
    } catch {
      console.warn('⏱️ Network idle не достигнут за 30 сек, продолжаем...');
    }

    await delay10Seconds();
    await delay10Seconds();

    // --- Работа с iframe и кликами ---
    const outerFrameHandle = await page.locator('iframe[title="Real game"]').elementHandle();
    const outerFrame = await outerFrameHandle?.contentFrame();

    if (!outerFrame) {
      console.warn('❗ Не удалось получить внешний iframe');
      continue;
    }

    await outerFrame.waitForSelector('#game', { timeout: 15000 });
    const innerFrameHandle = await outerFrame.locator('#game').elementHandle();
    const innerFrame = await innerFrameHandle?.contentFrame();

    if (!innerFrame) {
      console.warn('❗ Не удалось получить внутренний iframe');
      continue;
    }

    // Проверяем наличие #GameCanvas
    const hasGameCanvas = await innerFrame.locator('#GameCanvas').count();

    if (hasGameCanvas > 0) {
      console.log('✅ Найден #GameCanvas — кликаем несколько раз вокруг точки');

      // Координаты вокруг центра (583, 585)
      const clickPositions = [
        { x: 583, y: 585 },
        { x: 577, y: 583 },
        { x: 589, y: 587 },
        { x: 580, y: 590 },
        { x: 586, y: 580 }
      ];

      for (const pos of clickPositions) {
        console.log(`🖱️ Кликаем по x:${pos.x}, y:${pos.y}`);
        await innerFrame.locator('#GameCanvas').click({
          position: pos,
          force: true
        });
        await page.waitForTimeout(200); // пауза 200 мс между кликами
      }

    } else {
      console.log('⚠️ Элемент #GameCanvas не найден, пробуем canvas');
      await innerFrame.locator('canvas').click({
        position: { x: 617, y: 596 },
        force: true
      });
    }

    await delay10Seconds();

    // Скриншот после кликов
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_after_wait`, {
      body: screenshot,
      contentType: 'image/png'
    });

    console.log(`✅ Завершено выполнение для игры ${id}`);
  }
}

await delay5Seconds();

// основной тест
test('@ClickOnAdditionalStep FantasmaGames', async ({ context }) => {
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const gamePage = new GamePage(page);

  // вспомогательная функция — ждёт кнопку и кликает, если она появилась
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