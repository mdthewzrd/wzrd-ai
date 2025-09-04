const { chromium } = require('playwright');

async function takeScreenshot() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Go to our local site
  await page.goto('http://localhost:3000');
  
  // Wait for the page to load
  await page.waitForTimeout(2000);
  
  // Take screenshot
  await page.screenshot({ 
    path: 'current-site.png', 
    fullPage: true 
  });
  
  console.log('Screenshot saved as current-site.png');
  
  // Also take a screenshot of the reference site
  await page.goto('https://inflnce-io.vercel.app/');
  await page.waitForTimeout(3000);
  
  await page.screenshot({ 
    path: 'reference-site.png', 
    fullPage: true 
  });
  
  console.log('Reference screenshot saved as reference-site.png');
  
  await browser.close();
}

takeScreenshot().catch(console.error);