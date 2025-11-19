import { test, Page } from '@playwright/test';
import { LoginPage } from '../../../../../pages/LoginPage';
import { HomePage } from '../../../../../pages/HomePage';
import { GamePage } from '../../../../../pages/ClickOnPlayPage';
import { delay10Seconds, delay5Seconds } from '../../../../../utils/utils';

// Массив ID игр
const gameIds = [ 
 28534, 28563, 28550, 28547, 21067, 28616, 
  28545, 28561, 28613, 28606, 28565, 28603, 28596, 40489, 40490, 38799, 35543,
  28539, 28569, 28570, 28601, 28619, 28559, 28587, 28618, 28605, 28614,
  28620, 28617, 28590, 28574, 28543, 28611, 28583, 28535, 28621, 28579,
  28554, 28542, 28584, 28536, 28586, 28580, 28576, 28532, 28600, 28564,
  28602, 28567, 28604, 28571, 28558, 28560, 28589, 28615, 28577, 28562, 
  28544, 28599, 28537, 28578, 28573, 28588, 28612, 28607, 28549, 
  28609, 28568,  
];


// await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'Wild Chase Free Spins Tap to' }).click();

// await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'UNDER LICENSE FROM FREE SPINS' }).click();

// await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('canvas').nth(1).click({
//     position: {
//       x: 174,
//       y: 627
//     }
//   });
// await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('canvas').nth(1).click({
//     position: {
//       x: 162,
//       y: 590
//     }
//   });

// await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'Tap to continue' }).click();

// await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'Special Symbols Special' }).click();
// await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'Special Symbols Special' }).contentFrame().locator('#canvas').click({
//     position: {
//       x: 138,
//       y: 6
//     }
//   });
//await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'Win up to 50,000x your play!' }).click();

// await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('TAP TO CONTINUE').click();

// await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Tap to continue').click();

// await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('heading', { name: 'Tap to continue' }).click();


// Типы целей клика
type ClickCandidate =
  | { type: 'role'; role: 'button' | 'heading'; name: string; exact?: boolean }
  | { type: 'text'; value: string; exact?: boolean }
  | { type: 'selector'; selector: string; nth?: number; coords?: { x: number; y: number } };

// Координаты по умолчанию для кликов по canvas (если не указаны в кандидате)
const defaultCanvasPoints = [
  { x: 162, y: 590 }, { x: 168, y: 603 }, { x: 182, y: 586 },
  { x: 185, y: 573 }, { x: 180, y: 628 }, { x: 185, y: 622 },
];

