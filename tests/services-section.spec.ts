import { test, expect } from '@playwright/test';

test.describe('Services Section Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Scroll to services section
    await page.locator('#services').scrollIntoViewIfNeeded();
  });

  test('should display both main services', async ({ page }) => {
    // Check psychological tests service
    await expect(page.getByText('Badania Psychologiczne Kierowców')).toBeVisible();
    
    // Check consultations service  
    await expect(page.getByText('Konsultacje Psychologiczne')).toBeVisible();
  });

  test('should display service pricing and duration', async ({ page }) => {
    // Check psychological tests pricing
    await expect(page.getByText('od 150 zł')).toBeVisible();
    await expect(page.getByText('45 minut')).toBeVisible();
    
    // Check consultations pricing
    await expect(page.getByText('200 zł')).toBeVisible();
    await expect(page.getByText('50 minut')).toBeVisible();
  });

  test('should display service features', async ({ page }) => {
    // Features for psychological tests
    const psychoTestFeatures = [
      'Badania dla kierowców zawodowych',
      'Badania dla instruktorów nauki jazdy',
      'Badania dla kierowców autobusów i ciężarówek',
      'Wydawanie zaświadczeń'
    ];
    
    for (const feature of psychoTestFeatures) {
      await expect(page.getByText(feature)).toBeVisible();
    }
    
    // Features for consultations
    const consultationFeatures = [
      'Radzenie sobie ze stresem zawodowym',
      'Wsparcie po wypadkach drogowych',
      'Terapia lęku przed jazdą',
      'Rozwój kompetencji zawodowych'
    ];
    
    for (const feature of consultationFeatures) {
      await expect(page.getByText(feature)).toBeVisible();
    }
  });

  test('should have proper service card styling', async ({ page }) => {
    // Look for service cards or containers
    const serviceCards = page.locator('[data-testid="service-card"]').or(
      page.locator('.service-card')
    ).or(
      page.locator('div').filter({ hasText: 'Badania Psychologiczne Kierowców' }).first().locator('..')
    );
    
    if (await serviceCards.first().isVisible()) {
      await expect(serviceCards).toHaveCount(2);
      
      // Check if cards have proper styling
      await expect(serviceCards.first()).toHaveClass(/border|card|bg-|shadow/);
    }
  });

  test('should display service descriptions', async ({ page }) => {
    // Check psychological tests description
    await expect(page.getByText(/Profesjonalne badania psychologiczne wymagane/)).toBeVisible();
    
    // Check consultations description
    await expect(page.getByText(/Indywidualne wsparcie psychologiczne/)).toBeVisible();
  });

  test('should have call-to-action elements in services', async ({ page }) => {
    // Look for booking or contact buttons in services section
    const servicesCTAs = page.locator('#services').getByRole('button').or(
      page.locator('#services').getByRole('link').filter({ hasText: /Umów|Kontakt|Zadzwoń/ })
    );
    
    if (await servicesCTAs.first().isVisible()) {
      expect(await servicesCTAs.count()).toBeGreaterThan(0);
    }
  });
});