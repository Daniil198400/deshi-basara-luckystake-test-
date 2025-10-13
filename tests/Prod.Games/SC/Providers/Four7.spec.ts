// import { test, Page, expect } from '@playwright/test';
// import { LoginPage } from '../../../../pages/LoginPage';
// import { HomePage } from '../../../../pages/HomePage';
// import { GamePage } from '../../../../pages/ClickOnPlayPage';
// import { delay10Seconds, delay5Seconds } from '../../../../utils/utils';

// // Массив айдишников игр
// const gameIds = [
//         "26066",
//         "26065",
//         "26064",
//         "26078",
//         "26068",
//         "26074",
//         "26069",
//         "29136",
//         "26067"
// ];


// test('@ClickOnAdditionalStep Four7', async ({ context }) => {
// const page = await context.newPage();
//   const loginPage = new LoginPage(page);
//   const homePage = new HomePage(page);
//   const gamePage = new GamePage(page);

//   // вспомогательная функция — ждёт кнопку и кликает, если она появилась
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
