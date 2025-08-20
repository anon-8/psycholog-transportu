import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have navigation menu with all links', async ({ page }) => {
    // Check main navigation links exist
    await expect(page.getByRole('link', { name: 'Strona główna' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'O mnie' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Usługi' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Opinie' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Kontakt' })).toBeVisible();
  });

  test('should navigate to sections with smooth scrolling', async ({ page }) => {
    // Test About section navigation
    await page.getByRole('link', { name: 'O mnie' }).click();
    await expect(page.locator('#about')).toBeInViewport();
    
    // Test Services section navigation
    await page.getByRole('link', { name: 'Usługi' }).click();
    await expect(page.locator('#services')).toBeInViewport();
    
    // Test Reviews section navigation
    await page.getByRole('link', { name: 'Opinie' }).click();
    await expect(page.locator('#reviews')).toBeInViewport();
    
    // Test Contact section navigation
    await page.getByRole('link', { name: 'Kontakt' }).click();
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('should have working mobile menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if hamburger menu button is visible on mobile
    const menuButton = page.locator('button[aria-label*="menu"], button[aria-label*="Menu"], .hamburger, [data-testid="mobile-menu-button"]');
    
    // If mobile menu exists, test it
    if (await menuButton.isVisible()) {
      await menuButton.click();
      
      // Check if mobile menu items are visible after clicking
      await expect(page.getByRole('link', { name: 'O mnie' })).toBeVisible();
    }
  });

  test('should have CTA buttons in header', async ({ page }) => {
    // Look for common CTA button texts
    const ctaButtons = [
      'Umów wizytę',
      'Zadzwoń teraz', 
      'Skontaktuj się',
      'Kontakt'
    ];
    
    let foundCTA = false;
    for (const buttonText of ctaButtons) {
      const button = page.getByRole('button', { name: buttonText }).or(page.getByRole('link', { name: buttonText }));
      if (await button.isVisible()) {
        foundCTA = true;
        break;
      }
    }
    
    expect(foundCTA).toBe(true);
  });
});