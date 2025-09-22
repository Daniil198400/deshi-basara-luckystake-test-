import { test as base, Page } from '@playwright/test';
import { delay5Seconds } from '../utils/utils';

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

// --- Хелпер: умный Load More ---
async function loadMoreGames(page: Page) {
  const cards = page.locator('div.WizGameCard_container__ibRAW');
  const beforeCount = await cards.count();

  const loadMoreBtn = page.getByRole('button', { name: 'Load More' });
  if (await loadMoreBtn.isVisible()) {
    await loadMoreBtn.click();
    // ждём увеличения количества карточек
    await page.waitForFunction(
      (oldCount) => {
        const cards = document.querySelectorAll('div.WizGameCard_container__ibRAW');
        return cards.length > oldCount;
      },
      beforeCount,
      { timeout: 10000 }
    );
  }
}

// --- Функция для игры по имени ---
async function playGameByName(page: Page, gameName: string, screenshotFile: string) {
  const gameCard = page.locator(
    'div.WizGameCard_container__ibRAW:has(.WizGameCard_container_gameImage__cFsR9)',
    { hasText: gameName }
  ).first();

  await gameCard.waitFor({ state: 'visible', timeout: 30000 });
  await gameCard.evaluate((el: HTMLElement) => el.scrollIntoView({ behavior: 'auto', block: 'center' }));

  // Закрываем чат, если мешает
  const chatFrame = await page.locator('iframe[name="chat-widget-minimized"]').first().contentFrame();
  if (chatFrame) {
    const hideGreeting = chatFrame.getByRole('button', { name: 'Hide greeting' });
    if (await hideGreeting.isVisible()) await hideGreeting.click();
  }

  // Кликаем карточку игры
  await gameCard.click({ force: true });

  // Жмём "Play now"
  const playBtn = page.getByRole('button', { name: 'Play now' });
  await playBtn.waitFor({ state: 'visible', timeout: 15000 });
  await playBtn.click({ force: true });

  // Ждём загрузки и делаем скриншот
  await delay5Seconds();
  await page.screenshot({ path: `screenshots/${screenshotFile}.png`, fullPage: true });

  // Назад
  const backBtn = page.getByTestId('ArrowBackIosIcon');
  await backBtn.waitFor({ state: 'visible', timeout: 10000 });
  await backBtn.click({ force: true });

  await page.waitForTimeout(1000);
}

// --- Тест ---
test('Play multiple games', async ({ page }) => {
  await page.goto('https://luckystake.dev/');

  // Вход
  await page.getByRole('button', { name: 'LOG IN' }).click();
  await page.getByRole('textbox', { name: 'Email or Username' }).fill('dksld@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Qwerty1!!');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Навигация в Popular
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
    // Нажимаем Load More, когда дошли до Firewins Factory
    if (games[i] === 'Firewins Factory') {
      await loadMoreGames(page);
    }

    await playGameByName(page, games[i], `playgames_${i + 1}`);
  }
});
