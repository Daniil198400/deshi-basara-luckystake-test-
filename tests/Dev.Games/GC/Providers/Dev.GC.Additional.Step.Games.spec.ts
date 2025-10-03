import { test as base, Page, expect, devices } from '@playwright/test';
import { LoginPage } from '../../../../pages/LoginPage';
import { HomePage } from '../../../../pages/HomePage';
import { delay5Seconds, delay10Seconds } from '../../../../utils/utils';

const test = base.extend<{}>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      httpCredentials: {
        username: 'luckystake',
        password: 'luckystake1!',
      },
    });
    await use(context);
    await context.close();
  },
});

test('additional step test Dev GC', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  // --- Логин ---
  await page.goto('https://luckystake.dev/');
  await homePage.closePopupIfVisible();
  await loginPage.openLoginForm();
  await loginPage.login('dksld1@gmail.com', 'Qwerty1!!');
  await delay5Seconds();

  await page.getByText('Social Games').click();
  await page.getByRole('link', { name: 'Providers' }).click();



  await page.getByRole('link', { name: 'Platipus' }).click();

//3759
  await page.locator('.WizGameCard_container_gameImage__cFsR9').first().click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#preloader-frame').contentFrame().getByRole('button', { name: 'CONTINUE' }).click();
  await page.getByTestId('ArrowBackIosIcon').click();
  
  //3741
  await page.locator('div:nth-child(2) > .WizGameCard_container_gameImage__cFsR9').click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();
  await page.getByTestId('ArrowBackIosIcon').click();

//3744
  await page.locator('div:nth-child(3) > .WizGameCard_container_gameImage__cFsR9').click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();
  await page.getByTestId('ArrowBackIosIcon').click();


  //3750
  await page.locator('div:nth-child(4) > .WizGameCard_container_gameImage__cFsR9').click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();
  await page.getByTestId('ArrowBackIosIcon').click();

  
//3729
  await page.locator('div:nth-child(4) > .WizGameCard_container_gameImage__cFsR9').click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();
  await page.getByTestId('ArrowBackIosIcon').click();

  //27037
  await page.locator('div:nth-child(5) > .WizGameCard_container_gameImage__cFsR9').click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 592,
      y: 545
    }
  });
  await page.getByTestId('ArrowBackIosIcon').click();

//23888
  await page.locator('div:nth-child(6) > .WizGameCard_container_gameImage__cFsR9').click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.locator('iframe[title="Real game"]').contentFrame().locator('.preloader_startBtnBg').click();
  await page.getByTestId('ArrowBackIosIcon').click();

//23887
  await page.locator('div:nth-child(7) > .WizGameCard_container_gameImage__cFsR9').click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();
  await page.getByTestId('ArrowBackIosIcon').click();

  //3786
  await page.locator('div:nth-child(8) > .WizGameCard_container_gameImage__cFsR9').click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 606,
      y: 565
    }
  });
  await page.getByTestId('ArrowBackIosIcon').click();

  //
  await page.locator('div:nth-child(9) > .WizGameCard_container_gameImage__cFsR9').click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();
  await page.getByTestId('ArrowBackIosIcon').click();

  //3722
  await page.locator('div:nth-child(10) > .WizGameCard_container_gameImage__cFsR9').click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 590,
      y: 528
    }
  });
  await page.getByTestId('ArrowBackIosIcon').click();

  //3757
  await page.locator('div:nth-child(11) > .WizGameCard_container_gameImage__cFsR9').click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#preloader-frame').contentFrame().getByRole('button', { name: 'CONTINUE' }).click();
  await page.getByTestId('ArrowBackIosIcon').click();
  
//3721
  await page.locator('div:nth-child(12) > .WizGameCard_container_gameImage__cFsR9').click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 618,
      y: 535
    }
  });
  await page.getByTestId('ArrowBackIosIcon').click();



  await page.locator('iframe[name="chat-widget-minimized"]').contentFrame().getByRole('button', { name: 'Hide greeting' }).click();


  //3753
  await page.locator('div:nth-child(16) > .WizGameCard_container_gameImage__cFsR9').click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#preloader-frame').contentFrame().getByRole('button', { name: 'CONTINUE' }).click();
  await page.getByTestId('ArrowBackIosIcon').click();

