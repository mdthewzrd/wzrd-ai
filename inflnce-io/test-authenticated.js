const { chromium } = require('playwright');

async function testAuthenticatedPages() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('Testing authenticated functionality...');
    
    // Go to login page and authenticate
    await page.goto('http://localhost:3000/login');
    await page.waitForLoadState('networkidle');
    
    // Click Admin demo button
    await page.click('button:has-text("Admin")');
    await page.waitForTimeout(2000); // Wait for auth to process
    
    // Navigate to admin users page
    console.log('Navigating to admin users page...');
    await page.goto('http://localhost:3000/admin/users');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Take screenshot of admin users page
    await page.screenshot({ 
      path: 'authenticated-admin-users.png',
      fullPage: true 
    });
    console.log('Screenshot saved: authenticated-admin-users.png');

    // Navigate to admin services page  
    console.log('Navigating to admin services page...');
    await page.goto('http://localhost:3000/admin/services');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Take screenshot of admin services page
    await page.screenshot({ 
      path: 'authenticated-admin-services.png',
      fullPage: true 
    });
    console.log('Screenshot saved: authenticated-admin-services.png');

    console.log('Authentication tests completed!');
    
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
}

testAuthenticatedPages();