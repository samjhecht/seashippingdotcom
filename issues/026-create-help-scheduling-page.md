---
id: 026
title: Create Help - Scheduling Page
phase: 3
priority: high
status: todo
dependencies: [006, 007, 008, 025]
estimated_hours: 5
tags: [pages, help-section, scheduling, content-migration, mobile-first, tdd]
---

# Create Help - Scheduling Page

## Objective
Build the Carrier Scheduling page at `/help/scheduling` that provides direct links to contract carrier scheduling systems. This page enables customers to check vessel schedules, sailing dates, and port rotation information. Currently linked from footer but page does not exist.

## Requirements

### Content Requirements
- Page title: "Carrier Scheduling"
- Introduction explaining scheduling functionality and what customers need
- Instruction to have "carrier name" ready from bill of lading or customer service
- Links to 17+ major carrier scheduling portals
- Grouped carriers: Major carriers and additional carriers (same as tracking page)
- Disclaimer about external links
- Explanation of what scheduling information is available (sailing dates, port rotations, vessel schedules)

### Major Carriers (Primary Section)
Same 13 carriers as tracking page, but with scheduling URLs:
1. **Atlantic Container Line** - https://www.aclcargo.com/schedules/
2. **American President Lines (APL)** - https://www.apl.com/schedules
3. **CMA CGM** - https://www.cma-cgm.com/ebusiness/schedules
4. **Cosco Container Lines** - https://elines.coscoshipping.com/ebusiness/schedulesearch
5. **Evergreen Line** - https://www.evergreen-line.com/en/schedule/quick_search/index.aspx
6. **Hapag-Lloyd** - https://www.hapag-lloyd.com/en/online-business/schedules.html
7. **Maersk Line** - https://www.maersk.com/schedules/
8. **Mediterranean Shipping Company (MSC)** - https://www.msc.com/schedules
9. **Ocean Network Express (O.N.E.)** - https://ecomm.one-line.com/ecom/CUP_HOM_3301GS.do
10. **Orient Overseas Container Line (OOCL)** - https://www.oocl.com/eng/ourservices/eservices/cargotracking/Pages/schedulebyvessel.aspx
11. **SeaLand** - https://www.sealandmaersk.com/schedules/
12. **Yang Ming Line** - https://www.yangming.com/e-service/schedule/point_to_point.aspx
13. **ZIM Integrated Shipping Services** - https://www.zim.com/schedules

### Additional Carriers (Secondary Section)
Same 7 additional carriers with scheduling URLs:
- **Bahri** - https://www.bahri.sa/en/schedules
- **Crowley** - https://www.crowley.com/services/tools/liner-schedules/
- **CU Lines** - https://www.culines.com/schedules/
- **Hyundai Merchant Marine (HMM)** - https://www.hmm21.com/e-service/general/schedule.do
- **Marfret** - https://www.marfret.com/en/e-services/schedules
- **Matson** - https://www.matson.com/shipment-schedules.html
- **SM Line** - https://www.smlines.com/schedules/

### UI/UX Requirements
- Hero section with page title and icon (Calendar or Ship icon)
- Information card explaining what scheduling shows:
  - Vessel sailing dates
  - Port rotation schedules
  - Transit times
  - Cutoff dates
  - Expected arrival dates
- Carrier cards with:
  - Carrier name (prominent)
  - Direct "View Schedule" button/link
  - Opens in new tab with `rel="noopener noreferrer"`
- Grouping: "Major Carriers" and "Additional Carriers" sections
- Responsive grid layout (same as tracking page):
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
- Reuse CarrierCard component from tracking page (DRY principle)

## Implementation Steps (TDD Approach)

### 1. Write Tests First

