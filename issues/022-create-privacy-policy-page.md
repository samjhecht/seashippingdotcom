---
id: 022
title: Create Privacy Policy Page
status: todo
priority: critical
created: 2025-11-04
labels: [page, legal, content, compliance, gdpr, privacy]
---

# Create Privacy Policy Page

## Description
Create a legally compliant Privacy Policy page for Sea Shipping Line. This page is linked from the footer but currently returns a 404 error, creating a critical legal and regulatory compliance gap (GDPR, CCPA, etc.).

## Current State
- Footer links to `/privacy` at line 316 of `/src/components/layout/Footer.tsx`
- The route `/src/app/privacy/page.tsx` does not exist
- Users clicking the footer link receive a 404 error
- No privacy policy content exists in the codebase
- Site uses Google Analytics (GA_TRACKING_ID: "G-V0F46NZK7J") requiring disclosure

## Requirements

### Page Structure
- Create `/src/app/privacy/page.tsx` as a server component
- Follow Next.js 15 app router conventions
- Use semantic HTML with proper heading hierarchy (h1, h2, h3)
- Implement responsive design matching site styling
- Include proper metadata for SEO

### Content Sections (Must address modern privacy regulations)
- Introduction and scope
- Information we collect
  - Personal information (names, emails, phone, company details)
  - Shipping information (addresses, cargo details)
  - Automatically collected data (cookies, analytics, IP addresses)
- How we use your information
  - Service delivery and shipping operations
  - Communication and customer support
  - Analytics and site improvement
  - Legal and regulatory compliance (FMC, CBP, etc.)
- Information sharing and disclosure
  - Shipping carriers and partners
  - Customs and regulatory authorities
  - Service providers and vendors
  - Legal requirements and safety
- Data security measures
  - C-TPAT certification relevance
  - Encryption and secure transmission
  - Access controls
- Your privacy rights
  - GDPR rights (EU users)
  - CCPA rights (California users)
  - How to exercise rights
- Cookies and tracking technologies
  - Google Analytics disclosure
  - Cookie management options
- Third-party services and links
- International data transfers (critical for NVOCC)
- Children's privacy
- Changes to privacy policy
- Contact information for privacy inquiries
- Last updated date

### Design & Styling
- Use max-w-4xl centered container with proper padding
- Apply consistent typography hierarchy
- Use `py-8` for section padding (per brand guidelines)
- Style links with SSL brand red (`#ee1c23`) for hover states
- Ensure mobile-responsive layout
- Include breadcrumb navigation (Home > Privacy Policy)
- Consider table of contents for easy navigation

### Legal Compliance
- **GDPR Compliance**: Address EU data subject rights
- **CCPA Compliance**: Address California consumer rights
- **FMC Requirements**: Disclosure of regulatory data sharing
- **Google Analytics**: Explicit disclosure of GA4 usage
- **C-TPAT**: Reference data security standards
- **International Shipping**: Address cross-border data transfers

## Acceptance Criteria
- [ ] File `/src/app/privacy/page.tsx` exists and renders without errors
- [ ] Page is accessible at `http://localhost:8787/privacy`
- [ ] Footer link to `/privacy` successfully navigates to page
- [ ] Page includes all required privacy sections
- [ ] Google Analytics usage is explicitly disclosed
- [ ] GDPR and CCPA rights are clearly explained
- [ ] C-TPAT security measures are referenced
- [ ] Page has proper metadata (title, description)
- [ ] Typography and spacing match site design system
- [ ] Page is mobile-responsive (test at 375px, 768px, 1024px widths)
- [ ] Proper semantic HTML structure with accessibility landmarks
- [ ] Table of contents with jump links for easy navigation
- [ ] Last updated date is prominently displayed
- [ ] Contact information for privacy inquiries is provided
- [ ] Content has been reviewed by legal team or sourced from v1 site

## Implementation Notes

### File Location
```
/src/app/privacy/page.tsx
```

### Dependencies
- `/src/lib/constants.ts` - Import COMPANY_INFO, REGULATORY_INFO, GA_TRACKING_ID
- Next.js Metadata API for SEO
- Existing typography and spacing patterns from other pages

### Content Source
**CRITICAL**: Privacy Policy must be legally accurate and compliant. Options:
1. **RECOMMENDED**: Extract existing privacy policy from https://seashipping.com using WebFetch
2. Request legal team to provide current policy
3. Use industry-standard NVOCC privacy policy template (requires legal review)
4. Consider privacy policy generator for initial draft (still requires legal review)

### Code Structure
```typescript
import type { Metadata } from 'next';
import { COMPANY_INFO, REGULATORY_INFO, GA_TRACKING_ID } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy | Sea Shipping Line',
  description: 'Privacy policy and data protection information for Sea Shipping Line',
};

export default function PrivacyPage() {
  const lastUpdated = '2025-11-04'; // Update with actual date

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        {/* Page Title */}
        {/* Last Updated */}
        {/* Table of Contents */}
        {/* Privacy Policy Sections */}
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
- Consider schema.org markup for legal documents

### Special Considerations
**Google Analytics Disclosure Example**:
```
We use Google Analytics (Tracking ID: G-V0F46NZK7J) to analyze
website traffic and improve user experience. Google Analytics
collects anonymous usage data including pages visited, time spent
on site, and referral sources. For more information on how Google
uses this data, visit: https://policies.google.com/privacy
```

**C-TPAT Security Reference**:
```
As a C-TPAT certified company, Sea Shipping Line maintains enhanced
security standards for data protection and supply chain security,
as required by U.S. Customs and Border Protection.
```

## Related Issues
- Issue #021: Create Terms & Conditions Page (sister legal page)
- Issue #007: Footer Component TDD (contains the link to this page)
- Issue #018: Final QA Launch (must be completed before launch)

## Testing Checklist
- [ ] Run `npm run dev` and verify page loads at `/privacy`
- [ ] Click footer "Privacy Policy" link and verify navigation
- [ ] Test responsive design at multiple breakpoints
- [ ] Verify all internal links and table of contents anchors work
- [ ] Verify external links open in new tabs with proper rel attributes
- [ ] Check browser console for errors
- [ ] Validate HTML structure with accessibility tools
- [ ] Test with screen reader for accessibility
- [ ] Verify metadata appears correctly in browser tab and search previews
- [ ] Test table of contents navigation on mobile devices

## Regulatory References
Include these regulatory frameworks in policy content:
- General Data Protection Regulation (GDPR) - EU
- California Consumer Privacy Act (CCPA) - California
- Federal Maritime Commission (FMC) - Shipping regulations
- U.S. Customs and Border Protection (CBP) - C-TPAT
- Department of Transportation (DOT) - Interstate commerce

## Post-Implementation
- Update sitemap.ts to include /privacy route
- Add privacy policy link to sign-up/contact forms
- Notify legal team for final content review
- Add to pre-launch QA checklist (Issue #018)
- Consider implementing cookie consent banner if required
- Update robots.txt if needed
