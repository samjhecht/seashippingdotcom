import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '@/app/api/rate-request/route'

// Mock the email service
vi.mock('@/lib/email', () => ({
  sendEmail: vi.fn().mockResolvedValue({ success: true }),
}))

describe('POST /api/rate-request', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks()
    // Set environment variables
    process.env.RATE_REQUEST_EMAIL = 'operations@seashipping.com'
    // @ts-ignore - Allow setting NODE_ENV in tests
    process.env.NODE_ENV = 'test'
  })

  afterEach(() => {
    // Clean up rate limit cache between tests
    vi.clearAllTimers()
  })

  it('returns 200 on valid submission', async () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Need quote for LCL shipment from Los Angeles to Shanghai',
      phone: '+1-555-123-4567',
      company: 'Test Company Inc',
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
      message: 'Need quote for shipping',
    }

    const request = new NextRequest('http://localhost:3000/api/rate-request', {
      method: 'POST',
      body: JSON.stringify(invalidData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    expect(response.status).toBe(400)

    const json = await response.json()
    expect(json.error).toBe('Validation failed')
    expect(json.details).toBeDefined()
    const emailError = json.details.find((d: any) => d.field === 'email')
    expect(emailError).toBeDefined()
  })

  it('returns 400 on missing required fields', async () => {
    const invalidData = {
      name: 'John Doe',
      // missing email and message
    }

    const request = new NextRequest('http://localhost:3000/api/rate-request', {
      method: 'POST',
      body: JSON.stringify(invalidData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    expect(response.status).toBe(400)

    const json = await response.json()
    expect(json.error).toBe('Validation failed')
    expect(json.details.length).toBeGreaterThan(0)
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
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    expect(response.status).toBe(400)

    const json = await response.json()
    expect(json.error).toBe('Validation failed')
    const messageError = json.details.find((d: any) => d.field === 'message')
    expect(messageError?.message).toContain('10 characters')
  })

  it('returns 429 on rate limit exceeded', async () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Need quote for shipping from LA to Shanghai',
    }

    // Send 6 requests rapidly from same IP
    const requests = Array(6)
      .fill(null)
      .map(() =>
        new NextRequest('http://localhost:3000/api/rate-request', {
          method: 'POST',
          body: JSON.stringify(validData),
          headers: {
            'Content-Type': 'application/json',
            'X-Forwarded-For': '192.168.1.100',
          },
        })
      )

    const responses = await Promise.all(requests.map((req) => POST(req)))
    const rateLimited = responses.some((res) => res.status === 429)

    expect(rateLimited).toBe(true)

    // Check the rate limited response
    const rateLimitedResponse = responses.find((res) => res.status === 429)
    if (rateLimitedResponse) {
      const json = await rateLimitedResponse.json()
      expect(json.error).toContain('Rate limit')
    }
  })

  it('sanitizes user input', async () => {
    const { sendEmail } = await import('@/lib/email')

    const xssAttempt = {
      name: '<script>alert("xss")</script>John',
      email: 'john@example.com',
      message: 'Normal message here with more than 10 characters',
      company: '<img src=x onerror=alert(1)>',
    }

    const request = new NextRequest('http://localhost:3000/api/rate-request', {
      method: 'POST',
      body: JSON.stringify(xssAttempt),
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': '192.168.1.101',
      },
    })

    const response = await POST(request)
    expect(response.status).toBe(200)

    // Verify that malicious script was sanitized in email
    expect(sendEmail).toHaveBeenCalled()
    const emailCall = (sendEmail as any).mock.calls[0][0]
    expect(emailCall.html).not.toContain('<script>')
    expect(emailCall.html).not.toContain('onerror')
  })

  it('sends email notification', async () => {
    const { sendEmail } = await import('@/lib/email')

    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Need quote for LCL shipment',
      phone: '+1-555-123-4567',
      company: 'Test Company',
    }

    const request = new NextRequest('http://localhost:3000/api/rate-request', {
      method: 'POST',
      body: JSON.stringify(validData),
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': '192.168.1.102',
      },
    })

    await POST(request)

    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'operations@seashipping.com',
        subject: expect.stringContaining('Rate Request'),
        replyTo: 'john@example.com',
        html: expect.stringContaining('John Doe'),
      })
    )
  })

  it('handles email service failure gracefully', async () => {
    const { sendEmail } = await import('@/lib/email')
    ;(sendEmail as any).mockRejectedValueOnce(
      new Error('Email service unavailable')
    )

    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Need quote for shipping',
    }

    const request = new NextRequest('http://localhost:3000/api/rate-request', {
      method: 'POST',
      body: JSON.stringify(validData),
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': '192.168.1.103',
      },
    })

    const response = await POST(request)

    // Should still return success to user
    expect(response.status).toBe(200)
    const json = await response.json()
    expect(json.success).toBe(true)
  })

  it('handles malformed JSON', async () => {
    const request = new NextRequest('http://localhost:3000/api/rate-request', {
      method: 'POST',
      body: 'invalid json{',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': '192.168.1.104',
      },
    })

    const response = await POST(request)
    expect(response.status).toBe(500)

    const json = await response.json()
    expect(json.error).toBeDefined()
  })

  it('trims and normalizes input data', async () => {
    const { sendEmail } = await import('@/lib/email')

    const dataWithWhitespace = {
      name: '  John Doe  ',
      email: '  JOHN@EXAMPLE.COM  ',
      message: '  Need quote for shipping  ',
      phone: '  +1-555-123-4567  ',
      company: '  Test Company  ',
    }

    const request = new NextRequest('http://localhost:3000/api/rate-request', {
      method: 'POST',
      body: JSON.stringify(dataWithWhitespace),
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': '192.168.1.105',
      },
    })

    const response = await POST(request)
    expect(response.status).toBe(200)

    // Verify email was sent with normalized data
    expect(sendEmail).toHaveBeenCalled()
    const emailCall = (sendEmail as any).mock.calls[0][0]
    expect(emailCall.replyTo).toBe('john@example.com') // lowercase
    expect(emailCall.html).toContain('John Doe') // trimmed
  })

  it('validates phone number format', async () => {
    const invalidPhone = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Need quote for shipping',
      phone: 'invalid phone number with letters',
    }

    const request = new NextRequest('http://localhost:3000/api/rate-request', {
      method: 'POST',
      body: JSON.stringify(invalidPhone),
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': '192.168.1.106',
      },
    })

    const response = await POST(request)
    expect(response.status).toBe(400)

    const json = await response.json()
    expect(json.error).toBe('Validation failed')
    const phoneError = json.details.find((d: any) => d.field === 'phone')
    expect(phoneError?.message).toContain('valid phone number')
  })

  it('accepts optional fields as empty strings', async () => {
    const minimalData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Need quote for shipping',
      phone: '',
      company: '',
    }

    const request = new NextRequest('http://localhost:3000/api/rate-request', {
      method: 'POST',
      body: JSON.stringify(minimalData),
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': '192.168.1.107',
      },
    })

    const response = await POST(request)
    expect(response.status).toBe(200)
  })
})
