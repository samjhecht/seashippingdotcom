---
id: 000088
title: Extract Social Links to Constants and Component
type: issue
status: open
priority: low
labels:
  - refactoring
  - code-quality
  - components
  - constants
createdAt: '2025-11-10T19:59:42.931Z'
updatedAt: '2025-11-10T19:59:42.931Z'
---
## Problem
Social links array defined in Header and rendered in 3 places (desktop nav, mobile sheet twice). Could be moved to constants and rendered with a dedicated component.

**Files affected:**
- `/src/components/layout/Header.tsx` (lines 39-58, 139-150, 226-243)

## Proposed Solution
Move to `/src/lib/constants.ts`:

```typescript
export const SOCIAL_LINKS = [
  { name: 'Facebook', href: '...', icon: 'Facebook', label: '...' },
  // ...
] as const;
```

Create `/src/components/common/SocialLinks.tsx`:

```typescript
interface SocialLinksProps {
  variant: 'row' | 'column';
  size?: 'sm' | 'md' | 'lg';
}
```

## Impact
- **Lines saved:** ~30 lines reduced
- **Benefit:** Better organization
- **Maintainability:** Easier to add/remove social links

## New Files
- `/src/components/common/SocialLinks.tsx`
