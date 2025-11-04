interface EmailOptions {
  to: string
  replyTo?: string
  subject: string
  html: string
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  // In development/test, just log
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    console.log('📧 Email would be sent:', {
      to: options.to,
      replyTo: options.replyTo,
      subject: options.subject,
      htmlPreview: options.html.substring(0, 100) + '...',
    })
    return
  }

  // In production, use Resend API
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
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
    const error = await response.text()
    throw new Error(`Failed to send email: ${error}`)
  }

  return
}
