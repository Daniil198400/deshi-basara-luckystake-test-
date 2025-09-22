import { Page, FrameLocator } from '@playwright/test';

export class LoggedInPaymentForm {
  readonly page: Page;
  readonly wizCashier: FrameLocator;

  constructor(page: Page) {
    this.page = page;
    this.wizCashier = page.frameLocator('iframe[title="WizCashier"]');
  }

  async fillSecurityCode(cvv: string) {
    const cashierFrame = this.wizCashier.frameLocator('#cashierIframe');
    const cvvFrame = cashierFrame.frameLocator('iframe[name="hosted-field-frmCCCVC"]');

    // Ждем появления input по id
    await cvvFrame.locator('#frmCCCVC').waitFor({ state: 'visible', timeout: 10000 });

    // Заполняем CVV
    await cvvFrame.locator('#frmCCCVC').fill(cvv);
  }

  async deposit() {
    const cashierFrame = this.wizCashier.frameLocator('#cashierIframe');
    await cashierFrame.getByRole('button', { name: 'Deposit' }).click();
  }
}


