import { test as base, Page, expect, devices, chromium } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { UserFormHelper, fillField, clickButton, clickCheckboxByLabel } from '../pages/UserFormPage';
import { PaymentForm } from '../pages/PaymentForm';
import { generateRandomEmail, delay5Seconds, delay10Seconds } from '../utils/utils';



const test = base.extend<{}>({
  context: async ({}, use) => {
    const browser = await chromium.launch({
    //   headless: false,
    //   args: ['--start-maximized'], 
    });

    const context = await browser.newContext({
    //   viewport: { width: 1920, height: 1080 }, // apparently set window size explicitly
      httpCredentials: {
        username: 'luckystake',
        password: 'luckystake1!',
      },
    });

    await use(context);

    await context.close();
    await browser.close();
  },
});

test('@Regress Full Registration with pay card', async ({ context }) => {
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const randomEmail = generateRandomEmail();
  const userForm = new UserFormHelper(page);
  const paymentPage = new PaymentForm(page);

//FILLING FIRST USER FORM
    await page.goto('https://luckystake.dev/');
    await homePage.closePopupIfVisible();
    await clickButton(page, 'JOIN NOW');
    await fillField(page, 'Email', randomEmail);
    await fillField(page, 'Password', 'password1');
    await clickCheckboxByLabel(page, 'I am at least 18 years old');
    await clickButton(page, 'Continue');
  
    await delay10Seconds();

    // await handleStartPlayingOrClose(page);

await page.locator('.WizIconButton_base__JfGpY.WizPopupWrapper_close__hKtRn').click();

await delay5Seconds();

await page.locator('iframe').nth(2).contentFrame().getByRole('link', { name: 'START PLAYING' }).click();
await delay5Seconds();
// await page.locator('.WizIconButton_base__JfGpY.WizPopupWrapper_close__hKtRn').click();



  await delay5Seconds();
  let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`user provided registration`, {
      body: screenshot,
      contentType: 'image/png',
    });

await delay5Seconds();

// //FILLING PAYMENT FORM

await page.getByRole('navigation').getByRole('link', { name: 'Store' }).click();

const chatWidget = page.frameLocator('iframe[name="chat-widget-minimized"]');
await chatWidget.getByRole('button', { name: 'Hide greeting' }).click();

await delay5Seconds();  
await page.getByRole('button', { name: '$1.99' }).click();


await page.getByTestId('first-name-input-complete-profile').click();
await page.getByTestId('first-name-input-complete-profile').fill('kek');
await page.getByTestId('last-name-input-complete-profile').click();
await page.getByTestId('last-name-input-complete-profile').fill('basara');
await page.getByTestId('month-select-complete-profile').click();
await page.getByRole('listitem').filter({ hasText: 'March' }).click();
await page.getByTestId('day-input-complete-profile').click();
await page.getByTestId('day-input-complete-profile').fill('20');
await page.getByTestId('year-input-complete-profile').click();
await page.getByTestId('year-input-complete-profile').fill('2000');
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`registration is completed`, {
      body: screenshot,
      contentType: 'image/png',
    });
await delay5Seconds();
await page.getByTestId('submit-button-complete-profile').click();

await delay5Seconds();


screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`incompleted, verification is required`, {
      body: screenshot,
      contentType: 'image/png',
    });
await delay5Seconds();

});




