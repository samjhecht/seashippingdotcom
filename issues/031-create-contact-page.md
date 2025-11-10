---
id: 031
title: Create Dedicated Contact Page
phase: 4
priority: medium
status: todo
dependencies: []
estimated_hours: 4
tags: [pages, contact, forms, ux]
---

# Create Dedicated Contact Page

## Objective
Create a dedicated `/contact` page separate from the `/request` (rate quote) page. Currently, general contact inquiries and rate requests are conflated, but they serve different purposes and should have distinct pages.

## Current State
- `/request` page exists for rate quote requests
- No dedicated `/contact` page exists
- Services page and other pages reference `/contact` but it doesn't exist
- General inquiries mixed with rate quote requests
- Footer has office information but no centralized contact page

## Problem Statement
Users looking for general contact information (asking questions, customer service, office locations, phone numbers) are directed to the rate request form, which is optimized for shipping quotes. This creates confusion and poor user experience. A dedicated contact page should:
1. Provide multiple contact methods (phone, email, form, offices)
2. Serve general inquiries, not just rate requests
3. Display office locations prominently
4. Offer quick access to common resources

## Requirements

### Page Location
`/src/app/contact/page.tsx`

### Page Sections
1. **Hero/Header** - "Contact Us" with brief intro
2. **Quick Contact Cards** - Phone, email, hours
3. **General Contact Form** - Simple inquiry form
4. **Office Locations** - All 8 offices with full details
5. **Alternative Contact Methods** - ExportFile, SharePoint, social media
6. **FAQ / Quick Links** - Common questions, resources

### Contact Form vs. Request Form
| Contact Form (`/contact`) | Request Form (`/request`) |
|---------------------------|---------------------------|
| General inquiries | Rate quotes |
| Customer service questions | New business inquiries |
| Simple fields (name, email, message) | Detailed fields (commodity, origin, destination) |
| No shipment details required | Shipment details required |
| Quick response expected | Quote provided within 24 hours |

## Implementation Steps

### 1. Create Contact Page Component

