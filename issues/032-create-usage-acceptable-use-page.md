---
id: 032
title: Create Acceptable Use Policy Page (/usage)
phase: 4
priority: medium
status: todo
dependencies: []
estimated_hours: 3
tags: [pages, legal, compliance, content]
---

# Create Acceptable Use Policy Page

## Objective
Create a comprehensive acceptable use policy page at `/usage` that outlines the terms and conditions for using the Sea Shipping Line website. This page provides legal protection and sets clear expectations for user behavior.

## Current State
- Page does not exist (would return 404)
- v1 site has this page at `https://seashipping.com/usage`
- No legal/terms pages currently exist in Next.js app
- Need to ensure compliance and legal protection

## Requirements

### Page Location
`/src/app/usage/page.tsx`

### Content Sections (from v1 site)
1. **Acceptance of Terms and Conditions**
   - Agreement by use statement
   - Material modification notice policy
   - Continued use implies acceptance

2. **Restrictions on Use**
   - Prohibited activities list
   - Automated scraping policy (with search engine exception)
   - Spam transmission prohibition
   - Malware upload prohibition
   - Identity misrepresentation prohibition

3. **User-Provided Content**
   - Content license terms
   - Royalty-free, perpetual, irrevocable license
   - Sublicensable and transferable rights
   - Worldwide, non-exclusive scope

4. **Disclaimers and Liability Limitations**
   - No warranty disclaimers
   - Liability limited to $100
   - User responsibility for accuracy
   - "As-is" service provision

5. **Indemnification**
   - User defense obligations
   - Claims coverage scope
   - Misuse and violation protection

6. **Dispute Resolution**
   - Arbitration requirement (California)
   - JAMS arbitration rules
   - Class action waiver
   - Individual claims mandate

7. **Governing Law**
   - California law jurisdiction
   - UN convention exclusion
   - Venue specifications

## Implementation Steps

### 1. Page Component Structure

