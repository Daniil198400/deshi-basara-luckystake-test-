import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {


await page.getByRole('img', { name: 'close' }).click();


});