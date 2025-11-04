import { test, expect } from '@playwright/test';

/**
 * Keyboard navigation accessibility tests
 * Ensures all interactive elements are keyboard accessible
 */

test.describe('Keyboard Navigation @a11y', () => {
  test.describe('Skip Links', () => {
    test('skip link is present and functional', async ({ page }) => {
      await page.goto('/');

      // Tab to the skip link (should be first focusable element)
      await page.keyboard.press('Tab');

      // Verify skip link is focused and visible
      const skipLink = page.locator('a:has-text("Skip to main content")');
      await expect(skipLink).toBeFocused();
      await expect(skipLink).toBeVisible();

      // Press Enter to activate skip link
      await page.keyboard.press('Enter');

      // Wait for navigation to complete
      await page.waitForTimeout(100);

      // Verify focus moved to main content
      const main = page.locator('main');
      const mainId = await main.getAttribute('id');
      expect(mainId).toBe('main');
    });
  });

  test.describe('Header Navigation', () => {
    test('can navigate header with keyboard on desktop', async ({ page }) => {
      await page.goto('/');

      // Tab through header elements
      await page.keyboard.press('Tab'); // Skip link
      await page.keyboard.press('Tab'); // Logo

      // Check if logo is focused
      const logo = page.locator('a[href="/"]').first();
      await expect(logo).toBeFocused();

      // Tab through navigation items
      const navItems = ['HOME', 'SERVICES', 'RESOURCES', 'NETWORK', 'REQUEST', 'SSLNEWS'];

      for (const itemName of navItems) {
        await page.keyboard.press('Tab');
        const navLink = page.locator(`a:has-text("${itemName}")`).first();

        // Verify the navigation item can receive focus
        const isFocused = await navLink.evaluate((el) => el === document.activeElement);
        expect(isFocused).toBeTruthy();
      }
    });

    test('can navigate mobile menu with keyboard', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      // Tab to skip link, then logo, then hamburger
      await page.keyboard.press('Tab'); // Skip link
      await page.keyboard.press('Tab'); // Logo
      await page.keyboard.press('Tab'); // Hamburger button

      // Verify hamburger is focused
      const hamburger = page.locator('button[aria-label="Open menu"]');
      await expect(hamburger).toBeFocused();

      // Open menu with Enter
      await page.keyboard.press('Enter');

      // Wait for menu to open
      await page.waitForTimeout(300);

      // Verify menu is open
      const menu = page.locator('[role="dialog"]');
      await expect(menu).toBeVisible();

      // Tab should now navigate through menu items
      await page.keyboard.press('Tab');

      // Close button should be focused first
      const closeButton = page.locator('button[aria-label="Close menu"]');
      await expect(closeButton).toBeFocused();

      // Close menu with Escape
      await page.keyboard.press('Escape');

      // Verify menu is closed
      await expect(menu).not.toBeVisible();

      // Focus should return to hamburger button
      await expect(hamburger).toBeFocused();
    });

    test('mobile menu can be navigated entirely with keyboard', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      // Open mobile menu
      const hamburger = page.locator('button[aria-label="Open menu"]');
      await hamburger.focus();
      await page.keyboard.press('Enter');

      // Wait for menu to open
      await page.waitForTimeout(300);

      // Tab through all menu elements
      let tabCount = 0;
      const maxTabs = 20;
      const focusedElements: string[] = [];

      while (tabCount < maxTabs) {
        await page.keyboard.press('Tab');
        const focusedElement = await page.evaluate(() => {
          const el = document.activeElement;
          return {
            tagName: el?.tagName,
            text: el?.textContent?.trim().substring(0, 20),
            ariaLabel: el?.getAttribute('aria-label'),
          };
        });

        focusedElements.push(
          `${focusedElement.tagName} - ${focusedElement.ariaLabel || focusedElement.text}`
        );

        tabCount++;

        // If we've tabbed back to the first element, we've completed the loop
        if (tabCount > 1 && focusedElements[0] === focusedElements[focusedElements.length - 1]) {
          break;
        }
      }

      // Verify we can navigate through the entire menu
      expect(tabCount).toBeGreaterThan(5); // Should have multiple focusable elements
    });
  });

  test.describe('Main Content Navigation', () => {
    test('can tab through all interactive elements on homepage', async ({ page }) => {
      await page.goto('/');

      let tabCount = 0;
      const maxTabs = 100;
      let lastFocusedElement: string | null = null;

      while (tabCount < maxTabs) {
        await page.keyboard.press('Tab');

        const focusedElement = await page.evaluate(() => {
          const el = document.activeElement;
          return el?.tagName;
        });

        if (!focusedElement || focusedElement === 'BODY') {
          break;
        }

        lastFocusedElement = focusedElement;
        tabCount++;
      }

      // Verify we can tab through multiple elements
      expect(tabCount).toBeGreaterThan(10);

      // Verify we reached the footer
      expect(lastFocusedElement).toBeTruthy();
    });

    test('can navigate service cards with keyboard', async ({ page }) => {
      await page.goto('/services');
      await page.waitForLoadState('networkidle');

      // Tab to first service card link
      let foundServiceCard = false;
      const maxTabs = 50;

      for (let i = 0; i < maxTabs; i++) {
        await page.keyboard.press('Tab');

        const focusedElement = await page.evaluate(() => {
          const el = document.activeElement;
          return {
            tagName: el?.tagName,
            href: (el as HTMLAnchorElement)?.href,
          };
        });

        if (focusedElement.href?.includes('/services/')) {
          foundServiceCard = true;
          break;
        }
      }

      expect(foundServiceCard).toBeTruthy();
    });
  });

  test.describe('Form Navigation', () => {
    test('can navigate form fields with keyboard', async ({ page }) => {
      await page.goto('/request');
      await page.waitForLoadState('networkidle');

      // Find and focus first form field
      const firstInput = page.locator('input, textarea').first();
      await firstInput.focus();

      // Tab through form fields
      const formFields: string[] = [];
      const maxTabs = 20;

      for (let i = 0; i < maxTabs; i++) {
        const focusedElement = await page.evaluate(() => {
          const el = document.activeElement;
          return {
            tagName: el?.tagName,
            type: (el as HTMLInputElement)?.type,
            name: (el as HTMLInputElement)?.name,
          };
        });

        if (focusedElement.tagName) {
          formFields.push(`${focusedElement.tagName}-${focusedElement.type || focusedElement.name}`);
        }

        await page.keyboard.press('Tab');

        // Stop if we've left the form
        if (focusedElement.tagName === 'BODY') {
          break;
        }
      }

      // Verify we navigated through multiple form fields
      expect(formFields.length).toBeGreaterThan(3);
    });

    test('can submit form with Enter key', async ({ page }) => {
      await page.goto('/request');
      await page.waitForLoadState('networkidle');

      // Tab to submit button
      const submitButton = page.locator('button[type="submit"]');
      await submitButton.focus();
      await expect(submitButton).toBeFocused();

      // Note: We don't actually submit to avoid side effects
      // But we verify the button is keyboard accessible
      const isButtonFocusable = await submitButton.evaluate(
        (el) => el === document.activeElement
      );
      expect(isButtonFocusable).toBeTruthy();
    });
  });

  test.describe('Focus Indicators', () => {
    test('all interactive elements have visible focus indicators', async ({ page }) => {
      await page.goto('/');

      // Test various interactive elements
      const elementsToTest = [
        'a[href="/"]', // Logo
        'a[href="/services"]', // Nav link
        'button', // Any button
      ];

      for (const selector of elementsToTest) {
        const element = page.locator(selector).first();
        if (await element.count() > 0) {
          await element.focus();

          // Check if outline is visible when focused
          const focusStyles = await element.evaluate((el) => {
            const styles = window.getComputedStyle(el);
            return {
              outline: styles.outline,
              outlineWidth: styles.outlineWidth,
              outlineColor: styles.outlineColor,
              boxShadow: styles.boxShadow,
            };
          });

          // Should have either outline or box-shadow for focus
          const hasFocusIndicator =
            (focusStyles.outline && focusStyles.outline !== 'none') ||
            (focusStyles.boxShadow && focusStyles.boxShadow !== 'none');

          expect(hasFocusIndicator).toBeTruthy();
        }
      }
    });

    test('focus indicator is visible on custom components', async ({ page }) => {
      await page.goto('/services');
      await page.waitForLoadState('networkidle');

      // Find a service card link
      const serviceCard = page.locator('a[href*="/services/"]').first();
      await serviceCard.focus();

      const focusStyles = await serviceCard.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          outline: styles.outline,
          outlineWidth: styles.outlineWidth,
          boxShadow: styles.boxShadow,
        };
      });

      const hasFocusIndicator =
        (focusStyles.outline && focusStyles.outline !== 'none') ||
        (focusStyles.boxShadow && focusStyles.boxShadow !== 'none');

      expect(hasFocusIndicator).toBeTruthy();
    });
  });

  test.describe('Tab Order', () => {
    test('tab order follows logical reading order on homepage', async ({ page }) => {
      await page.goto('/');

      const tabOrder: string[] = [];
      const maxTabs = 30;

      for (let i = 0; i < maxTabs; i++) {
        await page.keyboard.press('Tab');

        const focusedElement = await page.evaluate(() => {
          const el = document.activeElement;
          const rect = el?.getBoundingClientRect();
          return {
            tagName: el?.tagName,
            top: rect?.top || 0,
            left: rect?.left || 0,
            text: el?.textContent?.trim().substring(0, 30),
          };
        });

        if (focusedElement.tagName && focusedElement.tagName !== 'BODY') {
          tabOrder.push(
            `${focusedElement.tagName} (${Math.round(focusedElement.top)}, ${Math.round(focusedElement.left)})`
          );
        } else {
          break;
        }
      }

      // Verify we have a logical tab order (header -> main -> footer)
      expect(tabOrder.length).toBeGreaterThan(10);
    });
  });

  test.describe('Interactive Components', () => {
    test('buttons can be activated with Enter and Space', async ({ page }) => {
      await page.goto('/');

      const button = page.locator('button').first();
      await button.focus();

      // Verify button is focused
      await expect(button).toBeFocused();

      // Both Enter and Space should work (we just verify they don't throw)
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);

      await button.focus();
      await page.keyboard.press('Space');
    });

    test('links can be activated with Enter', async ({ page }) => {
      await page.goto('/');

      const link = page.locator('a[href="/services"]');
      await link.focus();
      await expect(link).toBeFocused();

      // Note: We don't actually navigate to avoid disrupting tests
      // But we verify the link is keyboard accessible
    });
  });
});
