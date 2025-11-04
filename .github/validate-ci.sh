#!/bin/bash

# CI/CD Setup Validation Script
# This script validates that all CI/CD components are properly configured

set -e

echo "==================================="
echo "CI/CD Setup Validation"
echo "==================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check function
check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $1"
        return 0
    else
        echo -e "${RED}✗${NC} $1"
        return 1
    fi
}

warn() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# 1. Check Husky installation
echo "Checking Husky installation..."
[ -d ".husky" ] && [ -f ".husky/pre-commit" ]
check "Husky directory and pre-commit hook exist"

# 2. Check lint-staged configuration
echo ""
echo "Checking lint-staged configuration..."
[ -f ".lintstagedrc.js" ]
check "lint-staged configuration file exists"

# 3. Check Lighthouse CI configuration
echo ""
echo "Checking Lighthouse CI configuration..."
[ -f "lighthouserc.js" ]
check "Lighthouse CI configuration file exists"

# 4. Check GitHub Actions workflows
echo ""
echo "Checking GitHub Actions workflows..."
[ -f ".github/workflows/ci.yml" ]
check "Main CI workflow exists"

[ -f ".github/workflows/lighthouse.yml" ]
check "Lighthouse CI workflow exists"

# 5. Check documentation
echo ""
echo "Checking documentation..."
[ -f ".github/BRANCH_PROTECTION.md" ]
check "Branch protection documentation exists"

[ -f ".github/CI_CD_README.md" ]
check "CI/CD README exists"

# 6. Check package.json scripts
echo ""
echo "Checking package.json scripts..."
grep -q '"lint":' package.json
check "Lint script exists"

grep -q '"type-check":' package.json
check "Type-check script exists"

grep -q '"test:unit":' package.json
check "Unit test script exists"

grep -q '"test:integration":' package.json
check "Integration test script exists"

grep -q '"test:e2e":' package.json
check "E2E test script exists"

grep -q '"test:a11y":' package.json
check "Accessibility test script exists"

grep -q '"prepare":.*"husky"' package.json
check "Husky prepare script exists"

# 7. Check dependencies
echo ""
echo "Checking dependencies..."
grep -q '"husky":' package.json
check "Husky dependency installed"

grep -q '"lint-staged":' package.json
check "lint-staged dependency installed"

grep -q '"@lhci/cli":' package.json
check "Lighthouse CI dependency installed"

# 8. Check Node version
echo ""
echo "Checking Node.js version..."
NODE_VERSION=$(node -v)
echo "Current Node.js version: $NODE_VERSION"
if [[ "$NODE_VERSION" =~ ^v20 ]]; then
    check "Node.js 20.x is installed (matches CI environment)"
else
    warn "Node.js version mismatch - CI uses v20.x, local is $NODE_VERSION"
fi

# 9. Validate workflow syntax
echo ""
echo "Validating workflow YAML syntax..."
if command -v yamllint &> /dev/null; then
    yamllint .github/workflows/ci.yml 2>&1 | grep -q "error" && echo -e "${RED}✗${NC} CI workflow has YAML errors" || check "CI workflow YAML is valid"
    yamllint .github/workflows/lighthouse.yml 2>&1 | grep -q "error" && echo -e "${RED}✗${NC} Lighthouse workflow has YAML errors" || check "Lighthouse workflow YAML is valid"
else
    warn "yamllint not installed - skipping YAML validation"
    echo "  Install with: pip install yamllint"
fi

# 10. Test pre-commit hook
echo ""
echo "Testing pre-commit hook..."
if [ -x ".husky/pre-commit" ]; then
    check "Pre-commit hook is executable"
else
    echo -e "${RED}✗${NC} Pre-commit hook is not executable"
    echo "  Fix with: chmod +x .husky/pre-commit"
fi

# Summary
echo ""
echo "==================================="
echo "Validation Complete"
echo "==================================="
echo ""
echo "Next steps:"
echo "1. Review any warnings or errors above"
echo "2. Commit and push changes to trigger CI"
echo "3. Configure branch protection rules (see .github/BRANCH_PROTECTION.md)"
echo "4. Add CODECOV_TOKEN to GitHub Secrets"
echo "5. Monitor first CI run for any issues"
echo ""
echo "For more information, see:"
echo "- .github/CI_CD_README.md"
echo "- .github/BRANCH_PROTECTION.md"
echo ""
