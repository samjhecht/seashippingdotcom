---
id: 008
title: Implement Homepage with Mobile-First Design (TDD)
phase: 3
priority: critical
status: todo
dependencies: [006, 007]
estimated_hours: 8
tags: [pages, homepage, mobile-first, tdd, hero]
---

# Implement Homepage with Mobile-First Design (TDD)

## Objective
Build the homepage with all sections from the current site, implementing mobile-first design and following TDD principles.

## Requirements

### Content Sections
1. Hero section with company tagline
2. Company introduction (NVOCC, 37 years)
3. Key statistics display
4. Memberships and certifications badges
5. Regulatory credentials
6. Quick links section
7. C-TPAT certification highlight

### Components Needed
- Hero component
- Stats card component
- Badge/certification component
- CTA button component
- Quick links section

## Implementation Steps (TDD Approach)

### 1. Write Tests for Homepage

```typescript
// __tests__/unit/app/page.test.tsx
describe('Homepage', () => {
  describe('Hero Section', () => {
    it('renders company tagline', () => {
      render(<HomePage />);
      expect(screen.getByText(/Locally Grown & Globally Situated/i)).toBeInTheDocument();
    });

    it('renders primary CTA button', () => {
      render(<HomePage />);
      expect(screen.getByRole('button', { name: /Get a Quote/i })).toBeInTheDocument();
    });

    it('hero is responsive on mobile', () => {
      // Test mobile layout
    });
  });

  describe('Company Introduction', () => {
    it('displays NVOCC description', () => {
      // Test NVOCC text present
    });

    it('displays years of experience', () => {
      expect(screen.getByText(/37 years/i)).toBeInTheDocument();
    });
  });

  describe('Statistics Section', () => {
    it('displays all key statistics', () => {
      const stats = [
        'Network coverage worldwide',
        '8 U.S. domestic offices',
        'Service contracts with all major carriers'
      ];
      // Test all stats visible
    });

    it('stats cards are responsive', () => {
      // Test mobile stack, desktop grid
    });
  });

  describe('Certifications', () => {
    it('displays membership badges', () => {
      // Test certification badges render
    });

    it('displays C-TPAT certification', () => {
      expect(screen.getByText(/C-TPAT/i)).toBeInTheDocument();
    });
  });

  describe('Quick Links', () => {
    it('renders quick access links', () => {
      const links = ['Forms', 'Resources', 'Trade Updates'];
      // Test quick links present
    });

    it('links navigate to correct pages', () => {
      // Test href attributes
    });
  });

  describe('Regulatory Credentials', () => {
    it('displays all required credentials', () => {
      const creds = ['OTI#', 'SCAC', 'DOT#', 'MC#', 'Customs Filer Code'];
      // Test all credentials visible
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      const { container } = render(<HomePage />);
      const h1 = container.querySelector('h1');
      expect(h1).toBeInTheDocument();
      // Test h2, h3 exist and are properly nested
    });

    it('has no accessibility violations', async () => {
      const { container } = render(<HomePage />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('SEO', () => {
    it('has correct meta title', () => {
      // Test page title
    });

    it('has meta description', () => {
      // Test meta description exists
    });
  });
});
```

### 2. Write Tests for Hero Component

```typescript
// __tests__/unit/components/sections/Hero.test.tsx
describe('Hero', () => {
  it('renders tagline', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Locally Grown & Globally Situated'
    );
  });

  it('renders background image with proper optimization', () => {
    // Test Next.js Image component usage
  });

  it('CTA button is accessible and touchable', () => {
    render(<Hero />);
    const button = screen.getByRole('button', { name: /Get a Quote/i });
    // Test button is 44x44px minimum
    // Test has proper focus indicator
  });

  it('hero height adjusts for mobile', () => {
    // Test responsive height
  });

  it('text is readable on background image', () => {
    // Test contrast ratio
  });
});
```

### 3. Write Tests for Stats Component

```typescript
// __tests__/unit/components/sections/Stats.test.tsx
describe('Stats', () => {
  const mockStats = [
    { label: 'Worldwide Network', value: 'Global Coverage' },
    { label: 'U.S. Offices', value: '8' },
    { label: 'Major Carriers', value: 'All' }
  ];

  it('renders all stats', () => {
    render(<Stats stats={mockStats} />);
    mockStats.forEach(stat => {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
      expect(screen.getByText(stat.value)).toBeInTheDocument();
    });
  });

  it('stacks vertically on mobile', () => {
    // Test mobile layout
  });

  it('displays in grid on desktop', () => {
    // Test desktop 3-column grid
  });

  it('stats have proper visual hierarchy', () => {
    // Test value is larger than label
  });
});
```

