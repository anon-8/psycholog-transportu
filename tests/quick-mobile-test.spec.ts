import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'iPhone-SE', width: 375, height: 667 },
  { name: 'iPhone-12', width: 390, height: 844 },
  { name: 'Android', width: 360, height: 640 }
];

test.describe('Quick Mobile Responsiveness Check', () => {
  
  for (const viewport of viewports) {
    test(`Mobile test for ${viewport.name} (${viewport.width}px)`, async ({ page }) => {
      
      // Set mobile viewport
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      
      console.log(`\n=== Testing ${viewport.name} (${viewport.width}x${viewport.height}) ===`);
      
      // Navigate to site
      await page.goto('http://localhost:3002');
      await page.waitForLoadState('domcontentloaded');
      
      // Take full page screenshot
      await page.screenshot({ 
        path: `screenshots/quick-${viewport.name}-full.png`,
        fullPage: true 
      });
      console.log(`✓ Full page screenshot saved`);
      
      // Check page basics
      const title = await page.title();
      console.log(`✓ Page title: "${title}"`);
      
      // Test navigation/header
      const header = page.locator('header, nav').first();
      if (await header.isVisible()) {
        await header.screenshot({ path: `screenshots/quick-${viewport.name}-header.png` });
        console.log(`✓ Header captured`);
      }
      
      // Check for mobile menu button
      const menuButtons = await page.locator('button:has-text("☰"), button:has-text("Menu"), [data-testid="mobile-menu"]').all();
      if (menuButtons.length > 0) {
        console.log(`✓ Found ${menuButtons.length} potential mobile menu button(s)`);
        const firstButton = menuButtons[0];
        const buttonBox = await firstButton.boundingBox();
        if (buttonBox) {
          console.log(`  - Button size: ${buttonBox.width}x${buttonBox.height}px`);
          // Test clicking the menu
          await firstButton.click();
          await page.waitForTimeout(500);
          await page.screenshot({ path: `screenshots/quick-${viewport.name}-menu-open.png` });
          console.log(`✓ Menu opened screenshot taken`);
        }
      } else {
        console.log(`⚠ No mobile menu button found`);
      }
      
      // Check Services section
      const servicesSection = page.locator('#services, section:has(h2:has-text("Usługi"))').first();
      if (await servicesSection.isVisible()) {
        await servicesSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        await servicesSection.screenshot({ path: `screenshots/quick-${viewport.name}-services.png` });
        console.log(`✓ Services section captured`);
        
        // Look for service cards
        const serviceCards = await page.locator('[class*="service"], .service-card, div:has-text("Badania Psychologiczne"), div:has-text("Konsultacje")').all();
        console.log(`✓ Found ${serviceCards.length} service elements`);
      }
      
      // Check About section and portrait
      const aboutSection = page.locator('#about, section:has(h2:has-text("O mnie"))').first();
      if (await aboutSection.isVisible()) {
        await aboutSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        await aboutSection.screenshot({ path: `screenshots/quick-${viewport.name}-about.png` });
        console.log(`✓ About section captured`);
        
        // Check for portrait images
        const images = await page.locator('img').all();
        let portraitFound = false;
        for (const img of images) {
          const src = await img.getAttribute('src');
          const alt = await img.getAttribute('alt');
          if (src?.includes('portrait') || alt?.toLowerCase().includes('portrait') || alt?.toLowerCase().includes('psycholog')) {
            portraitFound = true;
            const imgBox = await img.boundingBox();
            if (imgBox) {
              console.log(`✓ Portrait image found: ${imgBox.width}x${imgBox.height}px`);
            }
            break;
          }
        }
        if (!portraitFound) {
          console.log(`⚠ No portrait image clearly identified`);
        }
      }
      
      // Check CTA buttons
      const ctaButtons = await page.locator('button:has-text("Umów"), button:has-text("Kontakt"), a:has-text("Umów"), a:has-text("Kontakt")').all();
      console.log(`✓ Found ${ctaButtons.length} CTA buttons`);
      
      for (let i = 0; i < Math.min(ctaButtons.length, 3); i++) {
        const button = ctaButtons[i];
        const buttonBox = await button.boundingBox();
        const buttonText = await button.textContent();
        
        if (buttonBox) {
          const isTouchFriendly = buttonBox.height >= 44 && buttonBox.width >= 44;
          console.log(`  - "${buttonText?.trim()}": ${buttonBox.width}x${buttonBox.height}px ${isTouchFriendly ? '✓ Touch-friendly' : '⚠ Too small'}`);
        }
      }
      
      // Check for horizontal overflow
      const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const hasHorizontalScroll = bodyScrollWidth > viewport.width;
      console.log(`✓ Layout check: ${hasHorizontalScroll ? '⚠ Has horizontal scroll' : '✓ No horizontal overflow'} (${bodyScrollWidth}px content in ${viewport.width}px viewport)`);
      
      // Test contact section
      const contactSection = page.locator('#contact, section:has(h2:has-text("Kontakt"))').first();
      if (await contactSection.isVisible()) {
        await contactSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        await contactSection.screenshot({ path: `screenshots/quick-${viewport.name}-contact.png` });
        console.log(`✓ Contact section captured`);
      }
      
      console.log(`=== ${viewport.name} testing completed ===\n`);
    });
  }
});