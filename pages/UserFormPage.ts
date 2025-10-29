// pages/UserFormPage.ts
import { Page, Locator, expect } from '@playwright/test';

// Общие настройки/константы
const DEFAULT_TIMEOUT = 10_000;

/* =========================
   БАЗОВЫЕ УТИЛИТЫ (экспорт)
   ========================= */

// Ввод текста по доступному имени инпута
export async function fillField(page: Page, name: string, value: string) {
  const input = page.getByRole('textbox', { name });
  await input.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
  await input.fill(value);
}

// Клик по кнопке по доступному имени
export async function clickButton(page: Page, name: string) {
  const button = page.getByRole('button', { name }).first();
  await expect(button).toBeVisible({ timeout: DEFAULT_TIMEOUT });
  await button.scrollIntoViewIfNeeded();
  try {
    await button.click({ timeout: DEFAULT_TIMEOUT }); // нормальный клик
  } catch {
    await button.click({ force: true, timeout: DEFAULT_TIMEOUT }); // крайний случай
  }
}

// Клик по чекбоксу по метке (поддерживает скрытые input'ы)
export async function clickCheckboxByLabel(page: Page, labelText: string) {
  // 1) основной путь — через ассоциацию label↔input
  try {
    const control = page.getByLabel(labelText, { exact: false });
    await control.check({ force: true, timeout: DEFAULT_TIMEOUT });
    return;
  } catch {
    // пойдём на фоллбек
  }

  // 2) фоллбек: клик по самому label
  const label = page.locator('label', { hasText: labelText }).first();
  await label.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
  await label.click({ force: true });

  // 3) на всякий — проверим, что инпут стал checked
  const forAttr = await label.getAttribute('for');
  if (forAttr) {
    const input = page.locator(`#${forAttr}`);
    await input.waitFor({ state: 'attached', timeout: DEFAULT_TIMEOUT });
    if (!(await input.isChecked().catch(() => false))) {
      await input.check({ force: true });
    }
  }
}

/* =========================
   ВНУТРЕННИЙ ХЕЛПЕР КЛИКА
   ========================= */

async function safeClick(locator: Locator, timeout = DEFAULT_TIMEOUT) {
  await locator.waitFor({ state: 'visible', timeout });
  // «примерный» клик — если элемент не готов, упадёт быстро
  try {
    await locator.click({ timeout, trial: true });
  } catch {
    await locator.scrollIntoViewIfNeeded();
  }
  // обычный клик
  try {
    await locator.click({ timeout });
  } catch {
    // последний шанс, если перекрыт
    await locator.click({ force: true, timeout });
  }
}

/* =========================================
   ХЕЛПЕР ДЛЯ ПОПАПА / КНОПКИ START PLAYING
   ========================================= */

// Если появляется крестик — закрываем.
// Если появляется START PLAYING в 3-м iframe — жмём.
// Если появляются оба последовательно — кликнем по обоим.
export async function handleStartPlayingOrClose(page: Page, timeout = 5_000) {
  const closePopup = page.locator('.WizIconButton_base__JfGpY.WizPopupWrapper_close__hKtRn');
  const startPlaying = page
    .frameLocator('iframe')
    .nth(2)
    .getByRole('link', { name: 'START PLAYING' });

  let clicked = false;

  // 1) крестик
  if (await closePopup.isVisible({ timeout }).catch(() => false)) {
    console.log('→ появилось окно с крестиком, кликаем "close"');
    await closePopup.click({ force: true });
    clicked = true;
    await page.waitForTimeout(1200); // даём показаться следующему окну, если есть
  }

  // 2) START PLAYING
  if (await startPlaying.isVisible({ timeout }).catch(() => false)) {
    console.log('→ появилось окно "START PLAYING", кликаем по нему');
    await startPlaying.click();
    clicked = true;
    await page.waitForTimeout(600);
  }

  if (!clicked) {
    console.log('→ ни одно окно не появилось, продолжаем тест');
  }
}

/* =========================
   КЛАСС ДЛЯ 2-ГО ШАГА ФОРМЫ
   ========================= */

export class UserFormHelper {
  constructor(private page: Page) {}

  /**
   * Заполнение формы пользователя (второй шаг)
   * state/month выбираем из открывшихся списков
   */
  async fillUserForm(
    firstName: string,
    lastName: string,
    state: string,
    month: string,
    day: string,
    year: string
  ) {
    if (this.page.isClosed()) throw new Error('Page was closed before filling user form');

    // Имя/Фамилия
    await fillField(this.page, 'First Name', firstName);
    await fillField(this.page, 'Last Name', lastName);

    // На всякий — почистим всплывашки перед важными кликами
    await handleStartPlayingOrClose(this.page);

    // Выбор штата (поле "Select State" обычно role=textbox с выпадашкой)
    const stateDropdown = this.page.getByRole('textbox', { name: 'Select State' });
    await safeClick(stateDropdown);

    // Ищем пункт в открывшемся меню: покрываем возможные роли/теги
    const stateOption = this.page
      .locator(
        // чаще всего это option/menuitem; на всякий — li и role=listitem
        '[role="option"], [role="menuitem"], li, [role="listitem"]'
      )
      .filter({ hasText: state })
      .first();

    await safeClick(stateOption);

    // Выбор месяца (MM)
    await handleStartPlayingOrClose(this.page); // иногда меню/оверлеи мешают
    const monthDropdown = this.page.getByRole('textbox', { name: 'MM' });
    await safeClick(monthDropdown);

    const monthOption = this.page
      .locator('[role="option"], [role="menuitem"], li, [role="listitem"]')
      .filter({ hasText: month })
      .first();

    await safeClick(monthOption);

    // День / Год
    await fillField(this.page, 'DD', day);
    await fillField(this.page, 'YYYY', year);

    // Кнопка Continue
    await safeClick(this.page.getByRole('button', { name: 'Continue' }));
  }
}
