---
id: 000079
title: Create Reusable BaseForm Component
type: issue
status: open
priority: high
labels:
  - refactoring
  - code-quality
  - components
  - forms
  - high-priority
createdAt: '2025-11-10T19:59:40.446Z'
updatedAt: '2025-11-10T19:59:40.446Z'
---
## Problem
ContactForm and RateRequestForm share identical patterns:
- State management (lines 17-20 in both)
- Form submission flow (lines 32-58)
- Error handling states (lines 107-131)
- Submit button rendering (lines 125-147)
- Nearly identical field structure

**Files affected:**
- `/src/components/forms/ContactForm.tsx` (lines 1-151)
- `/src/components/forms/RateRequestForm.tsx` (lines 1-143)

## Proposed Solution
Create a generic `<BaseForm>` component with render props pattern:

```typescript
<BaseForm
  schema={contactFormSchema}
  apiEndpoint="/api/contact"
  successMessage="..."
  onSuccess={onSuccess}
>
  {({ register, errors }) => (
    <>
      <FormInput label="Name" {...register('name')} error={errors.name} />
      {/* Additional fields */}
    </>
  )}
</BaseForm>
```

## Impact
- **Lines saved:** ~100 lines of duplicate state/submission logic
- **Benefit:** Standardizes form behavior across the app
- **Maintainability:** Makes adding new forms trivial

## New Files
- `/src/components/forms/BaseForm.tsx`
