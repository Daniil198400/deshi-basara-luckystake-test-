import { test as base, Page, expect, devices } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { delay5Seconds } from '../utils/utils';
import { PaymentForm } from '../pages/PaymentForm';
import { LoggedInPaymentForm } from '../pages/LoggedInPaymentForm';


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

test('@Regress luckystake payment test', async ({ context }) => {
const page = await context.newPage();
const loginPage = new LoginPage(page);
const homePage = new HomePage(page);
const paymentForm = new LoggedInPaymentForm(page);


await page.goto('https://luckystake.dev/');
await homePage.closePopupIfVisible();
await loginPage.openLoginForm();
await loginPage.login('wiztestIsabell_Borer@hotmail.com', 'password');

await delay5Seconds();
await homePage.closePopupIfVisible();
await delay5Seconds();

await page.getByTestId('shop-redeem-buttons').click();
await delay5Seconds();

await page.getByTestId('daily-rewards-button-shop').click();

await delay5Seconds();
let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`before getting distribution`, {
      body: screenshot,
      contentType: 'image/png',
    });

// Функция клика по первой доступной кнопке из списка
async function clickFirstAvailableButton(page: Page) {
  // Список селекторов кнопок с текстом
  const buttons = [
    /^Day 9450GC\+0\.25SC$/,
    /^600GC\+0\.3SC$/,
    /^750GC\+0\.2SC$/,
    /^500GC\+0\.25SC$/,
    /^700GC\+0\.35SC$/,
    /^800GC\+0\.4SC$/
  ];

  for (const btnText of buttons) {
    const button = page.locator('div').filter({ hasText: btnText }).getByRole('img');
    
    if (await button.isVisible() && await button.isEnabled()) {
      await button.click();
      console.log(`✅ Clicked on button with text: ${btnText}`);
      return; 
    }
  }

  console.warn('⚠️ No available buttons to click');
}

await clickFirstAvailableButton(page);

screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`after getting distribution`, {
      body: screenshot,
      contentType: 'image/png',
    });

await delay5Seconds();


await page.getByRole('img', { name: 'close' }).click();


await delay5Seconds();
});