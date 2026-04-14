import { test as base, expect, Page } from '@playwright/test';
import { delay5Seconds } from '../../../utils/utils';

const EMAIL = 'GC_mission@gmail.com';
const PASSWORDS = ['Qwerty1!', 'Qwerty1!!!!!!!!!!!!!!!!!!!'];

const test = base.extend<{}>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      httpCredentials: {
        username: 'sweepnext',
        password: 'sweepnext!',
      },
    });

    await use(context);
    await context.close();
  },
});

async function openLogin(page: Page) {
  await page.goto('https://sweepnext-stage.wiztechgroup-services.com', {
    waitUntil: 'domcontentloaded',
  });
  await delay5Seconds();

  await page.getByTestId('login-button').click();
  await page.getByTestId('login-email-input').waitFor({
    state: 'visible',
    timeout: 5000,
  });
}

async function isLoggedIn(page: Page): Promise<boolean> {
  return await page
    .getByTestId('avatar-progress')
    .isVisible()
    .catch(() => false);
}

async function waitLoginSuccess(page: Page): Promise<boolean> {
  return await page
    .getByTestId('avatar-progress')
    .waitFor({ state: 'visible', timeout: 8000 })
    .then(() => true)
    .catch(() => false);
}

async function loginWithFallback(page: Page, email: string, passwords: string[]) {
  await openLogin(page);
  await page.getByTestId('login-email-input').fill(email);

  for (const pwd of passwords) {
    console.log(`Trying password: ${pwd}`);

    await page.getByTestId('login-password-input').fill('');
    await page.getByTestId('login-password-input').fill(pwd);

let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`Trying password: ${pwd}`, {
      body: screenshot,
      contentType: 'image/png',
    });


    await page.getByTestId('login-submit-button-popup').click();

    const success = await waitLoginSuccess(page);

    if (success || (await isLoggedIn(page))) {
      console.log(`Login success with password: ${pwd}`);
      return { success: true, passwordUsed: pwd };
    }

    console.log(`Password ${pwd} is not actual, trying next one...`);

    const emailFieldVisible = await page
      .getByTestId('login-email-input')
      .isVisible()
      .catch(() => false);

    if (!emailFieldVisible) {
      await page.getByTestId('login-button').click().catch(() => {});
      await page.getByTestId('login-email-input').fill(email).catch(() => {});
    }
  }

  return { success: false, tried: passwords };
}

async function changePasswordSmart(
  page: Page,
  currentPassword: string,
  passwords: string[],
) {
  const newPassword = passwords.find((p) => p !== currentPassword);

  if (!newPassword) {
    throw new Error('Could not determine new password');
  }

  console.log(`Current password: ${currentPassword}`);
  console.log(`New password: ${newPassword}`);

await page.goto('https://sweepnext-stage.wiztechgroup-services.com/account/details');

  await page.getByTestId('avatar-progress').click();
  await page.getByTestId('account-link-account-details').click();

await page.goto('https://sweepnext-stage.wiztechgroup-services.com/account/details');

  await page.getByRole('button', { name: 'Change password' }).click();

  await page.getByTestId('change-password-current-input').fill(currentPassword);
  await page.getByTestId('change-password-new-input').fill(newPassword);
  await page.getByTestId('change-password-confirm-input').fill(newPassword);

  await delay5Seconds();
  const screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('before-change-password', {
    body: screenshot,
    contentType: 'image/png',
  });
await delay5Seconds();

  await page.getByTestId('change-password-submit-button').click();
  await delay5Seconds();

  return newPassword;
}

async function logout(page: Page) {
  await page.getByTestId('avatar-progress').click();
  await page.getByRole('button', { name: 'Log out' }).click();
  await page.getByRole('button', { name: 'Log out' }).click();
}

test('@Regress daily reward test', async ({ page }) => {
  const firstLogin = await loginWithFallback(page, EMAIL, PASSWORDS);

  expect(
    firstLogin.success,
    `Не удалось войти ни с одним из паролей: ${PASSWORDS.join(', ')}`
  ).toBeTruthy();

  if (!firstLogin.success) return;

  const currentPassword = firstLogin.passwordUsed!;
  const newPassword = await changePasswordSmart(page, currentPassword, PASSWORDS);

  await logout(page);
  await delay5Seconds();

  const secondLogin = await loginWithFallback(page, EMAIL, [newPassword]);

await delay5Seconds();
 let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`After password change, before second login`, {
      body: screenshot,
      contentType: 'image/png',
    });
await delay5Seconds();

  expect(
    secondLogin.success,
    'Не удалось залогиниться новым паролем после смены'
  ).toBeTruthy();

await delay5Seconds();

 screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`Logged in with new password`, {
      body: screenshot,
      contentType: 'image/png',
    });
await delay5Seconds();

});