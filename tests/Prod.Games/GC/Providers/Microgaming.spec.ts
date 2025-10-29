import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { GamePage } from '../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';

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
  "35158": { selector: '#GameCanvas', x: 628, y: 445 },
  "35143": { selector: '#gameCanvas', x: 438, y: 469 },
  "35195": { selector: '#gameCanvas', x: 642, y: 557 },
  "35193": { selector: '#gameCanvas', x: 622, y: 547 },
  "35167": { selector: '#gameCanvas', x: 593, y: 528 },
  "35163": { selector: '#gameCanvas', x: 634, y: 545 },
  "35162": { selector: '#gameCanvas', x: 1085, y: 266 }
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

    // скриншот после
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_after_wait`, {
      body: screenshot,
      contentType: 'image/png'
    });

    await delay5Seconds();
  }
}

await delay5Seconds();

test('@ClickOnAdditionalStep Microgaming', async ({ context }) => {
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const gamePage = new GamePage(page);

  // авторизация
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
  // запуск игр
  await playGames(page);
});
