import { describe, it, expect } from 'vitest'
import {
  rateRequestSchema,
  contactFormSchema,
  newsletterSubscriptionSchema,
  newsletterUnsubscriptionSchema,
  type RateRequestFormData,
  type ContactFormData,
  type NewsletterSubscriptionData,
  type NewsletterUnsubscriptionData,
} from '@/lib/validations'

describe('rateRequestSchema', () => {
  describe('name field', () => {
    it('accepts valid name', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Need quote for LCL from NYC to Shanghai',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.name).toBe('John Doe')
      }
    })

    it('rejects empty name', () => {
      const result = rateRequestSchema.safeParse({
        name: '',
        email: 'john@example.com',
        message: 'Need quote for shipping',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        const nameError = result.error.issues.find((i) => i.path[0] === 'name')
        expect(nameError?.message).toContain('required')
      }
    })

    it('rejects name shorter than 2 characters', () => {
      const result = rateRequestSchema.safeParse({
        name: 'J',
        email: 'john@example.com',
        message: 'Need quote for shipping',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        const nameError = result.error.issues.find((i) => i.path[0] === 'name')
        expect(nameError?.message).toContain('at least 2 characters')
      }
    })

    it('rejects name longer than 100 characters', () => {
      const result = rateRequestSchema.safeParse({
        name: 'a'.repeat(101),
        email: 'john@example.com',
        message: 'Need quote for shipping',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        const nameError = result.error.issues.find((i) => i.path[0] === 'name')
        expect(nameError?.message).toContain('100 characters')
      }
    })

    it('trims whitespace from name', () => {
      const result = rateRequestSchema.safeParse({
        name: '  John Doe  ',
        email: 'john@example.com',
        message: 'Need quote for shipping',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.name).toBe('John Doe')
      }
    })

    it('accepts name with exactly 2 characters', () => {
      const result = rateRequestSchema.safeParse({
        name: 'Jo',
        email: 'john@example.com',
        message: 'Need quote for shipping',
      })
      expect(result.success).toBe(true)
    })

    it('accepts name with exactly 100 characters', () => {
      const result = rateRequestSchema.safeParse({
        name: 'a'.repeat(100),
        email: 'john@example.com',
        message: 'Need quote for shipping',
      })
      expect(result.success).toBe(true)
    })
  })

  describe('email field', () => {
    it('accepts valid email', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Need quote for shipping',
      })
      expect(result.success).toBe(true)
    })

    it('rejects invalid email formats', () => {
      const invalidEmails = [
        'notanemail',
        'missing@',
        '@nodomain.com',
        'spaces in@email.com',
        'multiple@@signs.com',
        'no-tld@domain',
      ]

      invalidEmails.forEach((email) => {
        const result = rateRequestSchema.safeParse({
          name: 'John Doe',
          email,
          message: 'Need quote for shipping',
        })
        expect(result.success).toBe(false)
      })
    })

    it('rejects empty email', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: '',
        message: 'Need quote for shipping',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        const emailError = result.error.issues.find((i) => i.path[0] === 'email')
        expect(emailError?.message).toContain('required')
      }
    })

    it('converts email to lowercase', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'JOHN@EXAMPLE.COM',
        message: 'Need quote for shipping',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.email).toBe('john@example.com')
      }
    })

    it('trims whitespace from email', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: '  john@example.com  ',
        message: 'Need quote for shipping',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.email).toBe('john@example.com')
      }
    })

    it('accepts complex valid email formats', () => {
      const validEmails = [
        'user.name@example.com',
        'user+tag@example.co.uk',
        'user_name@example-domain.com',
        'user123@sub.example.com',
      ]

      validEmails.forEach((email) => {
        const result = rateRequestSchema.safeParse({
          name: 'John Doe',
          email,
          message: 'Need quote for shipping',
        })
        expect(result.success).toBe(true)
      })
    })
  })

  describe('message field', () => {
    it('accepts valid message', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Need quote for shipping',
      })
      expect(result.success).toBe(true)
    })

    it('rejects message shorter than 10 characters', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Short',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        const msgError = result.error.issues.find((i) => i.path[0] === 'message')
        expect(msgError?.message).toContain('at least 10 characters')
      }
    })

    it('rejects message longer than 2000 characters', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'a'.repeat(2001),
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        const msgError = result.error.issues.find((i) => i.path[0] === 'message')
        expect(msgError?.message).toContain('2000 characters')
      }
    })

    it('rejects empty message', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: '',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        const msgError = result.error.issues.find((i) => i.path[0] === 'message')
        expect(msgError?.message).toContain('required')
      }
    })

    it('trims whitespace from message', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: '  Need quote for shipping  ',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.message).toBe('Need quote for shipping')
      }
    })

    it('accepts message with exactly 10 characters', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: '1234567890',
      })
      expect(result.success).toBe(true)
    })

    it('accepts message with exactly 2000 characters', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'a'.repeat(2000),
      })
      expect(result.success).toBe(true)
    })
  })

  describe('phone field (optional)', () => {
    it('accepts valid phone numbers', () => {
      const validPhones = [
        '+1 (555) 123-4567',
        '555-123-4567',
        '5551234567',
        '+44 20 7123 4567',
        '+1-555-123-4567',
        '(555) 123-4567',
      ]

      validPhones.forEach((phone) => {
        const result = rateRequestSchema.safeParse({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Need quote for shipping',
          phone,
        })
        expect(result.success).toBe(true)
      })
    })

    it('accepts empty string for phone (optional field)', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Need quote for shipping',
        phone: '',
      })
      expect(result.success).toBe(true)
    })

    it('accepts undefined phone (optional field)', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Need quote for shipping',
      })
      expect(result.success).toBe(true)
    })

    it('rejects invalid phone format', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Need quote for shipping',
        phone: 'abc',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        const phoneError = result.error.issues.find((i) => i.path[0] === 'phone')
        expect(phoneError?.message).toContain('valid phone')
      }
    })

    it('rejects phone with letters mixed in', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Need quote for shipping',
        phone: '555-ABC-1234',
      })
      expect(result.success).toBe(false)
    })
  })

  describe('company field (optional)', () => {
    it('accepts valid company name', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Need quote for shipping',
        company: 'Acme Corp',
      })
      expect(result.success).toBe(true)
    })

    it('accepts undefined company (optional)', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Need quote for shipping',
      })
      expect(result.success).toBe(true)
    })

    it('accepts empty string for company', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Need quote for shipping',
        company: '',
      })
      expect(result.success).toBe(true)
    })

    it('rejects company name longer than 200 characters', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Need quote for shipping',
        company: 'a'.repeat(201),
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        const companyError = result.error.issues.find((i) => i.path[0] === 'company')
        expect(companyError?.message).toContain('200 characters')
      }
    })

    it('accepts company name with exactly 200 characters', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Need quote for shipping',
        company: 'a'.repeat(200),
      })
      expect(result.success).toBe(true)
    })

    it('trims whitespace from company', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Need quote for shipping',
        company: '  Acme Corp  ',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.company).toBe('Acme Corp')
      }
    })
  })

  describe('serviceType field (optional)', () => {
    it('accepts valid service type', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Need quote for shipping',
        serviceType: 'ocean-freight',
      })
      expect(result.success).toBe(true)
    })

    it('accepts undefined service type (optional)', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Need quote for shipping',
      })
      expect(result.success).toBe(true)
    })

    it('accepts empty string for service type', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Need quote for shipping',
        serviceType: '',
      })
      expect(result.success).toBe(true)
    })
  })

  describe('complete valid data', () => {
    it('accepts complete valid form data with all fields', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-123-4567',
        company: 'Acme Corp',
        message: 'Need quote for LCL shipment from NYC to Shanghai',
        serviceType: 'ocean-freight',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toMatchObject({
          name: 'John Doe',
          email: 'john@example.com',
          phone: '555-123-4567',
          company: 'Acme Corp',
          message: 'Need quote for LCL shipment from NYC to Shanghai',
          serviceType: 'ocean-freight',
        })
      }
    })

    it('transforms data correctly', () => {
      const result = rateRequestSchema.safeParse({
        name: '  John Doe  ',
        email: 'JOHN@EXAMPLE.COM',
        message: '  Need quote for shipping  ',
        company: '  Acme Corp  ',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.name).toBe('John Doe')
        expect(result.data.email).toBe('john@example.com')
        expect(result.data.message).toBe('Need quote for shipping')
        expect(result.data.company).toBe('Acme Corp')
      }
    })

    it('accepts minimal valid data (required fields only)', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Need quote for shipping',
      })
      expect(result.success).toBe(true)
    })
  })
})