```typescript
// src/app/usage/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { COMPANY_INFO } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Acceptable Use Policy | Sea Shipping Line',
  description: 'Terms and conditions of use for the Sea Shipping Line website, including restrictions, disclaimers, and legal policies.',
  robots: 'noindex, nofollow', // Legal pages typically not indexed
}

export default function UsagePolicyPage() {
  const lastUpdated = 'January 2025' // Update this date

  return (
    <main id="main" role="main" className="bg-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4 border-b">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Page Header */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Acceptable Use Policy
          </h1>
          <p className="text-lg text-gray-600">
            Terms and Conditions of Use for {COMPANY_INFO.name}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <article className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {/* Section 1: Acceptance of Terms */}
            <section id="acceptance" className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                1. Acceptance of Terms and Conditions
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By using this website (the "Site"), you signify your agreement to these terms
                and conditions (the "Terms"). If you do not agree to these Terms, please do not
                use the Site.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                {COMPANY_INFO.name} reserves the right to modify these Terms at any time. We will
                notify users of any material modifications by updating this page. Your continued
                use of the Site following any such modifications constitutes your acceptance of
                the new Terms.
              </p>
            </section>

            {/* Section 2: Restrictions on Use */}
            <section id="restrictions" className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                2. Restrictions on Use
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may not use the Site for any purpose that is unlawful or prohibited by these
                Terms. You may not use the Site in any manner that could damage, disable,
                overburden, or impair our servers or networks.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-gray-900">Prohibited Activities</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                You specifically agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>
                  Use any automated means (including bots, scrapers, or spiders) to access the
                  Site, except for public search engines operating according to our robots.txt file
                </li>
                <li>
                  Transmit spam, chain letters, or other unsolicited communications through the Site
                </li>
                <li>
                  Upload, post, or transmit any material that contains viruses, malware, or other
                  harmful computer code
                </li>
                <li>
                  Misrepresent your identity or affiliation with any person or organization
                </li>
                <li>
                  Attempt to gain unauthorized access to our systems or networks
                </li>
                <li>
                  Interfere with or disrupt the Site or servers connected to the Site
                </li>
                <li>
                  Violate any applicable local, state, national, or international law
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-gray-900">Search Engine Exception</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {COMPANY_INFO.name} grants the operators of public search engines revocable
                permission to use spiders to copy materials from the Site for the sole purpose
                of creating publicly available searchable indices of the materials, but not
                caches or archives of such materials. We reserve the right to revoke these
                exceptions at any time.
              </p>
            </section>

            {/* Section 3: User-Provided Content */}
            <section id="user-content" className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                3. User-Provided Content
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By posting, uploading, or submitting any content, materials, or information to
                the Site (including but not limited to feedback, suggestions, ideas, or
                questions), you hereby grant {COMPANY_INFO.name} a royalty-free, sublicensable,
                transferable, perpetual, irrevocable, non-exclusive, worldwide license to use,
                reproduce, modify, adapt, publish, translate, create derivative works from,
                distribute, perform, and display such content in any media.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                You represent and warrant that you own or have the necessary rights to the
                content you submit and that such content does not violate the rights of any
                third party.
              </p>
            </section>

            {/* Section 4: Disclaimers and Liability Limitations */}
            <section id="disclaimers" className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                4. Disclaimers and Limitation of Liability
              </h2>

              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Disclaimer of Warranties
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                THE SITE AND ALL CONTENT, MATERIALS, INFORMATION, PRODUCTS, AND SERVICES PROVIDED
                ON THE SITE ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. {COMPANY_INFO.name.toUpperCase()}{' '}
                MAKES NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION WARRANTIES
                OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                {COMPANY_INFO.name} does not warrant that the Site will be uninterrupted or
                error-free, that defects will be corrected, or that the Site or the servers that
                make it available are free of viruses or other harmful components.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Limitation of Liability
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, {COMPANY_INFO.name.toUpperCase()} SHALL NOT
                BE LIABLE FOR ANY DAMAGES OF ANY KIND ARISING FROM THE USE OF THE SITE, INCLUDING
                BUT NOT LIMITED TO DIRECT, INDIRECT, INCIDENTAL, PUNITIVE, AND CONSEQUENTIAL DAMAGES.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                IN NO EVENT SHALL {COMPANY_INFO.name.toUpperCase()}'S TOTAL LIABILITY TO YOU FOR ALL
                DAMAGES, LOSSES, AND CAUSES OF ACTION EXCEED ONE HUNDRED DOLLARS ($100).
              </p>

              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                User Responsibility
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You are solely responsible for the accuracy of all information and materials
                provided by you through the Site. {COMPANY_INFO.name} assumes no responsibility
                for the accuracy, completeness, or timeliness of information you provide.
              </p>
            </section>

            {/* Section 5: Indemnification */}
            <section id="indemnification" className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                5. Indemnification
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree to indemnify, defend, and hold harmless {COMPANY_INFO.name}, its
                officers, directors, employees, agents, and affiliates from and against any and
                all claims, liabilities, damages, losses, costs, expenses, or fees (including
                reasonable attorneys' fees) arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Your use or misuse of the Site</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another party</li>
                <li>Your negligence or willful misconduct</li>
                <li>Any content you submit to the Site</li>
              </ul>
            </section>

            {/* Section 6: Dispute Resolution */}
            <section id="disputes" className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                6. Dispute Resolution and Arbitration
              </h2>

              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Binding Arbitration
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Any dispute, claim, or controversy arising out of or relating to these Terms or
                the breach, termination, enforcement, interpretation, or validity thereof,
                including the determination of the scope or applicability of this agreement to
                arbitrate, shall be determined by arbitration in California before a single
                arbitrator.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                The arbitration shall be administered by JAMS (Judicial Arbitration and Mediation
                Services) pursuant to its Comprehensive Arbitration Rules and Procedures. Judgment
                on the award may be entered in any court having jurisdiction.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Class Action Waiver
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                YOU AND {COMPANY_INFO.name.toUpperCase()} AGREE THAT EACH MAY BRING CLAIMS AGAINST
                THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS
                MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Unless both you and {COMPANY_INFO.name} agree otherwise, the arbitrator may not
                consolidate more than one person's claims, and may not otherwise preside over any
                form of a representative or class proceeding.
              </p>
            </section>

            {/* Section 7: Governing Law */}
            <section id="governing-law" className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                7. Governing Law
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the
                State of California, United States of America, without giving effect to any
                principles of conflicts of law.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                The United Nations Convention on Contracts for the International Sale of Goods
                shall not apply to these Terms.
              </p>
            </section>

            {/* Section 8: Severability */}
            <section id="severability" className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                8. Severability
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If any provision of these Terms is found to be unlawful, void, or unenforceable,
                then that provision shall be deemed severable from these Terms and shall not
                affect the validity and enforceability of any remaining provisions.
              </p>
            </section>

            {/* Section 9: Entire Agreement */}
            <section id="entire-agreement" className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                9. Entire Agreement
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms constitute the entire agreement between you and {COMPANY_INFO.name}{' '}
                regarding the use of the Site and supersede all prior or contemporaneous
                communications and proposals, whether electronic, oral, or written, between you
                and {COMPANY_INFO.name} with respect to the Site.
              </p>
            </section>

            {/* Contact Information */}
            <section id="contact" className="mb-12 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Questions About This Policy?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Acceptable Use Policy, please contact us:
              </p>
              <div className="text-gray-700">
                <p className="mb-2">
                  <strong>{COMPANY_INFO.name}</strong>
                </p>
                <p className="mb-2">{COMPANY_INFO.address.street}</p>
                <p className="mb-2">
                  {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state}{' '}
                  {COMPANY_INFO.address.zip}
                </p>
                <p className="mb-2">
                  Email:{' '}
                  <a
                    href={`mailto:${COMPANY_INFO.contact.email.general}`}
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {COMPANY_INFO.contact.email.general}
                  </a>
                </p>
                <p className="mb-2">
                  Phone:{' '}
                  <a
                    href={`tel:${COMPANY_INFO.contact.phone.replace(/[^0-9]/g, '')}`}
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {COMPANY_INFO.contact.phone}
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </article>

      {/* Related Pages */}
      <section className="py-12 bg-gray-50 border-t">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Related Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/about"
              className="p-6 bg-white rounded-lg border hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-lg mb-2 text-gray-900">About Us</h3>
              <p className="text-gray-600 text-sm">
                Learn more about Sea Shipping Line and our 37+ years of experience
              </p>
            </Link>
            <Link
              href="/request"
              className="p-6 bg-white rounded-lg border hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-lg mb-2 text-gray-900">Contact Us</h3>
              <p className="text-gray-600 text-sm">
                Get in touch with our team for quotes, support, or inquiries
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
```

