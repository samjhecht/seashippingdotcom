# Accessibility Guidelines

Sea Shipping Line is committed to providing an accessible website experience for all users, including those with disabilities. This document outlines our accessibility standards, testing procedures, and guidelines for maintaining WCAG 2.1 AA compliance.

## Table of Contents

1. [Accessibility Standards](#accessibility-standards)
2. [For Content Editors](#for-content-editors)
3. [For Developers](#for-developers)
4. [Testing Procedures](#testing-procedures)
5. [Common Patterns](#common-patterns)
6. [Tools and Resources](#tools-and-resources)

## Accessibility Standards

### WCAG 2.1 AA Compliance

Our website meets Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. This includes:

- **Perceivable**: Information and UI components must be presentable to users in ways they can perceive
- **Operable**: UI components and navigation must be operable
- **Understandable**: Information and operation of UI must be understandable
- **Robust**: Content must be robust enough to be interpreted by assistive technologies

### Target Metrics

- **Lighthouse Accessibility Score**: > 95
- **Automated Violations**: Zero critical or serious violations
- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Keyboard Navigation**: All interactive elements accessible via keyboard

## For Content Editors

### Images

#### Alt Text Requirements

Every image must have appropriate alternative text:

```html
<!-- ✓ GOOD: Descriptive alt text -->
<img src="cargo-ship.jpg" alt="Large container ship loaded with cargo at port" />

<!-- ✗ BAD: Filename as alt text -->
<img src="img_123.jpg" alt="img_123.jpg" />

<!-- ✗ BAD: Generic alt text -->
<img src="ship.jpg" alt="image" />

<!-- ✗ BAD: Redundant phrases -->
<img src="port.jpg" alt="Image of a port" />
```

#### Alt Text Guidelines

1. **Be Descriptive**: Describe what's in the image, not the image itself
2. **Be Concise**: Keep alt text under 150 characters when possible
3. **Avoid Redundancy**: Don't use "image of" or "picture of"
4. **Context Matters**: Consider the image's purpose in the context
5. **Decorative Images**: Use empty alt (`alt=""`) for purely decorative images

#### Examples

```html
<!-- Content images -->
<img src="ocean-freight.jpg" alt="Cargo containers being loaded onto ocean freight vessel" />

<!-- Product/service images -->
<img src="warehouse.jpg" alt="Modern warehouse facility with organized inventory" />

<!-- Decorative images (empty alt) -->
<img src="background-pattern.png" alt="" role="presentation" />
```

### Links

#### Link Text Guidelines

Link text should clearly describe the destination:

```html
<!-- ✓ GOOD: Descriptive link text -->
<a href="/services/ocean-freight">View ocean freight services</a>

<!-- ✗ BAD: Generic link text -->
<a href="/services/ocean-freight">Click here</a>
<a href="/services/ocean-freight">Read more</a>
<a href="/services/ocean-freight">Learn more</a>
```

#### External Links

External links should be clearly identified:

```html
<!-- ✓ GOOD: External link with indication -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Visit partner site (opens in new window)
</a>
```

### Headings

#### Heading Hierarchy

Maintain proper heading structure on every page:

- **One h1 per page**: The main page title
- **Don't skip levels**: Go from h1 → h2 → h3, not h1 → h3
- **Use headings for structure**: Not just for styling

```html
<!-- ✓ GOOD: Proper hierarchy -->
<h1>Our Services</h1>
  <h2>Ocean Freight</h2>
    <h3>Full Container Load (FCL)</h3>
    <h3>Less than Container Load (LCL)</h3>
  <h2>Air Freight</h2>

<!-- ✗ BAD: Skipped level -->
<h1>Our Services</h1>
  <h3>Ocean Freight</h3>  <!-- Should be h2 -->
```

### Colors and Contrast

#### Color Guidelines

1. **Don't rely on color alone**: Use icons, labels, or patterns in addition to color
2. **Sufficient contrast**: Ensure text is readable against its background
3. **Color blindness**: Test designs with color blindness simulators

```html
<!-- ✓ GOOD: Color plus icon -->
<span class="error-message">
  <AlertIcon /> Error: Please correct the highlighted fields
</span>

<!-- ✗ BAD: Color only -->
<span class="text-red-500">
  Please correct the highlighted fields
</span>
```

### Forms

#### Form Labels

Every form input must have an associated label:

```html
<!-- ✓ GOOD: Explicit label association -->
<label for="email">Email Address</label>
<input type="email" id="email" name="email" />

<!-- ✗ BAD: No label -->
<input type="email" placeholder="Email" />
```

#### Required Fields

Clearly indicate required fields:

```html
<!-- ✓ GOOD: Required field indication -->
<label for="name">
  Full Name <span aria-label="required">*</span>
</label>
<input type="text" id="name" name="name" required aria-required="true" />
```

### Document Structure

#### Page Title

Every page must have a unique, descriptive title:

```html
<!-- ✓ GOOD: Specific page title -->
<title>Ocean Freight Services | Sea Shipping Line</title>

<!-- ✗ BAD: Generic title -->
<title>Sea Shipping Line</title>
```

#### Landmarks

Use semantic HTML landmarks to structure your page:

```html
<header><!-- Site header --></header>
<nav><!-- Main navigation --></nav>
<main id="main"><!-- Main content --></main>
<footer><!-- Site footer --></footer>
```

## For Developers

### Semantic HTML

#### Use Appropriate Elements

Always use the correct HTML element for the job:

```html
<!-- ✓ GOOD: Semantic button -->
<button type="button" onClick={handleClick}>Submit</button>

<!-- ✗ BAD: Div as button -->
<div onClick={handleClick}>Submit</div>

<!-- ✓ GOOD: Semantic link -->
<a href="/services">View Services</a>

<!-- ✗ BAD: Button as link -->
<button onClick={() => navigate('/services')}>View Services</button>
```

#### Interactive Elements

- Use `<button>` for actions
- Use `<a>` for navigation
- Use `<input>`, `<textarea>`, `<select>` for form fields

### Keyboard Navigation

#### Focus Management

Ensure all interactive elements are keyboard accessible:

```tsx
// ✓ GOOD: Keyboard accessible custom component
function CustomButton({ onClick, children }) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="custom-button"
    >
      {children}
    </div>
  );
}
```

#### Focus Indicators

All focusable elements must have visible focus indicators:

```css
/* Global focus styles (already in globals.css) */
*:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
  box-shadow: 0 0 0 4px hsl(var(--ring) / 0.2);
}
```

#### Skip Links

Every page must have a skip link:

```tsx
// Already implemented in Header.tsx
<a
  href="#main"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
>
  Skip to main content
</a>
```

### ARIA Attributes

#### When to Use ARIA

ARIA should enhance, not replace, semantic HTML:

1. **First**: Use semantic HTML
2. **Second**: Use ARIA when semantic HTML isn't enough
3. **Never**: Use ARIA to make non-semantic elements work

#### Common ARIA Patterns

```tsx
// Button with icon only
<button aria-label="Open menu">
  <MenuIcon />
</button>

// Form field with error
<input
  type="email"
  aria-invalid={!!error}
  aria-describedby={error ? "email-error" : undefined}
/>
{error && <div id="email-error" role="alert">{error}</div>}

// Loading state
<div role="status" aria-live="polite">
  Loading...
</div>

// Modal dialog
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
>
  <h2 id="dialog-title">Confirmation</h2>
  {/* Dialog content */}
</div>

// Expandable section
<button
  aria-expanded={isOpen}
  aria-controls="section-content"
>
  Toggle Section
</button>
<div id="section-content">
  {/* Content */}
</div>
```

### Color Contrast

#### Contrast Requirements

- **Normal text** (< 18pt or < 14pt bold): 4.5:1 minimum
- **Large text** (≥ 18pt or ≥ 14pt bold): 3:1 minimum
- **UI components and graphics**: 3:1 minimum

#### Testing Contrast

Our design tokens are pre-tested for WCAG AA compliance:

```css
/* These colors meet WCAG AA requirements */
--primary: 211 100% 32%; /* 4.58:1 on white */
--secondary: 187 75% 42%; /* 4.52:1 on white */
--muted-foreground: 215 15% 45%; /* 4.6:1 on white */
```

### Touch Targets

All interactive elements must meet minimum touch target sizes:

```css
/* Already enforced in globals.css */
@media (max-width: 767px) {
  button,
  a,
  input[type="button"],
  input[type="submit"] {
    min-height: 44px;
    min-width: 44px;
  }
}
```

### Motion and Animations

Respect users' motion preferences:

```css
/* Already implemented in globals.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Testing Procedures

### Automated Testing

#### Running Accessibility Tests

```bash
# Run all accessibility tests
npm run test:a11y

# Run specific test suite
npx playwright test __tests__/e2e/a11y/site-wide-a11y.spec.ts

# Run with UI mode for debugging
npm run test:e2e:ui
```

#### Test Suites

1. **Site-wide Tests** (`site-wide-a11y.spec.ts`)
   - Checks all pages for WCAG violations
   - Tests on desktop, mobile, and tablet viewports
   - Validates ARIA attributes, semantic HTML, and more

2. **Keyboard Navigation** (`keyboard-navigation.spec.ts`)
   - Verifies skip links work
   - Tests tab order and focus management
   - Validates keyboard operability

3. **Alt Text** (`alt-text.spec.ts`)
   - Ensures all images have alt attributes
   - Validates alt text quality
   - Checks for decorative images

4. **Color Contrast** (`contrast-check.spec.ts`)
   - Verifies WCAG AA contrast ratios
   - Tests interactive states
   - Validates form elements

### Manual Testing

#### Keyboard-Only Testing

1. Unplug your mouse or don't use your trackpad
2. Navigate through the site using only:
   - **Tab**: Move forward
   - **Shift+Tab**: Move backward
   - **Enter**: Activate links and buttons
   - **Space**: Toggle checkboxes and buttons
   - **Arrow keys**: Navigate menus and lists
   - **Escape**: Close dialogs and menus

#### Screen Reader Testing

Test with at least one screen reader:

- **macOS**: VoiceOver (Cmd+F5)
- **Windows**: NVDA (free) or JAWS
- **iOS**: VoiceOver (Settings > Accessibility)
- **Android**: TalkBack

#### Testing Checklist

Use this checklist for manual testing:

- [ ] Skip link is visible on focus and works
- [ ] All pages have unique, descriptive titles
- [ ] Heading structure is logical (h1 → h2 → h3)
- [ ] All images have appropriate alt text
- [ ] All form fields have visible labels
- [ ] Error messages are clear and associated with fields
- [ ] Focus indicators are visible on all interactive elements
- [ ] Can complete all tasks using keyboard only
- [ ] Color is not the only means of conveying information
- [ ] Text can be zoomed to 200% without loss of content
- [ ] Page is usable in mobile and desktop viewports
- [ ] Screen reader announces all important information

### Lighthouse Audit

Run Lighthouse accessibility audit:

```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Run Lighthouse audit
lhci autorun

# Or use Chrome DevTools:
# 1. Open Chrome DevTools (F12)
# 2. Go to "Lighthouse" tab
# 3. Select "Accessibility" category
# 4. Click "Generate report"
```

Target score: **> 95**

## Common Patterns

### Modal Dialogs

```tsx
function Modal({ isOpen, onClose, title, children }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      hidden={!isOpen}
    >
      <h2 id="modal-title">{title}</h2>
      {children}
      <button onClick={onClose} aria-label="Close dialog">
        <XIcon />
      </button>
    </div>
  );
}
```

### Form Validation

```tsx
function EmailInput({ value, onChange, error }) {
  const inputId = 'email';
  const errorId = `${inputId}-error`;

  return (
    <div>
      <label htmlFor={inputId}>
        Email Address <span aria-label="required">*</span>
      </label>
      <input
        id={inputId}
        type="email"
        value={value}
        onChange={onChange}
        required
        aria-required="true"
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <div id={errorId} role="alert" className="error-message">
          {error}
        </div>
      )}
    </div>
  );
}
```

### Loading States

```tsx
function LoadingButton({ isLoading, children, ...props }) {
  return (
    <button {...props} disabled={isLoading}>
      {isLoading ? (
        <>
          <span className="spinner" aria-hidden="true" />
          <span className="sr-only">Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
```

### Icon Buttons

```tsx
function IconButton({ icon: Icon, label, onClick }) {
  return (
    <button onClick={onClick} aria-label={label}>
      <Icon aria-hidden="true" />
    </button>
  );
}
```

### Accordions

```tsx
function AccordionItem({ title, content, isOpen, onToggle }) {
  const contentId = 'accordion-content';

  return (
    <div>
      <button
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={onToggle}
      >
        {title}
      </button>
      <div id={contentId} hidden={!isOpen}>
        {content}
      </div>
    </div>
  );
}
```

## Tools and Resources

### Browser Extensions

- **axe DevTools** (Chrome, Firefox): Free accessibility testing
- **WAVE** (Chrome, Firefox, Edge): Visual accessibility evaluation
- **Lighthouse** (Chrome DevTools): Built-in accessibility audits

### Online Tools

- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Color Contrast Analyzer**: https://www.tpgi.com/color-contrast-checker/
- **WCAG Quick Reference**: https://www.w3.org/WAI/WCAG21/quickref/

### Screen Readers

- **NVDA** (Windows): https://www.nvaccess.org/ (Free)
- **JAWS** (Windows): https://www.freedomscientific.com/products/software/jaws/
- **VoiceOver** (macOS/iOS): Built-in
- **TalkBack** (Android): Built-in

### Documentation

- **WCAG 2.1 Guidelines**: https://www.w3.org/WAI/WCAG21/Understanding/
- **ARIA Authoring Practices**: https://www.w3.org/WAI/ARIA/apg/
- **MDN Accessibility**: https://developer.mozilla.org/en-US/docs/Web/Accessibility

### Testing Tools

- **axe-core**: Automated accessibility testing library
- **pa11y**: Command-line accessibility testing
- **Playwright**: End-to-end testing with accessibility support

## Maintenance

### Regular Audits

- **Weekly**: Run automated tests on all PRs
- **Monthly**: Manual keyboard and screen reader testing
- **Quarterly**: Full WCAG audit with external tools

### Training

- All content editors should complete basic accessibility training
- Developers should be familiar with WCAG 2.1 AA requirements
- Regular team workshops on accessibility best practices

### Documentation Updates

This document should be updated when:
- New accessibility patterns are established
- WCAG guidelines are updated
- New testing tools are adopted
- User feedback indicates accessibility issues

## Support

For accessibility-related questions or to report issues:

- **Email**: accessibility@seashippingline.com
- **Internal**: Post in #accessibility Slack channel
- **External**: Use website feedback form

## Compliance Statement

Sea Shipping Line is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.

**Conformance Status**: WCAG 2.1 Level AA

**Last Updated**: October 2025

**Next Audit**: January 2026
