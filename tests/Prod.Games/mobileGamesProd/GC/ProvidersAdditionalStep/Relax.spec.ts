import { test, Page } from '@playwright/test';
import { LoginPage } from '../../../../../pages/LoginPage';
import { HomePage } from '../../../../../pages/HomePage';
import { GamePage } from '../../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../../utils/utils';


// Тест Relax
test('@ClickOnAdditionalStepMobile Relax', async ({ page }) => {
    await page.goto('https://luckystake.com/');

  await page.getByTestId('login-header').click();
  await page.getByTestId('email-input-login').click();
  await page.getByTestId('email-input-login').fill('wiztest+80001@gmail.com');
  await page.getByTestId('password-input-login').click();
  await page.getByTestId('password-input-login').fill('Qwerty1!');
  await page.getByTestId('submit-button-login').click();

    await delay5Seconds();

  await page.goto('https://luckystake.com/');
       const scImage = page.getByRole('img', { name: 'SC', exact: true });
        if (await scImage.isVisible()) {
          await scImage.scrollIntoViewIfNeeded();
          await scImage.click({ force: true });
          console.log('Клик по SC');
        }
      
        await delay5Seconds();

//Playing 28593 game cause of trouble button
await page.goto('https://luckystake.com/game/real/28593');
await delay5Seconds();
let screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28593_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await page.getByRole('button', { name: 'Play now' }).click();

await delay10Seconds();

try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'Tap to continue' }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28593_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();

//28591
await page.goto('https://luckystake.com/game/real/28591');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28591_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('.logo').click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28591_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();

//28546
await page.goto('https://luckystake.com/game/real/28546');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28546_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('.videoPlay').click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28546_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();



//28533
await page.goto('https://luckystake.com/game/real/28533');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28533_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('canvas').nth(1).click({
    position: {
      x: 181,
      y: 547
    }
  });

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28533_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();


//28551

await page.goto('https://luckystake.com/game/real/28551');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28551_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'START' }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28551_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();

//28555
await page.goto('https://luckystake.com/game/real/28555');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28555_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'TWO WAYS TO WIN FREE SPINS!' }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28555_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();

//28549
await page.goto('https://luckystake.com/game/real/28549');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28549_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'UNDER LICENSE FROM FREE SPINS' }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28555_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();

// await playGames(page);

//28609

await page.goto('https://luckystake.com/game/real/28609');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28609_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Tap to continue').click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28609_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();

//28533

await page.goto('https://luckystake.com/game/real/28533');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28533_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('canvas').nth(1).click({
    position: {
      x: 214,
      y: 593
    }
  });

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28533_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();

//28606

await page.goto('https://luckystake.com/game/real/28606');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28606_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'Mystery Reveal Free Spins Tap' }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28606_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();

//28613

await page.goto('https://luckystake.com/game/real/28613');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28613_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('TAP TO CONTINUE').click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28613_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();

//28561

await page.goto('https://luckystake.com/game/real/28561');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28561_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'BOARD GAME FREE SPINS FORTUNE' }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28561_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();

//28545

await page.goto('https://luckystake.com/game/real/28545');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28545_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'Win up to 50 000x Tap to' }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28545_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();

//28616

await page.goto('https://luckystake.com/game/real/28616');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28616_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'LOCK-IN RE-SPINS TREASURE' }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28616_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();


//21067

await page.goto('https://luckystake.com/game/real/21067');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_21067_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Tap to continue').click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_21067_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();

//28547

await page.goto('https://luckystake.com/game/real/28547');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28547_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: '3 DEPTH LEVELS WILD RESPIN' }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28547_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();



//28568

await page.goto('https://luckystake.com/game/real/28568');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28568_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28568_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();

//28550

await page.goto('https://luckystake.com/game/real/28550');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28550_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('PlaceHolder').click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28550_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();


//28551

await page.goto('https://luckystake.com/game/real/28551');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28551_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'START' }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28551_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();



//28555

await page.goto('https://luckystake.com/game/real/28555');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28555_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'TWO WAYS TO WIN FREE SPINS!' }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28555_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();

//28563

await page.goto('https://luckystake.com/game/real/28563');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28563_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('CLICK TO CONTINUE').click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28563_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();


//28534

await page.goto('https://luckystake.com/game/real/28534');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28534_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28534_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();


//28568

await page.goto('https://luckystake.com/game/real/28568');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28568_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();


await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28568_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();


//28549

await page.goto('https://luckystake.com/game/real/28549');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28549_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'START', exact: true }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28549_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();




//28609

await page.goto('https://luckystake.com/game/real/28609');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28609_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28609_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();



//28607

