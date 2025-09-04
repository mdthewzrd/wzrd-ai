const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // Login as client to access TikTok page
    await page.goto('http://localhost:3000/login');
    await page.waitForSelector('button:has-text("Client")');
    await page.click('button:has-text("Client")');
    await page.waitForTimeout(2000);
    
    // Visit TikTok page
    await page.goto('http://localhost:3000/social-media/tiktok');
    await page.waitForSelector('h1');
    await page.screenshot({ path: 'tiktok-dropdown-services.png' });
    console.log('✓ TikTok page with dropdown services');

  } catch (error) {
    console.error('Error:', error.message);
  }
  
  await browser.close();
})();