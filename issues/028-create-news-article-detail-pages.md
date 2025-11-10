---
id: 028
title: Create News Article Detail Pages with Dynamic Routing
phase: 4
priority: high
status: todo
dependencies: []
estimated_hours: 6
tags: [pages, news, dynamic-routes, content, ssg]
---

# Create News Article Detail Pages with Dynamic Routing

## Objective
Implement dynamic routing for individual news article detail pages to make the news section fully functional. Currently, the news listing page exists but articles are not clickable and have no detail views.

## Current State
- `/src/app/news/page.tsx` exists with 14 news articles defined in local array
- Articles are displayed as cards but have no click functionality
- Article data structure exists inline but needs to be extracted to content files
- No individual article pages exist

## Requirements

### Pages Needed
- `/src/app/news/[slug]/page.tsx` - Dynamic route for individual articles
- Each article should have its own detail page with full content
- URL structure: `/news/u-s-announces-trade-deal-with-china` (slug format)

### Article Data Structure
```typescript
// src/types/index.ts
export interface NewsArticle {
  id: string
  slug: string
  title: string
  date: string
  category: string
  shortDescription: string
  fullContent: string
  image: string
  imageAlt: string
  author?: string
  tags?: string[]
  relatedArticles?: string[]
}
```

### Content Organization
Move article data from `/src/app/news/page.tsx` to content files:
```
/src/content/
  /news/
    articles.ts       # All article data
    categories.ts     # Category definitions
```

## Implementation Steps

### 1. Extract and Expand Article Data

```typescript
// src/content/news/articles.ts
import { NewsArticle } from '@/types'

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    slug: 'us-announces-trade-deal-china',
    title: 'U.S. Announces Trade Deal with China',
    date: '2025-06-12',
    category: 'Trade Policy',
    shortDescription: 'Major developments in U.S.-China trade relations...',
    fullContent: `
      <full article content here with proper paragraphs>

      The comprehensive trade agreement between the United States and China
      marks a significant milestone in bilateral relations...

      Key points of the agreement include:
      - Tariff reductions on specific goods
      - Improved intellectual property protections
      - Enhanced market access for services

      Impact on shipping operations...
    `,
    image: '/images/news/trade-deal.jpg',
    imageAlt: 'International trade and business meeting',
    author: 'Sea Shipping Line Editorial Team',
    tags: ['trade-policy', 'china', 'tariffs', 'international-trade'],
    relatedArticles: ['4', '5']
  },
  // ... all other articles with full content
]
```

### 2. Create Dynamic Article Page

```typescript
// src/app/news/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { newsArticles } from '@/content/news/articles'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Tag, ArrowLeft, Share2 } from 'lucide-react'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = newsArticles.find((a) => a.slug === params.slug)
  if (!article) return {}

  return {
    title: `${article.title} | News | Sea Shipping Line`,
    description: article.shortDescription,
    openGraph: {
      title: article.title,
      description: article.shortDescription,
      images: [article.image],
      type: 'article',
      publishedTime: article.date,
    },
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = newsArticles.find((a) => a.slug === params.slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = article.relatedArticles
    ? newsArticles.filter((a) => article.relatedArticles?.includes(a.id))
    : newsArticles.slice(0, 3).filter((a) => a.id !== article.id)

  return (
    <main id="main" role="main">
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

      {/* Article Header */}
      <article className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-6 text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            {article.author && (
              <div>
                By {article.author}
              </div>
            )}
          </div>

          {/* Featured Image */}
          <div className="relative h-[400px] md:h-[500px] mb-8 rounded-lg overflow-hidden">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: article.fullContent }} />
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <Tag className="w-4 h-4 text-gray-600 mr-2" />
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          )}

          {/* Share Actions */}
          <div className="border-t border-b py-6 mb-12">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">Share this article</span>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    href={`/news/${related.slug}`}
                    className="block group"
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <div className="relative h-48 w-full">
                        <Image
                          src={related.image}
                          alt={related.imageAlt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                          {related.title}
                        </h3>
                        <time className="text-sm text-gray-500">
                          {new Date(related.date).toLocaleDateString()}
                        </time>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA Section */}
          <div className="mt-12 p-8 bg-blue-50 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Need Shipping Services?</h3>
            <p className="text-gray-700 mb-6">
              Our team of experts is ready to help with your freight forwarding needs
            </p>
            <Link href="/request">
              <Button size="lg" style={{ backgroundColor: '#ee1c23' }}>
                Request a Rate Quote
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </main>
  )
}
```

### 3. Update News Listing Page

Make articles clickable by wrapping cards in Links:

