import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '@/app/api/newsletter/unsubscribe/route'

// Mock the email service
vi.mock('@/lib/email', () => ({
  sendEmail: vi.fn().mockResolvedValue({ success: true }),
}))

describe('POST /api/newsletter/unsubscribe', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.NEWSLETTER_EMAIL = 'marketing@seashipping.com'
    // @ts-ignore - Allow setting NODE_ENV in tests
    process.env.NODE_ENV = 'test'
  })

  it('returns 200 on valid unsubscription', async () => {
    const validData = {
      email: 'unsubscribe@example.com',
    }

    const request = new NextRequest(
      'http://localhost:3000/api/newsletter/unsubscribe',
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
    expect(json.message).toContain('unsubscribed')
  })

  it('returns 400 on missing email', async () => {
    const invalidData = {}

    const request = new NextRequest(
      'http://localhost:3000/api/newsletter/unsubscribe',
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
    }

    const request = new NextRequest(
      'http://localhost:3000/api/newsletter/unsubscribe',
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
      email: 'unsubscribe@example.com',
    }

    const requests = Array(6)
      .fill(null)
      .map(() =>
        new NextRequest('http://localhost:3000/api/newsletter/unsubscribe', {
          method: 'POST',
          body: JSON.stringify(validData),
          headers: {
            'Content-Type': 'application/json',
            'X-Forwarded-For': '192.168.4.100',
          },
        })
      )

    const responses = await Promise.all(requests.map((req) => POST(req)))
    const rateLimited = responses.some((res) => res.status === 429)

    expect(rateLimited).toBe(true)
  })

  it('sends email notification', async () => {
    const { sendEmail } = await import('@/lib/email')

    const validData = {
      email: 'unsubscribe@example.com',
    }

    const request = new NextRequest(
      'http://localhost:3000/api/newsletter/unsubscribe',
      {
        method: 'POST',
        body: JSON.stringify(validData),
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': '192.168.4.101',
        },
      }
    )

    await POST(request)

    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'marketing@seashipping.com',
        subject: expect.stringContaining('Newsletter Unsubscription'),
        html: expect.stringContaining('unsubscribe@example.com'),
      })
    )
  })

  it('handles email service failure gracefully', async () => {
    const { sendEmail } = await import('@/lib/email')
    ;(sendEmail as any).mockRejectedValueOnce(
      new Error('Email service unavailable')
    )

    const validData = {
      email: 'unsubscribe@example.com',
    }

    const request = new NextRequest(
      'http://localhost:3000/api/newsletter/unsubscribe',
      {
        method: 'POST',
        body: JSON.stringify(validData),
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': '192.168.4.102',
        },
      }
    )

    const response = await POST(request)
    expect(response.status).toBe(200)
  })

  it('trims and normalizes email', async () => {
    const { sendEmail } = await import('@/lib/email')

    const dataWithWhitespace = {
      email: '  UNSUBSCRIBE@EXAMPLE.COM  ',
    }

    const request = new NextRequest(
      'http://localhost:3000/api/newsletter/unsubscribe',
      {
        method: 'POST',
        body: JSON.stringify(dataWithWhitespace),
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': '192.168.4.103',
        },
      }
    )

    const response = await POST(request)
    expect(response.status).toBe(200)

    expect(sendEmail).toHaveBeenCalled()
    const emailCall = (sendEmail as any).mock.calls[0][0]
    expect(emailCall.html).toContain('unsubscribe@example.com')
  })

  it('handles malformed JSON', async () => {
    const request = new NextRequest(
      'http://localhost:3000/api/newsletter/unsubscribe',
      {
        method: 'POST',
        body: 'invalid json{',
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': '192.168.4.104',
        },
      }
    )

    const response = await POST(request)
    expect(response.status).toBe(500)

    const json = await response.json()
    expect(json.error).toBeDefined()
  })
})
