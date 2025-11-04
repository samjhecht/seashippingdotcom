# Pre-Launch Checklist - SeaShipping.com

**Project:** SeaShipping.com Website Redesign
**Version:** 1.0
**Last Updated:** October 29, 2025

## Overview
This checklist must be completed before launching the new SeaShipping.com website to production. Each item should be verified and checked off by the responsible party.

## Critical Path Items (MUST COMPLETE)

### Code & Build ✅
- [ ] **All tests passing**
  - [ ] Unit tests: `npm run test:unit` (passing)
  - [ ] Integration tests: `npm run test:integration` (passing)
  - [ ] E2E tests: `npm run test:e2e` (passing)
  - [ ] Accessibility tests: `npm run test:a11y` (passing)
  - Tested by: _____ Date: _____

- [ ] **Test coverage meets requirements**
  - [ ] Overall coverage ≥80%
  - [ ] Critical paths covered (forms, navigation)
  - Coverage report reviewed
  - Tested by: _____ Date: _____

- [ ] **No console errors in production build**
  - [ ] Run production build locally: `npm run build && npm start`
  - [ ] Check browser console (no errors)
  - [ ] Check server logs (no errors)
  - Tested by: _____ Date: _____

- [ ] **No TypeScript errors**
  - [ ] Run: `npm run type-check`
  - [ ] Zero errors reported
  - Tested by: _____ Date: _____

- [ ] **Production build succeeds**
  - [ ] Run: `npm run build`
  - [ ] Build completes without errors
  - [ ] Build output reviewed (bundle sizes)
  - Tested by: _____ Date: _____

- [ ] **Production build tested locally**
  - [ ] Run: `npm run build && npm start`
  - [ ] Navigate through all pages
  - [ ] Test all forms
  - [ ] Verify analytics tracking
  - Tested by: _____ Date: _____

### Content ✅
- [ ] **All content migrated from WordPress**
  - [ ] Homepage content
  - [ ] Services pages (all 7)
  - [ ] Office information (all 8 offices)
  - [ ] Resources/documents
  - [ ] News/newsletters
  - Verified by: _____ Date: _____

- [ ] **All content proofread**
  - [ ] No spelling errors
  - [ ] No grammatical errors
  - [ ] No placeholder text (Lorem ipsum)
  - [ ] Tone and voice consistent
  - Proofread by: _____ Date: _____

- [ ] **All images optimized**
  - [ ] Run: `npm run images:optimize`
  - [ ] File sizes appropriate (<200KB for photos)
  - [ ] WebP format where supported
  - [ ] Alt text present for all images
  - Verified by: _____ Date: _____

- [ ] **All PDFs accessible**
  - [ ] Documents load correctly
  - [ ] File sizes reasonable
  - [ ] Download links work
  - Tested by: _____ Date: _____

- [ ] **No placeholder content**
  - [ ] All "Coming soon" text removed
  - [ ] All TBD content replaced
  - [ ] All [PLACEHOLDER] removed
  - Verified by: _____ Date: _____

### Functionality ✅
- [ ] **All forms tested and working**
  - [ ] Rate request form submits
  - [ ] Contact form submits
  - [ ] Newsletter subscribe works
  - [ ] Newsletter unsubscribe works
  - [ ] Email notifications received
  - [ ] Form validation works
  - [ ] Error messages display correctly
  - [ ] Success messages display correctly
  - Tested by: _____ Date: _____

- [ ] **All links verified (no 404s)**
  - [ ] Run link checker tool
  - [ ] All internal links work
  - [ ] All external links work
  - [ ] External links open in new tab
  - [ ] PDF downloads work
  - Tested by: _____ Date: _____

- [ ] **All pages accessible**
  - [ ] Homepage loads
  - [ ] All 7 service pages load
  - [ ] Services index page loads
  - [ ] Network/offices page loads
  - [ ] Resources page loads
  - [ ] News page loads
  - [ ] 404 page displays correctly
  - Tested by: _____ Date: _____

- [ ] **Email notifications working**
  - [ ] SendGrid API key configured
  - [ ] Test email sent from rate request form
  - [ ] Test email sent from contact form
  - [ ] Emails arrive in correct mailbox
  - [ ] Email templates look good
  - Tested by: _____ Date: _____

