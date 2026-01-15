import { test as base, expect, devices } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { HomePage } from '../../../pages/HomePage';
import { delay10Seconds, delay5Seconds } from '../../../utils/utils';
import { PaymentForm } from '../../../pages/PaymentForm';
import { LoggedInPaymentForm } from '../../../pages/LoggedInPaymentForm';


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


test('@Regress incorrect login sign up forms test', async ({ page }) => {


await page.goto('https://luckystake.dev/');


await page.getByTestId('login-header').click();
await page.getByTestId('email-input-login').click();
await page.getByTestId('email-input-login').fill('ff');
await page.getByRole('button', { name: 'Show' }).click();
await page.getByTestId('password-input-login').click();
await page.getByTestId('password-input-login').fill('ff');
await page.getByTestId('submit-button-login').click();

await delay5Seconds();  
let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`invalid 1`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds();  


    await page.getByTestId('email-input-login').click();
    await page.getByTestId('email-input-login').fill('123432');
    await page.getByTestId('submit-button-login').click();
await delay5Seconds();  
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`invalid 1`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds();  


await page.getByTestId('email-input-login').click();
await page.getByTestId('email-input-login').fill('dksld144@gmail.com');
await page.getByTestId('password-input-login').click();
await page.getByTestId('password-input-login').fill('hjgfkdls');
await page.getByTestId('submit-button-login').click();
await delay5Seconds();  
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`invalid password`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds();  



await page.getByTestId('email-input-login').click();
await page.getByTestId('email-input-login').fill('Qwerty1!');
await page.getByTestId('password-input-login').click();
await page.getByTestId('password-input-login').fill('dksld144@gmail.com');
await page.getByTestId('submit-button-login').click();
await delay5Seconds();  
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`invalid 3`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds();  




await page.getByTestId('email-input-login').click();
await page.getByTestId('email-input-login').fill('jhgfd');
await page.getByTestId('password-input-login').click();
await page.getByTestId('password-input-login').fill('kjhgfds');
await page.getByTestId('submit-button-login').click();
await page.getByTestId('password-input-login').dblclick();
await page.getByTestId('password-input-login').fill('');
await page.getByTestId('email-input-login').dblclick();
await page.getByTestId('email-input-login').fill('');
await page.locator('div').filter({ hasText: /^Sign in$/ }).click();
await delay5Seconds();  
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`you won't pass without email or password`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds();  


//REGISTRATION 

await page.getByTestId('close-button-login').click();
await page.getByTestId('signup-header').click();
await page.getByTestId('email-input-signup').click();
await page.getByTestId('email-input-signup').fill('dksld144@gmail.com');
await page.getByTestId('password-input-signup').click();
await page.getByTestId('password-input-signup').fill('Qwerty1!');
await page.getByRole('button', { name: 'Show' }).click();
await page.locator('label').filter({ hasText: 'I am at least 18 years old' }).locator('span').click();
await page.getByTestId('submit-button-signup').click();

await delay5Seconds();  
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`Email is already existed`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds();  


await page.getByTestId('email-input-signup').click();
await page.getByTestId('email-input-signup').fill('hjgkfdllffkf');
await page.getByTestId('submit-button-signup').click();
await delay5Seconds();  
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`invalid email`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds();  




await page.getByTestId('email-input-signup').fill('76543456');
await page.getByTestId('submit-button-signup').click();
await delay5Seconds();  
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`invalid email 2`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds(); 




await page.getByTestId('password-input-signup').click();
await page.getByTestId('password-input-signup').fill('iuytredsdfg');
await delay5Seconds();  
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`password must content numbers`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds(); 


await page.getByTestId('password-input-signup').dblclick();
await page.getByTestId('password-input-signup').fill('765432');
await page.getByTestId('password-input-signup').fill('iuytredsdfg');
await delay5Seconds();  
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`password must content not only numbers`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds(); 




await page.getByTestId('password-input-signup').click();
await page.getByTestId('password-input-signup').fill('hgfdddf');
// await page.getByRole('button', { name: 'Show' }).click();
await delay5Seconds();  
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`password must content at least 8 characters`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds(); 




await page.getByTestId('email-input-signup').click();
await page.getByTestId('email-input-signup').fill('wiztest+543223@gmail.com');
await page.getByTestId('password-input-signup').click();
await page.getByTestId('password-input-signup').fill('Qwerty1!');
await page.getByTestId('submit-button-signup').click();

await delay5Seconds();  
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`you can't sign up without agreement that you are older than 18 y.o.`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds(); 




await page.getByTestId('password-input-signup').click();
await page.getByTestId('password-input-signup').fill('Q wert y1! ');
await delay5Seconds();  
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`spaces are not allowed`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds(); 


await page.getByRole('button', { name: 'Sign in' }).click();
await delay5Seconds();  
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`login button below is functional`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds(); 

await page.getByTestId('signup-button-login').click();
await delay5Seconds();  
    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`sign up button below is functional`, {
      body: screenshot,
      contentType: 'image/png', 
    });
await delay5Seconds(); 

});

