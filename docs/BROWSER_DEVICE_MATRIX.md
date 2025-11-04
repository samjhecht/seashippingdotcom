# Browser & Device Testing Matrix

**Project:** SeaShipping.com
**Version:** 1.0
**Last Updated:** October 29, 2025

## Overview
This document defines the browser and device combinations that must be tested before production launch. Testing should be performed on actual devices when possible, or using device emulation for initial testing.

## Browser Support Matrix

### Desktop Browsers

| Browser | Versions | Platform | Priority | Support Level |
|---------|----------|----------|----------|---------------|
| Chrome | Latest 2 | Windows, macOS | High | Full Support |
| Firefox | Latest 2 | Windows, macOS | High | Full Support |
| Safari | Latest 2 | macOS | High | Full Support |
| Edge | Latest 2 | Windows | High | Full Support |
| Chrome | Latest | Linux | Medium | Best Effort |
| Opera | Latest | Windows, macOS | Low | Best Effort |

**Current Latest Versions (as of Oct 2025):**
- Chrome: 130, 129
- Firefox: 131, 130
- Safari: 18.1, 18.0
- Edge: 130, 129

### Mobile Browsers

| Browser | Versions | Platform | Priority | Support Level |
|---------|----------|----------|----------|---------------|
| Safari | iOS 17, 16, 15 | iOS | High | Full Support |
| Chrome | Latest 2 | Android | High | Full Support |
| Samsung Internet | Latest | Android | Medium | Best Effort |
| Firefox | Latest | Android | Low | Best Effort |

## Device Testing Matrix

### Desktop Resolutions

| Resolution | Category | Aspect Ratio | Priority | Notes |
|------------|----------|--------------|----------|-------|
| 1920x1080 | Full HD | 16:9 | High | Most common desktop |
| 1366x768 | Laptop | 16:9 | High | Common laptop size |
| 2560x1440 | 2K/QHD | 16:9 | Medium | Gaming monitors, iMac |
| 3840x2160 | 4K/UHD | 16:9 | Low | High-end displays |
| 1440x900 | Laptop | 16:10 | Medium | Older MacBooks |
| 1280x720 | HD | 16:9 | Low | Minimum desktop size |

### Tablet Devices

| Device | Resolution | Orientation | Priority | Notes |
|--------|------------|-------------|----------|-------|
| iPad (10th gen) | 820x1180 | Portrait | High | Current iPad |
| iPad (10th gen) | 1180x820 | Landscape | High | Current iPad |
| iPad Pro 11" | 834x1194 | Portrait | Medium | Professional users |
| iPad Pro 12.9" | 1024x1366 | Portrait | Medium | Large tablet |
| Samsung Galaxy Tab S9 | 800x1280 | Portrait | Medium | Android tablet |
| Amazon Fire HD 10 | 800x1280 | Both | Low | Budget tablet |

### Mobile Devices

| Device | Resolution | Screen Size | Priority | Notes |
|--------|------------|-------------|----------|-------|
| iPhone SE (3rd gen) | 375x667 | 4.7" | High | Smallest iPhone |
| iPhone 14 | 390x844 | 6.1" | High | Current standard iPhone |
| iPhone 14 Pro Max | 430x932 | 6.7" | High | Large iPhone |
| iPhone 15 | 393x852 | 6.1" | High | Latest standard |
| Samsung Galaxy S23 | 360x800 | 6.1" | High | Popular Android |
| Samsung Galaxy S23 Ultra | 412x915 | 6.8" | Medium | Large Android |
| Google Pixel 8 | 412x915 | 6.2" | Medium | Pure Android |
| Google Pixel 8 Pro | 448x998 | 6.7" | Medium | Large Pixel |
| OnePlus 11 | 412x919 | 6.7" | Low | Alternative Android |

### Foldable Devices (Optional)

| Device | Resolution | Priority | Notes |
|--------|------------|----------|-------|
| Samsung Galaxy Z Fold 5 | 344x882 (folded) | Low | Test if budget allows |
| Samsung Galaxy Z Fold 5 | 748x1812 (unfolded) | Low | Unique aspect ratio |

## Test Coverage Matrix

### Homepage Testing

