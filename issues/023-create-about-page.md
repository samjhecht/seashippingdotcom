---
id: 023
title: Create About Page
status: todo
priority: high
created: 2025-11-04
labels: [page, content, company, marketing]
---

# Create About Page

## Description
Create a comprehensive About page that showcases Sea Shipping Line's 37+ years of experience, NVOCC expertise, nationwide network, and company values. This is a core marketing page linked from the footer but currently returns a 404 error.

## Current State
- Footer links to `/about` at line 30 of `/src/components/layout/Footer.tsx` (Company Overview section)
- The route `/src/app/about/page.tsx` does not exist
- Users clicking the footer link receive a 404 error
- Some about content exists on homepage but needs expansion
- Company info constants exist at `/src/lib/constants.ts`

## Requirements

### Page Structure
- Create `/src/app/about/page.tsx` as a server component
- Follow Next.js 15 app router conventions
- Use semantic HTML with proper section elements
- Implement responsive design matching site styling
- Include proper metadata for SEO

### Content Sections

#### Hero Section
- Compelling headline featuring 37+ years of experience
- Tagline: "Experience Calm Waters. We're Locally Grown & Globally Situated."
- Brief company overview (2-3 sentences)
- Background image or hero visual

#### Company History
- Founded date and origin story
- Key milestones over 37+ years
- Growth from local to nationwide network
- Timeline visualization (optional but engaging)

#### What We Do
- NVOCC (Non-Vessel Operating Common Carrier) explanation
- Federally licensed status and FMC bond
- Core services overview (link to services page)
- International shipping expertise
- U.S. domestic office network (8 locations)

#### Our Network
- 8 owned & operated U.S. domestic offices
- Office locations list: NYC, SFO/OAK, MIA, CHI, LAX, HOU, ATL, SEA
- Strategic geographic coverage
- Global carrier partnerships
- Map visualization (optional but impactful)

#### Why Choose Sea Shipping Line
- 37+ years of industry expertise
- Federally licensed and FMC bonded
- C-TPAT certified security standards
- Competitive rates through volume contracts
- Personalized customer service
- Door-to-door solutions
- Hazmat certified staff

