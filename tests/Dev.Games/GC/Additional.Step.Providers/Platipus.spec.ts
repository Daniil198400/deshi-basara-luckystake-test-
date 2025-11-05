import { test as base, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { GamePage } from '../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';

// расширяем test, добавляем httpCredentials
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

// array of IDs
const gameIds = [
        "3759",
        "3741",
        "3744",
        "3750",
        "3729",
        "27037",
        "23888",
        "23887",
        "3786",
        "3722",
        "3757",
        "3721",
        "3761",
        "3794",
        "3789",
        "3753",
        "3788",
        "3767",
        "3743",
        "3739",
        "3756",
        "3764",
        "3738",
        "3752",
        "3803",
        "3804",
        "3801",
        "3805",
        "3802",
        "3800",
        "3730",
        "3737",
        "24166",
        "3787",
        "3795",
        "3791",
        "3776",
        "3781",
        "27727",
        "3770",
        "27867",
        "13533",
        "28651",
        "13531",
        "27868",
        "3777",
        "13528",
        "13538",
        "13526",
        "13535",
        "13532",
        "3748",
        "3723",
        "3790",
        "3792",
        "3742",
        "3758",
        "3720",
        "3783",
        "3726",
        "3775",
        "3785",
        "3796",
        "3778",
        "22773",
        "3735",
        "3765",
        "23276",
        "3774",
        "3734",
        "3762",
        "3772",
        "3797",
        "3763",
        "13527",
        "22548",
        "14875",
        "3747",
        "27033",
        "33173",
        "24030",
        "23988",
        "23277",
        "3749",
        "3782",
        "3779",
        "3732",
        "3719",
        "3771",
        "3768",
        "21433",
        "3718",
        "23232",
        "25110",
        "3740",
        "25333",
        "3746",
        "25506",
        "3784",
        "3793",
        "25541",
        "3731",
        "25581",
        "3760",
        "3754",
        "13530",
        "13529",
        "13536",
        "13534",
        "13537",
        "3727",
        "3751",
        "22346",
        "22167",
        "3725",
        "21434",
        "21354",
        "21352",
        "3769",
        "3736",
        "3780",
        "3717",
        "3773",
        "3728",
        "3766",
        "3745",
        "3733",
        "3755",
        "3724",
        "26403"
];


// Универсальная функция, которая ищет и кликает по любому доступному элементу
async function clickGameButton(page: Page) {
  const frameHandle = await page.locator('iframe[title="Real game"]').contentFrame();

  if (!frameHandle) {
    console.warn(' Iframe не найден.');
    return;
  }

  //  1. Проверяем наличие кнопки "START"
  try {
    const startButton = frameHandle.getByRole('button', { name: 'START', exact: true });
    if (await startButton.count() > 0) {
      await startButton.first().click();
      console.log('Найдена и нажата кнопка "START".');
      return;
    }
  } catch (err) {
    console.warn(' Ошибка при поиске кнопки START:', err);
  }

  //  2. Проверяем наличие кнопки ".preloader_startBtnBg"
  try {
    const preloaderBtn = frameHandle.locator('.preloader_startBtnBg');
    if (await preloaderBtn.count() > 0) {
      await preloaderBtn.first().click();
      console.log(' Найдена и нажата кнопка ".preloader_startBtnBg".');
      return;
    }
  } catch (err) {
    console.warn(' Ошибка при поиске кнопки .preloader_startBtnBg:', err);
  }

  // 3. Возможные варианты кнопок/областей (резерв)
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

  // 4. Перебираем все возможные варианты
  for (const option of clickOptions) {
    try {
      if (option.buttonText) {
        const innerFrame = await frameHandle.locator(option.selector).contentFrame();
        const button = innerFrame?.getByRole('button', { name: option.buttonText, exact: true });
        if (button && (await button.count()) > 0) {
          await button.first().click();
          console.log(` Нажата кнопка "${option.buttonText}" в ${option.selector}`);
          return;
        }
      } else if (option.selector && (await frameHandle.locator(option.selector).count()) > 0) {
        const target = frameHandle.locator(option.selector);
        if (option.x && option.y) {
          await target.click({ position: { x: option.x, y: option.y } });
          console.log(` Клик по ${option.selector} (${option.x}, ${option.y})`);
          return;
        } else {
          await target.first().click();
          console.log(` Клик по ${option.selector}`);
          return;
        }
      }
    } catch (err) {
      continue;
    }
  }

  console.warn(' Ни один из вариантов не найден.');
}

// Основная функция
async function playGames(page: Page) {
  for (const id of gameIds) {
    const gameUrl = `https://luckystake.dev/game/real/${id}`;
    await page.goto(gameUrl);
    await delay5Seconds();

    // Скрин до кнопки
    let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_before_playnow`, {
      body: screenshot,
      contentType: 'image/png'
    });
    await delay5Seconds();

    await page.getByRole('button', { name: 'Play now' }).click();

    await delay5Seconds();

    // Ждём загрузку
    try {
      await page.waitForLoadState('networkidle', { timeout: 50000 });
    } catch {
      console.warn('Network idle не наступил за 50 сек, продолжаем...');
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


test('@providersDev Platipus', async ({ page }) => {
     /**
 * Clicks the "close" button if it exists on the page.
 * @param {import('@playwright/test').Page} page - The Playwright page object.
 */
async function clickCloseIfPresent(page: Page) {
  const closeButton = page.getByRole('img', { name: 'close' });
  if (await closeButton.count() > 0) {
    await closeButton.first().click();
    console.log('Close button clicked');
  } else {
    console.log('Close button not found, skipping click');
  }
}

// await clickCloseIfPresent(page);

  await page.goto('https://luckystake.dev/');
  await page.getByTestId('login-header').click();
  await page.getByTestId('email-input-login').click();
  await page.getByTestId('email-input-login').fill('dksld123@gmail.com');
  await page.getByTestId('password-input-login').click();
  await page.getByTestId('password-input-login').fill('Qwerty1!');
  await page.getByTestId('submit-button-login').click();
  await delay5Seconds();

  await clickCloseIfPresent(page);
  await delay5Seconds();
  const scImage = page.getByRole('img', { name: 'SC', exact: true });
        if (await scImage.isVisible()) {
          await scImage.scrollIntoViewIfNeeded();
          await scImage.click({ force: true });
          console.log('click on GC');
        }
      await delay5Seconds();  
  // launching the games
  await playGames(page);
});
