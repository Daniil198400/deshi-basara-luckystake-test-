import { test as base, Page, expect, devices } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { delay5Seconds, delay10Seconds } from '../../../../utils/utils';

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

async function clickRandomPrice(page: Page) {
  const prices = ["$1.99", "$4.99", "$9.99", "$24.99", "$34.99"];
  const randomPrice = prices[Math.floor(Math.random() * prices.length)];
  const priceButton = page.getByRole('button', { name: randomPrice });

  if ((await priceButton.count()) > 0) {
    await priceButton.waitFor({ state: 'visible', timeout: 10000 });
    console.log(`Click on price button: ${randomPrice}`);
    await priceButton.click();
    await page.waitForLoadState('networkidle');
    await delay10Seconds();
  } else {
    console.log(`Кнопка с ценой ${randomPrice} не найдена`);
  }
}

test('additional step test Dev GC', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  // --- Логин ---
  await page.goto('https://luckystake.dev/');
  await homePage.closePopupIfVisible();
  await loginPage.openLoginForm();
  await loginPage.login('dksld1@gmail.com', 'Qwerty1!!');
  await delay5Seconds();

  await page.getByText('Social Games').click();
  await page.getByRole('link', { name: 'Providers' }).click();

  // --- Game 23277 ---=================================================================
  
  await page.goto('https://luckystake.dev/game/real/23277');
  let screenshot = await page.screenshot({ fullPage: true });
  test.info().attach(`game23277_before_playNow`, {
    body: screenshot,
    contentType: 'image/png',
  });

  await page.waitForLoadState('networkidle');

  await page.getByRole('button', { name: 'Play now' }).click();
  await delay10Seconds();
  await delay10Seconds();

  await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas').click({
    position: { x: 619, y: 557 },
  });

  await delay10Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach(`game23277_after_playNow`, {
    body: screenshot,
    contentType: 'image/png',
  });

  // searching button
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
await delay10Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach(`game23277_after_searching_button`, {
    body: screenshot,
    contentType: 'image/png',
  });

  await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
  await delay5Seconds();
  await page.getByRole('button', { name: 'buy' }).click();
  await delay10Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach(`game23277_after_buy_Button`, {
    body: screenshot,
    contentType: 'image/png',
  });

  await clickRandomPrice(page);

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach(`game23277_after_price_Button`, {
    body: screenshot,
    contentType: 'image/png',
  });

  await page.getByRole('button').nth(2).click();
  await page.getByTestId('ArrowBackIosIcon').click();
  await delay10Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach(`game23277_after_clicking_Back`, {
    body: screenshot,
    contentType: 'image/png',
  });

  // --- Game 23232 ---==============================================================

  await page.goto('https://luckystake.dev/game/real/23232');
  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach(`game_before_playNow`, {
    body: screenshot,
    contentType: 'image/png',
  });

  await delay10Seconds();
  await delay10Seconds();

  await page.getByRole('button', { name: 'Play now' }).click();
  await delay10Seconds();
  await delay10Seconds();

  await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas').click({
    position: { x: 619, y: 557 },
  });

  await delay10Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach(`game_after_playNow`, {
    body: screenshot,
    contentType: 'image/png',
  });

  // searching button
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.waitForLoadState('networkidle');

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach(`game_after_searching_button`, {
    body: screenshot,
    contentType: 'image/png',
  });

  await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
  await delay5Seconds();
  await page.getByRole('button', { name: 'buy' }).click();
  await page.waitForLoadState('networkidle');


  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach(`game_after_buy_Button`, {
    body: screenshot,
    contentType: 'image/png',
  });

  await clickRandomPrice(page);

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach(`game_after_price_Button`, {
    body: screenshot,
    contentType: 'image/png',
  });

  await page.getByRole('button').nth(2).click();
  await page.getByTestId('ArrowBackIosIcon').click();
  await page.waitForLoadState('networkidle');

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach(`game23232_after_clicking_Back`, {
    body: screenshot,
    contentType: 'image/png',
  });

  

});


