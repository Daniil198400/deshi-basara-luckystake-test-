import { Page, Locator, expect } from '@playwright/test';

export class LoggedInPaymentForm {
  readonly page: Page;
  private readonly waitTimeout = 30_000;

  constructor(page: Page) {
    this.page = page;
  }

  /** Корень кассы: WizCashier -> #cashierIframe */
  private get cashierRoot() {
    return this.page
      .frameLocator('iframe[title="WizCashier"]')
      .frameLocator('#cashierIframe');
  }

  /** Локатор инпута CVV */
  private getCVVLocator(): Locator {
    // Берём все hosted-field-iframe, имя которых начинается на "frmC..." (CVV/CVC/CCCVC и т.п.)
    const inner = this.cashierRoot.frameLocator('iframe[name^="hosted-field-frmC"]');

    const byRole = inner.getByRole('textbox', { name: /security\s*code|cvv|cvc/i });
    const byAttr = inner.locator(
      'input[placeholder*="CVV" i], input[placeholder*="Security" i], input[type="tel"], input[type="text"]'
    );
    // сначала ARIA, если нет — берём по атрибутам
    return byRole.or(byAttr.first());
  }

  /** Локатор инпута номера карты */
  private getCardNumberLocator(): Locator {
    // Захватываем любые hosted-field-iframe и фильтруем уже по самому инпуту
    // (это надёжнее, чем угадывать варианты имён CardNumber/CCNumber/...)
    const anyHosted = this.cashierRoot.frameLocator('iframe[name^="hosted-field-frm"]');

    const byRole = anyHosted.getByRole('textbox', { name: /card\s*number/i });
    const byAttr = anyHosted.locator(
      'input[placeholder*="card" i], input[type="tel"], input[type="text"]'
    );
    return byRole.or(byAttr.first());
  }

  /** Кнопка Deposit */
  private getDepositButton(): Locator {
    return this.cashierRoot.getByRole('button', { name: /deposit/i });
  }

  // ===== Публичные действия =====

  async fillSecurityCode(cvv: string) {
    const cvvInput = this.getCVVLocator();
    await cvvInput.waitFor({ state: 'visible', timeout: this.waitTimeout });
    await cvvInput.fill(cvv);
  }

  async fillCardNumber(cardNumber: string) {
    const input = this.getCardNumberLocator();
    await input.waitFor({ state: 'visible', timeout: this.waitTimeout });
    await input.fill(cardNumber);
  }

  async deposit() {
    const btn = this.getDepositButton();
    await expect(btn).toBeVisible({ timeout: this.waitTimeout });
    await btn.click();
  }

  // ===== Доп. хелпер для отладки (по желанию) =====
  async debugListHostedFields() {
    const frames = this.page.frames();
    for (const fr of frames) {
      const name = fr.name();
      if (/hosted-field-/i.test(name)) {
        console.log('HostedField:', name, 'url:', fr.url());
        try {
          console.log('  inputs:', await fr.locator('input').count());
        } catch {
          /* noop */
        }
      }
    }
  }
}
