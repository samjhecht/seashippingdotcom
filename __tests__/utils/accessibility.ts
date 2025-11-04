import type { Page } from '@playwright/test';
import { injectAxe, checkA11y, getViolations } from 'axe-playwright';

export async function runAccessibilityTests(page: Page, context?: string) {
  await injectAxe(page);

  try {
    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  } catch (error) {
    const violations = await getViolations(page);
    const contextMsg = context ? ` in ${context}` : '';
    throw new Error(
      `Accessibility violations found${contextMsg}:\n${JSON.stringify(violations, null, 2)}`
    );
  }
}

export const a11yConfig = {
  rules: {
    // Customize rules as needed
    'color-contrast': { enabled: true },
    'valid-aria-attr': { enabled: true },
    'aria-roles': { enabled: true },
    'button-name': { enabled: true },
    'link-name': { enabled: true },
    'image-alt': { enabled: true },
  },
};

export async function checkAccessibility(page: Page, selector?: string) {
  await injectAxe(page);
  const violations = await getViolations(page, selector);

  if (violations.length > 0) {
    console.error('Accessibility violations:', violations);
  }

  return violations;
}
