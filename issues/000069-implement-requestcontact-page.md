---
id: 000069
title: Implement Request/Contact Page
type: issue
status: closed
priority: high
labels: []
createdAt: '2025-10-30T00:34:33.981Z'
updatedAt: '2025-10-30T00:34:36.296Z'
---
Implement the Request/Contact Page for Sea Shipping Line with the following features:

## Implemented Features:
- Form with all required fields extracted from live website
- Subject dropdown with all shipping service options
- Cargo type dropdown
- Container size options
- Hazardous materials checkbox
- Origin/destination fields
- Number of containers field
- Ship date field
- Form validation using Zod
- Error messages for validation failures
- Success/error notifications after submission

## Technical Implementation:
- Page: /src/app/request/page.tsx (client component with form handling)
- API Route: /src/app/api/request/route.ts (with rate limiting and email notifications)
- Validation Schema: /src/lib/validations.ts (requestFormSchema)
- Metadata: /src/app/request/metadata.ts (SEO metadata)
- UI Components: Uses existing @/components/ui components (Button, Input, Textarea, Label, Select)
- Form Library: react-hook-form with zod validation
- Styling: Tailwind CSS with responsive design
- Accessibility: ARIA attributes, semantic HTML, keyboard navigation
- Images: SSL site seal included at /public/images/request/ssl-site-seal.gif

## Form Fields:
1. **Required Fields:**
   - Your Name (text)
   - Your Email Address (email)
   - Subject (select dropdown)
   - Message/Commodity Description (textarea)

2. **Optional Fields:**
   - Your Company Name (text)
   - Your Telephone Number (tel)
   - Cargo Type (select dropdown)
   - Origin Point (text)
   - Destination Point (text)
   - Number of Containers (text)
   - Container Size (select dropdown)
   - Any Hazardous Materials? (select yes/no)
   - Approximate Ship Date (date)

## Subject Options:
- Full Container Load Rate Request
- Less than Container Load Rate Request
- Oversize Rate Request
- Automobile Rate Request
- Household Goods/Personal Effects Rate Request
- Reefer Rate Request
- Hazardous Materials Rate Request
- Customer Service Inquiry
- Sales Contact Request

## Testing Status:
- Build: Successful
- Tests: Passing (form validation tests included)
- Responsive Design: Mobile, tablet, and desktop
- Accessibility: WCAG compliant

## Completion Notes:
The implementation extracts exact form structure from the live SSL website at https://www.seashipping.com/request. All form fields, validation rules, and messaging match the original website. The page integrates with the existing Next.js 16 App Router, uses established UI components, and follows project patterns for form handling and validation.

---
**Completion Notes (2025-10-30T00:34:36.286Z):**
Implementation completed and verified. The Request/Contact Page is fully functional with:
- Complete form implementation with all fields from live website
- Form validation using Zod schema
- API endpoint for form submission with rate limiting
- Email notification system
- Responsive design with Tailwind CSS
- Full accessibility support
- Build and tests passing
- Production-ready
