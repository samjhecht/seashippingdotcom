import { NextRequest, NextResponse } from 'next/server'
import { newsletterSubscriptionSchema } from '@/lib/validations'
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
    const validatedData = newsletterSubscriptionSchema.parse(body)

    // Sanitize user input
    const sanitizedData = {
      email: validatedData.email, // Already validated by Zod
      name: validatedData.name ? sanitizeHtml(validatedData.name) : undefined,
    }

    // Send email notification to marketing team
    try {
      await sendEmail({
        to: process.env.NEWSLETTER_EMAIL!,
        subject: 'New Newsletter Subscription',
        html: generateSubscriptionEmail(sanitizedData),
      })
    } catch (emailError) {
      // Log error but don't fail the request
      console.error('Email service error:', emailError)
    }

    // Return success
    return NextResponse.json({
      success: true,
      message:
        'You have been successfully subscribed to our newsletter. Thank you!',
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
    console.error('Newsletter subscription API error:', error)
    return NextResponse.json(
      { error: 'An error occurred processing your request.' },
      { status: 500 }
    )
  }
}

function generateSubscriptionEmail(data: {
  email: string
  name?: string
}): string {
  return `
    <h2>New Newsletter Subscription</h2>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.name ? `<p><strong>Name:</strong> ${data.name}</p>` : ''}
    <p><em>Subscribed at: ${new Date().toLocaleString()}</em></p>
  `
}
