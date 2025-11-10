---
id: 000087
title: Extract Form Dropdown Options to Constants
type: issue
status: open
priority: low
labels:
  - refactoring
  - code-quality
  - constants
createdAt: '2025-11-10T19:59:42.656Z'
updatedAt: '2025-11-10T19:59:42.656Z'
---
## Problem
Request page has five arrays of dropdown options defined inline:
- `subjectOptions` (9 items)
- `cargoTypeOptions` (10 items)
- `containerSizeOptions` (5 items)
- `hazardousMaterialsOptions` (2 items)

These are domain data that should live in a constants file.

**Files affected:**
- `/src/app/request/page.tsx` (lines 20-53)

## Proposed Solution
Move to `/src/lib/constants.ts` or create `/src/content/forms.ts`:

```typescript
export const FORM_OPTIONS = {
  subjects: [...],
  cargoTypes: [...],
  containerSizes: [...],
  hazardousMaterials: ['no', 'yes'],
} as const;
```

## Impact
- **Lines saved:** ~35 lines moved to constants
- **Benefit:** Better separation of concerns
- **Maintainability:** Reusable if other forms need same options

## New Files
- Potentially `/src/content/forms.ts`
