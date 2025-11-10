---
id: 002
title: Setup Testing Infrastructure (Vitest, Playwright, RTL)
phase: 1
priority: critical
status: todo
dependencies: [001]
estimated_hours: 4
tags: [testing, infrastructure, tdd, vitest, playwright]
---

# Setup Testing Infrastructure

## Objective
Establish comprehensive testing infrastructure with Vitest for unit/integration tests and Playwright for E2E tests, following TDD principles.

## Requirements
- Vitest for unit and integration tests
- React Testing Library for component testing
- Playwright for E2E testing
- axe-core for accessibility testing
- Coverage reporting configured
- Test utilities and helpers

## Implementation Steps

1. **Install Vitest and Testing Dependencies**
   ```bash
   npm install -D vitest @vitejs/plugin-react jsdom
   npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
   npm install -D @vitest/ui @vitest/coverage-v8
   ```

2. **Configure Vitest**
   - Create `vitest.config.ts` with Next.js compatibility
   - Setup test environment (jsdom)
   - Configure path aliases to match tsconfig
   - Setup coverage thresholds (80% overall, 100% for validations)

3. **Install Playwright**
   ```bash
   npm install -D @playwright/test
   npx playwright install
   ```

4. **Configure Playwright**
   - Create `playwright.config.ts`
   - Configure mobile-first device emulation
   - Setup browser matrix (Chrome, Firefox, Safari, Edge)
   - Configure test reporters

5. **Install Accessibility Testing Tools**
   ```bash
   npm install -D axe-core axe-playwright @axe-core/playwright
   npm install -D pa11y
   ```

6. **Create Test Directory Structure**
   ```
   __tests__/
   ├── unit/
   │   ├── components/
   │   ├── lib/
   │   └── hooks/
   ├── integration/
   │   ├── api/
   │   └── features/
   └── e2e/
       ├── journeys/
       └── visual/
   ```

7. **Create Test Utilities**
   - Custom render function with providers
   - Mock data factories
   - Test helpers for common operations
   - Accessibility testing utilities

8. **Add Test Scripts to package.json**
   ```json
   {
     "scripts": {
       "test": "vitest",
       "test:unit": "vitest run --coverage",
       "test:integration": "vitest run --config vitest.integration.config.ts",
       "test:e2e": "playwright test",
       "test:e2e:ui": "playwright test --ui",
       "test:a11y": "playwright test --grep @a11y",
       "test:coverage": "vitest run --coverage",
       "test:watch": "vitest watch"
     }
   }
   ```

## Testing Requirements
- All test commands run successfully
- Sample test passes in each category (unit, integration, e2e)
- Coverage reporting works
- Playwright can launch all browsers
- Accessibility testing utilities work

## Acceptance Criteria
- ✅ Vitest configured and running
- ✅ React Testing Library integrated
- ✅ Playwright installed with all browsers
- ✅ Coverage reporting configured (80% threshold)
- ✅ Test directory structure created
- ✅ Test utilities and helpers created
- ✅ Sample tests passing in all categories
- ✅ Accessibility testing tools configured
- ✅ All test scripts working in package.json

## Notes
- Follow the testing pyramid: 70% unit, 20% integration, 10% E2E
- All tests should follow AAA pattern (Arrange, Act, Assert)
- Use React Testing Library queries priority (role > label > text > testid)
- Mobile-first testing approach for E2E tests
