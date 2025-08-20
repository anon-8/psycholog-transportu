import { test, expect } from '@playwright/test';

// Test the main viewports
const viewports = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 667 }
];

test.describe('Visual Screenshots - Psychology Website', () => {
  
  for (const viewport of viewports) {
    test(`${viewport.name} - full page screenshot`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(3000); // Allow time for animations/loading
      
      // Take full page screenshot
      await expect(page).toHaveScreenshot(`${viewport.name}-full-page.png`, {
        fullPage: true,
        animations: 'disabled',
        threshold: 0.5
      });
    });

    test(`${viewport.name} - hero section`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      
      const hero = page.locator('#hero');
      await expect(hero).toHaveScreenshot(`${viewport.name}-hero.png`, {
        threshold: 0.3
      });
    });

    test(`${viewport.name} - services section`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const services = page.locator('#services');
      await services.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
      
      await expect(services).toHaveScreenshot(`${viewport.name}-services.png`, {
        threshold: 0.3
      });
    });

    test(`${viewport.name} - contact section`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const contact = page.locator('#contact');
      await contact.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
      
      await expect(contact).toHaveScreenshot(`${viewport.name}-contact.png`, {
        threshold: 0.3
      });
    });
  }

  // Test mobile menu functionality
  test('mobile - menu interaction', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Try to find mobile menu button
    const menuButton = page.locator('button').filter({ hasText: /menu/i }).or(
      page.locator('[aria-label*="menu"]').or(
        page.locator('.hamburger').or(
          page.locator('button').first()
        )
      )
    );
    
    if (await menuButton.isVisible()) {
      await expect(page).toHaveScreenshot('mobile-menu-closed.png');
      await menuButton.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('mobile-menu-opened.png');
    }
  });

  // Test form appearance
  test('contact form visual check', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    const form = page.locator('form');
    if (await form.isVisible()) {
      await expect(form).toHaveScreenshot('contact-form.png');
    }
  });

});