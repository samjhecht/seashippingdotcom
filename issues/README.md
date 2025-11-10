# Sea Shipping Line Website - Implementation Plan

This directory contains a comprehensive, step-by-step implementation plan for rebuilding the Sea Shipping Line website using modern technologies with a mobile-first, TDD approach.

## Overview

**Project Type:** Complete website rebuild and modernization
**Current Site:** WordPress 6.8.3 with Elementor
**New Stack:** Next.js 14+, TypeScript, Tailwind CSS, shadcn/ui
**Approach:** Mobile-first, Test-Driven Development (TDD)
**Timeline:** ~7-8 weeks

## Key Priorities

1. **Mobile-First Design** - Critical for on-the-go shipping professionals
2. **Test-Driven Development** - 80%+ coverage, 100% for business-critical code
3. **Accessibility** - WCAG 2.1 AA compliance (mandatory)
4. **Performance** - Lighthouse scores >90 mobile, >95 desktop
5. **SEO Preservation** - Maintain search rankings during migration

## Implementation Phases

### Phase 1: Foundation & Infrastructure (Week 1-2)

| Issue | Title | Priority | Est. Hours | Dependencies |
|-------|-------|----------|------------|--------------|
| [001](001-project-initialization.md) | Initialize Next.js Project with TypeScript | Critical | 2 | - |
| [002](002-testing-infrastructure-setup.md) | Setup Testing Infrastructure (Vitest, Playwright, RTL) | Critical | 4 | 001 |
| [003](003-ci-cd-pipeline-setup.md) | Setup CI/CD Pipeline with GitHub Actions | High | 3 | 002 |

**Focus:** Establish solid foundation with testing infrastructure and CI/CD
**Deliverables:** Project initialized, all tests passing, CI/CD pipeline active

### Phase 2: Design System & Components (Week 2-3)

| Issue | Title | Priority | Est. Hours | Dependencies |
|-------|-------|----------|------------|--------------|
| [004](004-tailwind-design-tokens.md) | Configure Tailwind CSS with Mobile-First Design Tokens | High | 3 | 001 |
| [005](005-shadcn-ui-setup.md) | Install and Configure shadcn/ui Component Library | High | 2 | 004 |
| [006](006-header-component-tdd.md) | Create Header Component with Mobile-First Navigation (TDD) | Critical | 6 | 005 |
| [007](007-footer-component-tdd.md) | Create Footer Component (TDD) | High | 4 | 005 |

**Focus:** Build design system foundation and core layout components
**Deliverables:** Design tokens configured, header/footer components tested and working

### Phase 3: Core Pages (Week 3-4)

| Issue | Title | Priority | Est. Hours | Dependencies |
|-------|-------|----------|------------|--------------|
| [008](008-homepage-implementation.md) | Implement Homepage with Mobile-First Design (TDD) | Critical | 8 | 006, 007 |
| [009](009-services-pages-implementation.md) | Implement Services Pages with Dynamic Routes (TDD) | Critical | 10 | 008 |

**Focus:** Build all main content pages with mobile-first approach
**Deliverables:** Homepage, services, resources, network pages tested and responsive

### Phase 4: Forms & Validation (Week 5)

| Issue | Title | Priority | Est. Hours | Dependencies |
|-------|-------|----------|------------|--------------|
| [010](010-validation-schemas-tdd.md) | Create Form Validation Schemas with Zod (TDD - 100% Coverage) | Critical | 4 | 001 |
| [011](011-form-components-tdd.md) | Build Form Components with React Hook Form (TDD) | Critical | 8 | 010 |
| [012](012-api-routes-forms.md) | Implement API Routes for Form Submissions (TDD) | Critical | 6 | 010, 011 |

**Focus:** Business-critical form functionality with comprehensive testing
**Deliverables:** All forms working with 100% validation coverage, API routes tested

### Phase 5: Content & Assets (Week 5-6)

| Issue | Title | Priority | Est. Hours | Dependencies |
|-------|-------|----------|------------|--------------|
| [013](013-content-migration-assets.md) | Content Migration and Asset Optimization | High | 8 | 009 |

**Focus:** Migrate and optimize all content from WordPress
**Deliverables:** All content migrated, images optimized, documents accessible

### Phase 6: Integrations (Week 6)

| Issue | Title | Priority | Est. Hours | Dependencies |
|-------|-------|----------|------------|--------------|
| [014](014-google-analytics-integration.md) | Google Analytics 4 Integration | High | 3 | 001 |

**Focus:** External service integrations and analytics
**Deliverables:** GA4 tracking working, all events captured

### Phase 7: Testing & Quality (Week 6-7)

| Issue | Title | Priority | Est. Hours | Dependencies |
|-------|-------|----------|------------|--------------|
| [015](015-accessibility-audit-fixes.md) | Comprehensive Accessibility Audit and Fixes | Critical | 12 | 008, 009, 011 |
| [016](016-performance-optimization.md) | Performance Optimization and Lighthouse Targets | Critical | 8 | 008, 009, 013, 014 |

