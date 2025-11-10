---
id: 025
title: Create Help - Tracking Page
phase: 3
priority: high
status: todo
dependencies: [006, 007, 008]
estimated_hours: 6
tags: [pages, help-section, tracking, content-migration, mobile-first, tdd]
---

# Create Help - Tracking Page

## Objective
Build the Track & Trace page at `/help/tracking` that provides links to carrier tracking systems for customers to monitor their shipments. This page is linked from the footer navigation and is currently broken.

## Requirements

### Content Requirements
- Page title: "Track & Trace Your Shipment"
- Introduction explaining tracking functionality
- Instruction to have "carrier and container number" ready (from bill of lading or customer service)
- Links to 17+ major carrier tracking portals
- Grouped carriers: Major carriers and additional carriers
- Disclaimer about external links and Sea Shipping Line's non-responsibility
- Mobile-friendly layout with easy-to-tap tracking links

### Major Carriers (Primary Section)
1. **Atlantic Container Line** - https://www.aclcargo.com/track/
2. **American President Lines (APL)** - https://www.apl.com/tracking
3. **CMA CGM** - https://www.cma-cgm.com/ebusiness/tracking
4. **Cosco Container Lines** - https://elines.coscoshipping.com/ebusiness/cargotracking
5. **Evergreen Line** - https://www.evergreen-line.com/en/tbn1/index.aspx
6. **Hapag-Lloyd** - https://www.hapag-lloyd.com/en/online-business/track/track-by-container.html
7. **Maersk Line** - https://www.maersk.com/tracking/
8. **Mediterranean Shipping Company (MSC)** - https://www.msc.com/track-a-shipment
9. **Ocean Network Express (O.N.E.)** - https://ecomm.one-line.com/ecom/CUP_HOM_3301.do
10. **Orient Overseas Container Line (OOCL)** - https://www.oocl.com/eng/ourservices/eservices/cargotracking/Pages/cargotracking.aspx
11. **SeaLand** - https://www.sealandmaersk.com/tracking/
12. **Yang Ming Line** - https://www.yangming.com/e-service/track_trace/track_trace_cargo_tracking.aspx
13. **ZIM Integrated Shipping Services** - https://www.zim.com/tools/track-a-shipment

### Additional Carriers (Secondary Section)
- **Bahri** - https://www.bahri.sa/en/tracking
- **Crowley** - https://www.crowley.com/services/tools/cargo-tracking/
- **CU Lines** - https://www.culines.com/
- **Hyundai Merchant Marine (HMM)** - https://www.hmm21.com/e-service/general/trackTrace.do
- **Marfret** - https://www.marfret.com/en/e-services/tracking
- **Matson** - https://www.matson.com/shipment-tracking.html
- **SM Line** - https://www.smlines.com/

### UI/UX Requirements
- Hero section with page title and icon (Compass or Navigation icon)
- Instructions card with clear guidance
- Carrier cards with:
  - Carrier logo (if available)
  - Carrier name (prominent)
  - Direct "Track Shipment" button/link
  - Opens in new tab with `rel="noopener noreferrer"`
- Grouping: "Major Carriers" and "Additional Carriers" sections
- Search/filter functionality (optional enhancement)
- Responsive grid layout:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3 columns
- Disclaimer footer section

### Technical Requirements
- Server-side rendered page (app router)
- SEO optimized with proper meta tags
- Semantic HTML structure
- Accessible link labels
- External link icons
- Fast page load (<1s)
- Mobile-first responsive design

## Implementation Steps (TDD Approach)

### 1. Write Tests First

