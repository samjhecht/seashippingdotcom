---
id: 027
title: Create Help - Carriers Page
phase: 3
priority: high
status: todo
dependencies: [006, 007, 008, 025]
estimated_hours: 6
tags: [pages, help-section, carriers-directory, content-migration, mobile-first, tdd]
---

# Create Help - Carriers Page

## Objective
Build the Carriers Serving USA page at `/help/carriers` that provides a comprehensive directory of ocean carriers serving the United States. This resource page helps customers understand which carriers are available and link to their official websites. Currently linked from footer but page does not exist.

## Requirements

### Content Requirements
- Page title: "Carriers Serving the United States"
- Introduction explaining the carrier directory purpose
- Directory of major carriers serving USA (13 carriers from previous pages)
- Additional carriers section (7 carriers from previous pages)
- Other U.S. carriers section (new carriers not in tracking/scheduling)
- Each carrier listing should include:
  - Carrier name and abbreviation
  - Brief description (1-2 sentences)
  - Link to carrier's official website
  - Services offered (if notable: FCL, LCL, RoRo, etc.)
- Disclaimer about carrier directory
- Note that Sea Shipping Line works with all major carriers

### Major Carriers (Primary Section)
Same 13 carriers as tracking/scheduling pages, with company website URLs:
1. **Atlantic Container Line (ACL)** - https://www.aclcargo.com/
   - Specializing in RoRo and container services
2. **American President Lines (APL)** - https://www.apl.com/
   - Global container shipping services
3. **CMA CGM** - https://www.cma-cgm.com/
   - Leading worldwide shipping group
4. **Cosco Container Lines** - https://www.coscoshipping.com/
   - Chinese state-owned shipping company
5. **Evergreen Line** - https://www.evergreen-line.com/
   - Taiwan-based containerized-freight services
6. **Hapag-Lloyd** - https://www.hapag-lloyd.com/
   - German international shipping company
7. **Maersk Line** - https://www.maersk.com/
   - World's largest container shipping company
8. **Mediterranean Shipping Company (MSC)** - https://www.msc.com/
   - World's second-largest container shipping line
9. **Ocean Network Express (O.N.E.)** - https://www.one-line.com/
   - Japanese container shipping company
10. **Orient Overseas Container Line (OOCL)** - https://www.oocl.com/
    - Hong Kong-based container transport and logistics
11. **SeaLand** - https://www.sealandmaersk.com/
    - Maersk's Americas-focused brand
12. **Yang Ming Line** - https://www.yangming.com/
    - Taiwan-based international carrier
13. **ZIM Integrated Shipping Services** - https://www.zim.com/
    - Israeli international cargo shipping company

### Additional Carriers (Secondary Section)
Same 7 carriers with descriptions:
- **Bahri** - https://www.bahri.sa/ - Saudi Arabia's national shipping carrier
- **Crowley** - https://www.crowley.com/ - U.S.-based shipping and logistics services
- **CU Lines** - https://www.culines.com/ - South Korean shipping company
- **Hyundai Merchant Marine (HMM)** - https://www.hmm21.com/ - South Korean container carrier
- **Marfret** - https://www.marfret.com/ - French container shipping company
- **Matson** - https://www.matson.com/ - U.S. carrier specializing in Pacific routes
- **SM Line** - https://www.smlines.com/ - South Korean shipping line

### Other U.S. Carriers (Tertiary Section)
Additional carriers from v1 site:
- **Antillean Marine** - Caribbean shipping services
- **Aliança** - Brazilian container shipping (Hamburg Süd subsidiary)
- **Eimskip** - Iceland-based North Atlantic services
- **Great White Fleet** - Central America shipping services
- **Tropical Shipping** - Caribbean and Bahamas specialist
- **Höegh Autoliners** - RoRo and vehicle shipping
- **Wallenius Wilhelmsen** - Vehicle and RoRo shipping
- **K-Line** - Japanese shipping company
- **NYK Line** - Nippon Yusen Kabushiki Kaisha (Japan)
- **MOL** - Mitsui O.S.K. Lines (Japan)

### UI/UX Requirements
- Hero section with page title and icon (Ship or Anchor icon)
- Introduction card explaining the directory
- Carrier directory with three sections:
  - Major Carriers
  - Additional Carriers
  - Other U.S. Carriers
