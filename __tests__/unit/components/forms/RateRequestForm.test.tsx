import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RateRequestForm } from '@/components/forms/RateRequestForm'

describe('RateRequestForm', () => {
  let mockFetch: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      } as Response)
    )
    global.fetch = mockFetch
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Rendering', () => {
    it('renders all required fields', () => {
      render(<RateRequestForm />)

      expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    })

    it('renders optional fields', () => {
      render(<RateRequestForm />)

      expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/company/i)).toBeInTheDocument()
    })

    it('renders submit button', () => {
      render(<RateRequestForm />)

      expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
    })

    it('has form role and aria-label', () => {
      render(<RateRequestForm />)

      const form = screen.getByRole('form')
      expect(form).toHaveAttribute('aria-label', 'Rate Request Form')
    })
  })

  describe('Validation', () => {
    it('shows validation error for empty required fields on submit', async () => {
      const user = userEvent.setup()
      render(<RateRequestForm />)

      const submitButton = screen.getByRole('button', { name: /submit/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/name is required/i)).toBeInTheDocument()
      })
      expect(screen.getByText(/email is required/i)).toBeInTheDocument()
      expect(screen.getByText(/message is required/i)).toBeInTheDocument()
    })

    it('shows validation error for invalid email', async () => {
      const user = userEvent.setup()
      render(<RateRequestForm />)

      const emailInput = screen.getByLabelText(/email/i)
      await user.type(emailInput, 'invalid-email')
      await user.tab()

      await waitFor(() => {
        expect(screen.getByText(/valid email/i)).toBeInTheDocument()
      })
    })

    it('shows validation error for short name', async () => {
      const user = userEvent.setup()
      render(<RateRequestForm />)

      const nameInput = screen.getByLabelText(/name/i)
      await user.type(nameInput, 'A')
      await user.tab()

      await waitFor(() => {
        expect(screen.getByText(/at least 2 characters/i)).toBeInTheDocument()
      })
    })

    it('shows validation error for short message', async () => {
      const user = userEvent.setup()
      render(<RateRequestForm />)

      const messageInput = screen.getByLabelText(/message/i)
      await user.type(messageInput, 'Short')
      await user.tab()

      await waitFor(() => {
        expect(screen.getByText(/at least 10 characters/i)).toBeInTheDocument()
      })
    })

    it('shows validation error for invalid phone number', async () => {
      const user = userEvent.setup()
      render(<RateRequestForm />)

      const phoneInput = screen.getByLabelText(/phone/i)
      await user.type(phoneInput, 'abc123')
      await user.tab()

      await waitFor(() => {
        expect(screen.getByText(/valid phone number/i)).toBeInTheDocument()
      })
    })
  })

  describe('Form Submission', () => {
    it('submits form with valid data', async () => {
      const user = userEvent.setup()
      render(<RateRequestForm />)

      await user.type(screen.getByLabelText(/name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/phone/i), '555-123-4567')
      await user.type(screen.getByLabelText(/company/i), 'Acme Corp')
      await user.type(screen.getByLabelText(/message/i), 'Need quote for shipping from NYC to Shanghai')

      const submitButton = screen.getByRole('button', { name: /submit/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          '/api/rate-request',
          expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: expect.stringContaining('john@example.com'),
          })
        )
      })
    })

    it('disables submit button while submitting', async () => {
      const user = userEvent.setup()
      mockFetch.mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({ ok: true } as Response), 100))
      )

      render(<RateRequestForm />)

      await user.type(screen.getByLabelText(/name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/message/i), 'Need quote for shipping')

      const submitButton = screen.getByRole('button', { name: /submit/i })
      await user.click(submitButton)

      expect(submitButton).toBeDisabled()
      expect(screen.getByText(/submitting/i)).toBeInTheDocument()
    })

    it('shows loading spinner while submitting', async () => {
      const user = userEvent.setup()
      mockFetch.mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({ ok: true } as Response), 100))
      )

      render(<RateRequestForm />)

      await user.type(screen.getByLabelText(/name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/message/i), 'Need quote for shipping')

      await user.click(screen.getByRole('button', { name: /submit/i }))

      expect(screen.getByText(/submitting/i)).toBeInTheDocument()
    })

    it('displays success message on successful submission', async () => {
      const user = userEvent.setup()
      render(<RateRequestForm />)

      await user.type(screen.getByLabelText(/name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/message/i), 'Need quote for shipping')

      await user.click(screen.getByRole('button', { name: /submit/i }))

      await waitFor(() => {
        expect(screen.getByText(/thank you/i)).toBeInTheDocument()
      })
    })

    it('calls onSuccess callback on successful submission', async () => {
      const user = userEvent.setup()
      const mockOnSuccess = vi.fn()
      render(<RateRequestForm onSuccess={mockOnSuccess} />)

      await user.type(screen.getByLabelText(/name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/message/i), 'Need quote for shipping')

      await user.click(screen.getByRole('button', { name: /submit/i }))

      await waitFor(() => {
        expect(mockOnSuccess).toHaveBeenCalled()
      })
    })

    it('displays error message on submission failure', async () => {
      const user = userEvent.setup()
      mockFetch.mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ error: 'Submission failed' }),
      } as Response)

      render(<RateRequestForm />)

      await user.type(screen.getByLabelText(/name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/message/i), 'Need quote')

      await user.click(screen.getByRole('button', { name: /submit/i }))

      await waitFor(() => {
        expect(screen.getByText(/failed/i)).toBeInTheDocument()
      })
    })

    it('resets form after successful submission', async () => {
      const user = userEvent.setup()
      render(<RateRequestForm />)

      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
      const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement

      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(messageInput, 'Need quote for shipping')

      await user.click(screen.getByRole('button', { name: /submit/i }))

      await waitFor(() => {
        expect(nameInput.value).toBe('')
        expect(emailInput.value).toBe('')
        expect(messageInput.value).toBe('')
      })
    })
  })

  describe('Layout', () => {
    it('uses single-column layout (grid-cols-1)', () => {
      render(<RateRequestForm />)

      const form = screen.getByRole('form')
      const fieldContainer = form.querySelector('.grid')

      expect(fieldContainer).toHaveClass('grid-cols-1')
    })

    it('has proper spacing between form elements', () => {
      render(<RateRequestForm />)

      const form = screen.getByRole('form')
      expect(form).toHaveClass('space-y-6')
    })
  })
})