```typescript
// __tests__/unit/app/help/tracking/page.test.tsx
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import TrackingPage from '@/app/help/tracking/page'

describe('TrackingPage', () => {
  describe('Content', () => {
    it('renders page title', () => {
      render(<TrackingPage />)
      expect(screen.getByRole('heading', { name: /track & trace/i, level: 1 })).toBeInTheDocument()
    })

    it('renders instructions about having carrier and container number', () => {
      render(<TrackingPage />)
      expect(screen.getByText(/carrier and container number/i)).toBeInTheDocument()
      expect(screen.getByText(/bill of lading/i)).toBeInTheDocument()
    })

    it('renders disclaimer about external links', () => {
      render(<TrackingPage />)
      expect(screen.getByText(/provided as a convenience/i)).toBeInTheDocument()
      expect(screen.getByText(/informational purposes only/i)).toBeInTheDocument()
    })
  })

  describe('Major Carriers Section', () => {
    it('renders major carriers section heading', () => {
      render(<TrackingPage />)
      expect(screen.getByRole('heading', { name: /major carriers/i })).toBeInTheDocument()
    })

    it('renders all 13 major carrier links', () => {
      render(<TrackingPage />)
      const majorCarriers = [
        'Atlantic Container Line',
        'American President Lines',
        'CMA CGM',
        'Cosco Container Lines',
        'Evergreen Line',
        'Hapag-Lloyd',
        'Maersk Line',
        'Mediterranean Shipping Company',
        'Ocean Network Express',
        'Orient Overseas Container Line',
        'SeaLand',
        'Yang Ming Line',
        'ZIM Integrated Shipping Services'
      ]

      majorCarriers.forEach(carrier => {
        expect(screen.getByText(new RegExp(carrier, 'i'))).toBeInTheDocument()
      })
    })

    it('all major carrier links have correct href attributes', () => {
      render(<TrackingPage />)

      const expectedLinks = {
        'Atlantic Container Line': 'https://www.aclcargo.com/track/',
        'Maersk Line': 'https://www.maersk.com/tracking/',
        'CMA CGM': 'https://www.cma-cgm.com/ebusiness/tracking'
      }

      Object.entries(expectedLinks).forEach(([carrier, url]) => {
        const link = screen.getByRole('link', { name: new RegExp(carrier, 'i') })
        expect(link).toHaveAttribute('href', url)
      })
    })

    it('all major carrier links open in new tab', () => {
      render(<TrackingPage />)
      const links = screen.getAllByRole('link')

      links.forEach(link => {
        const href = link.getAttribute('href')
        if (href?.startsWith('http')) {
          expect(link).toHaveAttribute('target', '_blank')
          expect(link).toHaveAttribute('rel', 'noopener noreferrer')
        }
      })
    })
  })

  describe('Additional Carriers Section', () => {
    it('renders additional carriers section heading', () => {
      render(<TrackingPage />)
      expect(screen.getByRole('heading', { name: /additional carriers/i })).toBeInTheDocument()
    })

    it('renders all additional carrier links', () => {
      render(<TrackingPage />)
      const additionalCarriers = [
        'Bahri',
        'Crowley',
        'CU Lines',
        'Hyundai Merchant Marine',
        'Marfret',
        'Matson',
        'SM Line'
      ]

      additionalCarriers.forEach(carrier => {
        expect(screen.getByText(new RegExp(carrier, 'i'))).toBeInTheDocument()
      })
    })
  })

  describe('Responsive Layout', () => {
    it('renders carrier cards in grid layout', () => {
      const { container } = render(<TrackingPage />)
      const gridContainer = container.querySelector('[class*="grid"]')
      expect(gridContainer).toBeInTheDocument()
    })

    it('has mobile-first responsive classes', () => {
      const { container } = render(<TrackingPage />)
      const gridContainer = container.querySelector('[class*="grid-cols"]')
      expect(gridContainer?.className).toMatch(/grid-cols-1|md:grid-cols-2|lg:grid-cols-3/)
    })
  })

  describe('Accessibility', () => {
    it('uses semantic HTML structure', () => {
      const { container } = render(<TrackingPage />)
      expect(container.querySelector('main')).toBeInTheDocument()
      expect(container.querySelector('h1')).toBeInTheDocument()
    })

    it('all links have descriptive text or aria-labels', () => {
      render(<TrackingPage />)
      const links = screen.getAllByRole('link')

      links.forEach(link => {
        const hasText = link.textContent && link.textContent.trim().length > 0
        const hasAriaLabel = link.getAttribute('aria-label')
        expect(hasText || hasAriaLabel).toBeTruthy()
      })
    })

    it('has no accessibility violations', async () => {
      const { container } = render(<TrackingPage />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('SEO', () => {
    it('generates proper metadata', async () => {
      const metadata = await import('@/app/help/tracking/page').then(m => m.metadata)

      expect(metadata.title).toContain('Track & Trace')
      expect(metadata.description).toBeDefined()
      expect(metadata.description.length).toBeGreaterThan(50)
      expect(metadata.description.length).toBeLessThan(160)
    })
  })
})
```

### 2. Create Carrier Data Constants

```typescript
// src/lib/carriers.ts
export interface Carrier {
  name: string
  shortName?: string
  trackingUrl: string
  description?: string
  logo?: string
}

export const MAJOR_CARRIERS: Carrier[] = [
  {
    name: 'Atlantic Container Line',
    shortName: 'ACL',
    trackingUrl: 'https://www.aclcargo.com/track/',
    description: 'RoRo and container services'
  },
  {
    name: 'American President Lines',
    shortName: 'APL',
    trackingUrl: 'https://www.apl.com/tracking',
  },
  {
    name: 'CMA CGM',
    trackingUrl: 'https://www.cma-cgm.com/ebusiness/tracking',
  },
  // ... all 13 major carriers
]

export const ADDITIONAL_CARRIERS: Carrier[] = [
  {
    name: 'Bahri',
    trackingUrl: 'https://www.bahri.sa/en/tracking',
  },
  // ... all 7 additional carriers
]
```

### 3. Create Carrier Card Component

```typescript
// src/components/carriers/CarrierCard.tsx
'use client'

import { ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Carrier } from '@/lib/carriers'

interface CarrierCardProps {
  carrier: Carrier
}

export function CarrierCard({ carrier }: CarrierCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          {carrier.name}
          {carrier.shortName && (
            <span className="text-sm text-gray-500">({carrier.shortName})</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {carrier.description && (
          <p className="text-sm text-gray-600 mb-4">{carrier.description}</p>
        )}
        <Button
          asChild
          className="w-full"
          style={{ backgroundColor: '#ee1c23' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d11820'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ee1c23'}
        >
          <a
            href={carrier.trackingUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Track shipment with ${carrier.name}`}
          >
            Track Shipment <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
