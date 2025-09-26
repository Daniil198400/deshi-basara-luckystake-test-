import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://luckystake.com/');
  await page.getByRole('button').filter({ hasText: 'Search' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Providers 22' }).click();
  await page.locator('.SearchGames_search_games__cards_wrapper__8c4ac > a').first().click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();

  await page.getByText('Load More109 /').click();

  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'Novomatic' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();


  await page.getByText('/ 91').click();

  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  
  await page.getByRole('link', { name: 'Relax' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByText('/ 75').click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();


  await page.getByRole('link', { name: 'Rubyplay' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByText('/ 120').click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'Slotmill' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByText('/ 44').click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'RedRake' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByText('/ 57').click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: '1spin4win' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'Four7' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'Max Win Gaming' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'Four Leaf Gaming' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'Storm Gaming' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'Gamzix' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'Print Studios' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: '4ThePlayer' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'Fantasma Games' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'Peter & Sons' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'Octoplay' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByText('/ 98').click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'Trigger' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'Microgaming' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'Playson' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'Spinomenal' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'Iconic21' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('button').filter({ hasText: 'Search' }).click();
  await page.getByRole('button', { name: 'Categories' }).click();
  await page.locator('.CategoryItem_link__HgTQG').first().click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByText('/ 72').click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.locator('div:nth-child(2) > a:nth-child(3)').first().click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByText('/ 717').click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.locator('.CategoryItem_link__HgTQG').first().click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByText('/ 95').click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).click();

});