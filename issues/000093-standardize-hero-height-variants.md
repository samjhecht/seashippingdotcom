---
id: 000093
title: Standardize Hero Height Variants
type: issue
status: open
priority: low
labels:
  - refactoring
  - code-quality
  - styling
  - constants
createdAt: '2025-11-10T19:59:44.365Z'
updatedAt: '2025-11-10T19:59:44.365Z'
---
## Problem
Different hero height patterns used inconsistently:
- News page: `h-[300px] md:h-[400px]`
- Services page: `h-[400px] md:h-[500px]`
- Hero component: `h-[400px] md:h-[500px]`

Should standardize on sm/md/lg variants.

**Files affected:**
- `/src/app/news/page.tsx` (line 154)
- `/src/app/services/page.tsx` (line 32)
- `/src/components/sections/Hero.tsx` (line 15)

## Proposed Solution
Define in constants:

```typescript
export const HERO_HEIGHTS = {
  sm: 'h-[300px] md:h-[400px]',
  md: 'h-[400px] md:h-[500px]',
  lg: 'h-[500px] md:h-[600px]',
} as const;
```

## Impact
- **Benefit:** More predictable hero sizing, better visual consistency
- **Maintainability:** Easier to adjust globally

## Files to Modify
- `/src/lib/constants.ts` or new style constants file
- All hero section implementations
