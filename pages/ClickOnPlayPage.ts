// GamePage.ts
import { Page } from '@playwright/test';

export class GamePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async launchGameByName(gameName: string) {
    // ищем карточку игры по названию
    const gameCard = this.page.getByRole('link', { name: gameName });

    // ждём запрос на API при клике
    const [apiResponse] = await Promise.all([
      this.page.waitForResponse(resp =>
        resp.url().includes('/launch/dpg') && resp.status() === 200
      ),
      gameCard.click(), // кликаем по игре
    ]);

    const json = await apiResponse.json();
    const launchUrl = json.url;

    console.log(`🎮 Игра: ${json.title}`);
    console.log(`➡️ URL: ${launchUrl}`);

    await this.page.goto(launchUrl);
  }
}
