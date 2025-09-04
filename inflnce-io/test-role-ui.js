const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // Test admin view
    await page.goto('http://localhost:3000/login');
    await page.waitForSelector('button:has-text("Admin")');
    await page.click('button:has-text("Admin")');
    await page.waitForTimeout(2000);
    
    await page.goto('http://localhost:3000/social-media');
    await page.waitForSelector('h1');
    await page.screenshot({ path: 'social-media-admin-view.png' });
    console.log('✓ Admin view of social media page');

    // Clear storage and test client view
    await page.evaluate(() => localStorage.clear());
    await page.goto('http://localhost:3000/login');
    await page.waitForSelector('button:has-text("Client")');
    await page.click('button:has-text("Client")');
    await page.waitForTimeout(2000);
    
    await page.goto('http://localhost:3000/social-media');
    await page.waitForSelector('h1');
    await page.screenshot({ path: 'social-media-client-view.png' });
    console.log('✓ Client view of social media page');

  } catch (error) {
    console.error('Error:', error.message);
  }
  
  await browser.close();
})();