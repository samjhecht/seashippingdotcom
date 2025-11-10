---
id: 010
title: Create Form Validation Schemas with Zod (TDD - 100% Coverage)
phase: 4
priority: critical
status: todo
dependencies: [001]
estimated_hours: 4
tags: [forms, validation, zod, tdd, critical]
---

# Create Form Validation Schemas with Zod (TDD - 100% Coverage)

## Objective
Build comprehensive validation schemas for all forms using Zod, with 100% test coverage as this is business-critical code.

## Requirements

### Form Types to Validate
1. Rate Request Form
2. Customer Service Request Form
3. Sales Contact Form
4. Newsletter Subscription Form
5. Newsletter Unsubscription Form

### Validation Rules
- Email: Valid email format, required
- Name: Min 2 chars, max 100 chars, required
- Phone: Optional, valid phone format if provided
- Message: Min 10 chars, max 2000 chars, required
- Company: Optional, max 200 chars
- Subject: Required for certain forms
- Service type: Optional dropdown selection

## Implementation Steps (TDD Approach)

### 1. Write Tests FIRST (100% Coverage Required)

```typescript
// __tests__/unit/lib/validations.test.ts
import { describe, it, expect } from 'vitest'
import {
  rateRequestSchema,
  contactFormSchema,
  newsletterSubscriptionSchema,
  newsletterUnsubscriptionSchema,
} from '@/lib/validations'

describe('rateRequestSchema', () => {
  describe('name field', () => {
    it('accepts valid name', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Need quote for LCL from NYC to Shanghai',
      });
      expect(result.success).toBe(true);
    });

    it('rejects empty name', () => {
      const result = rateRequestSchema.safeParse({
        name: '',
        email: 'john@example.com',
        message: 'Need quote',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Name is required');
      }
    });

    it('rejects name shorter than 2 characters', () => {
      const result = rateRequestSchema.safeParse({
        name: 'J',
        email: 'john@example.com',
        message: 'Need quote',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('at least 2 characters');
      }
    });

    it('rejects name longer than 100 characters', () => {
      const result = rateRequestSchema.safeParse({
        name: 'a'.repeat(101),
        email: 'john@example.com',
        message: 'Need quote',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('100 characters');
      }
    });

    it('trims whitespace from name', () => {
      const result = rateRequestSchema.safeParse({
        name: '  John Doe  ',
        email: 'john@example.com',
        message: 'Need quote',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('John Doe');
      }
    });
  });

  describe('email field', () => {
    it('accepts valid email', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Need quote',
      });
      expect(result.success).toBe(true);
    });

    it('rejects invalid email format', () => {
      const invalidEmails = [
        'notanemail',
        'missing@domain',
        '@nodomain.com',
        'spaces in@email.com',
        'multiple@@signs.com',
      ];

      invalidEmails.forEach(email => {
        const result = rateRequestSchema.safeParse({
          name: 'John Doe',
          email,
          message: 'Need quote',
        });
        expect(result.success).toBe(false);
      });
    });

    it('rejects empty email', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: '',
        message: 'Need quote',
      });
      expect(result.success).toBe(false);
    });

    it('converts email to lowercase', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'JOHN@EXAMPLE.COM',
        message: 'Need quote',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe('john@example.com');
      }
    });
  });

  describe('message field', () => {
    it('accepts valid message', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Need quote for shipping',
      });
      expect(result.success).toBe(true);
    });

    it('rejects message shorter than 10 characters', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Short',
      });
      expect(result.success).toBe(false);
    });

    it('rejects message longer than 2000 characters', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'a'.repeat(2001),
      });
      expect(result.success).toBe(false);
    });

    it('rejects empty message', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: '',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('phone field (optional)', () => {
    it('accepts valid phone number', () => {
      const validPhones = [
        '+1 (555) 123-4567',
        '555-123-4567',
        '5551234567',
        '+44 20 7123 4567',
      ];

      validPhones.forEach(phone => {
        const result = rateRequestSchema.safeParse({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Need quote',
          phone,
        });
        expect(result.success).toBe(true);
      });
    });

    it('accepts empty phone (optional field)', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Need quote',
        phone: '',
      });
      expect(result.success).toBe(true);
    });

    it('rejects invalid phone format', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Need quote',
        phone: 'abc',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('company field (optional)', () => {
    it('accepts valid company name', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Need quote',
        company: 'Acme Corp',
      });
      expect(result.success).toBe(true);
    });

    it('accepts empty company (optional)', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Need quote',
      });
      expect(result.success).toBe(true);
    });

    it('rejects company name longer than 200 characters', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Need quote',
        company: 'a'.repeat(201),
      });
      expect(result.success).toBe(false);
    });
  });

  describe('complete valid data', () => {
    it('accepts complete valid form data', () => {
      const result = rateRequestSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '555-123-4567',
        company: 'Acme Corp',
        message: 'Need quote for LCL shipment from NYC to Shanghai',
        serviceType: 'ocean-freight',
      });
      expect(result.success).toBe(true);
    });

    it('transforms data correctly', () => {
      const result = rateRequestSchema.safeParse({
        name: '  John Doe  ',
        email: 'JOHN@EXAMPLE.COM',
        message: 'Need quote',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('John Doe');
        expect(result.data.email).toBe('john@example.com');
      }
    });
  });
});

describe('newsletterSubscriptionSchema', () => {
  it('accepts valid email', () => {
    const result = newsletterSubscriptionSchema.safeParse({
      email: 'john@example.com',
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = newsletterSubscriptionSchema.safeParse({
      email: 'invalid-email',
    });
    expect(result.success).toBe(false);
  });

  it('accepts optional name', () => {
    const result = newsletterSubscriptionSchema.safeParse({
      email: 'john@example.com',
      name: 'John Doe',
    });
    expect(result.success).toBe(true);
  });
});

describe('newsletterUnsubscriptionSchema', () => {
  it('accepts valid email', () => {
    const result = newsletterUnsubscriptionSchema.safeParse({
      email: 'john@example.com',
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = newsletterUnsubscriptionSchema.safeParse({
      email: 'invalid',
    });
    expect(result.success).toBe(false);
  });
});

// Additional edge case tests
describe('Edge Cases', () => {
  it('handles null values', () => {
    const result = rateRequestSchema.safeParse({
      name: null,
      email: null,
      message: null,
    });
    expect(result.success).toBe(false);
  });

  it('handles undefined values', () => {
    const result = rateRequestSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it('handles mixed case email', () => {
    const result = rateRequestSchema.safeParse({
      name: 'John',
      email: 'JoHn@ExAmPlE.com',
      message: 'Test message here',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe('john@example.com');
    }
  });

  it('sanitizes input strings', () => {
    const result = rateRequestSchema.safeParse({
      name: '<script>alert("xss")</script>',
      email: 'john@example.com',
      message: 'Test message',
    });
    // Should accept but later sanitize in API route
    expect(result.success).toBe(true);
  });
});
```

