---
id: 000078
title: Consolidate API Route Handler Pattern
type: issue
status: open
priority: high
labels:
  - refactoring
  - code-quality
  - backend
  - high-priority
createdAt: '2025-11-10T19:59:40.176Z'
updatedAt: '2025-11-10T19:59:40.176Z'
---
## Problem
Three API routes (contact, rate-request, request) share 95% identical code structure:
- Rate limiting logic
- IP extraction and checking
- Zod validation parsing
- Data sanitization loops
- Email sending with error handling
- Zod error formatting

**Files affected:**
- `/src/app/api/contact/route.ts` (lines 13-83)
- `/src/app/api/rate-request/route.ts` (lines 13-85)
- `/src/app/api/request/route.ts` (lines 13-106)

## Proposed Solution
Create a generic API handler factory `/src/lib/api/createFormHandler.ts`:

```typescript
export function createFormHandler<T extends z.ZodType>({
  schema: T,
  emailTemplate: (data) => string,
  emailSubject: string | ((data) => string),
  recipientEnv: string,
  successMessage: string,
}) {
  return async (request: NextRequest) => {
    // Consolidated rate limiting, validation, sanitization, email sending
  }
}
```

## Impact
- **Lines saved:** ~200 lines of duplicate code
- **Benefit:** Single source of truth for security, validation, and error handling
- **Maintainability:** Easier to update rate limiting or validation logic globally
