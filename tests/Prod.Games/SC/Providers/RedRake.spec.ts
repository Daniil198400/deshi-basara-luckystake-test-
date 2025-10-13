// import { test, Page, expect } from '@playwright/test';
// import { LoginPage } from '../../../../pages/LoginPage';
// import { HomePage } from '../../../../pages/HomePage';
// import { GamePage } from '../../../../pages/ClickOnPlayPage';
// import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';

// // Массив айдишников игр
// const gameIds = [
//         "32921",
//         "32922",
//         "32923",
//         "32927",
//         "32928",
//         "32929",
//         "32930",
//         "32931",
//         "32932",
//         "32933",
//         "32934",
//         "35542",
//         "35541",
//         "35203",
//         "24087",
//         "24089",
//         "24084",
//         "21849",
//         "38809",
//         "24090",
//         "24092",
//         "24094",
//         "24088",
//         "38802",
//         "38801",
//         "24086",
//         "24098",
//         "24099",
//         "24165",
//         "32891",
//         "32892",
//         "23231",
//         "32893",
//         "32894",
//         "32895",
//         "32896",
//         "32897",
//         "32898",
//         "32899",
//         "32900",
//         "32901",
//         "32902",
//         "32903",
//         "32904",
//         "32905",
//         "32906",
//         "32907",
//         "32909",
//         "32910",
//         "32912",
//         "32913",
//         "32914",
//         "32915",
//         "32918",
//         "32919",
//         "32920"
//     ];

// // function
// async function playGames(page: Page) {
//     for (const id of gameIds) {
//         const gameUrl = `https://luckystake.com/game/real/${id}`;
//         await page.goto(gameUrl);
//         await delay5Seconds();

//         // screenshot before Play now button
//         let screenshot = await page.screenshot({ fullPage: true });
//         test.info().attach(`game_${id}_before_playnow`, { 
//             body: screenshot, 
//             contentType: 'image/png' 
//         });

//         // click on Play now
//         await page.getByRole('button', { name: 'Play now' }).click();
//         await delay5Seconds();

//         // waiting
//         try {
//       await page.waitForLoadState('networkidle', { timeout: 34000 });
//     } catch {
//       console.warn('⏱️ Network idle is not found after 50 сек, continue...');
//     }
//         await delay10Seconds();



//         // второй скриншот
//         screenshot = await page.screenshot({ fullPage: true });
//         test.info().attach(`game_${id}_after_wait`, { 
//             body: screenshot, 
//             contentType: 'image/png' 
//         });


//         await delay5Seconds();
//     }
// }

// test('AdditionalStep is not needed, RedRake', async ({ context }) => {
//   const page = await context.newPage();
//   const loginPage = new LoginPage(page);
//   const homePage = new HomePage(page);
//   const gamePage = new GamePage(page);

//   //helpful function
// async function clickCloseButtonIfExists(page: Page) {
//   const selector = '.WizIconButton_base__JfGpY.WizPopupWrapper_close__hKtRn';
//   try {
//     const button = await page.waitForSelector(selector, { timeout: 10000 });
//     await button.click();
//     console.log('Кнопка закрытия найдена и нажата');
//     await page.waitForTimeout(5000);
//   } catch {
//     console.log('Кнопка закрытия не найдена за 10 секунд');
//   }
// }

// // вспомогательная функция — кликает по элементу, если он существует
// async function clickIfExists(page: Page, role: string, name: string) {
//   const locator = page.getByRole(role as any, { name });
//   if (await locator.count() > 0) {
//     await locator.first().click();
//     console.log(`Нажали на элемент с role=${role}, name=${name}`);
//   } else {
//     console.log(`Элемент с role=${role}, name=${name} не найден`);
//   }
// }

//   // авторизация
//   await page.goto('https://luckystake.com/');
//   await homePage.closePopupIfVisible();
//   await loginPage.openLoginForm();
//   await loginPage.login('wiztest+80001@gmail.com', 'Qwerty1!');

//   await delay5Seconds();

//   // если появится кнопка закрытия — нажать
//   await clickCloseButtonIfExists(page);

//   // подождать немного, потом попытаться нажать по картинке GC
//   await delay5Seconds();
//   await clickIfExists(page, 'img', 'GC');

//   // запуск игр
//   await playGames(page);
// });

