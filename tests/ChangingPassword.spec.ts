import { test as base, expect } from '@playwright/test';
import { delay5Seconds } from '../utils/utils';

// ===== ФИКСТУРА КОНТЕКСТА (basic auth) =====
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

// ===== ХЕЛПЕР: логин с fallback-паролями =====
async function loginWithFallback(
  page: import('@playwright/test').Page,
  email: string,
  passwords: string[],
) {
  await page.getByTestId('login-header').click();
  await page.getByTestId('email-input-login').fill(email);

  const initialUrl = page.url();

  for (const pwd of passwords) {
    console.log(`🔐 Пробуем пароль: ${pwd}`);
    await page.getByTestId('password-input-login').fill(pwd);
    await page.getByTestId('submit-button-login').click();

    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(1000);

    // Если URL поменялся — успех
    if (page.url() !== initialUrl) {
      console.log(`✅ Успешный логин с паролем: ${pwd}`);
      return { success: true, passwordUsed: pwd };
    }

    // Проверим есть ли ошибка
    const errorVisible = await page
      .locator('[role="alert"], .error, text="Incorrect password", text="Неверный пароль"')
      .first()
      .isVisible()
      .catch(() => false);

    if (!errorVisible) {
      // Проверим появился ли профиль
      const profileLinkCount = await page.getByRole('link', { name: 'Profile' }).count();
      if (profileLinkCount > 0) {
        console.log(`✅ Похоже вошли с паролем: ${pwd}`);
        return { success: true, passwordUsed: pwd };
      }
    }

    console.log(`❌ Пароль ${pwd} не подошёл, пробуем следующий...`);
  }

  return { success: false, tried: passwords };
}

// ===== ХЕЛПЕР: закрыть попапы, если есть =====
async function closePopupsIfPresent(page: import('@playwright/test').Page) {
  try {
    const closePopup = page.locator('.WizIconButton_base__JfGpY.WizPopupWrapper_close__hKtRn').first();
    if (await closePopup.isVisible().catch(() => false)) {
      await closePopup.click({ timeout: 2000 }).catch(() => {});
    }
  } catch {}
}

// ===== ХЕЛПЕР: смена пароля с автоподстановкой =====
async function changePasswordSmart(
  page: import('@playwright/test').Page,
  currentPassword: string,
  passwords: string[],
) {
  // определяем новый пароль как альтернативный из массива
  const newPassword = passwords.find((p) => p !== currentPassword) ?? currentPassword;
  console.log(`🔄 Меняем пароль: старый = ${currentPassword}, новый = ${newPassword}`);

  await page.getByRole('link', { name: 'Profile' }).click();
  await delay5Seconds();

  // Вписываем текущий и новый
  await page.getByRole('textbox', { name: 'Current password' }).click();
  await page.getByRole('textbox', { name: 'Current password' }).fill(currentPassword);

  await page.getByRole('textbox', { name: 'New password', exact: true }).click();
  await page.getByRole('textbox', { name: 'New password', exact: true }).fill(newPassword);

  await page.getByRole('textbox', { name: 'Confirm New Password' }).click();
  await page.getByRole('textbox', { name: 'Confirm New Password' }).fill(newPassword);

  await delay5Seconds();

  const screenshot = await page.screenshot({ fullPage: true });
  test.info().attach(`change password`, {
    body: screenshot,
    contentType: 'image/png',
  });

  await page.getByRole('button', { name: 'Change password' }).click();
  return newPassword;
}

// ===== ТЕСТ =====
test('@Regress login, change password and logout, login', async ({ page }) => {
  const PASSWORDS = ['Qwerty1!', 'Qwerty1!!'];
  const EMAIL = 'dksld1@gmail.com';

  await page.goto('https://luckystake.dev/');
  await closePopupsIfPresent(page);

  // Первый логин
  const firstLogin = await loginWithFallback(page, EMAIL, PASSWORDS);
  if (!firstLogin.success) {
    throw new Error(`Не удалось войти ни с одним паролем: ${firstLogin.tried?.join(', ')}`);
  }

  const usedPassword = firstLogin.passwordUsed;
  await delay5Seconds();

  // Меняем пароль (автоматически выберет противоположный)
  const newPassword = await changePasswordSmart(page, usedPassword, PASSWORDS);

  // Логаут
  await page.getByRole('button', { name: 'Log out' }).click();
  await page.getByRole('button', { name: 'Log out' }).nth(1).click();

  // Повторный логин с новым паролем
  await page.getByTestId('login-header').click();
  await page.getByTestId('email-input-login').fill(EMAIL);
  await page.getByTestId('password-input-login').fill(newPassword);
  await page.getByTestId('submit-button-login').click();

  await delay5Seconds();
  const screenshot = await page.screenshot({ fullPage: true });
  test.info().attach(`re-login with new password`, {
    body: screenshot,
    contentType: 'image/png',
  });

  // Проверим успешный вход
  await expect(page.getByRole('link', { name: 'Profile' })).toBeVisible();
});
