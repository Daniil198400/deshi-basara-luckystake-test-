import { test as base, expect } from '@playwright/test';
import { delay5Seconds, delay10Seconds } from '../../../utils/utils';

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

// ===== ВСПОМОГАТЕЛЬНЫЕ ПРОВЕРКИ =====
async function isLoggedIn(page: import('@playwright/test').Page): Promise<boolean> {
  // 1) Появился профиль/аватар/меню
  const profile = page.getByRole('link', { name: /Profile|Профиль/i }).first();
  const avatarOrMenu = page.locator('[data-testid="avatar"], [data-testid="user-menu"]');
  if (await profile.isVisible().catch(() => false)) return true;
  if (await avatarOrMenu.isVisible().catch(() => false)) return true;

  // 2) Токен в localStorage/куки
  const storageHasToken = await page
    .evaluate(() => {
      try {
        return !!localStorage.getItem('token') || document.cookie.includes('auth') || document.cookie.includes('token');
      } catch {
        return false;
      }
    })
    .catch(() => false);
  if (storageHasToken) return true;

  return false;
}

async function waitLoginSignals(page: import('@playwright/test').Page) {
  // пробуем разные признаки успеха/ошибки/закрытия модалки
  const loginModal = page.locator(
    '[data-testid="login-modal"], .login-modal, [role="dialog"][data-popup="login"], .WizPopupWrapper_root__*'
  );
  const errorSignals = page
    .locator('[role="alert"], .error, text=/Incorrect password|Неверный пароль/i')
    .first();

  const anySuccess = (async () => {
    // профиль/аватар
    const s1 = page.getByRole('link', { name: /Profile|Профиль/i }).first().waitFor({ state: 'visible', timeout: 6000 }).then(() => true);
    const s2 = page.locator('[data-testid="avatar"], [data-testid="user-menu"]').waitFor({ state: 'visible', timeout: 6000 }).then(() => true);
    const s3 = page
      .waitForFunction(
        () => !!localStorage.getItem('token') || document.cookie.includes('auth') || document.cookie.includes('token'),
        null,
        { timeout: 6000 }
      )
      .then(() => true);

    // логин-попап исчез
    const s4 = loginModal.waitFor({ state: 'hidden', timeout: 6000 }).then(() => true);

    return Promise.any([s1, s2, s3, s4]);
  })().catch(() => false);

  const anyError = errorSignals.waitFor({ state: 'visible', timeout: 6000 }).then(() => true).catch(() => false);

  // кто первый — того и тапки
  const result = await Promise.race([anySuccess, anyError]);
  return result === true; // true — успех; false — либо ошибка, либо таймаут вернул false
}