- [ ] **Analytics tracking working**
  - [ ] Google Analytics 4 configured
  - [ ] GA_MEASUREMENT_ID environment variable set
  - [ ] Page views tracked
  - [ ] Events tracked (form submissions, CTA clicks)
  - [ ] Test events appear in GA4 dashboard
  - Verified in GA4 by: _____ Date: _____

### Performance 🚀
- [ ] **Lighthouse scores meet targets**
  - [ ] Mobile Performance ≥90: ___
  - [ ] Desktop Performance ≥95: ___
  - [ ] Accessibility ≥95: ___
  - [ ] Best Practices ≥90: ___
  - [ ] SEO ≥90: ___
  - Run: `npx lhci autorun` on staging
  - Tested by: _____ Date: _____

- [ ] **Core Web Vitals meet targets**
  - [ ] FCP (mobile) <2.0s: ___s
  - [ ] FCP (desktop) <1.0s: ___s
  - [ ] LCP (mobile) <2.5s: ___s
  - [ ] LCP (desktop) <1.5s: ___s
  - [ ] CLS <0.1: ___
  - [ ] TBT (mobile) <300ms: ___ms
  - Test in PageSpeed Insights
  - Tested by: _____ Date: _____

- [ ] **Bundle size within budget**
  - [ ] Run: `npm run analyze`
  - [ ] JavaScript bundle <300KB (gzipped)
  - [ ] CSS bundle <50KB (gzipped)
  - [ ] First load JS <200KB
  - Sizes: JS: ___ CSS: ___ First load: ___
  - Verified by: _____ Date: _____

- [ ] **Images optimized**
  - [ ] All images have appropriate dimensions
  - [ ] WebP format used
  - [ ] Lazy loading implemented
  - [ ] No images >500KB
  - Verified by: _____ Date: _____

- [ ] **Load tested**
  - [ ] Site tested under typical load
  - [ ] Response times acceptable
  - [ ] No errors under load
  - Load test tool: _____ Results: _____
  - Tested by: _____ Date: _____

### Accessibility ♿
- [ ] **Zero critical violations (automated)**
  - [ ] Run: `npm run test:a11y`
  - [ ] Zero failures reported
  - [ ] Run axe DevTools on all pages
  - [ ] Zero issues found
  - Tested by: _____ Date: _____

- [ ] **Keyboard navigation verified**
  - [ ] Tab through all interactive elements
  - [ ] Focus indicators visible
  - [ ] Skip to main content works
  - [ ] No keyboard traps
  - [ ] Enter/Space activate buttons
  - [ ] Escape closes modals
  - Tested by: _____ Date: _____

- [ ] **Screen reader tested**
  - [ ] VoiceOver (macOS/iOS) tested
  - [ ] NVDA (Windows) tested
  - [ ] All content announced correctly
  - [ ] Form labels read correctly
  - [ ] Error messages announced
  - Tested with: _____ by: _____ Date: _____

- [ ] **Color contrast verified**
  - [ ] All text passes WCAG AA (4.5:1)
  - [ ] Large text passes (3:1)
  - [ ] Interactive elements have sufficient contrast
  - Tool used: _____ Results: PASS
  - Verified by: _____ Date: _____

- [ ] **Focus indicators visible**
  - [ ] All interactive elements have visible focus
  - [ ] Focus ring not removed without replacement
  - [ ] Focus ring contrast meets WCAG
  - Tested by: _____ Date: _____

### SEO 🔍
- [ ] **All meta tags present**
  - [ ] Title tags (all pages)
  - [ ] Meta descriptions (all pages)
  - [ ] Open Graph tags (all pages)
  - [ ] Twitter Card tags
  - [ ] Canonical URLs
  - Verified by: _____ Date: _____

- [ ] **Sitemap generated and accessible**
  - [ ] Sitemap available at /sitemap.xml
  - [ ] All pages included
  - [ ] Format valid (XML)
  - [ ] Submitted to Google Search Console
  - Verified by: _____ Date: _____

- [ ] **Robots.txt configured**
  - [ ] File available at /robots.txt
  - [ ] Sitemap reference included
  - [ ] No pages accidentally blocked
  - [ ] Allow all important pages
  - Verified by: _____ Date: _____

- [ ] **Redirects from old URLs**
  - [ ] List of old WordPress URLs compiled
  - [ ] Redirects configured (301)
  - [ ] Important pages redirected
  - [ ] Redirects tested
  - Number of redirects: _____ Tested by: _____ Date: _____

