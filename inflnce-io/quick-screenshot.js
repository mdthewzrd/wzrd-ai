const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // Test homepage
    await page.goto('http://localhost:3000');
    await page.waitForSelector('h1');
    await page.screenshot({ path: 'homepage-with-auth.png' });
    console.log('✓ Homepage screenshot taken');

    // Test clicking protected link
    await page.click('a[href="/social-media"]');
    await page.waitForSelector('input[id="email"]');
    await page.screenshot({ path: 'login-redirect.png' });
    console.log('✓ Login redirect screenshot taken');

    // Test admin login
    await page.click('button:has-text("Admin")');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'logged-in-admin.png' });
    console.log('✓ Admin dashboard screenshot taken');

  } catch (error) {
    console.error('Error:', error.message);
  }
  
  await browser.close();
})();