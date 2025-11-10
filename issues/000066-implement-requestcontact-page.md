---
id: '000066'
title: Implement Request/Contact Page
type: issue
status: closed
priority: high
labels: []
createdAt: '2025-10-30T00:20:50.486Z'
updatedAt: '2025-10-30T00:35:02.584Z'
---
## Objective
Build the /request page that mirrors content from https://www.seashipping.com/request

## Requirements
1. Extract contact form structure and content from the live SSL site
2. Download any form-related images/assets
3. Implement responsive contact/request form using Next.js 16 App Router
4. Use existing UI components (Form, Input, etc.)
5. Ensure accessibility
6. Match the content and form fields from the original site
7. Implement form validation

## Technical Details
- Route: `/src/app/request/page.tsx`
- Extract content from https://www.seashipping.com/request
- Use shadcn/ui form components
- Add form validation with react-hook-form + zod

## Acceptance Criteria
- [ ] Request page renders at /request
- [ ] Contact form with all original fields
- [ ] Form validation working
- [ ] Images are extracted from live site
- [ ] Page is responsive and accessible
- [ ] Content matches original SSL website
- [ ] No placeholder content

---
**Completion Notes (2025-10-30T00:35:02.550Z):**
Request page was already fully implemented with complete contact form, validation, and API integration extracted from the live SSL site.
