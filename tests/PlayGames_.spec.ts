import { test as base, expect, devices } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { delay5Seconds } from '../utils/utils';
import { ProfilePage } from '../pages/ProfilePage';

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

// --- Определяем функцию до теста ---
async function playGameByName(page, gameName: string, screenshotFile: string) {
  const gameCard = page.locator('div.WizGameCard_container__ibRAW', { hasText: gameName });
  await gameCard.waitFor({ state: 'attached', timeout: 30000 });
  await gameCard.waitFor({ state: 'visible', timeout: 30000 });
  await gameCard.evaluate((el: HTMLElement) => el.scrollIntoView({ behavior: 'auto', block: 'center' }));
  await gameCard.click({ force: true });

  const playBtn = page.getByRole('button', { name: 'Play now' });
  await playBtn.waitFor({ state: 'visible', timeout: 15000 });
  await playBtn.click();

  await delay5Seconds();
  await page.screenshot({ path: `screenshots/${screenshotFile}.png`, fullPage: true });

  const backBtn = page.getByTestId('ArrowBackIosIcon');
  await backBtn.waitFor({ state: 'visible', timeout: 10000 });
  await backBtn.click();
}


test('test', async ({ page }) => {
await page.goto('https://luckystake.dev/');
await page.getByRole('button', { name: 'LOG IN' }).click();

await page.getByRole('textbox', { name: 'Email or Username' }).click();
await page.getByRole('textbox', { name: 'Email or Username' }).fill('dksld@gmail.com');
await page.getByRole('textbox', { name: 'Password' }).click();
await page.getByRole('textbox', { name: 'Password' }).fill('Qwerty1!!');
await page.getByRole('button', { name: 'Sign in' }).click();


await page.getByText('Social GamesPopularNew &').click();
await page.getByRole('navigation').getByRole('link', { name: 'Popular' }).click();

await page.locator('.WizGameCard_container_gameImage__cFsR9').first().click();
await page.getByText('Extra Gems').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames1.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(2) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Book of Luck').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames2.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(3) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Mega Hotfire').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames3.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(4) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Devils Hotfire').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames4.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(5) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Book of Ra').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames5.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();


await page.locator('div:nth-child(6) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Bass Smash').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames6.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

// Получаем iframe с чатом
  const chatFrame = await page.locator('iframe[name="chat-widget-minimized"]').contentFrame();

  if (chatFrame) {
    // Находим кнопку "Hide greeting" внутри iframe
    const button = chatFrame.getByRole('button', { name: 'Hide greeting' });
    await button.click();
  }


await page.locator('div:nth-child(7) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Barhalla').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames7.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();


await page.locator('div:nth-child(8) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Bank Busters: The Big Score').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames8.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(9) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Arabian Tales').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames9.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(10) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Aztec Temple').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames10.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(11) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Book of Egypt').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames11.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();


await page.locator('div:nth-child(12) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Book of Light').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames12.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(13) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Books of Giza').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames13.png', fullPage: true });

await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(14) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Chilli Fiesta').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames14.png', fullPage: true });

await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(15) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Cleo\'s Gold').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames15.png', fullPage: true });

await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(16) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Coinfest').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames16.png', fullPage: true });

await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(17) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Crazy Jelly').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames17.png', fullPage: true });

await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(18) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Fiery Planet').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames18.png', fullPage: true });

await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(19) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Fruit Boost').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames19.png', fullPage: true });

await page.getByTestId('ArrowBackIosIcon').click();


await page.locator('div:nth-child(20) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Infernal Fruits').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames20.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(21) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Jackpot Lab').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames21.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(22) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Lucky Cat').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames22.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(23) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Lucky Dolphin').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames23.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(24) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Magical Wolf').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames24.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(25) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Piggy Trust').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames25.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(26) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Power of Gods').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames26.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(27) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Ancient Tumble').first().click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames27.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(29) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Attila The Hun').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames29.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(30) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Banana Town').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames30.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();


await page.locator('div:nth-child(31) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Bill & Coin').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames31.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(32) > .WizGameCard_container_providerImage__PDFxs').click({ force: true });
await page.getByText('Blender Blitz').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames32.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(33) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Bloodaxe').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames33.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(34) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Chip Spin').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames34.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();


await page.locator('div:nth-child(35) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Christmas Santa').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames35.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(36) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Cluster Tumble').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames36.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(37) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Dead Man\'s Trail').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames37.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.locator('div:nth-child(38) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Dead Riders Trail').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames38.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();



// Находим карточку с текстом "Deep Descent"
const deepDescentCard = page.locator('div.WizGameCard_container__ibRAW', {
  hasText: 'Deep Descent',
});

