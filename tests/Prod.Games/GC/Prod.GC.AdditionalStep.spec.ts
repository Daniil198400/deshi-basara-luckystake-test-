import { test as base, Page, expect, devices } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { HomePage } from '../../../pages/HomePage';
import { delay5Seconds, delay10Seconds } from '../../../utils/utils';

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

test('additional step test Prod GC', async ({ page }) => {
 await page.goto('https://luckystake.com/');

  await page.getByTestId('login-header').click();
  await page.getByTestId('email-input-login').click();
  await page.getByTestId('email-input-login').fill('wiztest+80001@gmail.com');
  await page.getByTestId('password-input-login').click();
  await page.getByTestId('password-input-login').fill('Qwerty1!');
  await page.getByTestId('submit-button-login').click();

    await delay5Seconds();

  await page.goto('https://luckystake.com/');

  
//1spin4win

//3632
await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas').click({
    position: {
      x: 588,
      y: 615
    }
  });

//32643
await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas').click({
    position: {
      x: 595,
      y: 620
    }
  });


//32588

await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas').click({
    position: {
      x: 588,
      y: 621
    }
  });


//38804




//38806



//38813



//38812



//38811


//38797









// --------------------------------------------------------------------------------

//4ThePlayer

//28457


//28459



//34477 (very long loading)
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('canvas').click({
    position: {
      x: 595,
      y: 594
    }
  });


//28463
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('canvas').click({
    position: {
      x: 642,
      y: 582
    }
  });


//28466
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('canvas').click({
    position: {
      x: 622,
      y: 589
    }
  });



//34228 (error during loading)


//28465
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('canvas').click({
    position: {
      x: 630,
      y: 600
    }
  });


//28464
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('canvas').click({
    position: {
      x: 626,
      y: 607
    }
  });





//14620



//28460





//28458





//35545








//28456
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('canvas').click({
    position: {
      x: 622,
      y: 590
    }
  });




//-----------------------------------------------------------------------


//Fantasma 

//28492
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('#GameCanvas').click({
    position: {
      x: 598,
      y: 546
    }
  });



//28484




//28493




//28479




//28481


//28494



//28485
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('#GameCanvas').click({
    position: {
      x: 654,
      y: 571
    }
  });



//28478
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('#GameCanvas').click({
    position: {
      x: 577,
      y: 577
    }
  });


//28487




//28490





//28480




//28482
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('#GameCanvas').click({
    position: {
      x: 573,
      y: 557
    }
  });


//28488
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('#GameCanvas').click({
    position: {
      x: 592,
      y: 616
    }
  });




//28491



//28495
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('#GameCanvas').click({
    position: {
      x: 588,
      y: 557
    }
  });


//28483
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('#GameCanvas').click({
    position: {
      x: 603,
      y: 573
    }
  });


//28489
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('#GameCanvas').click({
    position: {
      x: 566,
      y: 570
    }
  });





//28486
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('#GameCanvas').click({
    position: {
      x: 597,
      y: 585
    }
  });

//Four7 Provider's games are disabled 



//Four Leaf Gaming
//34255




//28501




//28503




//14621
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button').nth(3).click();



//28502



//28504



//Iconic21 Provider games are totally disabled

//Max Win Gaming

//28509
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('#stageOverlay').click({
    position: {
      x: 640,
      y: 545
    }
  });



//28508



//28506




//Microgaming

//35158




//35143



//35195



//35193


//35168


//35167



//35163



//35162



// Continue with Novomatic 

//23913
await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas1').click({
    position: {
      x: 1134,
      y: 624
    }
  });

//35552
await page.locator('iframe[title="Real game"]').contentFrame().getByText('CONTINUE').click();

//38798
await page.locator('iframe[title="Real game"]').contentFrame().getByText('CONTINUE').click();

//40479

await page.locator('iframe[title="Real game"]').contentFrame().getByText('CONTINUE').click();

//38807
await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas1').click({
    position: {
      x: 1134,
      y: 734
    }
  });

