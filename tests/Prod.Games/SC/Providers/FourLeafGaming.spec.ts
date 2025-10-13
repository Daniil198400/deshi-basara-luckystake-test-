import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { GamePage } from '../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';

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

    // Работа с iframe
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

    // --- Пытаемся нажать START или третью кнопку ---
    const hasStartButton = await innerFrame
      .getByRole('button', { name: 'START', exact: true })
      .count();

    if (hasStartButton > 0) {
      console.log('🟢 Найдена кнопка START — кликаем по ней');
      await innerFrame
        .getByRole('button', { name: 'START', exact: true })
        .click({ force: true });
    } else {
      console.log('⚪ Кнопка START не найдена — пробуем третью кнопку');
      const allButtons = await innerFrame.getByRole('button').count();
      if (allButtons >= 4) {
        await innerFrame.getByRole('button').nth(3).click({ force: true });
        console.log('✅ Нажата третья кнопка (nth(3))');
      } else {
        console.warn('❗ Недостаточно кнопок для выбора nth(3)');
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

test('@ClickOnAdditionalStep FourLeafGaming', async ({ context }) => {
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