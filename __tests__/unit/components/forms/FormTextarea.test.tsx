import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { FormTextarea } from '@/components/forms/FormTextarea'

function TestWrapper({ error }: { error?: { message?: string } }) {
  const { register } = useForm()

  return (
    <FormTextarea
      label="Message"
      error={error}
      {...register('message')}
    />
  )
}

function RequiredTestWrapper() {
  const { register } = useForm()

  return (
    <FormTextarea
      label="Message"
      required
      {...register('message')}
    />
  )
}

describe('FormTextarea', () => {
  it('renders label and textarea', () => {
    render(<TestWrapper />)

    const textarea = screen.getByLabelText('Message')
    expect(textarea).toBeInTheDocument()
    expect(textarea.tagName).toBe('TEXTAREA')
  })

  it('displays error message when provided', () => {
    const error = { message: 'Message is required' }
    render(<TestWrapper error={error} />)

    expect(screen.getByText('Message is required')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('marks textarea as required', () => {
    render(<RequiredTestWrapper />)

    const textarea = screen.getByRole('textbox', { name: /message/i })
    expect(textarea).toHaveAttribute('aria-required', 'true')

    // Check for required asterisk in label
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('has default rows attribute', () => {
    render(<TestWrapper />)

    const textarea = screen.getByLabelText('Message')
    expect(textarea).toHaveAttribute('rows', '5')
  })

  it('allows custom rows attribute', () => {
    function CustomRowsWrapper() {
      const { register } = useForm()

      return (
        <FormTextarea
          label="Message"
          rows={10}
          {...register('message')}
        />
      )
    }

    render(<CustomRowsWrapper />)

    const textarea = screen.getByLabelText('Message')
    expect(textarea).toHaveAttribute('rows', '10')
  })

  it('has correct ARIA attributes when error is present', () => {
    const error = { message: 'Invalid input' }
    render(<TestWrapper error={error} />)

    const textarea = screen.getByLabelText('Message')
    expect(textarea).toHaveAttribute('aria-invalid', 'true')
    expect(textarea).toHaveAttribute('aria-describedby')
  })

  it('has correct ARIA attributes when no error', () => {
    render(<TestWrapper />)

    const textarea = screen.getByLabelText('Message')
    expect(textarea).toHaveAttribute('aria-invalid', 'false')
    expect(textarea).not.toHaveAttribute('aria-describedby')
  })

  it('generates unique ID from label text', () => {
    render(<TestWrapper />)

    const textarea = screen.getByLabelText('Message')
    expect(textarea).toHaveAttribute('id', 'message')
  })

  it('accepts custom ID prop', () => {
    function CustomIdWrapper() {
      const { register } = useForm()

      return (
        <FormTextarea
          label="Message"
          id="custom-message"
          {...register('message')}
        />
      )
    }

    render(<CustomIdWrapper />)

    const textarea = screen.getByLabelText('Message')
    expect(textarea).toHaveAttribute('id', 'custom-message')
  })

  it('passes through standard textarea attributes', () => {
    function AttributesWrapper() {
      const { register } = useForm()

      return (
        <FormTextarea
          label="Message"
          placeholder="Enter your message"
          disabled
          maxLength={500}
          {...register('message')}
        />
      )
    }

    render(<AttributesWrapper />)

    const textarea = screen.getByLabelText('Message')
    expect(textarea).toHaveAttribute('placeholder', 'Enter your message')
    expect(textarea).toBeDisabled()
    expect(textarea).toHaveAttribute('maxlength', '500')
  })

  it('links error message to textarea via aria-describedby', () => {
    const error = { message: 'This field is required' }
    render(<TestWrapper error={error} />)

    const textarea = screen.getByLabelText('Message')
    const errorElement = screen.getByText('This field is required')

    const describedBy = textarea.getAttribute('aria-describedby')
    const errorId = errorElement.getAttribute('id')

    expect(describedBy).toBe(errorId)
  })
})
