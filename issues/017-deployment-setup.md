---
id: 017
title: Production Deployment Setup and Configuration
phase: 8
priority: critical
status: todo
dependencies: [015, 016]
estimated_hours: 6
tags: [deployment, vercel, production, devops]
---

# Production Deployment Setup and Configuration

## Objective
Configure production deployment on Vercel with proper environment variables, domain setup, and monitoring.

## Requirements
- Deploy to Vercel
- Custom domain configuration
- Environment variables secured
- SSL/HTTPS enforcement
- Error monitoring
- Analytics
- Redirects from old URLs
- Staging environment

## Implementation Steps

### 1. Vercel Project Setup

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Link project
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### 2. Configure vercel.json

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"], // US East (adjust based on location)

  "env": {
    "NEXT_PUBLIC_GA_ID": "G-V0F46NZK7J"
  },

  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    },
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],

  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page",
      "permanent": true
    }
  ]
}
```

### 3. Environment Variables Configuration

```bash
# .env.example (commit this)
NEXT_PUBLIC_GA_ID=
RECAPTCHA_SECRET_KEY=
RESEND_API_KEY=
RATE_REQUEST_EMAIL=
NODE_ENV=production
```

```bash
# .env.local (DO NOT commit)
NEXT_PUBLIC_GA_ID=G-V0F46NZK7J
RECAPTCHA_SECRET_KEY=your_secret_key_here
RESEND_API_KEY=your_resend_api_key
RATE_REQUEST_EMAIL=rates@seashipping.com
NODE_ENV=production
```

**Add to Vercel:**
```bash
# Set environment variables in Vercel
vercel env add RECAPTCHA_SECRET_KEY
vercel env add RESEND_API_KEY
vercel env add RATE_REQUEST_EMAIL
vercel env add NEXT_PUBLIC_GA_ID

# Or via Vercel dashboard:
# Project Settings → Environment Variables
```

### 4. Domain Configuration

**In Vercel Dashboard:**
1. Go to Project Settings → Domains
2. Add custom domain: `seashipping.com`
3. Add www subdomain: `www.seashipping.com`
4. Configure DNS records as provided by Vercel

**DNS Configuration:**
```
# A Records
@    A    76.76.21.21

# CNAME Records
www  CNAME  cname.vercel-dns.com
```

**Redirect www to non-www:**
```json
// vercel.json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [
        {
          "type": "host",
          "value": "www.seashipping.com"
        }
      ],
      "destination": "https://seashipping.com/:path*",
      "permanent": true
    }
  ]
}
```

### 5. Setup Staging Environment

```bash
# Create staging branch
git checkout -b staging

# Deploy staging to Vercel
vercel --target staging

# Link staging domain
# Add staging.seashipping.com in Vercel dashboard
```

### 6. Setup Error Monitoring with Sentry

```bash
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV === 'production',
})
```

```javascript
// sentry.server.config.js
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV === 'production',
})
```

### 7. Setup Vercel Analytics

```bash
npm install @vercel/analytics
```

```typescript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 8. Configure Redirects from Old WordPress URLs

```json
// vercel.json
{
  "redirects": [
    {
      "source": "/services/fcl-lcl",
      "destination": "/services/ocean-freight",
      "permanent": true
    },
    {
      "source": "/about-us",
      "destination": "/about",
      "permanent": true
    },
    {
      "source": "/contact-us",
      "destination": "/request",
      "permanent": true
    },
    {
      "source": "/blog/:slug",
      "destination": "/news/:slug",
      "permanent": true
    }
  ]
}
```

### 9. Setup Robots.txt and Sitemap

```typescript
// src/app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://seashipping.com/sitemap.xml',
  }
}
```

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { services } from '@/content/services'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://seashipping.com'

  // Static pages
  const staticPages = [
    '',
    '/services',
    '/resources',
    '/network',
    '/request',
    '/news',
    '/about',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic service pages
  const servicePages = services.map(service => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...servicePages]
}
```

### 10. Security Headers

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com *.google-analytics.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: *.googletagmanager.com *.google-analytics.com",
              "font-src 'self' data:",
              "connect-src 'self' *.google-analytics.com *.analytics.google.com",
              "frame-ancestors 'none'",
            ].join('; ')
          },
        ],
      },
    ]
  },
}
```

### 11. Pre-deployment Checklist

```markdown
## Pre-Deployment Checklist

### Code Quality
- [ ] All tests passing
- [ ] Linting passes
- [ ] TypeScript compiles with zero errors
- [ ] Build succeeds locally
- [ ] 80%+ test coverage achieved

### Performance
- [ ] Lighthouse scores meet targets (>90 mobile, >95 desktop)
- [ ] Images optimized
- [ ] Bundle size within budget
- [ ] Core Web Vitals met

### Accessibility
- [ ] Zero accessibility violations
- [ ] Keyboard navigation tested
- [ ] Screen reader tested
- [ ] Color contrast verified

### Content
- [ ] All content migrated
- [ ] All images have alt text
- [ ] All links working
- [ ] No broken links
- [ ] Forms tested and working

### SEO
- [ ] Meta titles and descriptions
- [ ] Open Graph tags
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] Canonical URLs set

### Security
- [ ] Environment variables secured
- [ ] API keys not exposed
- [ ] Security headers configured
- [ ] HTTPS enforced
- [ ] Rate limiting implemented

### Monitoring
- [ ] Error monitoring (Sentry) configured
- [ ] Analytics (GA4) working
- [ ] Vercel Analytics enabled
- [ ] Performance monitoring setup

### Deployment
- [ ] Domain configured
- [ ] DNS records updated
- [ ] SSL certificate active
- [ ] Redirects from old URLs configured
- [ ] Staging environment tested
```

### 12. Post-Deployment Verification

```bash
# Smoke tests after deployment
curl -I https://seashipping.com
curl -I https://www.seashipping.com # Should redirect
curl https://seashipping.com/sitemap.xml
curl https://seashipping.com/robots.txt

# Check SSL
openssl s_client -connect seashipping.com:443 -servername seashipping.com

# Run Lighthouse
npx lighthouse https://seashipping.com --view

# Check broken links
npx broken-link-checker https://seashipping.com
```

## Testing Requirements
- Staging deployment tested
- Production deployment tested
- DNS propagation verified
- SSL certificate valid
- All redirects working
- Forms submitting correctly
- Analytics tracking
- Error monitoring working

## Acceptance Criteria
- ✅ Vercel project configured
- ✅ Production deployment successful
- ✅ Custom domain configured
- ✅ SSL certificate active
- ✅ Environment variables secured
- ✅ Security headers configured
- ✅ Redirects working
- ✅ Staging environment setup
- ✅ Error monitoring active
- ✅ Analytics tracking verified
- ✅ Sitemap accessible
- ✅ Robots.txt configured
- ✅ All smoke tests passing
- ✅ No broken links
- ✅ Forms working in production

## Notes
- Keep staging in sync with production
- Test all changes on staging first
- Monitor error rates after deployment
- Set up uptime monitoring (e.g., UptimeRobot)
- Configure email notifications for errors
- Document deployment process for team
- Schedule regular backups
- Keep WordPress site as backup until stable
