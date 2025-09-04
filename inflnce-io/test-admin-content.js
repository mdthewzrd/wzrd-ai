const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // Login as admin
    await page.goto('http://localhost:3000/login');
    await page.waitForSelector('button:has-text("Admin")');
    await page.click('button:has-text("Admin")');
    await page.waitForTimeout(2000);
    
    // Visit admin dashboard and check content management
    await page.goto('http://localhost:3000/admin');
    await page.waitForSelector('h1');
    await page.screenshot({ path: 'admin-dashboard-with-content.png' });
    console.log('✓ Admin dashboard with content management');

    // Test content management page
    await page.goto('http://localhost:3000/admin/content/pages');
    await page.waitForSelector('h1');
    await page.screenshot({ path: 'admin-content-management.png' });
    console.log('✓ Admin content management page');

  } catch (error) {
    console.error('Error:', error.message);
    await page.screenshot({ path: 'admin-content-error.png' });
  }
  
  await browser.close();
})();