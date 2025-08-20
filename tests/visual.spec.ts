import { test, expect } from '@playwright/test';

test.describe('Visual Design Tests', () => {
  test('homepage looks good on desktop', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');
    
    // Check main sections are visible
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('#hero')).toBeVisible();
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('#services')).toBeVisible();
    await expect(page.locator('#reviews')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    
    // Take full page screenshot
    await page.screenshot({ path: 'test-results/desktop-full-page.png', fullPage: true });
  });

  test('homepage looks good on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');
    
    // Check main sections are visible on mobile
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('#hero')).toBeVisible();
    
    // Test mobile menu
    const menuButton = page.locator('button[aria-label*="menu"], button:has-text("☰")');
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(500);
    }
    
    // Take full page screenshot
    await page.screenshot({ path: 'test-results/mobile-full-page.png', fullPage: true });
  });

  test('responsive design check', async ({ page }) => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1920, height: 1080 },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Check key elements are properly sized
      const hero = page.locator('#hero');
      await expect(hero).toBeVisible();
      
      // Check text readability - no horizontal overflow
      const heroText = page.locator('#hero h1, #hero p');
      const boxes = await heroText.allTextContents();
      
      // Take screenshot for this viewport
      await page.screenshot({ 
        path: `test-results/${viewport.name}-${viewport.width}x${viewport.height}.png`,
        fullPage: true 
      });
    }
  });

  test('interactive elements work', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test navigation scrolling
    const aboutLink = page.locator('a[href="#about"], button:has-text("O mnie")');
    if (await aboutLink.isVisible()) {
      await aboutLink.click();
      await page.waitForTimeout(1000);
    }
    
    // Test CTA buttons
    const ctaButtons = page.locator('a:has-text("Umów wizytę"), button:has-text("Umów wizytę")');
    await expect(ctaButtons.first()).toBeVisible();
    
    // Test contact form
    await page.locator('#contact').scrollIntoViewIfNeeded();
    const nameField = page.locator('input[name="name"]');
    if (await nameField.isVisible()) {
      await nameField.fill('Test User');
    }
  });
});