---
id: 000085
title: Create Reusable CTASection Component
type: issue
status: open
priority: medium
labels:
  - refactoring
  - code-quality
  - components
createdAt: '2025-11-10T19:59:42.098Z'
updatedAt: '2025-11-10T19:59:42.098Z'
---
## Problem
Three pages implement identical blue background CTA sections:
- Same classes: `py-16 bg-blue-900 text-white`
- Centered content with max-width
- Heading + description + button pattern
- Identical spacing and typography

**Files affected:**
- `/src/app/news/page.tsx` (lines 232-254)
- `/src/app/services/page.tsx` (lines 206-224)
- `/src/app/network/page.tsx` (lines 845-859)

## Proposed Solution
Create `/src/components/sections/CTASection.tsx`:

```typescript
interface CTASectionProps {
  title: string;
  description: string;
  primaryButton: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  backgroundColor?: 'blue' | 'gray' | 'red';
}
```

## Impact
- **Lines saved:** ~60 lines
- **Benefit:** Consistent CTA styling
- **Maintainability:** 3 implementations → 1 component

## New Files
- `/src/components/sections/CTASection.tsx`
