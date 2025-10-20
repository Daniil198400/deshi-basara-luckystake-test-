import { test, Page } from '@playwright/test';
import { LoginPage } from '../../../../../pages/LoginPage';
import { HomePage } from '../../../../../pages/HomePage';
import { GamePage } from '../../../../../pages/ClickOnPlayPage';
import { delay5Seconds, delay10Seconds } from '../../../../../utils/utils';

async function clickFirstVisibleButtonInGameFrame(page: Page) {
  const buttonSelectors = [
    { type: 'name', value: 'WILD MULTIPLIER FREE SPINS' },
    { type: 'name', value: 'Land clovers to win up to 10,' },
    { type: 'name', value: 'COLLECT BATTERIES TO ACTIVATE' },
    { type: 'nth', value: 3 },
    { type: 'nth', value: 3 },
    { type: 'name', value: 'CLIMBING WILDS AVALANCHE' },
  ];

  // получаем inner iframe
  const outerFrameHandle = await page.locator('iframe[title="Real game"]').elementHandle();
  const outerFrame = await outerFrameHandle?.contentFrame();
  if (!outerFrame) {
    console.warn('❌ Внешний iframe не найден');
    return;
  }

  const innerFrameHandle = await outerFrame.locator('#game').elementHandle();
  const innerFrame = await innerFrameHandle?.contentFrame();
  if (!innerFrame) {
    console.warn('❌ Внутренний iframe #game не найден');
    return;
  }

  for (const selector of buttonSelectors) {
    let button;
    if (selector.type === 'name') {
      button = innerFrame.getByRole('button', { name: selector.value, exact: true });
    } else if (selector.type === 'nth') {
      button = innerFrame.getByRole('button').nth(selector.value);
    }

    if (await button.isVisible()) {
      try {
        await button.scrollIntoViewIfNeeded();
        await button.click({ force: true });
        console.log(`✅ Клик по кнопке: ${selector.type === 'name' ? `"${selector.value}"` : `nth(${selector.value})`}`);
        break; // кликнули — выходим из цикла
      } catch (err) {
        console.warn(`⚠️ Ошибка при клике:`, err.message);
      }
    }
  }
}

test('@ClickOnAdditionalStepMobile Four Leaf Gaming', async ({ context }) => {
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const gamePage = new GamePage(page);

  console.log('🚀 Запуск теста Four Leaf Gaming');

  await page.goto('https://luckystake.com/');
  await homePage.closePopupIfVisible();
  await loginPage.openLoginForm();
  await loginPage.login('wiztest+70001@gmail.com', 'Qwerty1!');
  await delay5Seconds();

  // пример клика по пустой кнопке, если нужна
  const emptyButton = page.getByRole('button').filter({ hasText: /^$/ });
  if (await emptyButton.isVisible()) {
    await emptyButton.click({ force: true });
    console.log('🟢 Нажата пустая кнопка');
  }

  // пример клика по SC, если есть
  const scImage = page.getByRole('img', { name: 'SC', exact: true });
  if (await scImage.isVisible()) {
    await scImage.scrollIntoViewIfNeeded();
    await scImage.click({ force: true });
    console.log('✅ Клик по SC');
  }

  await delay5Seconds();

  // 🕹️ Клик по первой видимой кнопке из списка в inner iframe
  await clickFirstVisibleButtonInGameFrame(page);

  console.log('🏁 Скрипт завершен');
});
