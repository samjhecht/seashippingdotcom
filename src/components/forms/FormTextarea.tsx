import { forwardRef } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import type { TextareaHTMLAttributes } from 'react'

interface FormTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'required'> {
  label: string
  error?: { message?: string }
  required?: boolean
  showRequired?: boolean
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, id, required, showRequired, rows = 5, ...props }, ref) => {
    const textareaId = id || label.toLowerCase().replace(/\s+/g, '-')
    const errorId = `${textareaId}-error`
    const displayRequired = showRequired ?? required

    return (
      <div className="space-y-2">
        <Label htmlFor={textareaId}>
          {label}
          {displayRequired && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <Textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
          aria-required={displayRequired ? 'true' : undefined}
          className="text-base"
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
