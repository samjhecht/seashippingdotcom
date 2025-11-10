---
id: 000090
title: Create BrandButton Component for SSL Red CTA
type: issue
status: open
priority: low
labels:
  - refactoring
  - code-quality
  - components
  - styling
createdAt: '2025-11-10T19:59:43.500Z'
updatedAt: '2025-11-10T19:59:43.500Z'
---
## Problem
Custom button with inline `backgroundColor: '#ee1c23'` and hover state handlers used in Hero. This SSL red brand color pattern should be abstracted.

**Files affected:**
- `/src/components/sections/Hero.tsx` (lines 42-56)
- Similar patterns may exist in other CTAs

## Proposed Solution
Add to Tailwind config or create a `<BrandButton>` component:

```typescript
// Either extend Button component or create specialized variant
<Button variant="ssl-red" />
```

## Impact
- **Lines saved:** ~15 lines per usage
- **Benefit:** More consistent brand button usage
- **Maintainability:** Removes inline style handlers

## Files to Modify
- `/tailwind.config.ts` or create new component file
