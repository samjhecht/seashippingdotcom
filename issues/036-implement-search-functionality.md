---
id: 036
title: Implement Site-Wide Search Functionality
phase: 5
priority: low
status: todo
dependencies: [028, 029, 030]
estimated_hours: 8
tags: [feature, search, enhancement, user-experience]
---

# Implement Site-Wide Search Functionality

## Objective
Implement a comprehensive site-wide search feature that allows users to quickly find content across news articles, services, resources, and other pages. The v1 site has search functionality that should be replicated with modern search UX patterns.

## Current State
- No search functionality exists in Next.js app
- v1 WordPress site has search feature
- Users have no way to search for content
- Large content library (forms, articles, services) difficult to navigate
- No search bar in header or navigation

## Problem Statement
Without search functionality:
1. **Poor Discoverability**: Users can't easily find specific content
2. **Navigation Friction**: Must manually browse through pages
3. **Feature Parity**: v1 site has search, new site doesn't
4. **User Experience**: Missing expected website feature
5. **Content Accessibility**: Valuable content remains hidden
6. **Efficiency**: Users waste time clicking through pages

## Requirements

### Search Scope
Content to be searchable:
1. **News Articles** - Titles, content, tags
2. **Service Pages** - Page content, descriptions
3. **Resources** - Form names, descriptions
4. **About/Company Pages** - Static page content
5. **Help Pages** - FAQ content, instructions

### Search Features
1. **Global Search Bar** - Accessible from all pages (header)
2. **Instant Results** - As-you-type suggestions
3. **Result Ranking** - Relevance-based ordering
4. **Search Filters** - By content type (articles, services, forms)
5. **Highlighting** - Matched terms highlighted in results
6. **Recent Searches** - Store user's recent queries
7. **Popular Searches** - Show trending/popular searches
8. **No Results State** - Helpful suggestions when no matches

### User Experience
- Fast search response (< 300ms)
- Mobile-friendly search interface
- Keyboard navigation (arrow keys, enter)
- Clear visual feedback
- Accessible (ARIA labels, screen reader support)
- Graceful error handling

## Technology Options

### Option 1: Algolia (Recommended for Production)
**Pros**:
- Extremely fast search
- Typo tolerance
- Faceted search/filtering
- Analytics dashboard
- Managed infrastructure
- Excellent DX

**Cons**:
- Paid service ($0-$1/mo for small sites)
- External dependency
- Requires indexing setup

**Cost**: ~$1/month for < 10K searches
**Complexity**: Medium
**Setup Time**: 4-6 hours

### Option 2: Fuse.js (Client-Side)
**Pros**:
- Zero cost
- No external dependencies
- Simple setup
- Good for small-medium content
- Fuzzy matching

**Cons**:
- Runs on client (limited by device)
- All data loaded to browser
- No analytics
- Less scalable

**Cost**: Free
**Complexity**: Low
**Setup Time**: 2-3 hours

### Option 3: Typesense (Self-Hosted)
**Pros**:
- Open source
- Fast search
- Self-hosted (full control)
- Good documentation
- Typo tolerance

**Cons**:
- Requires server setup
- More maintenance
- Hosting costs
- More complex than Algolia

**Cost**: Hosting costs (~$5-20/mo)
**Complexity**: High
**Setup Time**: 8-12 hours

### Option 4: Next.js API Route + Simple Search
**Pros**:
- Fully custom
- No external dependencies
- Complete control
- Free

**Cons**:
- Manual implementation
- Limited features
- Slower than specialized tools
- More maintenance

**Cost**: Free
**Complexity**: Medium-High
**Setup Time**: 6-8 hours

## Recommended Approach: Fuse.js (MVP) → Algolia (Production)

Start with Fuse.js for MVP, migrate to Algolia if search usage is high.

### Phase 1: Fuse.js Implementation

