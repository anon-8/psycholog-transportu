import { test, expect } from '@playwright/test';

// Define viewport sizes for comprehensive testing
const viewports = [
  { name: 'Desktop', width: 1920, height: 1080 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Mobile', width: 375, height: 667 }
];

test.describe('Visual Testing - Psychology Website', () => {
  
  for (const viewport of viewports) {
    test.describe(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
      
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/');
        // Wait for page to fully load
        await page.waitForLoadState('networkidle');
        // Wait for any potential animations or loading states
        await page.waitForTimeout(2000);
      });

      test(`should capture full page screenshot on ${viewport.name}`, async ({ page }) => {
        await expect(page).toHaveScreenshot(`${viewport.name.toLowerCase()}-full-page.png`, {
          fullPage: true,
          animations: 'disabled'
        });
      });

      test(`should capture header section on ${viewport.name}`, async ({ page }) => {
        const header = page.locator('header, nav').first();
        await expect(header).toHaveScreenshot(`${viewport.name.toLowerCase()}-header.png`);
      });

      test(`should capture hero section on ${viewport.name}`, async ({ page }) => {
        const hero = page.locator('#hero, [data-testid="hero"], section').first();
        await expect(hero).toHaveScreenshot(`${viewport.name.toLowerCase()}-hero.png`);
      });

      test(`should capture about section on ${viewport.name}`, async ({ page }) => {
        await page.locator('#about').scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        const about = page.locator('#about').first();
        await expect(about).toHaveScreenshot(`${viewport.name.toLowerCase()}-about.png`);
      });

      test(`should capture services section on ${viewport.name}`, async ({ page }) => {
        await page.locator('#services').scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        const services = page.locator('#services').first();
        await expect(services).toHaveScreenshot(`${viewport.name.toLowerCase()}-services.png`);
      });

      test(`should capture reviews section on ${viewport.name}`, async ({ page }) => {
        await page.locator('#reviews').scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        const reviews = page.locator('#reviews').first();
        await expect(reviews).toHaveScreenshot(`${viewport.name.toLowerCase()}-reviews.png`);
      });

      test(`should capture contact section on ${viewport.name}`, async ({ page }) => {
        await page.locator('#contact').scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        const contact = page.locator('#contact').first();
        await expect(contact).toHaveScreenshot(`${viewport.name.toLowerCase()}-contact.png`);
      });

      test(`should capture footer on ${viewport.name}`, async ({ page }) => {
        const footer = page.locator('footer').first();
        await footer.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await expect(footer).toHaveScreenshot(`${viewport.name.toLowerCase()}-footer.png`);
      });

      // Test mobile menu on smaller screens
      if (viewport.width < 768) {
        test(`should capture mobile menu on ${viewport.name}`, async ({ page }) => {
          // Try to find and click mobile menu button
          const menuButton = page.locator('button[aria-label*="menu"], button[aria-label*="Menu"], .hamburger, [data-testid="menu-button"]').first();
          if (await menuButton.isVisible()) {
            await menuButton.click();
            await page.waitForTimeout(500);
            await expect(page).toHaveScreenshot(`${viewport.name.toLowerCase()}-mobile-menu-open.png`);
          }
        });
      }

      // Test form interactions
      test(`should capture contact form on ${viewport.name}`, async ({ page }) => {
        await page.locator('#kontakt').scrollIntoViewIfNeeded();
        const form = page.locator('form').first();
        if (await form.isVisible()) {
          await expect(form).toHaveScreenshot(`${viewport.name.toLowerCase()}-contact-form.png`);
        }
      });

      // Test hover states on desktop
      if (viewport.width >= 1024) {
        test(`should capture button hover states on ${viewport.name}`, async ({ page }) => {
          const ctaButton = page.locator('a[href*="tel"], button').first();
          if (await ctaButton.isVisible()) {
            await ctaButton.hover();
            await page.waitForTimeout(300);
            await expect(ctaButton).toHaveScreenshot(`${viewport.name.toLowerCase()}-button-hover.png`);
          }
        });
      }

    });
  }

  // Cross-browser compatibility tests
  test.describe('Layout Consistency Tests', () => {
    
    test('should have consistent text alignment across sections', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Check for text overflow or layout breaks
      const sections = page.locator('section, main > div');
      const count = await sections.count();
      
      for (let i = 0; i < count; i++) {
        const section = sections.nth(i);
        await section.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        
        // Check for horizontal scrolling
        const hasHorizontalScroll = await page.evaluate(() => {
          return document.body.scrollWidth > document.body.clientWidth;
        });
        
        expect(hasHorizontalScroll).toBeFalsy();
      }
    });

    test('should not have overlapping elements', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 }); // Mobile view
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Take screenshot of potential problem areas
      await expect(page).toHaveScreenshot('mobile-layout-check.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('should have readable font sizes on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Check computed font sizes
      const textElements = page.locator('h1, h2, h3, p, span, a');
      const count = Math.min(await textElements.count(), 10); // Check first 10 elements
      
      for (let i = 0; i < count; i++) {
        const element = textElements.nth(i);
        if (await element.isVisible()) {
          const fontSize = await element.evaluate((el) => {
            return window.getComputedStyle(el).fontSize;
          });
          
          const fontSizeNum = parseInt(fontSize.replace('px', ''));
          // Minimum readable font size on mobile should be 14px
          expect(fontSizeNum).toBeGreaterThanOrEqual(14);
        }
      }
    });

  });

});