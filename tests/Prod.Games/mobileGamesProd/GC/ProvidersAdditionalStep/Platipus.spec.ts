import { test, Page } from '@playwright/test';
import { LoginPage } from '../../../../../pages/LoginPage';
import { HomePage } from '../../../../../pages/HomePage';
import { GamePage } from '../../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../../utils/utils';


const gameIds = [
  22167, 3788, 35675, 3787, 13527, 22548, 14875, 13529, 3737, 3752, 3729, 3744, 13530, 3741, 3724,
  35547, 35549, 21434, 3755, 3746, 3731, 3727, 3751, 3750, 3730, 3786,
  3722, 13534, 3757, 3721, 3753, 3743, 3739, 3756, 3738, 3754, 3784, 3720,
  3783, 3726, 3785, 22773, 23276, 35674, 3733, 3735, 3758, 22346, 35676,
  13537, 13533, 13531, 13528, 13538, 13526, 13535, 13532, 3748, 3723, 3742, 3734,
  3747, 3749, 3782, 3732, 3719, 3759, 3718, 3740, 3725, 3736, 3717, 3728, 23887,
  3745, 24166, 13536
];

async function clickGameButton(page: Page) {
  const frameHandle = await page.locator('iframe[title="Real game"]').contentFrame();

  if (!frameHandle) {
    console.warn('⚠️ Iframe не найден.');
    return;
  }

  //  checking "START"
  try {
    const startButton = frameHandle.getByRole('button', { name: 'START', exact: true });
    if (await startButton.count() > 0) {
      await startButton.first().click();
      console.log('Найдена и нажата кнопка "START".');
      return;
    }
  } catch (err) {
    console.warn('Ошибка при поиске кнопки START:', err);
  }

  //  Проверяем наличие кнопки ".preloader_startBtnBg"
  try {
    const preloaderBtn = frameHandle.locator('.preloader_startBtnBg');
    if (await preloaderBtn.count() > 0) {
      await preloaderBtn.first().click();
      console.log('Найдена и нажата кнопка ".preloader_startBtnBg".');
      return;
    }
  } catch (err) {
    console.warn('Ошибка при поиске кнопки .preloader_startBtnBg:', err);
  }

  // 3. Возможные варианты кнопок/областей (резерв)
  const clickOptions = [
    { selector: '#hud-canvas', x: 194, y: 425 },
    { selector: '#hud-canvas', x: 199, y: 430 },
    { selector: '#hud-canvas', x: 195, y: 423 },
    { selector: '#hud-canvas', x: 190, y: 420 },
    { selector: '#hud-canvas', x: 190, y: 422 },
    { selector: '#hud-canvas', x: 194, y: 429 },
    { selector: '#hud-canvas', x: 196, y: 412 },
    { selector: '#hud-canvas', x: 195, y: 429 },
    { selector: '#hud-canvas', x: 191, y: 422 },
    { selector: '#hud-canvas', x: 194, y: 425 },
    { selector: '#hud-canvas', x: 199, y: 430 },
    { selector: '#hud-canvas', x: 195, y: 423 },
    { selector: '#hud-canvas', x: 190, y: 420 },
    { selector: '#hud-canvas', x: 190, y: 422 },
    { selector: '#hud-canvas', x: 194, y: 429 },
    { selector: '#hud-canvas', x: 196, y: 412 },
    { selector: '#hud-canvas', x: 195, y: 429 },
    { selector: '#hud-canvas', x: 191, y: 422 },
    { selector: '#canvas', x: 193, y: 423 },
    { selector: '#preloader-frame', buttonText: 'CONTINUE' },
    { selector: '.preloader_startBtnBg' },
    { selector: '#continueDivBtn' },
    { selector: 'text=START' }
  ];

//   await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();


  // 4. Перебираем все возможные варианты
  for (const option of clickOptions) {
    try {
      if (option.buttonText) {
        const innerFrame = await frameHandle.locator(option.selector).contentFrame();
        const button = innerFrame?.getByRole('button', { name: option.buttonText, exact: true });
        if (button && (await button.count()) > 0) {
          await button.first().click();
          console.log(`button is clicked "${option.buttonText}" в ${option.selector}`);
          return;
        }
      } else if (option.selector && (await frameHandle.locator(option.selector).count()) > 0) {
        const target = frameHandle.locator(option.selector);
        if (option.x && option.y) {
          await target.click({ position: { x: option.x, y: option.y } });
          console.log(`🎯 Клик по ${option.selector} (${option.x}, ${option.y})`);
          return;
        } else {
          await target.first().click();
          console.log(`click on ${option.selector}`);
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
      console.warn('Network idle is not reached after 50 sec, continue...');
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

test('@ClickOnAdditionalStepMobile Platipus', async ({ page }) => {
   await page.goto('https://luckystake.com/');

  await page.getByTestId('login-header').click();
  await page.getByTestId('email-input-login').click();
  await page.getByTestId('email-input-login').fill('wiztest+80001@gmail.com');
  await page.getByTestId('password-input-login').click();
  await page.getByTestId('password-input-login').fill('Qwerty1!');
  await page.getByTestId('submit-button-login').click();

    await delay5Seconds();

  await page.goto('https://luckystake.com/');
       const scImage = page.getByRole('img', { name: 'SC', exact: true });
        if (await scImage.isVisible()) {
          await scImage.scrollIntoViewIfNeeded();
          await scImage.click({ force: true });
          console.log('Клик по SC');
        }
      
        await delay5Seconds();
  // Запуск игр
  await playGames(page);
});
