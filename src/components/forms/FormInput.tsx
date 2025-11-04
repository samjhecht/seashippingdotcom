import { forwardRef } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { InputHTMLAttributes } from 'react'

interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'required'> {
  label: string
  error?: { message?: string }
  required?: boolean
  showRequired?: boolean
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, id, required, showRequired, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-')
    const errorId = `${inputId}-error`
    const displayRequired = showRequired ?? required

    return (
      <div className="space-y-2">
        <Label htmlFor={inputId}>
          {label}
          {displayRequired && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <Input
          id={inputId}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
          aria-required={displayRequired ? 'true' : undefined}
          className="h-12 text-base"
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
