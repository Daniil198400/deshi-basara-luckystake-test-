import { test } from '@playwright/test';
import { delay10Seconds, delay5Seconds } from '../utils/utils';


const emails = [
  'robbietyohvhc@gmail.com', 
  'robbiethuqrvd@gmail.com',
  'robbietihvxje@gmail.com',
  'robbiemznccsf@gmail.com',
  'robbieqprftkg@gmail.com',
  'robbieesktwmh@gmail.com',
  'robbiekjtdfii@gmail.com',
  'robbientxcijj@gmail.com',
  'robbienoeutck@gmail.com',
  'robbiegcvebul@gmail.com',
  'robbietskrxvm@gmail.com',
  'robbieldomyqn@gmail.com',
  'robbieqzjlmmo@gmail.com',
  'robbiehvyqyap@gmail.com',
  'robbieofsscbq@gmail.com',
  'robbieiuxqinr@gmail.com',
  'robbieegcvqjs@gmail.com',
  'robbiezvfozqt@gmail.com',
  'robbietfoxxtu@gmail.com',
  'robbieegwmhvv@gmail.com',
  'robbieuujurmw@gmail.com',
  'robbiegmdlrfx@gmail.com',
  'robbieljfhcky@gmail.com',
  'robbiexsuyxjz@gmail.com',
  'robbieqegvazaa@gmail.com',
  'robbieegrdpuab@gmail.com',
  'robbiexhrsnhac@gmail.com',
  'robbiethtolrad@gmail.com',
  'robbiemtwqkjae@gmail.com',
  'robbiebdzuruaf@gmail.com',
  'robbieghzhbxag@gmail.com',
  'robbieygcjimah@gmail.com',
  'robbieewyvgxai@gmail.com',
  'robbielohvteaj@gmail.com',
  'robbieghdnsfak@gmail.com',
  'robbieyzquzkal@gmail.com',
  'robbiefjiogzam@gmail.com',
  'robbiewkivrtan@gmail.com',
  'robbieuyqmizao@gmail.com',
  'robbierzduwtap@gmail.com',
  'robbiegbdofpaq@gmail.com',
  'robbiebnrsdpar@gmail.com',
  'robbiejqblouas@gmail.com',
  'robbienfriayat@gmail.com',
  'robbieydjdfvau@gmail.com',
  'robbiezzuohoav@gmail.com',
  'robbieyxqpzmaw@gmail.com',
  'robbiegowvsyax@gmail.com',
  'robbievhhbejay@gmail.com',
  'robbiesxrpfraz@gmail.com',
  'robbieabymmqba@gmail.com',
  'robbieytrnlkbb@gmail.com',
  'robbieprmgpabc@gmail.com',
  'robbiegejxfmbd@gmail.com',
  'robbiezivkctbe@gmail.com',
  'robbiemkyzrcbf@gmail.com',
  'robbieaqlgflbg@gmail.com',
  'robbiefpplcjbh@gmail.com',
  'robbiezkjsnobi@gmail.com',
  'robbiebeigpjbj@gmail.com',
  'robbiedafciobk@gmail.com',
];

async function processPlayer(page, email: string) {
  await page.goto(
    'https://stage.fk.wiz-crm.com/crm/player-list/77576/verification?brand-id=e38dff87-f061-40e9-a9d0-e813433f66a2&casino-promotions-filters=%7B"status"%3A%5B"Pending"%2C"Running"%5D%7D&kyc-filters=%7B"kyc"%3A%5B"Review"%2C"Declined"%2C"Approved"%2C"Pending"%2C"New"%2C"Expired"%5D%7D&game-management-promo-filters=%7B"providerName"%3A"5e07a64b-0d96-4ab1-abbf-a952558f59af"%7D&withdrawals-filters=%7B"agent_owner"%3A%5B"3a970f98-d489-44cf-9256-751a3a50e55c"%5D%7D&games-db-filters=%7B"externalDesktopId"%3A"hub88_grt_caligula"%7D&game-management-filters=%7B"externalDesktopId"%3A"tupwctrdzp6aayy3"%7D'
  );

  await page.getByTestId('entity-search-input').click();
  await page.getByTestId('entity-search-input').fill(email);
    await delay5Seconds();
//   await page.getByRole('link', { name: 'No.' }).click();


//   await page4.getByTestId('entity-search-input').click();
//   await page4.getByTestId('entity-search-input').press('Enter');
//   await page4.getByTestId('entity-search-input').press('Enter');
  await page.getByTestId('entity-search-input').press('Enter');

    await delay5Seconds();

  await page.getByRole('link', { name: 'General' }).click();
  await delay5Seconds();
  await page.getByRole('textbox', { name: 'First Name' }).click();
    await delay5Seconds();

  await page.getByRole('textbox', { name: 'First Name' }).fill('vv');
    await delay5Seconds();

  await page.getByRole('textbox', { name: 'Last Name' }).click();
    await delay5Seconds();

  await page.getByRole('textbox', { name: 'Last Name' }).fill('vvv');
    await delay5Seconds();

  await page.getByRole('textbox', { name: 'Birth Date' }).click();
  await delay5Seconds();

  await page.getByRole('button').filter({ hasText: /^$/ }).first().dblclick();

  for (let i = 0; i < 18; i++) {
    await page.getByRole('button').filter({ hasText: /^$/ }).first().click();
  }
  await delay5Seconds();

  await page.getByTitle('-03-04').locator('div').click();
    await delay5Seconds();

  await page.getByRole('textbox', { name: 'City' }).click();
    await delay5Seconds();

  await page.getByRole('textbox', { name: 'City' }).fill('bvbvb');
    await delay5Seconds();

  await page.getByRole('textbox', { name: 'Street' }).click();
    await delay5Seconds();

  await page.getByRole('textbox', { name: 'Street' }).fill('bgbgb');
    await delay5Seconds();

  await page.getByRole('textbox', { name: 'Zipcode' }).click();
    await delay5Seconds();

  await page.getByRole('textbox', { name: 'Zipcode' }).fill('33444');
    await delay5Seconds();

  await page.getByTestId('btn-footer-submit').click();
    await delay5Seconds();

  await page
    .getByRole('dialog', { name: 'Save Changes Are you sure you' })
    .getByTestId('btn-footer-submit')
    .click();

      await delay5Seconds();


  await page.getByRole('link', { name: 'Communication' }).click();

    await delay5Seconds();

  await page.locator('#isPhoneVerified').click();
    await delay5Seconds();

  await page.getByTestId('btn-footer-submit').click();
    await delay5Seconds();

  await page
    .getByRole('dialog', { name: 'Save Changes Are you sure you' })
    .getByTestId('btn-footer-submit')
    .click();

  await page.locator('#main-content').getByRole('link', { name: 'Overview' }).click();
    await delay5Seconds();

  await page.getByTestId('btn-player-balances-manual-adjustment').click();
    await delay5Seconds();

  await page.locator('#amount').click();
  await page.locator('#amount').fill('5,0000');
    await delay5Seconds();

  await page.getByTestId('btn-footer-submit').click();
    await delay5Seconds();

}

test('@Regress insta', async ({ page }) => {
  for (const email of emails) {
    console.log(`Processing: ${email}`);
    await processPlayer(page, email);
  }
});