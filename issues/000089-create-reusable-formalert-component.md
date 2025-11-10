---
id: 000089
title: Create Reusable FormAlert Component
type: issue
status: open
priority: low
labels:
  - refactoring
  - code-quality
  - components
  - ui
  - forms
createdAt: '2025-11-10T19:59:43.211Z'
updatedAt: '2025-11-10T19:59:43.211Z'
---
## Problem
Three form components implement identical alert boxes for success/error states:
- Same conditional rendering based on `submitStatus`
- Identical Tailwind classes: `p-4 bg-green-50 border...`
- Same role="alert" attribute

**Files affected:**
- `/src/components/forms/ContactForm.tsx` (lines 115-131)
- `/src/components/forms/RateRequestForm.tsx` (lines 107-123)
- `/src/app/request/page.tsx` (lines 163-174)

## Proposed Solution
Create `/src/components/ui/FormAlert.tsx`:

```typescript
interface FormAlertProps {
  type: 'success' | 'error' | 'info';
  message: string;
  show?: boolean;
}
```

## Impact
- **Lines saved:** ~20 lines per form
- **Benefit:** Consistent alert styling
- **Maintainability:** Single source for alert design

## New Files
- `/src/components/ui/FormAlert.tsx`
