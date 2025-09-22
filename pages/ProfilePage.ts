// pages/ProfilePage.ts
import { Page, Locator, expect } from '@playwright/test';

export class ProfilePage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly emailField: Locator;
  readonly editButton: Locator;
  readonly saveButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // basic locators
    this.usernameField = page.locator('[data-test="username"]'); 
    this.emailField = page.locator('[data-test="email"]');
    this.editButton = page.locator('button[data-test="edit-profile"]');
    this.saveButton = page.locator('button[data-test="save-profile"]');
    this.logoutButton = page.locator('button[data-test="logout"]');
  }

  // get username
  async getUsername(): Promise<string> {
    await this.waitForProfileVisible();
    return await this.usernameField.textContent() ?? '';
  }

  // get email
  async getEmail(): Promise<string> {
    await this.waitForProfileVisible();
    return await this.emailField.textContent() ?? '';
  }

  // redact profile
  async editProfile(newUsername: string, newEmail: string) {
    await this.editButton.click();
    await this.usernameField.fill(newUsername);
    await this.emailField.fill(newEmail);
    await this.saveButton.click();
    await this.page.waitForTimeout(500); // небольшая пауза для обновления UI
  }

  // logout
  async logout() {
  await this.logoutButton.scrollIntoViewIfNeeded();
  await this.logoutButton.click();
}


  // Check if profile fields are visible
  async isProfileVisible(): Promise<boolean> {
    return await this.usernameField.isVisible();
  }

  // Wait until profile fields are visible
  private async waitForProfileVisible() {
    await expect(this.usernameField).toBeVisible({ timeout: 5000 });
    await expect(this.emailField).toBeVisible({ timeout: 5000 });
  }
}