- Each carrier displayed as a list item or card with:
  - Carrier name (prominent)
  - Abbreviation (if applicable)
  - Brief description
  - "Visit Website" button/link
  - External link icon
  - Opens in new tab
- Search/filter functionality (optional enhancement)
- Alphabetical sorting option
- Mobile-optimized list/card layout
- Disclaimer footer section

### Technical Requirements
- Server-side rendered page (app router)
- SEO optimized with proper meta tags
- Semantic HTML structure (dl/dt/dd or article elements)
- Accessible link labels
- External link icons
- Fast page load (<1s)
- Mobile-first responsive design
- Structured data for better SEO (optional)

## Implementation Steps (TDD Approach)

### 1. Write Tests First

```typescript
// __tests__/unit/app/help/carriers/page.test.tsx
import { render, screen, within } from '@testing-library/react'
import { axe } from 'jest-axe'
import CarriersPage from '@/app/help/carriers/page'

describe('CarriersPage', () => {
  describe('Content', () => {
    it('renders page title', () => {
      render(<CarriersPage />)
      expect(screen.getByRole('heading', {
        name: /carriers serving.*united states/i,
        level: 1
      })).toBeInTheDocument()
    })

    it('renders introduction explaining directory purpose', () => {
      render(<CarriersPage />)
      expect(screen.getByText(/directory/i)).toBeInTheDocument()
      expect(screen.getByText(/ocean carriers/i)).toBeInTheDocument()
    })

    it('renders note about working with all major carriers', () => {
      render(<CarriersPage />)
      expect(screen.getByText(/sea shipping line.*works with/i)).toBeInTheDocument()
    })

    it('renders disclaimer about carrier directory', () => {
      render(<CarriersPage />)
      expect(screen.getByText(/provided as a convenience/i)).toBeInTheDocument()
    })
  })

  describe('Major Carriers Section', () => {
    it('renders major carriers section heading', () => {
      render(<CarriersPage />)
      expect(screen.getByRole('heading', { name: /major carriers/i })).toBeInTheDocument()
    })

    it('renders all 13 major carriers', () => {
      render(<CarriersPage />)
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

    it('each major carrier has description', () => {
      render(<CarriersPage />)

      // Test a few carrier descriptions
      expect(screen.getByText(/world's largest container shipping/i)).toBeInTheDocument() // Maersk
      expect(screen.getByText(/specializing in roro/i)).toBeInTheDocument() // ACL
      expect(screen.getByText(/leading worldwide shipping group/i)).toBeInTheDocument() // CMA CGM
    })

    it('all major carriers link to company website', () => {
      render(<CarriersPage />)

      const expectedLinks = {
        'Maersk Line': 'https://www.maersk.com/',
        'MSC': 'https://www.msc.com/',
        'Hapag-Lloyd': 'https://www.hapag-lloyd.com/'
      }

      Object.entries(expectedLinks).forEach(([carrier, url]) => {
        const links = screen.getAllByRole('link')
        const carrierLink = links.find(link =>
          link.textContent?.includes(carrier) ||
          link.getAttribute('aria-label')?.includes(carrier)
        )
        expect(carrierLink).toHaveAttribute('href', url)
      })
    })
  })

  describe('Additional Carriers Section', () => {
    it('renders additional carriers section heading', () => {
      render(<CarriersPage />)
      expect(screen.getByRole('heading', { name: /additional carriers/i })).toBeInTheDocument()
    })

    it('renders all 7 additional carriers', () => {
      render(<CarriersPage />)
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

    it('additional carriers have descriptions', () => {
      render(<CarriersPage />)

      expect(screen.getByText(/saudi arabia.*national shipping/i)).toBeInTheDocument() // Bahri
      expect(screen.getByText(/u\.s\.-based.*shipping.*logistics/i)).toBeInTheDocument() // Crowley
    })
  })

  describe('Other U.S. Carriers Section', () => {
    it('renders other carriers section heading', () => {
      render(<CarriersPage />)
      expect(screen.getByRole('heading', { name: /other.*carriers/i })).toBeInTheDocument()
    })

    it('renders other U.S. carriers', () => {
      render(<CarriersPage />)
      const otherCarriers = [
        'Tropical Shipping',
        'Eimskip',
        'Great White Fleet',
        'Antillean Marine'
      ]

      otherCarriers.forEach(carrier => {
        expect(screen.getByText(new RegExp(carrier, 'i'))).toBeInTheDocument()
      })
    })
  })

  describe('External Links', () => {
    it('all carrier website links open in new tab', () => {
      render(<CarriersPage />)
      const links = screen.getAllByRole('link')

      links.forEach(link => {
        const href = link.getAttribute('href')
        if (href?.startsWith('http')) {
          expect(link).toHaveAttribute('target', '_blank')
          expect(link).toHaveAttribute('rel', 'noopener noreferrer')
        }
      })
    })

    it('external links have visual indicator', () => {
      render(<CarriersPage />)
      const links = screen.getAllByRole('link')

      // Check for ExternalLink icon or similar visual indicator
      links.forEach(link => {
        const href = link.getAttribute('href')
        if (href?.startsWith('http')) {
          expect(link.querySelector('svg') || link.textContent?.includes('↗')).toBeTruthy()
        }
      })
    })
  })

  describe('Accessibility', () => {
    it('uses semantic HTML structure', () => {
      const { container } = render(<CarriersPage />)
      expect(container.querySelector('main')).toBeInTheDocument()
      expect(container.querySelector('h1')).toBeInTheDocument()
    })

    it('carrier listings use proper structure (dl or article)', () => {
      const { container } = render(<CarriersPage />)
      const hasDl = container.querySelector('dl')
      const hasArticle = container.querySelector('article')
      expect(hasDl || hasArticle).toBeTruthy()
    })

    it('all links have descriptive text or aria-labels', () => {
      render(<CarriersPage />)
      const links = screen.getAllByRole('link')

      links.forEach(link => {
        const hasText = link.textContent && link.textContent.trim().length > 0
        const hasAriaLabel = link.getAttribute('aria-label')
        expect(hasText || hasAriaLabel).toBeTruthy()
      })
    })

    it('has no accessibility violations', async () => {
      const { container } = render(<CarriersPage />)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('SEO', () => {
    it('generates proper metadata', async () => {
      const metadata = await import('@/app/help/carriers/page').then(m => m.metadata)

      expect(metadata.title).toContain('Carriers')
      expect(metadata.description).toBeDefined()
      expect(metadata.description.length).toBeGreaterThan(50)
      expect(metadata.description.length).toBeLessThan(160)
    })
  })
})
```

