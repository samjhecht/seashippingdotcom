import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '@/app/api/contact/route'

// Mock the email service
vi.mock('@/lib/email', () => ({
  sendEmail: vi.fn().mockResolvedValue({ success: true }),
}))

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.CONTACT_EMAIL = 'info@seashipping.com'
    // @ts-ignore - Allow setting NODE_ENV in tests
    process.env.NODE_ENV = 'test'
  })

  it('returns 200 on valid submission', async () => {
    const validData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'General Inquiry',
      message: 'I would like to know more about your services',
      phone: '+1-555-987-6543',
      company: 'Smith Corp',
    }

    const request = new NextRequest('http://localhost:3000/api/contact', {
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

  it('returns 400 on missing subject field', async () => {
    const invalidData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      message: 'I would like to know more about your services',
    }

    const request = new NextRequest('http://localhost:3000/api/contact', {
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
    const subjectError = json.details.find((d: any) => d.field === 'subject')
    expect(subjectError).toBeDefined()
  })

  it('returns 400 on invalid email', async () => {
    const invalidData = {
      name: 'Jane Smith',
      email: 'not-an-email',
      subject: 'General Inquiry',
      message: 'I would like to know more about your services',
    }

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(invalidData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    expect(response.status).toBe(400)

    const json = await response.json()
    const emailError = json.details.find((d: any) => d.field === 'email')
    expect(emailError).toBeDefined()
  })

  it('returns 400 on subject too short', async () => {
    const invalidData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'Hi',
      message: 'I would like to know more about your services',
    }

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(invalidData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    expect(response.status).toBe(400)

    const json = await response.json()
    const subjectError = json.details.find((d: any) => d.field === 'subject')
    expect(subjectError?.message).toContain('3 characters')
  })

  it('returns 429 on rate limit exceeded', async () => {
    const validData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'General Inquiry',
      message: 'I would like to know more about your services',
    }

    const requests = Array(6)
      .fill(null)
      .map(() =>
        new NextRequest('http://localhost:3000/api/contact', {
          method: 'POST',
          body: JSON.stringify(validData),
          headers: {
            'Content-Type': 'application/json',
            'X-Forwarded-For': '192.168.2.100',
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
      name: '<script>alert("xss")</script>',
      email: 'jane@example.com',
      subject: 'Test Subject',
      message: 'Normal message with more than 10 characters',
    }

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(xssAttempt),
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': '192.168.2.101',
      },
    })

    const response = await POST(request)
    expect(response.status).toBe(200)

    expect(sendEmail).toHaveBeenCalled()
    const emailCall = (sendEmail as any).mock.calls[0][0]
    expect(emailCall.html).not.toContain('<script>')
  })

  it('sends email notification with subject', async () => {
    const { sendEmail } = await import('@/lib/email')

    const validData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'Partnership Inquiry',
      message: 'I would like to discuss partnership opportunities',
    }

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(validData),
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': '192.168.2.102',
      },
    })

    await POST(request)

    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'info@seashipping.com',
        subject: expect.stringContaining('Partnership Inquiry'),
        replyTo: 'jane@example.com',
        html: expect.stringContaining('Jane Smith'),
      })
    )
  })

  it('handles email service failure gracefully', async () => {
    const { sendEmail } = await import('@/lib/email')
    ;(sendEmail as any).mockRejectedValueOnce(
      new Error('Email service unavailable')
    )

    const validData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'Test',
      message: 'Test message with sufficient length',
    }

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(validData),
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': '192.168.2.103',
      },
    })

    const response = await POST(request)
    expect(response.status).toBe(200)
  })

  it('accepts optional fields as empty strings', async () => {
    const minimalData = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'Test',
      message: 'Test message with sufficient length',
      phone: '',
      company: '',
    }

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(minimalData),
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': '192.168.2.104',
      },
    })

    const response = await POST(request)
    expect(response.status).toBe(200)
  })
})