// ===== ХЕЛПЕР: логин с fallback-паролями (ОБНОВЛЕНО, НЕ ВЫБИВАЕТ) =====
async function loginWithFallback(
  page: import('@playwright/test').Page,
  email: string,
  passwords: string[],
) {
  // открываем логин
  await page.getByTestId('login-header').click();
  await page.getByTestId('email-input-login').fill(email);

  // на всякий — убедимся, что форма реально открыта
  await page
    .locator('[data-testid="password-input-login"], input[type="password"]')
    .first()
    .waitFor({ state: 'visible', timeout: 5000 })
    .catch(() => {});

  for (const pwd of passwords) {
    console.log(`Пробуем пароль: ${pwd}`);
    await page.getByTestId('password-input-login').fill(pwd);

    // ждем клик + возможный ответ логина (если есть такой эндпоинт — подставь свой паттерн)
    await Promise.all([
      page.getByTestId('submit-button-login').click(),
      page
        .waitForResponse(
          (r) =>
            /auth|login|session|signin/i.test(r.url()) &&
            r.request().method() === 'POST' &&
            r.status() < 500
        )
        .catch(() => null),
    ]);

    // ждём устойчивые сигналы успеха или падения
    const ok = await waitLoginSignals(page);
    if (ok || (await isLoggedIn(page))) {
      console.log(` Успешный логин с паролем: ${pwd}`);
      return { success: true, passwordUsed: pwd };
    }

    console.log(` Пароль ${pwd} не подошёл, пробуем следующий...`);
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
  const newPassword = passwords.find((p) => p !== currentPassword) ?? currentPassword;
  console.log(`🔄 Меняем пароль: старый = ${currentPassword}, новый = ${newPassword}`);

  await delay5Seconds();
  // await page.getByRole('link', { name: 'Profile' }).click();
await page.goto('https://luckystake.com/account/details');
  await delay10Seconds();
await delay5Seconds();


  // await page.locator('iframe[name="chat-widget-minimized"]').contentFrame().getByRole('button', { name: 'Hide greeting' }).click();
// await page.locator('iframe[name="chat-widget-minimized"]').contentFrame().getByRole('button', { name: 'Hide greeting' }).click();



  await page.getByRole('textbox', { name: 'Current password' }).fill(currentPassword);
  await page.getByRole('textbox', { name: 'New password', exact: true }).fill(newPassword);
  await page.getByRole('textbox', { name: 'Confirm New Password' }).fill(newPassword);

  await delay5Seconds();

  const screenshot = await page.screenshot({ fullPage: true });
  test.info().attach(`change password`, { body: screenshot, contentType: 'image/png' });

  await page.getByRole('button', { name: 'Change password' }).click();
  return newPassword;
}

// ===== ТЕСТ =====
test('@Regress login, change password and logout, login', async ({ page }) => {
  const PASSWORDS = ['Qwerty1!!', 'Qwerty1!!!!!!!!!!'];
  const EMAIL = 'dksld999@gmail.com';

  // для наглядности и чтобы «не выбивало» сразу — включим артефакты
  test.info().setTimeout(test.info().timeout + 15_000);
  await page.context().tracing.start({ screenshots: true, snapshots: true });

  await page.goto('https://luckystake.com/', { waitUntil: 'domcontentloaded' });
  await closePopupsIfPresent(page);

  // Первый логин
  const firstLogin = await loginWithFallback(page, EMAIL, PASSWORDS);

  // НЕ бросаем throw — сохраняем браузер и открываем инспектор при фейле
  expect.soft(firstLogin.success, `Не удалось войти ни с одним паролем: ${firstLogin.tried?.join(', ')}`).toBeTruthy();
  if (!firstLogin.success) {
    await page.screenshot({ fullPage: true }).then((buf) =>
      test.info().attach('login_failed', { body: buf, contentType: 'image/png' })
    );
    await page.context().tracing.stop({ path: 'trace.zip' });
    // Оставляем браузер открытым для ручной проверки:
    await page.pause(); // <- тут можно руками посмотреть, что не так
    return; // аккуратно выходим, не закрывая всё к чертям
  }

  const usedPassword = firstLogin.passwordUsed!;
  await delay5Seconds();

await page.goto('https://luckystake.com/account/details');
await page.locator('iframe[name="chat-widget-minimized"]').contentFrame().getByRole('button', { name: 'Hide greeting' }).click();


// Меняем пароль
  const newPassword = await changePasswordSmart(page, usedPassword, PASSWORDS);

  // Логаут
  await page.getByRole('button', { name: 'Log out' }).click();
  await page.getByRole('button', { name: 'Log out' }).nth(1).click();

  // Повторный логин с новым паролем
  await page.getByTestId('login-header').click();
  await page.getByTestId('email-input-login').fill(EMAIL);
  await page.getByTestId('password-input-login').fill(newPassword);
  await page.getByTestId('submit-button-login').click();

    let screenshot = await page.screenshot({ fullPage: true });
  test.info().attach(`password is changed`, { body: screenshot, contentType: 'image/png' });

  // ждём явный признак авторизации
  // await expect(page.getByRole('link', { name: /Profile|Профиль/i })).toBeVisible({ timeout: 10000 });

  await delay5Seconds();

 screenshot = await page.screenshot({ fullPage: true });
  test.info().attach(`re-login with new password`, { body: screenshot, contentType: 'image/png' });

//   const screenshot = await page.screenshot({ fullPage: true });
//   test.info().attach(`re-login with new password`, { body: screenshot, contentType: 'image/png' });

//   await page.context().tracing.stop({ path: 'trace.zip' });
});
