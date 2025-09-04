const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // Login as client to access publications
    await page.goto('http://localhost:3000/login');
    await page.waitForSelector('button:has-text("Client")');
    await page.click('button:has-text("Client")');
    await page.waitForTimeout(2000);
    
    // Visit publications page
    await page.goto('http://localhost:3000/publications');
    await page.waitForSelector('h1');
    await page.screenshot({ path: 'publications-with-dropdowns.png' });
    console.log('✓ Publications page with dropdown structure');

  } catch (error) {
    console.error('Error:', error.message);
  }
  
  await browser.close();
})();