- [ ] **Canonical URLs set**
  - [ ] All pages have canonical tag
  - [ ] URLs use preferred format (www vs non-www)
  - [ ] HTTPS enforced in canonical
  - Verified by: _____ Date: _____

### Security 🔒
- [ ] **Security headers configured**
  - [ ] Content-Security-Policy
  - [ ] X-Frame-Options: DENY or SAMEORIGIN
  - [ ] X-Content-Type-Options: nosniff
  - [ ] Strict-Transport-Security (HSTS)
  - [ ] Referrer-Policy
  - Test at: securityheaders.com
  - Score: _____ Verified by: _____ Date: _____

- [ ] **HTTPS enforced**
  - [ ] SSL certificate valid
  - [ ] HTTP redirects to HTTPS
  - [ ] Mixed content warnings resolved
  - [ ] All resources loaded via HTTPS
  - Verified by: _____ Date: _____

- [ ] **API keys secured**
  - [ ] All API keys in environment variables
  - [ ] No keys committed to repository
  - [ ] Keys rotated if exposed
  - [ ] Different keys for staging/production
  - Verified by: _____ Date: _____

- [ ] **Rate limiting implemented**
  - [ ] Form submissions rate limited
  - [ ] API routes protected
  - [ ] Limits tested (5 submissions per 15 minutes)
  - Tested by: _____ Date: _____

- [ ] **XSS protection verified**
  - [ ] Input sanitization works
  - [ ] Output encoding implemented
  - [ ] Script injection prevented
  - [ ] HTML entity encoding working
  - Tested by: _____ Date: _____

### Deployment 🚀
- [ ] **Staging environment tested**
  - [ ] Full testing completed on staging
  - [ ] All functionality works
  - [ ] Performance verified
  - [ ] No critical issues
  - Staging URL: _____ Tested by: _____ Date: _____

- [ ] **Production environment configured**
  - [ ] Environment variables set in Vercel
  - [ ] Production domain configured
  - [ ] SSL certificate provisioned
  - [ ] Analytics configured
  - Configured by: _____ Date: _____

- [ ] **DNS configured correctly**
  - [ ] A/CNAME records point to Vercel
  - [ ] DNS propagation verified
  - [ ] www redirects properly (or vice versa)
  - [ ] DNS lookup succeeds
  - Tool: `dig seashipping.com` Result: _____
  - Configured by: _____ Date: _____

- [ ] **SSL certificate valid**
  - [ ] Certificate issued
  - [ ] Certificate not expired
  - [ ] Certificate covers all domains
  - [ ] Certificate chain valid
  - Test at: ssllabs.com Score: _____
  - Verified by: _____ Date: _____

- [ ] **Environment variables set**
  - [ ] SENDGRID_API_KEY
  - [ ] NEXT_PUBLIC_GA_MEASUREMENT_ID
  - [ ] CONTACT_EMAIL
  - [ ] RATE_REQUEST_EMAIL
  - [ ] Any other required variables
  - Verified in Vercel by: _____ Date: _____

### Monitoring 📊
- [ ] **Error monitoring active**
  - [ ] Error tracking service configured (Sentry/similar)
  - [ ] Test error logged successfully
  - [ ] Alert notifications working
  - [ ] Team has access to dashboard
  - Service: _____ Configured by: _____ Date: _____

- [ ] **Analytics working**
  - [ ] Google Analytics 4 receiving data
  - [ ] Real-time data visible
  - [ ] Events tracking correctly
  - [ ] Goals/conversions configured
  - Verified by: _____ Date: _____

- [ ] **Performance monitoring active**
  - [ ] Web Vitals monitoring enabled
  - [ ] Vercel Analytics active (if using Vercel)
  - [ ] Performance baseline established
  - Service: _____ Configured by: _____ Date: _____

- [ ] **Uptime monitoring configured**
  - [ ] Uptime monitoring service configured
  - [ ] Checks every 5 minutes
  - [ ] Alert notifications set up
  - [ ] Test alert received
  - Service: _____ Configured by: _____ Date: _____

### Documentation 📚
- [ ] **README updated**
  - [ ] Project overview complete
  - [ ] Tech stack documented
  - [ ] Getting started instructions
  - [ ] Available scripts documented
  - [ ] Deployment instructions included
  - Updated by: _____ Date: _____