### 2. Create Carrier Directory Data

```typescript
// src/lib/carrier-directory.ts
export interface CarrierInfo {
  name: string
  abbreviation?: string
  websiteUrl: string
  description: string
  services?: string[]
  region?: string
}

export const MAJOR_CARRIER_DIRECTORY: CarrierInfo[] = [
  {
    name: 'Atlantic Container Line',
    abbreviation: 'ACL',
    websiteUrl: 'https://www.aclcargo.com/',
    description: 'Specializing in RoRo (Roll-on/Roll-off) and container services between North America and Europe.',
    services: ['RoRo', 'FCL', 'LCL'],
  },
  {
    name: 'American President Lines',
    abbreviation: 'APL',
    websiteUrl: 'https://www.apl.com/',
    description: 'Global container shipping services with comprehensive coverage across major trade lanes.',
    services: ['FCL', 'LCL'],
  },
  {
    name: 'CMA CGM',
    websiteUrl: 'https://www.cma-cgm.com/',
    description: 'Leading worldwide shipping group providing container shipping services on all seven continents.',
    services: ['FCL', 'LCL', 'Reefer'],
  },
  // ... all 13 major carriers
]

export const ADDITIONAL_CARRIER_DIRECTORY: CarrierInfo[] = [
  {
    name: 'Bahri',
    websiteUrl: 'https://www.bahri.sa/',
    description: "Saudi Arabia's national shipping carrier providing container and bulk cargo services.",
    region: 'Middle East',
  },
  // ... all 7 additional carriers
]

export const OTHER_US_CARRIERS: CarrierInfo[] = [
  {
    name: 'Tropical Shipping',
    websiteUrl: 'https://www.tropical.com/',
    description: 'Specialist in Caribbean and Bahamas shipping services.',
    region: 'Caribbean',
  },
  {
    name: 'Antillean Marine',
    websiteUrl: 'https://www.antmar.com/',
    description: 'Caribbean shipping services provider.',
    region: 'Caribbean',
  },
  {
    name: 'Eimskip',
    websiteUrl: 'https://www.eimskip.com/',
    description: 'Iceland-based carrier specializing in North Atlantic services.',
    region: 'North Atlantic',
  },
  // ... all other U.S. carriers
]
```

