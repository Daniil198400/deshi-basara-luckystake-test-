import { test as base, Page, expect, Locator } from '@playwright/test';
import { delay5Seconds, delay10Seconds } from '../../../utils/utils';

// ===== контекст =====
const test = base.extend<{}>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({});
    await use(context);
    await context.close();
  },
});

// ===== утилиты локаторов =====
function loginLocators(page: Page) {
  // Кандидаты на кнопку открытия логина (самый стабильный — data-open-popup="Login")
  const openLoginCandidates: Locator[] = [
    page.locator('button[data-open-popup="Login"]').first(),
    page.locator('.header__button__login').first(),
    page.getByRole('banner').getByRole('button', { name: 'Acceder' }).first(),
    page.getByRole('button', { name: 'Acceder', exact: true }).first(),
  ];

  // форма логина и её элементы
  const loginForm = page.locator('form#login-form').first();
  const submitBtn = page.locator('#login-form-submit-button').first(); // привязываемся к id
  // email / password — сначала по лейблам, иначе — по типу
  const emailByLabel = page.getByRole('textbox', { name: /Usuario o Correo Electrónico/i }).first();
  const emailByType  = page.locator('form#login-form input[type="email"], form#login-form input[name="email"]').first();
  const pwdByLabel   = page.getByRole('textbox', { name: /Contraseña/i }).first();
  const pwdByType    = page.locator('form#login-form input[type="password"]').first();

  return { openLoginCandidates, loginForm, submitBtn, emailByLabel, emailByType, pwdByLabel, pwdByType };
}

async function clickFirstVisible(cands: Locator[]) {
  for (const c of cands) {
    try {
      if (await c.isVisible({ timeout: 500 }).catch(() => false)) {
        await c.click({ timeout: 2000 });
        return true;
      }
    } catch {}
  }
  return false;
}

async function ensureLoginModalOpen(page: Page) {
  const { openLoginCandidates, loginForm, submitBtn } = loginLocators(page);

  // Уже открыта?
  if (await loginForm.isVisible().catch(() => false) || await submitBtn.isVisible().catch(() => false)) return;

  // Пытаемся кликнуть по любому «Acceder»
  const clicked = await clickFirstVisible(openLoginCandidates);
  if (!clicked) {
    // финальный грубый фоллбэк — попробовать любой видимый button Acceder
    await page.getByRole('button', { name: /Acceder/i }).first().click().catch(() => {});
  }

  // Ждём появления именно формы/кнопки сабмита
  await Promise.race([
    loginForm.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {}),
    submitBtn.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {}),
  ]);
}

async function waitLoginSuccess(page: Page, timeout = 15000) {
  const miCuenta = page.getByText('Mi cuenta').first();
  const ok = await Promise.race([
    miCuenta.waitFor({ state: 'visible', timeout }).then(() => true).catch(() => false),
    page
      .waitForFunction(
        () => !!localStorage.getItem('token') || document.cookie.includes('auth') || document.cookie.includes('token'),
        null,
        { timeout }
      )
      .then(() => true)
      .catch(() => false),
  ]);
  return ok;
}

async function getEmailInput(page: Page) {
  const { emailByLabel, emailByType } = loginLocators(page);
  if (await emailByLabel.isVisible().catch(() => false)) return emailByLabel;
  return emailByType;
}

async function getPasswordInput(page: Page) {
  const { pwdByLabel, pwdByType } = loginLocators(page);
  if (await pwdByLabel.isVisible().catch(() => false)) return pwdByLabel;
  return pwdByType;
}