describe('contactFormSchema', () => {
  describe('subject field', () => {
    it('accepts valid subject', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Question about services',
        message: 'I have a question about your services',
      })
      expect(result.success).toBe(true)
    })

    it('rejects empty subject', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        subject: '',
        message: 'I have a question about your services',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        const subjectError = result.error.issues.find((i) => i.path[0] === 'subject')
        expect(subjectError?.message).toContain('required')
      }
    })

    it('rejects subject shorter than 3 characters', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Hi',
        message: 'I have a question about your services',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        const subjectError = result.error.issues.find((i) => i.path[0] === 'subject')
        expect(subjectError?.message).toContain('at least 3 characters')
      }
    })

    it('accepts subject with exactly 3 characters', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Hey',
        message: 'I have a question about your services',
      })
      expect(result.success).toBe(true)
    })

    it('trims whitespace from subject', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        subject: '  Question  ',
        message: 'I have a question about your services',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.subject).toBe('Question')
      }
    })
  })

  describe('inherits common fields from rate request', () => {
    it('validates name field correctly', () => {
      const result = contactFormSchema.safeParse({
        name: 'J',
        email: 'john@example.com',
        subject: 'Question',
        message: 'I have a question about your services',
      })
      expect(result.success).toBe(false)
    })

    it('validates email field correctly', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'invalid-email',
        subject: 'Question',
        message: 'I have a question about your services',
      })
      expect(result.success).toBe(false)
    })

    it('validates message field correctly', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Question',
        message: 'Short',
      })
      expect(result.success).toBe(false)
    })

    it('validates optional phone field correctly', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Question',
        message: 'I have a question about your services',
        phone: '+1 555-123-4567',
      })
      expect(result.success).toBe(true)
    })

    it('validates optional company field correctly', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Question',
        message: 'I have a question about your services',
        company: 'Acme Corp',
      })
      expect(result.success).toBe(true)
    })
  })

  describe('complete valid data', () => {
    it('accepts complete valid contact form data', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-123-4567',
        company: 'Acme Corp',
        subject: 'Partnership Inquiry',
        message: 'I am interested in discussing a potential partnership',
      })
      expect(result.success).toBe(true)
    })

    it('accepts minimal valid data (required fields only)', () => {
      const result = contactFormSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Question',
        message: 'I have a question about your services',
      })
      expect(result.success).toBe(true)
    })
  })
})

