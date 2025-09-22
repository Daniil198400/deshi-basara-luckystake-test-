import { Page } from '@playwright/test';

//FIRST STEP OF REGISTRATION

// Universal function to fill input fields by their name
export async function fillField(page: Page, name: string, value: string) {
  await page.getByRole('textbox', { name }).fill(value);
}

// Universal function to click buttons by their name
export async function clickButton(page: Page, name: string) {
  const button = page.getByRole('button', { name }).first();

  // Wait until the button is visible
  await button.waitFor({ state: 'visible' });

  // Wait until the button is attached to the DOM and scroll into view if needed
  await button.waitFor({ state: 'attached' });
  await button.scrollIntoViewIfNeeded();

  // click the button 
  await button.click({ force: false }); // force: false — ждёт интерактивности
}




//SECOND STEP OF REGISTRATION

// reliable delay function
export async function clickCheckboxByLabel(page: Page, labelText: string) {
  const label = page.locator('label').filter({ hasText: labelText });
  await label.waitFor({ state: 'visible' });

  const span = label.locator('span');
  const handle = await span.elementHandle();
  if (handle) {
    await page.evaluate(el => (el as HTMLElement).click(), handle);
  }
}

// helper for user form
export class UserFormHelper {
  constructor(private page: Page) {}

  private async safeClick(locator: ReturnType<Page['getByRole'] | Page['getByText']>) {
    await locator.waitFor({ state: 'visible' });
    const handle = await locator.elementHandle();
    if (handle) {
      await this.page.evaluate(el => (el as HTMLElement).click(), handle);
    }
  }

  async fillUserForm(
    firstName: string,
    lastName: string,
    state: string,
    month: string,
    day: string,
    year: string
  ) {
    await this.page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);

    // State selection
    const stateDropdown = this.page.getByRole('textbox', { name: 'Select State' });
    await stateDropdown.click();
    await this.safeClick(this.page.getByText(state));

    // Month selection
    const monthDropdown = this.page.getByRole('textbox', { name: 'MM' });
    await monthDropdown.click();
    await this.safeClick(this.page.getByRole('listitem').filter({ hasText: month }));

    // day and year input
    await this.page.getByRole('textbox', { name: 'DD' }).fill(day);
    await this.page.getByRole('textbox', { name: 'YYYY' }).fill(year);

    // Button of Continue
    await this.safeClick(this.page.getByRole('button', { name: 'Continue' }));
  }
}

