---
id: 024
title: Implement Service Detail Pages with Dynamic Routing
status: todo
priority: critical
created: 2025-11-04
labels: [page, services, dynamic-routing, seo, content]
---

# Implement Service Detail Pages with Dynamic Routing

## Description
Implement dynamic routing for individual service detail pages using Next.js 15 app router. Currently, 7 service links in the footer return 404 errors because individual service pages don't exist. Service data is already structured in `/src/content/services.ts` with full details ready for display.

## Current State
- Footer contains 7 service links (lines 38-46 of `/src/components/layout/Footer.tsx`)
- Main services overview page exists at `/src/app/services/page.tsx`
- Service data with full details exists at `/src/content/services.ts` (7 services)
- Type definitions exist at `/src/types/index.ts`
- Helper functions `getServiceBySlug()` and `getAllServiceSlugs()` exist
- **NO dynamic route handler exists** - all service detail links return 404

### Broken Footer Links (All return 404)
1. `/services/ocean-freight` - Should show FCL/LCL combined
2. `/services/automobiles` - Auto transport
3. `/services/household-goods` - HHG shipping
4. `/services/oversize-cargo` - Oversize cargo
5. `/services/project-cargo` - NOT in services.ts (needs clarification)
6. `/services/hazardous-materials` - Hazmat
7. `/services/refrigerated-cargo` - Reefer containers

## Requirements

### Dynamic Route Implementation
- Create `/src/app/services/[slug]/page.tsx` with dynamic routing
- Implement `generateStaticParams()` for SSG (Static Site Generation)
- Implement `generateMetadata()` for dynamic SEO
- Handle 404 for invalid slugs with proper not-found handling
- Support all 7 service types from services.ts

### Page Layout & Design

#### Hero Section
- Service title (h1)
- Short description with larger text
- Hero image specific to service type
- Breadcrumb navigation (Home > Services > [Service Name])

#### Service Overview
- Full description paragraph
- Key features list with checkmarks or icons
- Equipment types section
- Certifications and compliance badges

#### Features Grid
- Display all features from service data
- Use icon + text layout
- Responsive grid (1 col mobile, 2-3 cols desktop)

#### Equipment Section
- List all equipment types available
- Visual display with icons or small images
- Specifications if available

#### Why Choose SSL for This Service
- Unique value propositions
- 37+ years experience mention
- C-TPAT security benefits
- Competitive pricing through volume contracts

#### Related Services
- Show 2-3 related services with cards
- Link to other service detail pages
- Encourage exploration of other offerings

#### Call to Action
- "Request a Quote" button (SSL brand red #ee1c23)
- Link to /request page
- "Contact Us" secondary option
- Phone number display

### Styling Requirements
- Use `py-8` for section padding (per brand guidelines)
- SSL brand red (`#ee1c23`) for CTAs and accents
- Mobile-responsive design (375px, 768px, 1024px breakpoints)
- Consistent typography with rest of site
- Proper image optimization with Next.js Image component

### Service Data Mapping

**Current Services in services.ts:**
1. `fcl` - Full Container Load (FCL)
2. `lcl` - Less than Container Load (LCL)
3. `automobiles` - Automobiles
4. `household-goods` - Household Goods
5. `oversize-cargo` - Oversize Cargoes
6. `hazardous-materials` - Hazardous Materials
7. `refrigerated-cargo` - Refrigerated Cargoes

**Footer Link Issue:**
- Footer has `/services/ocean-freight` but services.ts has separate `fcl` and `lcl`
- Footer has `/services/project-cargo` but services.ts has `oversize-cargo`

**Resolution Options:**
1. **Option A (Recommended)**: Update footer links to match slugs
   - Change `ocean-freight` → show both FCL and LCL on one page
   - Change `project-cargo` → `oversize-cargo`
2. **Option B**: Add redirect logic for legacy URLs
3. **Option C**: Add new service entries to services.ts

### Icon Mapping
Services use string icon names that need to be mapped to Lucide React icons:
```typescript
const iconMap = {
  Ship: Ship,
  Package: Package,
  Car: Car,
  Home: Home,
  Hammer: Hammer,
  AlertTriangle: AlertTriangle,
  Snowflake: Snowflake,
};
```

## Acceptance Criteria
- [ ] File `/src/app/services/[slug]/page.tsx` exists
- [ ] All 7 service detail pages render without errors
- [ ] Dynamic route correctly handles all service slugs from services.ts
- [ ] `generateStaticParams()` pre-renders all service pages at build time
- [ ] `generateMetadata()` provides unique SEO data per service
- [ ] Invalid slugs return proper 404 page
- [ ] Footer service links successfully navigate to detail pages
- [ ] Each page displays all service data (title, description, features, equipment, certs)
- [ ] Hero images load with proper optimization
- [ ] Icons render correctly for each service
- [ ] Related services section shows relevant alternatives
- [ ] CTA buttons use SSL brand red (#ee1c23) with hover states
- [ ] Page is mobile-responsive at all breakpoints
- [ ] Breadcrumb navigation works correctly
- [ ] No hydration errors or console warnings
- [ ] Typography and spacing match site design system
- [ ] All images have proper alt text
- [ ] SEO metadata is complete and unique per service

## Implementation Notes

### File Location
```
/src/app/services/[slug]/page.tsx
```

### Dependencies
- `/src/content/services.ts` - Service data and helper functions
- `/src/types/index.ts` - Service type definition
- `/src/lib/constants.ts` - COMPANY_INFO for consistency
- Next.js Metadata API for dynamic SEO
- Next.js Image component for optimized images
- Lucide React icons
- Existing UI components (Button, etc.)

### Code Structure
```typescript
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { services, getServiceBySlug, getAllServiceSlugs } from '@/content/services';
import { COMPANY_INFO } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Ship, Package, Car, Home, Hammer, AlertTriangle, Snowflake, CheckCircle } from 'lucide-react';

// Icon mapping
const iconMap = {
  Ship, Package, Car, Home, Hammer, AlertTriangle, Snowflake,
};

// Generate static params for all services
export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({
    slug,
  }));
}

// Generate metadata dynamically per service
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.title} | Sea Shipping Line`,
    description: service.shortDescription,
    openGraph: {
      title: service.title,
      description: service.fullDescription,
      type: 'website',
      images: [service.image],
    },
  };
}

