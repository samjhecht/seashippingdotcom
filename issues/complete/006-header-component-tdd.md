---
id: 006
title: Create Header Component with Mobile-First Navigation (TDD)
phase: 2
priority: critical
status: todo
dependencies: [005]
estimated_hours: 6
tags: [components, header, navigation, mobile-first, tdd]
---

# Create Header Component with Mobile-First Navigation (TDD)

## Objective
Build a fully responsive header component with mobile-first hamburger navigation, following TDD principles.

## Requirements
- Mobile hamburger menu with smooth animations
- Desktop horizontal navigation
- Sticky header on scroll
- Contact CTA button
- Social media links
- Logo with link to homepage
- Accessible keyboard navigation
- Touch-friendly (44x44px minimum)

## Implementation Steps (TDD Approach)

### 1. Write Tests First

```typescript
// __tests__/unit/components/layout/Header.test.tsx
describe('Header', () => {
  describe('Mobile View (< 768px)', () => {
    beforeEach(() => {
      // Set mobile viewport
      global.innerWidth = 375;
    });

    it('renders logo and hamburger button', () => {
      // Test logo and hamburger are visible
    });

    it('hides navigation menu by default', () => {
      // Test menu is not visible initially
    });

    it('opens menu when hamburger is clicked', async () => {
      // Test menu opens on click
    });

    it('closes menu when close button is clicked', async () => {
      // Test menu closes
    });

    it('closes menu when navigation link is clicked', async () => {
      // Test menu closes after navigation
    });

    it('hamburger button has correct ARIA attributes', () => {
      // Test aria-label, aria-expanded
    });

    it('menu has correct ARIA attributes', () => {
      // Test role="navigation", aria-hidden
    });

    it('hamburger button meets touch target size (44x44px)', () => {
      // Test button dimensions
    });
  });

  describe('Desktop View (>= 768px)', () => {
    beforeEach(() => {
      global.innerWidth = 1024;
    });

    it('renders horizontal navigation menu', () => {
      // Test desktop nav is visible
    });

    it('does not render hamburger button', () => {
      // Test hamburger is hidden
    });

    it('shows all navigation links', () => {
      // Test HOME, SERVICES, RESOURCES, NETWORK, REQUEST, SSLNEWS
    });

    it('highlights active navigation item', () => {
      // Test active state styling
    });
  });

  describe('Sticky Header', () => {
    it('adds sticky class when scrolling down', () => {
      // Test scroll behavior
    });

    it('reduces height when sticky', () => {
      // Test compact mode
    });
  });

  describe('Accessibility', () => {
    it('can navigate menu with keyboard (Tab, Enter, Escape)', async () => {
      // Test keyboard navigation
    });

    it('traps focus within mobile menu when open', () => {
      // Test focus trap
    });

    it('returns focus to hamburger when menu closes', () => {
      // Test focus management
    });

    it('has skip to main content link', () => {
      // Test skip link
    });
  });

  describe('Contact CTA', () => {
    it('renders Contact Us button', () => {
      // Test CTA button exists
    });

    it('links to contact form', () => {
      // Test href="#contact" or "/request"
    });
  });
});
```

### 2. Run Tests (Fail)
- Verify all tests fail (no implementation yet)
- Confirm test logic is correct

### 3. Implement Header Component

```typescript
// src/components/layout/Header.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X } from 'lucide-react'

const navItems = [
  { name: 'HOME', href: '/' },
  { name: 'SERVICES', href: '/services' },
  { name: 'RESOURCES', href: '/resources' },
  { name: 'NETWORK', href: '/network' },
  { name: 'REQUEST', href: '/request' },
  { name: 'SSLNEWS', href: '/news' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={/* sticky styles */}>
      {/* Skip to main content link */}
      <a href="#main" className="sr-only focus:not-sr-only">
        Skip to main content
      </a>

      {/* Desktop & Mobile Layout */}
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <span className="sr-only">Sea Shipping Line</span>
          {/* Logo image */}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          {/* Navigation items */}
        </nav>

        {/* Mobile Hamburger */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              aria-expanded={isOpen}
              className="h-11 w-11" /* 44px touch target */
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            {/* Mobile menu content */}
          </SheetContent>
        </Sheet>

        {/* Contact CTA */}
        <Button>Contact Us</Button>
      </div>
    </header>
  )
}
```

### 4. Run Tests (Pass)
- Verify all tests pass
- Check coverage (should be 90%+ for component)

### 5. Refactor
- Improve code quality
- Extract reusable parts
- Optimize performance
- Ensure tests still pass

### 6. Visual Testing
```typescript
// __tests__/e2e/visual/header.spec.ts
test('header renders correctly on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  await expect(page).toHaveScreenshot('header-mobile.png');
});

test('header renders correctly on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/');
  await expect(page).toHaveScreenshot('header-desktop.png');
});

test('mobile menu animation', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  await page.click('[aria-label="Open menu"]');
  await expect(page.locator('[role="dialog"]')).toBeVisible();
});
```

### 7. Accessibility Testing
```typescript
// __tests__/e2e/a11y/header.spec.ts
test('header has no accessibility violations', async ({ page }) => {
  await page.goto('/');
  await injectAxe(page);
  await checkA11y(page);
});

test('keyboard navigation works', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab'); // Skip link
  await page.keyboard.press('Tab'); // Logo
  await page.keyboard.press('Tab'); // First nav item
  // ... test full keyboard flow
});
```

## Testing Requirements
- 90%+ unit test coverage for Header component
- All mobile interactions tested
- All desktop interactions tested
- Keyboard navigation tested
- Screen reader compatibility tested
- Visual regression tests passing
- Zero accessibility violations

## Acceptance Criteria
- ✅ Tests written first (TDD approach)
- ✅ All unit tests passing (90%+ coverage)
- ✅ Mobile hamburger menu works smoothly
- ✅ Desktop horizontal navigation works
- ✅ Sticky header behavior works
- ✅ All navigation links functional
- ✅ Contact CTA button works
- ✅ Touch targets are 44x44px minimum
- ✅ Keyboard navigation fully functional
- ✅ Focus management working correctly
- ✅ Zero accessibility violations
- ✅ Visual regression tests passing
- ✅ Component documented with examples

## Notes
- Mobile-first: Design and test mobile view before desktop
- Follow React Testing Library best practices (query by role, label, text)
- Use Sheet component from shadcn/ui for mobile drawer
- Implement smooth animations with Framer Motion
- Add reduced motion support
- Logo should be high-resolution and optimized
