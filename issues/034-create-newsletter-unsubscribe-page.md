---
id: 034
title: Create Newsletter Unsubscribe Page
phase: 4
priority: medium
status: todo
dependencies: []
estimated_hours: 2
tags: [pages, newsletter, api, user-experience, compliance]
---

# Create Newsletter Unsubscribe Page

## Objective
Create a user-friendly newsletter unsubscribe page at `/unsubscribe` that allows users to opt-out of email communications. The API endpoint already exists at `/api/newsletter/unsubscribe`, but there is no UI page for users to access it directly.

## Current State
- API endpoint exists: `/src/app/api/newsletter/unsubscribe/route.ts`
- No public-facing unsubscribe page
- v1 site has unsubscribe page at `https://seashipping.com/unsubscribe`
- Newsletter subscription exists on `/request` page
- Footer may link to unsubscribe page
- Email footers should link to this page (CAN-SPAM Act compliance)

## Problem Statement
Without a dedicated unsubscribe page:
1. **Legal Compliance**: CAN-SPAM Act requires easy unsubscribe mechanism
2. **User Experience**: No clear way for users to opt-out
3. **Email Links**: Unsubscribe links in email footers lead nowhere
4. **API Unused**: Existing API endpoint not accessible to users
5. **Trust Issues**: Lack of unsubscribe option reduces trust

## Requirements

### Page Location
`/src/app/unsubscribe/page.tsx`

### Page Features
1. **Email Input Form**
   - Single email field
   - Email validation
   - Clear submit button
   - Success/error messaging

2. **User Feedback**
   - Loading state during API call
   - Success confirmation message
   - Error handling with helpful messages
   - Option to re-subscribe if removed by mistake

3. **Legal Compliance**
   - Clear explanation of what happens
   - Immediate processing
   - Confirmation message
   - Privacy statement

4. **User Experience**
   - Simple, uncluttered design
   - Mobile responsive
   - Fast loading
   - No authentication required
   - No additional barriers or questions

## Implementation Steps

### 1. Create Unsubscribe Page Component

```typescript
// src/app/unsubscribe/page.tsx
'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Mail, CheckCircle2, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react'
import { COMPANY_INFO } from '@/lib/constants'

// Metadata must be exported from a Server Component parent or route file
export const metadata: Metadata = {
  title: 'Unsubscribe from Newsletter | Sea Shipping Line',
  description: 'Unsubscribe from Sea Shipping Line email communications.',
  robots: 'noindex, nofollow', // Don't index unsubscribe pages
}

export default function UnsubscribePage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)
    setStatus('idle')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(
          data.message ||
          'You have been successfully unsubscribed from our newsletter. You will no longer receive emails from us.'
        )
        setEmail('') // Clear the form
      } else {
        setStatus('error')
        setMessage(
          data.error ||
          'An error occurred while processing your request. Please try again or contact us directly.'
        )
      }
    } catch (error) {
      setStatus('error')
      setMessage(
        'Unable to connect to the server. Please check your internet connection and try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main id="main" role="main" className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b py-4">
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

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <Mail className="w-8 h-8 text-gray-600" />
              </div>
              <CardTitle className="text-3xl">Unsubscribe from Newsletter</CardTitle>
              <CardDescription className="text-lg">
                We're sorry to see you go. Enter your email address below to unsubscribe from
                our newsletter.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {/* Success Message */}
              {status === 'success' && (
                <Alert className="mb-6 border-green-200 bg-green-50">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <AlertTitle className="text-green-900 font-semibold">
                    Successfully Unsubscribed
                  </AlertTitle>
                  <AlertDescription className="text-green-800">
                    {message}
                  </AlertDescription>
                </Alert>
              )}

              {/* Error Message */}
              {status === 'error' && (
                <Alert className="mb-6 border-red-200 bg-red-50">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <AlertTitle className="text-red-900 font-semibold">Error</AlertTitle>
                  <AlertDescription className="text-red-800">{message}</AlertDescription>
                </Alert>
              )}

              {/* Unsubscribe Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-base">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting || status === 'success'}
                    className="mt-2"
                    autoComplete="email"
                    autoFocus
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Enter the email address you used to subscribe to our newsletter.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || status === 'success'}
                  className="w-full"
                  style={{ backgroundColor: status === 'success' ? '#22c55e' : '#ee1c23' }}
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Unsubscribed
                    </>
                  ) : (
                    'Unsubscribe'
                  )}
                </Button>
              </form>

              {/* Additional Information */}
              <div className="mt-8 pt-6 border-t space-y-4">
                <div className="text-sm text-gray-600">
                  <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Your email will be removed from our mailing list immediately</li>
                    <li>You will stop receiving newsletter emails within 24-48 hours</li>
                    <li>
                      You may still receive transactional emails related to active shipments
                    </li>
                    <li>You can re-subscribe at any time from our website</li>
                  </ul>
                </div>

                {status === 'success' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      Changed your mind?
                    </h4>
                    <p className="text-sm text-blue-800 mb-3">
                      If you unsubscribed by mistake, you can easily re-subscribe to our
                      newsletter.
                    </p>
                    <Link href="/request">
                      <Button variant="outline" size="sm">
                        Re-subscribe to Newsletter
                      </Button>
                    </Link>
                  </div>
                )}

                <div className="text-sm text-gray-600">
                  <h4 className="font-semibold text-gray-900 mb-2">Need help?</h4>
                  <p>
                    If you're experiencing issues or have questions, please{' '}
                    <Link href="/request" className="text-blue-600 hover:text-blue-800 underline">
                      contact us
                    </Link>{' '}
                    directly. You can also call us at{' '}
                    <a
                      href={`tel:${COMPANY_INFO.contact.phone.replace(/[^0-9]/g, '')}`}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {COMPANY_INFO.contact.phone}
                    </a>
                    .
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Note */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              We respect your privacy. Your email address will only be used for the purposes
              you've agreed to, and we will never share it with third parties.
            </p>
            <p className="mt-2">
              <Link href="/usage" className="text-blue-600 hover:text-blue-800 underline">
                View our Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
```

