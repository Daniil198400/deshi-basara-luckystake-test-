import { Browser, BrowserContext, Page } from '@playwright/test';
import path from 'path';

export async function launchIphone15Test(browser: Browser): Promise<{
  context: BrowserContext;
  page: Page;
}> {
  const iPhone15 = {
    name: 'iPhone 15',
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    viewport: { width: 393, height: 852 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  };

  const context = await browser.newContext({
    ...iPhone15,
    httpCredentials: {
      username: 'luckystake',
      password: 'luckystake1!',
    },
    recordVideo: {
      dir: path.join(__dirname, '../videos'), // folder for videos
      size: iPhone15.viewport,
    },
  });

  const page = await context.newPage();
  return { context, page };
}