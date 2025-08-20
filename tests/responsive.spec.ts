import { test, expect } from '@playwright/test';

test.describe('Responsive Design Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if content is visible and properly sized
    await expect(page.locator('main')).toBeVisible();
    
    // Check if text is readable (not too small)
    const headings = page.locator('h1, h2');
    if (await headings.first().isVisible()) {
      const fontSize = await headings.first().evaluate(el => 
        window.getComputedStyle(el).fontSize
      );
      const fontSizeNumber = parseInt(fontSize);
      expect(fontSizeNumber).toBeGreaterThan(16); // Minimum readable size
    }
    
    // Check if buttons are appropriately sized for touch
    const buttons = page.locator('button, a[role="button"]');
    if (await buttons.first().isVisible()) {
      const buttonHeight = await buttons.first().boundingBox();
      if (buttonHeight) {
        expect(buttonHeight.height).toBeGreaterThanOrEqual(44); // Minimum touch target
      }
    }
  });

  test('should handle tablet viewport correctly', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Check if layout adapts properly
    await expect(page.locator('main')).toBeVisible();
    
    // Services should be visible and well-arranged
    const servicesSection = page.locator('#services');
    await expect(servicesSection).toBeVisible();
  });

  test('should work on desktop viewport', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Check if all sections are visible
    await expect(page.locator('main')).toBeVisible();
    
    // Check if navigation is visible (not collapsed)
    const navigation = page.locator('nav');
    if (await navigation.isVisible()) {
      const navLinks = navigation.locator('a');
      expect(await navLinks.count()).toBeGreaterThan(0);
    }
  });

  test('should have proper text scaling on different screens', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 },  // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1920, height: 1080 } // Desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      
      // Check if main heading is visible and properly sized
      const mainHeading = page.locator('h1');
      if (await mainHeading.isVisible()) {
        const fontSize = await mainHeading.evaluate(el => 
          window.getComputedStyle(el).fontSize
        );
        const fontSizeNumber = parseInt(fontSize);
        
        // Text should be readable on all screen sizes
        expect(fontSizeNumber).toBeGreaterThan(16);
        expect(fontSizeNumber).toBeLessThan(100); // Not too large
      }
    }
  });

  test('should have properly sized images on all devices', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 },  // Mobile
      { width: 768, height: 1024 }, // Tablet  
      { width: 1920, height: 1080 } // Desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      
      // Check if images don't overflow container
      const images = page.locator('img');
      
      for (let i = 0; i < await images.count(); i++) {
        const img = images.nth(i);
        if (await img.isVisible()) {
          const imgBox = await img.boundingBox();
          const containerBox = await page.locator('body').boundingBox();
          
          if (imgBox && containerBox) {
            // Image should not be wider than viewport
            expect(imgBox.width).toBeLessThanOrEqual(containerBox.width);
          }
        }
      }
    }
  });

  test('should have appropriate spacing on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if sections have appropriate spacing
    const sections = page.locator('section, #hero, #about, #services, #reviews, #contact');
    
    if (await sections.first().isVisible()) {
      for (let i = 0; i < Math.min(await sections.count(), 3); i++) {
        const section = sections.nth(i);
        const paddingTop = await section.evaluate(el => 
          window.getComputedStyle(el).paddingTop
        );
        const paddingNumber = parseInt(paddingTop);
        
        // Sections should have adequate spacing
        expect(paddingNumber).toBeGreaterThan(8);
      }
    }
  });

  test('should not have horizontal scrollbar', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 },
      { width: 768, height: 1024 },
      { width: 1920, height: 1080 }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      
      // Check if page width exceeds viewport
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = viewport.width;
      
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1); // Allow for rounding
    }
  });
});