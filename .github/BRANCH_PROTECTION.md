# Branch Protection Rules

This document outlines the recommended branch protection rules for the Sea Shipping Line website project.

## Main Branch Protection

The `main` branch should have the following protection rules enabled:

### Required Status Checks

All the following checks must pass before merging:

1. **CI Success** - The summary job from the CI workflow that ensures all tests pass
2. **Lint** - ESLint checks pass
3. **Type Check** - TypeScript type checking passes
4. **Unit Tests** - All unit tests pass with coverage
5. **Integration Tests** - All integration tests pass
6. **Build** - Application builds successfully
7. **E2E Tests** - End-to-end tests pass
8. **Accessibility Tests** - Accessibility tests pass

### Configuration Steps

To configure these rules in GitHub:

1. Go to **Settings** > **Branches**
2. Click **Add branch protection rule**
3. Set **Branch name pattern** to `main`
4. Enable the following options:

#### Require a pull request before merging
- ✅ Enable
- Require approvals: **1** (minimum)
- ✅ Dismiss stale pull request approvals when new commits are pushed
- ✅ Require review from Code Owners (optional, if CODEOWNERS file exists)

#### Require status checks to pass before merging
- ✅ Enable
- ✅ Require branches to be up to date before merging
- Select the following status checks:
  - `CI Success` (from ci.yml workflow)
  - `Lint` (from ci.yml workflow)
  - `Type Check` (from ci.yml workflow)
  - `Unit Tests` (from ci.yml workflow)
  - `Integration Tests` (from ci.yml workflow)
  - `Build` (from ci.yml workflow)
  - `E2E Tests` (from ci.yml workflow)
  - `Accessibility Tests` (from ci.yml workflow)

#### Require conversation resolution before merging
- ✅ Enable - All PR comments must be resolved

#### Require linear history
- ✅ Enable - Prevent merge commits

#### Include administrators
- ✅ Enable - Apply rules to administrators too

#### Restrict who can push to matching branches
- Optional: Configure if you want to limit who can push directly

#### Allow force pushes
- ❌ Disable - Never allow force pushes to main

#### Allow deletions
- ❌ Disable - Prevent accidental branch deletion

## Develop Branch Protection (Optional)

If using a `develop` branch for integration:

1. Set **Branch name pattern** to `develop`
2. Enable similar rules as `main`, but with relaxed requirements:
   - Require approvals: **0** or **1**
   - Status checks can be less strict
   - Allow squash merging

## Feature Branch Naming Convention

To keep branches organized, use the following naming conventions:

- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Critical production fixes
- `refactor/*` - Code refactoring
- `docs/*` - Documentation updates
- `test/*` - Test improvements

## CI/CD Pipeline Details

### Workflow Triggers

The CI workflow runs on:
- Every push to `main` or `develop` branches
- Every pull request targeting `main` or `develop`

### Performance Optimizations

1. **Parallel Execution**: Jobs run in parallel where possible
2. **Dependency Caching**: NPM dependencies are cached using `actions/cache`
3. **Artifact Sharing**: Build artifacts are shared between jobs to avoid rebuilding
4. **Concurrency Control**: Cancel in-progress runs for the same PR/branch
5. **Timeout Limits**: Each job has appropriate timeouts to prevent hanging

### Expected CI Duration

- **Lint**: ~1-2 minutes
- **Type Check**: ~1-2 minutes
- **Unit Tests**: ~3-5 minutes
- **Integration Tests**: ~3-5 minutes
- **Build**: ~3-5 minutes
- **E2E Tests**: ~5-10 minutes
- **Accessibility Tests**: ~3-5 minutes

**Total Expected Time**: ~8-10 minutes (with parallel execution)

### Lighthouse CI

The Lighthouse CI workflow runs only on pull requests and provides:
- Performance metrics
- Accessibility scores
- Best practices compliance
- SEO analysis
- Automated PR comments with results

### Pre-commit Hooks

Local pre-commit hooks using Husky and lint-staged ensure:
- Code is linted and formatted before commit
- TypeScript compiles without errors
- Basic quality checks pass locally

### Coverage Reporting

- Unit test coverage is uploaded to Codecov
- Coverage reports are available in PR comments
- Minimum coverage thresholds can be configured in Codecov settings

## Secrets Configuration

The following GitHub secrets should be configured:

### Required Secrets

- `CODECOV_TOKEN` - For uploading coverage reports to Codecov
  - Get from: https://codecov.io/gh/samjhecht/seashippingdotcom/settings

### Optional Secrets

- `LHCI_GITHUB_APP_TOKEN` - For Lighthouse CI GitHub App integration
  - Only needed if using persistent Lighthouse CI storage
  - Can use temporary public storage without this

## Local Testing

Before pushing, you can run all checks locally:

```bash
# Run all linting
npm run lint

# Run type checking
npm run type-check

# Run all tests
npm run test:all

# Run build
npm run build

# Test pre-commit hook
npx lint-staged
```

## Troubleshooting

### CI Fails but Local Passes

1. Ensure you're using Node.js 20 (same as CI)
2. Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
3. Check for environment-specific issues

### Pre-commit Hook Not Running

1. Ensure Husky is installed: `npx husky install`
2. Check hook file exists: `ls -la .husky/pre-commit`
3. Verify hook is executable: `chmod +x .husky/pre-commit`

### Lighthouse CI Fails

1. Check that the app builds successfully
2. Ensure performance budgets in `lighthouserc.js` are realistic
3. Review Lighthouse artifacts in GitHub Actions

## Maintenance

### Updating Dependencies

When updating dependencies:

1. Update package.json
2. Run `npm install`
3. Ensure all tests pass locally
4. Create a PR and verify CI passes

### Modifying CI Workflows

When modifying workflows:

1. Test changes in a feature branch
2. Validate YAML syntax using GitHub Actions linter
3. Monitor first run carefully for issues
4. Update this documentation if changing branch protection requirements

## Resources

- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [Husky Documentation](https://typicode.github.io/husky/)
