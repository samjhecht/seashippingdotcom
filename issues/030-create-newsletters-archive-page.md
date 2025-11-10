---
id: 030
title: Create Newsletter Archive Page with Downloadable PDFs
phase: 4
priority: medium
status: todo
dependencies: [013]
estimated_hours: 5
tags: [pages, content, resources, pdf, migration]
---

# Create Newsletter Archive Page with Downloadable PDFs

## Objective
Create a newsletter archive page providing access to Sea Shipping Line's quarterly publications from 2019-2024. This page is currently linked in the footer but does not exist, and newsletter PDFs need to be migrated from the WordPress v1 site.

## Current State
- Footer links to `/news/newsletters` (404 error)
- Newsletter PDFs exist on WordPress v1 site but not migrated
- No newsletter archive structure in Next.js app
- Newsletter subscription CTA exists on `/news` page but no archive

## Requirements

### Page Location
`/src/app/news/newsletters/page.tsx`

### Newsletter Structure
- **Quarterly publications**: Spring, Summer, Fall, Winter
- **Date range**: 2019 - 2024 (6 years, ~24 newsletters)
- **Format**: PDF downloads with cover thumbnails
- **Organization**: Chronological (newest first) or by year

### Content Per Newsletter
- Publication date (Quarter + Year)
- Cover image/thumbnail
- Brief description or highlights
- Download link (PDF file)
- File size indicator
- Optional: Featured articles/topics

## Implementation Steps

### 1. Newsletter Data Structure

```typescript
// src/types/index.ts
export interface Newsletter {
  id: string
  title: string
  quarter: 'Spring' | 'Summer' | 'Fall' | 'Winter'
  year: number
  date: string
  description: string
  pdfUrl: string
  coverImage: string
  fileSize: string
  highlights?: string[]
}
```

### 2. Newsletter Data File

```typescript
// src/content/newsletters.ts
import { Newsletter } from '@/types'

export const newsletters: Newsletter[] = [
  {
    id: 'winter-2024',
    title: 'Winter 2024 Newsletter',
    quarter: 'Winter',
    year: 2024,
    date: '2024-12-01',
    description: 'Year-end recap, 2025 shipping outlook, holiday schedule updates, and new service announcements.',
    pdfUrl: '/newsletters/ssl-newsletter-winter-2024.pdf',
    coverImage: '/images/newsletters/winter-2024-cover.jpg',
    fileSize: '2.3 MB',
    highlights: [
      '2024 Year in Review',
      '2025 Shipping Forecast',
      'Holiday Schedule',
      'New China Routes'
    ]
  },
  {
    id: 'fall-2024',
    title: 'Fall 2024 Newsletter',
    quarter: 'Fall',
    year: 2024,
    date: '2024-09-01',
    description: 'Port strike updates, peak season capacity management, ILA contract negotiations, and tariff changes.',
    pdfUrl: '/newsletters/ssl-newsletter-fall-2024.pdf',
    coverImage: '/images/newsletters/fall-2024-cover.jpg',
    fileSize: '1.8 MB',
    highlights: [
      'Port Strike Impact',
      'Peak Season Strategies',
      'ILA-USMX Negotiations',
      'Capacity Updates'
    ]
  },
  // ... remaining newsletters
  {
    id: 'spring-2019',
    title: 'Spring 2019 Newsletter',
    quarter: 'Spring',
    year: 2019,
    date: '2019-03-01',
    description: 'Spring shipping trends, trade policy updates, and service enhancements.',
    pdfUrl: '/newsletters/ssl-newsletter-spring-2019.pdf',
    coverImage: '/images/newsletters/spring-2019-cover.jpg',
    fileSize: '1.5 MB',
    highlights: [
      'Q1 Trade Outlook',
      'Service Improvements',
      'Customer Success Stories'
    ]
  },
]

// Utility function to group by year
export function getNewslettersByYear(): Record<number, Newsletter[]> {
  return newsletters.reduce((acc, newsletter) => {
    if (!acc[newsletter.year]) {
      acc[newsletter.year] = []
    }
    acc[newsletter.year].push(newsletter)
    return acc
  }, {} as Record<number, Newsletter[]>)
}
```

### 3. Newsletter Archive Page Component