// Основная функция
export async function clickGameElement(page: Page) {
  // Достаём nested iframe: Real game -> #game
  const outerFrameHandle = await page.locator('iframe[title="Real game"]').elementHandle();
  if (!outerFrameHandle) return;
  const outerFrame = await outerFrameHandle.contentFrame();
  if (!outerFrame) return;

  const gameFrameHandle = await outerFrame.locator('#game').elementHandle();
  if (!gameFrameHandle) return;
  const gameFrame = await gameFrameHandle.contentFrame();
  if (!gameFrame) return;

  // Немного терпения на загрузку содержимого
  await gameFrame.waitForLoadState('domcontentloaded').catch(() => {});

  // Кандидаты, собранные из твоих комментариев (в порядке приоритета)
  const candidates: ClickCandidate[] = [
    // getByRole('button', ...)
    { type: 'role', role: 'button', name: 'Wild Chase Free Spins Tap to' },
    { type: 'role', role: 'button', name: 'UNDER LICENSE FROM FREE SPINS' },
    { type: 'role', role: 'button', name: 'Tap to continue' },
    { type: 'role', role: 'button', name: 'Special Symbols Special' },
    { type: 'role', role: 'button', name: 'Win up to 50,000x your play!' },

    // Заголовок
    { type: 'role', role: 'heading', name: 'Tap to continue' },

    // Текстовые варианты
    { type: 'text', value: 'TAP TO CONTINUE' },
    { type: 'text', value: 'Tap to continue' },

    // Canvas-цели из примеров (nth(1) == второй canvas)
    { type: 'selector', selector: 'canvas', nth: 1, coords: { x: 174, y: 627 } },
    { type: 'selector', selector: 'canvas', nth: 1, coords: { x: 162, y: 590 } },

    // Общие селекторы, если ничего из выше не найдётся
    { type: 'selector', selector: 'canvas' },            // кликнем в случайную точку из defaultCanvasPoints
    { type: 'selector', selector: '#canvas' },           // на случай внутреннего canvas по id
  ];

  // Пытаемся кликнуть по первому доступному кандидату
  for (const c of candidates) {
    try {
      if (c.type === 'role') {
        const el = gameFrame.getByRole(c.role as any, { name: c.name, exact: c.exact ?? false });
        if (await el.count()) {
          await el.first().click({ force: true });
          console.log(`Click by role: ${c.role} "${c.name}"`);
          return;
        }
      } else if (c.type === 'text') {
        const el = gameFrame.getByText(c.value, { exact: c.exact ?? false });
        if (await el.count()) {
          await el.first().click({ force: true });
          console.log(`Click by text: "${c.value}"`);
          return;
        }
      } else if (c.type === 'selector') {
        let el = gameFrame.locator(c.selector);
        if (typeof c.nth === 'number') el = el.nth(c.nth);
        if (await el.count()) {
          if (c.selector.includes('canvas')) {
            const pt = c.coords ?? defaultCanvasPoints[Math.floor(Math.random() * defaultCanvasPoints.length)];
            await el.first().click({ position: pt, force: true });
            console.log(`Click on canvas ${c.nth !== undefined ? `(nth: ${c.nth})` : ''} at (${pt.x}, ${pt.y})`);
          } else {
            await el.first().click({ force: true });
            console.log(` Click by selector: ${c.selector}${c.nth !== undefined ? ` (nth: ${c.nth})` : ''}`);
          }
          return;
        }
      }
    } catch (err) {
      console.warn(`Ошибка при клике по ${JSON.stringify(c)}: ${err}`);
    }
  }

  // Фоллбек: пробуем generic canvas внутри возможных вложенных фреймов (#canvas из твоего примера)
  try {
    const innerIframes = gameFrame.locator('iframe');
    const count = await innerIframes.count();
    for (let i = 0; i < count; i++) {
      const h = await innerIframes.nth(i).elementHandle();
      const f = h && (await h.contentFrame());
      if (!f) continue;
      const innerCanvas = f.locator('#canvas');
      if (await innerCanvas.count()) {
        await innerCanvas.first().click({ position: { x: 138, y: 6 }, force: true });
        console.log(' Fallback click inside inner iframe on #canvas at (138, 6)');
        return;
      }
    }
  } catch {}

  console.warn('Ни один кандидат не найден/не кликнут.');
}

// Основная функция прохождения игр
async function playGames(page: Page) {
  for (const id of gameIds) {
    const gameUrl = `https://luckystake.com/game/real/${id}`;
    console.log(` Открываем игру: ${gameUrl}`);

    await page.goto(gameUrl);
    await delay5Seconds();

    let screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_before_playnow`, {
      body: screenshot,
      contentType: 'image/png'
    });

    try {
      await page.getByRole('button', { name: 'Play now' }).click({ force: true }); // force применён
    } catch {
      console.warn('Не удалось кликнуть по кнопке Play now');
    }

    await delay5Seconds();

    try {
      await page.waitForLoadState('networkidle', { timeout: 36000 });
    } catch {
      console.warn('Network idle не наступил за 36 сек, продолжаем...');
    }

    await delay5Seconds();

    await clickGameElement(page);

    await delay5Seconds();

    screenshot = await page.screenshot({ fullPage: true });
    test.info().attach(`game_${id}_after_click`, {
      body: screenshot,
      contentType: 'image/png'
    });

    console.log(`Игра ${id} завершена`);
    await delay5Seconds();
  }
}

// Тест Relax
test('@ClickOnAdditionalStepMobile Relax', async ({ context }) => {
  const page = await context.newPage();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const gamePage = new GamePage(page);

  console.log('Запуск теста Relax');

  await page.goto('https://luckystake.com/');
  await homePage.closePopupIfVisible();
  await loginPage.openLoginForm();
  await loginPage.login('wiztest+70001@gmail.com', 'Qwerty1!');
  await delay5Seconds();

const closeBtn = page.locator('.WizIconButton_base__JfGpY.WizPopupWrapper_close__hKtRn');
if (await closeBtn.isVisible()) {
  await closeBtn.click();
}
    await delay5Seconds();
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






await playGames(page);

});