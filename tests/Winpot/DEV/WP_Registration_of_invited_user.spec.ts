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



// вставь под import'ами
function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Сгенерировать email на основе корня.
 * Примеры:
 *   generateEmail('deshi basara') -> deshibasara4821@gmail.com
 *   generateEmail('deshi_basara', 'example.com') -> deshi_basara1290@example.com
 */
function generateEmail(root = 'deshi basara', domain = 'gmail.com') {
  const base = String(root).replace(/\s+/g, '').toLowerCase();
  const suffix = Date.now().toString().slice(-4) + randomInt(10, 999).toString(); // гарантирует высокую уникальность
  return `${base}${suffix}@${domain}`;
}

/**
 * Сгенерировать рандомный мексиканский номер (10 цифр).
 * Возвращает строку вида: 5512345678
 * Если нужен международный формат, можно использовать: '+52' + number
 */
function generateMexPhone({ withCountryCode = false, separator = '' } = {}) {
  const prefixes = ['55', '56', '33', '81', '55', '55', '33']; // частые префиксы (CDMX, Guadalajara, Monterrey и т.д.)
  const prefix = prefixes[randomInt(0, prefixes.length - 1)];
  let rest = '';
  for (let i = 0; i < 8; i++) rest += randomInt(0, 9).toString();
  const local = `${prefix}${rest}`; // 10 цифр
  if (withCountryCode) {
    if (separator) return `+52${separator}${local}`;
    return `+52${local}`;
  }
  return local;
}



test('Registration winpot', async ({ context }) => {
 const page = await context.newPage();

  const email = generateEmail('deshi basara'); // => deshibasara1234@gmail.com
  const phone = generateMexPhone();            // => 5512345678

  await page.goto('https://www.winpot.mx/r/3018447_PGOCnXXz');

  await page.getByRole('button', { name: 'Regístrate', exact: true }).click();
  await delay5Seconds();

  await page.getByRole('textbox', { name: 'p. ej. juan123@gmail.com' }).click();
  await page.getByRole('textbox', { name: 'p. ej. juan123@gmail.com' }).fill(email);
  await page.getByRole('textbox', { name: 'Contraseña segura' }).click(); 
  await page.getByRole('textbox', { name: 'Contraseña segura' }).fill('Qwerty1!');
  await page.getByRole('textbox', { name: 'p. ej. 7911' }).click();
  await page.getByRole('textbox', { name: 'p. ej. 7911' }).fill(phone);
await page.getByRole('button', { name: 'Siguiente' }).click();
await page.getByRole('textbox', { name: 'Nombre (Como aparece en tu' }).click();
await page.getByRole('textbox', { name: 'Nombre (Como aparece en tu' }).fill('Hulio');
await page.getByRole('textbox', { name: 'Apellido (Como aparece en tu' }).click();
await page.getByRole('textbox', { name: 'Apellido (Como aparece en tu' }).fill('Huyares');
await page.getByRole('textbox', { name: 'Apellido (Como aparece en tu' }).press('ArrowLeft');
await page.getByRole('textbox', { name: 'Apellido (Como aparece en tu' }).press('ArrowLeft');
await page.getByRole('textbox', { name: 'Apellido (Como aparece en tu' }).press('ArrowLeft');
await page.getByRole('textbox', { name: 'Apellido (Como aparece en tu' }).press('ArrowLeft');
await page.getByRole('textbox', { name: 'Apellido (Como aparece en tu' }).fill('Huares');
await page.getByText('Día', { exact: true }).click();
await page.getByText('2', { exact: true }).click();
await page.getByText('Mes', { exact: true }).click();
await page.getByText('Mar', { exact: true }).click();
await page.getByText('Año', { exact: true }).click();
await page.getByText('2004').click();
await delay5Seconds();
await page.locator('#signup-form-submit-button').click();
await delay5Seconds();

await page.getByTestId('deposit-container').getByTestId('close-button').click();
await delay10Seconds();
await page.getByTestId('cancel-button').click();
await delay5Seconds();
await page.getByRole('button', { name: 'delete' }).click();
await delay5Seconds();

let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`Registration`, {
      body: screenshot,
      contentType: 'image/png',
    });

await delay5Seconds();
});