```typescript
// src/app/news/newsletters/page.tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Download, FileText, Calendar, ArrowLeft } from 'lucide-react'
import { newsletters, getNewslettersByYear } from '@/content/newsletters'

export const metadata: Metadata = {
  title: 'Newsletter Archive | Sea Shipping Line',
  description: 'Access our quarterly shipping industry newsletters from 2019-2024. Stay informed with trade updates, market insights, and company news.',
  keywords: 'shipping newsletter, trade updates, freight forwarding news, logistics newsletter',
}

export default function NewslettersPage() {
  const newslettersByYear = getNewslettersByYear()
  const years = Object.keys(newslettersByYear)
    .map(Number)
    .sort((a, b) => b - a) // Newest first

  return (
    <main id="main" role="main">
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0">
          <Image
            src="/images/news/shipping-news-hero.jpg"
            alt="Newsletter archive"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Newsletter Archive
          </h1>
          <p className="text-xl md:text-2xl">
            Quarterly insights on shipping, trade, and logistics since 2019
          </p>
        </div>
      </section>

      {/* Back Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <Link
            href="/news"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to News
          </Link>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-lg text-gray-700 text-center mb-8">
            Our quarterly newsletter provides industry insights, trade policy updates, company news,
            and shipping best practices. Download any edition to stay informed about global logistics trends.
          </p>

          {/* Subscription CTA */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold mb-3">Subscribe to Our Newsletter</h2>
            <p className="text-gray-700 mb-4">
              Receive quarterly updates directly in your inbox
            </p>
            <Link href="/request">
              <Button style={{ backgroundColor: '#ee1c23' }}>
                Subscribe Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Archive by Year */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          {years.map((year) => (
            <div key={year} className="mb-16 last:mb-0">
              <h2 className="text-3xl font-bold mb-8 flex items-center">
                <Calendar className="w-8 h-8 mr-3 text-blue-600" />
                {year}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {newslettersByYear[year].map((newsletter) => (
                  <Card
                    key={newsletter.id}
                    className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {/* Cover Image */}
                    <div className="relative h-64 w-full bg-gray-200">
                      <Image
                        src={newsletter.coverImage}
                        alt={`${newsletter.title} cover`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      {/* Quarter Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {newsletter.quarter}
                        </span>
                      </div>
                    </div>

                    <CardContent className="flex-grow p-6">
                      <h3 className="font-bold text-lg mb-2">
                        {newsletter.quarter} {newsletter.year}
                      </h3>

                      <p className="text-sm text-gray-600 mb-4">
                        {newsletter.description}
                      </p>

                      {/* Highlights */}
                      {newsletter.highlights && newsletter.highlights.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                            Inside This Issue:
                          </p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {newsletter.highlights.map((highlight, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* File Size */}
                      <div className="flex items-center text-xs text-gray-500 mb-4">
                        <FileText className="w-3 h-3 mr-1" />
                        PDF · {newsletter.fileSize}
                      </div>

                      {/* Download Button */}
                      <a
                        href={newsletter.pdfUrl}
                        download
                        className="block w-full"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          className="w-full"
                          style={{ borderColor: '#ee1c23', color: '#ee1c23' }}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Alternative: Newsletter Subscription Form */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Never Miss an Update
            </h2>
            <p className="text-xl mb-8">
              Subscribe to receive our newsletter and stay ahead of shipping industry trends
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request">
                <Button
                  size="lg"
                  style={{ backgroundColor: '#ee1c23' }}
                  className="text-white"
                >
                  Subscribe to Newsletter
                </Button>
              </Link>
              <Link href="/news">
                <Button size="lg" variant="outline" className="bg-white text-blue-900">
                  View Latest News
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Additional Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/news" className="block group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    Industry News
                  </h3>
                  <p className="text-sm text-gray-600">
                    Latest updates on shipping, trade policy, and regulations
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/resources" className="block group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    Forms & Documents
                  </h3>
                  <p className="text-sm text-gray-600">
                    Download bills of lading, claims forms, and other resources
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/news/why-choose-fcl-nvo" className="block group">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    Why Choose FCL NVO
                  </h3>
                  <p className="text-sm text-gray-600">
                    Learn about the benefits of working with an NVOCC
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
```

## Content Migration Requirements

### 1. PDF Collection
- Access WordPress v1 site and download all newsletter PDFs
- Expected files: ~24 PDFs (6 years × 4 quarters)
- Naming convention: `ssl-newsletter-[season]-[year].pdf`
- Example: `ssl-newsletter-winter-2024.pdf`

### 2. PDF Storage
```
/public/
  /newsletters/
    ssl-newsletter-winter-2024.pdf
    ssl-newsletter-fall-2024.pdf
    ssl-newsletter-summer-2024.pdf
    ssl-newsletter-spring-2024.pdf
    ... (20 more files)
```

### 3. Cover Image Generation
For each newsletter PDF:
- Extract or screenshot first page
- Save as JPG (optimized for web)
- Resolution: 800×1000px
- Location: `/public/images/newsletters/`
- Naming: `winter-2024-cover.jpg`

### 4. Newsletter Data Entry
For each newsletter:
- Extract publication date
- Write 1-2 sentence description
- List 3-4 key highlights/topics
- Record file size
- Add to `newsletters.ts` data file

## Alternative Implementation: Simple List View

If cover images are unavailable, use a simpler table/list layout:

