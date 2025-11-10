---
id: 015
title: Comprehensive Accessibility Audit and Fixes
phase: 7
priority: critical
status: todo
dependencies: [008, 009, 011]
estimated_hours: 12
tags: [accessibility, a11y, wcag, testing, critical]
---

# Comprehensive Accessibility Audit and Fixes

## Objective
Conduct thorough accessibility audit and fix all violations to achieve WCAG 2.1 AA compliance across the entire site.

## Requirements
- WCAG 2.1 AA compliance (mandatory)
- Zero automated accessibility violations
- Keyboard navigation fully functional
- Screen reader compatibility verified
- Color contrast ratios meet standards
- Focus indicators visible
- ARIA attributes correctly used
- Semantic HTML throughout
- Alt text for all images
- Form labels and error messages accessible

## Implementation Steps

### 1. Automated Accessibility Testing

**Tools to Use:**
- axe-core (via Playwright)
- pa11y
- Lighthouse accessibility audit
- WAVE browser extension

```typescript
// __tests__/e2e/a11y/site-wide-a11y.spec.ts
import { test, expect } from '@playwright/test'
import { injectAxe, checkA11y } from 'axe-playwright'

const pages = [
  '/',
  '/services',
  '/services/ocean-freight',
  '/resources',
  '/network',
  '/request',
  '/news',
]

pages.forEach(page => {
  test(`${page} has no accessibility violations`, async ({ page: p }) => {
    await p.goto(page)
    await injectAxe(p)

    await checkA11y(p, null, {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    })
  })
})

// Test mobile accessibility
pages.forEach(page => {
  test(`${page} mobile has no accessibility violations`, async ({ page: p }) => {
    await p.setViewportSize({ width: 375, height: 667 })
    await p.goto(page)
    await injectAxe(p)
    await checkA11y(p)
  })
})
```

### 2. Keyboard Navigation Testing

```typescript
// __tests__/e2e/a11y/keyboard-navigation.spec.ts
test('full site keyboard navigation', async ({ page }) => {
  await page.goto('/')

  // Test skip link
  await page.keyboard.press('Tab')
  const skipLink = page.locator('a:has-text("Skip to main content")')
  await expect(skipLink).toBeFocused()
  await page.keyboard.press('Enter')

  // Verify focus moved to main content
  const main = page.locator('main')
  await expect(main).toBeFocused()

  // Test header navigation
  await page.keyboard.press('Tab')
  // Logo should be focused
  await page.keyboard.press('Tab')
  // First nav item should be focused

  // Tab through all interactive elements
  let tabCount = 0
  const maxTabs = 50

  while (tabCount < maxTabs) {
    await page.keyboard.press('Tab')
    const focused = await page.evaluate(() => document.activeElement?.tagName)
    if (!focused || focused === 'BODY') break
    tabCount++
  }

  // Verify footer is reachable
  const footer = page.locator('footer')
  await expect(footer).toBeVisible()
})

test('form keyboard navigation', async ({ page }) => {
  await page.goto('/request')

  // Tab through form fields
  await page.keyboard.press('Tab') // Name
  await page.keyboard.press('Tab') // Email
  await page.keyboard.press('Tab') // Phone
  await page.keyboard.press('Tab') // Company
  await page.keyboard.press('Tab') // Message
  await page.keyboard.press('Tab') // Submit button

  // Submit button should be focused
  const submitButton = page.locator('button[type="submit"]')
  await expect(submitButton).toBeFocused()

  // Test Enter key submission
  await page.keyboard.press('Enter')
  // Form should attempt to submit
})

test('mobile menu keyboard navigation', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 })
  await page.goto('/')

  // Tab to hamburger button
  let focused = null
  while (!focused?.includes('menu')) {
    await page.keyboard.press('Tab')
    focused = await page.evaluate(() =>
      document.activeElement?.getAttribute('aria-label')?.toLowerCase()
    )
  }

  // Open menu with Enter
  await page.keyboard.press('Enter')
  await expect(page.locator('[role="dialog"]')).toBeVisible()

  // Tab through menu items
  await page.keyboard.press('Tab')
  // Should focus first menu item

  // Close with Escape
  await page.keyboard.press('Escape')
  await expect(page.locator('[role="dialog"]')).toBeHidden()

  // Focus should return to hamburger
  const hamburger = page.locator('[aria-label*="menu"]')
  await expect(hamburger).toBeFocused()
})
```

### 3. Screen Reader Testing

**Manual Tests Required:**
- VoiceOver (macOS/iOS)
- NVDA (Windows)
- JAWS (Windows)
- TalkBack (Android)

**Test Checklist:**
```markdown
## Screen Reader Test Checklist

### Navigation
- [ ] Page title announced
- [ ] Landmark regions identified (header, nav, main, footer)
- [ ] Skip link works and is announced
- [ ] Navigation menu structure clear
- [ ] Current page indicated in navigation

### Headings
- [ ] All headings properly nested
- [ ] Heading levels don't skip
- [ ] Page structure clear from headings alone

### Links
- [ ] Link purpose clear from text
- [ ] No "click here" or "read more" without context
- [ ] External links identified
- [ ] Current page link identified

### Forms
- [ ] Form labels associated with inputs
- [ ] Required fields identified
- [ ] Error messages announced and associated
- [ ] Success messages announced
- [ ] Field instructions provided where needed

### Images
- [ ] All images have alt text
- [ ] Decorative images marked with empty alt
- [ ] Complex images have long descriptions

### Tables (if any)
- [ ] Table headers identified
- [ ] Table caption provided
- [ ] Data relationships clear

### Dynamic Content
- [ ] Loading states announced
- [ ] Error messages announced
- [ ] Modal dialogs announced and focus managed
- [ ] Live regions used appropriately
```

