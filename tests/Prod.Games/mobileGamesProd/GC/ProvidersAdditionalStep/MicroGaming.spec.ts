import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../../pages/LoginPage';
import { HomePage } from '../../../../../pages/HomePage';
import { GamePage } from '../../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../../utils/utils';

// массив ID игр
const gameIds = [
  "35158",
  "35143",
  "35195",
  "35193",
  "35167",
  "35163",
  "35162"
];

// координаты для кликов
const gameClickMap: Record<string, { selector: string, x: number, y: number }> = {
  "35158": { selector: '#GameCanvas', x: 194, y: 445 },
  "35143": { selector: '#gameCanvas', x: 196, y: 519 },
  "35195": { selector: '#gameCanvas', x: 190, y: 473 },
  "35193": { selector: '#gameCanvas', x: 198, y: 496 },
  "35167": { selector: '#gameCanvas', x: 193, y: 469 },
  "35163": { selector: '#gameCanvas', x: 202, y: 450 },
  "35162": { selector: '#gameCanvas', x: 201, y: 549 }
};



async function playGames(page: Page) {
  for (const id of gameIds) {
    const gameUrl = `https://luckystake.com/game/real/${id}`;
    await page.goto(gameUrl);
    await delay5Seconds();

    // скриншот до Play now
    let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_before_playnow`, {
      body: screenshot,
      contentType: 'image/png'
    });

    // клик по Play now
    await page.getByRole('button', { name: 'Play now' }).click();
    await delay5Seconds();

    try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('⏱️ Network idle не найден, продолжаем...');
    }

    await delay10Seconds();

    // получаем данные для конкретного ID
    const clickData = gameClickMap[id];
    if (clickData) {
      try {
        // находим iframe
        const iframeLocator = page.locator('iframe[title="Real game"]');
        const iframeElement = await iframeLocator.elementHandle();
        if (!iframeElement) {
          console.warn(`⚠️ iframe не найден для игры ${id}`);
          continue;
        }

        // получаем контент фрейма
        const frame = await iframeElement.contentFrame();
        if (!frame) {
          console.warn(`⚠️ contentFrame не получен для игры ${id}`);
          continue;
        }

        console.log(`🖱️ Клик по игре ${id} (${clickData.selector}) в (${clickData.x}, ${clickData.y})`);

        await frame.locator(clickData.selector).click({
          position: { x: clickData.x, y: clickData.y },
          force: true
        });

        await delay5Seconds();
      } catch (err) {
        console.warn(`⚠️ Ошибка при клике по игре ${id}: ${err}`);
      }
    }

    await delay10Seconds();
    
    // скриншот после
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_after_wait`, {
      body: screenshot,
      contentType: 'image/png'
    });

    await delay5Seconds();
  }
}


test('@ClickOnAdditionalStepMobile Microgaming', async ({ page }) => {
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
  // запуск игр
  await playGames(page);
});
