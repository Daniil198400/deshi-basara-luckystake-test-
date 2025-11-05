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
//     const page = await context.newPage();
//     const loginPage = new LoginPage(page);
//     const homePage = new HomePage(page);
//     const gamePage = new GamePage(page);

//     // autorization
//     await page.goto('https://luckystake.com/');
//     await homePage.closePopupIfVisible();
//     await loginPage.openLoginForm();
//     await loginPage.login('wiztest+70001@gmail.com', 'Qwerty1!');
// //     await delay5Seconds();
// const closeBtn = page.locator('.WizIconButton_base__JfGpY.WizPopupWrapper_close__hKtRn');
// if (await closeBtn.isVisible()) {
//   await closeBtn.click();
// }
//     await delay5Seconds();
//        const scImage = page.getByRole('img', { name: 'GC', exact: true });
//         if (await scImage.isVisible()) {
//           await scImage.scrollIntoViewIfNeeded();
//           await scImage.click({ force: true });
//           console.log('click on SC');
//         }
// }); 