```typescript
// __tests__/unit/app/help/scheduling/page.test.tsx
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import SchedulingPage from '@/app/help/scheduling/page'

describe('SchedulingPage', () => {
  describe('Content', () => {
    it('renders page title', () => {
      render(<SchedulingPage />)
      expect(screen.getByRole('heading', { name: /carrier scheduling/i, level: 1 })).toBeInTheDocument()
    })

    it('renders explanation of scheduling information', () => {
      render(<SchedulingPage />)
      expect(screen.getByText(/vessel sailing dates/i)).toBeInTheDocument()
      expect(screen.getByText(/port rotation/i)).toBeInTheDocument()
    })

    it('renders instructions about having carrier name', () => {
      render(<SchedulingPage />)
      expect(screen.getByText(/carrier name/i)).toBeInTheDocument()
      expect(screen.getByText(/bill of lading/i)).toBeInTheDocument()
    })

    it('renders disclaimer about external links', () => {
      render(<SchedulingPage />)
      expect(screen.getByText(/provided as a convenience/i)).toBeInTheDocument()
    })
  })

  describe('Major Carriers Section', () => {
    it('renders major carriers section heading', () => {
      render(<SchedulingPage />)
      expect(screen.getByRole('heading', { name: /major carriers/i })).toBeInTheDocument()
    })

    it('renders all 13 major carrier links', () => {
      render(<SchedulingPage />)
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

    it('all major carrier links point to scheduling URLs', () => {
      render(<SchedulingPage />)

      const expectedLinks = {
        'Atlantic Container Line': 'https://www.aclcargo.com/schedules/',
        'Maersk Line': 'https://www.maersk.com/schedules/',
        'Hapag-Lloyd': 'https://www.hapag-lloyd.com/en/online-business/schedules.html'
      }

      Object.entries(expectedLinks).forEach(([carrier, url]) => {
        const link = screen.getByRole('link', { name: new RegExp(carrier, 'i') })
        expect(link).toHaveAttribute('href', url)
      })
    })

    it('all carrier links open in new tab', () => {
      render(<SchedulingPage />)
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
      render(<SchedulingPage />)
      expect(screen.getByRole('heading', { name: /additional carriers/i })).toBeInTheDocument()
    })

    it('renders all additional carrier links', () => {
      render(<SchedulingPage />)
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

  describe('Information Card', () => {
    it('explains what scheduling information includes', () => {
      render(<SchedulingPage />)

      const infoItems = [
        'Vessel sailing dates',
        'Port rotation schedules',
        'Transit times',
        'Cutoff dates',
        'Expected arrival dates'
      ]

      infoItems.forEach(item => {
        expect(screen.getByText(new RegExp(item, 'i'))).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('uses semantic HTML structure', () => {
      const { container } = render(<SchedulingPage />)
      expect(container.querySelector('main')).toBeInTheDocument()
      expect(container.querySelector('h1')).toBeInTheDocument()
    })

    it('all links have descriptive text or aria-labels', () => {
      render(<SchedulingPage />)
      const links = screen.getAllByRole('link')

      links.forEach(link => {
        const hasText = link.textContent && link.textContent.trim().length > 0
        const hasAriaLabel = link.getAttribute('aria-label')
        expect(hasText || hasAriaLabel).toBeTruthy()
      })
    })

    it('has no accessibility violations', async () => {
      const { container } = render(<SchedulingPage />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('SEO', () => {
    it('generates proper metadata', async () => {
      const metadata = await import('@/app/help/scheduling/page').then(m => m.metadata)

      expect(metadata.title).toContain('Scheduling')
      expect(metadata.description).toBeDefined()
      expect(metadata.description.length).toBeGreaterThan(50)
      expect(metadata.description.length).toBeLessThan(160)
    })
  })
})
```

### 2. Update Carrier Data Constants

```typescript
// src/lib/carriers.ts (update existing file)
export interface Carrier {
  name: string
  shortName?: string
  trackingUrl: string
  schedulingUrl: string // Add this field
  description?: string
  logo?: string
}

export const MAJOR_CARRIERS: Carrier[] = [
  {
    name: 'Atlantic Container Line',
    shortName: 'ACL',
    trackingUrl: 'https://www.aclcargo.com/track/',
    schedulingUrl: 'https://www.aclcargo.com/schedules/',
    description: 'RoRo and container services'
  },
  // ... update all 13 major carriers with schedulingUrl
]

export const ADDITIONAL_CARRIERS: Carrier[] = [
  {
    name: 'Bahri',
    trackingUrl: 'https://www.bahri.sa/en/tracking',
    schedulingUrl: 'https://www.bahri.sa/en/schedules',
  },
  // ... update all 7 additional carriers with schedulingUrl
]
```

### 3. Update CarrierCard Component (Optional Enhancement)

```typescript
// src/components/carriers/CarrierCard.tsx
'use client'

import { ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Carrier } from '@/lib/carriers'

interface CarrierCardProps {
  carrier: Carrier
  linkType?: 'tracking' | 'scheduling' // Add this prop
}

export function CarrierCard({ carrier, linkType = 'tracking' }: CarrierCardProps) {
  const url = linkType === 'tracking' ? carrier.trackingUrl : carrier.schedulingUrl
  const buttonText = linkType === 'tracking' ? 'Track Shipment' : 'View Schedule'
  const ariaLabel = linkType === 'tracking'
    ? `Track shipment with ${carrier.name}`
    : `View schedule for ${carrier.name}`

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
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
          >
            {buttonText} <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
```

### 4. Implement Scheduling Page