## Testing Requirements

### Unit Tests
```typescript
// __tests__/unit/app/usage/page.test.tsx
import { render, screen } from '@testing-library/react'
import UsagePolicyPage from '@/app/usage/page'

describe('Acceptable Use Policy Page', () => {
  it('renders page title', () => {
    render(<UsagePolicyPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Acceptable Use Policy')
  })

  it('displays all required sections', () => {
    render(<UsagePolicyPage />)

    // Check for key section headings
    expect(screen.getByText(/Acceptance of Terms/i)).toBeInTheDocument()
    expect(screen.getByText(/Restrictions on Use/i)).toBeInTheDocument()
    expect(screen.getByText(/User-Provided Content/i)).toBeInTheDocument()
    expect(screen.getByText(/Disclaimers/i)).toBeInTheDocument()
    expect(screen.getByText(/Indemnification/i)).toBeInTheDocument()
    expect(screen.getByText(/Dispute Resolution/i)).toBeInTheDocument()
    expect(screen.getByText(/Governing Law/i)).toBeInTheDocument()
  })

  it('includes contact information section', () => {
    render(<UsagePolicyPage />)
    expect(screen.getByText(/Questions About This Policy/i)).toBeInTheDocument()
  })

  it('displays last updated date', () => {
    render(<UsagePolicyPage />)
    expect(screen.getByText(/Last Updated:/i)).toBeInTheDocument()
  })

  it('has back to home navigation link', () => {
    render(<UsagePolicyPage />)
    const backLink = screen.getByRole('link', { name: /Back to Home/i })
    expect(backLink).toHaveAttribute('href', '/')
  })

  it('includes related pages section', () => {
    render(<UsagePolicyPage />)
    expect(screen.getByText(/Related Information/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /About Us/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Contact Us/i })).toBeInTheDocument()
  })

  it('has proper semantic HTML structure', () => {
    render(<UsagePolicyPage />)
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('article')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<UsagePolicyPage />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

### E2E Tests
```typescript
// __tests__/e2e/pages/usage.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Acceptable Use Policy Page', () => {
  test('page loads successfully', async ({ page }) => {
    await page.goto('/usage')
    await expect(page).toHaveTitle(/Acceptable Use Policy/)
    await expect(page.locator('h1')).toContainText('Acceptable Use Policy')
  })

  test('all policy sections are visible', async ({ page }) => {
    await page.goto('/usage')

    const sections = [
      'Acceptance of Terms',
      'Restrictions on Use',
      'User-Provided Content',
      'Disclaimers',
      'Indemnification',
      'Dispute Resolution',
      'Governing Law',
    ]

    for (const section of sections) {
      await expect(page.locator(`text=${section}`)).toBeVisible()
    }
  })

  test('contact information is displayed', async ({ page }) => {
    await page.goto('/usage')
    await expect(page.locator('text=Questions About This Policy?')).toBeVisible()
    await expect(page.locator('a[href^="mailto:"]')).toBeVisible()
    await expect(page.locator('a[href^="tel:"]')).toBeVisible()
  })

  test('related pages links work', async ({ page }) => {
    await page.goto('/usage')

    await page.click('text=About Us')
    await expect(page).toHaveURL('/about')

    await page.goBack()

    await page.click('text=Contact Us')
    await expect(page).toHaveURL('/request')
  })

  test('back to home link works', async ({ page }) => {
    await page.goto('/usage')
    await page.click('text=Back to Home')
    await expect(page).toHaveURL('/')
  })

  test('page is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/usage')

    // Check that content is visible and readable on mobile
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('article')).toBeVisible()
  })
})
```

## SEO Requirements
- **Title**: "Acceptable Use Policy | Sea Shipping Line"
- **Meta Description**: Clear description of page purpose
- **Robots**: `noindex, nofollow` (standard for legal pages)
- **Semantic HTML**: Use `<article>`, `<section>` tags
- **Internal Links**: Link to About and Contact pages
- Not included in sitemap (legal/policy pages typically excluded)

## Accessibility Requirements
- Semantic HTML structure
- Proper heading hierarchy (h1 → h2 → h3)
- Skip navigation link if needed
- Sufficient color contrast (WCAG AA)
- Readable font sizes
- Mobile responsive layout
- Keyboard navigation support
- ARIA labels where appropriate

## Acceptance Criteria
- ✅ Page created at `/src/app/usage/page.tsx`
- ✅ All 7+ policy sections implemented
- ✅ Content matches legal requirements from v1 site
- ✅ Company information dynamically pulled from constants
- ✅ Last updated date displayed
- ✅ Contact information section included
- ✅ Back navigation functional
- ✅ Related pages section with working links
- ✅ Mobile responsive design
- ✅ Proper semantic HTML structure
- ✅ SEO metadata configured
- ✅ Unit tests written and passing
- ✅ E2E tests written and passing
- ✅ Zero accessibility violations
- ✅ Build succeeds with no errors
- ✅ Proper typography and spacing (matches brand guidelines)

## Notes
- **Legal Review**: Consider having legal counsel review the final content before deployment
- **Last Updated**: Update the date whenever content changes
- **robots.txt**: Ensure legal pages can be accessed but not indexed
- **Footer Link**: May want to add link to this page in footer legal section
- **Related Pages**: Consider creating Privacy Policy and Cookie Policy pages in future
- **Version Control**: Keep historical versions of policy changes
- **User Notification**: If making material changes, add notification banner on site
- **Formatting**: Use proper legal formatting (numbered sections, subsections)
- **Readability**: Balance legal precision with user readability
- **Compliance**: Ensure compliance with relevant regulations (GDPR, CCPA, etc.)

## Future Enhancements
- Add table of contents with anchor links for long content
- Include version history or changelog
- Add "Print this page" functionality
- Consider PDF download option
- Add multilingual support if needed
- Implement consent tracking if required
- Add modal for first-time visitors to accept terms

## Related Issues
- None currently, but may want to create:
  - Privacy Policy page
  - Cookie Policy page
  - DMCA Notice page
  - Shipping Terms & Conditions page
