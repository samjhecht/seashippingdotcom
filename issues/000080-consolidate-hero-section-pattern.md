---
id: 000080
title: Consolidate Hero Section Pattern
type: issue
status: open
priority: high
labels:
  - refactoring
  - code-quality
  - components
  - high-priority
createdAt: '2025-11-10T19:59:40.724Z'
updatedAt: '2025-11-10T19:59:40.724Z'
---
## Problem
Three pages implement similar hero sections with duplicated structure:
- Relative container with height constraints
- Full-bleed background image with overlay
- Centered text content with text-shadow
- Similar z-index layering

**Files affected:**
- `/src/app/news/page.tsx` (lines 154-173)
- `/src/app/services/page.tsx` (lines 32-62)
- `/src/components/sections/Hero.tsx` (lines 14-58)

## Proposed Solution
Create `/src/components/sections/PageHero.tsx`:

```typescript
interface PageHeroProps {
  images: string | string[], // single or array for rotation
  title: string | React.ReactNode,
  subtitle?: string,
  height?: 'sm' | 'md' | 'lg',
  overlayOpacity?: number,
  children?: React.ReactNode, // for CTA buttons
}
```

## Impact
- **Lines saved:** ~80 lines of duplicate JSX/logic
- **Benefit:** Ensures consistent hero styling across pages
- **Maintainability:** Single component to update for hero design changes

## New Files
- `/src/components/sections/PageHero.tsx`