//3788
  await page.locator('div:nth-child(17) > .WizGameCard_container_gameImage__cFsR9').click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();
  await page.getByTestId('ArrowBackIosIcon').click();
  


  //3743
  await page.locator('div:nth-child(19) > .WizGameCard_container_gameImage__cFsR9').click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();
  await page.getByTestId('ArrowBackIosIcon').click();


//3739
  await page.locator('div:nth-child(20) > .WizGameCard_container_gameImage__cFsR9').click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 622,
      y: 534
    }
  });
  await page.getByTestId('ArrowBackIosIcon').click();


  //3756
  await page.locator('div:nth-child(21) > .WizGameCard_container_gameImage__cFsR9').click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#preloader-frame').contentFrame().getByRole('button', { name: 'CONTINUE' }).click();
  await page.getByTestId('ArrowBackIosIcon').click();
  

//3738
  await page.locator('div:nth-child(23) > .WizGameCard_container_gameImage__cFsR9').click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 616,
      y: 545
    }
  });
  await page.getByTestId('ArrowBackIosIcon').click();

  //3752
  await page.locator('div:nth-child(24) > .WizGameCard_container_gameImage__cFsR9').click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#preloader-frame').contentFrame().getByRole('button', { name: 'CONTINUE' }).click();
  await page.getByTestId('ArrowBackIosIcon').click();


  //3801 Does not load during autotests


//3805
  await page.locator('div:nth-child(28) > .WizGameCard_container_gameImage__cFsR9').click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();
  await page.getByTestId('ArrowBackIosIcon').locator('path').click();



  //3730
  await page.locator('div:nth-child(31) > .WizGameCard_container_gameImage__cFsR9').click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 614,
      y: 539
    }
  });
  await page.getByTestId('ArrowBackIosIcon').click();

//3737
  await page.locator('div:nth-child(32) > .WizGameCard_container_gameImage__cFsR9').click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 626,
      y: 543
    }
  });
  await page.getByTestId('ArrowBackIosIcon').click();


//24166
  await page.locator('div:nth-child(33) > .WizGameCard_container_gameImage__cFsR9').click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 604,
      y: 536
    }
  });
  await page.getByTestId('ArrowBackIosIcon').click();


//3787
  await page.locator('div:nth-child(34) > .WizGameCard_container_gameImage__cFsR9').click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();
  await page.getByTestId('ArrowBackIosIcon').click();


  //27727

  await page.getByRole('img', { name: 'Piedra Del Sol Deluxe' }).click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.locator('iframe[title="Real game"]').contentFrame().locator('canvas').click({
    position: {
      x: 602,
      y: 528
    }
  });
  await page.getByTestId('ArrowBackIosIcon').click();



  //27867
  await page.locator('div:nth-child(41) > .WizGameCard_container_gameImage__cFsR9').click();
  await page.getByRole('button', { name: 'Play now' }).click();

  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 610,
      y: 517
    }
  });
  await page.getByTestId('ArrowBackIosIcon').click();

  //13533
  await page.locator('div:nth-child(42) > .WizGameCard_container_gameImage__cFsR9').click();
  await page.getByRole('button', { name: 'Play now' }).click();
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 609,
      y: 527
    }
  });
  await page.getByTestId('ArrowBackIosIcon').click();

  //28651
  await page.locator('iframe[title="Real game"]').contentFrame().locator('.preloader_startBtnBg').click();

//13531
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 605,
      y: 525
    }
  });

//27868
  await page.locator('iframe[title="Real game"]').contentFrame().locator('canvas').click({
    position: {
      x: 602,
      y: 510
    }
  });

//13582
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 662,
      y: 533
    }
  });

