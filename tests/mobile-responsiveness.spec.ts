import { test, expect, Page } from '@playwright/test';

// Mobile viewport configurations
const mobileViewports = {
  'iPhone SE': { width: 375, height: 667 },
  'iPhone 12': { width: 390, height: 844 },
  'Android Standard': { width: 360, height: 640 },
  'Small Mobile': { width: 320, height: 568 }
};

// Test each mobile viewport
Object.entries(mobileViewports).forEach(([deviceName, viewport]) => {
  test.describe(`Mobile Responsiveness - ${deviceName} (${viewport.width}px)`, () => {
    
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto('http://localhost:3001');
      // Wait for page to fully load
      await page.waitForLoadState('networkidle');
    });

    test('should load page and take screenshot', async ({ page }) => {
      // Take full page screenshot
      await page.screenshot({ 
        path: `screenshots/mobile-${deviceName.replace(/\s+/g, '-')}-full-page.png`,
        fullPage: true 
      });
      
      // Verify page title
      await expect(page).toHaveTitle(/Psycholog Transportu Przemyśl/);
    });

    test('should test mobile navigation and hamburger menu', async ({ page }) => {
      // Check if hamburger menu is visible on mobile
      const hamburgerButton = page.locator('[data-testid="mobile-menu-button"], button:has-text("☰"), button:has-text("Menu")').first();
      
      // Take screenshot of header
      await page.locator('header, nav').first().screenshot({ 
        path: `screenshots/mobile-${deviceName.replace(/\s+/g, '-')}-header.png` 
      });
      
      // Test hamburger menu if it exists
      if (await hamburgerButton.isVisible()) {
        console.log(`${deviceName}: Hamburger menu found`);
        await hamburgerButton.click();
        
        // Wait for menu to open and take screenshot
        await page.waitForTimeout(500);
        await page.screenshot({ 
          path: `screenshots/mobile-${deviceName.replace(/\s+/g, '-')}-menu-open.png` 
        });
        
        // Test navigation links
        const navLinks = page.locator('nav a, [role="navigation"] a');
        const linkCount = await navLinks.count();
        console.log(`${deviceName}: Found ${linkCount} navigation links`);
        
        // Close menu by clicking hamburger again
        await hamburgerButton.click();
        await page.waitForTimeout(500);
      } else {
        console.log(`${deviceName}: No hamburger menu found - checking desktop navigation`);
        const desktopNav = page.locator('nav a');
        const linkCount = await desktopNav.count();
        console.log(`${deviceName}: Found ${linkCount} desktop navigation links`);
      }
    });

    test('should test Services Section accordion design', async ({ page }) => {
      // Scroll to services section
      await page.locator('#services, [id*="service"], h2:has-text("Usługi")').first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      // Take screenshot of services section
      const servicesSection = page.locator('#services, [id*="service"], section:has(h2:has-text("Usługi"))').first();
      await servicesSection.screenshot({ 
        path: `screenshots/mobile-${deviceName.replace(/\s+/g, '-')}-services.png` 
      });
      
      // Look for service cards/items
      const serviceCards = page.locator('[class*="service"], .service-card, [data-testid*="service"]');
      const cardCount = await serviceCards.count();
      console.log(`${deviceName}: Found ${cardCount} service cards`);
      
      // Test expandable/accordion functionality
      const expandableElements = page.locator('button:has-text("Badania"), button:has-text("Konsultacje"), [class*="accordion"], [class*="expand"]');
      const expandableCount = await expandableElements.count();
      
      if (expandableCount > 0) {
        console.log(`${deviceName}: Found ${expandableCount} expandable service elements`);
        
        // Test first expandable element
        const firstExpandable = expandableElements.first();
        if (await firstExpandable.isVisible()) {
          await firstExpandable.click();
          await page.waitForTimeout(500);
          
          // Take screenshot after expansion
          await servicesSection.screenshot({ 
            path: `screenshots/mobile-${deviceName.replace(/\s+/g, '-')}-services-expanded.png` 
          });
        }
      } else {
        console.log(`${deviceName}: No expandable service elements found`);
      }
    });

    test('should verify portrait image in About Section', async ({ page }) => {
      // Scroll to about section
      await page.locator('#about, [id*="about"], h2:has-text("O mnie")').first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      // Find about section and take screenshot
      const aboutSection = page.locator('#about, [id*="about"], section:has(h2:has-text("O mnie"))').first();
      await aboutSection.screenshot({ 
        path: `screenshots/mobile-${deviceName.replace(/\s+/g, '-')}-about.png` 
      });
      
      // Check for portrait images
      const portraitImages = page.locator('img[src*="portrait"], img[alt*="psycholog"], img[alt*="Anna"], img[alt*="doctor"]');
      const imageCount = await portraitImages.count();
      
      console.log(`${deviceName}: Found ${imageCount} potential portrait images`);
      
      if (imageCount > 0) {
        const firstImage = portraitImages.first();
        
        // Check if image is loaded
        const isLoaded = await firstImage.evaluate((img: HTMLImageElement) => {
          return img.complete && img.naturalHeight !== 0;
        });
        
        console.log(`${deviceName}: Portrait image loaded: ${isLoaded}`);
        
        // Get image dimensions
        const boundingBox = await firstImage.boundingBox();
        if (boundingBox) {
          console.log(`${deviceName}: Portrait image size: ${boundingBox.width}x${boundingBox.height}`);
        }
      }
    });

    test('should test CTA button sizing and touch-friendliness', async ({ page }) => {
      // Find CTA buttons
      const ctaButtons = page.locator('button:has-text("Umów"), button:has-text("Kontakt"), button:has-text("Zadzwoń"), a:has-text("Umów"), a:has-text("Kontakt")');
      const buttonCount = await ctaButtons.count();
      
      console.log(`${deviceName}: Found ${buttonCount} CTA buttons`);
      
      // Test each button
      for (let i = 0; i < Math.min(buttonCount, 5); i++) {
        const button = ctaButtons.nth(i);
        if (await button.isVisible()) {
          const boundingBox = await button.boundingBox();
          const buttonText = await button.textContent();
          
          if (boundingBox) {
            const isTouch = boundingBox.height >= 44 && boundingBox.width >= 44; // Apple's recommended minimum touch target
            console.log(`${deviceName}: Button "${buttonText?.trim()}" - Size: ${boundingBox.width}x${boundingBox.height}, Touch-friendly: ${isTouch}`);
            
            // Take screenshot of button area
            await button.screenshot({ 
              path: `screenshots/mobile-${deviceName.replace(/\s+/g, '-')}-button-${i}.png` 
            });
          }
        }
      }
      
      // Take screenshot of hero section with CTA buttons
      const heroSection = page.locator('section').first();
      await heroSection.screenshot({ 
        path: `screenshots/mobile-${deviceName.replace(/\s+/g, '-')}-hero-cta.png` 
      });
    });

    test('should check text readability and font sizes', async ({ page }) => {
      // Check main headings
      const headings = page.locator('h1, h2, h3');
      const headingCount = await headings.count();
      
      console.log(`${deviceName}: Found ${headingCount} headings`);
      
      // Check font sizes of key elements
      const keyElements = [
        { selector: 'h1', name: 'Main Heading' },
        { selector: 'h2', name: 'Section Headings' },
        { selector: 'p', name: 'Paragraphs' },
        { selector: 'button', name: 'Buttons' }
      ];
      
      for (const element of keyElements) {
        const elementLocator = page.locator(element.selector).first();
        if (await elementLocator.isVisible()) {
          const fontSize = await elementLocator.evaluate((el) => {
            return window.getComputedStyle(el).fontSize;
          });
          
          const lineHeight = await elementLocator.evaluate((el) => {
            return window.getComputedStyle(el).lineHeight;
          });
          
          console.log(`${deviceName}: ${element.name} - Font size: ${fontSize}, Line height: ${lineHeight}`);
        }
      }
      
      // Check for text overflow
      const textElements = page.locator('p, h1, h2, h3, span');
      const textCount = await textElements.count();
      
      let overflowCount = 0;
      for (let i = 0; i < Math.min(textCount, 10); i++) {
        const element = textElements.nth(i);
        if (await element.isVisible()) {
          const hasOverflow = await element.evaluate((el) => {
            return el.scrollWidth > el.clientWidth;
          });
          
          if (hasOverflow) {
            overflowCount++;
          }
        }
      }
      
      console.log(`${deviceName}: Found ${overflowCount} elements with potential text overflow`);
    });

    test('should check for layout issues and overflow', async ({ page }) => {
      // Check for horizontal scrollbar
      const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = viewport.width;
      
      const hasHorizontalScroll = bodyScrollWidth > viewportWidth;
      console.log(`${deviceName}: Body scroll width: ${bodyScrollWidth}, Viewport: ${viewportWidth}, Has horizontal scroll: ${hasHorizontalScroll}`);
      
      // Check for elements that extend beyond viewport
      const allElements = page.locator('*').all();
      let overflowElements = 0;
      
      // Check first 50 elements to avoid timeout
      const elements = await page.locator('div, section, header, main, footer').all();
      
      for (let i = 0; i < Math.min(elements.length, 20); i++) {
        const element = elements[i];
        const boundingBox = await element.boundingBox();
        
        if (boundingBox && boundingBox.x + boundingBox.width > viewportWidth) {
          overflowElements++;
          const tagName = await element.evaluate(el => el.tagName);
          const className = await element.getAttribute('class');
          console.log(`${deviceName}: Overflow element: ${tagName}, class: ${className}, extends to: ${boundingBox.x + boundingBox.width}px`);
        }
      }
      
      console.log(`${deviceName}: Found ${overflowElements} elements extending beyond viewport`);
      
      // Take screenshot for layout review
      await page.screenshot({ 
        path: `screenshots/mobile-${deviceName.replace(/\s+/g, '-')}-layout-check.png`,
        fullPage: true 
      });
    });

    test('should test touch interactions and scrolling', async ({ page }) => {
      // Test smooth scrolling to different sections
      const sections = ['#about', '#services', '#reviews', '#contact'];
      
      for (const section of sections) {
        const sectionElement = page.locator(section).first();
        
        if (await sectionElement.isVisible()) {
          await sectionElement.scrollIntoViewIfNeeded();
          await page.waitForTimeout(300);
          
          // Take screenshot of section
          const sectionName = section.replace('#', '');
          await sectionElement.screenshot({ 
            path: `screenshots/mobile-${deviceName.replace(/\s+/g, '-')}-${sectionName}-section.png` 
          });
        }
      }
      
      // Test scroll to top
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);
    });
  });
});

// Summary test to compare all devices
test('Mobile Responsiveness Summary', async ({ page }) => {
  console.log('\n=== MOBILE RESPONSIVENESS TEST SUMMARY ===');
  console.log('Tested viewports:');
  Object.entries(mobileViewports).forEach(([name, size]) => {
    console.log(`- ${name}: ${size.width}x${size.height}px`);
  });
  console.log('\nScreenshots saved in screenshots/ directory');
  console.log('Check console output above for detailed findings');
});