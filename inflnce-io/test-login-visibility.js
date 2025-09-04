const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3000/login');
    await page.waitForSelector('h1');
    await page.screenshot({ path: 'login-text-visibility-fixed.png' });
    console.log('✓ Login page visibility screenshot taken');

  } catch (error) {
    console.error('Error:', error.message);
  }
  
  await browser.close();
})();