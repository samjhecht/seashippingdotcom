---
id: 000086
title: Create ContentAccordion Abstraction
type: issue
status: open
priority: medium
labels:
  - refactoring
  - code-quality
  - components
  - ui
createdAt: '2025-11-10T19:59:42.376Z'
updatedAt: '2025-11-10T19:59:42.376Z'
---
## Problem
Resources page has 4 accordions with nearly identical structure for different content types. Both resources page and footer use the same Accordion component with `suppressHydrationWarning`.

**Files affected:**
- `/src/app/resources/page.tsx` (lines 430-453, 470-493, 510-533, 549-572)
- `/src/components/layout/Footer.tsx` (lines 254-272)

## Proposed Solution
Create `/src/components/ui/ContentAccordion.tsx`:

```typescript
interface AccordionSection {
  id: string;
  title: string;
  items: Array<{ name: string; url?: string }>;
  renderItem: (item) => React.ReactNode;
}

interface ContentAccordionProps {
  sections: AccordionSection[];
}
```

## Impact
- **Lines saved:** ~50 lines on resources page
- **Benefit:** Better content separation
- **Maintainability:** Reduces repetitive accordion setup code

## New Files
- `/src/components/ui/ContentAccordion.tsx`
