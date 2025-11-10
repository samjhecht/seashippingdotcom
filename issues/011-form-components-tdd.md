---
id: 011
title: Build Form Components with React Hook Form (TDD)
phase: 4
priority: critical
status: todo
dependencies: [010]
estimated_hours: 8
tags: [forms, react-hook-form, components, tdd, mobile-first]
---

# Build Form Components with React Hook Form (TDD)

## Objective
Create reusable form components using React Hook Form integrated with Zod validation schemas, following TDD and mobile-first principles.

## Requirements
- Rate Request Form
- Contact Form
- Newsletter Subscription Form
- Shared form field components
- Mobile-optimized layouts (single column)
- Inline validation with clear error messages
- Loading states during submission
- Success/error feedback
- Touch-friendly inputs (44x44px minimum)

## Implementation Steps (TDD Approach)

### 1. Write Tests for Form Field Components

```typescript
// __tests__/unit/components/forms/FormInput.test.tsx
describe('FormInput', () => {
  it('renders label and input', () => {
    render(
      <FormInput
        label="Name"
        type="text"
        {...register('name')}
      />
    );
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    const error = { message: 'Name is required' };
    render(<FormInput label="Name" error={error} {...register('name')} />);
    expect(screen.getByText('Name is required')).toBeInTheDocument();
  });

  it('marks input as required', () => {
    render(<FormInput label="Name" required {...register('name')} />);
    const input = screen.getByLabelText('Name');
    expect(input).toHaveAttribute('required');
  });

  it('input meets touch target size on mobile', () => {
    render(<FormInput label="Name" {...register('name')} />);
    const input = screen.getByLabelText('Name');
    const styles = window.getComputedStyle(input);
    const height = parseInt(styles.height);
    expect(height).toBeGreaterThanOrEqual(44);
  });

  it('has correct ARIA attributes', () => {
    const error = { message: 'Invalid input' };
    render(<FormInput label="Name" error={error} {...register('name')} />);
    const input = screen.getByLabelText('Name');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });
});
```

### 2. Write Tests for Rate Request Form

```typescript
// __tests__/unit/components/forms/RateRequestForm.test.tsx
describe('RateRequestForm', () => {
  it('renders all required fields', () => {
    render(<RateRequestForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('renders optional fields', () => {
    render(<RateRequestForm />);
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
  });

  it('shows validation error for invalid email', async () => {
    render(<RateRequestForm />);
    const emailInput = screen.getByLabelText(/email/i);

    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.tab(); // Trigger blur validation

    expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
  });

  it('shows validation error for short message', async () => {
    render(<RateRequestForm />);
    const messageInput = screen.getByLabelText(/message/i);

    await userEvent.type(messageInput, 'Short');
    await userEvent.tab();

    expect(await screen.findByText(/at least 10 characters/i)).toBeInTheDocument();
  });

  it('disables submit button while submitting', async () => {
    render(<RateRequestForm />);

    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/message/i), 'Need quote for shipping');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
  });

  it('displays success message on successful submission', async () => {
    const mockOnSuccess = vi.fn();
    render(<RateRequestForm onSuccess={mockOnSuccess} />);

    // Fill form
    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/message/i), 'Need quote for shipping');

    // Submit
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Wait for success
    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('displays error message on submission failure', async () => {
    // Mock failed API call
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Submission failed' }),
      })
    );

    render(<RateRequestForm />);

    // Fill and submit form
    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/message/i), 'Need quote');
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Check for error
    expect(await screen.findByText(/failed/i)).toBeInTheDocument();
  });

  it('resets form after successful submission', async () => {
    render(<RateRequestForm />);

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/message/i), 'Need quote');

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(nameInput.value).toBe('');
    });
  });

  it('uses single-column layout on mobile', () => {
    render(<RateRequestForm />);
    const form = screen.getByRole('form');
    // Test form has flex-col or grid-cols-1
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<RateRequestForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### 3. Implement Form Field Components

```typescript
// src/components/forms/FormInput.tsx
import { forwardRef } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { InputHTMLAttributes } from 'react'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: { message?: string }
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-')
    const errorId = `${inputId}-error`

    return (
      <div className="space-y-2">
        <Label htmlFor={inputId}>
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <Input
          id={inputId}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
          className="h-12" // 48px = mobile touch target
          {...props}
        />
        {error && (
          <p id={errorId} className="text-sm text-red-600" role="alert">
            {error.message}
          </p>
        )}
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'
```

```typescript
// src/components/forms/FormTextarea.tsx
import { forwardRef } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import type { TextareaHTMLAttributes } from 'react'

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: { message?: string }
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, id, ...props }, ref) => {
    const textareaId = id || label.toLowerCase().replace(/\s+/g, '-')
    const errorId = `${textareaId}-error`

    return (
      <div className="space-y-2">
        <Label htmlFor={textareaId}>
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <Textarea
          id={textareaId}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
          rows={5}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-sm text-red-600" role="alert">
            {error.message}
          </p>
        )}
      </div>
    )
  }
)