//13538
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 597,
      y: 529
    }
  });

//13526
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 642,
      y: 546
    }
  });


//13535
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 592,
      y: 539
    }
  });

//13532
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 590,
      y: 531
    }
  });

  //3748
  await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();


//3723
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 629,
      y: 520
    }
  });


  //3742
  await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();



  //3758
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#preloader-frame').contentFrame().getByRole('button', { name: 'CONTINUE' }).click();


//3720
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 576,
      y: 533
    }
  });


//3783
  await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();

//3726
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 615,
      y: 517
    }
  });

//3785
  await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();

//22773
await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas').click({
    position: {
      x: 627,
      y: 545
    }
  });


//3735
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 610,
      y: 525
    }
  });


//23276
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 602,
      y: 523
    }
  });


//3734
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 591,
      y: 523
    }
  });


//13527
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 618,
      y: 530
    }
  });


//22548
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 601,
      y: 525
    }
  });


//14875
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 613,
      y: 541
    }
  });



//3747
await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();


//27033
await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();


//24030
await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas').click({
    position: {
      x: 571,
      y: 544
    }
  });


  //23988
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas').click({
    position: {
      x: 578,
      y: 557
    }
  });


//23277
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas').click({
    position: {
      x: 607,
      y: 531
    }
  });

//3749
  await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();

 
  
  //3782
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 640,
      y: 527
    }
  });

  //3732
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 600,
      y: 544
    }
  });

//3719
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 631,
      y: 532
    }
  });

  //21433
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas').click({
    position: {
      x: 589,
      y: 540
    }
  });

//3718
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 631,
      y: 531
    }
  });

//23232
await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas').click({
    position: {
      x: 622,
      y: 558
    }
  });

//25110
await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();

//3740
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 619,
      y: 549
    }
  });

//25333
await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas').click({
    position: {
      x: 619,
      y: 557
    }
  });

//3746
  await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();


//25506
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 618,
      y: 545
    }
  });

//3784
  await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();

//25541
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 633,
      y: 539
    }
  });

//3731
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 614,
      y: 541
    }
  });

//25581
  await page.locator('iframe[title="Real game"]').contentFrame().locator('.preloader_startBtnBg').click();

//3754
await page.locator('iframe[title="Real game"]').contentFrame().locator('#preloader-frame').contentFrame().locator('#continueDivBtn').click();

//13530
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 614,
      y: 532
    }
  });

//13529
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 616,
      y: 532
    }
  });

  //13536
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 626,
      y: 514
    }
  });

//13534
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 629,
      y: 516
    }
  });

//13537
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 630,
      y: 545
    }
  });


//3727
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 622,
      y: 544
    }
  });

//3751
  await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();

//22346
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 618,
      y: 524
    }
  });

//22167
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 618,
      y: 530
    }
  });

//3725
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 600,
      y: 499
    }
  });

//21434
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 634,
      y: 539
    }
  });

//21354
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 623,
      y: 542
    }
  });

//21352
await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas').click({
    position: {
      x: 602,
      y: 545
    }
  });

//3736
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 619,
      y: 541
    }
  });

//3717
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 626,
      y: 529
    }
  });


//3728
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 615,
      y: 516
    }
  });

//3745
  await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();

//3733
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 624,
      y: 551
    }
  });

//3755
await page.locator('iframe[title="Real game"]').contentFrame().locator('#preloader-frame').contentFrame().getByRole('button', { name: 'CONTINUE' }).click();

//3724
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 616,
      y: 513
    }
  });

//26403
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 617,
      y: 515
    }
  });

  //23913
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas1').click({
    position: {
      x: 1133,
      y: 600
    }
  });

  //23978
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas1').click({
    position: {
      x: 1130,
      y: 610
    }
  });

//Novomatic almost does not have games with additional step

//32482 NOT WORKING


//Octoplay is completely disabled

//In RedRake provider every game has its duplicate


//In Turbo Games provider 












//



});


