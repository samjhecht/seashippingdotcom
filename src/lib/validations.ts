import { z } from 'zod'

// Common field validators with user-friendly error messages
const emailSchema = z
  .string()
  .trim()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .toLowerCase()

const nameSchema = z
  .string()
  .trim()
  .min(1, 'Name is required')
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must not exceed 100 characters')

const phoneSchema = z
  .string()
  .regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number')
  .optional()
  .or(z.literal(''))

const messageSchema = z
  .string()
  .trim()
  .min(1, 'Message is required')
  .min(10, 'Message must be at least 10 characters')
  .max(2000, 'Message must not exceed 2000 characters')

const companySchema = z
  .string()
  .max(200, 'Company name must not exceed 200 characters')
  .trim()
  .optional()
  .or(z.literal(''))

const subjectSchema = z
  .string()
  .min(1, 'Subject is required')
  .min(3, 'Subject must be at least 3 characters')
  .trim()

// Rate Request Form Schema
export const rateRequestSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  company: companySchema,
  message: messageSchema,
  serviceType: z.string().optional().or(z.literal('')),
})

export type RateRequestFormData = z.infer<typeof rateRequestSchema>

// Contact Form Schema (extends rate request with subject field)
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  company: companySchema,
  subject: subjectSchema,
  message: messageSchema,
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Newsletter Subscription Schema
export const newsletterSubscriptionSchema = z.object({
  email: emailSchema,
  name: z.string().trim().optional().or(z.literal('')),
})

export type NewsletterSubscriptionData = z.infer<
  typeof newsletterSubscriptionSchema
>

// Newsletter Unsubscription Schema
export const newsletterUnsubscriptionSchema = z.object({
  email: emailSchema,
})

export type NewsletterUnsubscriptionData = z.infer<
  typeof newsletterUnsubscriptionSchema
>

// Request Form Schema
export const requestFormSchema = z.object({
  name: nameSchema,
  company: companySchema,
  phone: phoneSchema,
  email: emailSchema,
  subject: z.string().min(1, 'Please select a subject'),
  message: z
    .string()
    .trim()
    .min(1, 'Message or commodity description is required')
    .max(2000, 'Message must not exceed 2000 characters'),
  cargoType: z.string().optional().or(z.literal('')),
  origin: z.string().trim().optional().or(z.literal('')),
  destination: z.string().trim().optional().or(z.literal('')),
  volume: z.string().trim().optional().or(z.literal('')),
  containerSize: z.string().optional().or(z.literal('')),
  hazardousMaterials: z.string().optional().or(z.literal('')),
  shipDate: z.string().optional().or(z.literal('')),
})

export type RequestFormData = z.infer<typeof requestFormSchema>