describe('newsletterSubscriptionSchema', () => {
  describe('email field', () => {
    it('accepts valid email', () => {
      const result = newsletterSubscriptionSchema.safeParse({
        email: 'john@example.com',
      })
      expect(result.success).toBe(true)
    })

    it('rejects invalid email', () => {
      const result = newsletterSubscriptionSchema.safeParse({
        email: 'invalid-email',
      })
      expect(result.success).toBe(false)
    })

    it('rejects empty email', () => {
      const result = newsletterSubscriptionSchema.safeParse({
        email: '',
      })
      expect(result.success).toBe(false)
    })

    it('converts email to lowercase', () => {
      const result = newsletterSubscriptionSchema.safeParse({
        email: 'JOHN@EXAMPLE.COM',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.email).toBe('john@example.com')
      }
    })

    it('trims whitespace from email', () => {
      const result = newsletterSubscriptionSchema.safeParse({
        email: '  john@example.com  ',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.email).toBe('john@example.com')
      }
    })
  })

  describe('name field (optional)', () => {
    it('accepts optional name', () => {
      const result = newsletterSubscriptionSchema.safeParse({
        email: 'john@example.com',
        name: 'John Doe',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.name).toBe('John Doe')
      }
    })

    it('accepts undefined name', () => {
      const result = newsletterSubscriptionSchema.safeParse({
        email: 'john@example.com',
      })
      expect(result.success).toBe(true)
    })

    it('accepts empty string for name', () => {
      const result = newsletterSubscriptionSchema.safeParse({
        email: 'john@example.com',
        name: '',
      })
      expect(result.success).toBe(true)
    })

    it('trims whitespace from name', () => {
      const result = newsletterSubscriptionSchema.safeParse({
        email: 'john@example.com',
        name: '  John Doe  ',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.name).toBe('John Doe')
      }
    })
  })
})

