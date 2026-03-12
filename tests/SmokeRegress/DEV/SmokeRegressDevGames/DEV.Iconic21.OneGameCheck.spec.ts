import { test as base, expect } from '@playwright/test';
import { delay5Seconds, delay10Seconds } from '../../../../utils/utils';

// контекст с httpCredentials (для прод)
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

// ——— утилиты ———
async function visible(locator: ReturnType<typeof expect['locator']>['locator'] | any, timeout = 5000) {
  try {
    await locator.waitFor({ state: 'visible', timeout });
    return true;
  } catch {
    return false;
  }
}
async function clickIfVisible(locator: any, timeout = 5000) {
  if (await visible(locator, timeout)) {
    await locator.click();
    return true;
  }
  return false;
}

test('Iconic21', async ({ page }) => {
  await page.goto('https://luckystake.dev/');

  await page.getByTestId('login-header').click();
  await page.getByTestId('email-input-login').fill('dksld111@gmail.com');
  await page.getByTestId('password-input-login').fill('Qwerty1!');
  await page.getByTestId('submit-button-login').click();

await delay5Seconds();

  await page.goto('https://luckystake.dev/game/real/35142');
await delay10Seconds();

  // сscreen before Play now
  let screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('game_before_playNow', { body: screenshot, contentType: 'image/png' });
await delay5Seconds();

  // Play now

await page.getByRole('button', { name: 'Play now' }).click();

  await delay5Seconds();

  try {
    await page.waitForLoadState('networkidle', { timeout: 30000 });
  } catch {
    console.warn('Network idle is not found after 30 sec, keep going...');
  }
  await delay5Seconds();

  // скрин после ожидания
  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('game_after_wait', { body: screenshot, contentType: 'image/png' });

  // Explore games: если нашли и кликнули — пропускаем поиск
  const exploreButton = page.getByRole('button', { name: 'Explore games' });
  let skipSearch = false;
  if (await clickIfVisible(exploreButton, 5000)) {
    await delay5Seconds();
    console.log('Explore games button found and clicked, пропускаем поиск searchButton.');
    skipSearch = true;
  }


  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('game_after_wait', { body: screenshot, contentType: 'image/png' });
await delay5Seconds();
});