await page.goto('https://luckystake.com/game/real/28607');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28607_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('START').click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28607_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();


//28612

await page.goto('https://luckystake.com/game/real/28612');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28612_before_click`, {
  body: screenshot,
  contentType: 'image/png'
});
try {
      await page.waitForLoadState('networkidle', { timeout: 30000 });
    } catch {
      console.warn('Network idle не наступил за 30 сек, продолжаем...');
    }
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('heading', { name: 'Click to continue' }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28612_after_click`, {
  body: screenshot,
  contentType: 'image/png'
});
await delay5Seconds();








//------------------------------------------------------------------------------

// ID: 28547
// await page.goto('https://luckystake.com/game/real/28547');
// await delay5Seconds();
// await page.getByRole('button', { name: 'Play now' }).click();
// await delay10Seconds();
// screenshot = await page.screenshot({ fullPage: true });
// test.info().attach(`game_28547_before_click`, { body: screenshot, contentType: 'image/png' });
// try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
// await delay5Seconds();

// CANNOT BE TESTED AUTOMATICALLY 

// await delay5Seconds();
// screenshot = await page.screenshot({ fullPage: true });
// test.info().attach(`game_28547_after_click`, { body: screenshot, contentType: 'image/png' });
// await delay5Seconds();

// ID: 21067
await page.goto('https://luckystake.com/game/real/21067');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_21067_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_21067_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();

// ID: 28616
await page.goto('https://luckystake.com/game/real/28616');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28616_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'START', exact: true }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28616_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();


// ID: 28545
await page.goto('https://luckystake.com/game/real/28545');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28545_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'Win up to 50 000x Click to' }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28545_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();


// ID: 28561
await page.goto('https://luckystake.com/game/real/28561');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28561_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'START', exact: true }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28561_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();


// ID: 28613
await page.goto('https://luckystake.com/game/real/28613');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28613_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('CLICK TO CONTINUE').click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28613_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();


// ID: 28606
await page.goto('https://luckystake.com/game/real/28606');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28606_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'Mystery Reveal Free Spins' }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28606_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();



// ID: 28565
await page.goto('https://luckystake.com/game/real/28565');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
 screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28565_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'FIRE MULTIPLIERS FREE SPINS' }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28565_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();


// ID: 28603
await page.goto('https://luckystake.com/game/real/28603');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28603_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'START', exact: true }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28603_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();


// ID: 28596
await page.goto('https://luckystake.com/game/real/28596');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28596_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'MYSTERY SANDSTORM FREE SPINS' }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28596_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();



// ID: 40489
// await page.goto('https://luckystake.com/game/real/40489');
// await delay5Seconds();
// await page.getByRole('button', { name: 'Play now' }).click();
// await delay10Seconds();
// screenshot = await page.screenshot({ fullPage: true });
// test.info().attach(`game_40489_before_click`, { body: screenshot, contentType: 'image/png' });
// try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
// await delay5Seconds();

//GAME IS NOT AVAILABLE

// await delay5Seconds();
// screenshot = await page.screenshot({ fullPage: true });
// test.info().attach(`game_38799_after_click`, { body: screenshot, contentType: 'image/png' });
// await delay5Seconds();


// ID: 35543 GAME IS NOT AVAILABLE
// await page.goto('https://luckystake.com/game/real/35543');
// await delay5Seconds();
// await page.getByRole('button', { name: 'Play now' }).click();
// await delay10Seconds();
// screenshot = await page.screenshot({ fullPage: true });
// test.info().attach(`game_35543_before_click`, { body: screenshot, contentType: 'image/png' });
// try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
// await delay5Seconds();



// await delay5Seconds();
// screenshot = await page.screenshot({ fullPage: true });
// test.info().attach(`game_35543_after_click`, { body: screenshot, contentType: 'image/png' });
// await delay5Seconds();


// ID: 28539
await page.goto('https://luckystake.com/game/real/28539');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28539_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28539_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();

// ID: 28570
await page.goto('https://luckystake.com/game/real/28570');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28570_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('heading', { name: 'Click to continue' }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28570_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();


// ID: 28601
await page.goto('https://luckystake.com/game/real/28601');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28601_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'Wild Chase Free Spins Click' }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28601_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();


// ID: 28619
await page.goto('https://luckystake.com/game/real/28619');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28619_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'START', exact: true }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28619_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();


// ID: 28559
await page.goto('https://luckystake.com/game/real/28559');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28559_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'Win up to 50,000x your play!' }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28559_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();

// ID: 28565
await page.goto('https://luckystake.com/game/real/28565');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28565_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'FIRE MULTIPLIERS FREE SPINS' }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28565_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();


