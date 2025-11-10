---
id: 014
title: Google Analytics 4 Integration
phase: 6
priority: high
status: todo
dependencies: [001]
estimated_hours: 3
tags: [analytics, tracking, integration, ga4]
---

# Google Analytics 4 Integration

## Objective
Integrate Google Analytics 4 (GA4) with existing tracking ID to maintain historical data continuity and track user behavior.

## Requirements
- Use existing GA4 tracking ID: G-V0F46NZK7J
- Track page views automatically
- Track custom events (form submissions, CTA clicks)
- Track navigation interactions
- Track mobile vs desktop usage
- Privacy-compliant tracking
- GDPR-ready (cookie consent)
- Test mode for development

## Implementation Steps

### 1. Install Google Analytics Package

```bash
npm install @next/third-parties
```

### 2. Configure GA4 in App Layout

```typescript
// src/app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {process.env.NODE_ENV === 'production' && (
          <GoogleAnalytics gaId="G-V0F46NZK7J" />
        )}
      </body>
    </html>
  )
}
```

### 3. Create Analytics Utility

```typescript
// src/lib/analytics.ts
type GTagEvent = {
  action: string
  category: string
  label?: string
  value?: number
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-V0F46NZK7J'

// Track page views
export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// Track custom events
export const event = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Specific event trackers
export const trackFormSubmission = (formName: string) => {
  event({
    action: 'submit',
    category: 'Form',
    label: formName,
  })
}

export const trackCTAClick = (ctaName: string, location: string) => {
  event({
    action: 'click',
    category: 'CTA',
    label: `${ctaName} - ${location}`,
  })
}

export const trackServiceView = (serviceName: string) => {
  event({
    action: 'view',
    category: 'Service',
    label: serviceName,
  })
}

export const trackDocumentDownload = (documentName: string) => {
  event({
    action: 'download',
    category: 'Document',
    label: documentName,
  })
}

export const trackExternalLink = (url: string) => {
  event({
    action: 'click',
    category: 'External Link',
    label: url,
  })
}
```

### 4. Track Page Views with App Router

```typescript
// src/app/layout.tsx
'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { pageview } from '@/lib/analytics'

export function AnalyticsPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      pageview(pathname + (searchParams?.toString() || ''))
    }
  }, [pathname, searchParams])

  return null
}

// Add to layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <AnalyticsPageView />
        {children}
      </body>
    </html>
  )
}
```

### 5. Track Form Submissions

```typescript
// Update RateRequestForm component
import { trackFormSubmission } from '@/lib/analytics'

const onSubmit = async (data: RateRequestFormData) => {
  // ... existing code

  try {
    // ... submission logic

    // Track successful submission
    trackFormSubmission('Rate Request')

  } catch (error) {
    // ... error handling
  }
}
```

### 6. Track CTA Clicks

```typescript
// src/components/sections/Hero.tsx
import { trackCTAClick } from '@/lib/analytics'

<Button
  onClick={() => {
    trackCTAClick('Get a Quote', 'Hero')
    router.push('/request')
  }}
>
  Get a Quote
</Button>
```

### 7. Track Service Page Views

```typescript
// src/app/services/[slug]/page.tsx
'use client'

import { useEffect } from 'react'
import { trackServiceView } from '@/lib/analytics'

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug)

  useEffect(() => {
    if (service) {
      trackServiceView(service.title)
    }
  }, [service])

  // ... rest of component
}
```

### 8. Track Document Downloads

```typescript
// src/components/resources/DocumentLink.tsx
import { trackDocumentDownload } from '@/lib/analytics'

<a
  href={`/documents/${document.filename}`}
  download
  onClick={() => trackDocumentDownload(document.title)}
>
  Download {document.title}
</a>
```

### 9. TypeScript Declaration for gtag

```typescript
// src/types/gtag.d.ts
interface Window {
  gtag: (
    command: 'config' | 'event',
    targetId: string,
    config?: Record<string, any>
  ) => void
}
```

### 10. Cookie Consent (GDPR Compliance)

```typescript
// src/components/CookieConsent.tsx
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShowBanner(false)
    // Enable analytics
    if (typeof window.gtag !== 'undefined') {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      })
    }
  }

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          We use cookies to improve your experience. By using our site, you accept our use of cookies.
        </p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={declineCookies}>
            Decline
          </Button>
          <Button onClick={acceptCookies}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  )
}
```

### 11. Environment Configuration

```bash
# .env.local
NEXT_PUBLIC_GA_ID=G-V0F46NZK7J
```

## Testing Requirements
- Page views tracked correctly
- Custom events fire correctly
- Form submissions tracked
- CTA clicks tracked
- Service views tracked
- Document downloads tracked
- Test in development (events logged to console)
- Test in production (verify in GA4 dashboard)
- Cookie consent works

## Acceptance Criteria
- ✅ GA4 installed with existing tracking ID
- ✅ Page views automatically tracked
- ✅ Custom event tracking implemented
- ✅ Form submissions tracked
- ✅ CTA clicks tracked
- ✅ Service page views tracked
- ✅ Document downloads tracked
- ✅ Cookie consent banner implemented
- ✅ GDPR compliant
- ✅ Development mode excludes tracking
- ✅ TypeScript types added
- ✅ Events visible in GA4 dashboard
- ✅ No console errors

## Notes
- Only track in production environment
- Test events using GA4 DebugView
- Set up custom dimensions in GA4 dashboard
- Consider adding conversion goals
- Monitor Core Web Vitals in GA4
- Review and clean up old UA properties
- Document all custom events for team
- Consider adding user ID tracking for logged-in users (future)
