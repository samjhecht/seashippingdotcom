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
      email: validatedData.email, // Already validated by Zod
      phone: validatedData.phone ? sanitizeHtml(validatedData.phone) : undefined,
      company: validatedData.company
        ? sanitizeHtml(validatedData.company)
        : undefined,
      message: sanitizeHtml(validatedData.message),
      serviceType: validatedData.serviceType
        ? sanitizeHtml(validatedData.serviceType)
        : undefined,
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
          details: error.issues.map((e) => ({
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

function generateRateRequestEmail(data: {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  serviceType?: string
}): string {
  return `
    <h2>New Rate Request</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
    ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
    ${data.serviceType ? `<p><strong>Service Type:</strong> ${data.serviceType}</p>` : ''}
    <p><strong>Message:</strong></p>
    <p>${data.message.replace(/\n/g, '<br>')}</p>
  `
}
