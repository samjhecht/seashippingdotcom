---
id: 000084
title: Create Reusable CardGrid Layout Component
type: issue
status: open
priority: medium
labels:
  - refactoring
  - code-quality
  - components
  - layout
createdAt: '2025-11-10T19:59:41.818Z'
updatedAt: '2025-11-10T19:59:41.818Z'
---
## Problem
Three pages implement responsive card grids with identical patterns:
- Same breakpoint pattern: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Similar card hover effects: `hover:shadow-lg transition-shadow`
- Image + content card structure
- Nearly identical spacing: `gap-6`

**Files affected:**
- `/src/app/news/page.tsx` (lines 187-226)
- `/src/app/services/page.tsx` (lines 70-113)
- `/src/app/network/page.tsx` (lines 662-769)

## Proposed Solution
Create `/src/components/layout/CardGrid.tsx`:

```typescript
interface CardGridProps<T> {
  items: T[];
  renderCard: (item: T) => React.ReactNode;
  columns?: { sm: 1, md: 2, lg: 2 | 3 };
  gap?: 4 | 6 | 8;
}
```

## Impact
- **Lines saved:** ~30 lines per page
- **Benefit:** Standardizes grid layouts across pages
- **Maintainability:** Easier responsive breakpoint changes

## New Files
- `/src/components/layout/CardGrid.tsx`
