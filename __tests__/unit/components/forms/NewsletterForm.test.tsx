import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewsletterForm } from '@/components/forms/NewsletterForm'

describe('NewsletterForm', () => {
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
    it('renders email field', () => {
      render(<NewsletterForm />)

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    })

    it('renders optional name field', () => {
      render(<NewsletterForm />)

      expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    })

    it('renders subscribe button', () => {
      render(<NewsletterForm />)

      expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument()
    })

    it('has form role and aria-label', () => {
      render(<NewsletterForm />)

      const form = screen.getByRole('form')
      expect(form).toHaveAttribute('aria-label', 'Newsletter Subscription Form')
    })
  })

  describe('Validation', () => {
    it('shows validation error for empty email on submit', async () => {
      const user = userEvent.setup()
      render(<NewsletterForm />)

      const subscribeButton = screen.getByRole('button', { name: /subscribe/i })
      await user.click(subscribeButton)

      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument()
      })
    })

    it('shows validation error for invalid email', async () => {
      const user = userEvent.setup()
      render(<NewsletterForm />)

      const emailInput = screen.getByLabelText(/email/i)
      await user.type(emailInput, 'invalid-email')
      await user.tab()

      await waitFor(() => {
        expect(screen.getByText(/valid email/i)).toBeInTheDocument()
      })
    })

    it('allows submission without name (optional field)', async () => {
      const user = userEvent.setup()
      render(<NewsletterForm />)

      await user.type(screen.getByLabelText(/email/i), 'john@example.com')

      const subscribeButton = screen.getByRole('button', { name: /subscribe/i })
      await user.click(subscribeButton)

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled()
      })
    })
  })

  describe('Form Submission', () => {
    it('submits form with email only', async () => {
      const user = userEvent.setup()
      render(<NewsletterForm />)

      await user.type(screen.getByLabelText(/email/i), 'john@example.com')

      const subscribeButton = screen.getByRole('button', { name: /subscribe/i })
      await user.click(subscribeButton)

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          '/api/newsletter/subscribe',
          expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: expect.stringContaining('john@example.com'),
          })
        )
      })
    })

    it('submits form with email and name', async () => {
      const user = userEvent.setup()
      render(<NewsletterForm />)

      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/name/i), 'John Doe')

      await user.click(screen.getByRole('button', { name: /subscribe/i }))

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          '/api/newsletter/subscribe',
          expect.objectContaining({
            method: 'POST',
            body: expect.stringContaining('John Doe'),
          })
        )
      })
    })

    it('disables submit button while submitting', async () => {
      const user = userEvent.setup()
      mockFetch.mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({ ok: true } as Response), 100))
      )

      render(<NewsletterForm />)

      await user.type(screen.getByLabelText(/email/i), 'john@example.com')

      const subscribeButton = screen.getByRole('button', { name: /subscribe/i })
      await user.click(subscribeButton)

      expect(subscribeButton).toBeDisabled()
      expect(screen.getByText(/subscribing/i)).toBeInTheDocument()
    })

    it('displays success message on successful subscription', async () => {
      const user = userEvent.setup()
      render(<NewsletterForm />)

      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.click(screen.getByRole('button', { name: /subscribe/i }))

      await waitFor(() => {
        expect(screen.getByText(/subscribed/i)).toBeInTheDocument()
      })
    })

    it('calls onSuccess callback on successful subscription', async () => {
      const user = userEvent.setup()
      const mockOnSuccess = vi.fn()
      render(<NewsletterForm onSuccess={mockOnSuccess} />)

      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.click(screen.getByRole('button', { name: /subscribe/i }))

      await waitFor(() => {
        expect(mockOnSuccess).toHaveBeenCalled()
      })
    })

    it('displays error message on subscription failure', async () => {
      const user = userEvent.setup()
      mockFetch.mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ error: 'Subscription failed' }),
      } as Response)

      render(<NewsletterForm />)

      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.click(screen.getByRole('button', { name: /subscribe/i }))

      await waitFor(() => {
        expect(screen.getByText(/failed/i)).toBeInTheDocument()
      })
    })

    it('resets form after successful subscription', async () => {
      const user = userEvent.setup()
      render(<NewsletterForm />)

      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement

      await user.type(emailInput, 'john@example.com')
      await user.type(nameInput, 'John Doe')

      await user.click(screen.getByRole('button', { name: /subscribe/i }))

      await waitFor(() => {
        expect(emailInput.value).toBe('')
        expect(nameInput.value).toBe('')
      })
    })
  })

  describe('Compact variant', () => {
    it('renders in compact mode when variant prop is compact', () => {
      render(<NewsletterForm variant="compact" />)

      const form = screen.getByRole('form')
      expect(form).toBeInTheDocument()

      // Compact variant should have different layout classes
      expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument()
    })

    it('renders in default mode when no variant prop', () => {
      render(<NewsletterForm />)

      const form = screen.getByRole('form')
      expect(form).toBeInTheDocument()
    })
  })

  describe('Layout', () => {
    it('uses single-column layout in default mode', () => {
      render(<NewsletterForm />)

      const form = screen.getByRole('form')
      const fieldContainer = form.querySelector('.grid')

      expect(fieldContainer).toHaveClass('grid-cols-1')
    })

    it('has proper spacing between form elements', () => {
      render(<NewsletterForm />)

      const form = screen.getByRole('form')
      expect(form).toHaveClass('space-y-4')
    })
  })
})