### 4. Color Contrast Fixes

```typescript
// Run contrast checker
// __tests__/e2e/a11y/contrast-check.spec.ts
test('all text meets contrast ratios', async ({ page }) => {
  await page.goto('/')

  const results = await page.evaluate(() => {
    // Use axe to check contrast
    return (window as any).axe.run({
      rules: {
        'color-contrast': { enabled: true }
      }
    })
  })

  expect(results.violations.filter(v => v.id === 'color-contrast')).toHaveLength(0)
})
```

**Fix contrast issues in Tailwind config:**
```typescript
// tailwind.config.ts
colors: {
  primary: {
    DEFAULT: '#0066cc', // Ensure 4.5:1 ratio on white
    dark: '#004c99',
  },
  // Test all color combinations
}
```

### 5. Focus Indicator Improvements

```css
/* src/app/globals.css */

/* Visible focus indicators for keyboard users */
*:focus-visible {
  outline: 2px solid theme('colors.primary.DEFAULT');
  outline-offset: 2px;
}

/* Remove default outline for mouse users */
*:focus:not(:focus-visible) {
  outline: none;
}

/* Enhanced focus for interactive elements */
button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid theme('colors.primary.DEFAULT');
  outline-offset: 2px;
  box-shadow: 0 0 0 4px theme('colors.primary.DEFAULT / 20%');
}
```

### 6. Semantic HTML Audit

**Check all pages for:**
- Proper use of `<header>`, `<nav>`, `<main>`, `<footer>`
- Heading hierarchy (h1 → h2 → h3, no skipping)
- Lists using `<ul>`, `<ol>`, `<li>`
- Buttons using `<button>` (not `<div>` with click handlers)
- Links using `<a>` with proper href
- Forms using `<form>` elements

### 7. ARIA Attributes Audit

**Common ARIA patterns to verify:**
```typescript
// Mobile menu
<button
  aria-label="Open menu"
  aria-expanded={isOpen}
  aria-controls="mobile-menu"
>

<div
  id="mobile-menu"
  role="dialog"
  aria-modal="true"
  aria-labelledby="menu-title"
>

// Form errors
<input
  aria-invalid={!!error}
  aria-describedby={error ? "field-error" : undefined}
/>
<div id="field-error" role="alert">{error.message}</div>

// Loading states
<div role="status" aria-live="polite" aria-busy="true">
  Loading...
</div>

// Success messages
<div role="alert" aria-live="polite">
  Form submitted successfully
</div>
```

### 8. Alt Text Review

```typescript
// __tests__/e2e/a11y/alt-text.spec.ts
test('all images have alt text', async ({ page }) => {
  await page.goto('/')

  const images = await page.locator('img').all()

  for (const img of images) {
    const alt = await img.getAttribute('alt')
    const role = await img.getAttribute('role')

    // Either has alt attribute or is decorative (role="presentation")
    expect(
      alt !== null || role === 'presentation'
    ).toBe(true)

    // If has alt, should be descriptive (not filename)
    if (alt && alt.length > 0) {
      expect(alt).not.toMatch(/\.(jpg|png|gif|webp)$/i)
      expect(alt).not.toBe('image')
      expect(alt).not.toBe('picture')
    }
  }
})
```

### 9. Create Accessibility Documentation

```markdown
# Accessibility Guidelines

## For Content Editors

### Images
- All images must have alt text
- Describe what's in the image, not "image of..."
- Decorative images should use empty alt: alt=""

### Links
- Link text should describe destination
- Avoid "click here" or "read more"
- Use descriptive text: "View ocean freight services"

### Headings
- Use headings in order (h1, h2, h3)
- Don't skip heading levels
- One h1 per page

### Colors
- Don't rely on color alone
- Ensure text has sufficient contrast
- Use icons or labels in addition to color

## For Developers

### Testing Checklist
- [ ] Run automated tests (axe, Lighthouse)
- [ ] Test keyboard navigation
- [ ] Test with screen reader
- [ ] Verify focus indicators visible
- [ ] Check color contrast
- [ ] Verify semantic HTML
- [ ] Test with zoom at 200%
```

## Testing Requirements
- Zero axe-core violations across all pages
- Lighthouse accessibility score > 95
- All pages keyboard navigable
- Screen reader testing completed
- Color contrast verified (4.5:1 minimum)
- Focus indicators visible
- Manual testing completed

## Acceptance Criteria
- ✅ Automated tests passing (zero violations)
- ✅ Keyboard navigation fully functional
- ✅ Screen reader testing completed
- ✅ All color contrasts meet WCAG AA
- ✅ Focus indicators visible and clear
- ✅ Semantic HTML used throughout
- ✅ ARIA attributes used correctly
- ✅ All images have proper alt text
- ✅ Form labels and errors accessible
- ✅ Skip links working
- ✅ Heading hierarchy correct
- ✅ Mobile accessibility verified
- ✅ Documentation created
- ✅ Lighthouse score > 95

## Notes
- WCAG 2.1 AA is mandatory, not optional
- Test with real assistive technology users if possible
- Document all accessibility patterns for future use
- Regular accessibility audits should continue post-launch
- Consider AAA compliance for future enhancement
- Train content editors on accessibility requirements
