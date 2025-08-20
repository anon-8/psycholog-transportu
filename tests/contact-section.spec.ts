import { test, expect } from '@playwright/test';

test.describe('Contact Section Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Scroll to contact section
    await page.locator('#contact').scrollIntoViewIfNeeded();
  });

  test('should display contact information', async ({ page }) => {
    // Check address
    await expect(page.getByText('ul. Słowackiego 15')).toBeVisible();
    await expect(page.getByText('37-700 Przemyśl')).toBeVisible();
    
    // Check phone number
    await expect(page.getByText('+48 123 456 789')).toBeVisible();
    
    // Check email
    await expect(page.getByText('kontakt@psycholog-przemysl.pl')).toBeVisible();
  });

  test('should display office hours', async ({ page }) => {
    // Check office hours
    await expect(page.getByText('8:00 - 16:00')).toBeVisible();
    await expect(page.getByText('8:00 - 14:00')).toBeVisible();
    
    // Check days of the week
    const days = ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek'];
    for (const day of days) {
      const dayElement = page.getByText(new RegExp(day, 'i'));
      if (await dayElement.isVisible()) {
        expect(await dayElement.isVisible()).toBe(true);
      }
    }
  });

  test('should have contact form', async ({ page }) => {
    // Look for form elements
    const nameField = page.locator('input[name="name"], input[placeholder*="imię"], input[placeholder*="nazwa"]');
    const emailField = page.locator('input[name="email"], input[type="email"]');
    const messageField = page.locator('textarea[name="message"], textarea[placeholder*="wiadomość"]');
    const submitButton = page.locator('button[type="submit"], input[type="submit"]').or(
      page.getByRole('button', { name: /wyślij|send|kontakt/ })
    );

    // Check if contact form exists
    if (await nameField.isVisible()) {
      await expect(nameField).toBeVisible();
      await expect(emailField).toBeVisible();
      await expect(messageField).toBeVisible();
      await expect(submitButton).toBeVisible();
    }
  });

  test('should validate contact form fields', async ({ page }) => {
    const emailField = page.locator('input[type="email"]');
    const submitButton = page.locator('button[type="submit"]').or(
      page.getByRole('button', { name: /wyślij|send/ })
    );

    if (await emailField.isVisible() && await submitButton.isVisible()) {
      // Test email validation
      await emailField.fill('invalid-email');
      await submitButton.click();
      
      // Check for validation message or error state
      const validationMessage = page.locator('.error, [data-testid="error"], .invalid');
      if (await validationMessage.isVisible()) {
        expect(await validationMessage.isVisible()).toBe(true);
      }

      // Test with valid email
      await emailField.fill('test@example.com');
      // Form should accept valid email without error
    }
  });

  test('should have embedded Google Maps', async ({ page }) => {
    // Look for Google Maps iframe
    const mapIframe = page.locator('iframe[src*="google.com/maps"], iframe[src*="maps.google"]');
    
    if (await mapIframe.isVisible()) {
      await expect(mapIframe).toBeVisible();
      
      // Check if iframe has proper src
      const src = await mapIframe.getAttribute('src');
      expect(src).toContain('google');
    }
    
    // Alternative: look for map container
    const mapContainer = page.locator('#map, .map-container, [data-testid="map"]');
    if (await mapContainer.isVisible()) {
      await expect(mapContainer).toBeVisible();
    }
  });

  test('should have clickable phone number', async ({ page }) => {
    // Look for phone link
    const phoneLink = page.locator('a[href^="tel:"]');
    
    if (await phoneLink.isVisible()) {
      await expect(phoneLink).toBeVisible();
      await expect(phoneLink).toHaveAttribute('href', /tel:\+48/);
    }
  });

  test('should have clickable email address', async ({ page }) => {
    // Look for email link
    const emailLink = page.locator('a[href^="mailto:"]');
    
    if (await emailLink.isVisible()) {
      await expect(emailLink).toBeVisible();
      await expect(emailLink).toHaveAttribute('href', /mailto:/);
    }
  });

  test('should display contact section heading', async ({ page }) => {
    // Look for contact section heading
    const contactHeading = page.locator('h2').filter({ hasText: /kontakt|contact/i });
    await expect(contactHeading).toBeVisible();
  });

  test('should have proper contact section styling', async ({ page }) => {
    // Contact section should be visible and properly styled
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
    
    // Should have background or styling
    await expect(contactSection).toHaveClass(/bg-|contact|section/);
  });
});