```typescript
// src/app/help/scheduling/page.tsx
import { Metadata } from 'next'
import { Calendar, Info, Ship } from 'lucide-react'
import { CarrierCard } from '@/components/carriers/CarrierCard'
import { MAJOR_CARRIERS, ADDITIONAL_CARRIERS } from '@/lib/carriers'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Carrier Scheduling | Sea Shipping Line',
  description: 'Access vessel schedules, sailing dates, and port rotations for Maersk, MSC, CMA CGM, Hapag-Lloyd, and 17+ major ocean carriers. Check cutoff dates and transit times.',
  openGraph: {
    title: 'Carrier Scheduling | Sea Shipping Line',
    description: 'View carrier schedules, vessel sailing dates, and port rotation information.',
  }
}

export default function SchedulingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Calendar className="h-12 w-12" style={{ color: '#ee1c23' }} />
            <h1 className="text-4xl md:text-5xl font-bold">Carrier Scheduling</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl">
            Access vessel schedules, sailing dates, and port rotations for all major ocean carriers
          </p>
        </div>
      </section>

      {/* Information Section */}
      <section className="container mx-auto px-4 py-8">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Ship className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-3">What Scheduling Information Includes:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Vessel sailing dates</strong> - When ships depart from origin ports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Port rotation schedules</strong> - Which ports the vessel will call at</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Transit times</strong> - Estimated duration between ports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Cutoff dates</strong> - Last date to deliver cargo for specific sailing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span><strong>Expected arrival dates</strong> - Estimated time of arrival at destination</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Instructions Section */}
      <section className="container mx-auto px-4 py-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Before checking schedules:</strong> Know your <strong>carrier name</strong> and desired
            route (origin and destination ports). This information can be found on your bill of lading or
            by contacting Sea Shipping Line customer service.
          </AlertDescription>
        </Alert>
      </section>

      {/* Major Carriers Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Major Carriers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MAJOR_CARRIERS.map((carrier) => (
            <CarrierCard key={carrier.name} carrier={carrier} linkType="scheduling" />
          ))}
        </div>
      </section>

      {/* Additional Carriers Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Additional Carriers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ADDITIONAL_CARRIERS.map((carrier) => (
            <CarrierCard key={carrier.name} carrier={carrier} linkType="scheduling" />
          ))}
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="container mx-auto px-4 py-8">
        <Alert variant="default" className="bg-gray-100">
          <AlertDescription className="text-sm text-gray-600">
            <strong>Disclaimer:</strong> These carrier scheduling links are provided as a convenience and for
            informational purposes only. Schedules are subject to change without notice. Sea Shipping Line
            assumes no responsibility for the content, accuracy, or availability of external carrier websites.
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
// __tests__/e2e/help/scheduling.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Scheduling Page', () => {
  test('renders scheduling page correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/help/scheduling')

    await expect(page.getByRole('heading', { name: /carrier scheduling/i })).toBeVisible()
    await expect(page.getByText(/vessel sailing dates/i)).toBeVisible()
  })

  test('information card explains scheduling details', async ({ page }) => {
    await page.goto('/help/scheduling')

    await expect(page.getByText(/port rotation schedules/i)).toBeVisible()
    await expect(page.getByText(/transit times/i)).toBeVisible()
    await expect(page.getByText(/cutoff dates/i)).toBeVisible()
  })

  test('all carrier links are clickable and open in new tab', async ({ page, context }) => {
    await page.goto('/help/scheduling')

    const firstCarrierLink = page.getByRole('link', { name: /atlantic container line/i })

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      firstCarrierLink.click()
    ])

    expect(newPage.url()).toContain('aclcargo.com')
  })

  test('visual regression test', async ({ page }) => {
    await page.goto('/help/scheduling')
    await expect(page).toHaveScreenshot('scheduling-page.png', { fullPage: true })
  })
})
```

## Testing Requirements
- 85%+ unit test coverage
- All carrier scheduling links tested
- Accessibility verification (zero violations)
- External link behavior tested
- Responsive layout tested (mobile, tablet, desktop)
- Visual regression tests
- E2E test for critical user journey
- Information card content tested

## Acceptance Criteria
- ✅ Page accessible at `/help/scheduling`
- ✅ All 20 carrier scheduling links working
- ✅ Links open in new tab with proper security attributes
- ✅ Mobile-responsive grid layout (1/2/3 columns)
- ✅ Information card explains scheduling data
- ✅ Instructions clearly displayed
- ✅ Disclaimer section present
- ✅ SEO metadata optimized
- ✅ Zero accessibility violations
- ✅ Tests passing (85%+ coverage)
- ✅ Visual regression tests passing
- ✅ Page load time <1s
- ✅ Footer link to `/help/scheduling` working
- ✅ CarrierCard component reused (DRY principle)

## Notes

### Content Source
Content migrated from v1 WordPress site resources page scheduling section.

### Design Considerations
- Reuse card-based layout from tracking page (consistency)
- Add information card explaining what scheduling shows (educational)
- Differentiate from tracking page with Calendar icon (instead of Compass)
- Blue information card to distinguish from warnings/alerts
- Same responsive grid system as tracking page

### Shared Component
The CarrierCard component is shared between tracking and scheduling pages:
- Single source of truth for carrier data
- DRY principle (Don't Repeat Yourself)
- Easier maintenance when carrier URLs change
- Consistent UI/UX across help section

### Future Enhancements (Not in scope)
- Embedded schedule search tool
- Direct API integration with carrier schedules
- Schedule change notifications
- Personalized schedule tracking

### External Dependencies
- All carrier scheduling URLs must be verified
- Schedules are subject to change by carriers
- No API integrations required (direct links only)

### Maintenance
- Verify carrier scheduling URLs quarterly
- Update carrier list as partnerships change
- Monitor broken links via automated checks
- Keep scheduling information card updated
