---
id: 000091
title: Centralize Type Definitions
type: issue
status: open
priority: low
labels:
  - refactoring
  - code-quality
  - typescript
  - types
createdAt: '2025-11-10T19:59:43.788Z'
updatedAt: '2025-11-10T19:59:43.788Z'
---
## Problem
Many interfaces defined inline in page files instead of centralized type files:
- `NewsArticle` interface in news page
- Office/partner interfaces in network page
- `FooterLink`, `FooterSection` inline in Footer

**Files affected:**
- `/src/app/news/page.tsx` (lines 11-19) - `NewsArticle` interface
- `/src/app/network/page.tsx` (lines 19-122) - office/partner interfaces inline
- `/src/components/layout/Footer.tsx` (lines 14-23) - `FooterLink`, `FooterSection` inline

## Proposed Solution
Move to `/src/types/index.ts`:

```typescript
export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: string;
  // ...
}

export interface DomesticOffice {
  city: string;
  state: string;
  // ...
}

export interface InternationalPartner {
  name: string;
  countries: string[];
  // ...
}
```

## Impact
- **Benefit:** Better type organization
- **Maintainability:** Reusable types across files, easier type maintenance

## Files to Modify
- `/src/types/index.ts`
