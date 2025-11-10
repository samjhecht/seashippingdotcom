---
id: 020
title: Fix React act() Warnings in Header Component Tests
phase: maintenance
priority: medium
status: todo
dependencies: []
estimated_hours: 1
tags: [bugfix, testing, react]
---

# Fix React act() Warnings in Header Component Tests

## Objective
Fix React Testing Library warnings about state updates not being wrapped in `act()` in the Header component tests.

## Issues Found

From test output:
```
An update to Header inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */
```

## Requirements
- Properly wrap state updates in `act()`
- Ensure all asynchronous updates are handled correctly
- Use `waitFor` when appropriate
- Maintain test accuracy and coverage
- Follow React Testing Library best practices

## Implementation Steps

1. **Identify problematic tests**
   - Review all Header.test.tsx tests
   - Find tests with state updates (menu open/close, scroll behavior)

2. **Fix async operations**
   - Use `userEvent` API properly (already async)
   - Add `waitFor` for DOM updates
   - Use `findBy*` queries instead of `getBy*` for async elements

3. **Fix scroll event tests**
   - Properly handle scroll event state updates
   - Use `act()` when manually triggering scroll events

4. **Verify fixes**
   - Run tests and ensure no act() warnings
   - Ensure all tests still pass
   - Maintain 100% coverage on Header component

## Example Fix

Before:
```typescript
fireEvent.scroll(window, { target: { scrollY: 150 } });
expect(header).toHaveClass('sticky');
```

After:
```typescript
await act(async () => {
  fireEvent.scroll(window, { target: { scrollY: 150 } });
});
await waitFor(() => {
  expect(header).toHaveClass('sticky');
});
```

## Acceptance Criteria
- ✅ No React act() warnings in test output
- ✅ All 55 Header tests still passing
- ✅ Test coverage maintained at 100%
- ✅ Tests run without console errors/warnings