| Page | Chrome Desktop | Firefox Desktop | Safari Desktop | Edge Desktop | iOS Safari | Chrome Android |
|------|----------------|-----------------|----------------|--------------|------------|----------------|
| Homepage (/) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Initial Load | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Navigation | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| CTAs | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Mobile Menu | N/A | N/A | N/A | N/A | ✓ | ✓ |

### Services Pages Testing

| Page | Chrome Desktop | Firefox Desktop | Safari Desktop | Edge Desktop | iOS Safari | Chrome Android |
|------|----------------|-----------------|----------------|--------------|------------|----------------|
| Services Index | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Ocean Freight | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Air Freight | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Customs Brokerage | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Warehousing | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Ground Transport | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Project Cargo | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| NVOCC Services | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

### Forms Testing

| Form | Chrome Desktop | Firefox Desktop | Safari Desktop | Edge Desktop | iOS Safari | Chrome Android |
|------|----------------|-----------------|----------------|--------------|------------|----------------|
| Rate Request | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| - Validation | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| - Submission | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| - Error Handling | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Contact Form | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Newsletter Subscribe | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Newsletter Unsubscribe | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

### Navigation Testing

| Feature | Chrome Desktop | Firefox Desktop | Safari Desktop | Edge Desktop | iOS Safari | Chrome Android |
|---------|----------------|-----------------|----------------|--------------|------------|----------------|
| Header Nav | ✓ | ✓ | ✓ | ✓ | N/A | N/A |
| Mobile Menu | N/A | N/A | N/A | N/A | ✓ | ✓ |
| Footer Nav | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Internal Links | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| External Links | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

### Content Pages Testing

| Page | Chrome Desktop | Firefox Desktop | Safari Desktop | Edge Desktop | iOS Safari | Chrome Android |
|------|----------------|-----------------|----------------|--------------|------------|----------------|
| Network/Offices | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Resources | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| News | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Design System | ✓ | ✓ | ✓ | N/A | N/A | N/A |

## Device-Specific Testing Requirements

### Mobile-Specific Tests (iOS & Android)
- [ ] Touch targets are minimum 44x44px
- [ ] Tap interactions work (no double-tap zoom)
- [ ] Swipe gestures work where applicable
- [ ] Pinch-to-zoom disabled on forms
- [ ] Proper keyboard types (email, tel, number)
- [ ] Viewport doesn't zoom on input focus
- [ ] Phone numbers clickable (tel: links)
- [ ] Email addresses clickable (mailto: links)
- [ ] Addresses open in maps app
- [ ] Mobile menu closes properly
- [ ] Hamburger menu accessible
- [ ] Portrait and landscape orientations

### iOS Safari-Specific Tests
- [ ] No input zoom (font-size ≥16px)
- [ ] Safe area respected (notch devices)
- [ ] Address bar hide/show doesn't break layout
- [ ] Smooth scrolling works
- [ ] Fixed elements don't flicker
- [ ] Form submission works (no double submit)
- [ ] Date picker works natively

### Android Chrome-Specific Tests
- [ ] Bottom navigation bar accounted for
- [ ] System back button works appropriately
- [ ] Form submission works
- [ ] Pull-to-refresh disabled where needed
- [ ] Autofill works properly

### Tablet-Specific Tests
- [ ] Layout adapts appropriately (not just scaled mobile)
- [ ] Touch targets appropriate for tablets
- [ ] Landscape and portrait layouts work
- [ ] Split-screen mode works (if applicable)

### Desktop-Specific Tests
- [ ] Hover states work properly
- [ ] Mouse interactions work
- [ ] Right-click functionality appropriate
- [ ] Keyboard shortcuts work
- [ ] Desktop navigation displays correctly
- [ ] High DPI/Retina displays look sharp

## Responsive Breakpoints

Test the following breakpoints for layout shifts:

| Breakpoint | Width | Device Category | Priority |
|------------|-------|-----------------|----------|
| xs | 320px | Small mobile | High |
| sm | 375px | Mobile | High |
| md | 768px | Tablet | High |
| lg | 1024px | Small desktop | High |
| xl | 1280px | Desktop | Medium |
| 2xl | 1536px | Large desktop | Medium |
| 4k | 2560px | Ultra-wide | Low |

