import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '@/app/api/newsletter/subscribe/route'

// Mock the email service
vi.mock('@/lib/email', () => ({
  sendEmail: vi.fn().mockResolvedValue({ success: true }),
}))

describe('POST /api/newsletter/subscribe', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.NEWSLETTER_EMAIL = 'marketing@seashipping.com'
    // @ts-ignore - Allow setting NODE_ENV in tests
    process.env.NODE_ENV = 'test'
  })

  it('returns 200 on valid subscription with name', async () => {
    const validData = {
      email: 'subscriber@example.com',
      name: 'John Subscriber',
    }

    const request = new NextRequest(
      'http://localhost:3000/api/newsletter/subscribe',
      {
        method: 'POST',
        body: JSON.stringify(validData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const response = await POST(request)
    expect(response.status).toBe(200)

    const json = await response.json()
    expect(json.success).toBe(true)
    expect(json.message).toContain('subscribed')
  })

  it('returns 200 on valid subscription without name', async () => {
    const validData = {
      email: 'subscriber2@example.com',
    }

    const request = new NextRequest(
      'http://localhost:3000/api/newsletter/subscribe',
      {
        method: 'POST',
        body: JSON.stringify(validData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const response = await POST(request)
    expect(response.status).toBe(200)
  })

  it('returns 400 on missing email', async () => {
    const invalidData = {
      name: 'John Subscriber',
    }

    const request = new NextRequest(
      'http://localhost:3000/api/newsletter/subscribe',
      {
        method: 'POST',
        body: JSON.stringify(invalidData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const response = await POST(request)
    expect(response.status).toBe(400)

    const json = await response.json()
    expect(json.error).toBe('Validation failed')
    const emailError = json.details.find((d: any) => d.field === 'email')
    expect(emailError).toBeDefined()
  })

  it('returns 400 on invalid email', async () => {
    const invalidData = {
      email: 'not-an-email',
      name: 'John Subscriber',
    }

    const request = new NextRequest(
      'http://localhost:3000/api/newsletter/subscribe',
      {
        method: 'POST',
        body: JSON.stringify(invalidData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it('returns 429 on rate limit exceeded', async () => {
    const validData = {
      email: 'subscriber@example.com',
    }

    const requests = Array(6)
      .fill(null)
      .map(() =>
        new NextRequest('http://localhost:3000/api/newsletter/subscribe', {
          method: 'POST',
          body: JSON.stringify(validData),
          headers: {
            'Content-Type': 'application/json',
            'X-Forwarded-For': '192.168.3.100',
          },
        })
      )

    const responses = await Promise.all(requests.map((req) => POST(req)))
    const rateLimited = responses.some((res) => res.status === 429)

    expect(rateLimited).toBe(true)
  })

  it('sanitizes user input', async () => {
    const { sendEmail } = await import('@/lib/email')

    const xssAttempt = {
      email: 'subscriber@example.com',
      name: '<script>alert("xss")</script>John',
    }

    const request = new NextRequest(
      'http://localhost:3000/api/newsletter/subscribe',
      {
        method: 'POST',
        body: JSON.stringify(xssAttempt),
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': '192.168.3.101',
        },
      }
    )

    const response = await POST(request)
    expect(response.status).toBe(200)

    expect(sendEmail).toHaveBeenCalled()
    const emailCall = (sendEmail as any).mock.calls[0][0]
    expect(emailCall.html).not.toContain('<script>')
  })

  it('sends email notification', async () => {
    const { sendEmail } = await import('@/lib/email')

    const validData = {
      email: 'subscriber@example.com',
      name: 'John Subscriber',
    }

    const request = new NextRequest(
      'http://localhost:3000/api/newsletter/subscribe',
      {
        method: 'POST',
        body: JSON.stringify(validData),
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': '192.168.3.102',
        },
      }
    )

    await POST(request)

    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'marketing@seashipping.com',
        subject: expect.stringContaining('Newsletter Subscription'),
        html: expect.stringContaining('subscriber@example.com'),
      })
    )
  })

  it('handles email service failure gracefully', async () => {
    const { sendEmail } = await import('@/lib/email')
    ;(sendEmail as any).mockRejectedValueOnce(
      new Error('Email service unavailable')
    )

    const validData = {
      email: 'subscriber@example.com',
    }

    const request = new NextRequest(
      'http://localhost:3000/api/newsletter/subscribe',
      {
        method: 'POST',
        body: JSON.stringify(validData),
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': '192.168.3.103',
        },
      }
    )

    const response = await POST(request)
    expect(response.status).toBe(200)
  })

  it('trims and normalizes email', async () => {
    const { sendEmail } = await import('@/lib/email')

    const dataWithWhitespace = {
      email: '  SUBSCRIBER@EXAMPLE.COM  ',
      name: '  John Subscriber  ',
    }

    const request = new NextRequest(
      'http://localhost:3000/api/newsletter/subscribe',
      {
        method: 'POST',
        body: JSON.stringify(dataWithWhitespace),
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': '192.168.3.104',
        },
      }
    )

    const response = await POST(request)
    expect(response.status).toBe(200)

    expect(sendEmail).toHaveBeenCalled()
    const emailCall = (sendEmail as any).mock.calls[0][0]
    expect(emailCall.html).toContain('subscriber@example.com')
  })

  it('accepts empty string for name', async () => {
    const validData = {
      email: 'subscriber@example.com',
      name: '',
    }

    const request = new NextRequest(
      'http://localhost:3000/api/newsletter/subscribe',
      {
        method: 'POST',
        body: JSON.stringify(validData),
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': '192.168.3.105',
        },
      }
    )

    const response = await POST(request)
    expect(response.status).toBe(200)
  })
})