### 2. Run Tests (Fail)
- Verify all tests fail (no implementation yet)
- Confirm 0% coverage

### 3. Implement Validation Schemas

```typescript
// src/lib/validations.ts
import { z } from 'zod'

// Common field validators
const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .toLowerCase()
  .trim()

const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must not exceed 100 characters')
  .trim()

const phoneSchema = z
  .string()
  .regex(/^[+]?[\d\s()-]+$/, 'Please enter a valid phone number')
  .optional()
  .or(z.literal(''))

const messageSchema = z
  .string()
  .min(10, 'Message must be at least 10 characters')
  .max(2000, 'Message must not exceed 2000 characters')
  .trim()

const companySchema = z
  .string()
  .max(200, 'Company name must not exceed 200 characters')
  .optional()

// Rate Request Form Schema
export const rateRequestSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  company: companySchema,
  message: messageSchema,
  serviceType: z.string().optional(),
})

export type RateRequestFormData = z.infer<typeof rateRequestSchema>

// Contact Form Schema
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  company: companySchema,
  subject: z.string().min(3, 'Subject is required'),
  message: messageSchema,
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Newsletter Subscription Schema
export const newsletterSubscriptionSchema = z.object({
  email: emailSchema,
  name: z.string().optional(),
})

export type NewsletterSubscriptionData = z.infer<typeof newsletterSubscriptionSchema>

// Newsletter Unsubscription Schema
export const newsletterUnsubscriptionSchema = z.object({
  email: emailSchema,
})

export type NewsletterUnsubscriptionData = z.infer<typeof newsletterUnsubscriptionSchema>
```

### 4. Run Tests (Pass)
- Verify 100% test coverage
- All tests should pass
- Check coverage report

### 5. Refactor If Needed
- Extract common patterns
- Improve error messages
- Ensure tests still pass at 100%

## Testing Requirements
- **CRITICAL: 100% test coverage required**
- Every validation rule tested
- Every error message tested
- Every edge case tested
- All transformations tested (trim, toLowerCase)
- Optional fields tested (both present and absent)
- Invalid data tested
- Boundary conditions tested

## Acceptance Criteria
- ✅ Tests written first (TDD)
- ✅ **100% test coverage achieved**
- ✅ All validation schemas implemented
- ✅ All schemas export TypeScript types
- ✅ Error messages are user-friendly
- ✅ Email validation works correctly
- ✅ Phone validation works correctly
- ✅ Optional fields work correctly
- ✅ Data transformations work (trim, toLowerCase)
- ✅ All edge cases handled
- ✅ Coverage report confirms 100%
- ✅ All tests passing

## Notes
- This is business-critical code - 100% coverage is mandatory
- Error messages should be user-friendly and actionable
- Consider internationalization for error messages
- Phone validation should accept international formats
- All string inputs should be trimmed
- Email should be lowercased
- Future: Add rate limiting validation
- Future: Add honeypot field for spam prevention
