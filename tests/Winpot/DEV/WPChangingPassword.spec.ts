import { test as base, Page, expect, Locator } from '@playwright/test';
import { delay5Seconds, delay10Seconds } from '../../../utils/utils';

// ==========================================
// === CONTEXT WITH AUTO-PAGE MANAGEMENT ===
// ==========================================

const test = base.extend<{ pageWrapper: { page: Page } }>({
  pageWrapper: async ({ browser }, use) => {
    const context = await browser.newContext({});
    let currentPage: Page = await context.newPage();

    // перехват новой вкладки
    context.on('page', p => {
      console.log('🆕 New page detected — switching context.');
      currentPage = p;
    });

    // если Winpot закрывает вкладку — создаём новую
let pageClosed = false;

currentPage.on('close', () => {
  console.log('❌ Page closed by site.');
  pageClosed = true; // фиксируем факт закрытия, но НЕ создаём новую страницу!
});

    await use({ page: currentPage });

    await context.close();
  }
});

// ==========================================
// === LOCATOR HELPERS (оставляем как есть)
// ==========================================

function loginLocators(page: Page) {
  const openLoginCandidates: Locator[] = [
    page.locator('button[data-open-popup="Login"]').first(),
    page.locator('.header__button__login').first(),
    page.getByRole('banner').getByRole('button', { name: 'Acceder' }).first(),
    page.getByRole('button', { name: 'Acceder', exact: true }).first(),
  ];

  const loginForm = page.locator('form#login-form').first();
  const submitBtn = page.locator('#login-form-submit-button').first();

  const emailByLabel = page.getByRole('textbox', { name: /Usuario o Correo Electrónico/i }).first();
  const emailByType  = page.locator('form#login-form input[type="email"], form#login-form input[name="email"]').first();

  const pwdByLabel   = page.getByRole('textbox', { name: /Contraseña/i }).first();
  const pwdByType    = page.locator('form#login-form input[type="password"]').first();

  return { openLoginCandidates, loginForm, submitBtn, emailByLabel, emailByType, pwdByLabel, pwdByType };
}

async function clickFirstVisible(cands: Locator[]) {
  for (const c of cands) {
    if (await c.isVisible().catch(() => false)) {
      await c.click().catch(() => {});
      return true;
    }
  }
  return false;
}

async function ensureLoginModalOpen(page: Page) {
  const { openLoginCandidates, loginForm, submitBtn } = loginLocators(page);

  if (await loginForm.isVisible().catch(() => false)) return;
  if (await submitBtn.isVisible().catch(() => false)) return;

  const clicked = await clickFirstVisible(openLoginCandidates);

  if (!clicked) {
    await page.getByRole('button', { name: /Acceder/i }).first().click().catch(() => {});
  }

  await Promise.race([
    loginForm.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {}),
    submitBtn.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {}),
  ]);
}

async function waitLoginSuccess(page: Page, timeout = 15000) {
  const miCuenta = page.getByText('Mi cuenta').first();

  return await Promise.race([
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
}

async function getEmailInput(page: Page) {
  const { emailByLabel, emailByType } = loginLocators(page);
  return (await emailByLabel.isVisible().catch(() => false)) ? emailByLabel : emailByType;
}

async function getPasswordInput(page: Page) {
  const { pwdByLabel, pwdByType } = loginLocators(page);
  return (await pwdByLabel.isVisible().catch(() => false)) ? pwdByLabel : pwdByType;
}

// ==========================================
// === TRY LOGIN (АВТО-ВОССТАНОВЛЕНИЕ PAGE)
// ==========================================

async function tryLogin(page: Page, email: string, password: string): Promise<boolean> {
  await ensureLoginModalOpen(page);

  const emailInput = await getEmailInput(page);
  const pwdInput   = await getPasswordInput(page);
  const { submitBtn } = loginLocators(page);

  if (!(await page.isClosed())) {
    const currentEmail = await emailInput.inputValue().catch(() => '');
    if (currentEmail !== email) {
      await emailInput.fill(email).catch(() => {});
    }

    await pwdInput.click().catch(() => {});
    await pwdInput.fill('').catch(() => {});
    await pwdInput.type(password, { delay: 25 }).catch(() => {});
  }

  await expect(submitBtn).toBeEnabled({ timeout: 4000 }).catch(() => {});
  await Promise.all([
    submitBtn.click().catch(() => {}),
    page
      .waitForResponse(
        r =>
          /auth|login|signin|session/i.test(r.url()) &&
          r.request().method() === 'POST' &&
          r.status() < 500
      )
      .catch(() => null),
  ]);

  return await waitLoginSuccess(page);
}

// ==========================================
// === TWO-PASSWORD LOGIN STRATEGY
// ==========================================

async function loginWithTwoPasswords(page: Page, email: string) {
  const pass1 = 'Qwerty1!';
  const pass2 = 'Qwerty1!!';

  if (await tryLogin(page, email, pass1)) return { success: true, used: pass1, other: pass2 };

  await ensureLoginModalOpen(page);
  if (await tryLogin(page, email, pass2)) return { success: true, used: pass2, other: pass1 };

  return { success: false };
}

// ==========================================
// === TEST: CHANGE PASSWORD ON WINPOT
// ==========================================

test('changin password winpot', async ({ pageWrapper }) => {
  let page = pageWrapper.page; // всегда актуальная вкладка
  const EMAIL = 'deshi_basara121@gmail.com';

  await page.goto('https://stage-winpot.mx');
  await delay10Seconds();

  // закрываем приветственные окна
  await page.getByRole('button', { name: 'close' }).click().catch(() => {});
  await page.getByRole('button', { name: 'Sí, cancelar registro' }).click().catch(() => {});

  // === LOGIN
  const loginRes = await loginWithTwoPasswords(page, EMAIL);
  expect.soft(loginRes.success).toBeTruthy();
  if (!loginRes.success) return;

  const { used, other } = loginRes;

  // === CHANGE PASSWORD
  await page.goto('https://stage-winpot.mx/account?page=myAccount&tab=Account');
  await page.getByTestId('settings-tab').click().catch(() => {});

  await page.getByTestId('edit-password-button').click();
  await page.getByTestId('previous-password-input').fill(used);
  await page.getByTestId('new-password-input').fill(other);
  await page.getByTestId('change-password-button').click();

  await page.getByRole('button', { name: 'Bueno' }).click().catch(() => {});
  await delay5Seconds();

  // === LOGOUT
  await page.getByTestId('user-menu-section').getByText('Cerrar la sesión').click().catch(() => {});
  await page.getByRole('button', { name: 'Cerrar la sesión' }).click().catch(() => {});

  // === RE-LOGIN WITH NEW PASSWORD
  await ensureLoginModalOpen(page);
  const relog = await tryLogin(page, EMAIL, other);
  expect.soft(relog).toBeTruthy();
});
