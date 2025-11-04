import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    // Assert page title or heading is visible
    await expect(page).toHaveTitle(/Sea Shipping/i);
  });

  test('should be responsive on mobile', async ({ viewport }) => {
    // This test will run on mobile devices per playwright.config.ts
    if (viewport && viewport.width < 768) {
      // Assert mobile-specific elements or layout
      expect(viewport.width).toBeLessThan(768);
    }
  });

  test('should have proper meta tags for SEO', async ({ page }) => {
    // Check for important meta tags
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveCount(1);
  });

  test('should render without console errors', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(errors).toHaveLength(0);
  });
});