### 2. Update Existing API Endpoint (if needed)

```typescript
// src/app/api/newsletter/unsubscribe/route.ts

// Review and ensure proper error handling and responses
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validation
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email address is required.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    // TODO: Implement actual unsubscribe logic
    // - Remove from database
    // - Update email service provider (Mailchimp, SendGrid, etc.)
    // - Log the unsubscribe event

    // For now, just log and return success
    console.log(`Unsubscribe request for: ${email}`)

    // Example: Remove from database
    // await db.newsletter.delete({ where: { email } })

    // Example: Remove from email service
    // await emailService.unsubscribe(email)

    return NextResponse.json({
      success: true,
      message: 'You have been successfully unsubscribed from our newsletter.',
    })
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
```

### 3. Add Link in Email Footer Template

```html
<!-- Email template footer -->
<table role="presentation" style="width: 100%; border-top: 1px solid #eee; margin-top: 20px; padding-top: 20px;">
  <tr>
    <td style="text-align: center; color: #666; font-size: 12px;">
      <p>Sea Shipping Line | New York, NY</p>
      <p>
        You're receiving this email because you subscribed to our newsletter.
        <br>
        <a href="https://seashipping.com/unsubscribe" style="color: #ee1c23; text-decoration: underline;">
          Unsubscribe
        </a>
      </p>
    </td>
  </tr>
</table>
```

### 4. Add Link in Footer (Optional)

```typescript
// src/components/layout/Footer.tsx

// Add to footerSections if desired
{
  title: "Legal",
  links: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Use", href: "/usage" },
    { name: "Unsubscribe", href: "/unsubscribe" },
  ],
}
```

## Testing Requirements

### Unit Tests

```typescript
// __tests__/unit/app/unsubscribe/page.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import UnsubscribePage from '@/app/unsubscribe/page'

// Mock fetch
global.fetch = jest.fn()

describe('Unsubscribe Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders unsubscribe form', () => {
    render(<UnsubscribePage />)

    expect(screen.getByRole('heading', { name: /Unsubscribe from Newsletter/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Unsubscribe/i })).toBeInTheDocument()
  })

  it('validates email format', async () => {
    render(<UnsubscribePage />)

    const emailInput = screen.getByLabelText(/Email Address/i)
    const submitButton = screen.getByRole('button', { name: /Unsubscribe/i })

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument()
    })
  })

  it('shows success message on successful unsubscribe', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'Successfully unsubscribed' }),
    })

    render(<UnsubscribePage />)

    const emailInput = screen.getByLabelText(/Email Address/i)
    const submitButton = screen.getByRole('button', { name: /Unsubscribe/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Successfully Unsubscribed/i)).toBeInTheDocument()
    })
  })

  it('shows error message on API failure', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Email not found' }),
    })

    render(<UnsubscribePage />)

    const emailInput = screen.getByLabelText(/Email Address/i)
    const submitButton = screen.getByRole('button', { name: /Unsubscribe/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Email not found/i)).toBeInTheDocument()
    })
  })

  it('disables form during submission', async () => {
    ;(global.fetch as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    )

    render(<UnsubscribePage />)

    const emailInput = screen.getByLabelText(/Email Address/i)
    const submitButton = screen.getByRole('button', { name: /Unsubscribe/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(submitButton)

    expect(submitButton).toBeDisabled()
    expect(screen.getByText(/Processing.../i)).toBeInTheDocument()
  })

  it('displays re-subscribe option after successful unsubscribe', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })

    render(<UnsubscribePage />)

    const emailInput = screen.getByLabelText(/Email Address/i)
    const submitButton = screen.getByRole('button', { name: /Unsubscribe/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Changed your mind/i)).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /Re-subscribe/i })).toBeInTheDocument()
    })
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<UnsubscribePage />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

### API Tests

```typescript
// __tests__/integration/api/newsletter/unsubscribe.test.ts
import { POST } from '@/app/api/newsletter/unsubscribe/route'
import { NextRequest } from 'next/server'

