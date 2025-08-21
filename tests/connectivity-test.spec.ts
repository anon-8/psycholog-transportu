import { test, expect } from '@playwright/test';

test('Basic connectivity test', async ({ page }) => {
  console.log('Testing basic connectivity to http://localhost:3002');
  
  try {
    await page.goto('http://localhost:3002', { waitUntil: 'domcontentloaded', timeout: 10000 });
    
    const title = await page.title();
    console.log(`✓ Page loaded successfully. Title: "${title}"`);
    
    // Take a quick screenshot
    await page.screenshot({ path: 'screenshots/connectivity-test.png' });
    console.log('✓ Screenshot saved to screenshots/connectivity-test.png');
    
    // Check if basic elements exist
    const headings = await page.locator('h1, h2').count();
    console.log(`✓ Found ${headings} headings on the page`);
    
    const buttons = await page.locator('button, a[href]').count();
    console.log(`✓ Found ${buttons} interactive elements`);
    
    expect(title).toContain('Psycholog');
    
  } catch (error) {
    console.error('❌ Connection failed:', error);
    throw error;
  }
});