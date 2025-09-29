import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://luckystake.com/');
  await page.getByRole('button', { name: 'LOG IN' }).click();
  await page.getByRole('textbox', { name: 'Email or Username' }).click();
  await page.getByRole('textbox', { name: 'Email or Username' }).fill('wiztest+70001@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Qwerty1!');
  await page.getByRole('textbox', { name: 'Password' }).press('Enter');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('img', { name: 'GC' }).click();
  await page.getByRole('img', { name: 'Bill & Coin 2: Mummy Mischief' }).first().click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.getByRole('button').filter({ hasText: 'Back' }).click();
});