//23978
await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas1').click({
    position: {
      x: 1156,
      y: 624
    }
  });

//23969
await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas1').click({
    position: {
      x: 1070,
      y: 610
    }
  });

  //23906
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas1').click({
    position: {
      x: 1144,
      y: 621
    }
  });






//All games of Octoplay Provider should be tested manually cause of endless loading during autotest


//peter and sons

  //28510
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('#game').click({
    position: {
      x: 659,
      y: 565
    }
  });

//Platipus

//13527

await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 619,
      y: 525
    }
  });

//22548

await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 629,
      y: 516
    }
  });

  //14875

  await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 623,
      y: 543
    }
  });

//13529
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 623,
      y: 530
    }
  });


//3787 (Also Platipus)
await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();

//3737

await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 629,
      y: 543
    }
  });


//3752
await page.locator('iframe[title="Real game"]').contentFrame().locator('#preloader-frame').contentFrame().getByRole('button', { name: 'CONTINUE' }).click();

//3729
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 618,
      y: 543
    }
  });

//3744
await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();

//13530
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 623,
      y: 527
    }
  });

//3741
await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();

//3724
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 630,
      y: 531
    }
  });

//35547
await page.locator('iframe[title="Real game"]').contentFrame().getByText('START').click();

//35549
await page.locator('iframe[title="Real game"]').contentFrame().locator('.preloader_startBtnBg').click();

//21434
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 624,
      y: 545
    }
  });

//22167
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 616,
      y: 533
    }
  });

//3755
await page.locator('iframe[title="Real game"]').contentFrame().locator('#preloader-frame').contentFrame().getByRole('button', { name: 'CONTINUE' }).click();

//3746
await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();


//3731

await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 629,
      y: 525
    }
  });

//3727
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 614,
      y: 552
    }
  });

//3751
await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();

//3750

await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();

//3730

await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 626,
      y: 528
    }
  });

//3786

await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();

//3722

await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 607,
      y: 545
    }
  });

//13534

await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 626,
      y: 523
    }
  });

//3757
await page.locator('iframe[title="Real game"]').contentFrame().locator('#preloader-frame').contentFrame().getByRole('button', { name: 'CONTINUE' }).click();

//3721
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 631,
      y: 527
    }
  });

//3753

await page.locator('iframe[title="Real game"]').contentFrame().locator('#preloader-frame').contentFrame().getByRole('button', { name: 'CONTINUE' }).click();


//3788

await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();

//3743
await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();

//3739
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 610,
      y: 547
    }
  });

//3756
await page.locator('iframe[title="Real game"]').contentFrame().locator('#preloader-frame').contentFrame().getByRole('button', { name: 'CONTINUE' }).click();

//3738
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 614,
      y: 541
    }
  });

//3754
await page.locator('iframe[title="Real game"]').contentFrame().locator('#preloader-frame').contentFrame().locator('#continueDivBtn').click();

//3784
await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();

//3720

await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 617,
      y: 541
    }
  });

//3783
await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();

//3726
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 615,
      y: 521
    }
  });

  //3785
  await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();

//22773
await page.locator('iframe[title="Real game"]').contentFrame().locator('#canvas').click({
    position: {
      x: 608,
      y: 567
    }
  });

//23276
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 644,
      y: 522
    }
  });

//35674
await page.locator('iframe[title="Real game"]').contentFrame().getByText('START').click();

//3733
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 633,
      y: 542
    }
  });

//3735
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 627,
      y: 517
    }
  });

//3758
await page.locator('iframe[title="Real game"]').contentFrame().locator('#preloader-frame').contentFrame().getByRole('button', { name: 'CONTINUE' }).click();


//22346
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 611,
      y: 524
    }
  });

//35676
await page.locator('iframe[title="Real game"]').contentFrame().locator('.preloader_startBtnBg').click();

//35675
await page.locator('iframe[title="Real game"]').contentFrame().locator('.preloader_startBtnBg').click();

