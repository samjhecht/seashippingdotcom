---
id: 012
title: Implement API Routes for Form Submissions (TDD)
phase: 4
priority: critical
status: todo
dependencies: [010, 011]
estimated_hours: 6
tags: [api, backend, forms, tdd, integration-testing]
---

# Implement API Routes for Form Submissions (TDD)

## Objective
Create Next.js API routes to handle form submissions with validation, rate limiting, and email notifications.

## Requirements
- `/api/rate-request` - Handle rate request submissions
- `/api/contact` - Handle contact form submissions
- `/api/newsletter/subscribe` - Handle newsletter subscriptions
- `/api/newsletter/unsubscribe` - Handle unsubscriptions
- Server-side validation using Zod schemas
- Rate limiting to prevent spam
- Email notification system
- Error handling and logging
- CORS configuration

## Implementation Steps (TDD Approach)

### 1. Write Integration Tests for API Routes

```typescript
// __tests__/integration/api/rate-request.test.ts
import { POST } from '@/app/api/rate-request/route'
import { NextRequest } from 'next/server'

describe('POST /api/rate-request', () => {
  it('returns 200 on valid submission', async () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Need quote for LCL shipment',
    }

    const request = new NextRequest('http://localhost:3000/api/rate-request', {
      method: 'POST',
      body: JSON.stringify(validData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    expect(response.status).toBe(200)

    const json = await response.json()
    expect(json.success).toBe(true)
    expect(json.message).toContain('received')
  })

  it('returns 400 on invalid email', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'invalid-email',
      message: 'Need quote',
    }

    const request = new NextRequest('http://localhost:3000/api/rate-request', {
      method: 'POST',
      body: JSON.stringify(invalidData),
    })

    const response = await POST(request)
    expect(response.status).toBe(400)

    const json = await response.json()
    expect(json.error).toContain('email')
  })

  it('returns 400 on missing required fields', async () => {
    const invalidData = {
      name: 'John Doe',
      // missing email and message
    }

    const request = new NextRequest('http://localhost:3000/api/rate-request', {
      method: 'POST',
      body: JSON.stringify(invalidData),
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it('returns 400 on message too short', async () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Short',
    }

    const request = new NextRequest('http://localhost:3000/api/rate-request', {
      method: 'POST',
      body: JSON.stringify(invalidData),
    })

    const response = await POST(request)
    expect(response.status).toBe(400)

    const json = await response.json()
    expect(json.error).toContain('10 characters')
  })

  it('returns 429 on rate limit exceeded', async () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Need quote for shipping',
    }

    // Send multiple requests rapidly
    const requests = Array(6).fill(null).map(() =>
      new NextRequest('http://localhost:3000/api/rate-request', {
        method: 'POST',
        body: JSON.stringify(validData),
        headers: {
          'X-Forwarded-For': '127.0.0.1',
        },
      })
    )

    const responses = await Promise.all(requests.map(req => POST(req)))
    const rateLimited = responses.some(res => res.status === 429)

    expect(rateLimited).toBe(true)
  })

  it('sanitizes user input', async () => {
    const xssAttempt = {
      name: '<script>alert("xss")</script>',
      email: 'john@example.com',
      message: 'Normal message here',
    }

    const request = new NextRequest('http://localhost:3000/api/rate-request', {
      method: 'POST',
      body: JSON.stringify(xssAttempt),
    })

    const response = await POST(request)
    expect(response.status).toBe(200)

    // Verify that malicious script was sanitized (checked in email service mock)
  })

  it('sends email notification', async () => {
    const mockEmailService = vi.spyOn(emailService, 'send')

    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Need quote',
    }

    const request = new NextRequest('http://localhost:3000/api/rate-request', {
      method: 'POST',
      body: JSON.stringify(validData),
    })

    await POST(request)

    expect(mockEmailService).toHaveBeenCalledWith(
      expect.objectContaining({
        to: expect.any(String),
        subject: expect.stringContaining('Rate Request'),
        body: expect.stringContaining('John Doe'),
      })
    )
  })

  it('handles email service failure gracefully', async () => {
    const mockEmailService = vi.spyOn(emailService, 'send').mockRejectedValue(
      new Error('Email service unavailable')
    )

    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Need quote',
    }

    const request = new NextRequest('http://localhost:3000/api/rate-request', {
      method: 'POST',
      body: JSON.stringify(validData),
    })

    const response = await POST(request)

    // Should still return success to user but log error
    expect(response.status).toBe(200)
    // Error should be logged (check logging service)
  })

  it('returns 405 for non-POST methods', async () => {
    const request = new NextRequest('http://localhost:3000/api/rate-request', {
      method: 'GET',
    })

    const response = await POST(request)
    expect(response.status).toBe(405)
  })
})

describe('Rate Limiting', () => {
  it('allows 5 requests per minute per IP', async () => {
    // Test rate limiting logic
  })

  it('resets rate limit after time window', async () => {
    // Test rate limit reset
  })
})
```

