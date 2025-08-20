import { test, expect } from '@playwright/test';

test.describe('Hero Section Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display hero content correctly', async ({ page }) => {
    // Check main headline
    await expect(page.getByText('Profesjonalne badania psychologiczne dla kierowców')).toBeVisible();
    
    // Check subheadline
    await expect(page.getByText(/Doświadczony psycholog transportu.*Przemyślu/)).toBeVisible();
    
    // Check trust indicators
    await expect(page.getByText('15 lat doświadczenia')).toBeVisible();
  });

  test('should have working CTA buttons', async ({ page }) => {
    // Test primary CTA button
    const primaryCTA = page.getByRole('button', { name: 'Umów wizytę' }).or(page.getByRole('link', { name: 'Umów wizytę' }));
    await expect(primaryCTA).toBeVisible();
    
    // Test if CTA button has proper styling/classes
    await expect(primaryCTA).toHaveClass(/bg-|btn-|button/);
    
    // Check phone CTA
    const phoneCTA = page.getByRole('button', { name: 'Zadzwoń teraz' }).or(page.getByRole('link', { name: 'Zadzwoń teraz' }));
    if (await phoneCTA.isVisible()) {
      // Test phone link functionality
      const phoneLink = page.locator('a[href^="tel:"]');
      if (await phoneLink.isVisible()) {
        await expect(phoneLink).toHaveAttribute('href', /tel:\+48/);
      }
    }
  });

  test('should display hero features list', async ({ page }) => {
    // Check for feature list items
    const features = [
      'Badania na miejscu w gabinecie',
      'Szybkie wydawanie zaświadczeń', 
      'Indywidualne podejście'
    ];
    
    for (const feature of features) {
      await expect(page.getByText(feature)).toBeVisible();
    }
  });

  test('should have proper hero section styling', async ({ page }) => {
    // Hero section should be visible and prominent
    const heroSection = page.locator('section').first().or(page.locator('#hero')).or(page.locator('.hero'));
    await expect(heroSection).toBeVisible();
    
    // Should have background or styling
    await expect(heroSection).toHaveClass(/bg-|hero|banner/);
  });

  test('should display trust indicators', async ({ page }) => {
    // Check numerical trust indicators
    await expect(page.getByText(/\d+.*lat.*doświadczenia/)).toBeVisible();
    
    // Look for client count or similar trust indicators
    const trustIndicators = page.getByText(/\d+.*klient/);
    if (await trustIndicators.isVisible()) {
      expect(await trustIndicators.textContent()).toMatch(/\d+/);
    }
  });
});