**Focus:** Accessibility and performance optimization
**Deliverables:** WCAG 2.1 AA compliant, Lighthouse scores met

### Phase 8: Polish & Launch (Week 7-8)

| Issue | Title | Priority | Est. Hours | Dependencies |
|-------|-------|----------|------------|--------------|
| [017](017-deployment-setup.md) | Production Deployment Setup and Configuration | Critical | 6 | 015, 016 |
| [018](018-final-qa-launch.md) | Final QA, Testing, and Production Launch | Critical | 16 | 017 |

**Focus:** Final testing, deployment, and production launch
**Deliverables:** Site live in production, monitoring active, no critical issues

## Success Metrics

### Technical Excellence
- ✅ **80%+ overall test coverage** (100% for validation logic)
- ✅ **Zero TypeScript errors** (strict mode)
- ✅ **Zero accessibility violations** (WCAG 2.1 AA)
- ✅ **Lighthouse mobile > 90**, desktop > 95
- ✅ **All tests passing in CI/CD**

### Mobile Experience
- ✅ **Perfect mobile usability** (tested on real devices)
- ✅ **Touch-friendly UI** (44x44px minimum)
- ✅ **Fast mobile load times** (< 2s FCP on 4G)
- ✅ **One-handed navigation** (thumb-zone optimization)

### Business Goals
- ✅ **All content preserved** from WordPress site
- ✅ **All forms functional** with email notifications
- ✅ **SEO maintained/improved** from current site
- ✅ **All regulatory info displayed** prominently

## Getting Started

1. **Start with Phase 1** - Foundation is critical
2. **Follow TDD** - Write tests first, always
3. **Mobile-first** - Design and build for mobile before desktop
4. **Test continuously** - Run tests locally and in CI/CD
5. **Document as you go** - Help future maintainers

## Issue Format

Each issue follows this structure:
- **Objective**: What needs to be accomplished
- **Requirements**: Specific requirements and constraints
- **Implementation Steps**: Detailed TDD approach
- **Testing Requirements**: Test coverage and quality gates
- **Acceptance Criteria**: Definition of done
- **Notes**: Additional context and considerations

## Dependencies Graph

```
001 (Init)
 ├─ 002 (Testing)
 │   └─ 003 (CI/CD)
 ├─ 004 (Tailwind)
 │   └─ 005 (shadcn/ui)
 │       ├─ 006 (Header)
 │       │   └─ 008 (Homepage)
 │       │       └─ 009 (Services)
 │       │           └─ 013 (Content)
 │       └─ 007 (Footer)
 ├─ 010 (Validation)
 │   ├─ 011 (Forms)
 │   │   └─ 012 (API Routes)
 │   └─ 014 (Analytics)
 └─ 015 (Accessibility) + 016 (Performance)
     └─ 017 (Deployment)
         └─ 018 (Launch)
```

## Testing Strategy

### Test Pyramid Distribution
- **70% Unit Tests** - Fast, isolated component/function tests
- **20% Integration Tests** - API routes, form flows, data interactions
- **10% E2E Tests** - Critical user journeys, smoke tests

### Coverage Requirements
- **Overall**: 80% minimum
- **Validation Logic**: 100% (business-critical)
- **Forms**: 90% (business-critical)
- **Components**: 85%
- **Utilities**: 90%

## Tech Stack Summary

### Core
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui

### Forms & Validation
- **Forms**: React Hook Form
- **Validation**: Zod
- **reCAPTCHA**: React Google reCAPTCHA

### Testing
- **Unit**: Vitest + React Testing Library
- **E2E**: Playwright
- **Accessibility**: axe-core, pa11y
- **Coverage**: Vitest Coverage

### Integrations
- **Analytics**: Google Analytics 4
- **Email**: Resend (or SendGrid)
- **Monitoring**: Sentry (error tracking)
- **Deployment**: Vercel

## Important Notes

### Content Preservation
All existing content must be preserved exactly as written for regulatory and business continuity.

### Form Functionality
Email delivery for forms is business-critical. Robust error handling and confirmation required.

### Analytics Continuity
Use existing GA4 tracking ID (G-V0F46NZK7J) to preserve historical data.

### Regulatory Information
Must prominently display:
- OTI#: 010787
- SCAC: AAGP
- SVI#: ASACON03285
- DOT#: 3978374
- MC#: 1488768
- Customs Filer Code: DBK
- C-TPAT Certification

## Support

For questions or issues with this implementation plan:
1. Review the detailed specification in `/specifications/seashipping_website.md`
2. Check individual issue files for detailed implementation guidance
3. Follow TDD principles - tests should guide development
4. Mobile-first approach is mandatory, not optional

## Version History

- **v2.0** - January 29, 2025 - Added mobile-first and TDD requirements
- **v1.0** - Initial specification and implementation plan

---

**Total Estimated Hours**: ~96 hours (12 full days)
**Recommended Timeline**: 7-8 weeks (allowing for testing, reviews, and iterations)
**Team Size**: 1-2 developers (full-stack with strong frontend skills)
