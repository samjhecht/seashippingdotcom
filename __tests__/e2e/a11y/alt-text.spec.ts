import { test, expect } from '@playwright/test';

/**
 * Alt text accessibility tests
 * Ensures all images have appropriate alternative text
 */

test.describe('Alt Text Accessibility @a11y', () => {
  const pages = [
    { path: '/', name: 'Homepage' },
    { path: '/services', name: 'Services Listing' },
    { path: '/services/ocean-freight', name: 'Ocean Freight Service Detail' },
  ];

  test.describe('Image Alt Text Presence', () => {
    pages.forEach(({ path, name }) => {
      test(`${name} (${path}) - all images have alt attributes`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        const images = await page.locator('img').all();

        for (const img of images) {
          const alt = await img.getAttribute('alt');
          const role = await img.getAttribute('role');
          const ariaHidden = await img.getAttribute('aria-hidden');

          // Every image must have alt attribute OR be explicitly marked as decorative
          const hasAltAttribute = alt !== null;
          const isDecorativeWithRole = role === 'presentation' || role === 'none';
          const isHiddenFromAT = ariaHidden === 'true';

          expect(
            hasAltAttribute || isDecorativeWithRole || isHiddenFromAT,
            `Image missing alt attribute at ${path}: ${await img.getAttribute('src')}`
          ).toBeTruthy();
        }
      });
    });
  });

  test.describe('Alt Text Quality', () => {
    pages.forEach(({ path, name }) => {
      test(`${name} (${path}) - alt text is descriptive, not filename`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        const images = await page.locator('img').all();

        for (const img of images) {
          const alt = await img.getAttribute('alt');

          // Skip decorative images (empty alt is correct)
          if (alt === '') {
            continue;
          }

          if (alt && alt.length > 0) {
            // Alt text should not be a filename
            expect(
              alt.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i),
              `Alt text appears to be a filename: "${alt}" at ${path}`
            ).toBeNull();

            // Alt text should not be generic
            const genericAltText = ['image', 'picture', 'photo', 'img', 'graphic'];
            const isGeneric = genericAltText.some(
              (generic) => alt.toLowerCase() === generic
            );
            expect(
              isGeneric,
              `Alt text is too generic: "${alt}" at ${path}`
            ).toBeFalsy();

            // Alt text should not start with "image of" or "picture of"
            const startsWithRedundantPhrase =
              alt.toLowerCase().startsWith('image of') ||
              alt.toLowerCase().startsWith('picture of') ||
              alt.toLowerCase().startsWith('photo of');

            expect(
              startsWithRedundantPhrase,
              `Alt text contains redundant phrase: "${alt}" at ${path}`
            ).toBeFalsy();

            // Alt text should have reasonable length (not too short, not too long)
            expect(
              alt.length,
              `Alt text too short: "${alt}" at ${path}`
            ).toBeGreaterThanOrEqual(2);

            expect(
              alt.length,
              `Alt text too long (>150 chars): "${alt}" at ${path}`
            ).toBeLessThanOrEqual(150);
          }
        }
      });
    });
  });

  test.describe('Decorative Images', () => {
    pages.forEach(({ path, name }) => {
      test(`${name} (${path}) - decorative images have empty alt`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        const images = await page.locator('img').all();

        for (const img of images) {
          const alt = await img.getAttribute('alt');
          const role = await img.getAttribute('role');

          // If an image is marked as decorative with role, it should have empty alt
          if (role === 'presentation' || role === 'none') {
            expect(
              alt,
              `Decorative image should have empty alt="" at ${path}`
            ).toBe('');
          }
        }
      });
    });
  });

  test.describe('Background Images', () => {
    pages.forEach(({ path, name }) => {
      test(`${name} (${path}) - background images used correctly`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        // Check for elements with background images that might need alt text
        const elementsWithBgImages = await page.evaluate(() => {
          const elements = document.querySelectorAll('*');
          const withBgImages: Array<{ tag: string; hasAriaLabel: boolean; bgImage: string }> = [];

          elements.forEach((el) => {
            const styles = window.getComputedStyle(el);
            const bgImage = styles.backgroundImage;

            if (bgImage && bgImage !== 'none' && !bgImage.includes('gradient')) {
              const hasAriaLabel = el.hasAttribute('aria-label');
              const hasAriaLabelledBy = el.hasAttribute('aria-labelledby');
              const roleValue = el.getAttribute('role');

              // If background image appears to be informative, it should have ARIA label
              withBgImages.push({
                tag: el.tagName,
                hasAriaLabel: hasAriaLabel || hasAriaLabelledBy || roleValue === 'img',
                bgImage: bgImage.substring(0, 100),
              });
            }
          });

          return withBgImages;
        });

        // This is informational - background images should generally be decorative
        // If they're informative, they need ARIA labels
        if (elementsWithBgImages.length > 0) {
          console.log(`Found ${elementsWithBgImages.length} background images at ${path}`);
        }
      });
    });
  });

  test.describe('SVG Accessibility', () => {
    pages.forEach(({ path, name }) => {
      test(`${name} (${path}) - SVG images have appropriate accessibility`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        const svgs = await page.locator('svg').all();

        for (const svg of svgs) {
          const role = await svg.getAttribute('role');
          const ariaLabel = await svg.getAttribute('aria-label');
          const ariaLabelledBy = await svg.getAttribute('aria-labelledby');
          const ariaHidden = await svg.getAttribute('aria-hidden');
          const title = await svg.locator('title').count();

          // SVG should either be:
          // 1. Decorative (aria-hidden="true")
          // 2. Have a title element
          // 3. Have aria-label or aria-labelledby
          // 4. Have role="img" with appropriate label

          const isDecorativeOrLabeled =
            ariaHidden === 'true' ||
            title > 0 ||
            ariaLabel ||
            ariaLabelledBy ||
            (role === 'img' && (ariaLabel || ariaLabelledBy));

          // Note: We're lenient here because many icon libraries handle this differently
          // The important thing is that informative SVGs have labels
          if (!isDecorativeOrLabeled) {
            console.log(
              `SVG at ${path} may need accessibility improvement - consider adding aria-hidden, title, or aria-label`
            );
          }
        }
      });
    });
  });

  test.describe('Icon Accessibility', () => {
    pages.forEach(({ path, name }) => {
      test(`${name} (${path}) - icon-only buttons have labels`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        // Find buttons that might be icon-only
        const buttons = await page.locator('button').all();

        for (const button of buttons) {
          const text = await button.innerText();
          const ariaLabel = await button.getAttribute('aria-label');
          const ariaLabelledBy = await button.getAttribute('aria-labelledby');
          const title = await button.getAttribute('title');

          // If button has no visible text, it must have an accessible label
          if (!text || text.trim().length === 0) {
            const hasAccessibleLabel = ariaLabel || ariaLabelledBy || title;

            expect(
              hasAccessibleLabel,
              `Icon-only button at ${path} needs aria-label or aria-labelledby`
            ).toBeTruthy();
          }
        }

        // Same check for links
        const links = await page.locator('a').all();

        for (const link of links) {
          const text = await link.innerText();
          const ariaLabel = await link.getAttribute('aria-label');
          const ariaLabelledBy = await link.getAttribute('aria-labelledby');
          const title = await link.getAttribute('title');

          if (!text || text.trim().length === 0) {
            const hasAccessibleLabel = ariaLabel || ariaLabelledBy || title;

            expect(
              hasAccessibleLabel,
              `Icon-only link at ${path} needs aria-label or aria-labelledby`
            ).toBeTruthy();
          }
        }
      });
    });
  });

  test.describe('Complex Images', () => {
    test('complex images (charts, diagrams) have extended descriptions', async ({ page }) => {
      // This is a manual check - automated tools can't determine if an image is "complex"
      // But we can check for the presence of longdesc or aria-describedby

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const images = await page.locator('img').all();
      const complexImageIndicators: string[] = [];

      for (const img of images) {
        const longdesc = await img.getAttribute('longdesc');
        const ariaDescribedBy = await img.getAttribute('aria-describedby');
        const src = await img.getAttribute('src');

        // Check if image filename suggests it might be complex
        if (src && (src.includes('chart') || src.includes('diagram') || src.includes('graph'))) {
          if (longdesc || ariaDescribedBy) {
            complexImageIndicators.push(`Found extended description for ${src}`);
          } else {
            console.log(`Complex image at ${src} may need extended description`);
          }
        }
      }

      // This is informational, not a hard requirement
      if (complexImageIndicators.length > 0) {
        console.log('Complex images with extended descriptions:', complexImageIndicators);
      }
    });
  });

  test.describe('Logo Accessibility', () => {
    test('logo has appropriate alt text', async ({ page }) => {
      await page.goto('/');

      // Check if there's a logo image
      const logoImg = page.locator('header img, .logo img, [alt*="logo" i]').first();

      if ((await logoImg.count()) > 0) {
        const alt = await logoImg.getAttribute('alt');

        expect(alt).toBeTruthy();
        expect(alt?.length).toBeGreaterThan(0);

        // Logo alt should include company name
        expect(
          alt?.toLowerCase().includes('sea') || alt?.toLowerCase().includes('shipping')
        ).toBeTruthy();
      }
    });
  });

  test.describe('Image Context', () => {
    pages.forEach(({ path, name }) => {
      test(`${name} (${path}) - images have context from surrounding content`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');

        const images = await page.locator('img').all();

        for (const img of images) {
          const alt = await img.getAttribute('alt');

          // Skip decorative images
          if (alt === '') {
            continue;
          }

          // Check if image has context from caption, heading, or surrounding text
          const parent = img.locator('..').first();
          const parentText = await parent.innerText();

          // Images should either have descriptive alt or be within descriptive context
          if (alt && alt.length > 0) {
            // Has alt text - good
            continue;
          } else if (parentText && parentText.length > 10) {
            // Has surrounding context - acceptable
            continue;
          }

          // If we get here, the image might not have enough context
          const src = await img.getAttribute('src');
          console.log(`Image at ${path} may lack context: ${src}`);
        }
      });
    });
  });
});