### 4. Run Tests (Fail)
- Verify all tests fail initially

### 5. Implement Components

```typescript
// src/app/page.tsx
import { Hero } from '@/components/sections/Hero'
import { Stats } from '@/components/sections/Stats'
import { Certifications } from '@/components/sections/Certifications'
import { QuickLinks } from '@/components/sections/QuickLinks'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sea Shipping Line - NVOCC | International Freight Forwarding',
  description: 'Federally licensed NVOCC with 37 years of global shipping expertise. 8 U.S. offices, worldwide network coverage.',
}

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">About Sea Shipping Line</h2>
          <p>
            Sea Shipping Line is a federally licensed and bonded Non-Vessel Operating
            Common Carrier (NVOCC) with over 37 years of global shipping expertise...
          </p>
        </div>
      </section>
      <Stats />
      <Certifications />
      <QuickLinks />
      {/* Regulatory credentials section */}
    </main>
  )
}
```

```typescript
// src/components/sections/Hero.tsx
'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function Hero() {
  const router = useRouter()

  return (
    <section className="relative h-[500px] md:h-[600px] flex items-center justify-center">
      <Image
        src="/images/hero-shipping.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Locally Grown & Globally Situated
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          37 Years of Global Shipping Excellence
        </p>
        <Button
          size="lg"
          onClick={() => router.push('/request')}
          className="h-12 px-8 text-lg"
        >
          Get a Quote
        </Button>
      </div>
    </section>
  )
}
```

```typescript
// src/components/sections/Stats.tsx
interface Stat {
  label: string
  value: string
}

interface StatsProps {
  stats?: Stat[]
}

const defaultStats: Stat[] = [
  { label: 'Worldwide Network', value: 'Global Coverage' },
  { label: 'U.S. Domestic Offices', value: '8' },
  { label: 'Major Carrier Contracts', value: 'All' },
]

export function Stats({ stats = defaultStats }: StatsProps) {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-lg text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### 6. Run Tests (Pass)
- Verify all tests pass
- Check coverage (85%+ for page components)

### 7. E2E Tests

```typescript
// __tests__/e2e/journeys/homepage.spec.ts
test('homepage loads and displays all content', async ({ page }) => {
  await page.goto('/');

  // Check hero
  await expect(page.locator('h1')).toContainText('Locally Grown & Globally Situated');

  // Check stats
  await expect(page.locator('text=8')).toBeVisible();
  await expect(page.locator('text=U.S. Domestic Offices')).toBeVisible();

  // Check CTA
  const ctaButton = page.getByRole('button', { name: /Get a Quote/i });
  await expect(ctaButton).toBeVisible();
  await ctaButton.click();
  await expect(page).toHaveURL('/request');
});

test('homepage is accessible on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');

  // Test mobile navigation
  await page.click('[aria-label="Open menu"]');
  await expect(page.locator('[role="dialog"]')).toBeVisible();
});
```

### 8. Visual Regression Tests

```typescript
// __tests__/e2e/visual/homepage.spec.ts
test('homepage visual regression - mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage-mobile.png', {
    fullPage: true,
  });
});

test('homepage visual regression - desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage-desktop.png', {
    fullPage: true,
  });
});
```

## Testing Requirements
- 85%+ unit test coverage
- All sections tested individually
- All components have unit tests
- E2E test for complete user journey
- Visual regression baseline established
- Accessibility verified (zero violations)
- Mobile-first responsive behavior tested

## Acceptance Criteria
- ✅ Tests written first (TDD)
- ✅ All unit tests passing (85%+ coverage)
- ✅ Hero section responsive and accessible
- ✅ All content sections implemented
- ✅ Statistics display correctly
- ✅ Certifications/badges displayed
- ✅ Quick links functional
- ✅ Regulatory credentials visible
- ✅ Mobile layout tested and working
- ✅ Desktop layout tested and working
- ✅ E2E tests passing
- ✅ Visual regression baseline set
- ✅ Zero accessibility violations
- ✅ SEO metadata configured
- ✅ Images optimized with Next.js Image

## Notes
- Hero image should be optimized and served in WebP
- Maintain visual consistency with current site branding
- Ensure smooth animations with reduced motion support
- All CTA buttons should be trackable for analytics
- Consider lazy loading for below-fold content