### 3. Create CarrierDirectoryItem Component

```typescript
// src/components/carriers/CarrierDirectoryItem.tsx
'use client'

import { ExternalLink, Ship } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import type { CarrierInfo } from '@/lib/carrier-directory'

interface CarrierDirectoryItemProps {
  carrier: CarrierInfo
}

export function CarrierDirectoryItem({ carrier }: CarrierDirectoryItemProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-lg">
              {carrier.name}
              {carrier.abbreviation && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({carrier.abbreviation})
                </span>
              )}
            </CardTitle>
            {carrier.region && (
              <div className="text-xs text-gray-500 mt-1">{carrier.region}</div>
            )}
          </div>
          <Ship className="h-5 w-5 text-gray-400 flex-shrink-0" />
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4">
          {carrier.description}
        </CardDescription>

        {carrier.services && carrier.services.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {carrier.services.map(service => (
              <span
                key={service}
                className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-700"
              >
                {service}
              </span>
            ))}
          </div>
        )}

        <Button
          asChild
          variant="outline"
          className="w-full"
        >
          <a
            href={carrier.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${carrier.name} website`}
          >
            Visit Website <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
```

### 4. Implement Carriers Page

```typescript
// src/app/help/carriers/page.tsx
import { Metadata } from 'next'
import { Ship, Info, Anchor } from 'lucide-react'
import { CarrierDirectoryItem } from '@/components/carriers/CarrierDirectoryItem'
import {
  MAJOR_CARRIER_DIRECTORY,
  ADDITIONAL_CARRIER_DIRECTORY,
  OTHER_US_CARRIERS
} from '@/lib/carrier-directory'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Carriers Serving the United States | Sea Shipping Line',
  description: 'Comprehensive directory of ocean carriers serving the USA. Find major carriers like Maersk, MSC, CMA CGM, Hapag-Lloyd, and other international shipping lines serving American ports.',
  openGraph: {
    title: 'Ocean Carriers Serving the United States | Sea Shipping Line',
    description: 'Directory of international ocean carriers providing shipping services to and from U.S. ports.',
  }
}

