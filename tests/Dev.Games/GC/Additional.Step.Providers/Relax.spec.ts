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
        "21055",
        "22703",
        "28622",
        "28545",
        "28551",
        "28555",
        "28574",
        "28587",
        "28605",
        "21054",
        "25115",
        "22144",
        "21067",
        "21070",
        "21069",
        "21068",
        "21065",
        "21064",
        "21063",
        "21062",
        "21061",
        "21060",
        "21059",
        "21058",
        "21056",
        "21053",
        "21052",
        "21051",
        "21050",
        "21049",
        "21048",
        "21046",
        "21044",
        "21043",
        "21042",
        "21041",
        "21040",
        "21039",
        "21038",
        "21037",
        "21036",
        "21035",
        "21034",
        "21032",
        "21031",
        "21030",
        "21029",
        "21027",
        "21026",
        "21024",
        "21023",
        "21022",
        "21020",
        "21019",
        "21018",
        "21017",
        "21016",
        "21015",
        "21014",
        "21012",
        "23224",
        "14814",
        "28532",
        "28533",
        "28534",
        "28535",
        "28536",
        "28537",
        "28538",
        "28539",
        "28542",
        "28543",
        "28544",
        "28546",
        "28547",
        "28548",
        "28549",
        "28550",
        "28552",
        "28554",
        "28558",
        "28559",
        "28560",
        "28561",
        "28562",
        "28563",
        "28564",
        "28565",
        "28567",
        "28568",
        "28569",
        "28570",
        "28571",
        "28573",
        "28575",
        "28576",
        "28577",
        "28578",
        "28579",
        "28580",
        "28581",
        "28582",
        "28583",
        "28584",
        "28586",
        "28588",
        "28589",
        "28590",
        "28591",
        "28592",
        "28593",
        "28596",
        "28597",
        "28598",
        "28599",
        "28600",
        "28601",
        "28602",
        "28603",
        "28604",
        "28606",
        "28607",
        "28609",
        "28611",
        "28612",
        "28613",
        "28614",
        "28615",
        "28616",
        "28617",
        "28618",
        "28619",
        "28620",
        "28621"
];
// Типизация возможных целей клика
type ClickCandidate =
  | { type: 'role'; role: string; name: string; exact?: boolean }
  | { type: 'text'; value: string }
  | { type: 'selector'; selector: string };

// Координаты для кликов по canvas
const canvasPoints = [
  { x: 580, y: 590 }, { x: 593, y: 589 }, { x: 580, y: 594 },
  { x: 618, y: 603 }, { x: 602, y: 581 }, { x: 589, y: 587 },
  { x: 582, y: 586 }, { x: 619, y: 590 }, { x: 581, y: 587 },
  { x: 585, y: 573 }, { x: 590, y: 588 }, { x: 585, y: 587 },
  { x: 568, y: 581 }, { x: 589, y: 593 }, { x: 589, y: 597 },
  { x: 603, y: 576 }, { x: 587, y: 605 }, { x: 589, y: 598 },
  { x: 574, y: 591 }, { x: 577, y: 597 }
];

// Основная функция клика
async function clickGameElement(page: Page) {
  const outerFrameHandle = await page.locator('iframe[title="Real game"]').elementHandle();
  if (!outerFrameHandle) return;

  const outerFrame = await outerFrameHandle.contentFrame();
  if (!outerFrame) return;

  const gameFrameHandle = await outerFrame.locator('#game').elementHandle();
  if (!gameFrameHandle) return;

  const gameFrame = await gameFrameHandle.contentFrame();
  if (!gameFrame) return;

  const candidates: ClickCandidate[] = [
    { type: 'role', role: 'button', name: 'START', exact: true },
    { type: 'text', value: 'Click to continue' },
    { type: 'text', value: 'CLICK TO CONTINUE' },
    { type: 'text', value: 'START' },
    { type: 'selector', selector: '.logo' },
    { type: 'selector', selector: '.fadeOverlay' },
    { type: 'selector', selector: '.gameLogo' },
    { type: 'selector', selector: 'canvas' },
    { type: 'selector', selector: '#test-id canvas' }
  ];

  for (const c of candidates) {
    try {
      if (c.type === 'role') {
        const el = gameFrame.getByRole(c.role as any, { name: c.name, exact: c.exact ?? false });
        if (await el.count()) {
          await el.first().click({ force: true });
          console.log(`Клик по кнопке: ${c.name}`);
          return;
        }
      } else if (c.type === 'text') {
        const el = gameFrame.getByText(c.value, { exact: false });
        if (await el.count()) {
          await el.first().click({ force: true }); // force применён
          console.log(` Клик по тексту: ${c.value}`);
          return;
        }
      } else if (c.type === 'selector') {
        const el = gameFrame.locator(c.selector);
        if (await el.count()) {
          if (c.selector.includes('canvas')) {
            const { x, y } = canvasPoints[Math.floor(Math.random() * canvasPoints.length)];
            await el.first().click({ position: { x, y }, force: true });
            console.log(`Клик по canvas (${x}, ${y})`);
          } else {
            await el.first().click({ force: true });
            console.log(`Клик по селектору: ${c.selector}`);
          }
          return;
        }
      }
    } catch (err) {
      console.warn(`Ошибка при клике по ${JSON.stringify(c)}: ${err}`);
    }
  }

  // принудительный клик по 'START'
  try {
    await gameFrame.getByText('START').click({ force: true });
    console.log(`Фоллбек клик по START`);
  } catch {}
}

// Основная функция прохождения игр
async function playGames(page: Page) {
  for (const id of gameIds) {
    const gameUrl = `https://luckystake.dev/game/real/${id}`;
    console.log(`Открываем игру: ${gameUrl}`);

    await page.goto(gameUrl);
    await delay5Seconds();

    let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_before_playnow`, {
      body: screenshot,
      contentType: 'image/png'
    });

      await page.getByRole('button', { name: 'Play now' }).click({ force: true }); 

    await delay5Seconds();

    try {
      await page.waitForLoadState('networkidle', { timeout: 40000 });
    } catch {
      console.warn('Network idle не наступил за 20 сек, продолжаем...');
    }

    await delay5Seconds();

    await clickGameElement(page);

    await delay5Seconds();

    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_after_click`, {
      body: screenshot,
      contentType: 'image/png'
    });

    console.log(`Игра ${id} завершена`);
    await delay5Seconds();
  }
}
  


test('@providersDev Relax', async ({ page }) => {
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