import { test as base, expect } from '@playwright/test';
import { delay5Seconds, delay10Seconds } from '../../../../utils/utils';

// контекст без httpCredentials (как у тебя)
const test = base.extend<{}>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({});
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

test('Max win Gaming', async ({ page }) => {
  await page.goto('https://luckystake.com/');
await delay5Seconds();
  await page.getByTestId('login-header').click();
  await delay5Seconds();
  await page.getByTestId('email-input-login').fill('dksld1@gmail.com');
  await delay5Seconds();
  await page.getByTestId('password-input-login').fill('Qwerty1!');
  await delay5Seconds();
  await page.getByTestId('submit-button-login').click();
await delay10Seconds();

  await page.goto('https://luckystake.com/game/real/28508');
await delay10Seconds();

  // сscreen before Play now
  let screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('game_before_playNow', { body: screenshot, contentType: 'image/png' });
await delay5Seconds();

  // Play now

await page.getByRole('button', { name: 'Play now' }).click();

  await delay5Seconds();

  try {
    await page.waitForLoadState('networkidle', { timeout: 10000 });
  } catch {
    console.warn('Network idle is not found after 10 sec, keep going...');
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

  // поиск — только если не было Explore
  if (!skipSearch) {
    const searchButton = page.getByRole('button').filter({ hasText: /^$/ });
    if (await visible(searchButton.first(), 3000)) {
      await searchButton.first().click();

      try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('Network idle is not found after 10 sec, keep going...');
      }
      await delay5Seconds();

      const shot = await page.screenshot({ fullPage: true });
      test.info().attach('game_after_search_button', { body: shot, contentType: 'image/png' });

      if (await visible(searchButton.nth(1), 5000)) {
        await searchButton.nth(1).click();
      }
    }
  }

  // buy flow
  const buyButton = page.getByRole('button', { name: 'buy' });
  if (await clickIfVisible(buyButton, 10000)) {
    try {
      await page.waitForLoadState('networkidle', { timeout: 5000 });
    } catch {
      console.warn('Network idle is not found after 10 sec, keep going...');
    }
    await delay5Seconds();

    const shot = await page.screenshot();
    test.info().attach('game_buy_button', { body: shot, contentType: 'image/png' });

    const prices = ['$1.99', '$4.99', '$9.99', '$24.99', '$34.99'];
    const randomPrice = prices[Math.floor(Math.random() * prices.length)];
    const priceButton = page.getByRole('button', { name: randomPrice });

    if (await clickIfVisible(priceButton, 10000)) {
      console.log(`Click on price button: ${randomPrice}`);

      try {
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      } catch {
        console.warn('Network idle is not found after 10 sec, keep going...');
      }
      await delay10Seconds();

      const afterPrice = await page.screenshot({ fullPage: true });
      test.info().attach('game_card_proposition_after_clicking_on_random_price', {
        body: afterPrice,
        contentType: 'image/png',
      });

      
      // await page.locator('iframe[title="WizCashier"]').contentFrame().locator('div').filter({ hasText: /^Credit Card$/ }).first().click();


      const confirmButton = page.getByRole('button').nth(2);
      if (await visible(confirmButton, 10000)) {
        await confirmButton.click();
      } else {
        console.log(`Confirm button для ${randomPrice} не найден, пропускаем...`);
      }
    } else {
      console.log(`Кнопка с ценой ${randomPrice} не найдена, пропускаем...`);
    }
  }

  await delay10Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('game_after_wait', { body: screenshot, contentType: 'image/png' });
await delay5Seconds();
});
