import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { GamePage } from '../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';

// Массив айдишников игр
const gameIds = [
        "24178",
        "24177",
        "24176",
        "24175",
        "24174",
        "24173",
        "34331",
        "35555",
        "34484",
        "24172",
        "24170",
        "38810",
        "24168",
        "24171",
        "40494",
        "24205",
        "24202",
        "24201",
        "24200",
        "24198",
        "24197",
        "24196",
        "24195",
        "24193",
        "24192",
        "24191",
        "24190",
        "24217",
        "24219",
        "24220",
        "24221",
        "24222",
        "24223",
        "24224",
        "24225",
        "24226",
        "24229",
        "24230",
        "24231",
        "24232",
        "24233",
        "24234",
        "24235",
        "24236",
        "24237",
        "24238",
        "24239",
        "24240",
        "24241",
        "24242",
        "24243",
        "24244",
        "24245",
        "24246",
        "24247",
        "24248",
        "24249",
        "24250",
        "24251",
        "24253",
        "24267",
        "24333",
        "24337",
        "24194",
        "24227",
        "24228",
        "24427",
        "26213",
        "34489",
        "34490",
        "34491",
        "34492",
        "34493",
        "34494",
        "34495",
        "34496",
        "34497",
        "34498",
        "34499",
        "34500",
        "34501",
        "34502",
        "34503",
        "34504",
        "34505",
        "34506",
        "34507",
        "34508",
        "34509",
        "34510",
        "34511",
        "34512",
        "34513",
        "34514",
        "34515",
        "34517",
        "34518",
        "34519",
        "24431",
        "24189",
        "24188",
        "24187",
        "24186",
        "24185",
        "24184",
        "24183",
        "24182",
        "24181",
        "24179",
        "24215",
        "24214",
        "24212",
        "24208",
        "24207",
        "24203",
        "38815",
        "40491",
        "40492",
        "40493",
        "24216"
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
        await page.waitForLoadState('networkidle', { timeout: 50000 });
      } catch {
        console.warn('⏱️ Network idle is not found after 50 сек, continue...');
      }
        await delay10Seconds();
        await delay10Seconds();

        await page.locator('iframe[title="Real game"]').contentFrame().locator('canvas').click({
         position: {
            x: 627,
            y: 549
            }
        });

        // waiting
        
        await delay10Seconds();
        

        // второй скриншот
        screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`game_${id}_after_wait`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });

    }
}

await delay5Seconds();

test('@ClickOnAdditionalStep RubyPlay', async ({ context }) => {
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