import { Page, FrameLocator } from '@playwright/test';

export class PaymentForm {
  readonly page: Page;
  readonly wizCashier: FrameLocator;

  constructor(page: Page) {
    this.page = page;
    this.wizCashier = page.frameLocator('iframe[title="WizCashier"]');
  }


  async fillBillingInfo(address: string, city: string, postCode: string) {
    await this.page.getByRole('textbox', { name: 'Billing Address' }).fill(address);
    await this.page.getByRole('textbox', { name: 'City' }).fill(city);
    await this.page.getByRole('textbox', { name: 'Post Code' }).fill(postCode);
  }

  async continueToPayment() {
    await this.page.getByRole('button', { name: 'Continue the payment' }).click();
  }

  async fillCardData(name: string, number: string, expiry: string, cvv: string) {
    const cashierFrame = this.wizCashier.frameLocator('#cashierIframe');
    const hostedField = cashierFrame.frameLocator('iframe[name="hosted-field-single-iframe"]');

    await this.wizCashier.locator('svg').click(); // иконка/кнопка для перехода
    await hostedField.getByRole('textbox', { name: 'Name' }).fill(name);
    await hostedField.getByRole('textbox', { name: 'Card number' }).fill(number);
    await hostedField.getByRole('textbox', { name: '•• / ••' }).fill(expiry);
    await hostedField.getByRole('textbox', { name: 'Security Code' }).fill(cvv);
  }

  async deposit() {
    const cashierFrame = this.wizCashier.frameLocator('#cashierIframe');
    await cashierFrame.getByRole('button', { name: 'Deposit' }).click();
  }
}
