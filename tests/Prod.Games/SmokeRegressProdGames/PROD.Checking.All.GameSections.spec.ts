import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { HomePage } from '../../../pages/HomePage';
import { delay5Seconds, delay10Seconds } from '../../../utils/utils';

const test = base.extend<{}>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({});
    await use(context);
    await context.close();
  },
});

test('@CheckPresenceOfGames Prod Checking All Games Sections', async ({ context }) => {
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  // --- открываем сайт ---
  await page.goto('https://luckystake.com/');
  await homePage.closePopupIfVisible();

  let screenshot = await page.screenshot({ fullPage: true });
 
  // --- логин ---
  await loginPage.openLoginForm();
  await loginPage.login('wiztest+80001@gmail.com', 'Qwerty1!');
  await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('after_login', {
    body: screenshot,
    contentType: 'image/png',
  });

  // --- Social Games -> Popular ---
  await page.getByText('Social Games').click();
  await page.getByRole('navigation').getByRole('link', { name: 'Popular' }).click();
  await delay10Seconds();
  await page.locator('iframe[name="chat-widget-minimized"]').contentFrame().getByRole('button', { name: 'Hide greeting' }).click();
  await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('popular', {
    body: screenshot,
    contentType: 'image/png',
  });

  // --- нажимаем Load More ---
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();

  await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('popular_after_load_more', {
    body: screenshot,
    contentType: 'image/png',
  });

  await delay5Seconds();

  //----------------------------New & Exclusive--------------------------------

  await page.getByRole('navigation').getByRole('link', { name: 'New & Exclusive' }).click();
   screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('New & Exclusive 1', {
    body: screenshot,
    contentType: 'image/png',
  });

  await delay5Seconds();
  await page.getByText('New & Exclusive').nth(1).click();
  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('New & Exclusive 2', {
    body: screenshot,
    contentType: 'image/png',
  });


  // ----------------------------------Themes----------------------------------------------


  await page.getByRole('link', { name: 'Themes' }).click();
  await delay5Seconds();
  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Theme: Fruits', {
    body: screenshot,
    contentType: 'image/png',
  });

  await page.getByRole('button', { name: 'Search' }).click();
  await delay5Seconds();
  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Theme: searching', {
    body: screenshot,
    contentType: 'image/png',
  });

  // closing search button
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();

  await delay5Seconds();
  await page.getByRole('button', { name: 'Gems' }).click();
  await delay5Seconds();
  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Theme: Gems', {
    body: screenshot,
    contentType: 'image/png',
  });

  await page.getByRole('button', { name: 'Animals' }).click();
  await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Theme: Animals', {
    body: screenshot,
    contentType: 'image/png',
  });

  await page.getByRole('button', { name: 'Irish' }).click();
  await delay5Seconds();
  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Theme: Irish', {
    body: screenshot,
    contentType: 'image/png',
  });

  await delay5Seconds();
  await page.getByRole('button', { name: 'Adventure' }).click();
  await delay5Seconds();
  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Theme: Adventure 1', {
    body: screenshot,
    contentType: 'image/png',
  });
  await page.getByRole('button', { name: 'Load More' }).click();
  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Theme: Adventure 2', {
    body: screenshot,
    contentType: 'image/png',
  });

  await delay5Seconds();
  await page.getByRole('button', { name: 'Fantasy' }).click();
  await delay5Seconds();
  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Theme: Fantasy', {
    body: screenshot,
    contentType: 'image/png',
  });

  await delay5Seconds();
  await page.getByRole('button', { name: 'Mythology' }).click();
  await delay5Seconds();
  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Theme: Mythology', {
    body: screenshot,
    contentType: 'image/png',
  });

  await page.getByRole('button', { name: 'Christmas' }).click();
  await delay5Seconds();
  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Theme: Christmas', {
    body: screenshot,
    contentType: 'image/png',
  });

  //----------------------------------Slots----------------------------------------------

  await delay5Seconds();
  await page.getByRole('navigation').getByRole('link', { name: 'Slots' }).click();
  await delay5Seconds();
  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Slots1', {
    body: screenshot,
    contentType: 'image/png',
  });

  await delay5Seconds();

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

  await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Slots2', {
    body: screenshot,
    contentType: 'image/png',
  });

//-----------------------------------------Providers--------------------------------------------------

  await delay5Seconds();

  await page.getByRole('link', { name: 'Providers' }).click();
  await delay5Seconds();
  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('All Providers', {
    body: screenshot,
    contentType: 'image/png',
  });
  await delay5Seconds();

  //Platipus

  await page.getByRole('link', { name: 'Platipus' }).click();
  await delay5Seconds();
  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: Platipus1', {
    body: screenshot,
    contentType: 'image/png',
  });

  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();

  await delay5Seconds();
  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: Platipus2', {
    body: screenshot,
    contentType: 'image/png',
  });

  await delay5Seconds();

