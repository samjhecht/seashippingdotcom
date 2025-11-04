import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '@/components/forms/ContactForm'

describe('ContactForm', () => {
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
      render(<ContactForm />)

      expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/subject/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    })

    it('renders optional fields', () => {
      render(<ContactForm />)

      expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/company/i)).toBeInTheDocument()
    })

    it('renders submit button', () => {
      render(<ContactForm />)

      expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
    })

    it('has form role and aria-label', () => {
      render(<ContactForm />)

      const form = screen.getByRole('form')
      expect(form).toHaveAttribute('aria-label', 'Contact Form')
    })
  })

  describe('Validation', () => {
    it('shows validation error for empty required fields on submit', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)

      const submitButton = screen.getByRole('button', { name: /submit/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/name is required/i)).toBeInTheDocument()
      })
      expect(screen.getByText(/email is required/i)).toBeInTheDocument()
      expect(screen.getByText(/subject is required/i)).toBeInTheDocument()
      expect(screen.getByText(/message is required/i)).toBeInTheDocument()
    })

    it('shows validation error for invalid email', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)

      const emailInput = screen.getByLabelText(/email/i)
      await user.type(emailInput, 'invalid-email')
      await user.tab()

      await waitFor(() => {
        expect(screen.getByText(/valid email/i)).toBeInTheDocument()
      })
    })

    it('shows validation error for short subject', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)

      const subjectInput = screen.getByLabelText(/subject/i)
      await user.type(subjectInput, 'Hi')
      await user.tab()

      await waitFor(() => {
        expect(screen.getByText(/at least 3 characters/i)).toBeInTheDocument()
      })
    })

    it('shows validation error for short message', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)

      const messageInput = screen.getByLabelText(/message/i)
      await user.type(messageInput, 'Short')
      await user.tab()

      await waitFor(() => {
        expect(screen.getByText(/at least 10 characters/i)).toBeInTheDocument()
      })
    })
  })

  describe('Form Submission', () => {
    it('submits form with valid data', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)

      await user.type(screen.getByLabelText(/name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/subject/i), 'General Inquiry')
      await user.type(screen.getByLabelText(/message/i), 'I have a question about your services')

      const submitButton = screen.getByRole('button', { name: /submit/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          '/api/contact',
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

      render(<ContactForm />)

      await user.type(screen.getByLabelText(/name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/subject/i), 'General Inquiry')
      await user.type(screen.getByLabelText(/message/i), 'I have a question')

      const submitButton = screen.getByRole('button', { name: /submit/i })
      await user.click(submitButton)

      expect(submitButton).toBeDisabled()
      expect(screen.getByText(/submitting/i)).toBeInTheDocument()
    })

    it('displays success message on successful submission', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)

      await user.type(screen.getByLabelText(/name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/subject/i), 'General Inquiry')
      await user.type(screen.getByLabelText(/message/i), 'I have a question')

      await user.click(screen.getByRole('button', { name: /submit/i }))

      await waitFor(() => {
        expect(screen.getByText(/thank you/i)).toBeInTheDocument()
      })
    })

    it('calls onSuccess callback on successful submission', async () => {
      const user = userEvent.setup()
      const mockOnSuccess = vi.fn()
      render(<ContactForm onSuccess={mockOnSuccess} />)

      await user.type(screen.getByLabelText(/name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/subject/i), 'General Inquiry')
      await user.type(screen.getByLabelText(/message/i), 'I have a question')

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

      render(<ContactForm />)

      await user.type(screen.getByLabelText(/name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/subject/i), 'General Inquiry')
      await user.type(screen.getByLabelText(/message/i), 'I have a question about your services')

      await user.click(screen.getByRole('button', { name: /submit/i }))

      await waitFor(() => {
        expect(screen.getByText(/failed/i)).toBeInTheDocument()
      })
    })

    it('resets form after successful submission', async () => {
      const user = userEvent.setup()
      render(<ContactForm />)

      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
      const subjectInput = screen.getByLabelText(/subject/i) as HTMLInputElement

      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(subjectInput, 'General Inquiry')
      await user.type(screen.getByLabelText(/message/i), 'I have a question')

      await user.click(screen.getByRole('button', { name: /submit/i }))

      await waitFor(() => {
        expect(nameInput.value).toBe('')
        expect(emailInput.value).toBe('')
        expect(subjectInput.value).toBe('')
      })
    })
  })

  describe('Layout', () => {
    it('uses single-column layout (grid-cols-1)', () => {
      render(<ContactForm />)

      const form = screen.getByRole('form')
      const fieldContainer = form.querySelector('.grid')

      expect(fieldContainer).toHaveClass('grid-cols-1')
    })

    it('has proper spacing between form elements', () => {
      render(<ContactForm />)

      const form = screen.getByRole('form')
      expect(form).toHaveClass('space-y-6')
    })
  })
})
