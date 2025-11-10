---
id: 000083
title: Consolidate Office Locations Display
type: issue
status: open
priority: medium
labels:
  - refactoring
  - code-quality
  - components
  - constants
createdAt: '2025-11-10T19:59:41.541Z'
updatedAt: '2025-11-10T19:59:41.541Z'
---
## Problem
Office locations displayed in multiple places with hard-coded arrays:
- Footer: With MapPin icon, joined with `|`
- Request page: Line breaks between cities

Hard-coded arrays in both locations instead of shared constant.

**Files affected:**
- `/src/components/layout/Footer.tsx` (lines 90-99, 141-152)
- `/src/app/request/page.tsx` (lines 430-436)

## Proposed Solution
Add to `/src/lib/constants.ts`:

```typescript
export const OFFICE_LOCATIONS = [
  'New York (NYC)',
  'San Francisco/Oakland (SFO/OAK)',
  // ... all 8 offices
] as const;
```

Create `/src/components/common/OfficeLocations.tsx`:

```typescript
interface OfficeLocationsProps {
  variant: 'inline' | 'list' | 'grid';
  showIcon?: boolean;
}
```

## Impact
- **Lines saved:** ~40 lines
- **Benefit:** Single source of truth for office list
- **Maintainability:** Easier to add/remove offices globally

## New Files
- `/src/components/common/OfficeLocations.tsx`
