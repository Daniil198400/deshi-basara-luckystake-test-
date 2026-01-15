import { test, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { HomePage } from '../../../pages/HomePage';
import { GamePage } from '../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../utils/utils';

test('wrong ID', async ({ context }) => {
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const gamePage = new GamePage(page);

  await page.goto('https://luckystake.com/');

await page.getByTestId('login-header').click();
await page.getByTestId('email-input-login').click();
await page.getByTestId('email-input-login').fill('wiztest+80001@gmail.com');
await page.getByTestId('password-input-login').click();
await page.getByTestId('password-input-login').fill('Qwerty1!!');
await page.getByTestId('submit-button-login').click();
    
    await delay5Seconds();

  await page.goto('https://luckystake.com/game/real/10455');

let screenshot = await page.screenshot({ fullPage: true });
        test.info().attach(`mobile_404_game`, { 
            body: screenshot, 
            contentType: 'image/png' 
        });
await delay5Seconds();

}); 
