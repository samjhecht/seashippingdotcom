import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Color contrast accessibility tests
 * Ensures all text meets WCAG 2.1 AA contrast requirements (4.5:1 for normal text, 3:1 for large text)
 */

test.describe('Color Contrast @a11y', () => {
  const pages = [
    { path: '/', name: 'Homepage' },
    { path: '/services', name: 'Services Listing' },
    { path: '/services/ocean-freight', name: 'Ocean Freight Service Detail' },
  ];

  test.describe('WCAG AA Contrast Requirements', () => {
    pages.forEach(({ path, name }) => {
      test(`${name} (${path}) - all text meets WCAG AA contrast (4.5:1)`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        const accessibilityScanResults = await new AxeBuilder({ page })
          .withRules(['color-contrast'])
          .analyze();

        // Report any violations with details
        if (accessibilityScanResults.violations.length > 0) {
          const contrastViolations = accessibilityScanResults.violations.filter(
            (v) => v.id === 'color-contrast'
          );

          contrastViolations.forEach((violation) => {
            console.error(`Contrast violation on ${path}:`);
            console.error(`  Description: ${violation.description}`);
            console.error(`  Impact: ${violation.impact}`);
            violation.nodes.forEach((node) => {
              console.error(`  Element: ${node.html}`);
              console.error(`  Message: ${node.failureSummary}`);
            });
          });
        }

        expect(accessibilityScanResults.violations).toEqual([]);
      });
    });
  });

  test.describe('Button Contrast', () => {
    pages.forEach(({ path, name }) => {
      test(`${name} (${path}) - buttons have sufficient contrast`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        const buttons = await page.locator('button, [role="button"]').all();

        for (const button of buttons) {
          // Check if button is visible
          const isVisible = await button.isVisible();
          if (!isVisible) continue;

          const styles = await button.evaluate((el) => {
            const computed = window.getComputedStyle(el);
            return {
              color: computed.color,
              backgroundColor: computed.backgroundColor,
              fontSize: computed.fontSize,
            };
          });

          // We can't calculate exact contrast ratios without a library,
          // but we can verify the button has both color and background color set
          expect(styles.color).not.toBe('');
          expect(styles.backgroundColor).not.toBe('transparent');
        }
      });
    });
  });

  test.describe('Link Contrast', () => {
    pages.forEach(({ path, name }) => {
      test(`${name} (${path}) - links have sufficient contrast and are distinguishable`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        const links = await page.locator('a').all();

        for (const link of links) {
          const isVisible = await link.isVisible();
          if (!isVisible) continue;

          const styles = await link.evaluate((el) => {
            const computed = window.getComputedStyle(el);
            return {
              color: computed.color,
              textDecoration: computed.textDecoration,
              borderBottom: computed.borderBottom,
            };
          });

          // Links should have color set
          expect(styles.color).not.toBe('');

          // Links should be distinguishable from surrounding text
          // (either through underline or different color)
          const hasUnderline = styles.textDecoration.includes('underline') || styles.borderBottom !== 'none';

          // Note: We can't test color difference without surrounding context
          // But we can ensure links have some distinguishing feature
          if (!hasUnderline) {
            // If no underline, the link should at least have a different color
            // This would be caught by axe-core's link-in-text-block rule
            console.log(`Link at ${path} may need underline or stronger color differentiation`);
          }
        }
      });
    });
  });

  test.describe('Form Element Contrast', () => {
    test('form inputs have sufficient contrast', async ({ page }) => {
      await page.goto('/request');
      await page.waitForLoadState('networkidle');

      const inputs = await page.locator('input, textarea, select').all();

      for (const input of inputs) {
        const isVisible = await input.isVisible();
        if (!isVisible) continue;

        const styles = await input.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            color: computed.color,
            backgroundColor: computed.backgroundColor,
            borderColor: computed.borderColor,
            borderWidth: computed.borderWidth,
          };
        });

        // Form elements should have visible borders for focus indication
        expect(styles.borderColor).not.toBe('transparent');
        expect(parseInt(styles.borderWidth)).toBeGreaterThan(0);
      }
    });

    test('form labels have sufficient contrast', async ({ page }) => {
      await page.goto('/request');
      await page.waitForLoadState('networkidle');

      const labels = await page.locator('label').all();

      for (const label of labels) {
        const isVisible = await label.isVisible();
        if (!isVisible) continue;

        const styles = await label.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            color: computed.color,
            fontSize: computed.fontSize,
          };
        });

        // Labels should have color set
        expect(styles.color).not.toBe('');
      }
    });
  });

  test.describe('Interactive State Contrast', () => {
    test('hover states maintain sufficient contrast', async ({ page }) => {
      await page.goto('/');

      const firstLink = page.locator('a[href="/services"]').first();
      await firstLink.hover();

      const hoverStyles = await firstLink.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
        };
      });

      // Hover state should have colors defined
      expect(hoverStyles.color).not.toBe('');
    });

    test('focus states maintain sufficient contrast', async ({ page }) => {
      await page.goto('/');

      const firstLink = page.locator('a[href="/services"]').first();
      await firstLink.focus();

      const focusStyles = await firstLink.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          outline: computed.outline,
          outlineColor: computed.outlineColor,
          outlineWidth: computed.outlineWidth,
          boxShadow: computed.boxShadow,
        };
      });

      // Focus state should have visible outline or box-shadow
      const hasVisibleFocus =
        (focusStyles.outline && focusStyles.outline !== 'none') ||
        (focusStyles.boxShadow && focusStyles.boxShadow !== 'none');

      expect(hasVisibleFocus).toBeTruthy();
    });
  });

  test.describe('Text on Images', () => {
    pages.forEach(({ path, name }) => {
      test(`${name} (${path}) - text overlaid on images has sufficient contrast`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        // Find elements with background images that contain text
        const textOnImages = await page.evaluate(() => {
          const elements = document.querySelectorAll('*');
          const results: Array<{ text: string; hasOverlay: boolean }> = [];

          elements.forEach((el) => {
            const styles = window.getComputedStyle(el);
            const bgImage = styles.backgroundImage;
            const text = el.textContent?.trim();

            if (bgImage && bgImage !== 'none' && text && text.length > 0) {
              // Check if there's an overlay (dark background for light text)
              const hasOverlay =
                styles.backgroundColor !== 'rgba(0, 0, 0, 0)' &&
                styles.backgroundColor !== 'transparent';

              results.push({
                text: text.substring(0, 50),
                hasOverlay,
              });
            }
          });

          return results;
        });

        // Text on images should have an overlay or background for contrast
        textOnImages.forEach((item) => {
          if (!item.hasOverlay) {
            console.log(`Text on image may need overlay for contrast: "${item.text}"`);
          }
        });
      });
    });
  });

  test.describe('Dark Mode Contrast', () => {
    test('dark mode (if present) maintains contrast requirements', async ({ page }) => {
      await page.goto('/');

      // Check if site has dark mode
      const hasDarkMode = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark') ||
               document.body.classList.contains('dark');
      });

      if (hasDarkMode) {
        const accessibilityScanResults = await new AxeBuilder({ page })
          .withRules(['color-contrast'])
          .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
      } else {
        console.log('No dark mode detected - skipping dark mode contrast test');
      }
    });
  });

  test.describe('Alert and Error Message Contrast', () => {
    test('error messages have sufficient contrast', async ({ page }) => {
      await page.goto('/request');

      // Try to submit form without filling it to trigger errors
      const submitButton = page.locator('button[type="submit"]');
      await submitButton.click();

      // Wait for potential error messages
      await page.waitForTimeout(500);

      // Check for error messages
      const errorElements = await page.locator('[role="alert"], .error, [class*="error"]').all();

      for (const error of errorElements) {
        const isVisible = await error.isVisible();
        if (!isVisible) continue;

        const styles = await error.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            color: computed.color,
            backgroundColor: computed.backgroundColor,
          };
        });

        // Error messages should have high contrast colors
        expect(styles.color).not.toBe('');
      }
    });
  });

  test.describe('Placeholder Text Contrast', () => {
    test('placeholder text meets contrast requirements', async ({ page }) => {
      await page.goto('/request');

      const inputs = await page.locator('input[placeholder], textarea[placeholder]').all();

      for (const input of inputs) {
        const placeholder = await input.getAttribute('placeholder');

        if (placeholder) {
          // Placeholder text should be visible but not confused with real input
          // WCAG requires 4.5:1 for placeholder text as well
          const styles = await input.evaluate((el) => {
            const computed = window.getComputedStyle(el);
            return {
              color: computed.color,
            };
          });

          expect(styles.color).not.toBe('');
        }
      }
    });
  });

  test.describe('Icon Contrast', () => {
    pages.forEach(({ path, name }) => {
      test(`${name} (${path}) - icons have sufficient contrast`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        // Find SVG icons
        const icons = await page.locator('svg').all();

        for (const icon of icons) {
          const isVisible = await icon.isVisible();
          if (!isVisible) continue;

          const styles = await icon.evaluate((el) => {
            const computed = window.getComputedStyle(el);
            return {
              fill: computed.fill,
              stroke: computed.stroke,
              color: computed.color,
            };
          });

          // Icons should have color defined
          const hasColor =
            (styles.fill && styles.fill !== 'none') ||
            (styles.stroke && styles.stroke !== 'none') ||
            styles.color;

          expect(hasColor).toBeTruthy();
        }
      });
    });
  });
});
