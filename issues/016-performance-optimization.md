---
id: 016
title: Performance Optimization and Lighthouse Targets
phase: 7
priority: critical
status: done
dependencies: [008, 009, 013, 014]
estimated_hours: 8
tags: [performance, optimization, lighthouse, mobile, critical]
---

# Performance Optimization and Lighthouse Targets

## Objective
Optimize website performance to achieve Lighthouse scores > 90 on mobile and > 95 on desktop across all metrics.

## Performance Targets

### Mobile (4G Connection)
- Performance Score: > 90
- First Contentful Paint (FCP): < 2.0s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 4.0s
- Total Blocking Time (TBT): < 300ms
- Cumulative Layout Shift (CLS): < 0.1

### Desktop
- Performance Score: > 95
- FCP: < 1.0s
- LCP: < 1.5s
- TTI: < 2.5s
- TBT: < 150ms
- CLS: < 0.1

## Implementation Steps

### 1. Setup Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI

on: [push, pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Start server
        run: npm run start &

      - name: Wait for server
        run: npx wait-on http://localhost:3000

      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
```

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/services',
        'http://localhost:3000/services/ocean-freight',
        'http://localhost:3000/request',
      ],
      numberOfRuns: 3,
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],

        // Core Web Vitals
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],

        // Resource budgets
        'resource-summary:script:size': ['error', { maxNumericValue: 300000 }],
        'resource-summary:image:size': ['error', { maxNumericValue: 500000 }],
        'resource-summary:stylesheet:size': ['error', { maxNumericValue: 50000 }],
        'resource-summary:total:size': ['error', { maxNumericValue: 1000000 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
```

### 2. Image Optimization

```typescript
// Ensure all images use Next.js Image component
import Image from 'next/image'

// Bad: Regular img tag
<img src="/images/hero.jpg" alt="Hero" />

// Good: Next.js Image with optimization
<Image
  src="/images/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority={true} // for above-fold images
  placeholder="blur" // add blur placeholder
  blurDataURL="data:image/jpeg;base64,..." // generate with sharp
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

```javascript
// scripts/generate-blur-placeholders.js
const sharp = require('sharp')
const fs = require('fs/promises')

async function generateBlurDataURL(imagePath) {
  const buffer = await sharp(imagePath)
    .resize(10, 10, { fit: 'inside' })
    .blur()
    .toBuffer()

  return `data:image/jpeg;base64,${buffer.toString('base64')}`
}
```

### 3. Font Optimization

```typescript
// src/app/layout.tsx
import { Inter } from 'next/font/google'

// Load font with optimization
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
```

```css
/* src/app/globals.css */
/* Use font variable */
body {
  font-family: var(--font-inter), system-ui, sans-serif;
}
```

### 4. Code Splitting and Lazy Loading

```typescript
// Lazy load heavy components
import dynamic from 'next/dynamic'

// Load map component only when needed
const MapComponent = dynamic(() => import('@/components/Map'), {
  loading: () => <div>Loading map...</div>,
  ssr: false, // Don't render on server if not needed
})

// Lazy load animations
const AnimatedSection = dynamic(() => import('@/components/AnimatedSection'))
```

### 5. Bundle Analysis

```bash
npm install -D @next/bundle-analyzer
```

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // ... other config
})
```

```json
// package.json
{
  "scripts": {
    "analyze": "ANALYZE=true next build"
  }
}
```

### 6. Reduce Layout Shift (CLS)

```typescript
// Always specify dimensions for images
<Image
  src="/images/service.jpg"
  width={600}
  height={400}
  alt="Service"
/>

// Reserve space for dynamic content
<div className="min-h-[400px]">
  {loading ? <Skeleton /> : <Content />}
</div>

// Use aspect-ratio for responsive containers
<div className="aspect-video">
  <Image src="..." fill className="object-cover" />
</div>
```

### 7. Optimize Third-Party Scripts

```typescript
// Load Google Analytics efficiently
import Script from 'next/script'

<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
  strategy="afterInteractive" // or "lazyOnload"
/>
```

### 8. Implement Skeleton Loaders

```typescript
// src/components/ui/skeleton.tsx
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200',
        className
      )}
    />
  )
}

// Usage
export function ServiceCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-4 w-[250px]" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  )
}
```

### 9. Optimize CSS

```typescript
// Remove unused Tailwind classes
// tailwind.config.ts
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // PurgeCSS will remove unused styles
}
```

```javascript
// next.config.js
module.exports = {
  experimental: {
    optimizeCss: true, // Enable CSS optimization
  },
}
```

### 10. Implement Resource Hints

```typescript
// src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### 11. Enable Compression

```javascript
// next.config.js
module.exports = {
  compress: true, // Enable gzip compression

  // Configure headers
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

### 12. Performance Testing

```typescript
// __tests__/e2e/performance/core-web-vitals.spec.ts
import { test, expect } from '@playwright/test'

test('homepage meets Core Web Vitals', async ({ page }) => {
  await page.goto('/')

  const metrics = await page.evaluate(() => {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        resolve({
          fcp: entries.find(e => e.name === 'first-contentful-paint')?.startTime,
          lcp: entries.find(e => e.entryType === 'largest-contentful-paint')?.startTime,
        })
      }).observe({ entryTypes: ['paint', 'largest-contentful-paint'] })
    })
  })

  expect(metrics.fcp).toBeLessThan(2000) // 2 seconds
  expect(metrics.lcp).toBeLessThan(2500) // 2.5 seconds
})

test('mobile performance', async ({ page, browserName }) => {
  // Emulate mobile
  await page.emulate({
    ...playwright.devices['iPhone 12'],
  })

  // Emulate 4G connection
  await page.route('**/*', async route => {
    await new Promise(resolve => setTimeout(resolve, 100)) // Add latency
    return route.continue()
  })

  await page.goto('/')

  // Measure load time
  const loadTime = await page.evaluate(() => {
    return performance.timing.loadEventEnd - performance.timing.navigationStart
  })

  expect(loadTime).toBeLessThan(4000) // 4 seconds on 4G
})
```

## Testing Requirements
- Lighthouse CI passing in CI/CD
- Performance score > 90 mobile, > 95 desktop
- All Core Web Vitals met
- Bundle size < 300KB (gzipped)
- All images optimized
- No layout shift
- Performance tested on slow 3G

## Acceptance Criteria
- ✅ Lighthouse CI configured and passing
- ✅ Performance score > 90 mobile
- ✅ Performance score > 95 desktop
- ✅ FCP < 2s mobile, < 1s desktop
- ✅ LCP < 2.5s mobile, < 1.5s desktop
- ✅ TBT < 300ms mobile, < 150ms desktop
- ✅ CLS < 0.1
- ✅ Bundle size within budget
- ✅ All images optimized with Next.js Image
- ✅ Fonts optimized with next/font
- ✅ Code splitting implemented
- ✅ Lazy loading for below-fold content
- ✅ Resource hints added
- ✅ Compression enabled
- ✅ Performance tests passing
- ✅ Bundle analysis shows no issues

## Notes
- Run Lighthouse in incognito mode
- Test on real mobile devices
- Use Chrome DevTools Performance panel
- Monitor real user metrics with Web Vitals library
- Consider using CDN for static assets
- Implement service worker for offline support (future)
- Regular performance audits post-launch
- Document performance optimization strategies
