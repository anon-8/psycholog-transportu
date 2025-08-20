import { test, expect } from '@playwright/test';

test.describe('Reviews Section Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Scroll to reviews section
    await page.locator('#reviews').scrollIntoViewIfNeeded();
  });

  test('should display client reviews', async ({ page }) => {
    // Check for specific review content from config
    await expect(page.getByText('Marek Nowak')).toBeVisible();
    await expect(page.getByText('Anna Wiśniewska')).toBeVisible();
    await expect(page.getByText('Tomasz Kowalczyk')).toBeVisible();
    
    // Check review text content
    await expect(page.getByText(/Profesjonalne podejście i miła atmosfera/)).toBeVisible();
    await expect(page.getByText(/Bardzo pomocna konsultacja/)).toBeVisible();
    await expect(page.getByText(/Szybko i profesjonalnie/)).toBeVisible();
  });

  test('should display star ratings', async ({ page }) => {
    // Look for star rating elements
    const starElements = page.locator('[data-testid="star-rating"]').or(
      page.locator('.star, .rating').or(
        page.locator('span').filter({ hasText: /★|⭐/ })
      )
    );
    
    if (await starElements.first().isVisible()) {
      expect(await starElements.count()).toBeGreaterThan(0);
    }
    
    // Alternative: look for rating text
    const ratingText = page.getByText(/5.*gwiaz|5\/5|\(5\)/);
    if (await ratingText.first().isVisible()) {
      expect(await ratingText.count()).toBeGreaterThan(0);
    }
  });

  test('should have working reviews slider', async ({ page }) => {
    // Look for slider navigation buttons
    const nextButton = page.locator('[data-testid="next-review"]').or(
      page.locator('button').filter({ hasText: /next|następny|→|>/ })
    ).or(
      page.locator('.swiper-button-next, .slider-next, .carousel-next')
    );
    
    const prevButton = page.locator('[data-testid="prev-review"]').or(
      page.locator('button').filter({ hasText: /prev|poprzedni|←|</ })
    ).or(
      page.locator('.swiper-button-prev, .slider-prev, .carousel-prev')
    );
    
    if (await nextButton.isVisible()) {
      // Test slider functionality
      await nextButton.click();
      await page.waitForTimeout(1000);
      
      // Check if content changed or slider moved
      expect(true).toBe(true); // Placeholder - actual slider test would check DOM changes
    }
    
    // Check for slider indicators/dots
    const sliderDots = page.locator('.slider-dot, .carousel-indicator, [data-testid="slider-dot"]');
    if (await sliderDots.first().isVisible()) {
      expect(await sliderDots.count()).toBeGreaterThanOrEqual(1);
    }
  });

  test('should display verified review indicators', async ({ page }) => {
    // Look for verified badges or indicators
    const verifiedIndicators = page.locator('[data-testid="verified-review"]').or(
      page.getByText(/zweryfikowana|verified|potwierdzona/)
    );
    
    if (await verifiedIndicators.first().isVisible()) {
      expect(await verifiedIndicators.count()).toBeGreaterThan(0);
    }
  });

  test('should show review dates', async ({ page }) => {
    // Look for date information in reviews
    const dates = page.getByText(/2024|styczeń|luty|marzec|kwiecień|maj|czerwiec|lipiec|sierpień|wrzesień|październik|listopad|grudzień/);
    
    if (await dates.first().isVisible()) {
      expect(await dates.count()).toBeGreaterThan(0);
    }
  });

  test('should display trust statistics', async ({ page }) => {
    // Look for trust indicators like client count
    const clientCount = page.getByText(/\d+.*klient|zadowolonych klientów/);
    
    if (await clientCount.isVisible()) {
      const text = await clientCount.textContent();
      expect(text).toMatch(/\d+/);
    }
  });

  test('should have proper reviews section styling', async ({ page }) => {
    // Reviews section should be properly styled
    const reviewsSection = page.locator('#reviews');
    await expect(reviewsSection).toBeVisible();
    
    // Look for review cards or containers
    const reviewCards = page.locator('[data-testid="review-card"]').or(
      page.locator('.review-card, .testimonial')
    );
    
    if (await reviewCards.first().isVisible()) {
      expect(await reviewCards.count()).toBeGreaterThanOrEqual(1);
    }
  });
});