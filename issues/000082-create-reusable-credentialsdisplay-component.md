---
id: 000082
title: Create Reusable CredentialsDisplay Component
type: issue
status: open
priority: medium
labels:
  - refactoring
  - code-quality
  - components
createdAt: '2025-11-10T19:59:41.268Z'
updatedAt: '2025-11-10T19:59:41.268Z'
---
## Problem
Regulatory credentials (OTI#, SCAC, etc.) displayed in 4+ locations with different formatting:
- Footer: Copy-to-clipboard with icons
- Request page: Static text list
- Services page: Grid layout with SSL-red accent
- Network page: Inline badges

**Files affected:**
- `/src/components/layout/Footer.tsx` (lines 65-72, 177-216)
- `/src/app/request/page.tsx` (lines 426-445)
- `/src/app/services/page.tsx` (lines 147-174)
- `/src/app/network/page.tsx` (lines 641-655)

## Proposed Solution
Create `/src/components/common/CredentialsDisplay.tsx`:

```typescript
interface CredentialsDisplayProps {
  variant: 'inline' | 'grid' | 'list' | 'copyable';
  credentials?: Array<keyof typeof REGULATORY_INFO>;
  className?: string;
}
```

## Impact
- **Lines saved:** ~100 lines of duplicate markup
- **Benefit:** Ensures consistent credential values
- **Maintainability:** 4 implementations → 1 component

## New Files
- `/src/components/common/CredentialsDisplay.tsx`
