---
id: 019
title: Fix TypeScript Strict Mode Violations (Unused Imports/Variables)
phase: maintenance
priority: high
status: todo
dependencies: []
estimated_hours: 1
tags: [bugfix, typescript, code-quality]
---

# Fix TypeScript Strict Mode Violations

## Objective
Fix all TypeScript strict mode violations related to unused imports and variables throughout the codebase.

## Issues Found

From `npm run type-check`:

```
__tests__/e2e/journeys/homepage.spec.ts(13,51): error TS6133: 'page' is declared but its value is never read.
__tests__/integration/features/booking-flow.test.tsx(2,1): error TS6192: All imports in import declaration are unused.
__tests__/unit/components/layout/Footer.test.tsx(2,26): error TS6133: 'within' is declared but its value is never read.
__tests__/utils/accessibility.ts(1,1): error TS6133: 'expect' is declared but its value is never read.
```

## Requirements
- Remove all unused imports
- Remove all unused variables
- Ensure `npm run type-check` passes with zero errors
- Maintain test functionality
- Follow TypeScript strict mode best practices

## Implementation Steps

1. **Fix homepage.spec.ts**
   - Remove unused `page` parameter or use it in the test

2. **Fix booking-flow.test.tsx**
   - Remove unused imports or implement the test

3. **Fix Footer.test.tsx**
   - Remove unused `within` import

4. **Fix accessibility.ts**
   - Remove unused `expect` import

5. **Verify all fixes**
   - Run `npm run type-check` and ensure zero errors
   - Run `npm run test:unit` to ensure no tests broke
   - Run `npm run build` to ensure build still succeeds

## Acceptance Criteria
- ✅ `npm run type-check` passes with zero errors
- ✅ All tests still passing
- ✅ Build succeeds
- ✅ No functionality broken
