---
id: 009
title: Implement Services Pages with Dynamic Routes (TDD)
phase: 3
priority: critical
status: todo
dependencies: [008]
estimated_hours: 10
tags: [pages, services, dynamic-routes, tdd, ssg]
---

# Implement Services Pages with Dynamic Routes (TDD)

## Objective
Build services listing page and individual service detail pages using Next.js dynamic routes with static generation (SSG).

## Requirements

### Service Types
1. Ocean Freight (FCL & LCL)
2. Automobiles
3. Household Goods
4. Oversize Cargo
5. Project Cargo
6. Hazardous Materials
7. Refrigerated Cargo

### Pages Needed
- `/services` - Services listing page
- `/services/[slug]` - Individual service detail pages

### Content Per Service
- Service title and icon
- Detailed description
- Specialized capabilities
- Equipment types
- Industry certifications
- CTA to request rate

## Implementation Steps (TDD Approach)

### 1. Define Service Data Structure

```typescript
// src/types/index.ts
export interface Service {
  id: string
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  icon: string
  features: string[]
  equipment?: string[]
  certifications?: string[]
  image: string
}
```

### 2. Create Service Data

```typescript
// src/content/services.ts
export const services: Service[] = [
  {
    id: 'ocean-freight',
    slug: 'ocean-freight',
    title: 'Ocean Freight (FCL & LCL)',
    shortDescription: 'Full container and less-than-container load services worldwide',
    fullDescription: '...',
    icon: 'Ship',
    features: [
      'Full Container Load (FCL)',
      'Less-than-Container Load (LCL)',
      'Worldwide coverage',
      'Major carrier contracts'
    ],
    equipment: ['20ft containers', '40ft containers', '40ft HC'],
    certifications: ['NVOCC Licensed'],
    image: '/images/services/ocean-freight.jpg'
  },
  // ... other services
]
```

### 3. Write Tests for Services Listing Page

