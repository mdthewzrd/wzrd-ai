const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // Clear any existing auth
    await page.goto('http://localhost:3000');
    await page.evaluate(() => localStorage.clear());
    
    // Login as admin and test redirect
    console.log('Testing admin dashboard redirect...');
    await page.goto('http://localhost:3000/login');
    await page.waitForSelector('button:has-text("Admin")');
    await page.click('button:has-text("Admin")');
    await page.waitForTimeout(2000);
    
    // Try to visit homepage - should redirect to admin dashboard
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(2000);
    const currentUrl = page.url();
    await page.screenshot({ path: 'admin-homepage-redirect.png' });
    console.log('Admin redirect URL:', currentUrl);

    // Test client redirect
    console.log('Testing client dashboard redirect...');
    await page.evaluate(() => localStorage.clear());
    await page.goto('http://localhost:3000/login');
    await page.waitForSelector('button:has-text("Client")');
    await page.click('button:has-text("Client")');
    await page.waitForTimeout(2000);
    
    // Try to visit homepage - should redirect to client dashboard  
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(2000);
    const clientUrl = page.url();
    await page.screenshot({ path: 'client-homepage-redirect.png' });
    console.log('Client redirect URL:', clientUrl);

    console.log('✓ Dashboard redirect tests completed');

  } catch (error) {
    console.error('Error:', error.message);
  }
  
  await browser.close();
})();