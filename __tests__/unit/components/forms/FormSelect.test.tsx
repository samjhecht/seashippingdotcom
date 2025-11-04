import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { FormSelect } from '@/components/forms/FormSelect'

const testOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]

function TestWrapper({ error }: { error?: { message?: string } }) {
  const { register } = useForm()

  return (
    <FormSelect
      label="Service Type"
      options={testOptions}
      error={error}
      {...register('serviceType')}
    />
  )
}

function RequiredTestWrapper() {
  const { register } = useForm()

  return (
    <FormSelect
      label="Service Type"
      options={testOptions}
      required
      {...register('serviceType')}
    />
  )
}

describe('FormSelect', () => {
  it('renders label and select', () => {
    render(<TestWrapper />)

    const select = screen.getByLabelText('Service Type')
    expect(select).toBeInTheDocument()
    expect(select.tagName).toBe('SELECT')
  })

  it('renders all options', () => {
    render(<TestWrapper />)

    const select = screen.getByLabelText('Service Type') as HTMLSelectElement

    expect(select.options).toHaveLength(4) // placeholder + 3 options
    expect(select.options[1].value).toBe('option1')
    expect(select.options[1].text).toBe('Option 1')
    expect(select.options[2].value).toBe('option2')
    expect(select.options[2].text).toBe('Option 2')
    expect(select.options[3].value).toBe('option3')
    expect(select.options[3].text).toBe('Option 3')
  })

  it('renders placeholder option', () => {
    render(<TestWrapper />)

    const select = screen.getByLabelText('Service Type') as HTMLSelectElement
    expect(select.options[0].text).toBe('Select...')
    expect(select.options[0].value).toBe('')
  })

  it('allows custom placeholder', () => {
    function CustomPlaceholderWrapper() {
      const { register } = useForm()

      return (
        <FormSelect
          label="Service Type"
          options={testOptions}
          placeholder="Choose a service"
          {...register('serviceType')}
        />
      )
    }

    render(<CustomPlaceholderWrapper />)

    const select = screen.getByLabelText('Service Type') as HTMLSelectElement
    expect(select.options[0].text).toBe('Choose a service')
  })

  it('displays error message when provided', () => {
    const error = { message: 'Service type is required' }
    render(<TestWrapper error={error} />)

    expect(screen.getByText('Service type is required')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('marks select as required', () => {
    render(<RequiredTestWrapper />)

    const select = screen.getByRole('combobox', { name: /service type/i })
    expect(select).toHaveAttribute('required')

    // Check for required asterisk in label
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('select meets touch target size on mobile (44px minimum)', () => {
    render(<TestWrapper />)

    const select = screen.getByLabelText('Service Type')

    // Check that h-12 class is applied (48px height)
    expect(select).toHaveClass('h-12')
  })

  it('has correct ARIA attributes when error is present', () => {
    const error = { message: 'Invalid selection' }
    render(<TestWrapper error={error} />)

    const select = screen.getByLabelText('Service Type')
    expect(select).toHaveAttribute('aria-invalid', 'true')
    expect(select).toHaveAttribute('aria-describedby')
  })

  it('has correct ARIA attributes when no error', () => {
    render(<TestWrapper />)

    const select = screen.getByLabelText('Service Type')
    expect(select).toHaveAttribute('aria-invalid', 'false')
    expect(select).not.toHaveAttribute('aria-describedby')
  })

  it('generates unique ID from label text', () => {
    render(<TestWrapper />)

    const select = screen.getByLabelText('Service Type')
    expect(select).toHaveAttribute('id', 'service-type')
  })

  it('accepts custom ID prop', () => {
    function CustomIdWrapper() {
      const { register } = useForm()

      return (
        <FormSelect
          label="Service Type"
          options={testOptions}
          id="custom-select"
          {...register('serviceType')}
        />
      )
    }

    render(<CustomIdWrapper />)

    const select = screen.getByLabelText('Service Type')
    expect(select).toHaveAttribute('id', 'custom-select')
  })

  it('passes through standard select attributes', () => {
    function AttributesWrapper() {
      const { register } = useForm()

      return (
        <FormSelect
          label="Service Type"
          options={testOptions}
          disabled
          {...register('serviceType')}
        />
      )
    }

    render(<AttributesWrapper />)

    const select = screen.getByLabelText('Service Type')
    expect(select).toBeDisabled()
  })

  it('links error message to select via aria-describedby', () => {
    const error = { message: 'This field is required' }
    render(<TestWrapper error={error} />)

    const select = screen.getByLabelText('Service Type')
    const errorElement = screen.getByText('This field is required')

    const describedBy = select.getAttribute('aria-describedby')
    const errorId = errorElement.getAttribute('id')

    expect(describedBy).toBe(errorId)
  })
})
