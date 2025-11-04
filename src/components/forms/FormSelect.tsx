import { forwardRef } from 'react'
import { Label } from '@/components/ui/label'
import type { SelectHTMLAttributes } from 'react'

interface SelectOption {
  value: string
  label: string
}

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: SelectOption[]
  error?: { message?: string }
  placeholder?: string
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, options, error, id, placeholder = 'Select...', ...props }, ref) => {
    const selectId = id || label.toLowerCase().replace(/\s+/g, '-')
    const errorId = `${selectId}-error`

    return (
      <div className="space-y-2">
        <Label htmlFor={selectId}>
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <select
          id={selectId}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
          className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={errorId} className="text-sm text-red-600" role="alert">
            {error.message}
          </p>
        )}
      </div>
    )
  }
)

FormSelect.displayName = 'FormSelect'