//13537
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 590,
      y: 542
    }
  });

//13533
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 631,
      y: 505
    }
  });

//13531
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 625,
      y: 523
    }
  });

//13528
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 612,
      y: 531
    }
  });

//13538

await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 613,
      y: 544
    }
  });

//13526

await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 605,
      y: 529
    }
  });

//13535
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 612,
      y: 527
    }
  });

//13532
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 609,
      y: 521
    }
  });

//3748
await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();

//3723
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 636,
      y: 521
    }
  });

//3742
await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();

//3734
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 639,
      y: 542
    }
  });

//3747
await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();

//3749
await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();

//3782
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 630,
      y: 522
    }
  });

//3732
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 628,
      y: 535
    }
  });

//3719
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 612,
      y: 529
    }
  });

//3759
await page.locator('iframe[title="Real game"]').contentFrame().locator('#preloader-frame').contentFrame().getByRole('button', { name: 'CONTINUE' }).click();

//3718
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 614,
      y: 526
    }
  });

//3740
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 614,
      y: 549
    }
  });

//3725
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 611,
      y: 517
    }
  });

//3736
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 621,
      y: 552
    }
  });

//3717

await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 609,
      y: 532
    }
  });

//3728
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 603,
      y: 526
    }
  });

//23887

await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 629,
      y: 528
    }
  });


//3745
await page.locator('iframe[title="Real game"]').contentFrame().getByRole('button', { name: 'START' }).click();

//24166
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 604,
      y: 524
    }
  });

//13536
await page.locator('iframe[title="Real game"]').contentFrame().locator('#hud-canvas').click({
    position: {
      x: 621,
      y: 538
    }
  });





//Playson

//35512
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game_canvas').click({
    position: {
      x: 580,
      y: 590
    }
  });

//35532
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game_canvas').click({
    position: {
      x: 593,
      y: 589
    }
  });

//35534
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game_canvas').click({
    position: {
      x: 580,
      y: 594
    }
  });

//35519
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game_canvas').click({
    position: {
      x: 618,
      y: 603
    }
  });

//35503
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game_canvas').click({
    position: {
      x: 602,
      y: 581
    }
  });

//35525

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game_canvas').click({
    position: {
      x: 589,
      y: 587
    }
  });

//35528

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game_canvas').click({
    position: {
      x: 582,
      y: 586
    }
  });

//35550

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game-canvas').click({
    position: {
      x: 619,
      y: 590
    }
  });

//35499

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game_canvas').click({
    position: {
      x: 581,
      y: 587
    }
  });

//35507

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game_canvas').click({
    position: {
      x: 585,
      y: 573
    }
  });

//35513
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game_canvas').click({
    position: {
      x: 590,
      y: 588
    }
  });

//35498
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game_canvas').click({
    position: {
      x: 585,
      y: 587
    }
  });


  //35496
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#game_canvas').click({
    position: {
      x: 568,
      y: 581
    }
  });

//35493

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game_canvas').click({
    position: {
      x: 589,
      y: 593
    }
  });

  //35505

  await page.locator('iframe[title="Real game"]').contentFrame().locator('#game_canvas').click({
    position: {
      x: 589,
      y: 597
    }
  });

//35506
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game_canvas').click({
    position: {
      x: 603,
      y: 576
    }
  });

//35510
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game_canvas').click({
    position: {
      x: 587,
      y: 605
    }
  });

//35511
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game_canvas').click({
    position: {
      x: 589,
      y: 598
    }
  });

  //35504
  await page.locator('iframe[title="Real game"]').contentFrame().locator('#game_canvas').click({
    position: {
      x: 574,
      y: 591
    }
  });

//35517
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game_canvas').click({
    position: {
      x: 577,
      y: 597
    }
  });












//Start with Relax games










//28546
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('.logo').click();

//28565
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'FIRE MULTIPLIERS FREE SPINS' }).click();

//28603

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'START', exact: true }).click();

//28596

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'MYSTERY SANDSTORM FREE SPINS' }).click();
//28593
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('START').click();