```typescript
// src/lib/search/search-engine.ts

import Fuse from 'fuse.js'

export interface SearchableContent {
  id: string
  title: string
  content: string
  type: 'article' | 'service' | 'form' | 'page' | 'tool'
  url: string
  category?: string
  tags?: string[]
  date?: string
  excerpt?: string
}

export class SearchEngine {
  private fuse: Fuse<SearchableContent>

  constructor(data: SearchableContent[]) {
    this.fuse = new Fuse(data, {
      keys: [
        { name: 'title', weight: 2 },       // Title most important
        { name: 'content', weight: 1 },      // Content medium importance
        { name: 'tags', weight: 1.5 },       // Tags important
        { name: 'excerpt', weight: 1.2 },    // Excerpt fairly important
        { name: 'category', weight: 0.8 },   // Category less important
      ],
      threshold: 0.4,                        // Fuzziness (0 = exact, 1 = match anything)
      includeScore: true,                    // Include relevance score
      includeMatches: true,                  // Highlight matches
      minMatchCharLength: 2,                 // Minimum chars to match
      ignoreLocation: true,                  // Search entire strings
    })
  }

  search(query: string, options?: { type?: string; limit?: number }): SearchResult[] {
    let results = this.fuse.search(query)

    // Filter by type if specified
    if (options?.type) {
      results = results.filter((r) => r.item.type === options.type)
    }

    // Limit results
    const limit = options?.limit || 10
    results = results.slice(0, limit)

    // Transform to SearchResult format
    return results.map((result) => ({
      id: result.item.id,
      title: result.item.title,
      excerpt: result.item.excerpt || result.item.content.slice(0, 200),
      url: result.item.url,
      type: result.item.type,
      category: result.item.category,
      tags: result.item.tags,
      score: result.score || 0,
      matches: result.matches,
    }))
  }

  searchByType(query: string, type: string, limit = 5): SearchResult[] {
    return this.search(query, { type, limit })
  }
}

export interface SearchResult {
  id: string
  title: string
  excerpt: string
  url: string
  type: string
  category?: string
  tags?: string[]
  score: number
  matches?: any[]
}
```

### Build Search Index

```typescript
// src/lib/search/build-index.ts

import { getAllNewsArticles } from '@/content/news'
import { formsInventory } from '@/content/forms'
import { industryTools } from '@/content/tools'
import type { SearchableContent } from './search-engine'

export function buildSearchIndex(): SearchableContent[] {
  const index: SearchableContent[] = []

  // Index news articles
  const articles = getAllNewsArticles()
  articles.forEach((article) => {
    index.push({
      id: `article-${article.slug}`,
      title: article.title,
      content: article.content,
      excerpt: article.excerpt,
      type: 'article',
      url: `/news/${article.slug}`,
      category: article.category,
      tags: article.tags,
      date: article.date,
    })
  })

  // Index forms
  formsInventory.forEach((form) => {
    index.push({
      id: `form-${form.id}`,
      title: form.name,
      content: form.description,
      excerpt: form.description,
      type: 'form',
      url: form.url,
      category: form.category,
    })
  })

  // Index trade tools
  industryTools.forEach((tool) => {
    index.push({
      id: `tool-${tool.id}`,
      title: tool.name,
      content: tool.description,
      excerpt: tool.description,
      type: 'tool',
      url: tool.url,
      category: 'trade-tools',
    })
  })

  // Index service pages
  const services = [
    {
      id: 'ocean-freight',
      title: 'Ocean Freight (FCL & LCL)',
      content: 'Full container load and less than container load shipping services...',
      url: '/services/ocean-freight',
    },
    {
      id: 'automobiles',
      title: 'Automobile Shipping',
      content: 'Specialized vehicle shipping services for cars, trucks, and motorcycles...',
      url: '/services/automobiles',
    },
    // ... add all services
  ]

  services.forEach((service) => {
    index.push({
      id: `service-${service.id}`,
      title: service.title,
      content: service.content,
      excerpt: service.content.slice(0, 200),
      type: 'service',
      url: service.url,
      category: 'services',
    })
  })

  // Index static pages
  const pages = [
    {
      id: 'about',
      title: 'About Sea Shipping Line',
      content: '37+ years of global shipping expertise...',
      url: '/about',
    },
    {
      id: 'contact',
      title: 'Contact Us',
      content: 'Get in touch with our team for quotes and support...',
      url: '/request',
    },
  ]

  pages.forEach((page) => {
    index.push({
      id: `page-${page.id}`,
      title: page.title,
      content: page.content,
      excerpt: page.content.slice(0, 200),
      type: 'page',
      url: page.url,
      category: 'company',
    })
  })

  return index
}
```

### Search API Route

```typescript
// src/app/api/search/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { SearchEngine } from '@/lib/search/search-engine'
import { buildSearchIndex } from '@/lib/search/build-index'

// Build index once at module load
let searchEngine: SearchEngine | null = null

function getSearchEngine(): SearchEngine {
  if (!searchEngine) {
    const index = buildSearchIndex()
    searchEngine = new SearchEngine(index)
  }
  return searchEngine
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    const type = searchParams.get('type')
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter "q" is required' },
        { status: 400 }
      )
    }

    if (query.length < 2) {
      return NextResponse.json(
        { error: 'Query must be at least 2 characters' },
        { status: 400 }
      )
    }

    const engine = getSearchEngine()
    const results = engine.search(query, { type: type || undefined, limit })

    return NextResponse.json({
      query,
      results,
      total: results.length,
      hasMore: false, // For pagination in future
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'An error occurred while searching' },
      { status: 500 }
    )
  }
}
```

