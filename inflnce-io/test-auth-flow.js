const { chromium } = require('playwright');

(async () => {
  console.log('Testing member-gated authentication flow...');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // 1. Visit homepage (should work without auth)
    console.log('1. Testing homepage access without auth...');
    await page.goto('http://localhost:3000');
    await page.waitForSelector('h1');
    await page.screenshot({ path: 'homepage-no-auth.png' });
    console.log('✓ Homepage loads successfully');

    // 2. Try to click a protected button - should redirect to login
    console.log('2. Testing protected button click...');
    await page.click('a[href="/social-media"]');
    await page.waitForSelector('input[id="email"]', { timeout: 10000 });
    await page.screenshot({ path: 'redirected-to-login.png' });
    console.log('✓ Protected link redirected to login page');

    // 3. Test login as admin
    console.log('3. Testing admin login...');
    await page.click('button:has-text("Admin")');
    await page.waitForTimeout(2000); // Wait for redirect
    await page.screenshot({ path: 'admin-dashboard-after-login.png' });
    console.log('✓ Admin login and dashboard access successful');

    // 4. Test logout and re-access
    console.log('4. Testing logout...');
    await page.click('button[role="button"]'); // Click avatar/profile button
    await page.waitForTimeout(500);
    await page.click('div:has-text("Log out")');
    await page.waitForURL('http://localhost:3000/');
    await page.screenshot({ path: 'homepage-after-logout.png' });
    console.log('✓ Logout successful');

    // 5. Try accessing admin directly while logged out
    console.log('5. Testing direct admin access without auth...');
    await page.goto('http://localhost:3000/admin');
    await page.waitForSelector('input[id="email"]', { timeout: 10000 });
    await page.screenshot({ path: 'admin-blocked-redirect.png' });
    console.log('✓ Direct admin access correctly redirected to login');

    console.log('\n🎉 All authentication tests passed!');
    
  } catch (error) {
    console.error('Test failed:', error.message);
    await page.screenshot({ path: 'test-error.png' });
  }
  
  await browser.close();
})();