//Novomatic

  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'Novomatic' }).click();
  await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: Novomatic', {
    body: screenshot,
    contentType: 'image/png',
  });
  await delay5Seconds();

  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: Novomatic2', {
    body: screenshot,
    contentType: 'image/png',
  });

//Gamzix

  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'Gamzix' }).click();
  await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: Gamzix', {
    body: screenshot,
    contentType: 'image/png',
  });
  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  //Octoplay

  await page.getByRole('link', { name: 'Octoplay' }).click();
  await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: Octoplay1', {
    body: screenshot,
    contentType: 'image/png',
  });
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
  await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: Octoplay2', {
    body: screenshot,
    contentType: 'image/png',
  });

  //Iconic21

  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'Iconic21' }).click();
  await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: Iconic21', {
    body: screenshot,
    contentType: 'image/png',
  });

  //RedRake 

  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'RedRake' }).click();
  await delay5Seconds();
  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: RedRake1', {
    body: screenshot,
    contentType: 'image/png',
  });
  await page.getByRole('button', { name: 'Load More' }).click();
  await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: RedRake2', {
    body: screenshot,
    contentType: 'image/png',
  });
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  
  //1spin4win

  await page.getByRole('link', { name: '1spin4win' }).click();
  await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: 1spin4win', {
    body: screenshot,
    contentType: 'image/png',
  });
  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  //Four7

  await page.getByRole('link', { name: 'Four7' }).click();
  await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: Four7', {
    body: screenshot,
    contentType: 'image/png',
  });
  
    await page.getByRole('button').filter({ hasText: /^$/ }).click();

  //max win gaming

  await page.getByRole('link', { name: 'Max Win Gaming' }).click();
  await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: Max win gaming', {
    body: screenshot,
    contentType: 'image/png',
  });
  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  //Four Leaf Gaming

  await page.getByRole('link', { name: 'Four Leaf Gaming' }).click();
    await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: four leaf gaming', {
    body: screenshot,
    contentType: 'image/png',
  });

  //Storm Games

  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'Storm Gaming' }).click();
  await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: storm gaming', {
    body: screenshot,
    contentType: 'image/png',
  });

  //Relax

  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'Relax' }).click();
  await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: relax1', {
    body: screenshot,
    contentType: 'image/png',
  });
  await page.getByRole('button', { name: 'Load More' }).click();
  
  await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: relax2', {
    body: screenshot,
    contentType: 'image/png',
  });

  //Print Studios

  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'Print Studios' }).click();
    await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: print studios', {
    body: screenshot,
    contentType: 'image/png',
  });
  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  //4ThePlayer

  await page.getByRole('link', { name: '4ThePlayer' }).click();
    await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: 4ThePlayer', {
    body: screenshot,
    contentType: 'image/png',
  });

  //Fantasma Games

  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'Fantasma Games' }).click();
    await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: fantasma games', {
    body: screenshot,
    contentType: 'image/png',
  });

  //Rubyplay

  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'Rubyplay' }).click();
  await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: rubyplay1', {
    body: screenshot,
    contentType: 'image/png',
  });
  await page.getByRole('button', { name: 'Load More' }).click();
  await page.getByRole('button', { name: 'Load More' }).click();
    await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: rubyplay2', {
    body: screenshot,
    contentType: 'image/png',
  });

  //Peter & Sons

  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'Peter & Sons' }).click();
    await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: peter & sons', {
    body: screenshot,
    contentType: 'image/png',
  });
  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  //Trigger

  await page.getByRole('link', { name: 'Trigger' }).click();
    await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: trigger', {
    body: screenshot,
    contentType: 'image/png',
  });
  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  //Spinomenal

  await page.getByRole('link', { name: 'Spinomenal' }).click();
    await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: spinomenal', {
    body: screenshot,
    contentType: 'image/png',
  });

  await page.getByRole('button').filter({ hasText: /^$/ }).click();
    await delay5Seconds();

//---------------------------Slotmill---------------------------------------------

await page.getByRole('link', { name: 'Slotmill' }).click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: Slotmill1', {
    body: screenshot,
    contentType: 'image/png',
  });

await page.getByRole('button', { name: 'Load More' }).click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: Slotmill2', {
    body: screenshot,
    contentType: 'image/png',
  });
  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  // ---------------------------Microgaming---------------------------------------------

  await page.getByRole('link', { name: 'Microgaming' }).click();
  await delay5Seconds();
  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: Microgaming', {
    body: screenshot,
    contentType: 'image/png',
  });
  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  //-----------------Playson----------------------

  await page.getByRole('link', { name: 'Playson' }).click();
  await delay5Seconds();
  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Providers: Playson', {
    body: screenshot,
    contentType: 'image/png',
  });

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Clicking back', {
    body: screenshot,
    contentType: 'image/png',
  });

  await page.getByRole('button').filter({ hasText: /^$/ }).click();

  await delay5Seconds();

  screenshot = await page.screenshot({ fullPage: true });
  test.info().attach('Clicking Back: Lobby', {
    body: screenshot,
    contentType: 'image/png',
  });
});