```

### 4. Implement Tracking Page

```typescript
// src/app/help/tracking/page.tsx
import { Metadata } from 'next'
import { Compass, Info } from 'lucide-react'
import { CarrierCard } from '@/components/carriers/CarrierCard'
import { MAJOR_CARRIERS, ADDITIONAL_CARRIERS } from '@/lib/carriers'
import { Alert, AlertDescription } from '@/components/ui/alert'

export const metadata: Metadata = {
  title: 'Track & Trace Your Shipment | Sea Shipping Line',
  description: 'Track your ocean freight shipment with our partner carriers. Access tracking portals for Maersk, MSC, CMA CGM, Hapag-Lloyd, and 17+ major ocean carriers.',
  openGraph: {
    title: 'Track & Trace Your Shipment | Sea Shipping Line',
    description: 'Track your ocean freight shipment with major carrier tracking systems.',
  }
}

export default function TrackingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Compass className="h-12 w-12" style={{ color: '#ee1c23' }} />
            <h1 className="text-4xl md:text-5xl font-bold">Track & Trace Your Shipment</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl">
            Monitor your cargo in real-time with our partner carriers' tracking systems
          </p>
        </div>
      </section>

      {/* Instructions Section */}
      <section className="container mx-auto px-4 py-8">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Before tracking:</strong> Have your <strong>carrier name and container number</strong> ready.
            You can find this information on your bill of lading or by contacting Sea Shipping Line customer service.
          </AlertDescription>
        </Alert>
      </section>

      {/* Major Carriers Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Major Carriers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MAJOR_CARRIERS.map((carrier) => (
            <CarrierCard key={carrier.name} carrier={carrier} />
          ))}
        </div>
      </section>

      {/* Additional Carriers Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Additional Carriers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ADDITIONAL_CARRIERS.map((carrier) => (
            <CarrierCard key={carrier.name} carrier={carrier} />
          ))}
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="container mx-auto px-4 py-8">
        <Alert variant="default" className="bg-gray-100">
          <AlertDescription className="text-sm text-gray-600">
            <strong>Disclaimer:</strong> These carrier tracking links are provided as a convenience and for
            informational purposes only. Sea Shipping Line assumes no responsibility for the content,
            accuracy, or availability of external carrier websites and tracking systems.
          </AlertDescription>
        </Alert>
      </section>
    </main>
  )
}
```

### 5. Run Tests (Pass)
- Verify all unit tests pass
- Check 85%+ coverage for page component
- Verify accessibility with axe-core

### 6. Visual & E2E Testing

```typescript
// __tests__/e2e/help/tracking.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Tracking Page', () => {
  test('renders tracking page correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/help/tracking')

    await expect(page.getByRole('heading', { name: /track & trace/i })).toBeVisible()
    await expect(page.locator('.grid')).toBeVisible()
  })

  test('all carrier links are clickable and open in new tab', async ({ page, context }) => {
    await page.goto('/help/tracking')

    const firstCarrierLink = page.getByRole('link', { name: /atlantic container line/i })

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      firstCarrierLink.click()
    ])

    expect(newPage.url()).toContain('aclcargo.com')
  })

  test('visual regression test', async ({ page }) => {
    await page.goto('/help/tracking')
    await expect(page).toHaveScreenshot('tracking-page.png', { fullPage: true })
  })
})
```

## Testing Requirements
- 85%+ unit test coverage
- All carrier links tested
- Accessibility verification (zero violations)
- External link behavior tested
- Responsive layout tested (mobile, tablet, desktop)
- Visual regression tests
- E2E test for critical user journey

## Acceptance Criteria
- ✅ Page accessible at `/help/tracking`
- ✅ All 20 carrier tracking links working
- ✅ Links open in new tab with proper security attributes
- ✅ Mobile-responsive grid layout (1/2/3 columns)
- ✅ Instructions clearly displayed
- ✅ Disclaimer section present
- ✅ SEO metadata optimized
- ✅ Zero accessibility violations
- ✅ Tests passing (85%+ coverage)
- ✅ Visual regression tests passing
- ✅ Page load time <1s
- ✅ Footer link to `/help/tracking` working

## Notes

### Content Source
Content migrated from v1 WordPress site resources page tracking section.

### Design Considerations
- Use card-based layout for carriers (easier to scan)
- Red CTA buttons for "Track Shipment" actions
- Clear visual hierarchy: Major carriers before Additional carriers
- Mobile-first: Stack cards vertically on small screens
- Consider adding carrier logos if bandwidth allows

### Future Enhancements (Not in scope)
- Search/filter carriers by name
- Recently used carriers (localStorage)
- Direct tracking form (embedded in page)
- Carrier status indicators (API health checks)

### External Dependencies
- All carrier tracking URLs must be verified and updated regularly
- No API integrations required (direct links only)
- Carrier logos optional (can be added later)

### Maintenance
- Verify carrier tracking URLs quarterly
- Update carrier list as partnerships change
- Monitor broken links via automated checks