// Page component
export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);

  // Handle 404 for invalid slugs
  if (!service) {
    notFound();
  }

  // Get icon component
  const IconComponent = iconMap[service.icon as keyof typeof iconMap];

  return (
    <main className="min-h-screen">
      {/* Breadcrumb */}
      {/* Hero Section */}
      {/* Service Overview */}
      {/* Features Grid */}
      {/* Equipment Section */}
      {/* Certifications */}
      {/* Why Choose SSL */}
      {/* Related Services */}
      {/* CTA Section */}
    </main>
  );
}
```

### Generate Static Params Implementation
```typescript
export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();

  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// This will generate pages at build time for:
// /services/fcl
// /services/lcl
// /services/automobiles
// /services/household-goods
// /services/oversize-cargo
// /services/hazardous-materials
// /services/refrigerated-cargo
```

### Related Services Logic
```typescript
function getRelatedServices(currentSlug: string, limit: number = 3) {
  return services
    .filter(service => service.slug !== currentSlug)
    .slice(0, limit);
}
```

### Footer Link Resolution
**IMPORTANT**: After implementing dynamic routes, update footer links:

Current problematic links:
```typescript
// In /src/components/layout/Footer.tsx
{ name: "Ocean Freight (FCL & LCL)", href: "/services/ocean-freight" }, // 404
{ name: "Project Cargo", href: "/services/project-cargo" }, // 404
```

Recommended fix:
```typescript
// Option 1: Update to match existing slugs
{ name: "Full Container Load (FCL)", href: "/services/fcl" },
{ name: "Less than Container Load (LCL)", href: "/services/lcl" },
{ name: "Oversize Cargo", href: "/services/oversize-cargo" },

// Option 2: Add redirects in next.config.js
async redirects() {
  return [
    {
      source: '/services/ocean-freight',
      destination: '/services/fcl',
      permanent: true,
    },
    {
      source: '/services/project-cargo',
      destination: '/services/oversize-cargo',
      permanent: true,
    },
  ];
}
```

### Image Requirements
Ensure these images exist (referenced in services.ts):
- `/images/services/fcl.jpg`
- `/images/services/lcl.jpg`
- `/images/services/automobiles.jpg`
- `/images/services/household-goods.jpg`
- `/images/services/oversize.jpg`
- `/images/services/hazmat.png`
- `/images/services/refrigerated.jpg`

If images don't exist, add to Issue #013 (Content Migration Assets).

### SEO Considerations
- Each service page needs unique title and description
- Use service name in H1 and URL
- Include relevant keywords (NVOCC, shipping, container, freight, etc.)
- Schema.org Service markup (future enhancement)
- Canonical URLs for each service
- Internal linking to related services
- Link back to main services overview page

## Related Issues
- Issue #007: Footer Component TDD (contains the broken links)
- Issue #009: Services Pages Implementation (main services page)
- Issue #013: Content Migration Assets (service images)
- Issue #018: Final QA Launch (must be completed before launch)

## Testing Checklist
- [ ] Run `npm run dev` and verify all service pages load
- [ ] Test each service URL directly:
  - `/services/fcl`
  - `/services/lcl`
  - `/services/automobiles`
  - `/services/household-goods`
  - `/services/oversize-cargo`
  - `/services/hazardous-materials`
  - `/services/refrigerated-cargo`
- [ ] Click footer service links and verify navigation
- [ ] Test invalid slug (e.g., `/services/invalid`) returns 404
- [ ] Verify breadcrumb navigation works
- [ ] Test responsive design at multiple breakpoints
- [ ] Verify all images load with proper optimization
- [ ] Verify icons render correctly for each service
- [ ] Test CTA buttons and hover states
- [ ] Check related services section shows correct services
- [ ] Verify metadata in browser tab and social preview
- [ ] Check browser console for errors
- [ ] Test with screen reader for accessibility
- [ ] Run `npm run build` to verify SSG works correctly
- [ ] Verify no hydration errors

## Performance Considerations
- Use static generation for best performance
- Optimize images with Next.js Image component
- Lazy load images below the fold
- Minimize JavaScript bundle (use server components where possible)
- Consider prefetching related service links

## Post-Implementation Tasks
- [ ] Update footer links to match service slugs or add redirects
- [ ] Update sitemap.ts to include all service detail pages
- [ ] Add service detail pages to pre-launch QA checklist (Issue #018)
- [ ] Verify all service images exist or request from content team
- [ ] Test SEO metadata with tools like Google Rich Results Test
- [ ] Consider adding FAQ section to service pages (future enhancement)
- [ ] Track service page analytics to see which services are most popular

## Future Enhancements
- Add customer testimonials per service
- Include case studies or example shipments
- Add interactive rate calculator per service
- Implement service comparison tool
- Add service-specific FAQ accordions
- Include video content for complex services
- Add "Request a Quote" form specific to each service type
