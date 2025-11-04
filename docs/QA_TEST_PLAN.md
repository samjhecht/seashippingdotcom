# QA Test Plan - SeaShipping.com

**Version:** 1.0
**Last Updated:** October 29, 2025
**Project:** SeaShipping.com Website Redesign
**Test Lead:** TBD

## Table of Contents
1. [Overview](#overview)
2. [Test Strategy](#test-strategy)
3. [Test Scope](#test-scope)
4. [Test Environments](#test-environments)
5. [Test Cases by Feature](#test-cases-by-feature)
6. [Test Execution Process](#test-execution-process)
7. [Bug Reporting](#bug-reporting)
8. [Sign-Off Criteria](#sign-off-criteria)

## Overview

### Purpose
This document outlines the comprehensive testing strategy and test cases for the SeaShipping.com website redesign. It covers functional testing, performance testing, accessibility testing, security testing, and user acceptance testing.

### Scope
Testing covers all pages, components, and functionality of the new Next.js-based website including:
- Homepage
- Services pages (7 service types)
- Forms (Rate Request, Contact, Newsletter)
- Navigation (Header, Footer, Mobile Menu)
- Content pages (Network, Resources, News)
- Analytics integration
- Performance and accessibility

### Testing Objectives
- Verify all functionality works as specified
- Ensure cross-browser and cross-device compatibility
- Validate performance targets are met
- Confirm accessibility standards (WCAG 2.1 Level AA)
- Verify security measures are in place
- Ensure excellent user experience

## Test Strategy

### Testing Levels

#### 1. Unit Testing
- **Tool:** Vitest
- **Coverage Target:** ≥80%
- **Focus:** Individual components, utilities, validation schemas
- **Automated:** Yes
- **Run Frequency:** On every commit (pre-commit hook)

#### 2. Integration Testing
- **Tool:** Vitest
- **Focus:** API routes, form submissions, data flow
- **Automated:** Yes
- **Run Frequency:** On every commit

#### 3. End-to-End Testing
- **Tool:** Playwright
- **Focus:** Complete user journeys, critical paths
- **Automated:** Yes
- **Run Frequency:** On PR creation, before deployment

#### 4. Accessibility Testing
- **Tools:** Playwright with axe-core, Pa11y
- **Focus:** WCAG 2.1 Level AA compliance
- **Automated:** Partial (manual verification required)
- **Run Frequency:** On PR creation, scheduled weekly

#### 5. Performance Testing
- **Tools:** Lighthouse CI, WebPageTest
- **Focus:** Core Web Vitals, load times, bundle size
- **Automated:** Yes
- **Run Frequency:** On PR creation, before deployment

#### 6. Manual Testing
- **Focus:** Visual regression, UX, edge cases
- **Automated:** No
- **Run Frequency:** Before each release

## Test Scope

### In Scope
- All pages and routes
- All forms and form validation
- Navigation functionality
- Responsive design (mobile, tablet, desktop)
- Cross-browser compatibility
- Accessibility features
- Performance optimization
- Analytics tracking
- SEO implementation
- Error handling

### Out of Scope
- Third-party service testing (SendGrid, Google Analytics)
- Infrastructure testing (Vercel platform)
- DNS configuration testing
- Email deliverability testing (SendGrid responsibility)

## Test Environments

### Development Environment
- **URL:** http://localhost:6969
- **Purpose:** Developer testing, unit/integration tests
- **Data:** Mock data, test fixtures

### Staging Environment
- **URL:** TBD (Vercel preview deployments)
- **Purpose:** Pre-production testing, UAT
- **Data:** Sanitized production-like data

### Production Environment
- **URL:** https://seashipping.com
- **Purpose:** Post-deployment smoke testing only
- **Data:** Real production data

## Test Cases by Feature

### Homepage Testing

#### Visual Tests
| Test ID | Test Case | Priority | Type |
|---------|-----------|----------|------|
| HP-V-001 | Hero section displays correctly with image | High | Manual |
| HP-V-002 | Logo displays at correct size and position | High | Manual |
| HP-V-003 | Typography matches design system | Medium | Manual |
| HP-V-004 | Brand colors are correctly applied | Medium | Manual |
| HP-V-005 | No layout shifts on page load (CLS < 0.1) | High | Auto |
| HP-V-006 | Responsive layout on mobile (375px) | High | Manual |
| HP-V-007 | Responsive layout on tablet (768px) | Medium | Manual |
| HP-V-008 | Responsive layout on desktop (1920px) | Medium | Manual |

#### Functionality Tests
| Test ID | Test Case | Priority | Type |
|---------|-----------|----------|------|
| HP-F-001 | Header navigation links work | High | Auto |
| HP-F-002 | "Request Rate" CTA navigates correctly | High | Auto |
| HP-F-003 | "View Services" CTA navigates correctly | High | Auto |
| HP-F-004 | Footer links work correctly | Medium | Auto |
| HP-F-005 | Mobile menu opens/closes correctly | High | Auto |
| HP-F-006 | Smooth scroll to sections works | Low | Manual |
| HP-F-007 | External links open in new tab | Medium | Manual |

#### Performance Tests
| Test ID | Test Case | Priority | Type |
|---------|-----------|----------|------|
| HP-P-001 | Page loads in < 2s on 4G (mobile) | High | Auto |
| HP-P-002 | Page loads in < 1s on cable (desktop) | High | Auto |
| HP-P-003 | FCP < 1.8s (mobile) | High | Auto |
| HP-P-004 | LCP < 2.5s (mobile) | High | Auto |
| HP-P-005 | TBT < 300ms (mobile) | High | Auto |
| HP-P-006 | No console errors | High | Auto |
| HP-P-007 | No 404 errors for assets | High | Auto |
| HP-P-008 | Images lazy load correctly | Medium | Manual |

#### Accessibility Tests
| Test ID | Test Case | Priority | Type |
|---------|-----------|----------|------|
| HP-A-001 | Skip to main content link works | High | Auto |
| HP-A-002 | All interactive elements keyboard accessible | High | Manual |
| HP-A-003 | Focus indicators visible and clear | High | Manual |
| HP-A-004 | Screen reader announces page correctly | High | Manual |
| HP-A-005 | Color contrast ratios pass WCAG AA (4.5:1) | High | Auto |
| HP-A-006 | All images have alt text | High | Auto |
| HP-A-007 | Headings follow proper hierarchy | Medium | Auto |
| HP-A-008 | Form labels properly associated | High | Auto |

#### SEO Tests
| Test ID | Test Case | Priority | Type |
|---------|-----------|----------|------|
| HP-S-001 | Title tag present and correct | High | Auto |
| HP-S-002 | Meta description present (150-160 chars) | High | Auto |
| HP-S-003 | Open Graph tags present | Medium | Auto |
| HP-S-004 | Twitter Card tags present | Medium | Auto |
| HP-S-005 | Canonical URL correctly set | High | Auto |
| HP-S-006 | Structured data (JSON-LD) valid | Medium | Manual |
| HP-S-007 | Robots meta tag correct | High | Manual |

### Services Pages Testing

#### Content Tests
| Test ID | Test Case | Priority | Type |
|---------|-----------|----------|------|
| SP-C-001 | All 7 service pages load correctly | High | Auto |
| SP-C-002 | Service titles display correctly | High | Auto |
| SP-C-003 | Service descriptions render properly | High | Auto |
| SP-C-004 | Features list displays correctly | High | Auto |
| SP-C-005 | Equipment types render properly | Medium | Auto |
| SP-C-006 | Images optimized and loading | Medium | Manual |
| SP-C-007 | Content matches specification | High | Manual |

#### Navigation Tests
| Test ID | Test Case | Priority | Type |
|---------|-----------|----------|------|
| SP-N-001 | Breadcrumbs display correctly | Medium | Auto |
| SP-N-002 | Breadcrumb links work | Medium | Auto |
| SP-N-003 | Links to other services work | Medium | Auto |
| SP-N-004 | "Back to Services" link works | Medium | Auto |
| SP-N-005 | "Request Rate" CTA works | High | Auto |

#### Dynamic Routes Tests
| Test ID | Test Case | Priority | Type |
|---------|-----------|----------|------|
| SP-D-001 | All service slugs resolve correctly | High | Auto |
| SP-D-002 | Invalid slug returns 404 | High | Auto |
| SP-D-003 | Static generation working | High | Auto |
| SP-D-004 | Metadata correct per service page | High | Auto |
| SP-D-005 | generateStaticParams generates all routes | High | Auto |

### Forms Testing

#### Rate Request Form Tests
| Test ID | Test Case | Priority | Type |
|---------|-----------|----------|------|
| FR-F-001 | All form fields render correctly | High | Auto |
| FR-F-002 | Required field validation works | High | Auto |
| FR-F-003 | Email format validation works | High | Auto |
| FR-F-004 | Phone format validation works | Medium | Auto |
| FR-F-005 | Message length validation (10-1000 chars) | Medium | Auto |
| FR-F-006 | Error messages display correctly | High | Auto |
| FR-F-007 | Success message displays after submit | High | Auto |
| FR-F-008 | Form resets after successful submission | High | Auto |
| FR-F-009 | Form submission sends email | High | Manual |
| FR-F-010 | Form submission tracks analytics event | Medium | Manual |
| FR-F-011 | Rate limiting prevents spam (5 per 15 min) | High | Manual |
| FR-F-012 | XSS protection prevents script injection | High | Manual |
| FR-F-013 | Form works with keyboard only | High | Manual |
| FR-F-014 | Form works with screen reader | High | Manual |

#### Mobile Form Tests
| Test ID | Test Case | Priority | Type |
|---------|-----------|----------|------|
| FR-M-001 | Single column layout on mobile | High | Manual |
| FR-M-002 | Touch targets are 44x44px minimum | High | Manual |
| FR-M-003 | Email keyboard appears for email field | High | Manual |
| FR-M-004 | Tel keyboard appears for phone field | Medium | Manual |
| FR-M-005 | Submit button easily accessible | High | Manual |
| FR-M-006 | Validation errors visible on mobile | High | Manual |
| FR-M-007 | Form doesn't zoom on iOS (font-size ≥16px) | High | Manual |

#### Contact Form Tests
| Test ID | Test Case | Priority | Type |
|---------|-----------|----------|------|
| FC-F-001 | All fields render correctly | High | Auto |
| FC-F-002 | Required validation works | High | Auto |
| FC-F-003 | Email validation works | High | Auto |
| FC-F-004 | Form submits successfully | High | Auto |
| FC-F-005 | Email notification sent | High | Manual |

#### Newsletter Form Tests
| Test ID | Test Case | Priority | Type |
|---------|-----------|----------|------|
| FN-S-001 | Subscribe form renders | High | Auto |
| FN-S-002 | Email validation works | High | Auto |
| FN-S-003 | Subscription success message displays | High | Auto |
| FN-U-001 | Unsubscribe form renders | Medium | Auto |
| FN-U-002 | Unsubscribe validates email | Medium | Auto |
| FN-U-003 | Unsubscribe success message displays | Medium | Auto |

### Navigation Testing

#### Header Navigation Tests
| Test ID | Test Case | Priority | Type |
|---------|-----------|----------|------|
| HN-D-001 | Desktop horizontal nav displays | High | Auto |
| HN-D-002 | All nav items work correctly | High | Auto |
| HN-D-003 | Active state indicates current page | Medium | Auto |
| HN-D-004 | Hover states work on desktop | Medium | Manual |
| HN-D-005 | Contact CTA button visible and works | High | Auto |
| HN-M-001 | Mobile menu icon displays | High | Auto |
| HN-M-002 | Mobile menu opens on click | High | Auto |
| HN-M-003 | Mobile menu closes on item click | High | Auto |
| HN-M-004 | Mobile menu closes on outside click | High | Auto |
| HN-M-005 | Mobile menu closes with Escape key | High | Auto |
| HN-M-006 | Focus trapped in open mobile menu | High | Manual |

#### Footer Tests
| Test ID | Test Case | Priority | Type |
|---------|-----------|----------|------|
| FT-L-001 | All footer links work | High | Auto |
| FT-L-002 | Social media links work | Medium | Manual |
| FT-L-003 | Legal links work (Privacy, Terms) | High | Auto |
| FT-C-001 | Regulatory info displays correctly | Medium | Auto |
| FT-C-002 | Copyright year is current | Medium | Auto |
| FT-C-003 | Designer credit displays and links work | Low | Manual |

### Analytics & Tracking Tests

#### Google Analytics Tests
| Test ID | Test Case | Priority | Type |
|---------|-----------|----------|------|
| GA-T-001 | Page views tracked correctly | High | Manual |
| GA-T-002 | Form submissions tracked | High | Manual |
| GA-T-003 | CTA clicks tracked | Medium | Manual |
| GA-T-004 | Service page views tracked | Medium | Manual |
| GA-T-005 | Events appear in GA4 dashboard | High | Manual |
| GA-T-006 | User ID tracking works (if implemented) | Low | Manual |

### Security Tests

#### Form Security Tests
| Test ID | Test Case | Priority | Type |
|---------|-----------|----------|------|
| SE-F-001 | XSS attempts blocked | High | Manual |
| SE-F-002 | SQL injection prevented | High | Manual |
| SE-F-003 | Rate limiting works | High | Manual |
| SE-F-004 | Input sanitization works | High | Manual |
| SE-F-005 | CSRF protection (if applicable) | Medium | Manual |

#### Headers & Security Tests
| Test ID | Test Case | Priority | Type |
|---------|-----------|----------|------|
| SE-H-001 | Content-Security-Policy header present | High | Manual |
| SE-H-002 | X-Frame-Options set to DENY/SAMEORIGIN | High | Manual |
| SE-H-003 | X-Content-Type-Options set to nosniff | High | Manual |
| SE-H-004 | Strict-Transport-Security present | High | Manual |
| SE-H-005 | Referrer-Policy set appropriately | Medium | Manual |

### Performance Testing

#### Lighthouse Scores
| Test ID | Test Case | Target | Priority | Type |
|---------|-----------|--------|----------|------|
| PF-L-001 | Performance score (mobile) | ≥90 | High | Auto |
| PF-L-002 | Performance score (desktop) | ≥95 | High | Auto |
| PF-L-003 | Accessibility score | ≥95 | High | Auto |
| PF-L-004 | Best Practices score | ≥90 | High | Auto |
| PF-L-005 | SEO score | ≥90 | High | Auto |

#### Core Web Vitals
| Test ID | Test Case | Target | Priority | Type |
|---------|-----------|--------|----------|------|
| PF-V-001 | FCP (mobile) | <2.0s | High | Auto |
| PF-V-002 | FCP (desktop) | <1.0s | High | Auto |
| PF-V-003 | LCP (mobile) | <2.5s | High | Auto |
| PF-V-004 | LCP (desktop) | <1.5s | High | Auto |
| PF-V-005 | CLS (all devices) | <0.1 | High | Auto |
| PF-V-006 | TBT (mobile) | <300ms | High | Auto |
| PF-V-007 | TBT (desktop) | <150ms | High | Auto |

#### Load Testing
| Test ID | Test Case | Priority | Type |
|---------|-----------|----------|------|
| PF-T-001 | 3G connection performance acceptable | Medium | Manual |
| PF-T-002 | 4G connection performance good | High | Manual |
| PF-T-003 | Images load progressively | Medium | Manual |
| PF-T-004 | No render-blocking resources | High | Auto |

## Test Execution Process

### 1. Pre-Testing
1. Pull latest code from main branch
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Verify local environment works

### 2. Automated Testing
1. Run unit tests: `npm run test:unit`
2. Run integration tests: `npm run test:integration`
3. Run E2E tests: `npm run test:e2e`
4. Run accessibility tests: `npm run test:a11y`
5. Review coverage report
6. Document failures

### 3. Manual Testing
1. Follow test cases from this document
2. Test on multiple browsers (Chrome, Firefox, Safari, Edge)
3. Test on multiple devices (mobile, tablet, desktop)
4. Document issues with screenshots
5. Verify fixes

### 4. Performance Testing
1. Run Lighthouse CI: `npm run build && npx lhci autorun`
2. Test on WebPageTest (throttled connections)
3. Verify bundle sizes: `npm run analyze`
4. Check Core Web Vitals in PageSpeed Insights

### 5. UAT Testing
1. Share staging URL with stakeholders
2. Provide UAT test scenarios
3. Collect feedback
4. Prioritize and address issues

## Bug Reporting

### Bug Report Template
```markdown
**Bug ID:** [AUTO-GENERATED]
**Title:** [Brief description]
**Severity:** Critical / High / Medium / Low
**Priority:** P0 / P1 / P2 / P3
**Environment:** Dev / Staging / Production
**Browser:** Chrome 120 / Firefox 121 / Safari 17 / Edge 120
**Device:** Desktop / Tablet / Mobile (specify model)
**Found by:** [Name]
**Date:** [YYYY-MM-DD]

**Description:**
[Detailed description of the issue]

**Steps to Reproduce:**
1. Navigate to [URL]
2. Click on [element]
3. Observe [behavior]

**Expected Result:**
[What should happen]

**Actual Result:**
[What actually happens]

**Screenshots/Videos:**
[Attach relevant media]

**Console Errors:**
[Any console errors]

**Additional Notes:**
[Any other relevant information]
```

### Bug Severity Definitions
- **Critical:** Blocks major functionality, security issue, data loss
- **High:** Significant functionality broken, poor UX, accessibility issue
- **Medium:** Minor functionality broken, visual issues, edge cases
- **Low:** Cosmetic issues, minor inconsistencies

## Sign-Off Criteria

### Test Completion Criteria
- [ ] All automated tests passing (unit, integration, E2E)
- [ ] Test coverage ≥80%
- [ ] All high-priority manual tests completed
- [ ] All critical and high severity bugs fixed
- [ ] Medium/low bugs documented and prioritized
- [ ] Performance targets met (Lighthouse scores)
- [ ] Core Web Vitals within acceptable ranges
- [ ] Accessibility audit passed (zero critical violations)
- [ ] Cross-browser testing completed
- [ ] Cross-device testing completed
- [ ] Security tests passed
- [ ] UAT completed and signed off

### Go/No-Go Criteria
**Go if:**
- All critical and high severity bugs resolved
- Performance targets met
- Accessibility standards met
- All automated tests passing
- Stakeholder approval received

**No-Go if:**
- Any critical bugs unresolved
- Performance significantly below targets
- Major accessibility violations present
- Automated test failures
- Security vulnerabilities identified

---

**Document History:**
- v1.0 - October 29, 2025 - Initial version