```typescript
// src/app/contact/page.tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ContactForm } from '@/components/forms/ContactForm'
import { OfficeCard } from '@/components/contact/OfficeCard'
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  MessageSquare,
  FileText,
  HelpCircle,
} from 'lucide-react'
import { COMPANY_INFO, OFFICES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact Us | Sea Shipping Line',
  description: 'Get in touch with Sea Shipping Line. Contact our team for shipping inquiries, customer service, or visit one of our 8 domestic offices across the United States.',
  keywords: 'contact sea shipping line, freight forwarder contact, shipping company phone, NVOCC contact',
}

export default function ContactPage() {
  return (
    <main id="main" role="main">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="absolute inset-0">
          <Image
            src="/images/contact/contact-hero.jpg"
            alt="Contact Sea Shipping Line"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl">
            We're here to help with your shipping and logistics needs
          </p>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Phone */}
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Phone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Call Us</h3>
                  <a
                    href={`tel:${COMPANY_INFO.phone.replace(/\D/g, '')}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold text-lg"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                  <p className="text-sm text-gray-600 mt-2">
                    Monday - Friday
                  </p>
                </CardContent>
              </Card>

              {/* Email */}
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Mail className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Email Us</h3>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    {COMPANY_INFO.email}
                  </a>
                  <p className="text-sm text-gray-600 mt-2">
                    We'll respond within 24 hours
                  </p>
                </CardContent>
              </Card>

              {/* Hours */}
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Clock className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Business Hours</h3>
                  <p className="text-gray-700">
                    Monday - Friday<br />
                    8:00 AM - 5:00 PM<br />
                    <span className="text-sm text-gray-600">(Local time per office)</span>
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/request">
                <Button
                  size="lg"
                  style={{ backgroundColor: '#ee1c23' }}
                  className="w-full sm:w-auto"
                >
                  Request Rate Quote
                </Button>
              </Link>
              <Link href="/resources">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <FileText className="w-4 h-4 mr-2" />
                  Download Forms
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>
              <p className="text-lg text-gray-700">
                Have a question? Fill out the form below and we'll get back to you promptly.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                For shipping rate quotes, please use our{' '}
                <Link href="/request" className="text-blue-600 hover:underline">
                  Rate Request Form
                </Link>
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <MapPin className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Our Offices</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              {OFFICES.length} owned & operated domestic offices across the United States,
              providing local expertise with national reach
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {OFFICES.map((office) => (
              <OfficeCard key={office.city} office={office} />
            ))}
          </div>
        </div>
      </section>

      {/* Alternative Contact Methods */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Additional Resources
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ExportFile Portal */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-blue-600" />
                    ExportFile Portal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Access your shipment documents, track cargo, and manage bookings through
                    our secure online portal.
                  </p>
                  <a
                    href={COMPANY_INFO.exportFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="w-full">
                      Access ExportFile
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* SharePoint */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-green-600" />
                    SharePoint Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Access shared documents, compliance materials, and customer resources through
                    our SharePoint portal.
                  </p>
                  <a
                    href={COMPANY_INFO.sharepointUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="w-full">
                      Access SharePoint
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* Claims */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-orange-600" />
                    File a Claim
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Need to file a cargo claim? Download our claims form and submit documentation
                    for review.
                  </p>
                  <Link href="/resources#claims">
                    <Button variant="outline" className="w-full">
                      Claims Form
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* FAQ / Help */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HelpCircle className="w-6 h-6 mr-2 text-purple-600" />
                    Help Center
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Find answers to frequently asked questions about shipping, documentation,
                    and our services.
                  </p>
                  <Link href="/resources">
                    <Button variant="outline" className="w-full">
                      Browse Resources
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    What's the best way to get a shipping quote?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Use our{' '}
                    <Link href="/request" className="text-blue-600 hover:underline">
                      Rate Request Form
                    </Link>{' '}
                    to provide shipment details. We'll respond within 24 hours with a competitive quote.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    How can I track my shipment?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Contact your dedicated account representative or access our ExportFile portal for
                    real-time tracking information. You can also call our main line for status updates.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Do you offer customs clearance services?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Yes, we provide licensed customs broker services for import and export clearance.
                    Contact us to discuss your customs needs.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    What are your payment terms?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Payment terms are established during account setup. We accept wire transfers, ACH,
                    and checks. Contact our accounting department for specific payment questions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience {COMPANY_INFO.yearsOfExperience}+ years of reliable shipping expertise.
            Request a quote or contact us today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/request">
              <Button
                size="lg"
                style={{ backgroundColor: '#ee1c23' }}
                className="w-full sm:w-auto"
              >
                Request Rate Quote
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-blue-900 hover:bg-gray-100 w-full sm:w-auto"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Us Now
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
```

### 2. Create OfficeCard Component

```typescript
// src/components/contact/OfficeCard.tsx
import { Phone, Mail } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Office {
  city: string
  state: string
  address: string
  phone: string
  fax?: string
  email?: string
}

interface OfficeCardProps {
  office: Office
}

export function OfficeCard({ office }: OfficeCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">
          {office.city}, {office.state}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm text-gray-700">
          <p>{office.address}</p>
        </div>

        <div className="space-y-2">
          <a
            href={`tel:${office.phone.replace(/\D/g, '')}`}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
            {office.phone}
          </a>

          {office.email && (
            <a
              href={`mailto:${office.email}`}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
              {office.email}
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
```

### 3. Create Simple ContactForm Component

```typescript
// src/components/forms/ContactForm.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      {/* Phone */}
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      {/* Subject */}
      <div>
        <Label htmlFor="subject">Subject *</Label>
        <Input
          id="subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          required
        />
      </div>

      {/* Message */}
      <div>
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        style={{ backgroundColor: '#ee1c23' }}
        className="w-full"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
          Thank you! Your message has been sent. We'll respond within 24 hours.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
          Sorry, there was an error sending your message. Please try again or call us directly.
        </div>
      )}
    </form>
  )
}
```

### 4. Create API Route for Contact Form

```typescript
// src/app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // Send email notification
    await sendEmail({
      to: process.env.CONTACT_EMAIL || 'info@seashipping.com',
      subject: `Contact Form: ${validatedData.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        ${validatedData.phone ? `<p><strong>Phone:</strong> ${validatedData.phone}</p>` : ''}
        <p><strong>Subject:</strong> ${validatedData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
```

## Testing Requirements

### Unit Tests
```typescript
// __tests__/unit/app/contact/page.test.tsx
describe('Contact Page', () => {
  it('renders page title')
  it('displays quick contact cards (phone, email, hours)')
  it('renders contact form')
  it('shows all office locations')
  it('displays alternative contact methods')
  it('includes FAQ section')
  it('has CTA buttons')
  it('links to rate request form')
  it('has no accessibility violations')
})

// __tests__/unit/components/forms/ContactForm.test.tsx
describe('ContactForm', () => {
  it('renders all required fields')
  it('validates email format')
  it('shows error for missing required fields')
  it('submits form data successfully')
  it('displays success message after submission')
  it('displays error message on failure')
  it('clears form after successful submission')
})
```

### E2E Tests
```typescript
// __tests__/e2e/journeys/contact.spec.ts
test('can access contact page from navigation', async ({ page }) => {
  await page.goto('/')
  // Assuming nav links to /contact
  await page.click('nav >> text=Contact')
  await expect(page).toHaveURL('/contact')
})

test('can submit contact form', async ({ page }) => {
  await page.goto('/contact')

  await page.fill('input[name="name"]', 'John Doe')
  await page.fill('input[name="email"]', 'john@example.com')
  await page.fill('input[name="subject"]', 'General Inquiry')
  await page.fill('textarea[name="message"]', 'This is a test message')

  await page.click('button:has-text("Send Message")')

  await expect(page.locator('text=Thank you')).toBeVisible()
})

test('phone numbers are clickable on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 })
  await page.goto('/contact')

  const phoneLink = page.locator('a[href^="tel:"]').first()
  await expect(phoneLink).toBeVisible()
  expect(await phoneLink.getAttribute('href')).toContain('tel:')
})
```

## Acceptance Criteria
- ✅ Page created at `/src/app/contact/page.tsx`
- ✅ Hero section with "Contact Us" heading
- ✅ Quick contact cards (phone, email, hours)
- ✅ General contact form with fields: name, email, phone, subject, message
- ✅ All 8 office locations displayed with OfficeCard component
- ✅ Alternative contact methods section (ExportFile, SharePoint, Claims, Help)
- ✅ FAQ section with 4+ common questions
- ✅ Final CTA section with phone and quote buttons
- ✅ OfficeCard component created
- ✅ ContactForm component created
- ✅ API route `/api/contact` created for form submission
- ✅ Email notifications sent on form submission
- ✅ Form validation with Zod schema
- ✅ Success/error messages displayed
- ✅ Mobile responsive design
- ✅ Clickable phone/email links
- ✅ Unit tests written and passing
- ✅ E2E tests written and passing
- ✅ Zero accessibility violations
- ✅ SEO metadata optimized

## Navigation Updates Required
After creating `/contact` page, update links:
- Header navigation: Add "Contact" link
- Services page: Update contact references to `/contact`
- Footer: Ensure "Contact Us" links to `/contact`
- Distinguish between `/contact` (general) and `/request` (quotes)

## Notes
- This page is separate from `/request` which is for rate quotes
- Contact form is simpler than request form (no shipment details)
- Office cards can be reused from footer or network page
- Consider adding map integration in future enhancement
- May want to add live chat widget later
- Form should send to general inbox, not sales team
- Consider adding office hours per location (timezone-aware)
- Could add customer support ticket system later

## Dependencies
- None (can be implemented immediately)

## Related Issues
- **011**: Form Components (ContactForm similar to RequestForm)
- **012**: API Routes Forms (contact API similar to request API)
- Office data may already exist in constants.ts from footer work
