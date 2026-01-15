import { test as base, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { HomePage } from '../../../pages/HomePage';
import { delay5Seconds, delay10Seconds } from '../../../utils/utils';

// --- утилиты ---
async function waitAndScreenshot(page: Page, name: string) {
  try {
    await page.waitForLoadState('networkidle', { timeout: 10000 });
  } catch {
    console.warn('Network idle is not found after 10 сек, continue...');
  }
  await delay5Seconds();
  const screenshot = await page.screenshot({ fullPage: true });
  test.info().attach(name, {
    body: screenshot,
    contentType: 'image/png',
  });
}

async function openProvider(page: Page, providerName: string, shots: string[], loadMoreClicks: number = 0, finalClickText?: string) {
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: providerName }).click();
  await waitAndScreenshot(page, shots[0]);

  for (let i = 0; i < loadMoreClicks; i++) {
    await page.getByRole('button', { name: 'Load More' }).click();
    await waitAndScreenshot(page, shots[i + 1]);
  }

  if (finalClickText) {
    await page.getByText(finalClickText).click();
    await waitAndScreenshot(page, shots[shots.length - 1]);
  }
}

// контекст с httpCredentials
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

test('@CheckPresenceOfGames Mobile Checking All Games Sections', async ({ context }) => {
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  // --- открываем сайт ---
  await page.goto('https://luckystake.com/');

  await page.getByTestId('login-header').click();
  await page.getByTestId('email-input-login').click();
  await page.getByTestId('email-input-login').fill('wiztest+80001@gmail.com');
  await page.getByTestId('password-input-login').click();
  await page.getByTestId('password-input-login').fill('Qwerty1!');
  await page.getByTestId('submit-button-login').click();
  await delay10Seconds();


  await page.getByRole('img', { name: 'close' }).click();

  await waitAndScreenshot(page, 'after_login');

  // --- поиск и все провайдеры ---
  await page.getByRole('button').filter({ hasText: 'Search' }).click();
  await page.getByRole('button', { name: 'Providers 22' }).click();
  await waitAndScreenshot(page, 'All 22 Providers');


  //rubyplay
  await page.locator('.SearchGames_search_games__cards_wrapper__CRmvI > a').first().click();

  await page.getByText('At luckystake.com it is').click();
await page.getByRole('button').filter({ hasText: /^$/ }).click();



//relax
await page.getByRole('link', { name: 'Relax' }).click();

  await page.getByText('At luckystake.com it is').click();
await page.getByRole('button').filter({ hasText: /^$/ }).click();



//penguin king
await page.getByRole('link', { name: 'Penguin King' }).click();

  await page.getByText('At luckystake.com it is').click();
await page.getByRole('button').filter({ hasText: /^$/ }).click();


//platipus
await page.getByRole('link', { name: 'Platipus' }).click();

  await page.getByText('At luckystake.com it is').click();
await page.getByRole('button').filter({ hasText: /^$/ }).click();



//spinomenal
await page.getByRole('link', { name: 'Spinomenal' }).click();


  await page.getByText('At luckystake.com it is').click();
await page.getByRole('button').filter({ hasText: /^$/ }).click();


// slotmill

await page.getByRole('link', { name: 'Slotmill' }).click();

  await page.getByText('At luckystake.com it is').click();
await page.getByRole('button').filter({ hasText: /^$/ }).click();


// Playgenx

await page.getByRole('link', { name: 'Playgenx' }).click();

  await page.getByText('At luckystake.com it is').click();
await page.getByRole('button').filter({ hasText: /^$/ }).click();


//

await page.getByRole('link', { name: 'RedRake' }).click();


  await page.getByText('At luckystake.com it is').click();
await page.getByRole('button').filter({ hasText: /^$/ }).click();


//


await page.getByRole('link', { name: 'Playson' }).click();

  await page.getByText('At luckystake.com it is').click();
await page.getByRole('button').filter({ hasText: /^$/ }).click();


//


await page.getByRole('link', { name: 'Iconic21' }).click();

  await page.getByText('At luckystake.com it is').click();
await page.getByRole('button').filter({ hasText: /^$/ }).click();



//

await page.getByRole('link', { name: 'Novomatic' }).click();

  await page.getByText('At luckystake.com it is').click();
await page.getByRole('button').filter({ hasText: /^$/ }).click();



//

await page.getByRole('link', { name: '4ThePlayer' }).click();

  await page.getByText('At luckystake.com it is').click();
await page.getByRole('button').filter({ hasText: /^$/ }).click();


//

await page.getByRole('link', { name: 'Microgaming' }).click();


  await page.getByText('At luckystake.com it is').click();
await page.getByRole('button').filter({ hasText: /^$/ }).click();


//

await page.getByRole('link', { name: 'Gamzix' }).click();

  await page.getByText('At luckystake.com it is').click();
await page.getByRole('button').filter({ hasText: /^$/ }).click();



//

await page.getByRole('link', { name: 'Print Studios' }).click();

  await page.getByText('At luckystake.com it is').click();
await page.getByRole('button').filter({ hasText: /^$/ }).click();


//

await page.getByRole('link', { name: 'Fantasma Games' }).click();


  await page.getByText('At luckystake.com it is').click();
await page.getByRole('button').filter({ hasText: /^$/ }).click();

//


await page.getByRole('link', { name: 'Max Win Gaming' }).click();

  await page.getByText('At luckystake.com it is').click();
await page.getByRole('button').filter({ hasText: /^$/ }).click();

//


await page.getByRole('link', { name: 'Peter & Sons' }).click();

  await page.getByText('At luckystake.com it is').click();
await page.getByRole('button').filter({ hasText: /^$/ }).click();


//

await page.getByRole('link', { name: 'Trigger' }).click();

  await page.getByText('At luckystake.com it is').click();
await page.getByRole('button').filter({ hasText: /^$/ }).click();


//
await page.getByRole('link', { name: 'Four Leaf Gaming' }).click();


  await page.getByText('At luckystake.com it is').click();
await page.getByRole('button').filter({ hasText: /^$/ }).click();



//

await page.getByRole('link', { name: 'Storm Gaming' }).click();


  await page.getByText('At luckystake.com it is').click();
await page.getByRole('button').filter({ hasText: /^$/ }).click();

//

await page.getByRole('link', { name: 'Four7' }).click();


  await page.getByText('At luckystake.com it is').click();
await page.getByRole('button').filter({ hasText: /^$/ }).click();

});
