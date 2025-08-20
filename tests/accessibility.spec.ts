import { test, expect } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    // Check H1 exists and is unique
    const h1Elements = page.locator('h1');
    await expect(h1Elements).toHaveCount(1);
    
    // Check H2 elements exist
    const h2Elements = page.locator('h2');
    expect(await h2Elements.count()).toBeGreaterThan(0);
    
    // Check that headings follow logical order
    const allHeadings = page.locator('h1, h2, h3, h4, h5, h6');
    if (await allHeadings.count() > 1) {
      const firstHeading = await allHeadings.first().evaluate(el => el.tagName);
      expect(firstHeading).toBe('H1');
    }
  });

  test('should have alt text for images', async ({ page }) => {
    const images = page.locator('img');
    
    for (let i = 0; i < await images.count(); i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      
      // Images should have alt text or be decorative (alt="")
      expect(alt).toBeDefined();
      
      // Alt text should be meaningful (not just filename)
      if (alt && alt.length > 0) {
        expect(alt).not.toMatch(/\.(jpg|jpeg|png|gif|svg)$/i);
        expect(alt.length).toBeGreaterThan(2);
      }
    }
  });

  test('should have proper form labels', async ({ page }) => {
    const inputs = page.locator('input:not([type="hidden"]), textarea, select');
    
    for (let i = 0; i < await inputs.count(); i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledby = await input.getAttribute('aria-labelledby');
      
      if (id) {
        // Check for associated label
        const label = page.locator(`label[for="${id}"]`);
        const hasLabel = await label.isVisible();
        
        // Input should have either label, aria-label, or aria-labelledby
        expect(hasLabel || ariaLabel || ariaLabelledby).toBeTruthy();
      }
    }
  });

  test('should have keyboard navigation support', async ({ page }) => {
    // Test tab navigation through interactive elements
    const interactiveElements = page.locator('button, a, input, textarea, select, [tabindex]');
    
    if (await interactiveElements.count() > 0) {
      // Focus first interactive element
      await page.keyboard.press('Tab');
      
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
      
      // Should be able to navigate with Tab key
      await page.keyboard.press('Tab');
      const secondFocusedElement = page.locator(':focus');
      await expect(secondFocusedElement).toBeVisible();
    }
  });

  test('should have proper color contrast', async ({ page }) => {
    // Test text color contrast (simplified check)
    const textElements = page.locator('p, h1, h2, h3, h4, h5, h6, a, button, span');
    
    for (let i = 0; i < Math.min(await textElements.count(), 10); i++) {
      const element = textElements.nth(i);
      
      if (await element.isVisible()) {
        const styles = await element.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            color: computed.color,
            backgroundColor: computed.backgroundColor,
            fontSize: computed.fontSize
          };
        });
        
        // Basic check - text should not be transparent
        expect(styles.color).not.toBe('rgba(0, 0, 0, 0)');
        expect(styles.color).not.toBe('transparent');
      }
    }
  });

  test('should have focus indicators', async ({ page }) => {
    // Test that focused elements have visible focus indicators
    const buttons = page.locator('button, a');
    
    if (await buttons.first().isVisible()) {
      await buttons.first().focus();
      
      const focusedButton = page.locator(':focus');
      const outlineStyle = await focusedButton.evaluate(el => 
        window.getComputedStyle(el).outline
      );
      
      // Should have some kind of focus indicator
      expect(outlineStyle).not.toBe('none');
    }
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    // Check for navigation landmarks
    const nav = page.locator('nav, [role="navigation"]');
    if (await nav.isVisible()) {
      const ariaLabel = await nav.getAttribute('aria-label');
      const role = await nav.getAttribute('role');
      
      // Navigation should be identifiable
      expect(ariaLabel || role === 'navigation' || await nav.evaluate(el => el.tagName === 'NAV')).toBeTruthy();
    }
    
    // Check for main content
    const main = page.locator('main, [role="main"]');
    await expect(main).toBeVisible();
    
    // Check buttons have proper labels
    const buttons = page.locator('button');
    for (let i = 0; i < await buttons.count(); i++) {
      const button = buttons.nth(i);
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      
      // Button should have accessible name
      expect((text && text.trim().length > 0) || ariaLabel).toBeTruthy();
    }
  });

  test('should have proper page language', async ({ page }) => {
    // Check html lang attribute
    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBe('pl'); // Should be Polish
  });

  test('should have descriptive page title', async ({ page }) => {
    const title = await page.title();
    
    // Title should be descriptive and contain key information
    expect(title.length).toBeGreaterThan(10);
    expect(title).toMatch(/psycholog|transport|przemyśl/i);
  });

  test('should have proper link text', async ({ page }) => {
    const links = page.locator('a');
    
    for (let i = 0; i < await links.count(); i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      const title = await link.getAttribute('title');
      
      // Link should have descriptive text
      if (text && text.trim().length > 0) {
        expect(text.trim()).not.toBe('click here');
        expect(text.trim()).not.toBe('read more');
        expect(text.trim()).not.toBe('here');
      } else {
        // If no text, should have aria-label or title
        expect(ariaLabel || title).toBeTruthy();
      }
    }
  });

  test('should not have accessibility violations', async ({ page }) => {
    // Basic accessibility checks
    
    // Check for images without alt text
    const imagesWithoutAlt = page.locator('img:not([alt])');
    expect(await imagesWithoutAlt.count()).toBe(0);
    
    // Check for inputs without labels
    const inputsWithoutLabels = page.locator('input:not([type="hidden"]):not([aria-label]):not([aria-labelledby])').filter(async (input) => {
      const id = await input.getAttribute('id');
      if (!id) return true;
      
      const label = page.locator(`label[for="${id}"]`);
      return !(await label.isVisible());
    });
    
    expect(await inputsWithoutLabels.count()).toBe(0);
  });
});