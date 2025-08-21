import { test, expect } from '@playwright/test';

test.describe('Mobile Layout Tests', () => {
  test('should display properly on mobile devices', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the page to load
    await expect(page.locator('h1')).toBeVisible();
    
    // Check if the main heading is visible
    await expect(page.locator('h1')).toContainText('Profesjonalne badania psychologiczne dla kierowców');
    
    // Check if CTA buttons are visible and properly styled
    const primaryButton = page.locator('button', { hasText: 'Umów wizytę' });
    await expect(primaryButton).toBeVisible();
    
    const phoneButton = page.locator('a', { hasText: 'Zadzwoń teraz' });
    await expect(phoneButton).toBeVisible();
    
    // Check if navigation sections are present
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('#services')).toBeVisible();
    await expect(page.locator('#reviews')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
    
    // Check if services section displays properly
    await expect(page.locator('text=Kierowcy wszystkich kat. prawa jazdy')).toBeVisible();
    await expect(page.locator('text=576 804 375')).toBeVisible();
    
    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await expect(page.locator('text=Rejestracja telefoniczna')).toBeVisible();
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'mobile-layout-test.png',
      fullPage: true 
    });
  });
  
  test('should have proper mobile navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check if mobile menu button exists (if hamburger menu is implemented)
    const mobileMenu = page.locator('[aria-label="Toggle navigation"]');
    if (await mobileMenu.count() > 0) {
      await mobileMenu.click();
      // Check if navigation links are visible after clicking
      await expect(page.locator('nav a', { hasText: 'O mnie' })).toBeVisible();
    }
  });
  
  test('should display contact information correctly on mobile', async ({ page }) => {
    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();
    
    // Check phone number formatting
    await expect(page.locator('text=576 804 375')).toBeVisible();
    
    // Check address
    await expect(page.locator('text=ul. S. Czarnieckiego 2')).toBeVisible();
    
    // Check that map is visible
    await expect(page.locator('iframe')).toBeVisible();
  });
});