export default function CarriersPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Anchor className="h-12 w-12" style={{ color: '#ee1c23' }} />
            <h1 className="text-4xl md:text-5xl font-bold">
              Carriers Serving the United States
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl">
            Comprehensive directory of ocean carriers providing international shipping services to and from U.S. ports
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="container mx-auto px-4 py-8">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Ship className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-700 mb-3">
                  This directory provides information about international ocean carriers that serve the United States.
                  Sea Shipping Line works with all major carriers to provide you with the best routing, pricing, and
                  service options for your shipments.
                </p>
                <p className="text-gray-700">
                  Click on any carrier to visit their official website for more information about their services,
                  coverage areas, and capabilities.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Major Carriers Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">Major Carriers</h2>
          <p className="text-gray-600">
            Leading international ocean carriers with extensive global networks and regular service to U.S. ports
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MAJOR_CARRIER_DIRECTORY.map((carrier) => (
            <CarrierDirectoryItem key={carrier.name} carrier={carrier} />
          ))}
        </div>
      </section>

      {/* Additional Carriers Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">Additional Carriers</h2>
          <p className="text-gray-600">
            Other major international carriers serving U.S. trade lanes
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ADDITIONAL_CARRIER_DIRECTORY.map((carrier) => (
            <CarrierDirectoryItem key={carrier.name} carrier={carrier} />
          ))}
        </div>
      </section>

      {/* Other U.S. Carriers Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">Other U.S. Carriers</h2>
          <p className="text-gray-600">
            Specialized and regional carriers serving specific trade routes and regions
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OTHER_US_CARRIERS.map((carrier) => (
            <CarrierDirectoryItem key={carrier.name} carrier={carrier} />
          ))}
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="container mx-auto px-4 py-8">
        <Alert variant="default" className="bg-gray-100">
          <AlertDescription className="text-sm text-gray-600">
            <strong>Disclaimer:</strong> This carrier directory is provided as a convenience and for
            informational purposes only. The inclusion of a carrier in this directory does not constitute
            an endorsement. Sea Shipping Line assumes no responsibility for the content, services, or
            availability of external carrier websites. Carrier capabilities and coverage areas are subject
            to change without notice.
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
// __tests__/e2e/help/carriers.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Carriers Page', () => {
  test('renders carriers directory page correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/help/carriers')

    await expect(page.getByRole('heading', { name: /carriers serving/i })).toBeVisible()
    await expect(page.getByText(/directory/i)).toBeVisible()
  })

  test('displays all three carrier sections', async ({ page }) => {
    await page.goto('/help/carriers')

    await expect(page.getByRole('heading', { name: /major carriers/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /additional carriers/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /other.*carriers/i })).toBeVisible()
  })

  test('carrier cards show descriptions and website links', async ({ page }) => {
    await page.goto('/help/carriers')

    const firstCarrier = page.locator('article, .carrier-card').first()
    await expect(firstCarrier).toBeVisible()
    await expect(firstCarrier.getByRole('link', { name: /visit website/i })).toBeVisible()
  })

  test('carrier website links open in new tab', async ({ page, context }) => {
    await page.goto('/help/carriers')

    const firstWebsiteLink = page.getByRole('link', { name: /visit.*website/i }).first()

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      firstWebsiteLink.click()
    ])

    expect(newPage.url()).toMatch(/^https?:\/\//)
  })

  test('visual regression test', async ({ page }) => {
    await page.goto('/help/carriers')
    await expect(page).toHaveScreenshot('carriers-page.png', { fullPage: true })
  })
})
```

## Testing Requirements
- 85%+ unit test coverage
- All carrier directory entries tested
- Descriptions and links verified
- Accessibility verification (zero violations)
- External link behavior tested
- Responsive layout tested (mobile, tablet, desktop)
- Visual regression tests
- E2E test for directory navigation

## Acceptance Criteria
- ✅ Page accessible at `/help/carriers`
- ✅ All 30+ carriers listed with descriptions
- ✅ Carriers grouped into three sections (Major/Additional/Other)
- ✅ Each carrier has website link opening in new tab
- ✅ Service tags displayed (FCL, LCL, RoRo, etc.) where applicable
- ✅ Region tags displayed for specialized carriers
- ✅ Mobile-responsive card layout (1/2/3 columns)
- ✅ Introduction explains directory purpose
- ✅ Note about Sea Shipping Line working with all carriers
- ✅ Disclaimer section present
- ✅ SEO metadata optimized
- ✅ Semantic HTML structure (articles or definition lists)
- ✅ Zero accessibility violations
- ✅ Tests passing (85%+ coverage)
- ✅ Visual regression tests passing
- ✅ Page load time <1s
- ✅ Footer link to `/help/carriers` working

## Notes

### Content Source
Content migrated from v1 WordPress site resources page "Other U.S. Carriers" section, enhanced with descriptions and categorization.

### Design Considerations
- Card-based layout (not list-based) for better visual hierarchy
- Service tags (FCL, LCL, RoRo) help users quickly identify capabilities
- Region tags for specialized carriers (Caribbean, North Atlantic, etc.)
- Outline variant buttons for "Visit Website" to differentiate from tracking/scheduling CTAs
- Three-tier categorization: Major → Additional → Other
- Descriptions should be concise (1-2 sentences) and informative

### Data Structure
Separate from tracking/scheduling data because:
- Different URLs (company website vs tracking/scheduling portals)
- Additional metadata (description, services, region)
- Includes carriers not in tracking/scheduling (Other U.S. Carriers)
- More comprehensive directory purpose

### Future Enhancements (Not in scope)
- Search functionality to filter carriers by name
- Filter by service type (FCL, LCL, RoRo, Reefer)
- Filter by region (Asia, Europe, Caribbean, etc.)
- Sort by name, service, or region
- Carrier logos/branding
- Direct links to tracking/scheduling pages for each carrier
- Carrier coverage maps

### SEO Optimization
- Rich snippets for carrier directory (structured data)
- Individual carrier pages (future enhancement)
- Breadcrumbs (Help → Carriers)
- Internal linking to tracking/scheduling pages

### External Dependencies
- All carrier website URLs must be verified
- Carrier descriptions should be factually accurate
- Service offerings may change over time
- No API integrations required

### Maintenance
- Verify carrier website URLs quarterly
- Update carrier list as industry changes
- Add new carriers as partnerships develop
- Update descriptions and service offerings as needed
- Monitor broken links via automated checks
- Consider adding carrier status (active/inactive)
