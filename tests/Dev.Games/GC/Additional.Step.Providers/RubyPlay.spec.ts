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
        "24207",
        "24171",
        "24168",
        "24170",
        "24172",
        "24173",
        "24174",
        "24175",
        "24176",
        "24177",
        "24178",
        "24179",
        "24181",
        "24182",
        "24183",
        "24184",
        "24185",
        "24186",
        "24187",
        "24188",
        "24189",
        "24190",
        "24191",
        "24192",
        "24193",
        "24195",
        "24196",
        "24197",
        "24198",
        "24199",
        "24200",
        "24201",
        "24202",
        "24203",
        "24204",
        "24205",
        "24206",
        "24208",
        "24209",
        "24210",
        "24211",
        "24212",
        "24213",
        "24214",
        "24215",
        "24216",
        "24217",
        "24218",
        "24219",
        "24220",
        "24221",
        "24222",
        "24223",
        "24224",
        "24225",
        "24226",
        "24229",
        "24230",
        "24231",
        "24232",
        "24233",
        "24234",
        "24235",
        "24236",
        "24237",
        "24238",
        "24239",
        "24240",
        "24241",
        "24242",
        "24243",
        "24244",
        "24245",
        "24246",
        "24247",
        "24248",
        "24249",
        "24250",
        "24251",
        "24253",
        "24267",
        "24333",
        "24337",
        "24194",
        "24227",
        "24228",
        "34514"
];

async function clickInsideIframe(page: Page) {
  const frame = await page.locator('iframe[title="Real game"]').contentFrame();
  if (!frame) {
    console.warn('⚠️ iframe не найден');
    return;
  }

  const canvas = frame.locator('canvas');

  const clickPositions = [
    { x: 627, y: 549 },
    { x: 623, y: 525 },
    { x: 625, y: 481 },
    { x: 627, y: 481 },
    { x: 630, y: 560 },
    { x: 620, y: 540 },
    { x: 640, y: 520 },
    { x: 610, y: 500 },
    { x: 635, y: 490 }
  ];

  for (const pos of clickPositions) {
    try {
      await canvas.click({ position: pos });
      console.log(`Клик по координатам: x=${pos.x}, y=${pos.y}`);
      await page.waitForTimeout(1000 + Math.floor(Math.random() * 1000)); // пауза 1–2 секунды
    } catch (err) {
      console.warn(`Ошибка при клике по координатам (${pos.x}, ${pos.y}):`, err);
    }
  }
}

// function
async function playGames(page: Page) {
  for (const id of gameIds) {
    const gameUrl = `https://luckystake.dev/game/real/${id}`;
    await page.goto(gameUrl);
    await delay5Seconds();

    // screenshot before Play now button
    let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_before_playNow`, {
      body: screenshot,
      contentType: 'image/png',
    });

    // click on Play now
    await page.getByRole('button', { name: 'Play now' }).click();
try {
  await page.waitForLoadState('networkidle', { timeout: 30000 }); 
} catch (e) {
  console.warn('Network idle is not found after 30 sec, keep going...');
}
    await delay10Seconds();


    // launching the function with clicks inside iframe
    await clickInsideIframe(page);


    await delay5Seconds();
    // второй скриншот
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_after_wait`, {
      body: screenshot,
      contentType: 'image/png',
    });

    await delay5Seconds();
  }
};
  


test('@providersDev 4ThePlayer', async ({ page }) => {
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
