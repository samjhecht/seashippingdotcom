import { NextRequest, NextResponse } from 'next/server'
import { newsletterUnsubscriptionSchema } from '@/lib/validations'
import { rateLimit } from '@/lib/rate-limit'
import { sendEmail } from '@/lib/email'
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
    const validatedData = newsletterUnsubscriptionSchema.parse(body)

    // Email is already validated and normalized by Zod
    const email = validatedData.email

    // Send email notification to marketing team
    try {
      await sendEmail({
        to: process.env.NEWSLETTER_EMAIL!,
        subject: 'Newsletter Unsubscription',
        html: generateUnsubscriptionEmail({ email }),
      })
    } catch (emailError) {
      // Log error but don't fail the request
      console.error('Email service error:', emailError)
    }

    // Return success
    return NextResponse.json({
      success: true,
      message:
        'You have been successfully unsubscribed from our newsletter. We are sorry to see you go.',
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
    console.error('Newsletter unsubscription API error:', error)
    return NextResponse.json(
      { error: 'An error occurred processing your request.' },
      { status: 500 }
    )
  }
}

function generateUnsubscriptionEmail(data: { email: string }): string {
  return `
    <h2>Newsletter Unsubscription</h2>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><em>Unsubscribed at: ${new Date().toLocaleString()}</em></p>
  `
}
