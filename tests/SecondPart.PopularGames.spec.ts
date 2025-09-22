import { test as base, Page, expect } from '@playwright/test';

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

// --- Helper: Close Chat Widget if visible ---
async function closeChatWidget(page: Page) {
  try {
    const chatFrameLocator = page.locator('iframe[name="chat-widget-minimized"]').first();
    if (await chatFrameLocator.isVisible({ timeout: 2000 })) {
      const chatFrame = await chatFrameLocator.contentFrame();
      if (chatFrame) {
        const hideGreeting = chatFrame.getByRole('button', { name: 'Hide greeting' });
        if (await hideGreeting.isVisible({ timeout: 2000 })) {
          await hideGreeting.click();
        }
      }
    }
  } catch {
    // ignore if no chat widget
  }
}

// --- Helper: Load all games until no "Load More" button left ---
async function loadAllGames(page: Page) {
  await page.waitForTimeout(5000); // wait 5s before starting

  while (true) {
    const loadMoreBtn = page.getByRole('button', { name: 'Load More' });
    if (!(await loadMoreBtn.isVisible()) || !(await loadMoreBtn.isEnabled())) break;

    const cards = page.locator('div.WizGameCard_container__ibRAW');
    const beforeCount = await cards.count();

    await loadMoreBtn.click();

    // Wait until new games are appended
    await page.waitForFunction(
      (oldCount) => document.querySelectorAll('div.WizGameCard_container__ibRAW').length > oldCount,
      beforeCount,
      { timeout: 15000 }
    );

    await page.waitForTimeout(500); // short delay to avoid race conditions
  }
}

// --- Play game by name and take screenshot ---
async function playGameByName(page: Page, gameName: string, screenshotPrefix: string, testInfo) {
  await closeChatWidget(page);

  const gameCard = page
    .locator('div.WizGameCard_container__ibRAW:has(.WizGameCard_container_gameImage__cFsR9)', { hasText: gameName })
    .first();

  await expect(gameCard).toBeVisible({ timeout: 30000 });

  await gameCard.evaluate((el: HTMLElement) => el.scrollIntoView({ block: 'center' }));
  await gameCard.click({ force: true });

  const playBtn = page.getByRole('button', { name: 'Play now' });
  await expect(playBtn).toBeVisible({ timeout: 20000 });
  await playBtn.click({ force: true });

  // Wait until game canvas/iframe is visible
  await page.waitForSelector('iframe, canvas', { timeout: 15000 });

  // 🔹 Wait 10s to let the game fully load for screenshot
  await page.waitForTimeout(10000);

  const safeName = gameName.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
  const screenshotName = `${screenshotPrefix}-${safeName}.png`;

  const screenshot = await page.screenshot({ fullPage: true });
  await testInfo.attach(screenshotName, { body: screenshot, contentType: 'image/png' });

  const backBtn = page.getByTestId('ArrowBackIosIcon');
  await expect(backBtn).toBeVisible({ timeout: 10000 });
  await backBtn.click({ force: true });

  await page.waitForTimeout(1000);

  await loadAllGames(page); // reload games after coming back
}

// --- Test ---
test('Play multiple games', async ({ page }, testInfo) => {
  await page.goto('https://luckystake.dev/');

  await page.getByRole('button', { name: 'LOG IN' }).click();
  await page.getByRole('textbox', { name: 'Email or Username' }).fill('dksld@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Qwerty1!!');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.getByText('Social GamesPopularNew &').click();
  await page.getByRole('navigation').getByRole('link', { name: 'Popular' }).click();

  await loadAllGames(page); // initial 5s wait included

  const games = [
    'Wild Animals',
    'Flamingo Paradise',
    'Frequent Flyer',
    'Firewins Factory',
    'The Great Pigsby Megaways',
    'Titan Strike',
    'Wild Chapo',
    'Wild Chapo 2',
    'Wild Hike',
    'Wild Yield',
    'Winter Champions',
    'Rhino Mania',
    'Tap the Pot',
    'Spins',
    'Wild Spin',
    'Wild Spin Deluxe',
    'Arabian Wins',
    "Bigger Size Fishin'",
  ];

  for (let i = 0; i < games.length; i++) {
    await playGameByName(page, games[i], `screenshot-${i + 1}`, testInfo);
  }
});
