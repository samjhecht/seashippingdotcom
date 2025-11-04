'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { requestFormSchema, type RequestFormData } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';

const subjectOptions = [
  'Full Container Load Rate Request',
  'Less than Container Load Rate Request',
  'Oversize Rate Request',
  'Automobile Rate Request',
  'Household Goods/Personal Effects Rate Request',
  'Reefer Rate Request',
  'Hazardous Materials Rate Request',
  'Customer Service Inquiry',
  'Sales Contact Request',
];

const cargoTypeOptions = [
  'full container load - dry or standard',
  'full container load - high cube',
  'full container load - flat rack',
  'full container load - open top',
  'full container load - refrigerated (reefer)',
  'less than container load',
  'tank container',
  'break-bulk',
  'out-of-gauge',
  'project cargo',
];

const containerSizeOptions = [
  'all available sizes',
  "20' Standard & High Cube",
  "20' & 40' Standard & High Cube",
  "40' Standard & High Cube",
  "45' Standard & High Cube",
];

const hazardousMaterialsOptions = ['no', 'yes'];

export default function RequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<RequestFormData>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      name: '',
      company: '',
      phone: '',
      email: '',
      subject: '',
      message: '',
      cargoType: '',
      origin: '',
      destination: '',
      volume: '',
      containerSize: '',
      hazardousMaterials: '',
      shipDate: '',
    },
  });

  const selectedSubject = watch('subject');
  const selectedCargoType = watch('cargoType');
  const selectedContainerSize = watch('containerSize');
  const selectedHazardousMaterials = watch('hazardousMaterials');

  const onSubmit = async (data: RequestFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit request');
      }

      setSubmitStatus({
        type: 'success',
        message:
          'Thank you for your request. We will contact you shortly. We appreciate your patronage.',
      });
      reset();
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message:
          'There was an error submitting your request. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main id="main" role="main" className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              REQUEST INFORMATION
            </h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-4">
                Use the <strong>form</strong> below to request a rate quote for
                moving full container load consignments from anywhere in the
                United States to over 552 points worldwide, to place a customer
                service inquiry, to investigate our outstanding out-of-gauge or
                project cargo services, or to request contact from one of our
                senior sales executives. Only populate those fields that are
                relative.
              </p>
              <p className="text-gray-700 italic">
                We appreciate your patronage.
              </p>
            </div>
            <div className="mt-6 flex justify-center">
              <Image
                src="/images/request/ssl-site-seal.gif"
                alt="SSL site seal - click to verify"
                width={131}
                height={32}
                className="h-8 w-auto"
              />
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Request Form</h2>

            {submitStatus.type && (
              <div
                className={`mb-6 p-4 rounded-md ${
                  submitStatus.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
                role="alert"
              >
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="required">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    {...register('name')}
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="company">Your Company Name</Label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="Your Company Name"
                    {...register('company')}
                    aria-invalid={errors.company ? 'true' : 'false'}
                    aria-describedby={
                      errors.company ? 'company-error' : undefined
                    }
                  />
                  {errors.company && (
                    <p
                      id="company-error"
                      className="mt-1 text-sm text-red-600"
                    >
                      {errors.company.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone">Your Telephone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Your Telephone Number"
                    {...register('phone')}
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1 text-sm text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="required">
                    Your Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your Email Address"
                    {...register('email')}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="subject" className="required">
                  Subject
                </Label>
                <Select
                  value={selectedSubject}
                  onValueChange={(value) => setValue('subject', value)}
                >
                  <SelectTrigger
                    id="subject"
                    aria-invalid={errors.subject ? 'true' : 'false'}
                    aria-describedby={
                      errors.subject ? 'subject-error' : undefined
                    }
                  >
                    <SelectValue placeholder="---Subject---" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subject && (
                  <p id="subject-error" className="mt-1 text-sm text-red-600">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="message" className="required">
                  Message / Commodity Description
                </Label>
                <Textarea
                  id="message"
                  placeholder="Message / Commodity Description"
                  rows={5}
                  {...register('message')}
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={
                    errors.message ? 'message-error' : undefined
                  }
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="cargoType">Cargo Type</Label>
                <Select
                  value={selectedCargoType}
                  onValueChange={(value) => setValue('cargoType', value)}
                >
                  <SelectTrigger id="cargoType">
                    <SelectValue placeholder="---Cargo Type---" />
                  </SelectTrigger>
                  <SelectContent>
                    {cargoTypeOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="origin">Origin Point</Label>
                  <Input
                    id="origin"
                    type="text"
                    placeholder="Origin Point - City, State, and/or Zip Code"
                    {...register('origin')}
                  />
                </div>

                <div>
                  <Label htmlFor="destination">Destination Point</Label>
                  <Input
                    id="destination"
                    type="text"
                    placeholder="Destination Point"
                    {...register('destination')}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="volume">Number of Containers</Label>
                <Input
                  id="volume"
                  type="text"
                  placeholder="Number of Containers"
                  {...register('volume')}
                />
              </div>

              <div>
                <Label htmlFor="containerSize">Container Size</Label>
                <Select
                  value={selectedContainerSize}
                  onValueChange={(value) => setValue('containerSize', value)}
                >
                  <SelectTrigger id="containerSize">
                    <SelectValue placeholder="---Container Size---" />
                  </SelectTrigger>
                  <SelectContent>
                    {containerSizeOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="hazardousMaterials">
                  Any Hazardous Materials?
                </Label>
                <Select
                  value={selectedHazardousMaterials}
                  onValueChange={(value) =>
                    setValue('hazardousMaterials', value)
                  }
                >
                  <SelectTrigger id="hazardousMaterials">
                    <SelectValue placeholder="---Any Hazardous Materials?---" />
                  </SelectTrigger>
                  <SelectContent>
                    {hazardousMaterialsOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="shipDate">Approximate Ship Date</Label>
                <Input
                  id="shipDate"
                  type="date"
                  placeholder="Approximate Ship Date"
                  {...register('shipDate')}
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Your Request'}
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-12 text-center text-sm text-gray-600 space-y-2">
            <h3 className="font-bold text-lg text-gray-900">
              SEA SHIPPING LINE
            </h3>
            <p>
              New York (NYC) | San Francisco/Oakland (SFO/OAK)
              <br />
              Miami (MIA) | Chicago (CHI) | Los Angeles (LAX)
              <br />
              Houston (HOU) | Atlanta (ATL) | Seattle (SEA)
            </p>
            <div className="pt-4 space-y-1">
              <p>OTI#: 010787</p>
              <p>SCAC Code: AAGP</p>
              <p>SVI#: ASACON03285</p>
              <p>DOT#: 3978374</p>
              <p>MC#: 1488768</p>
              <p>CUSTOMS FILER CODE: DBK</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