## Testing Tools & Resources

### Browser Testing Tools
- **BrowserStack:** Cross-browser testing platform
- **LambdaTest:** Browser and device testing
- **Sauce Labs:** Automated cross-browser testing
- **Chrome DevTools Device Mode:** Device emulation
- **Firefox Responsive Design Mode:** Device emulation
- **Safari Responsive Design Mode:** iOS device simulation

### Device Testing
- **Physical Devices:** Use actual devices when available
- **Browser DevTools:** For initial responsive testing
- **BrowserStack Real Devices:** Remote real device testing
- **TestFlight (iOS):** Beta testing on real iOS devices

### Performance Testing
- **Chrome Lighthouse:** Performance, accessibility, SEO
- **WebPageTest:** Real-world performance testing
- **PageSpeed Insights:** Google's performance tool

## Test Execution Instructions

### 1. Automated Device Testing
```bash
# Run Playwright tests with device emulation
npm run test:e2e -- --project=mobile-chrome
npm run test:e2e -- --project=mobile-safari
npm run test:e2e -- --project=desktop-chrome
```

### 2. Manual Testing Process
1. **Setup:** Open browser/device to test
2. **Navigate:** Go to staging URL
3. **Execute:** Follow test cases from QA_TEST_PLAN.md
4. **Document:** Record results in test matrix
5. **Report:** Log any issues found
6. **Retest:** Verify fixes after deployment

### 3. Visual Regression Testing
- Take screenshots across devices
- Compare against approved designs
- Document any discrepancies
- Verify fixes

## Test Result Documentation

### Recording Test Results
Use this notation in the matrix above:
- ✓ = Passed
- ✗ = Failed
- ⚠ = Partial (minor issues)
- N/A = Not applicable
- ⏳ = Not yet tested

### Test Result Template
```markdown
**Test Date:** [YYYY-MM-DD]
**Tested By:** [Name]
**Browser:** [Browser + Version]
**Device:** [Device Name/Resolution]
**Page/Feature:** [What was tested]

**Result:** Pass / Fail / Partial

**Issues Found:**
1. [Issue description]
2. [Issue description]

**Screenshots:** [Link or attachment]

**Notes:** [Any additional observations]
```

## Browser-Specific Known Issues

### Safari
- [ ] SVG rendering may differ slightly
- [ ] Date input styling limited
- [ ] Backdrop-filter may have performance impact

### Firefox
- [ ] Smooth scrolling behavior slightly different
- [ ] Some CSS Grid features may render differently

### Edge
- [ ] Generally follows Chrome behavior
- [ ] Legacy Edge (pre-Chromium) not supported

### Mobile Browsers
- [ ] PWA features may behave differently
- [ ] Service worker support varies
- [ ] Push notification support varies

## Accessibility Testing Across Devices

| Device Type | Screen Reader | Priority | Notes |
|-------------|---------------|----------|-------|
| macOS | VoiceOver + Safari | High | Primary desktop SR |
| iOS | VoiceOver + Safari | High | Primary mobile SR |
| Windows | NVDA + Firefox | High | Free, popular SR |
| Windows | JAWS + Chrome | Medium | Enterprise standard |
| Android | TalkBack + Chrome | Medium | Android built-in SR |

## Sign-Off Requirements

Before production launch, obtain sign-off for:

### Desktop Browsers
- [ ] Chrome (latest 2 versions) - Windows & macOS
- [ ] Firefox (latest 2 versions) - Windows & macOS
- [ ] Safari (latest 2 versions) - macOS
- [ ] Edge (latest 2 versions) - Windows

### Mobile Browsers
- [ ] iOS Safari (iOS 15, 16, 17)
- [ ] Chrome Android (latest 2 versions)
- [ ] Samsung Internet (if significant user base)

### Critical Devices
- [ ] iPhone (smallest supported: SE)
- [ ] iPhone (standard size: iPhone 14/15)
- [ ] Android phone (popular model: Samsung Galaxy S23)
- [ ] iPad (current generation)
- [ ] Desktop (1920x1080 resolution)

---

**Document History:**
- v1.0 - October 29, 2025 - Initial version

**Next Review:** Before each major release
