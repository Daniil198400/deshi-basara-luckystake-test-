import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { GamePage } from '../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';

// Array of IDs
const gameIds = [
        "35816",
        "35818",
        "35819",
        "35820",
        "35821",
        "35822",
        "35823",
        "35824",
        "35825",
        "35826",
        "35827",
        "35828",
        "35829",
        "38805",
        "35798",
        "35799",
        "35800",
        "35801",
        "35802",
        "35803",
        "35804",
        "35806",
        "35807",
        "35808",
        "35809",
        "35810",
        "35811",
        "35812",
        "35813",
        "35814",
        "35815",
        "35817",
        "35786",
        "35787",
        "35788",
        "35789",
        "35790",
        "35791",
        "35792",
        "35793",
        "35794",
        "35795",
        "35796",
        "35797"
];

// function
async function playGames(page: Page) {
    for (const id of gameIds) {
        const gameUrl = `https://luckystake.com/game/real/${id}`;
        await page.goto(gameUrl);
        await delay5Seconds();

        // screenshot before Play now button
        let screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_${id}_before_playnow`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });

        // click on Play now
        await page.getByRole('button', { name: 'Play now' }).click();
        
        try {
                await page.waitForLoadState('networkidle', { timeout: 20000 });
              } catch {
                console.warn('⏱️ Network idle is not found after 20 сек, continue...');
              }
                await delay10Seconds();

        await page.locator('iframe[title="Real game"]').contentFrame().locator('canvas').click({
                  position: {
                    x: 595,
                    y: 559
                  }
                });

 
        await delay5Seconds();

        // второй скриншот
        screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_${id}_after_wait`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });

        await delay5Seconds();
    }
}

test('@ClickOnAdditionalStep Slotmill', async ({ context }) => {
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const gamePage = new GamePage(page);

  // helpful function
async function clickCloseButtonIfExists(page: Page) {
  const selector = '.WizIconButton_base__JfGpY.WizPopupWrapper_close__hKtRn';
  try {
    const button = await page.waitForSelector(selector, { timeout: 10000 });
    await button.click();
    console.log('Кнопка закрытия найдена и нажата');
    await page.waitForTimeout(5000);
  } catch {
    console.log('Кнопка закрытия не найдена за 10 секунд');
  }
}

// вспомогательная функция — кликает по элементу, если он существует
async function clickIfExists(page: Page, role: string, name: string) {
  const locator = page.getByRole(role as any, { name });
  if (await locator.count() > 0) {
    await locator.first().click();
    console.log(`Нажали на элемент с role=${role}, name=${name}`);
  } else {
    console.log(`Элемент с role=${role}, name=${name} не найден`);
  }
}

  // авторизация
  await page.goto('https://luckystake.com/');
  await homePage.closePopupIfVisible();
  await loginPage.openLoginForm();
  await loginPage.login('wiztest+80001@gmail.com', 'Qwerty1!');

  await delay5Seconds();

  // если появится кнопка закрытия — нажать
  await clickCloseButtonIfExists(page);

  // подождать немного, потом попытаться нажать по картинке GC
  await delay5Seconds();
  await clickIfExists(page, 'img', 'GC');

  // запуск игр
  await playGames(page);
});