describe('Newsletter Unsubscribe API', () => {
  it('returns 400 for missing email', async () => {
    const request = new NextRequest('http://localhost/api/newsletter/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({}),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBeDefined()
  })

  it('returns 400 for invalid email format', async () => {
    const request = new NextRequest('http://localhost/api/newsletter/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email: 'invalid-email' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain('valid email')
  })

  it('returns 200 for valid email', async () => {
    const request = new NextRequest('http://localhost/api/newsletter/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
  })
})
```

### E2E Tests

```typescript
// __tests__/e2e/newsletter/unsubscribe.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Newsletter Unsubscribe', () => {
  test('can access unsubscribe page', async ({ page }) => {
    await page.goto('/unsubscribe')
    await expect(page).toHaveTitle(/Unsubscribe from Newsletter/)
    await expect(page.locator('h1')).toContainText('Unsubscribe')
  })

  test('can unsubscribe with valid email', async ({ page }) => {
    await page.goto('/unsubscribe')

    await page.fill('input[type="email"]', 'test@example.com')
    await page.click('button:has-text("Unsubscribe")')

    await expect(page.locator('text=Successfully Unsubscribed')).toBeVisible()
    await expect(page.locator('text=Changed your mind')).toBeVisible()
  })

  test('shows error for invalid email', async ({ page }) => {
    await page.goto('/unsubscribe')

    await page.fill('input[type="email"]', 'invalid-email')
    await page.click('button:has-text("Unsubscribe")')

    await expect(page.locator('text=valid email address')).toBeVisible()
  })

  test('re-subscribe link works after unsubscribe', async ({ page }) => {
    await page.goto('/unsubscribe')

    await page.fill('input[type="email"]', 'test@example.com')
    await page.click('button:has-text("Unsubscribe")')

    await expect(page.locator('text=Successfully Unsubscribed')).toBeVisible()

    await page.click('text=Re-subscribe to Newsletter')
    await expect(page).toHaveURL('/request')
  })

  test('page is mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/unsubscribe')

    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('button:has-text("Unsubscribe")')).toBeVisible()
  })
})
```

## SEO & Metadata
- **Title**: "Unsubscribe from Newsletter | Sea Shipping Line"
- **Description**: Simple description of unsubscribe functionality
- **Robots**: `noindex, nofollow` (standard for unsubscribe pages)
- **Canonical**: Not needed (noindex)
- Not included in sitemap

## Accessibility Requirements
- Semantic HTML structure
- Proper form labels
- Clear error messages
- Keyboard navigation
- Focus management
- ARIA labels for status messages
- Sufficient color contrast
- Large touch targets (mobile)

## Legal Compliance

### CAN-SPAM Act Requirements
- ✅ Clear and conspicuous unsubscribe mechanism
- ✅ Process unsubscribe requests within 10 business days
- ✅ No fee required to unsubscribe
- ✅ No requirement to provide additional information
- ✅ Unsubscribe mechanism functional for at least 30 days

### GDPR Considerations (if applicable)
- ✅ Easy to understand process
- ✅ No unnecessary barriers
- ✅ Confirmation of unsubscribe
- ✅ Data processing notice

## Acceptance Criteria
- ✅ Page created at `/src/app/unsubscribe/page.tsx`
- ✅ Simple email input form implemented
- ✅ Form validation working correctly
- ✅ API integration with `/api/newsletter/unsubscribe`
- ✅ Success message displays after unsubscribe
- ✅ Error handling for API failures
- ✅ Loading state during submission
- ✅ Re-subscribe option shown after success
- ✅ Help/contact information provided
- ✅ Privacy note included
- ✅ Back to home link functional
- ✅ Mobile responsive design
- ✅ Unit tests written and passing
- ✅ API tests written and passing
- ✅ E2E tests written and passing
- ✅ Zero accessibility violations
- ✅ SEO metadata configured
- ✅ Email footer link updated (if applicable)

## Notes
- **Email Service Integration**: Connect to actual email service provider (Mailchimp, SendGrid, etc.)
- **Database**: Implement database removal if storing subscribers
- **Audit Log**: Consider logging unsubscribe events for compliance
- **Double Opt-Out**: No confirmation email needed (immediate removal)
- **Transactional Emails**: Clarify that transactional emails may still be sent
- **Re-subscribe**: Make it easy for users to re-subscribe if they change their mind
- **Analytics**: Track unsubscribe rate to improve email content
- **Legal Review**: Have legal team review compliance with email regulations

## Future Enhancements
- Preference center (choose which emails to receive)
- Unsubscribe reason survey (optional)
- Partial unsubscribe (specific email types)
- Email preview before unsubscribing
- Pause subscription instead of full unsubscribe
- Multiple language support

## Related Issues
- **Issue #032**: Usage/Terms page (related legal compliance)
- **Issue #012**: API Routes for Forms (related API work)

## Estimated Time Breakdown
- **Component Development**: 1 hour
- **API Integration**: 0.5 hours
- **Testing**: 0.5 hours
- **Total**: 2 hours
