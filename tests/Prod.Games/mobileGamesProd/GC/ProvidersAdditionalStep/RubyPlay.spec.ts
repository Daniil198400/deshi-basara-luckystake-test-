import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../../pages/LoginPage';
import { HomePage } from '../../../../../pages/HomePage';
import { GamePage } from '../../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../../utils/utils';


const gameIds = [
  "24178", "24177", "24176", "24175", "24174", "24173", "34331", "35555", "34484",
  "24172", "24170", "38810", "24168", "24171", "40494", "24205", "24202", "24201",
  "24200", "24198", "24197", "24196", "24195", "24193", "24192", "24191", "24190",
  "24217", "24219", "24220", "24221", "24222", "24223", "24224", "24225", "24226",
  "24229", "24230", "24231", "24232", "24233", "24234", "24235", "24236", "24237",
  "24238", "24239", "24240", "24241", "24242", "24243", "24244", "24245", "24246",
  "24247", "24248", "24249", "24250", "24251", "24253", "24267", "24333", "24337",
  "24194", "24227", "24228", "24427", "26213", "34489", "34490", "34491", "34492",
  "34493", "34494", "34495", "34496", "34497", "34498", "34499", "34500", "34501",
  "34502", "34503", "34504", "34505", "34506", "34507", "34508", "34509", "34510",
  "34511", "34512", "34513", "34514", "34515", "34517", "34518", "34519", "24431",
  "24189", "24188", "24187", "24186", "24185", "24184", "24183", "24182", "24181",
  "24179", "24215", "24214", "24212", "24208", "24207", "24203", "38815", "40491",
  "40492", "40493", "24216"
];

async function clickInsideIframe(page: Page) {
  const frame = await page.locator('iframe[title="Real game"]').contentFrame();
  if (!frame) {
    console.warn('⚠️ iframe не найден');
    return;
  }

  const canvas = frame.locator('canvas');

  const clickPositions = [
    { x: 202, y: 399 },
    { x: 194, y: 461 },
    { x: 190, y: 481 },
    { x: 197, y: 481 },
    { x: 200, y: 560 },
    { x: 209, y: 440 },
    { x: 220, y: 420 },
    { x: 218, y: 410 },
    { x: 215, y: 460 }
  ];


  await page.locator('iframe[title="Real game"]').contentFrame().locator('canvas').click({
    position: {
      x: 202,
      y: 398
    }
  });


  await page.locator('iframe[title="Real game"]').contentFrame().locator('canvas').click({
    position: {
      x: 194,
      y: 461
    }
  });




  for (const pos of clickPositions) {
    try {
      await canvas.click({ position: pos });
      console.log(`🖱️ Клик по координатам: x=${pos.x}, y=${pos.y}`);
      await page.waitForTimeout(1000 + Math.floor(Math.random() * 1000)); // пауза 1–2 секунды
    } catch (err) {
      console.warn(`⚠️ Ошибка при клике по координатам (${pos.x}, ${pos.y}):`, err);
    }
  }
}

// main function
async function playGames(page: Page) {
  for (const id of gameIds) {
    const gameUrl = `https://luckystake.com/game/real/${id}`;
    console.log(`🎮 Открываем игру: ${gameUrl}`);
    await page.goto(gameUrl);
    await delay5Seconds();

    // screenshot of Play now
    let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_before_playnow`, {
      body: screenshot,
      contentType: 'image/png'
    });

    // click on "Play now"
    await page.getByRole('button', { name: 'Play now' }).click();

    try {
      await page.waitForLoadState('networkidle', { timeout: 320000 });
    } catch {
      console.warn('Network idle did not appeared after 32 sec, continue...');
    }

    await delay10Seconds();
    await delay10Seconds();

    // launching the function with clicks inside iframe
    await clickInsideIframe(page);

    // waiting 
    await delay10Seconds();

    // Скриншот после кликов
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_after_clicks`, {
      body: screenshot,
      contentType: 'image/png'
    });
  }
}

// ===== test =====
await delay5Seconds();

test('@ClickOnAdditionalStepMobile Rubyplay', async ({ context }) => {
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const gamePage = new GamePage(page);

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
});