describe('newsletterUnsubscriptionSchema', () => {
  describe('email field', () => {
    it('accepts valid email', () => {
      const result = newsletterUnsubscriptionSchema.safeParse({
        email: 'john@example.com',
      })
      expect(result.success).toBe(true)
    })

    it('rejects invalid email', () => {
      const result = newsletterUnsubscriptionSchema.safeParse({
        email: 'invalid',
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        const emailError = result.error.issues.find((i) => i.path[0] === 'email')
        expect(emailError?.message).toContain('valid email')
      }
    })

    it('rejects empty email', () => {
      const result = newsletterUnsubscriptionSchema.safeParse({
        email: '',
      })
      expect(result.success).toBe(false)
    })

    it('converts email to lowercase', () => {
      const result = newsletterUnsubscriptionSchema.safeParse({
        email: 'JOHN@EXAMPLE.COM',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.email).toBe('john@example.com')
      }
    })

    it('trims whitespace from email', () => {
      const result = newsletterUnsubscriptionSchema.safeParse({
        email: '  john@example.com  ',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.email).toBe('john@example.com')
      }
    })
  })
})

describe('Edge Cases and Error Handling', () => {
  describe('null values', () => {
    it('rejects null name', () => {
      const result = rateRequestSchema.safeParse({
        name: null,
        email: 'john@example.com',
        message: 'Need quote for shipping',
      })
      expect(result.success).toBe(false)
    })

    it('rejects null email', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: null,
        message: 'Need quote for shipping',
      })
      expect(result.success).toBe(false)
    })

    it('rejects null message', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: null,
      })
      expect(result.success).toBe(false)
    })
  })

  describe('undefined values', () => {
    it('rejects missing required fields', () => {
      const result = rateRequestSchema.safeParse({})
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThanOrEqual(3)
      }
    })
  })

  describe('mixed case transformations', () => {
    it('handles mixed case email correctly', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John',
        email: 'JoHn@ExAmPlE.com',
        message: 'Test message here',
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.email).toBe('john@example.com')
      }
    })
  })

  describe('special characters', () => {
    it('accepts special characters in name', () => {
      const result = rateRequestSchema.safeParse({
        name: "O'Brien-Smith",
        email: 'john@example.com',
        message: 'Test message here',
      })
      expect(result.success).toBe(true)
    })

    it('accepts special characters in message', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Need quote! Can you help? Price: $500-$1000 (20% discount)',
      })
      expect(result.success).toBe(true)
    })

    it('accepts HTML-like content without validation (sanitization happens elsewhere)', () => {
      const result = rateRequestSchema.safeParse({
        name: '<script>alert("xss")</script>',
        email: 'john@example.com',
        message: '<b>Bold text</b> and other HTML',
      })
      expect(result.success).toBe(true)
    })
  })

  describe('unicode and international characters', () => {
    it('accepts unicode characters in name', () => {
      const result = rateRequestSchema.safeParse({
        name: 'José García',
        email: 'jose@example.com',
        message: 'Necesito una cotización',
      })
      expect(result.success).toBe(true)
    })

    it('accepts unicode in message', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'I need a quote for shipping 货物 from China to USA',
      })
      expect(result.success).toBe(true)
    })

    it('accepts emoji in message', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Great service! 👍 Looking forward to working with you 🚢',
      })
      expect(result.success).toBe(true)
    })
  })

  describe('whitespace handling', () => {
    it('rejects name that becomes empty after trimming', () => {
      const result = rateRequestSchema.safeParse({
        name: '   ',
        email: 'john@example.com',
        message: 'Need quote for shipping',
      })
      expect(result.success).toBe(false)
    })

    it('rejects message that becomes too short after trimming', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: '   Short   ',
      })
      expect(result.success).toBe(false)
    })
  })
})

describe('TypeScript Type Exports', () => {
  it('exports RateRequestFormData type', () => {
    const data: RateRequestFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Need quote for shipping',
    }
    expect(data).toBeDefined()
  })

  it('exports ContactFormData type', () => {
    const data: ContactFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Question',
      message: 'I have a question',
    }
    expect(data).toBeDefined()
  })

  it('exports NewsletterSubscriptionData type', () => {
    const data: NewsletterSubscriptionData = {
      email: 'john@example.com',
    }
    expect(data).toBeDefined()
  })

  it('exports NewsletterUnsubscriptionData type', () => {
    const data: NewsletterUnsubscriptionData = {
      email: 'john@example.com',
    }
    expect(data).toBeDefined()
  })
})
