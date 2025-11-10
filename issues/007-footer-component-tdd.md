---
id: 007
title: Create Footer Component (TDD)
phase: 2
priority: high
status: todo
dependencies: [005]
estimated_hours: 4
tags: [components, footer, mobile-first, tdd]
---

# Create Footer Component (TDD)

## Objective
Build a comprehensive footer component with multi-column navigation, legal information, and contact details, following TDD principles.

## Requirements
- Multi-column layout (desktop) / stacked layout (mobile)
- Company overview section
- Services links
- Useful tools links
- Help section links
- Social media links
- Legal information (Terms, Privacy, Copyright)
- Designer credit
- Regulatory information display
- Mobile-optimized stacking

## Implementation Steps (TDD Approach)

### 1. Write Tests First

```typescript
// __tests__/unit/components/layout/Footer.test.tsx
describe('Footer', () => {
  describe('Mobile View (< 768px)', () => {
    beforeEach(() => {
      global.innerWidth = 375;
    });

    it('renders all footer sections stacked vertically', () => {
      render(<Footer />);
      expect(screen.getByText('Company Overview')).toBeInTheDocument();
      expect(screen.getByText('Services')).toBeInTheDocument();
      expect(screen.getByText('Useful Tools')).toBeInTheDocument();
      expect(screen.getByText('Help')).toBeInTheDocument();
    });

    it('uses accordion pattern for mobile sections', () => {
      // Test collapsible sections on mobile
    });

    it('renders copyright notice', () => {
      // Test © 2025 Sea Shipping Line
    });

    it('renders designer credit', () => {
      // Test Cretiv D/zine link
    });
  });

  describe('Desktop View (>= 768px)', () => {
    it('renders footer in multi-column grid', () => {
      // Test 4-column layout
    });

    it('all sections expanded by default', () => {
      // Test no accordion on desktop
    });
  });

  describe('Navigation Links', () => {
    it('renders company overview links', () => {
      const links = ['About', 'News', 'Newsletters', 'Contact'];
      // Test all links present
    });

    it('renders all service type links', () => {
      const services = [
        'Ocean Freight',
        'Automobiles',
        'Household Goods',
        'Oversize Cargo',
        'Project Cargo',
        'Hazardous Materials',
        'Refrigerated Cargo'
      ];
      // Test all service links
    });

    it('renders useful tools links', () => {
      const tools = ['Forms', 'Trade Tools', 'ExportFile'];
      // Test all tool links
    });

    it('renders help section links', () => {
      const help = ['Tracking', 'Scheduling', 'Carriers'];
      // Test all help links
    });
  });

  describe('Social Media', () => {
    it('renders social media icons', () => {
      // Test Facebook, Twitter/X, LinkedIn icons
    });

    it('social icons link to correct URLs', () => {
      // Test href attributes
    });

    it('social icons have correct aria-labels', () => {
      // Test screen reader labels
    });
  });

  describe('Legal Information', () => {
    it('renders terms and conditions link', () => {
      // Test T&C link
    });

    it('renders privacy policy link', () => {
      // Test privacy link (if exists)
    });

    it('renders copyright notice with current year', () => {
      const year = new Date().getFullYear();
      // Test copyright includes current year
    });
  });

  describe('Regulatory Information', () => {
    it('displays all required credentials', () => {
      const credentials = [
        'OTI#: 010787',
        'SCAC: AAGP',
        'SVI#: ASACON03285',
        'DOT#: 3978374',
        'MC#: 1488768',
        'Customs Filer Code: DBK'
      ];
      // Test all credentials visible
    });

    it('displays C-TPAT certification', () => {
      // Test C-TPAT badge or text
    });
  });

  describe('Accessibility', () => {
    it('footer has correct semantic HTML', () => {
      const { container } = render(<Footer />);
      expect(container.querySelector('footer')).toBeInTheDocument();
    });

    it('all links are keyboard accessible', () => {
      // Test tab navigation through footer
    });

    it('has no accessibility violations', async () => {
      const { container } = render(<Footer />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
```

### 2. Run Tests (Fail)
- Verify all tests fail
- Confirm test setup is correct

### 3. Implement Footer Component

