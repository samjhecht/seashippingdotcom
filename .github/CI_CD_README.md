# CI/CD Pipeline Documentation

This document provides an overview of the CI/CD pipeline for the Sea Shipping Line website.

## Overview

The CI/CD pipeline is built using GitHub Actions and includes:

- Automated testing (unit, integration, E2E, accessibility)
- Code quality checks (linting, type checking)
- Build verification
- Performance monitoring with Lighthouse CI
- Pre-commit hooks for local validation
- Coverage reporting

## Workflows

### Main CI Workflow (`ci.yml`)

Runs on every push and pull request to `main` and `develop` branches.

#### Jobs

1. **Lint** - Runs ESLint to catch code quality issues
2. **Type Check** - Validates TypeScript types
3. **Unit Tests** - Runs unit tests with coverage reporting
4. **Integration Tests** - Runs integration tests
5. **Build** - Builds the Next.js application and creates artifacts
6. **E2E Tests** - Runs Playwright end-to-end tests
7. **Accessibility Tests** - Runs accessibility tests with axe-core
8. **CI Success** - Summary job that ensures all checks passed

#### Optimizations

- **Parallel Execution**: Independent jobs run in parallel
- **Dependency Caching**: NPM packages are cached between runs
- **Artifact Sharing**: Build artifacts are shared to avoid rebuilding
- **Concurrency Control**: Cancels outdated runs for the same branch
- **Fast Failure**: Critical errors stop execution early

### Lighthouse CI Workflow (`lighthouse.yml`)

Runs on pull requests to monitor web performance.

#### Features

- Performance audits using Lighthouse
- Core Web Vitals monitoring
- Resource budget enforcement
- Automated PR comments with scores
- Historical result tracking

#### Performance Budgets

Configured in `lighthouserc.js`:

- Performance: 90+ score
- Accessibility: 95+ score
- Best Practices: 90+ score
- SEO: 90+ score
- LCP: < 2.5s
- CLS: < 0.1
- FCP: < 2.0s
- TBT: < 300ms

## Pre-commit Hooks

### Husky + lint-staged

Automatically runs on `git commit`:

1. Runs ESLint with auto-fix
2. Formats code with Prettier
3. Type-checks TypeScript files
4. Ensures code quality before commit

### Configuration

See `.lintstagedrc.js` for the complete configuration.

### Bypassing Hooks

In emergencies, you can bypass hooks with:

```bash
git commit --no-verify -m "emergency fix"
```

**Note**: This should be used sparingly as it bypasses quality checks.

## Running Tests Locally

### All Tests

```bash
npm run test:all
```

### Individual Test Suites

```bash
# Unit tests with coverage
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# E2E tests with UI
npm run test:e2e:ui

# Accessibility tests
npm run test:a11y

# Watch mode for development
npm run test:watch
```

### Code Quality

```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Build verification
npm run build
```

## CI Pipeline Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     Push/PR Created                         │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                 Parallel Job Execution                      │
├─────────────┬──────────┬──────────┬───────────┬─────────────┤
│    Lint     │   Type   │   Unit   │Integration│    Build    │
│             │  Check   │  Tests   │   Tests   │             │
└─────────────┴──────────┴──────────┴───────────┴──────┬──────┘
                                                        │
                      ┌─────────────────────────────────┘
                      │
                      ▼
      ┌───────────────────────────────────┐
      │    Build Artifacts Created        │
      └───────────┬───────────────────────┘
                  │
      ┌───────────┴───────────┐
      │                       │
      ▼                       ▼
┌─────────────┐      ┌──────────────────┐
│  E2E Tests  │      │ Accessibility    │
│             │      │     Tests        │
└─────────────┘      └──────────────────┘
      │                       │
      └───────────┬───────────┘
                  │
                  ▼
      ┌───────────────────────┐
      │    CI Success         │
      │   (Summary Job)       │
      └───────────────────────┘
```

## Coverage Reporting

### Codecov Integration

- Unit test coverage is automatically uploaded to Codecov
- Coverage reports appear in PR comments
- Historical coverage trends are tracked
- Diff coverage shows impact of changes

### Setting Up Codecov

1. Sign up at https://codecov.io/
2. Add your repository
3. Copy the token
4. Add `CODECOV_TOKEN` to GitHub Secrets
5. Coverage will be uploaded on next CI run

### Viewing Coverage

- **Online**: Visit https://codecov.io/gh/samjhecht/seashippingdotcom
- **Locally**: Run `npm run test:coverage` and open `coverage/index.html`

## Lighthouse CI Setup

### Configuration

Performance budgets and assertions are defined in `lighthouserc.js`.

### Running Locally

```bash
# Build the app
npm run build