```typescript
// __tests__/unit/app/services/page.test.tsx
describe('Services Listing Page', () => {
  it('renders page title', () => {
    render(<ServicesPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Our Services');
  });

  it('displays all service cards', () => {
    render(<ServicesPage />);
    const services = [
      'Ocean Freight',
      'Automobiles',
      'Household Goods',
      'Oversize Cargo',
      'Project Cargo',
      'Hazardous Materials',
      'Refrigerated Cargo'
    ];
    services.forEach(service => {
      expect(screen.getByText(new RegExp(service, 'i'))).toBeInTheDocument();
    });
  });

  it('service cards are responsive', () => {
    // Test mobile: 1 column, desktop: 2-3 columns
  });

  it('each service card links to detail page', () => {
    render(<ServicesPage />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute('href', expect.stringContaining('/services/'));
  });

  it('service cards show icons', () => {
    // Test icons render
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<ServicesPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### 4. Write Tests for Service Card Component

```typescript
// __tests__/unit/components/services/ServiceCard.test.tsx
describe('ServiceCard', () => {
  const mockService = {
    slug: 'ocean-freight',
    title: 'Ocean Freight',
    shortDescription: 'FCL and LCL services',
    icon: 'Ship',
  };

  it('renders service title', () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText('Ocean Freight')).toBeInTheDocument();
  });

  it('renders short description', () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText('FCL and LCL services')).toBeInTheDocument();
  });

  it('links to correct detail page', () => {
    render(<ServiceCard service={mockService} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/services/ocean-freight');
  });

  it('renders icon', () => {
    render(<ServiceCard service={mockService} />);
    // Test icon is present
  });

  it('has proper hover state', () => {
    // Test hover effects
  });

  it('is keyboard accessible', async () => {
    render(<ServiceCard service={mockService} />);
    const card = screen.getByRole('link');
    card.focus();
    expect(card).toHaveFocus();
  });
});
```

### 5. Write Tests for Service Detail Page

```typescript
// __tests__/unit/app/services/[slug]/page.test.tsx
describe('Service Detail Page', () => {
  const mockService = {
    title: 'Ocean Freight (FCL & LCL)',
    fullDescription: 'Detailed description...',
    features: ['FCL', 'LCL', 'Worldwide'],
    equipment: ['20ft', '40ft'],
    certifications: ['NVOCC'],
  };

  it('renders service title', () => {
    render(<ServiceDetailPage params={{ slug: 'ocean-freight' }} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Ocean Freight');
  });

  it('displays full description', () => {
    render(<ServiceDetailPage params={{ slug: 'ocean-freight' }} />);
    expect(screen.getByText(/Detailed description/i)).toBeInTheDocument();
  });

  it('lists all features', () => {
    render(<ServiceDetailPage params={{ slug: 'ocean-freight' }} />);
    expect(screen.getByText('FCL')).toBeInTheDocument();
    expect(screen.getByText('LCL')).toBeInTheDocument();
    expect(screen.getByText('Worldwide')).toBeInTheDocument();
  });

  it('displays equipment types', () => {
    render(<ServiceDetailPage params={{ slug: 'ocean-freight' }} />);
    expect(screen.getByText(/20ft/i)).toBeInTheDocument();
    expect(screen.getByText(/40ft/i)).toBeInTheDocument();
  });

  it('shows certifications', () => {
    render(<ServiceDetailPage params={{ slug: 'ocean-freight' }} />);
    expect(screen.getByText('NVOCC')).toBeInTheDocument();
  });

  it('includes CTA to request rate', () => {
    render(<ServiceDetailPage params={{ slug: 'ocean-freight' }} />);
    expect(screen.getByRole('button', { name: /Request Rate/i })).toBeInTheDocument();
  });

  it('has breadcrumb navigation', () => {
    render(<ServiceDetailPage params={{ slug: 'ocean-freight' }} />);
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Ocean Freight')).toBeInTheDocument();
  });

  it('returns 404 for invalid slug', async () => {
    // Test notFound() is called for invalid service
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<ServiceDetailPage params={{ slug: 'ocean-freight' }} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### 6. Implement Services Listing Page

```typescript
// src/app/services/page.tsx
import { services } from '@/content/services'
import { ServiceCard } from '@/components/services/ServiceCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shipping Services | Ocean Freight, Cargo, Logistics',
  description: 'Comprehensive shipping services including ocean freight, automobiles, household goods, and specialized cargo.',
}

export default function ServicesPage() {
  return (
    <main id="main" className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Our Services</h1>
        <p className="text-xl text-gray-600 mb-12">
          Comprehensive shipping solutions for all your logistics needs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </main>
  )
}
```

### 7. Implement Service Card Component

```typescript
// src/components/services/ServiceCard.tsx
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Ship, Car, Home, Package, Hammer, AlertTriangle, Snowflake } from 'lucide-react'
import type { Service } from '@/types'

const iconMap = {
  Ship, Car, Home, Package, Hammer, AlertTriangle, Snowflake
}

interface ServiceCardProps {
  service: Pick<Service, 'slug' | 'title' | 'shortDescription' | 'icon'>
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon as keyof typeof iconMap]

  return (
    <Link href={`/services/${service.slug}`}>
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="w-12 h-12 mb-4 text-primary">
            {Icon && <Icon size={48} />}
          </div>
          <CardTitle>{service.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{service.shortDescription}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
```

### 8. Implement Service Detail Page

```typescript
// src/app/services/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { services } from '@/content/services'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) return {}

  return {
    title: `${service.title} | Sea Shipping Line`,
    description: service.shortDescription,
  }
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug)

  if (!service) {
    notFound()
  }

  return (
    <main id="main">
      {/* Breadcrumbs */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <nav aria-label="Breadcrumb">
            <ol className="flex space-x-2 text-sm">
              <li><Link href="/">Home</Link></li>
              <li>/</li>
              <li><Link href="/services">Services</Link></li>
              <li>/</li>
              <li aria-current="page">{service.title}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-64 md:h-96">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">{service.title}</h1>

        <div className="prose max-w-none mb-12">
          <p className="text-xl">{service.fullDescription}</p>
        </div>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Key Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Equipment (if applicable) */}
        {service.equipment && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Equipment Types</h2>
            <ul className="list-disc list-inside">
              {service.equipment.map((eq, index) => (
                <li key={index}>{eq}</li>
              ))}
            </ul>
          </section>
        )}

        {/* CTA */}
        <div className="mt-12 p-8 bg-gray-100 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Need a Rate Quote?</h3>
          <Link href="/request">
            <Button size="lg">Request Rate</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
```

### 9. E2E Tests

```typescript
// __tests__/e2e/journeys/services.spec.ts
test('user can browse services and view details', async ({ page }) => {
  // Visit services page
  await page.goto('/services');
  await expect(page.locator('h1')).toContainText('Our Services');

  // Count service cards (should be 7)
  const cards = page.locator('article');
  await expect(cards).toHaveCount(7);

  // Click on Ocean Freight
  await page.click('text=Ocean Freight');
  await expect(page).toHaveURL(/\/services\/ocean-freight/);

  // Check detail page content
  await expect(page.locator('h1')).toContainText('Ocean Freight');
  await expect(page.locator('text=Key Features')).toBeVisible();

  // Click Request Rate button
  await page.click('button:has-text("Request Rate")');
  await expect(page).toHaveURL('/request');
});

test('services page works on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/services');

  // Services should stack vertically
  const cards = page.locator('article');
  await expect(cards.first()).toBeVisible();
});
```

## Testing Requirements
- 85%+ unit test coverage
- All service cards tested
- Detail pages tested for all services
- generateStaticParams tested
- 404 handling tested
- E2E journey tested
- Visual regression tests
- Accessibility verified

## Acceptance Criteria
- ✅ Tests written first (TDD)
- ✅ All unit tests passing (85%+ coverage)
- ✅ Services listing page implemented
- ✅ All 7 service detail pages working
- ✅ Dynamic routes with SSG configured
- ✅ generateStaticParams working
- ✅ Breadcrumb navigation functional
- ✅ Service cards responsive
- ✅ Detail pages responsive
- ✅ CTA buttons functional
- ✅ 404 handling for invalid slugs
- ✅ E2E tests passing
- ✅ Zero accessibility violations
- ✅ SEO metadata for all pages
- ✅ Images optimized

## Notes
- Use Static Site Generation (SSG) for performance
- All service data should be in content files
- Images should be optimized with Next.js Image
- Consider adding schema.org structured data
- Maintain consistent layout with homepage
