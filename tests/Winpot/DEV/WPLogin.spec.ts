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

await delay5Seconds();
});



