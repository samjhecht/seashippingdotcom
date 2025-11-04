import { NextRequest, NextResponse } from 'next/server';
import { requestFormSchema } from '@/lib/validations';
import { rateLimit } from '@/lib/rate-limit';
import { sendEmail } from '@/lib/email';
import { sanitizeHtml } from '@/lib/sanitize';
import { ZodError } from 'zod';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') ?? 'anonymous';

    try {
      await limiter.check(5, ip); // 5 requests per minute
    } catch {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = requestFormSchema.parse(body);

    // Sanitize user input
    const sanitizedData = {
      name: sanitizeHtml(validatedData.name),
      email: validatedData.email, // Already validated by Zod
      phone: validatedData.phone
        ? sanitizeHtml(validatedData.phone)
        : undefined,
      company: validatedData.company
        ? sanitizeHtml(validatedData.company)
        : undefined,
      subject: sanitizeHtml(validatedData.subject),
      message: sanitizeHtml(validatedData.message),
      cargoType: validatedData.cargoType
        ? sanitizeHtml(validatedData.cargoType)
        : undefined,
      origin: validatedData.origin
        ? sanitizeHtml(validatedData.origin)
        : undefined,
      destination: validatedData.destination
        ? sanitizeHtml(validatedData.destination)
        : undefined,
      volume: validatedData.volume
        ? sanitizeHtml(validatedData.volume)
        : undefined,
      containerSize: validatedData.containerSize
        ? sanitizeHtml(validatedData.containerSize)
        : undefined,
      hazardousMaterials: validatedData.hazardousMaterials
        ? sanitizeHtml(validatedData.hazardousMaterials)
        : undefined,
      shipDate: validatedData.shipDate
        ? sanitizeHtml(validatedData.shipDate)
        : undefined,
    };

    // Send email notification
    try {
      await sendEmail({
        to: process.env.CONTACT_EMAIL!,
        replyTo: sanitizedData.email,
        subject: `Request Form: ${sanitizedData.subject}`,
        html: generateRequestEmail(sanitizedData),
      });
    } catch (emailError) {
      // Log error but don't fail the request
      console.error('Email service error:', emailError);
    }

    // Return success
    return NextResponse.json({
      success: true,
      message:
        'Your request has been received. We will get back to you soon. We appreciate your patronage.',
    });
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
      );
    }

    // Handle other errors
    console.error('Request API error:', error);
    return NextResponse.json(
      { error: 'An error occurred processing your request.' },
      { status: 500 }
    );
  }
}

function generateRequestEmail(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  cargoType?: string;
  origin?: string;
  destination?: string;
  volume?: string;
  containerSize?: string;
  hazardousMaterials?: string;
  shipDate?: string;
}): string {
  return `
    <h2>New Request Form Submission</h2>
    <p><strong>Subject:</strong> ${data.subject}</p>
    <hr>
    <h3>Contact Information</h3>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
    ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}

    <h3>Message / Commodity Description</h3>
    <p>${data.message.replace(/\n/g, '<br>')}</p>

    ${
      data.cargoType ||
      data.origin ||
      data.destination ||
      data.volume ||
      data.containerSize ||
      data.hazardousMaterials ||
      data.shipDate
        ? `
    <h3>Shipping Details</h3>
    ${data.cargoType ? `<p><strong>Cargo Type:</strong> ${data.cargoType}</p>` : ''}
    ${data.origin ? `<p><strong>Origin:</strong> ${data.origin}</p>` : ''}
    ${data.destination ? `<p><strong>Destination:</strong> ${data.destination}</p>` : ''}
    ${data.volume ? `<p><strong>Number of Containers:</strong> ${data.volume}</p>` : ''}
    ${data.containerSize ? `<p><strong>Container Size:</strong> ${data.containerSize}</p>` : ''}
    ${data.hazardousMaterials ? `<p><strong>Hazardous Materials:</strong> ${data.hazardousMaterials}</p>` : ''}
    ${data.shipDate ? `<p><strong>Approximate Ship Date:</strong> ${data.shipDate}</p>` : ''}
    `
        : ''
    }
  `;
}
