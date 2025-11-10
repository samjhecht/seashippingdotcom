---
id: 000081
title: Extract Email Template Generation Logic
type: issue
status: open
priority: high
labels:
  - refactoring
  - code-quality
  - backend
  - email
createdAt: '2025-11-10T19:59:41.000Z'
updatedAt: '2025-11-10T19:59:41.000Z'
---
## Problem
Three API routes generate HTML email templates with similar structure:
- Similar HTML structure (`<h2>`, `<p><strong>`)
- Conditional field rendering pattern
- Same newline-to-`<br>` replacement
- Hardcoded styling in template strings

**Files affected:**
- `/src/app/api/contact/route.ts` (lines 85-104)
- `/src/app/api/rate-request/route.ts` (lines 87-105)
- `/src/app/api/request/route.ts` (lines 109-158)

## Proposed Solution
Create `/src/lib/email/templates.ts`:

```typescript
interface EmailField {
  label: string;
  value: string | undefined;
  section?: string;
}

export function generateFormEmail(
  title: string,
  fields: EmailField[]
): string {
  // Generic template builder
}
```

## Impact
- **Lines saved:** ~60 lines of duplicate template code
- **Benefit:** Centralized email styling
- **Maintainability:** Easier to update email format globally

## New Files
- `/src/lib/email/templates.ts`