```typescript
// src/app/news/page.tsx
import Link from 'next/link'
// ... existing imports

{newsArticles.map((article) => (
  <Link key={article.id} href={`/news/${article.slug}`} className="block">
    <Card className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* existing card content */}
    </Card>
  </Link>
))}
```

### 4. Add Slug Generation Utility

```typescript
// src/lib/utils.ts (add to existing file)
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
```

### 5. Content Migration Steps

1. **Extract existing articles**: Move data from `/src/app/news/page.tsx` to `/src/content/news/articles.ts`
2. **Add slugs**: Generate SEO-friendly slugs for each article
3. **Write full content**: Expand `description` field into `fullContent` with complete article text
4. **Add metadata**: Include author, tags, and related articles
5. **Update imports**: Change listing page to import from content files

## Content Writing Requirements

Each article needs:
- **Full content** (400-800 words): Expand the current description into complete article
- **Proper structure**: Use headings, paragraphs, lists
- **Context**: Explain how it affects Sea Shipping Line customers
- **Call to action**: Encourage readers to contact for more information
- **SEO optimization**: Include relevant keywords naturally

Example full content structure:
```
<p>Lead paragraph with hook and main points...</p>

<h2>Background</h2>
<p>Context about the news...</p>

<h2>Key Details</h2>
<ul>
  <li>Point 1</li>
  <li>Point 2</li>
  <li>Point 3</li>
</ul>

<h2>Impact on Shipping Operations</h2>
<p>How this affects customers...</p>

<h2>What This Means for You</h2>
<p>Practical implications...</p>

<p>Closing paragraph with CTA...</p>
```

## Testing Requirements

### Unit Tests
```typescript
// __tests__/unit/app/news/[slug]/page.test.tsx
describe('News Article Detail Page', () => {
  it('renders article title')
  it('displays article content')
  it('shows publication date')
  it('displays category badge')
  it('renders featured image')
  it('shows author if present')
  it('displays tags if present')
  it('shows related articles')
  it('includes back to news link')
  it('includes CTA section')
  it('returns 404 for invalid slug')
  it('has no accessibility violations')
  it('generates correct metadata')
})
```

### E2E Tests
```typescript
// __tests__/e2e/journeys/news.spec.ts
test('user can navigate from news list to article detail', async ({ page }) => {
  await page.goto('/news')
  await page.click('text=U.S. Announces Trade Deal')
  await expect(page).toHaveURL(/\/news\/.+/)
  await expect(page.locator('h1')).toContainText('Trade Deal')
})

test('related articles are clickable', async ({ page }) => {
  await page.goto('/news/us-announces-trade-deal-china')
  await page.click('.related-articles a:first-child')
  await expect(page).toHaveURL(/\/news\/.+/)
})

test('back button returns to news listing', async ({ page }) => {
  await page.goto('/news/us-announces-trade-deal-china')
  await page.click('text=Back to News')
  await expect(page).toHaveURL('/news')
})
```

## SEO Requirements
- Generate unique `title` and `description` meta tags per article
- Include Open Graph tags for social sharing
- Add structured data (Article schema)
- Use semantic HTML (`<article>`, `<time>`)
- Include canonical URLs
- Add breadcrumb navigation

## Acceptance Criteria
- ✅ Dynamic route `/news/[slug]/page.tsx` created
- ✅ generateStaticParams implemented for all articles
- ✅ Article data moved to `/src/content/news/articles.ts`
- ✅ All 14 articles have slugs generated
- ✅ All 14 articles have full content written (400-800 words each)
- ✅ Article detail page renders title, date, category, image
- ✅ Full article content displays with proper formatting
- ✅ Tags display if present
- ✅ Related articles section shows 3 relevant articles
- ✅ Back to news link functional
- ✅ CTA section included
- ✅ News listing page updated with clickable article links
- ✅ 404 handling for invalid slugs
- ✅ Metadata generated correctly per article
- ✅ Mobile responsive design
- ✅ Unit tests written and passing
- ✅ E2E tests written and passing
- ✅ Zero accessibility violations
- ✅ Images optimized with proper `sizes` attribute

## Notes
- Use Static Site Generation (SSG) with `generateStaticParams` for performance
- Consider markdown files for future content management if articles grow beyond 20
- Full content can use HTML or implement markdown rendering
- Ensure consistent date formatting across all articles
- Consider adding newsletter signup at bottom of articles
- Share functionality can be enhanced with actual social sharing later
- Image optimization is critical - ensure proper Next.js Image configuration

## Dependencies
- None (can be implemented immediately)

## Related Issues
- **029**: FCL NVO article page (similar implementation pattern)
- **030**: Newsletter archive page (related news content)