// Скроллим к ней
await deepDescentCard.scrollIntoViewIfNeeded();

// Ждём, пока карточка станет видимой
await deepDescentCard.waitFor({ state: 'visible' });

// Закрываем мешающие попапы, если есть
const hideGreeting = page.getByRole('button', { name: 'Hide greeting' });
if (await hideGreeting.isVisible()) {
  await hideGreeting.click();
}

// Кликаем по карточке (форс, если перекрыто)
await deepDescentCard.click({ force: true });

// Теперь кликаем "Play now"
await page.getByRole('button', { name: 'Play now' }).click();

// Ждём загрузки
await delay5Seconds();

// Скриншот
await page.screenshot({
  path: 'screenshots/playgames39.png',
  fullPage: true,
});

// Назад
await page.getByTestId('ArrowBackIosIcon').click();


await page.locator('div:nth-child(40) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Dragons Awakening').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames40.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();





await page.locator('div:nth-child(42) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Epic Joker').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames42.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();


await page.getByRole('button', { name: 'Load More' }).click();
await page.locator('div:nth-child(43) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Firewins Factory').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames43.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.getByRole('button', { name: 'Load More' }).click();

await page.locator('div:nth-child(44) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Firewins Factory').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames44.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.getByRole('button', { name: 'Load More' }).click();

await page.locator('div:nth-child(45) > .WizGameCard_container_providerImage__PDFxs').click();
await page.getByText('Frequent Flyer').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames45.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.getByRole('button', { name: 'Load More' }).click();

await page.locator('div:nth-child(46) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('The Great Pigsby Megaways').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames46.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.getByRole('button', { name: 'Load More' }).click();

await page.locator('div:nth-child(47) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Titan Strike').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames47.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.getByRole('button', { name: 'Load More' }).click();

await page.locator('div:nth-child(48) > .WizGameCard_container_providerImage__PDFxs').click();
await page.getByText('Wild Chapo').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames48.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.getByRole('button', { name: 'Load More' }).click();

await page.locator('div:nth-child(49) > .WizGameCard_container_providerImage__PDFxs').click();
await page.getByText('Wild Chapo').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames49.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.getByRole('button', { name: 'Load More' }).click();


await page.locator('div:nth-child(50) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Wild Hike').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames50.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.getByRole('button', { name: 'Load More' }).click();


await page.locator('div:nth-child(51) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Wild Yield').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames51.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.getByRole('button', { name: 'Load More' }).click();

await page.locator('div:nth-child(52) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Winter Champions').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames52.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.getByRole('button', { name: 'Load More' }).click();


await page.locator('div:nth-child(53) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Rhino Mania').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames53.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.getByRole('button', { name: 'Load More' }).click();

await page.locator('div:nth-child(54) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Tap the Pot').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames54.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.getByRole('button', { name: 'Load More' }).click();

await page.locator('div:nth-child(55) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Spins').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames55.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.getByRole('button', { name: 'Load More' }).click();

await page.locator('div:nth-child(56) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Wild Spin').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames56.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.getByRole('button', { name: 'Load More' }).click();

await page.locator('div:nth-child(57) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Wild Spin Deluxe').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames57.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.getByRole('button', { name: 'Load More' }).click();

await page.locator('div:nth-child(58) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Arabian Wins').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames58.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.getByRole('button', { name: 'Load More' }).click();

await page.getByRole('img', { name: 'RedRake' }).nth(1).click();
await page.getByText('Bigger Size Fishin\'').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames59.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.getByRole('button', { name: 'Load More' }).click();

await page.locator('div:nth-child(60) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Wild Animals').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames60.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();

await page.getByRole('button', { name: 'Load More' }).click();

await page.locator('div:nth-child(61) > .WizGameCard_container_gameImage__cFsR9').click();
await page.getByText('Flamingo Paradise').click();
await page.getByRole('button', { name: 'Play now' }).click();
await delay5Seconds();
await page.screenshot({ path: 'screenshots/playgames61.png', fullPage: true });
await page.getByTestId('ArrowBackIosIcon').click();
});



// await page.locator('div:nth-child(49) > .WizGameCard_container_gameImage__cFsR9').click();
// await page.getByRole('button', { name: 'Play now' }).click();
// await page.getByTestId('ArrowBackIosIcon').click();
// await page.getByRole('button', { name: 'Load More' }).click();
// await page.locator('div:nth-child(49) > .WizGameCard_container_gameImage__cFsR9').click();
// await page.getByText('Wild Chapo').click();
// await page.getByText('Wild Chapo').click();
// await page.getByRole('button').nth(2).click();
// await page.getByRole('button', { name: 'Load More' }).click();
// await page.getByText('Wild Chapo 2').click();
// await page.getByText('Wild Chapo').click();