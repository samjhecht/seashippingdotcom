import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Site-wide accessibility tests using axe-core
 * Tests all major pages for WCAG 2.1 AA compliance
 */

const pages = [
  { path: '/', name: 'Homepage' },
  { path: '/services', name: 'Services Listing' },
  { path: '/services/ocean-freight', name: 'Ocean Freight Service Detail' },
];

test.describe('Site-wide Accessibility @a11y', () => {
  test.describe('Desktop Viewport', () => {
    pages.forEach(({ path, name }) => {
      test(`${name} (${path}) has no accessibility violations`, async ({
        page,
      }) => {
        await page.goto(path);

        // Wait for page to fully load
        await page.waitForLoadState('networkidle');

        const accessibilityScanResults = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
      });

      test(`${name} (${path}) has no critical violations`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        const accessibilityScanResults = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();

        const criticalViolations = accessibilityScanResults.violations.filter(
          (violation) => violation.impact === 'critical' || violation.impact === 'serious'
        );

        expect(criticalViolations).toEqual([]);
      });
    });
  });

  test.describe('Mobile Viewport', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    pages.forEach(({ path, name }) => {
      test(`${name} mobile (${path}) has no accessibility violations`, async ({
        page,
      }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        const accessibilityScanResults = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
      });
    });
  });

  test.describe('Tablet Viewport', () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    pages.forEach(({ path, name }) => {
      test(`${name} tablet (${path}) has no accessibility violations`, async ({
        page,
      }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        const accessibilityScanResults = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
      });
    });
  });

  test.describe('Color Contrast', () => {
    pages.forEach(({ path, name }) => {
      test(`${name} (${path}) has sufficient color contrast`, async ({
        page,
      }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        const accessibilityScanResults = await new AxeBuilder({ page })
          .withRules(['color-contrast'])
          .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
      });
    });
  });

  test.describe('Keyboard Accessibility', () => {
    pages.forEach(({ path, name }) => {
      test(`${name} (${path}) has keyboard-accessible interactive elements`, async ({
        page,
      }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        const accessibilityScanResults = await new AxeBuilder({ page })
          .withRules(['button-name', 'link-name', 'input-button-name'])
          .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
      });
    });
  });

  test.describe('Form Accessibility', () => {
    test('Contact form has proper labels and ARIA attributes', async ({
      page,
    }) => {
      await page.goto('/request');
      await page.waitForLoadState('networkidle');

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withRules([
          'label',
          'aria-required-attr',
          'aria-valid-attr-value',
          'aria-allowed-attr',
        ])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });

  test.describe('Semantic HTML', () => {
    pages.forEach(({ path, name }) => {
      test(`${name} (${path}) has proper landmark regions`, async ({
        page,
      }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        const accessibilityScanResults = await new AxeBuilder({ page })
          .withRules(['landmark-one-main', 'region'])
          .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
      });

      test(`${name} (${path}) has proper heading hierarchy`, async ({
        page,
      }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        const accessibilityScanResults = await new AxeBuilder({ page })
          .withRules(['heading-order'])
          .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
      });
    });
  });

  test.describe('ARIA Attributes', () => {
    pages.forEach(({ path, name }) => {
      test(`${name} (${path}) has valid ARIA attributes`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        const accessibilityScanResults = await new AxeBuilder({ page })
          .withRules([
            'aria-allowed-attr',
            'aria-allowed-role',
            'aria-hidden-focus',
            'aria-required-attr',
            'aria-required-children',
            'aria-required-parent',
            'aria-valid-attr-value',
            'aria-valid-attr',
          ])
          .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
      });
    });
  });

  test.describe('Images', () => {
    pages.forEach(({ path, name }) => {
      test(`${name} (${path}) has alt text for all images`, async ({
        page,
      }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        const accessibilityScanResults = await new AxeBuilder({ page })
          .withRules(['image-alt'])
          .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
      });
    });
  });

  test.describe('Focus Management', () => {
    pages.forEach(({ path, name }) => {
      test(`${name} (${path}) has visible focus indicators`, async ({
        page,
      }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        const accessibilityScanResults = await new AxeBuilder({ page })
          .withRules(['focus-order-semantics'])
          .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
      });
    });
  });
});