#### Certifications & Compliance
- FMC Licensed NVOCC (OTI# 010787)
- C-TPAT Certified
- DOT Registered (DOT# 3978374, MC# 1488768)
- SCAC Code: AAGP
- Display certification badges/logos

#### Our Values & Commitment
- Customer service excellence
- Safety and security
- Regulatory compliance
- Innovation in logistics
- Environmental responsibility (if applicable)

#### Team & Expertise
- Overview of team capabilities
- Industry experience
- Customer support approach
- "We're here to help" messaging

#### Call to Action
- Contact us for quote/consultation
- Link to services pages
- Link to contact form

### Design & Styling
- Use full-width hero section with background image
- Alternate section backgrounds (white/light gray) for visual rhythm
- Use `py-8` for section padding (per brand guidelines)
- Incorporate SSL brand red (`#ee1c23`) for accents and CTAs
- Include relevant imagery throughout
- Stats boxes similar to homepage (use red background, white text)
- Ensure mobile-responsive layout with proper image handling
- Include breadcrumb navigation (Home > About)

### Interactive Elements
- Hover effects on certification badges
- Animated stats counters (optional)
- Smooth scroll to sections (optional)
- Office location map (optional, future enhancement)

## Acceptance Criteria
- [ ] File `/src/app/about/page.tsx` exists and renders without errors
- [ ] Page is accessible at `http://localhost:8787/about`
- [ ] Footer link to `/about` successfully navigates to page
- [ ] All content sections are present and complete
- [ ] Page references COMPANY_INFO and REGULATORY_INFO constants
- [ ] 37+ years experience is prominently featured
- [ ] 8 offices are listed with correct codes
- [ ] All regulatory credentials are displayed
- [ ] C-TPAT certification is highlighted
- [ ] Page has proper metadata (title, description, OG tags)
- [ ] Typography and spacing match site design system
- [ ] CTA buttons use SSL brand red (#ee1c23)
- [ ] Page is mobile-responsive (test at 375px, 768px, 1024px widths)
- [ ] Proper semantic HTML structure with accessibility landmarks
- [ ] Images have appropriate alt text
- [ ] Links to related pages (services, contact) are functional
- [ ] No hydration errors or console warnings

## Implementation Notes

### File Location
```
/src/app/about/page.tsx
```

### Dependencies
- `/src/lib/constants.ts` - Import COMPANY_INFO and REGULATORY_INFO
- `/src/content/services.ts` - Reference for services overview
- Next.js Metadata API for SEO
- Next.js Image component for optimized images
- Existing UI components (Button, CopyToClipboardCard, etc.)

### Content Source
**RECOMMENDED**: Extract content structure from https://seashipping.com/about using WebFetch to ensure continuity with existing brand messaging.

### Code Structure
```typescript
import type { Metadata } from 'next';
import { COMPANY_INFO, REGULATORY_INFO } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { CopyToClipboardCard } from '@/components/ui/copy-to-clipboard-card';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Sea Shipping Line | 37+ Years of Shipping Excellence',
  description: `Learn about Sea Shipping Line, a federally licensed NVOCC with ${COMPANY_INFO.yearsOfExperience} years of experience and ${COMPANY_INFO.officeCount} U.S. offices.`,
  openGraph: {
    title: 'About Sea Shipping Line',
    description: 'Federally licensed NVOCC with 37+ years of global shipping expertise',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      {/* Company History */}
      {/* What We Do */}
      {/* Our Network */}
      {/* Why Choose Us */}
      {/* Certifications */}
      {/* Values */}
      {/* CTA Section */}
    </main>
  );
}
```

### Stats Section Example
Reuse pattern from homepage:
```typescript
const stats = [
  { value: COMPANY_INFO.yearsOfExperience, label: 'Years of Experience' },
  { value: COMPANY_INFO.officeCount.toString(), label: 'U.S. Offices' },
  { value: 'C-TPAT', label: 'Certified' },
];
```

### Office Locations Display
```typescript
const offices = [
  { city: 'New York', code: 'NYC' },
  { city: 'San Francisco/Oakland', code: 'SFO/OAK' },
  { city: 'Miami', code: 'MIA' },
  { city: 'Chicago', code: 'CHI' },
  { city: 'Los Angeles', code: 'LAX' },
  { city: 'Houston', code: 'HOU' },
  { city: 'Atlanta', code: 'ATL' },
  { city: 'Seattle', code: 'SEA' },
];
```

### SEO Considerations
- Use descriptive title with key terms (NVOCC, shipping, 37+ years)
- Include meta description with unique value props
- Add Open Graph tags for social sharing
- Use proper heading hierarchy (single h1, structured h2/h3)
- Include schema.org Organization markup (future enhancement)
- Ensure page is crawlable and indexable

### Images Needed
Consider adding these images (source from v1 site or use placeholders):
- `/images/about-hero.jpg` - Hero background
- `/images/office-network.jpg` or map graphic
- `/images/team.jpg` - Optional team photo
- Certification logos if not already available

## Related Issues
- Issue #007: Footer Component TDD (contains the link to this page)
- Issue #013: Content Migration Assets (image sourcing)
- Issue #009: Services Pages Implementation (related content)
- Issue #018: Final QA Launch (must be completed before launch)

## Testing Checklist
- [ ] Run `npm run dev` and verify page loads at `/about`
- [ ] Click footer "About" link and verify navigation
- [ ] Test responsive design at multiple breakpoints
- [ ] Verify all images load with proper optimization
- [ ] Check that constants are correctly imported and displayed
- [ ] Verify all internal links work correctly
- [ ] Test CTA buttons and hover states
- [ ] Check browser console for errors
- [ ] Validate HTML structure with accessibility tools
- [ ] Test with screen reader for accessibility
- [ ] Verify metadata appears correctly in browser tab and search previews
- [ ] Test page load performance (should be fast as server component)

## Content Tone & Voice
- Professional yet approachable
- Emphasize experience and reliability
- Highlight regulatory compliance and security
- Customer-focused messaging
- Action-oriented CTAs
- Use industry terminology appropriately

## Post-Implementation
- Update sitemap.ts to include /about route
- Add links to about page from homepage if not present
- Consider adding team photos or office photos in future
- Track page analytics to see user engagement
- Add to pre-launch QA checklist (Issue #018)
- Consider A/B testing different hero messages