```typescript
// Simplified version without cover images
<div className="divide-y divide-gray-200">
  {newslettersByYear[year].map((newsletter) => (
    <div key={newsletter.id} className="py-6 flex items-center justify-between">
      <div className="flex-grow">
        <h3 className="font-bold text-lg">
          {newsletter.quarter} {newsletter.year}
        </h3>
        <p className="text-gray-600 text-sm mt-1">
          {newsletter.description}
        </p>
        <p className="text-gray-500 text-xs mt-2">
          PDF · {newsletter.fileSize}
        </p>
      </div>
      <a href={newsletter.pdfUrl} download>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </a>
    </div>
  ))}
</div>
```

## Testing Requirements

### Unit Tests
```typescript
// __tests__/unit/app/news/newsletters/page.test.tsx
describe('Newsletter Archive Page', () => {
  it('renders page title')
  it('displays newsletters grouped by year')
  it('shows correct number of newsletters per year')
  it('renders newsletter cards with all required info')
  it('download links have correct URLs')
  it('displays file sizes')
  it('shows highlights if present')
  it('includes subscription CTA')
  it('has back to news link')
  it('shows related resources')
  it('has no accessibility violations')
})
```

### E2E Tests
```typescript
// __tests__/e2e/journeys/newsletters.spec.ts
test('can access newsletter archive from footer', async ({ page }) => {
  await page.goto('/')
  await page.click('footer >> text=Newsletters')
  await expect(page).toHaveURL('/news/newsletters')
  await expect(page.locator('h1')).toContainText('Newsletter Archive')
})

test('can download newsletter PDF', async ({ page }) => {
  await page.goto('/news/newsletters')

  // Set up download handler
  const downloadPromise = page.waitForEvent('download')

  await page.click('text=Download PDF >> nth=0')
  const download = await downloadPromise

  expect(download.suggestedFilename()).toContain('ssl-newsletter')
  expect(download.suggestedFilename()).toContain('.pdf')
})

test('newsletters organized by year', async ({ page }) => {
  await page.goto('/news/newsletters')

  // Should show years 2024, 2023, 2022, 2021, 2020, 2019
  await expect(page.locator('h2:has-text("2024")')).toBeVisible()
  await expect(page.locator('h2:has-text("2019")')).toBeVisible()
})
```

## SEO Requirements
- Title: "Newsletter Archive | Sea Shipping Line"
- Meta description highlighting quarterly publications
- Each newsletter PDF should be accessible (not blocked by robots.txt)
- Add link from main `/news` page to newsletter archive
- Include in sitemap
- Use semantic HTML (`<time>`, `<article>`)

## Acceptance Criteria
- ✅ Page created at `/src/app/news/newsletters/page.tsx`
- ✅ Footer link to newsletters no longer returns 404
- ✅ Newsletter data structure defined in `/src/content/newsletters.ts`
- ✅ All newsletter PDFs migrated from WordPress v1
- ✅ PDFs stored in `/public/newsletters/` directory
- ✅ Cover images generated and optimized (or simple list view implemented)
- ✅ Newsletters organized by year (newest first)
- ✅ Each newsletter displays: title, description, highlights, file size
- ✅ Download buttons functional with correct PDF links
- ✅ Subscription CTA included
- ✅ Related resources section present
- ✅ Back to news link functional
- ✅ Mobile responsive design
- ✅ Unit tests written and passing
- ✅ E2E test for download functionality
- ✅ Zero accessibility violations
- ✅ SEO metadata optimized

## Notes
- This task depends on Issue #013 (Content Migration & Assets) being tracked
- PDF file size limit: Keep under 5MB per file for web performance
- Consider lazy loading for images if many newsletters
- Could add search/filter functionality in future enhancement
- May want to add featured newsletter on homepage
- Consider email subscription form integration later
- Placeholder images can be used initially if cover generation is time-consuming

## Migration Checklist
```markdown
- [ ] Access WordPress v1 admin panel
- [ ] Locate newsletter PDFs (likely in Media Library)
- [ ] Download all PDFs (2019-2024)
- [ ] Rename files with consistent naming convention
- [ ] Compress PDFs if necessary (target < 3MB each)
- [ ] Generate or extract cover images
- [ ] Optimize cover images (WebP format, 800×1000px)
- [ ] Create `/public/newsletters/` directory
- [ ] Upload PDFs to public directory
- [ ] Create `/public/images/newsletters/` directory
- [ ] Upload cover images
- [ ] Extract metadata (dates, topics) for each newsletter
- [ ] Populate `newsletters.ts` data file
- [ ] Verify all download links work
- [ ] Test PDF accessibility in browsers
```

## Dependencies
- **Issue #013**: Content Migration & Assets (newsletter PDFs need to be migrated)

## Related Issues
- **028**: News article detail pages (similar content organization)
- **029**: FCL NVO article page (similar educational content)
- **013**: Content migration (PDF files need to be collected)