# Start the production server
npm start

# In another terminal, run Lighthouse CI
npx lhci autorun
```

### Interpreting Results

- **Green**: Metrics pass all budgets
- **Yellow**: Warning - approaching budget limits
- **Red**: Failed - exceeds performance budgets

## Troubleshooting

### Common Issues

#### CI Fails on Type Checking

- Ensure all TypeScript errors are fixed locally
- Run `npm run type-check` to verify
- Check for missing type definitions

#### E2E Tests Timeout

- Increase timeout in `playwright.config.ts`
- Check for slow network requests
- Verify test stability locally

#### Build Fails in CI

- Ensure all dependencies are in `dependencies` (not `devDependencies`)
- Check for environment-specific issues
- Verify `npm ci` works locally

#### Pre-commit Hook Slow

- Comment out test execution in `.lintstagedrc.js`
- Focus on linting and formatting only
- Run tests separately

### Debug Mode

Enable debug mode for GitHub Actions:

1. Go to Settings > Secrets and variables > Actions
2. Add `ACTIONS_RUNNER_DEBUG` = `true`
3. Add `ACTIONS_STEP_DEBUG` = `true`

### Viewing Artifacts

Failed run artifacts can be downloaded from:

1. Go to Actions tab
2. Select the workflow run
3. Scroll to Artifacts section
4. Download relevant artifacts (test reports, screenshots, etc.)

## Performance Tips

### Speed Up CI

1. **Reduce Test Duration**: Focus on critical paths
2. **Increase Parallelism**: Split large test suites
3. **Optimize Dependencies**: Remove unused packages
4. **Use Matrix Builds**: Test multiple versions if needed
5. **Cache Aggressively**: Cache more build outputs

### Local Development

1. **Use Watch Mode**: `npm run test:watch` for rapid feedback
2. **Run Specific Tests**: `npm run test -- path/to/test`
3. **Skip E2E Locally**: E2E tests are slow, rely on CI
4. **Leverage Pre-commit**: Catch issues before pushing

## Best Practices

### Writing Tests

1. Keep tests fast and focused
2. Avoid flaky tests (use proper waits, not timeouts)
3. Mock external dependencies
4. Use descriptive test names
5. Group related tests

### Maintaining CI

1. Review workflow runs regularly
2. Update dependencies monthly
3. Monitor CI duration trends
4. Optimize slow jobs
5. Keep workflows simple and readable

### Pull Request Workflow

1. Create feature branch from `main`
2. Make changes and commit (pre-commit hooks run)
3. Push to GitHub
4. Create pull request
5. CI runs automatically
6. Address any failures
7. Request review once CI passes
8. Merge after approval

## Monitoring

### GitHub Actions

- View workflow runs: Repository > Actions tab
- Monitor success rates and duration
- Set up notifications for failures

### Metrics to Track

1. **CI Duration**: Keep under 10 minutes
2. **Success Rate**: Aim for >95%
3. **Test Coverage**: Maintain or improve
4. **Lighthouse Scores**: Monitor trends
5. **Flaky Tests**: Identify and fix

## Future Enhancements

Potential improvements to consider:

1. **Deployment Pipeline**: Auto-deploy to staging/production
2. **Visual Regression**: Screenshot comparison tests
3. **Security Scanning**: Dependency vulnerability checks
4. **Bundle Analysis**: Track bundle size over time
5. **Performance Budgets**: Stricter LCP/FID budgets
6. **Canary Deployments**: Gradual rollout strategy
7. **A/B Testing**: Feature flag integration

## Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Lighthouse CI Docs](https://github.com/GoogleChrome/lighthouse-ci)
- [Playwright Docs](https://playwright.dev/)
- [Vitest Docs](https://vitest.dev/)
- [Codecov Docs](https://docs.codecov.com/)
- [Husky Docs](https://typicode.github.io/husky/)

## Support

For issues or questions:

1. Check this documentation
2. Review workflow logs in GitHub Actions
3. Search existing issues
4. Create a new issue with relevant details