FormTextarea.displayName = 'FormTextarea'
```

### 4. Implement Rate Request Form

```typescript
// src/components/forms/RateRequestForm.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { rateRequestSchema, type RateRequestFormData } from '@/lib/validations'
import { FormInput } from './FormInput'
import { FormTextarea } from './FormTextarea'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface RateRequestFormProps {
  onSuccess?: () => void
}

export function RateRequestForm({ onSuccess }: RateRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RateRequestFormData>({
    resolver: zodResolver(rateRequestSchema),
  })

  const onSubmit = async (data: RateRequestFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/rate-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      setSubmitStatus('success')
      reset()
      onSuccess?.()
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('Failed to submit request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      role="form"
      aria-label="Rate Request Form"
    >
      <div className="grid grid-cols-1 gap-6">
        <FormInput
          label="Name"
          type="text"
          required
          error={errors.name}
          {...register('name')}
        />

        <FormInput
          label="Email"
          type="email"
          required
          error={errors.email}
          {...register('email')}
        />

        <FormInput
          label="Phone"
          type="tel"
          error={errors.phone}
          {...register('phone')}
        />

        <FormInput
          label="Company"
          type="text"
          error={errors.company}
          {...register('company')}
        />

        <FormTextarea
          label="Message"
          required
          placeholder="Please provide details about your shipping needs..."
          error={errors.message}
          {...register('message')}
        />
      </div>

      {submitStatus === 'success' && (
        <div
          className="p-4 bg-green-50 border border-green-200 rounded-md text-green-800"
          role="alert"
        >
          Thank you! Your rate request has been received. We'll get back to you soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div
          className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full md:w-auto h-12 px-8"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Request'
        )}
      </Button>
    </form>
  )
}
```

### 5. E2E Tests

```typescript
// __tests__/e2e/journeys/rate-request.spec.ts
test('user can submit rate request form', async ({ page }) => {
  // Mobile-first test
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/request');

  // Fill form
  await page.fill('[name="name"]', 'John Doe');
  await page.fill('[name="email"]', 'john@example.com');
  await page.fill('[name="phone"]', '555-123-4567');
  await page.fill('[name="company"]', 'Acme Corp');
  await page.fill('[name="message"]', 'Need LCL rate from NYC to Shanghai for 10 pallets');

  // Submit
  await page.click('button[type="submit"]');

  // Verify success
  await expect(page.locator('text=received')).toBeVisible({ timeout: 10000 });

  // Verify form reset
  const nameInput = page.locator('[name="name"]');
  await expect(nameInput).toHaveValue('');
});

test('form shows validation errors on invalid input', async ({ page }) => {
  await page.goto('/request');

  // Submit empty form
  await page.click('button[type="submit"]');

  // Check for validation errors
  await expect(page.locator('text=Name is required')).toBeVisible();
  await expect(page.locator('text=Email is required')).toBeVisible();
  await expect(page.locator('text=Message')).toBeVisible();
});
```

## Testing Requirements
- 90%+ unit test coverage for form components
- All validation scenarios tested
- Loading states tested
- Success/error states tested
- Mobile touch targets verified
- Accessibility verified (zero violations)
- E2E happy path tested
- E2E error scenarios tested

## Acceptance Criteria
- ✅ Tests written first (TDD)
- ✅ All unit tests passing (90%+ coverage)
- ✅ Form field components implemented
- ✅ Rate Request Form working
- ✅ React Hook Form integrated with Zod
- ✅ Inline validation working
- ✅ Loading states implemented
- ✅ Success/error feedback working
- ✅ Form resets after submission
- ✅ Mobile single-column layout
- ✅ Touch targets 44x44px minimum
- ✅ Zero accessibility violations
- ✅ E2E tests passing
- ✅ Forms work on mobile devices

## Notes
- Use React Hook Form for performance
- Integrate Zod via @hookform/resolvers/zod
- Show validation on blur, not on change (better UX)
- Disable submit during submission
- Clear, actionable error messages
- Success message should be prominent
- Consider adding reCAPTCHA in next issue
