import { test as base, expect, devices } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { delay5Seconds } from '../utils/utils';
import { ProfilePage } from '../pages/ProfilePage';

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

// --- Определяем функцию до теста ---
async function playGameByName(page, gameName: string, screenshotFile: string) {
  const gameCard = page.locator('div.WizGameCard_container__ibRAW', { hasText: gameName });
  await gameCard.waitFor({ state: 'attached', timeout: 30000 });
  await gameCard.waitFor({ state: 'visible', timeout: 30000 });
  await gameCard.evaluate((el: HTMLElement) => el.scrollIntoView({ behavior: 'auto', block: 'center' }));
  await gameCard.click({ force: true });

  const playBtn = page.getByRole('button', { name: 'Play now' });
  await playBtn.waitFor({ state: 'visible', timeout: 15000 });
  await playBtn.click();

  await delay5Seconds();
  await page.screenshot({ path: `screenshots/${screenshotFile}.png`, fullPage: true });

  const backBtn = page.getByTestId('ArrowBackIosIcon');
  await backBtn.waitFor({ state: 'visible', timeout: 10000 });
  await backBtn.click();
}


test('test', async ({ page }) => {
await page.goto('https://luckystake.dev/');
await page.getByRole('button', { name: 'LOG IN' }).click();

await page.getByRole('textbox', { name: 'Email or Username' }).click();
await page.getByRole('textbox', { name: 'Email or Username' }).fill('dksld@gmail.com');
await page.getByRole('textbox', { name: 'Password' }).click();
await page.getByRole('textbox', { name: 'Password' }).fill('Qwerty1!!');
await page.getByRole('button', { name: 'Sign in' }).click();

await page.getByRole('navigation').getByRole('link', { name: 'Store' }).click();

await page.getByText('Social Games').click();
await page.getByRole('navigation').getByRole('link', { name: 'Store' }).click();
  await page.getByRole('button', { name: '$1.99' }).click();
  await page.locator('iframe[title="WizCashier"]').contentFrame().locator('div').filter({ hasText: /^Credit Card$/ }).first().click();
  await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().locator('iframe[name="hosted-field-frmCCCVC"]').contentFrame().getByRole('textbox', { name: 'Security Code' }).click();
  await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().locator('iframe[name="hosted-field-frmCCCVC"]').contentFrame().getByRole('textbox', { name: 'Security Code' }).fill('222');
  await page.locator('iframe[title="WizCashier"]').contentFrame().locator('#cashierIframe').contentFrame().getByRole('button', { name: 'Deposit' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
});