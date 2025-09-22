// pages/CasinoPage.ts
import { Page } from '@playwright/test';

export class CasinoPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // открыть игру по локатору и нажать "Play now"
  async openGame(selector: string) {
    await this.page.locator(selector).first().click();
    await this.page.getByRole('button', { name: 'Play now' }).click();
  }

  // открыть игру по имени (alt у картинки или aria-label)
  async openGameByName(name: string) {
    await this.page.getByRole('img', { name }).first().click();
    await this.page.getByRole('button', { name: 'Play now' }).click();
  }

  // вернуться назад
  async back() {
    await this.page.getByTestId('ArrowBackIosIcon').click();
  }
}
