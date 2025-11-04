# Testing Infrastructure

This project uses a comprehensive testing infrastructure following TDD principles and the testing pyramid approach.

## Test Stack

- **Vitest** - Unit and integration testing
- **React Testing Library** - Component testing
- **Playwright** - End-to-end testing
- **axe-core** - Accessibility testing
- **@vitest/coverage-v8** - Code coverage reporting

## Test Structure

```
__tests__/
├── unit/               # Unit tests (70% of tests)
│   ├── components/     # Component tests
│   ├── lib/            # Utility function tests
│   └── hooks/          # Custom hook tests
├── integration/        # Integration tests (20% of tests)
│   ├── api/            # API integration tests
│   └── features/       # Feature integration tests
├── e2e/                # End-to-end tests (10% of tests)
│   ├── journeys/       # User journey tests
│   └── visual/         # Visual regression tests
├── utils/              # Test utilities
├── fixtures/           # Mock data and fixtures
└── setup.ts            # Global test setup
```

## Running Tests

### Unit Tests
```bash
npm test                 # Run tests in watch mode
npm run test:unit        # Run unit tests with coverage
npm run test:watch       # Run tests in watch mode
```

### Integration Tests
```bash
npm run test:integration # Run integration tests
```

### End-to-End Tests
```bash
npm run test:e2e         # Run E2E tests
npm run test:e2e:ui      # Run E2E tests with UI
npm run test:a11y        # Run accessibility tests only
```

### Coverage
```bash
npm run test:coverage    # Generate coverage report
```

### All Tests
```bash
npm run test:all         # Run all tests sequentially
```

## Coverage Requirements

- Overall coverage: 80%
- Validation functions: 100%
- Per-file coverage tracking enabled

Coverage reports are generated in:
- `coverage/` - HTML and LCOV reports
- Console output after running tests

## Writing Tests

### AAA Pattern
All tests should follow the Arrange-Act-Assert pattern:

```typescript
it('should do something', () => {
  // Arrange - Setup test data and preconditions
  const input = 'test';

  // Act - Execute the code under test
  const result = myFunction(input);

  // Assert - Verify the outcome
  expect(result).toBe('expected');
});
```

### React Testing Library Query Priority

1. `getByRole` - Preferred for accessibility
2. `getByLabelText` - Form elements
3. `getByText` - Non-interactive elements
4. `getByTestId` - Last resort only

### Component Testing Example

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '../../utils/test-utils';
import { MyComponent } from '@/components/MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByRole('heading')).toHaveTextContent('Test');
  });
});
```

### E2E Testing Example

```typescript
import { test, expect } from '@playwright/test';

test('user can complete booking', async ({ page }) => {
  await page.goto('/booking');
  await page.fill('[name="origin"]', 'Shanghai');
  await page.fill('[name="destination"]', 'Los Angeles');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/booking/confirmation');
});
```

## Accessibility Testing

All E2E tests with the `@a11y` tag will run accessibility checks using axe-core:

```typescript
test('should not have accessibility violations @a11y', async ({ page }) => {
  await page.goto('/');
  await injectAxe(page);
  await checkA11y(page);
});
```

Run accessibility tests:
```bash
npm run test:a11y
```

## Mobile-First Testing

Playwright is configured to prioritize mobile testing:

- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)
- Desktop Chrome
- Desktop Firefox
- Desktop Safari
- Desktop Edge
- Tablet (iPad Pro)

## Test Utilities

### Custom Render Function
Use the custom render from `utils/test-utils.tsx` for consistent component testing with providers.

### Mock Data Factories
Use factory functions from `fixtures/mock-data.ts` to create test data:

```typescript
import { createMockBooking } from '../../fixtures/mock-data';

const booking = createMockBooking({ origin: 'Shanghai' });
```

## CI/CD Integration

Tests are configured to run differently in CI:
- Retries: 2 (CI only)
- Workers: 1 (CI) vs unlimited (local)
- Video/screenshots: On failure only

## Best Practices

1. Keep tests focused and isolated
2. Use descriptive test names
3. Mock external dependencies
4. Avoid testing implementation details
5. Test user behavior, not internal state
6. Keep tests fast and independent
7. Follow the testing pyramid (70% unit, 20% integration, 10% E2E)

## Debugging Tests

### Vitest UI
```bash
npm test -- --ui
```

### Playwright UI Mode
```bash
npm run test:e2e:ui
```

### Playwright Debug Mode
```bash
npx playwright test --debug
```

## Troubleshooting

### Tests not finding modules
Check path aliases in `vitest.config.ts` and use relative imports in test files.

### Browser not launching (Playwright)
Reinstall browsers:
```bash
npx playwright install
```

### Coverage too low
Run coverage report to see uncovered lines:
```bash
npm run test:coverage
```

## Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
