import { test as base, Page, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { HomePage } from '../../../pages/HomePage';
import { delay5Seconds, delay10Seconds } from '../../../utils/utils';

// httpCredentials
const test = base.extend<{}>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
    });
    await use(context);
    await context.close();
  },
});

// function for working on all oid
async function fetchAllOids(): Promise<string[]> {
  const url = "https://winpot-cdn.mx/prod/games_pack/00000000-0000-0000-0000-000000000001.json";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Не удалось скачать JSON: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.games || !Array.isArray(data.games)) {
    console.warn("Поле games не найдено или не массив");
    return [];
  }

  // all oids in an array
  const allOids = data.games.map((g: any) => g.oid);
  console.log(`all oid for checking: ${allOids.length}`);
  return allOids;
}

//  main function to play games by their IDs
async function playGames(page: Page, gameIds: string[]) {
  for (const id of gameIds) {
    const gameUrl = `https://stage-winpot.mx/game/real/${id}`;
    console.log(`Открываю игру ${id}: ${gameUrl}`);
    await page.goto(gameUrl);
try {
  await page.waitForLoadState('networkidle', { timeout: 50000 }); 
} catch (e) {
  console.warn('network idle is not found after 50 sec');
  // continue – next steps
}
  
    await delay10Seconds();
    await delay10Seconds();

    // screenshot before Play now
    let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_before_playNow`, {
      body: screenshot,
      contentType: 'image/png',
    });

    await delay5Seconds();
  }
}

// the very Test
test('PROD, ALL GAMES', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

   await page.goto('https://stage-winpot.mx');
  
   await page.getByRole('button', { name: 'Acceder', exact: true }).click();
   await page.getByRole('textbox', { name: 'Usuario o Correo Electrónico' }).click();
   await page.getByRole('textbox', { name: 'Usuario o Correo Electrónico' }).fill('deshi_basara121@gmail.com');
   await page.getByRole('textbox', { name: 'Contraseña Contraseña' }).click();
   await page.getByRole('textbox', { name: 'Contraseña Contraseña' }).fill('Qwerty1!');
   await page.locator('#login-form-submit-button').click();
 await delay10Seconds();
 
 let screenshot = await page.screenshot({ fullPage: true });
     test.info().attach(`Login`, {
       body: screenshot,
       contentType: 'image/png',
     });

       // Take all oids
  const oids = await fetchAllOids();

  if (oids.length === 0) {
    test.skip();
    return;
  }

  // laucnhing the games
  await playGames(page, oids);
  });