```typescript
// src/components/layout/Footer.tsx
import Link from 'next/link'
import { Facebook, Twitter, Linkedin } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const footerSections = {
  companyOverview: {
    title: 'Company Overview',
    links: [
      { name: 'About', href: '/about' },
      { name: 'News', href: '/news' },
      { name: 'Newsletters', href: '/news/newsletters' },
      { name: 'Contact', href: '/request' },
    ]
  },
  services: {
    title: 'Services',
    links: [
      { name: 'Ocean Freight (FCL & LCL)', href: '/services/ocean-freight' },
      { name: 'Automobiles', href: '/services/automobiles' },
      { name: 'Household Goods', href: '/services/household-goods' },
      { name: 'Oversize Cargo', href: '/services/oversize-cargo' },
      { name: 'Project Cargo', href: '/services/project-cargo' },
      { name: 'Hazardous Materials', href: '/services/hazardous-materials' },
      { name: 'Refrigerated Cargo', href: '/services/refrigerated-cargo' },
    ]
  },
  tools: {
    title: 'Useful Tools',
    links: [
      { name: 'Forms', href: '/resources#forms' },
      { name: 'Trade Tools', href: '/resources#tools' },
      { name: 'ExportFile', href: 'https://exportfile.com', external: true },
    ]
  },
  help: {
    title: 'Help',
    links: [
      { name: 'Track & Trace', href: '/help/tracking' },
      { name: 'Carrier Scheduling', href: '/help/scheduling' },
      { name: 'Carriers Serving USA', href: '/help/carriers' },
    ]
  }
}

const credentials = [
  'OTI#: 010787',
  'SCAC: AAGP',
  'SVI#: ASACON03285',
  'DOT#: 3978374',
  'MC#: 1488768',
  'Customs Filer Code: DBK'
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Mobile: Accordion, Desktop: Grid */}
        <div className="md:hidden">
          <Accordion type="multiple">
            {/* Mobile accordion sections */}
          </Accordion>
        </div>

        <div className="hidden md:grid md:grid-cols-4 gap-8">
          {/* Desktop grid sections */}
        </div>

        {/* Regulatory Information */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            {credentials.map((cred) => (
              <span key={cred}>{cred}</span>
            ))}
          </div>
          <p className="mt-4 text-sm">C-TPAT Certified</p>
        </div>

        {/* Social Media */}
        <div className="mt-8 flex justify-center space-x-6">
          <a href="https://facebook.com/..." aria-label="Facebook">
            <Facebook />
          </a>
          <a href="https://twitter.com/..." aria-label="Twitter">
            <Twitter />
          </a>
          <a href="https://linkedin.com/..." aria-label="LinkedIn">
            <Linkedin />
          </a>
        </div>

        {/* Legal & Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <div className="space-x-4">
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
          <p className="mt-4">© {currentYear} Sea Shipping Line. All rights reserved.</p>
          <p className="mt-2">
            Website by <a href="https://cretivdzine.com" className="underline">Cretiv D/zine</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
```

### 4. Run Tests (Pass)
- Verify all tests pass
- Check coverage (90%+ target)

### 5. Refactor
- Extract sections into separate components if needed
- Optimize data structures
- Ensure tests still pass

### 6. Visual & E2E Testing
```typescript
// __tests__/e2e/visual/footer.spec.ts
test('footer renders correctly on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  await page.locator('footer').scrollIntoViewIfNeeded();
  await expect(page.locator('footer')).toHaveScreenshot('footer-mobile.png');
});

test('footer renders correctly on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/');
  await expect(page.locator('footer')).toHaveScreenshot('footer-desktop.png');
});
```

## Testing Requirements
- 90%+ unit test coverage
- All links tested
- Mobile accordion behavior tested
- Desktop grid layout tested
- Social media links tested
- Accessibility verified
- Visual regression tests

## Acceptance Criteria
- ✅ Tests written first (TDD)
- ✅ All unit tests passing (90%+ coverage)
- ✅ Mobile accordion pattern works
- ✅ Desktop multi-column grid works
- ✅ All navigation links functional
- ✅ All regulatory credentials displayed
- ✅ Social media links working
- ✅ Legal information displayed
- ✅ Copyright includes current year
- ✅ Designer credit link works
- ✅ Zero accessibility violations
- ✅ Visual tests passing
- ✅ Component documented

## Notes
- Use Accordion component from shadcn/ui for mobile
- Ensure all external links open in new tab
- Maintain consistent spacing with design system
- Footer should be semantic <footer> element
