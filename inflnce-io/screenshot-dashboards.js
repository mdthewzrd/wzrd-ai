const { chromium } = require('playwright');

async function takeAllScreenshots() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const pages = [
    { url: 'http://localhost:3000/', filename: 'homepage.png', name: 'Homepage' },
    { url: 'http://localhost:3000/login', filename: 'login.png', name: 'Login Page' },
    { url: 'http://localhost:3000/social-media', filename: 'social-media.png', name: 'Social Media' },
    { url: 'http://localhost:3000/admin', filename: 'admin-dashboard.png', name: 'Admin Dashboard' },
    { url: 'http://localhost:3000/reseller', filename: 'reseller-dashboard.png', name: 'Reseller Dashboard' },
    { url: 'http://localhost:3000/client', filename: 'client-dashboard.png', name: 'Client Dashboard' }
  ];
  
  for (const pageInfo of pages) {
    try {
      console.log(`Taking screenshot of ${pageInfo.name}...`);
      await page.goto(pageInfo.url);
      await page.waitForTimeout(3000);
      
      await page.screenshot({ 
        path: pageInfo.filename, 
        fullPage: true 
      });
      
      console.log(`✓ ${pageInfo.name} screenshot saved as ${pageInfo.filename}`);
    } catch (error) {
      console.log(`✗ Failed to screenshot ${pageInfo.name}: ${error.message}`);
    }
  }
  
  await browser.close();
  console.log('\n🎉 All screenshots completed!');
}

takeAllScreenshots().catch(console.error);