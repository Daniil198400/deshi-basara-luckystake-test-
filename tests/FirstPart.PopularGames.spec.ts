import { test as base, Page, expect } from '@playwright/test';
import { delay5Seconds, delay10Seconds } from '../utils/utils';

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

// --- Helper: Load More ---
async function loadMoreGames(page: Page) {
  const cards = page.locator('div.WizGameCard_container__ibRAW');
  const beforeCount = await cards.count();

  const loadMoreBtn = page.getByRole('button', { name: 'Load More' });
  if (await loadMoreBtn.isVisible()) {
    await loadMoreBtn.click();
    await page.waitForFunction(
      (oldCount) => {
        const cards = document.querySelectorAll('div.WizGameCard_container__ibRAW');
        return cards.length > oldCount;
      },
      beforeCount,
      { timeout: 15000 }
    );
  }
}

// --- Play game by name and take screenshot ---
async function playGameByName(page: Page, gameName: string, screenshotPrefix: string, testInfo) {
  // Locator for the game card
  const gameCardLocator = () =>
    page.locator('div.WizGameCard_container__ibRAW:has(.WizGameCard_container_gameImage__cFsR9)', { hasText: gameName }).first();

  const gameCard = gameCardLocator();
  await expect(gameCard).toBeAttached({ timeout: 30000 });
  await expect(gameCard).toBeVisible({ timeout: 30000 });

  // Close chat widget if visible
  const chatFrame = await page.locator('iframe[name="chat-widget-minimized"]').first().contentFrame();
  if (chatFrame) {
    const hideGreeting = chatFrame.getByRole('button', { name: 'Hide greeting' });
    if (await hideGreeting.isVisible()) await hideGreeting.click();
  }

  // Scroll into view and click
  await gameCard.evaluate((el: HTMLElement) => el.scrollIntoView({ block: 'center' }));
  await gameCard.click({ force: true });

  // Click "Play now"
  const playBtn = page.getByRole('button', { name: 'Play now' });
  await expect(playBtn).toBeVisible({ timeout: 20000 });
  await playBtn.click({ force: true });

  // Wait a bit for game to load
  await page.waitForTimeout(10000);

  // Create safe filename
  const safeName = gameName.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-');
  const screenshotName = `${screenshotPrefix}-${safeName}.png`;

  // Take screenshot
  const screenshot = await page.screenshot({ fullPage: true });

  // Attach to HTML report
  await testInfo.attach(screenshotName, {
    body: screenshot,
    contentType: 'image/png',
  });

  // Navigate back
  const backBtn = page.getByTestId('ArrowBackIosIcon');
  await expect(backBtn).toBeVisible({ timeout: 10000 });
  await backBtn.click({ force: true });

  await page.waitForTimeout(1000);
}

// --- Test ---
test('Play multiple games', async ({ page }, testInfo) => {
  await page.goto('https://luckystake.dev/');

  // Log in
  await page.getByRole('button', { name: 'LOG IN' }).click();
  await page.getByRole('textbox', { name: 'Email or Username' }).fill('dksld@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Qwerty1!!');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Navigate to Popular
  await page.getByText('Social GamesPopularNew &').click();
  await page.getByRole('navigation').getByRole('link', { name: 'Popular' }).click();

  const games = [
    "Emerald's Infinity Reels",
    'Extra Gems',
    'Book of Luck',
    'Mega Hotfire',
    'Devils Hotfire',
    'Book of Ra',
    'Bass Smash',
    'Barhalla',
    'Bank Busters: The Big Score',
    'Arabian Tales',
    'Aztec Temple',
    'Book of Egypt',
    'Book of Light',
    'Books of Giza',
    'Chilli Fiesta',
    'Cleo\'s Gold',
    'Coinfest',
    'Crazy Jelly',
    'Fiery Planet',
    'Fruit Boost',
    'Infernal Fruits',
    'Jackpot Lab',
    'Lucky Cat',
    'Lucky Dolphin',
    'Magical Wolf',
    'Piggy Trust',
    'Power of Gods',
    'Ancient Tumble',
    'Attila The Hun',
    'Banana Town',
    'Bill & Coin',
    'Blender Blitz',
    'Bloodaxe',
    'Chip Spin',
    'Christmas Santa',
    'Cluster Tumble',
    'Dead Man\'s Trail',
    'Dead Riders Trail',
    'Deep Descent',
    'Dragons Awakening',
    'Epic Joker',
  ];

  for (let i = 0; i < games.length; i++) {
    // Load more if needed
    if (games[i] === 'Firewins Factory') {
      await loadMoreGames(page);
    }

    // Play game and take screenshot
    await playGameByName(page, games[i], `screenshot-${i + 1}`, testInfo);
  }
});