### Search UI Component

```typescript
// src/components/search/SearchBar.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Search, Loader2, X, FileText, Newspaper, Package, Tool } from 'lucide-react'
import { useDebounce } from '@/hooks/use-debounce'
import type { SearchResult } from '@/lib/search/search-engine'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      searchContent(debouncedQuery)
    } else {
      setResults([])
      setIsLoading(false)
    }
  }, [debouncedQuery])

  const searchContent = async (searchQuery: string) => {
    setIsLoading(true)

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}&limit=8`
      )
      const data = await response.json()

      if (response.ok) {
        setResults(data.results)
        setIsOpen(true)
      } else {
        console.error('Search error:', data.error)
        setResults([])
      }
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelect = (url: string) => {
    setIsOpen(false)
    setQuery('')
    router.push(url)
  }

  const handleClear = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <Newspaper className="w-4 h-4" />
      case 'form':
        return <FileText className="w-4 h-4" />
      case 'service':
        return <Package className="w-4 h-4" />
      case 'tool':
        return <Tool className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  return (
    <div className="relative w-full max-w-lg">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search articles, forms, services..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true)
          }}
          className="pl-10 pr-10"
          aria-label="Search site content"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
            onClick={handleClear}
            aria-label="Clear search"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <X className="w-4 h-4" />
            )}
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && query.length >= 2 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-auto">
          {results.length > 0 ? (
            <div className="p-2">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleSelect(result.url)}
                  className="w-full text-left p-3 hover:bg-gray-50 rounded-md transition-colors flex items-start gap-3"
                >
                  <div className="mt-1 text-gray-400">{getIcon(result.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">
                      {result.title}
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-2">
                      {result.excerpt}
                    </div>
                    <div className="text-xs text-gray-400 mt-1 capitalize">
                      {result.type}
                      {result.category && ` • ${result.category}`}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="font-medium">No results found</p>
              <p className="text-sm mt-1">
                Try a different search term or browse our{' '}
                <a href="/resources" className="text-blue-600 underline">
                  resources
                </a>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
```

### Add to Header

```typescript
// src/components/layout/Header.tsx

import { SearchBar } from '@/components/search/SearchBar'

export function Header() {
  return (
    <header>
      {/* ... existing header content ... */}

      {/* Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <SearchBar />
      </div>

      {/* ... rest of header ... */}
    </header>
  )
}
```

### Dedicated Search Page

```typescript
// src/app/search/page.tsx
'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search, Loader2, FileText, Newspaper, Package, Tool } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { SearchResult } from '@/lib/search/search-engine'

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      <SearchPageContent />
    </Suspense>
  )
}

function SearchPageContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (query.length >= 2) {
      performSearch(query)
    }
  }, [query])

  const performSearch = async (searchQuery: string) => {
    setIsLoading(true)

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()

      if (response.ok) {
        setResults(data.results)
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <Newspaper className="w-5 h-5" />
      case 'form':
        return <FileText className="w-5 h-5" />
      case 'service':
        return <Package className="w-5 h-5" />
      case 'tool':
        return <Tool className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6">Search</h1>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search articles, forms, services..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg"
              autoFocus
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        )}

        {/* Results */}
        {!isLoading && query.length >= 2 && (
          <div>
            <p className="text-gray-600 mb-6">
              {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
            </p>

            <div className="space-y-4">
              {results.map((result) => (
                <Card key={result.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <Link href={result.url} className="block group">
                      <div className="flex items-start gap-4">
                        <div className="mt-1 text-blue-600">{getIcon(result.type)}</div>

                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                            {result.title}
                          </h3>

                          <p className="text-gray-600 mb-3">{result.excerpt}</p>

                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="capitalize">{result.type}</span>
                            {result.category && (
                              <>
                                <span>•</span>
                                <span className="capitalize">{result.category}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {results.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h2 className="text-2xl font-semibold mb-2">No results found</h2>
                <p className="text-gray-600 mb-6">
                  Try a different search term or browse our resources
                </p>
                <div className="flex gap-4 justify-center">
                  <Link href="/news">
                    <Button variant="outline">Browse News</Button>
                  </Link>
                  <Link href="/resources">
                    <Button variant="outline">Browse Resources</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Initial State */}
        {!isLoading && query.length < 2 && (
          <div className="text-center py-12 text-gray-500">
            <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">Enter at least 2 characters to search</p>
          </div>
        )}
      </div>
    </main>
  )
}

function SearchPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-32 mb-6" />
          <div className="h-14 bg-gray-200 rounded mb-8" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
```

## Testing Requirements

### Unit Tests

```typescript
// __tests__/unit/lib/search/search-engine.test.ts

import { SearchEngine } from '@/lib/search/search-engine'
import type { SearchableContent } from '@/lib/search/search-engine'

describe('SearchEngine', () => {
  const mockData: SearchableContent[] = [
    {
      id: '1',
      title: 'Ocean Freight Services',
      content: 'Full container load and less than container load shipping',
      type: 'service',
      url: '/services/ocean-freight',
    },
    {
      id: '2',
      title: 'Bill of Lading Form',
      content: 'Download our standard bill of lading form for ocean freight',
      type: 'form',
      url: '/forms/bol.pdf',
    },
  ]

  let engine: SearchEngine

  beforeEach(() => {
    engine = new SearchEngine(mockData)
  })

  it('finds exact matches', () => {
    const results = engine.search('Ocean Freight')
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].title).toContain('Ocean Freight')
  })

  it('finds fuzzy matches', () => {
    const results = engine.search('ocan frieght') // Typos
    expect(results.length).toBeGreaterThan(0)
  })

  it('filters by type', () => {
    const results = engine.searchByType('freight', 'service')
    expect(results.every((r) => r.type === 'service')).toBe(true)
  })

  it('limits results', () => {
    const results = engine.search('freight', { limit: 1 })
    expect(results.length).toBeLessThanOrEqual(1)
  })

  it('returns empty array for no matches', () => {
    const results = engine.search('xyzabc123')
    expect(results).toEqual([])
  })
})
```

### E2E Tests

```typescript
// __tests__/e2e/search/search.spec.ts

import { test, expect } from '@playwright/test'

test.describe('Site Search', () => {
  test('can search from header', async ({ page }) => {
    await page.goto('/')

    await page.fill('input[placeholder*="Search"]', 'ocean freight')
    await page.waitForTimeout(500) // Wait for debounce

    const results = page.locator('[role="button"]:has-text("Ocean Freight")')
    await expect(results.first()).toBeVisible()
  })

  test('can navigate to search result', async ({ page }) => {
    await page.goto('/')

    await page.fill('input[placeholder*="Search"]', 'bill of lading')
    await page.waitForTimeout(500)

    await page.click('[role="button"]:has-text("Bill of Lading")')
    await expect(page.url()).toContain('/forms')
  })

  test('shows no results state', async ({ page }) => {
    await page.goto('/search?q=xyzabc123')
    await expect(page.locator('text=No results found')).toBeVisible()
  })

  test('search page works', async ({ page }) => {
    await page.goto('/search?q=freight')

    await expect(page.locator('h1')).toContainText('Search')
    await expect(page.locator('text=results for')).toBeVisible()
  })
})
```

## Acceptance Criteria
- ✅ Search bar added to header
- ✅ Search results appear as user types (debounced)
- ✅ Search covers news, services, forms, and pages
- ✅ Results ranked by relevance
- ✅ Fuzzy matching for typos
- ✅ Filter by content type
- ✅ Dedicated search results page
- ✅ Mobile responsive search interface
- ✅ Keyboard navigation support
- ✅ Clear visual feedback (loading, errors)
- ✅ No results state with helpful suggestions
- ✅ Unit tests written and passing
- ✅ E2E tests written and passing
- ✅ Zero accessibility violations
- ✅ Fast search response (< 300ms)

## Future Enhancements (Phase 2)
- Migrate to Algolia for better performance
- Add search analytics
- Implement search filters (date, category)
- Add "Did you mean?" suggestions
- Popular/trending searches
- Recent searches (localStorage)
- Voice search support
- Search within specific sections
- Export search results
- Search history for logged-in users
- Advanced search operators (AND, OR, NOT)

## Notes
- **Performance**: Fuse.js runs client-side; consider Algolia if slow
- **SEO**: Ensure search results page is indexable
- **Analytics**: Track search queries to improve content
- **Content Updates**: Rebuild search index when content changes
- **Mobile**: Consider mobile-first search UX
- **Accessibility**: Ensure keyboard navigation and screen reader support
- **Error Handling**: Graceful degradation if search fails
- **Caching**: Cache search results for common queries

## Related Issues
- **Issue #028**: News article pages (search content source)
- **Issue #029**: FCL NVO article (search content source)
- **Issue #030**: Newsletter archive (search content source)
- **Issue #033**: Forms migration (search content source)

## Estimated Time Breakdown
- **Fuse.js Setup**: 1 hour
- **Build Search Index**: 2 hours
- **API Route**: 1 hour
- **Search UI Component**: 2 hours
- **Search Results Page**: 1.5 hours
- **Testing**: 0.5 hours
- **Total**: 8 hours