//40489

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('canvas').nth(1).click({
    position: {
      x: 629,
      y: 536
    }
  });


//40490

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('canvas').nth(1).click({
    position: {
      x: 636,
      y: 628
    }
  });

//38799
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('canvas').click({
    position: {
      x: 628,
      y: 533
    }
  });

//28591

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('.logo').click();


//35543

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('canvas').nth(1).click({
    position: {
      x: 631,
      y: 592
    }
  });

//28539

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('.logo').click();

//28569

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('click to continue').click();

//28570

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('heading', { name: 'Click to continue' }).click();

//28601

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'Wild Chase Free Spins Click' }).click();

//28619

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'START', exact: true }).click();

//28559

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'Win up to 50,000x your play!' }).click();

//28587

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('heading', { name: 'Click to continue' }).click();

//28618
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('canvas').click({
    position: {
      x: 626,
      y: 511
    }
  });

//28605

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('canvas').click({
    position: {
      x: 607,
      y: 330
    }
  });

//28614

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('canvas').click({
    position: {
      x: 642,
      y: 450
    }
  });

//28620

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('CLICK TO CONTINUE').click();

//28617

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').nth(1).click();

//28590

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();

//28574
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('canvas').click({
    position: {
      x: 628,
      y: 321
    }
  });

//28543

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();


//28611
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('#test-id canvas').click({
    position: {
      x: 630,
      y: 608
    }
  });

//28583
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('CLICK TO CONTINUE').click();

//28535

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('CLICK TO CONTINUE').click();

//28621

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('heading', { name: 'Click to continue' }).click();

//28579

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();

//28554

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('canvas').nth(1).click({
    position: {
      x: 670,
      y: 608
    }
  });

//28542

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'START', exact: true }).click();


//28584

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('CLICK TO CONTINUE').click();

//28536

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'house roof Symbol removal' }).click();


//28586
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();

//28580

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('CLICK TO CONTINUE').click();

//28576

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'START', exact: true }).click();

//28532

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('.fadeOverlay').click();

//28600

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();


//28564

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'START', exact: true }).click();

//28602


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('CLICK TO CONTINUE').click();

//28567
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();

//28604

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('canvas').click({
    position: {
      x: 637,
      y: 501
    }
  });

//28571

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('START').click();


//28558

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'START', exact: true }).click();

//28560

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();


//28589

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('CLICK TO CONTINUE').click();

//28615

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'START', exact: true }).click();

//28577

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('canvas').click({
    position: {
      x: 584,
      y: 556
    }
  });

//28562

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'Win up to 25000x your play!' }).click();

//28544

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('WIN UP TO 20.000 x PLAYWin up').click();

//28599

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();

//28537

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('canvas').nth(1).click({
    position: {
      x: 658,
      y: 590
    }
  });

  //28578

  await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();

//28573

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();

//28588
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('CLICK TO CONTINUE').click();

//28612

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('heading', { name: 'Click to continue' }).click();

//28607

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('START').click();

//28597 (infinity loading during autotests)


//28549
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'START', exact: true }).click();

//28609

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();


//28568
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();

//28534

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();

//28563

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('CLICK TO CONTINUE').click();

//28555

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'TWO WAYS TO WIN FREE SPINS!' }).click();

//28551
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'START' }).click();

//28550
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('.logo').click();

//28547 (infinity loading)

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('.gameLogo').click();

//21067
await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('Click to continue').click();

//28616

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'START', exact: true }).click();

//28545

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'Win up to 50 000x Click to' }).click();

//28561

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'START', exact: true }).click();

//28613

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByText('CLICK TO CONTINUE').click();

//28606

await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().getByRole('button', { name: 'Mystery Reveal Free Spins' }).click();

//28533


await page.locator('iframe[title="Real game"]').contentFrame().locator('#game').contentFrame().locator('canvas').nth(2).click({
    position: {
      x: 618,
      y: 344
    }
  });













});




