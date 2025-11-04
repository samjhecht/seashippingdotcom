'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, type ContactFormData } from '@/lib/validations'
import { trackFormSubmission } from '@/lib/analytics'
import { FormInput } from './FormInput'
import { FormTextarea } from './FormTextarea'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface ContactFormProps {
  onSuccess?: () => void
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onTouched',
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      setSubmitStatus('success')
      reset()
      trackFormSubmission('Contact Form')
      onSuccess?.()
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('Failed to submit contact form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      role="form"
      aria-label="Contact Form"
    >
      <div className="grid grid-cols-1 gap-6">
        <FormInput
          label="Name"
          type="text"
          showRequired
          error={errors.name}
          {...register('name')}
        />

        <FormInput
          label="Email"
          type="email"
          showRequired
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

        <FormInput
          label="Subject"
          type="text"
          showRequired
          error={errors.subject}
          {...register('subject')}
        />

        <FormTextarea
          label="Message"
          showRequired
          placeholder="How can we help you?"
          error={errors.message}
          {...register('message')}
        />
      </div>

      {submitStatus === 'success' && (
        <div
          className="p-4 bg-green-50 border border-green-200 rounded-md text-green-800"
          role="alert"
        >
          Thank you for contacting us! We'll respond to your inquiry shortly.
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
          'Submit'
        )}
      </Button>
    </form>
  )
}
