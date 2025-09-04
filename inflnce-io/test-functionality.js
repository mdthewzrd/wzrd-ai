const { chromium } = require('playwright');

async function testAdminFunctionality() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('Testing admin functionality...');
    
    // First go to login page and authenticate as admin
    await page.goto('http://localhost:3000/login');
    await page.waitForLoadState('networkidle');
    
    // Click admin demo button
    await page.click('button:has-text("Admin")');
    await page.waitForLoadState('networkidle');
    
    // Navigate to admin users page
    await page.goto('http://localhost:3000/admin/users');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of user management
    await page.screenshot({ 
      path: 'admin-users-screenshot.png',
      fullPage: true 
    });
    console.log('Screenshot saved: admin-users-screenshot.png');

    // Navigate to admin services page
    await page.goto('http://localhost:3000/admin/services');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of services management
    await page.screenshot({ 
      path: 'admin-services-screenshot.png',
      fullPage: true 
    });
    console.log('Screenshot saved: admin-services-screenshot.png');

    // Test social media pages
    const platforms = ['tiktok', 'instagram', 'youtube', 'twitter', 'spotify'];
    
    for (const platform of platforms) {
      await page.goto(`http://localhost:3000/social-media/${platform}`);
      await page.waitForLoadState('networkidle');
      
      await page.screenshot({ 
        path: `${platform}-page-screenshot.png`,
        fullPage: true 
      });
      console.log(`Screenshot saved: ${platform}-page-screenshot.png`);
    }

    console.log('All functionality tests completed successfully!');
    
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
}

testAdminFunctionality();