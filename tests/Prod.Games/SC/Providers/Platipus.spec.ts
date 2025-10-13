import { test, Page } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { GamePage } from '../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';

// Все айдишники игр (из твоего списка)
const gameIds = [
  13527, 22548, 14875, 13529, 3787, 3737, 3752, 3729, 3744, 13530, 3741, 3724,
  35547, 35549, 21434, 22167, 3755, 3746, 3731, 3727, 3751, 3750, 3730, 3786,
  3722, 13534, 3757, 3721, 3753, 3788, 3743, 3739, 3756, 3738, 3754, 3784, 3720,
  3783, 3726, 3785, 22773, 23276, 35674, 3733, 3735, 3758, 22346, 35676, 35675,
  13537, 13533, 13531, 13528, 13538, 13526, 13535, 13532, 3748, 3723, 3742, 3734,
  3747, 3749, 3782, 3732, 3719, 3759, 3718, 3740, 3725, 3736, 3717, 3728, 23887,
  3745, 24166, 13536
];

// Универсальная функция, которая ищет и кликает по любому доступному элементу
async function clickGameButton(page: Page) {
  const frame = await page
    .locator('iframe[title="Real game"]')
    .contentFrame();

  if (!frame) {
    console.warn('⚠️ Iframe не найден.');
    return;
  }

  // Возможные варианты кнопок/областей
  const clickOptions = [
    { selector: '#hud-canvas', x: 619, y: 525 },
    { selector: '#hud-canvas', x: 629, y: 516 },
    { selector: '#hud-canvas', x: 623, y: 543 },
    { selector: '#hud-canvas', x: 623, y: 530 },
    { selector: '#hud-canvas', x: 630, y: 522 },
    { selector: '#hud-canvas', x: 612, y: 529 },
    { selector: '#hud-canvas', x: 639, y: 542 },
    { selector: '#hud-canvas', x: 605, y: 529 },
    { selector: '#hud-canvas', x: 621, y: 552 },
    { selector: '#hud-canvas', x: 607, y: 545 },
    { selector: '#hud-canvas', x: 636, y: 521 },
    { selector: '#hud-canvas', x: 604, y: 524 },
    { selector: '#hud-canvas', x: 629, y: 528 },
    { selector: '#hud-canvas', x: 626, y: 523 },
    { selector: '#hud-canvas', x: 615, y: 521 },
    { selector: '#hud-canvas', x: 609, y: 532 },
    { selector: '#canvas', x: 608, y: 567 },
    { selector: '#preloader-frame', buttonText: 'CONTINUE' },
    { selector: '.preloader_startBtnBg' },
    { selector: '#continueDivBtn' },
    { selector: 'text=START' }
  ];

  // Перебираем все возможные варианты
  for (const option of clickOptions) {
    try {
      if (option.buttonText) {
        const frame2 = await frame
          .locator(option.selector)
          .contentFrame();
        const button = frame2?.getByRole('button', {
          name: option.buttonText,
          exact: true
        });
        if (button && (await button.count()) > 0) {
          await button.first().click();
          console.log(`✅ Нажата кнопка "${option.buttonText}" в ${option.selector}`);
          return;
        }
      } else if (option.selector && (await frame.locator(option.selector).count()) > 0) {
        const target = frame.locator(option.selector);
        if (option.x && option.y) {
          await target.click({ position: { x: option.x, y: option.y } });
          console.log(`🎯 Клик по ${option.selector} (${option.x}, ${option.y})`);
          return;
        } else {
          await target.first().click();
          console.log(`✅ Клик по ${option.selector}`);
          return;
        }
      }
    } catch (err) {
      continue;
    }
  }

  console.warn('⚠️ Ни один из вариантов не найден.');
}

// Основная функция
async function playGames(page: Page) {
  for (const id of gameIds) {
    const gameUrl = `https://luckystake.com/game/real/${id}`;
    await page.goto(gameUrl);
    await delay5Seconds();

    // Скрин до кнопки
    let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_before_playnow`, {
      body: screenshot,
      contentType: 'image/png'
    });

    // Нажимаем "Play now"
    await page.getByRole('button', { name: 'Play now' }).click();
    await delay5Seconds();

    // Ждём загрузку
    try {
      await page.waitForLoadState('networkidle', { timeout: 50000 });
    } catch {
      console.warn('⏱️ Network idle не наступил за 50 сек, продолжаем...');
    }

    await delay10Seconds();
    await clickGameButton(page);
    await delay5Seconds();

    // Скрин после
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_after_play`, {
      body: screenshot,
      contentType: 'image/png'
    });

    await delay5Seconds();
  }
}

test('@ClickOnAdditionalStep Platipus', async ({ context }) => {
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