// ID: 28603
await page.goto('https://luckystake.com/game/real/28603');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28603_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'START', exact: true }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28603_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();


// ID: 28596
await page.goto('https://luckystake.com/game/real/28596');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28596_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'MYSTERY SANDSTORM FREE SPINS' }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28596_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();



//ID: 28611
await page.goto('https://luckystake.com/game/real/28611');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28611_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('#test-id canvas').click({
    position: {
      x: 640,
      y: 581
    }
  });
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28611_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();


//ID 28583
await page.goto('https://luckystake.com/game/real/28583');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28583_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('CLICK TO CONTINUE').click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28583_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();


//28535
await page.goto('https://luckystake.com/game/real/28535');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28535_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('CLICK TO CONTINUE').click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28535_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();


//28621
await page.goto('https://luckystake.com/game/real/28621');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28621_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('heading', { name: 'Click to continue' }).click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28621_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();

//28579

await page.goto('https://luckystake.com/game/real/28579');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28579_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28579_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();


//28554
await page.goto('https://luckystake.com/game/real/28554');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28554_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('canvas').nth(1).click({
    position: {
      x: 631,
      y: 596
    }
  });

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28554_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();


//28542
await page.goto('https://luckystake.com/game/real/28542');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28542_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'START', exact: true }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28542_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();



//28584
await page.goto('https://luckystake.com/game/real/28584');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28584_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('CLICK TO CONTINUE').click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28584_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();


//28536
await page.goto('https://luckystake.com/game/real/28536');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28536_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'house roof Symbol removal' }).click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28536_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();


//28586
await page.goto('https://luckystake.com/game/real/28586');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28586_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28586_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();



//28580
await page.goto('https://luckystake.com/game/real/28580');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28580_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('CLICK TO CONTINUE').click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28580_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();



//28576
await page.goto('https://luckystake.com/game/real/28576');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28576_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'START', exact: true }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28576_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();


//28532
await page.goto('https://luckystake.com/game/real/28532');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28532_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('.fadeOverlay').click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28532_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();



//28600
await page.goto('https://luckystake.com/game/real/28600');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28600_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28600_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();


//28564
await page.goto('https://luckystake.com/game/real/28564');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28564_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'START', exact: true }).click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28564_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();



//28602
await page.goto('https://luckystake.com/game/real/28602');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28602_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('CLICK TO CONTINUE').click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28602_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();


//28567
await page.goto('https://luckystake.com/game/real/28567');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28567_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28567_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();

//28604
await page.goto('https://luckystake.com/game/real/28604');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28604_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('canvas').click({
    position: {
      x: 678,
      y: 560
    }
  });
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28604_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();

//28571
await page.goto('https://luckystake.com/game/real/28571');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28571_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('START').click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28571_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();

//28558
await page.goto('https://luckystake.com/game/real/28558');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28558_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'START', exact: true }).click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28558_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();


//28560
await page.goto('https://luckystake.com/game/real/28560');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28560_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28560_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();


//28589
await page.goto('https://luckystake.com/game/real/28589');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28589_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('CLICK TO CONTINUE').click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28589_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();


//28615
await page.goto('https://luckystake.com/game/real/28615');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28615_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'START', exact: true }).click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28615_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();


//28577
await page.goto('https://luckystake.com/game/real/28577');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28577_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('canvas').click({
    position: {
      x: 638,
      y: 536
    }
  });
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28577_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();



//28562
await page.goto('https://luckystake.com/game/real/28562');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28562_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'Win up to 25000x your play!' }).click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28562_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();


//28544
await page.goto('https://luckystake.com/game/real/28544');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28544_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('#imageFade').click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28544_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();

//28599
await page.goto('https://luckystake.com/game/real/28599');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28599_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28599_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();


//28537
await page.goto('https://luckystake.com/game/real/28537');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28537_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('canvas').nth(1).click({
    position: {
      x: 654,
      y: 586
    }
  });
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28537_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();




//28578
await page.goto('https://luckystake.com/game/real/28578');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28578_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();
await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28578_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();





//28573
await page.goto('https://luckystake.com/game/real/28573');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28573_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28573_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();





//28588
await page.goto('https://luckystake.com/game/real/28588');
await delay5Seconds();
await page.getByRole('button', { name: 'Play now' }).click();
await delay10Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28588_before_click`, { body: screenshot, contentType: 'image/png' });
try { await page.waitForLoadState('networkidle', { timeout: 30000 }); } catch {}
await delay5Seconds();

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('CLICK TO CONTINUE').click();

await delay5Seconds();
screenshot = await page.screenshot({ fullPage: true });
test.info().attach(`game_28588_after_click`, { body: screenshot, contentType: 'image/png' });
await delay5Seconds();
});

