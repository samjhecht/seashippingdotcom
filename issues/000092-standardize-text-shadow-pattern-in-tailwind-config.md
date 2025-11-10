---
id: 000092
title: Standardize Text Shadow Pattern in Tailwind Config
type: issue
status: open
priority: low
labels:
  - refactoring
  - code-quality
  - styling
  - tailwind
createdAt: '2025-11-10T19:59:44.075Z'
updatedAt: '2025-11-10T19:59:44.075Z'
---
## Problem
Same text shadow effect used inline in multiple hero sections:
```typescript
style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.9)' }}
```

**Files affected:**
- `/src/components/sections/Hero.tsx` (line 32)
- `/src/app/services/page.tsx` (lines 54, 57)

## Proposed Solution
Add to Tailwind config:

```javascript
// tailwind.config.ts
theme: {
  extend: {
    textShadow: {
      'hero': '3px 3px 6px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5)',
    }
  }
}
```

Then use: `className="text-shadow-hero"`

## Impact
- **Lines saved:** ~5 lines per usage
- **Benefit:** Removes inline styles, consistent text shadow across heroes
- **Maintainability:** Single place to update hero text effects

## Files to Modify
- `/tailwind.config.ts`
