import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { FormInput } from '@/components/forms/FormInput'

function TestWrapper({ error }: { error?: { message?: string } }) {
  const { register } = useForm()

  return (
    <FormInput
      label="Name"
      type="text"
      error={error}
      {...register('name')}
    />
  )
}

function RequiredTestWrapper() {
  const { register } = useForm()

  return (
    <FormInput
      label="Name"
      type="text"
      required
      {...register('name')}
    />
  )
}

describe('FormInput', () => {
  it('renders label and input', () => {
    render(<TestWrapper />)

    const input = screen.getByLabelText('Name')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
  })

  it('displays error message when provided', () => {
    const error = { message: 'Name is required' }
    render(<TestWrapper error={error} />)

    expect(screen.getByText('Name is required')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('marks input as required', () => {
    render(<RequiredTestWrapper />)

    const input = screen.getByRole('textbox', { name: /name/i })
    expect(input).toHaveAttribute('aria-required', 'true')

    // Check for required asterisk in label
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('input meets touch target size on mobile (44px minimum)', () => {
    render(<TestWrapper />)

    const input = screen.getByLabelText('Name')

    // Check that h-12 class is applied (48px height)
    expect(input).toHaveClass('h-12')
  })

  it('has correct ARIA attributes when error is present', () => {
    const error = { message: 'Invalid input' }
    render(<TestWrapper error={error} />)

    const input = screen.getByLabelText('Name')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby')
  })

  it('has correct ARIA attributes when no error', () => {
    render(<TestWrapper />)

    const input = screen.getByLabelText('Name')
    expect(input).toHaveAttribute('aria-invalid', 'false')
    expect(input).not.toHaveAttribute('aria-describedby')
  })

  it('generates unique ID from label text', () => {
    render(<TestWrapper />)

    const input = screen.getByLabelText('Name')
    expect(input).toHaveAttribute('id', 'name')
  })

  it('accepts custom ID prop', () => {
    function CustomIdWrapper() {
      const { register } = useForm()

      return (
        <FormInput
          label="Name"
          type="text"
          id="custom-id"
          {...register('name')}
        />
      )
    }

    render(<CustomIdWrapper />)

    const input = screen.getByLabelText('Name')
    expect(input).toHaveAttribute('id', 'custom-id')
  })

  it('passes through standard input attributes', () => {
    function AttributesWrapper() {
      const { register } = useForm()

      return (
        <FormInput
          label="Name"
          type="text"
          placeholder="Enter your name"
          disabled
          {...register('name')}
        />
      )
    }

    render(<AttributesWrapper />)

    const input = screen.getByLabelText('Name')
    expect(input).toHaveAttribute('placeholder', 'Enter your name')
    expect(input).toBeDisabled()
  })

  it('links error message to input via aria-describedby', () => {
    const error = { message: 'This field is required' }
    render(<TestWrapper error={error} />)

    const input = screen.getByLabelText('Name')
    const errorElement = screen.getByText('This field is required')

    const describedBy = input.getAttribute('aria-describedby')
    const errorId = errorElement.getAttribute('id')

    expect(describedBy).toBe(errorId)
  })
})
