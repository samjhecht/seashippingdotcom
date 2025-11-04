'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newsletterSubscriptionSchema, type NewsletterSubscriptionData } from '@/lib/validations'
import { trackFormSubmission } from '@/lib/analytics'
import { FormInput } from './FormInput'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface NewsletterFormProps {
  onSuccess?: () => void
  variant?: 'default' | 'compact'
}

export function NewsletterForm({ onSuccess, variant = 'default' }: NewsletterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterSubscriptionData>({
    resolver: zodResolver(newsletterSubscriptionSchema),
    mode: 'onTouched',
  })

  const onSubmit = async (data: NewsletterSubscriptionData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Subscription failed')
      }

      setSubmitStatus('success')
      reset()
      trackFormSubmission('Newsletter Subscription')
      onSuccess?.()
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('Failed to subscribe. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      role="form"
      aria-label="Newsletter Subscription Form"
    >
      <div className="grid grid-cols-1 gap-4">
        <FormInput
          label="Email"
          type="email"
          showRequired
          placeholder="your@email.com"
          error={errors.email}
          {...register('email')}
        />

        <FormInput
          label="Name"
          type="text"
          placeholder="Your name (optional)"
          error={errors.name}
          {...register('name')}
        />
      </div>

      {submitStatus === 'success' && (
        <div
          className="p-4 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm"
          role="alert"
        >
          Successfully subscribed! Thank you for joining our newsletter.
        </div>
      )}

      {submitStatus === 'error' && (
        <div
          className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        size={variant === 'compact' ? 'default' : 'lg'}
        disabled={isSubmitting}
        className="w-full h-12"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Subscribing...
          </>
        ) : (
          'Subscribe'
        )}
      </Button>
    </form>
  )
}
