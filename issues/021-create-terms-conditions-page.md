---
id: 021
title: Create Terms & Conditions Page
status: todo
priority: critical
created: 2025-11-04
labels: [page, legal, content, compliance]
---

# Create Terms & Conditions Page

## Description
Create a legally compliant Terms & Conditions page for Sea Shipping Line. This page is linked from the footer but currently returns a 404 error, creating a critical legal gap and poor user experience.

## Current State
- Footer links to `/terms` at line 316 of `/src/components/layout/Footer.tsx`
- The route `/src/app/terms/page.tsx` does not exist
- Users clicking the footer link receive a 404 error
- No terms and conditions content exists in the codebase

## Requirements

### Page Structure
- Create `/src/app/terms/page.tsx` as a server component
- Follow Next.js 15 app router conventions
- Use semantic HTML with proper heading hierarchy (h1, h2, h3)
- Implement responsive design matching site styling
- Include proper metadata for SEO

### Content Sections (Typical structure - verify with legal team)
- Introduction and acceptance of terms
- Service description and scope
- User obligations and responsibilities
- Shipping terms and liability limitations
- Payment terms and conditions
- Intellectual property rights
- Limitation of liability
- Dispute resolution and governing law
- Changes to terms
- Contact information
- Last updated date

### Design & Styling
- Use max-w-4xl centered container with proper padding
- Apply consistent typography hierarchy
- Use `py-8` for section padding (per brand guidelines)
- Style links with SSL brand red (`#ee1c23`) for hover states
- Ensure mobile-responsive layout
- Include breadcrumb navigation (Home > Terms & Conditions)

### Legal Compliance
- Ensure terms are appropriate for NVOCC operations
- Include FMC regulatory references where applicable
- Reference REGULATORY_INFO constants for regulatory numbers
- Include proper disclaimers for international shipping
- Address data privacy cross-reference to Privacy Policy

## Acceptance Criteria
- [ ] File `/src/app/terms/page.tsx` exists and renders without errors
- [ ] Page is accessible at `http://localhost:8787/terms`
- [ ] Footer link to `/terms` successfully navigates to page
- [ ] Page includes all required legal sections
- [ ] Page has proper metadata (title, description)
- [ ] Typography and spacing match site design system
- [ ] Page is mobile-responsive (test at 375px, 768px, 1024px widths)
- [ ] Proper semantic HTML structure with accessibility landmarks
- [ ] Last updated date is prominently displayed
- [ ] Content has been reviewed by legal team or sourced from v1 site

## Implementation Notes

### File Location
```
/src/app/terms/page.tsx
```

### Dependencies
- `/src/lib/constants.ts` - Import COMPANY_INFO and REGULATORY_INFO
- Next.js Metadata API for SEO
- Existing typography and spacing patterns from other pages

### Content Source
**CRITICAL**: Terms & Conditions must be legally accurate. Options:
1. **RECOMMENDED**: Extract existing T&C from https://seashipping.com using WebFetch
2. Request legal team to provide current terms
3. Use industry-standard NVOCC terms as template (requires legal review)

### Code Structure
```typescript
import type { Metadata } from 'next';
import { COMPANY_INFO, REGULATORY_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Sea Shipping Line',
  description: 'Terms and conditions for Sea Shipping Line NVOCC services',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        {/* Page Title */}
        {/* Last Updated */}
        {/* Terms Sections */}
      </div>
    </main>
  );
}
```

### SEO Considerations
- Set canonical URL
- Use proper heading hierarchy for screen readers
- Include descriptive metadata
- Ensure page is crawlable (no noindex)

## Related Issues
- Issue #022: Create Privacy Policy Page (sister legal page)
- Issue #007: Footer Component TDD (contains the link to this page)
- Issue #018: Final QA Launch (must be completed before launch)

## Testing Checklist
- [ ] Run `npm run dev` and verify page loads at `/terms`
- [ ] Click footer "Terms & Conditions" link and verify navigation
- [ ] Test responsive design at multiple breakpoints
- [ ] Verify all internal links work correctly
- [ ] Check browser console for errors
- [ ] Validate HTML structure with accessibility tools
- [ ] Test with screen reader for accessibility
- [ ] Verify metadata appears correctly in browser tab and search previews

## Post-Implementation
- Update sitemap.ts to include /terms route
- Notify legal team for final content review
- Add to pre-launch QA checklist (Issue #018)