// === единичная попытка логина конкретным паролем ===
async function tryLogin(page: Page, email: string, password: string): Promise<boolean> {
  await ensureLoginModalOpen(page);

  const emailInput = await getEmailInput(page);
  const pwdInput   = await getPasswordInput(page);
  const { submitBtn } = loginLocators(page);

  // email
  const currentEmail = (await emailInput.inputValue().catch(() => '')) || '';
  if (currentEmail !== email) await emailInput.fill(email);

  // пароль — жёсткая очистка и ввод
  await pwdInput.click().catch(() => {});
  await pwdInput.fill('').catch(() => {});
  await pwdInput.press('Control+A').catch(() => {});
  await pwdInput.press('Delete').catch(() => {});
  await pwdInput.type(password, { delay: 15 }).catch(() => {});

  // сабмит (если disabled — всё равно пробуем; некоторые формы снимают disabled после input)
  await expect(submitBtn).toBeEnabled({ timeout: 3000 }).catch(() => {});
  await Promise.all([
    submitBtn.click().catch(() => {}),
    page
      .waitForResponse(
        (r) =>
          /auth|login|signin|session/i.test(r.url()) &&
          r.request().method() === 'POST' &&
          r.status() < 500
      )
      .catch(() => null),
  ]);

  return await waitLoginSuccess(page, 15000);
}

// === логин с двумя паролями: сначала Qwerty1!, затем Qwerty1!! ===
async function loginWithTwoPasswords(page: Page, email: string) {
  const first = 'Qwerty1!';
  const second = 'Qwerty1!!';

  // 1) пробуем первый
  const ok1 = await tryLogin(page, email, first);
  if (ok1) return { success: true as const, usedPassword: first, otherPassword: second };

  // 2) если не зашло — переоткрыть модалку и попробовать второй
  await ensureLoginModalOpen(page);
  const ok2 = await tryLogin(page, email, second);
  if (ok2) return { success: true as const, usedPassword: second, otherPassword: first };

  return { success: false as const };
}

// ===== ТЕСТ =====
test('changin password winpot', async ({ context }) => {
  const page = await context.newPage();
  const EMAIL = 'deshi_basara121@gmail.com';

  await page.goto('https://stage-winpot.mx');
  await delay5Seconds();
  await delay10Seconds();

  // закрыть приветственные окна, если есть
  await page.getByRole('button', { name: 'close' }).click().catch(() => {});
  await delay5Seconds();
  await page.getByRole('button', { name: 'Sí, cancelar registro' }).click().catch(() => {});
  await delay5Seconds();

  // === ЛОГИН: Qwerty1! -> Qwerty1!! ===
  const loginRes = await loginWithTwoPasswords(page, EMAIL);

  const loginShot = await page.screenshot({ fullPage: true });
  test.info().attach('Login', { body: loginShot, contentType: 'image/png' });

  expect.soft(loginRes.success, 'Логин не распознан ни одним из паролей').toBeTruthy();
  if (!loginRes.success) return;

  const used  = (loginRes as any).usedPassword as string;   // с каким вошли
  const other = (loginRes as any).otherPassword as string;  // второй — станет новым

  // === Смена пароля: текущий = used, новый = other ===
  // await expect(page.getByText('Mi cuenta').first()).toBeVisible({ timeout: 15000 });
  await page.getByText('Mi cuenta').first().click();

  await page.goto('https://stage-winpot.mx/account?page=myAccount&tab=Account');
  await page.getByTestId('settings-tab').click();

  await page.getByTestId('edit-password-button').click();
  await page.getByTestId('previous-password-input').fill(used);
  await page.getByTestId('new-password-input').fill(other);
  await page.getByTestId('change-password-button').click();

  await delay5Seconds();
  const changeShot = await page.screenshot({ fullPage: true });
  test.info().attach('Changing Password', { body: changeShot, contentType: 'image/png' });

  // подтверждение
  await page.getByRole('button', { name: 'Bueno' }).click().catch(() => {});
  await delay5Seconds();

  // === ЛОГАУТ ===
  await page.getByTestId('user-menu-section').getByText('Cerrar la sesión').click().catch(() => {});
  await delay5Seconds();
  await page.getByRole('button', { name: 'Cerrar la sesión' }).click().catch(() => {});
  await delay5Seconds();

  // === Повторный вход новым паролем ===
  await ensureLoginModalOpen(page);
  const relogOk = await tryLogin(page, EMAIL, other);

  const relogShot = await page.screenshot({ fullPage: true });
  test.info().attach('Re-login with new password', { body: relogShot, contentType: 'image/png' });

  expect.soft(relogOk, 'Повторный вход новым паролем не распознан').toBeTruthy();
});
