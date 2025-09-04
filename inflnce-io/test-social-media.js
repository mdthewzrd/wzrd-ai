const { chromium } = require('playwright');

async function testSocialMediaPages() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('Testing social media platforms...');
    
    // Authenticate first
    await page.goto('http://localhost:3000/login');
    await page.waitForLoadState('networkidle');
    await page.click('button:has-text("Client")');
    await page.waitForTimeout(2000);
    
    // Test all social media platforms
    const platforms = ['tiktok', 'instagram', 'youtube', 'twitter', 'spotify'];
    
    for (const platform of platforms) {
      console.log(`Testing ${platform} page...`);
      await page.goto(`http://localhost:3000/social-media/${platform}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      
      await page.screenshot({ 
        path: `authenticated-${platform}-page.png`,
        fullPage: true 
      });
      console.log(`Screenshot saved: authenticated-${platform}-page.png`);
    }

    console.log('All social media platform tests completed!');
    
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
}

testSocialMediaPages();