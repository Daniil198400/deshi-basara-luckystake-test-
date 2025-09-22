import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly popupCloseButton: Locator;
  readonly redeemButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.popupCloseButton = page.locator('.WizPopupWrapper_wrapper__container__D4qDj > .WizIconButton_base__JfGpY');
    this.redeemButton = page.getByRole('button', { name: 'Redeem' });
  }

  async closePopupIfVisible() {
    if (await this.popupCloseButton.isVisible()) {
      await this.popupCloseButton.click();
    }
  }

  async clickRedeem() {
    const button = this.redeemButton.first();

    await button.waitFor({ state: 'visible' });
    await button.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500); 

    try {
      await button.click({ force: true });
    } catch {
      const box = await button.boundingBox();
      if (box) {
        await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
      } else {
        throw new Error('Redeem button bounding box not found');
      }
    }
  }
}