### 2. Implement API Route Handler

```typescript
// src/app/api/rate-request/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { rateRequestSchema } from '@/lib/validations'
import { rateLimit } from '@/lib/rate-limit'
import { sendEmail } from '@/lib/email'
import { sanitizeHtml } from '@/lib/sanitize'
import { ZodError } from 'zod'

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') ?? 'anonymous'

    try {
      await limiter.check(5, ip) // 5 requests per minute
    } catch {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = rateRequestSchema.parse(body)

    // Sanitize user input
    const sanitizedData = {
      name: sanitizeHtml(validatedData.name),
      email: validatedData.email, // Already validated
      phone: validatedData.phone ? sanitizeHtml(validatedData.phone) : undefined,
      company: validatedData.company ? sanitizeHtml(validatedData.company) : undefined,
      message: sanitizeHtml(validatedData.message),
    }

    // Send email notification
    try {
      await sendEmail({
        to: process.env.RATE_REQUEST_EMAIL!,
        replyTo: sanitizedData.email,
        subject: 'New Rate Request from Website',
        html: generateRateRequestEmail(sanitizedData),
      })
    } catch (emailError) {
      // Log error but don't fail the request
      console.error('Email service error:', emailError)
      // TODO: Add to error monitoring service (e.g., Sentry)
    }

    // Return success
    return NextResponse.json({
      success: true,
      message: 'Your request has been received. We will contact you soon.',
    })

  } catch (error) {
    // Handle validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      )
    }

    // Handle other errors
    console.error('Rate request API error:', error)
    return NextResponse.json(
      { error: 'An error occurred processing your request.' },
      { status: 500 }
    )
  }
}

function generateRateRequestEmail(data: any) {
  return `
    <h2>New Rate Request</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
    ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
    <p><strong>Message:</strong></p>
    <p>${data.message.replace(/\n/g, '<br>')}</p>
  `
}

// Explicitly handle only POST
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
```

### 3. Implement Rate Limiting Utility

```typescript
// src/lib/rate-limit.ts
import { LRUCache } from 'lru-cache'

type Options = {
  uniqueTokenPerInterval?: number
  interval?: number
}

export function rateLimit(options: Options = {}) {
  const tokenCache = new LRUCache({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval || 60000,
  })

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0]
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount)
        }
        tokenCount[0] += 1

        const currentUsage = tokenCount[0]
        const isRateLimited = currentUsage >= limit

        return isRateLimited ? reject() : resolve()
      }),
  }
}
```

### 4. Implement Email Service

```typescript
// src/lib/email.ts
interface EmailOptions {
  to: string
  replyTo?: string
  subject: string
  html: string
}

export async function sendEmail(options: EmailOptions) {
  // In development, just log
  if (process.env.NODE_ENV === 'development') {
    console.log('Email would be sent:', options)
    return
  }

  // In production, use email service (Resend, SendGrid, etc.)
  // Example with Resend:
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'noreply@seashipping.com',
      to: options.to,
      reply_to: options.replyTo,
      subject: options.subject,
      html: options.html,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to send email')
  }

  return response.json()
}
```

### 5. Implement Input Sanitization

```typescript
// src/lib/sanitize.ts
import DOMPurify from 'isomorphic-dompurify'

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [], // Strip all HTML tags
    ALLOWED_ATTR: [],
  })
}
```

## Testing Requirements
- 90%+ test coverage for API routes
- All validation scenarios tested
- Rate limiting tested
- Email sending tested (mocked)
- Error handling tested
- XSS prevention tested
- Integration tests passing

## Acceptance Criteria
- ✅ Tests written first (TDD)
- ✅ All integration tests passing (90%+ coverage)
- ✅ API routes implemented for all forms
- ✅ Server-side validation working
- ✅ Rate limiting implemented
- ✅ Email notifications working
- ✅ Input sanitization working
- ✅ Error handling comprehensive
- ✅ Proper HTTP status codes
- ✅ Security best practices followed
- ✅ Environment variables configured
- ✅ Development mode logging working

## Notes
- Use environment variables for sensitive data
- Implement proper error logging in production
- Consider using email service like Resend or SendGrid
- Rate limiting prevents spam attacks
- Always sanitize user input
- Return generic errors to users (don't expose internals)
- Log detailed errors for debugging
- Test rate limiting with actual requests
