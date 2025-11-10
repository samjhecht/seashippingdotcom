---
id: 000094
title: Create Generic Data Sanitization Utility
type: issue
status: open
priority: medium
labels:
  - refactoring
  - code-quality
  - backend
  - utilities
createdAt: '2025-11-10T19:59:44.662Z'
updatedAt: '2025-11-10T19:59:44.662Z'
---
## Problem
Each API route manually sanitizes each field with repetitive ternary operators:

```typescript
const sanitizedData = {
  name: sanitizeHtml(validatedData.name),
  email: validatedData.email,
  phone: validatedData.phone ? sanitizeHtml(validatedData.phone) : undefined,
  // ... repeated pattern
}
```

**Files affected:**
- `/src/app/api/contact/route.ts` (lines 32-64)
- `/src/app/api/rate-request/route.ts` (lines 32-64)
- `/src/app/api/request/route.ts` (lines 32-64)

## Proposed Solution
Create `/src/lib/sanitize.ts` utility:

```typescript
export function sanitizeFormData<T extends Record<string, any>>(
  data: T,
  exemptFields: Array<keyof T> = ['email']
): T {
  // Auto-sanitize all string fields except exempt ones
}
```

## Impact
- **Lines saved:** ~20 lines of repetitive sanitization per route
- **Benefit:** Centralized sanitization logic
- **Maintainability:** Less error-prone

## Files to Modify
- Enhance existing `/src/lib/sanitize.ts`
