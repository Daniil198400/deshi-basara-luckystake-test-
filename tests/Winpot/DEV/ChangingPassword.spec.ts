import { test as base, Page, expect, devices } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage'
import { HomePage } from '../../../pages/HomePage';
import { delay5Seconds, delay10Seconds } from '../../../utils/utils';
import { PaymentForm } from '../../../pages/PaymentForm';
import { LoggedInPaymentForm } from '../../../pages/LoggedInPaymentForm';


const test = base.extend<{}>({
context: async ({ browser }, use) => {
const context = await browser.newContext({
 });
 await use(context);
 await context.close();
},
});



test('Registration winpot', async ({ context }) => {
 const page = await context.newPage();

  await page.goto('https://stage-winpot.mx');


  await page.getByRole('button', { name: 'Acceder', exact: true }).click();

  await page.getByRole('button', { name: 'Acceder', exact: true }).click();
  await page.getByRole('textbox', { name: 'Usuario o Correo Electrónico' }).click();
  await page.getByRole('textbox', { name: 'Usuario o Correo Electrónico' }).fill('deshi_basara121@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña Contraseña' }).fill('Qwerty1!');
  await page.locator('#login-form-submit-button').click();
await delay10Seconds();

let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`Login`, {
      body: screenshot,
      contentType: 'image/png',
    });


    await page.getByText('Mi cuenta').click();
    await page.goto('https://stage-winpot.mx/account?page=myAccount&tab=Account');
    await page.getByTestId('settings-tab').click();

    await page.getByTestId('edit-password-button').click();
    await page.getByTestId('previous-password-input').click();
    await page.getByTestId('previous-password-input').fill('Qwerty1!!');
    await page.getByTestId('new-password-input').click();
    await page.getByTestId('new-password-input').fill('Qwerty1!');
    await page.getByTestId('change-password-button').click();
    await delay5Seconds();
        screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`Changing Password`, {
      body: screenshot,
      contentType: 'image/png',
    });
    await delay5Seconds();
    await page.getByRole('button', { name: 'Bueno' }).click();
await delay5Seconds();


});