- [ ] **Deployment guide created**
  - [ ] Step-by-step deployment instructions
  - [ ] Environment variables documented
  - [ ] Rollback procedures documented
  - [ ] Emergency contacts listed
  - Created by: _____ Date: _____

- [ ] **Environment variables documented**
  - [ ] All variables listed
  - [ ] Purpose of each variable explained
  - [ ] Where to find values documented
  - [ ] Required vs optional marked
  - Documented in: _____ by: _____ Date: _____

- [ ] **Content editing guide created**
  - [ ] How to update content
  - [ ] Where content lives
  - [ ] How to add services
  - [ ] How to add offices
  - [ ] How to add news items
  - Created by: _____ Date: _____

## Important but Non-Critical Items

### Marketing & Communications 📣
- [ ] **Stakeholders notified of launch date**
  - Date notified: _____
  - Notified by: _____

- [ ] **Social media posts prepared**
  - [ ] LinkedIn post drafted
  - [ ] Twitter/X post drafted
  - [ ] Instagram post drafted (if applicable)
  - Prepared by: _____

- [ ] **Email announcement drafted**
  - [ ] Customer notification email
  - [ ] Partner notification email
  - Drafted by: _____

- [ ] **Press release prepared (if applicable)**
  - Prepared by: _____

### Business Continuity 🔄
- [ ] **Rollback plan documented**
  - [ ] Steps to revert to old site
  - [ ] DNS changes to revert
  - [ ] Timeframe for rollback
  - Documented by: _____

- [ ] **Old WordPress site backed up**
  - [ ] Database backup taken
  - [ ] Files backup taken
  - [ ] Backup tested (can restore)
  - [ ] Backup stored securely
  - Backed up by: _____ Date: _____

- [ ] **Support team briefed**
  - [ ] Support documentation updated
  - [ ] Team trained on new site
  - [ ] Known issues communicated
  - [ ] Escalation path defined
  - Briefed by: _____ Date: _____

### Post-Launch Preparation 📈
- [ ] **Post-launch monitoring plan**
  - [ ] First 24 hours: hourly checks
  - [ ] First week: daily reviews
  - [ ] First month: weekly reviews
  - [ ] Documented by: _____

- [ ] **Issue triage process defined**
  - [ ] Severity definitions documented
  - [ ] Response times defined
  - [ ] Escalation process clear
  - [ ] On-call schedule set
  - Defined by: _____

- [ ] **User feedback collection plan**
  - [ ] Feedback form/email set up
  - [ ] Survey prepared (optional)
  - [ ] Social media monitoring
  - Prepared by: _____

## Final Sign-Off

### Technical Sign-Off
- [ ] **Lead Developer:** _____________ Date: _____
  - All code reviewed and approved
  - All tests passing
  - Performance targets met
  - Security measures in place

### QA Sign-Off
- [ ] **QA Lead:** _____________ Date: _____
  - All test cases executed
  - Critical bugs resolved
  - Acceptance criteria met
  - Ready for production

### Product Sign-Off
- [ ] **Product Owner:** _____________ Date: _____
  - Requirements met
  - Content approved
  - UX acceptable
  - Business goals achievable

### Stakeholder Sign-Off
- [ ] **Business Stakeholder:** _____________ Date: _____
  - Final approval to launch
  - Marketing ready
  - Support team ready
  - Go-live authorized

## Launch Authorization

### Final Go/No-Go Decision

**Launch Date:** _____________
**Launch Time:** _____________ (timezone: _____)

**Decision:** GO / NO-GO

**Authorized by:** _____________
**Title:** _____________
**Date:** _____________
**Signature:** _____________

### Conditions for GO
All critical path items must be checked off. Important but non-critical items should be completed but may not block launch if there's a plan to address them post-launch.

### Conditions for NO-GO
- Any critical path item incomplete
- Critical bugs unresolved
- Performance significantly below targets
- Security vulnerabilities present
- Major functionality broken
- Legal/compliance issues

## Post-Checklist Notes

**Issues Requiring Post-Launch Attention:**
1. _____________
2. _____________
3. _____________

**Launch Notes:**
_____________________________________________
_____________________________________________
_____________________________________________

---

**Document History:**
- v1.0 - October 29, 2025 - Initial version

**Next Review:** Before each major release
