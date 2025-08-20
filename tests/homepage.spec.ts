import { test, expect } from '@playwright/test';

test.describe('Transport Psychologist Website - Homepage', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Psycholog Transportu Przemyśl/);
    
    // Check if the main content is visible
    await expect(page.locator('main')).toBeVisible();
  });

  test('should display all main sections', async ({ page }) => {
    // Check header
    await expect(page.locator('header')).toBeVisible();
    
    // Check hero section 
    await expect(page.getByText('Profesjonalne badania psychologiczne dla kierowców')).toBeVisible();
    
    // Check about section
    await expect(page.getByText('Dr Anna Kowalska')).toBeVisible();
    
    // Check services section
    await expect(page.getByText('Badania Psychologiczne Kierowców')).toBeVisible();
    await expect(page.getByText('Konsultacje Psychologiczne')).toBeVisible();
    
    // Check reviews section
    await expect(page.getByText('Marek Nowak')).toBeVisible();
    
    // Check contact section
    await expect(page.getByText('ul. Słowackiego 15')).toBeVisible();
    
    // Check footer
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should have correct meta tags for SEO', async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle(/Psycholog Transportu Przemyśl/);
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /badania psychologiczne.*Przemyślu/);
    
    // Check language
    const htmlElement = page.locator('html');
    await expect(htmlElement).toHaveAttribute('lang', 'pl');
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    // Check H1 exists and is unique
    const h1Elements = page.locator('h1');
    await expect(h1Elements).toHaveCount(1);
    await expect(h1Elements).toContainText('Profesjonalne badania psychologiczne dla kierowców');
    
    // Check H2 elements exist
    const h2Elements = page.locator('h2');
    expect(await h2Elements.count()).toBeGreaterThan(0);
  });
});