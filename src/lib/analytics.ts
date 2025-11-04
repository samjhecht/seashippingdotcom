type GTagEvent = {
  action: string
  category: string
  label?: string
  value?: number
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-V0F46NZK7J'

// Check if we're in production
const isProduction = process.env.NODE_ENV === 'production'

// Track page views
export const pageview = (url: string) => {
  if (isProduction && typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  } else if (!isProduction) {
    console.log('[Analytics - Dev] Page view:', url)
  }
}

// Track custom events
export const event = ({ action, category, label, value }: GTagEvent) => {
  if (isProduction && typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  } else if (!isProduction) {
    console.log('[Analytics - Dev] Event:', { action, category, label, value })
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
