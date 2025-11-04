# Performance Optimization Guide

## Overview

This document outlines the performance optimization strategies implemented in the Sea Shipping Line website to achieve Lighthouse scores > 90 on mobile and > 95 on desktop.

## Performance Targets

### Mobile (4G Connection)
- **Performance Score**: > 90
- **First Contentful Paint (FCP)**: < 2.0s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 4.0s
- **Total Blocking Time (TBT)**: < 300ms
- **Cumulative Layout Shift (CLS)**: < 0.1

### Desktop
- **Performance Score**: > 95
- **FCP**: < 1.0s
- **LCP**: < 1.5s
- **TTI**: < 2.5s
- **TBT**: < 150ms
- **CLS**: < 0.1

## Resource Budgets

### Bundle Sizes (Gzipped)
- **JavaScript**: < 300KB
- **CSS**: < 50KB
- **Images**: < 500KB per page
- **Fonts**: < 100KB
- **Total**: < 1MB per page

## Implemented Optimizations

### 1. Font Optimization

**Implementation**: `src/app/layout.tsx`

```typescript
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',           // Prevent FOIT (Flash of Invisible Text)
  variable: '--font-inter',  // CSS variable for font
  preload: true,             // Preload font files
  fallback: ['system-ui', 'arial'], // Fallback fonts
});
```

**Benefits**:
- Eliminates layout shift from font loading
- Reduces FCP by showing text immediately with fallback
- Automatic font subsetting and optimization by Next.js

### 2. Image Optimization

**Next.js Image Component**: All images use `next/image` with:
- Automatic format selection (AVIF, WebP, fallback to original)
- Lazy loading for below-fold images
- Responsive image sizes
- Priority loading for above-fold images

**Configuration**: `next.config.js`

```javascript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60,
}
```

**Best Practices**:
- Always specify `width` and `height` to prevent CLS
- Use `priority={true}` for hero images
- Use `sizes` prop for responsive images
- Set appropriate `quality` (85-90 for most images)

### 3. Resource Hints

**Implementation**: `src/app/layout.tsx`

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
```

**Benefits**:
- Establishes early connections to external domains
- Reduces DNS lookup and connection time
- Improves third-party script loading

### 4. Caching Strategy

**Configuration**: `next.config.js`

```javascript
async headers() {
  return [
    {
      source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    // ... more cache rules
  ]
}
```

**Strategy**:
- Static assets: 1 year cache with `immutable` flag
- Next.js generated files: Long-term caching
- Images served through `_next/image`: Aggressive caching

### 5. Compression

**Configuration**: `next.config.js`

```javascript
compress: true, // Enable gzip compression
```

**Note**: In production with reverse proxy (Nginx, Cloudflare), configure compression at that level for better performance.

### 6. Code Splitting and Tree Shaking

**Automatic**:
- Next.js automatically code-splits at the page level
- Route-based code splitting is enabled by default
- Tree shaking removes unused code

**Manual Optimization**: `next.config.js`

```javascript
experimental: {
  optimizePackageImports: [
    'lucide-react',
    '@radix-ui/react-accordion',
    '@radix-ui/react-dialog',
    // ... other large packages
  ],
}
```

**For Heavy Components**: Use dynamic imports

```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <ComponentSkeleton />,
  ssr: false, // Skip SSR if not needed
})
```

### 7. Layout Shift Prevention

**Skeleton Components**: `src/components/ui/skeleton.tsx`

Use skeleton loaders to reserve space for dynamic content:

```typescript
import { ServiceCardSkeleton } from '@/components/ui/skeleton'

<Suspense fallback={<ServiceCardSkeleton />}>
  <ServiceCard service={service} />
</Suspense>
```

**Image Dimensions**: Always specify dimensions

```typescript
<Image
  src="/images/hero.jpg"
  width={1920}
  height={1080}
  alt="Hero"
/>
```

### 8. Third-Party Scripts

**Google Analytics**: Using `@next/third-parties/google`

```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

// Loads with strategy="afterInteractive"
<GoogleAnalytics gaId="G-V0F46NZK7J" />
```

**Benefits**:
- Optimized loading strategy
- Doesn't block initial render
- Uses `afterInteractive` strategy

## Performance Testing

### Lighthouse CI

**Configuration**: `lighthouserc.js`

Run Lighthouse CI on every PR:

```bash
npm install -g @lhci/cli
lhci autorun
```

**Tested Pages**:
- Homepage (`/`)
- Services overview (`/services`)
- Service detail (`/services/ocean-freight`)
- Request form (`/request`)

### Bundle Analysis

Analyze bundle sizes:

```bash
npm run analyze
```

This opens an interactive visualization showing:
- Bundle sizes by page
- Shared chunks
- Package sizes
- Tree map of all modules

**Interpreting Results**:
- Look for unexpectedly large packages
- Check for duplicate dependencies
- Identify opportunities for code splitting
- Ensure tree shaking is working

### Manual Testing

1. **Chrome DevTools Performance Panel**
   ```
   1. Open DevTools > Performance
   2. Click Record
   3. Reload page
   4. Stop recording
   5. Analyze metrics and bottlenecks
   ```

2. **Lighthouse in Chrome DevTools**
   ```
   1. Open DevTools > Lighthouse
   2. Select categories
   3. Run audit
   4. Review recommendations
   ```

3. **Network Throttling**
   - Test on Slow 3G
   - Test on Fast 3G
   - Test on Slow 4G
   - Verify performance targets are met

## Monitoring

### Core Web Vitals

Monitor real user metrics with Web Vitals:

```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric) {
  // Send to your analytics endpoint
  console.log(metric)
}

getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getFCP(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
```

### Performance Budget Alerts

Lighthouse CI will fail if:
- Performance score drops below 95 (desktop)
- Any Core Web Vital exceeds threshold
- Bundle size exceeds budget
- Image sizes are not optimized

## Best Practices

### DO:
- ✅ Use `next/image` for all images
- ✅ Specify dimensions for images
- ✅ Use `priority` for above-fold images
- ✅ Lazy load below-fold content
- ✅ Use skeleton loaders
- ✅ Optimize fonts with `next/font`
- ✅ Add resource hints for external domains
- ✅ Test on real devices
- ✅ Monitor Core Web Vitals
- ✅ Run Lighthouse CI on every PR

### DON'T:
- ❌ Use regular `<img>` tags
- ❌ Load heavy libraries on initial render
- ❌ Block render with synchronous scripts
- ❌ Forget to specify image dimensions
- ❌ Use unoptimized images
- ❌ Ignore layout shift warnings
- ❌ Skip performance testing
- ❌ Load all JavaScript upfront

## Troubleshooting

### High LCP

**Symptoms**: Largest Contentful Paint > 2.5s

**Solutions**:
1. Ensure hero image has `priority={true}`
2. Check image optimization and format
3. Verify CDN/caching is working
4. Reduce server response time
5. Consider preloading critical resources

### High CLS

**Symptoms**: Cumulative Layout Shift > 0.1

**Solutions**:
1. Always specify image dimensions
2. Reserve space for dynamic content
3. Use skeleton loaders
4. Avoid inserting content above existing content
5. Use `font-display: swap` for fonts

### High TBT

**Symptoms**: Total Blocking Time > 300ms

**Solutions**:
1. Reduce JavaScript bundle size
2. Use code splitting
3. Defer non-critical JavaScript
4. Optimize third-party scripts
5. Use Web Workers for heavy computation

### Large Bundle Size

**Symptoms**: JavaScript bundle > 300KB

**Solutions**:
1. Run bundle analyzer: `npm run analyze`
2. Remove unused dependencies
3. Use dynamic imports for heavy components
4. Enable `optimizePackageImports`
5. Check for duplicate dependencies

## Resources

- [Next.js Performance Documentation](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev Performance Guide](https://web.dev/performance/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Core Web Vitals](https://web.dev/vitals/)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

## Maintenance

### Regular Tasks

**Weekly**:
- Review Lighthouse CI results
- Check Core Web Vitals in production

**Monthly**:
- Run full bundle analysis
- Review and update dependencies
- Test on real mobile devices
- Review performance budget

**Quarterly**:
- Audit third-party scripts
- Review caching strategy
- Update performance targets if needed
- Review new Next.js performance features
