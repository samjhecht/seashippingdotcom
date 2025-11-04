# Launch Day Procedures - SeaShipping.com

**Project:** SeaShipping.com Website Redesign
**Version:** 1.0
**Last Updated:** October 29, 2025

## Overview
This document outlines the step-by-step procedures for launching the new SeaShipping.com website. Follow this timeline carefully to ensure a smooth transition from the old WordPress site to the new Next.js application.

## Pre-Launch Preparation (1 Week Before)

### Communication & Coordination

#### Day -7 (1 Week Before)
- [ ] **Send launch notification to all stakeholders**
  - Executive team
  - Marketing team
  - Sales team
  - Customer support team
  - IT/operations team
  - External partners (if applicable)

- [ ] **Schedule launch window**
  - Preferred time: Early morning (e.g., 6:00 AM EST) or weekend
  - Rationale: Minimize user impact during low-traffic period
  - Duration: 2-4 hours for deployment + verification
  - Backup date/time: _____________

- [ ] **Finalize launch team and roles**
  - **Launch Commander:** _____________ (overall coordination)
  - **Technical Lead:** _____________ (deployment execution)
  - **QA Lead:** _____________ (verification testing)
  - **Communications Lead:** _____________ (stakeholder updates)
  - **Support Lead:** _____________ (customer inquiries)

- [ ] **Set up communication channels**
  - [ ] Slack channel or Teams chat for launch team
  - [ ] Conference call/Zoom link ready
  - [ ] Emergency contact numbers shared
  - [ ] Escalation path defined

### Technical Preparation

#### Day -7 to Day -1
- [ ] **Final staging environment test**
  - [ ] Complete regression testing
  - [ ] Verify all forms working
  - [ ] Test all user journeys
  - [ ] Performance check
  - [ ] Accessibility audit
  - Tested by: _____ Date: _____

- [ ] **Backup current WordPress site**
  - [ ] Database backup (mysqldump or hosting panel)
  - [ ] Files backup (wp-content, themes, plugins)
  - [ ] Verify backup integrity (test restore)
  - [ ] Store backups securely (multiple locations)
  - Backup location: _____________
  - Backed up by: _____ Date: _____

- [ ] **Document current WordPress configuration**
  - [ ] DNS settings (screenshot or export)
  - [ ] Hosting configuration
  - [ ] SSL certificate details
  - [ ] Plugin list and versions
  - [ ] Theme configuration
  - Documented by: _____ Date: _____

- [ ] **Prepare rollback plan**
  - [ ] Document steps to revert DNS
  - [ ] Keep WordPress site accessible at old-site.seashipping.com
  - [ ] Estimate rollback time: ~15-30 minutes
  - [ ] Test rollback procedure (optional but recommended)
  - Documented in: ROLLBACK_PLAN.md

- [ ] **Production environment verification**
  - [ ] Vercel project configured
  - [ ] Environment variables set correctly
  - [ ] Custom domain added to Vercel
  - [ ] SSL certificate ready
  - [ ] Production branch deployed to staging domain
  - Staging URL: _____________ Verified by: _____

- [ ] **Create deployment checklist**
  - [ ] Print or have this document accessible
  - [ ] Prepare any scripts or commands
  - [ ] Have access credentials ready (DNS, hosting, Vercel)

### Content & Marketing Preparation

#### Day -3 to Day -1
- [ ] **Final content review**
  - [ ] All content proofread
  - [ ] No placeholder text
  - [ ] All images optimized
  - [ ] All PDFs accessible
  - Reviewed by: _____ Date: _____

- [ ] **Prepare marketing materials**
  - [ ] Social media posts drafted
  - [ ] Email announcement drafted
  - [ ] Press release (if applicable)
  - [ ] Screenshots of new site
  - Prepared by: _____ Date: _____

- [ ] **Notify key customers (optional)**
  - [ ] Major accounts informed
  - [ ] Temporary downtime communicated (if any)
  - Notified by: _____ Date: _____

## Launch Day Timeline

### Launch Window Start Time: _____________ (Timezone: _____)

### T-60 Minutes: Pre-Launch Checks

#### 60 Minutes Before Launch
- [ ] **Launch team assembles**
  - [ ] All team members online
  - [ ] Communication channels active
  - [ ] Roles confirmed

- [ ] **Final production build verification**
  ```bash
  # Pull latest code
  git checkout main
  git pull origin main

  # Verify no uncommitted changes
  git status

  # Run final tests
  npm run test:all

  # Build production
  npm run build

  # Verify build success
  echo $?  # Should output 0
  ```
  - [ ] All tests passing
  - [ ] Build succeeds
  - Verified by: _____ Time: _____

- [ ] **Verify Vercel production deployment ready**
  - [ ] Latest code deployed to Vercel
  - [ ] Environment variables double-checked
  - [ ] Production domain configured (not yet pointing)
  - [ ] Preview deployment tested
  - Preview URL: _____________
  - Verified by: _____ Time: _____

- [ ] **Access verification**
  - [ ] DNS provider login working
  - [ ] Vercel dashboard accessible
  - [ ] WordPress hosting accessible (for backup)
  - [ ] Google Analytics access confirmed
  - Verified by: _____ Time: _____

### T-30 Minutes: System Readiness

#### 30 Minutes Before Launch
- [ ] **Document current state**
  - [ ] Current DNS settings recorded
    ```bash
    dig seashipping.com
    dig www.seashipping.com
    ```
  - [ ] Current site screenshot taken
  - [ ] Current analytics baseline recorded
  - Documented by: _____ Time: _____

- [ ] **Monitoring tools ready**
  - [ ] Google Analytics Real-Time open
  - [ ] Vercel dashboard open
  - [ ] Error monitoring dashboard open (if configured)
  - [ ] Uptime monitor status checked
  - Ready by: _____ Time: _____

- [ ] **Support team briefed and standing by**
  - [ ] Support documentation updated
  - [ ] FAQs prepared for common questions
  - [ ] Escalation path confirmed
  - Briefed by: _____ Time: _____

### T-15 Minutes: Final Verification

#### 15 Minutes Before Launch
- [ ] **Run pre-deployment smoke test on preview**
  - [ ] Homepage loads
  - [ ] All service pages load
  - [ ] Rate request form works
  - [ ] Contact form works
  - [ ] Mobile menu works
  - Tested by: _____ Time: _____

- [ ] **Clear CDN caches (if applicable)**
  - [ ] Vercel edge cache cleared
  - [ ] Any external CDN cleared
  - Cleared by: _____ Time: _____

- [ ] **Final Go/No-Go poll**
  - [ ] Technical Lead: GO / NO-GO
  - [ ] QA Lead: GO / NO-GO
  - [ ] Product Owner: GO / NO-GO
  - [ ] Launch Commander: GO / NO-GO
  - **Final Decision:** GO / NO-GO
  - Decision time: _____

### T-0: LAUNCH EXECUTION

#### Deploy to Production

**Launch initiated by:** _____________ **Time:** _____

1. **Update DNS records**

   Navigate to DNS provider (e.g., Cloudflare, Route53, GoDaddy)

   **For root domain (seashipping.com):**
   - [ ] Update A record to point to Vercel
     - If using Vercel: point to `76.76.21.21`
     - OR set CNAME to `cname.vercel-dns.com`
   - [ ] Save changes
   - [ ] Record old values: _____________

   **For www subdomain (www.seashipping.com):**
   - [ ] Update CNAME to point to `cname.vercel-dns.com`
   - [ ] Save changes
   - [ ] Record old values: _____________

   **Time DNS updated:** _____

2. **Verify DNS propagation**
   ```bash
   # Check DNS updates
   dig seashipping.com
   dig www.seashipping.com

   # Alternative: use online tools
   # https://dnschecker.org
   ```
   - [ ] A/CNAME records showing new values
   - [ ] May take 5-60 minutes for full propagation
   - **Time DNS verified:** _____

3. **Force SSL certificate issuance (if needed)**
   - [ ] In Vercel: Navigate to domain settings
   - [ ] Click "Renew Certificate" if needed
   - [ ] Wait for certificate to be issued (~5 minutes)
   - **SSL active:** _____ **Time:** _____

### T+5 Minutes: Initial Verification

#### Immediate Post-Launch Checks

- [ ] **Verify site loads on production domain**
  ```bash
  curl -I https://seashipping.com
  # Should return 200 OK
  ```
  - [ ] https://seashipping.com loads
  - [ ] https://www.seashipping.com loads
  - [ ] HTTP redirects to HTTPS
  - [ ] www redirects correctly (or vice versa)
  - Verified by: _____ Time: _____

- [ ] **Test from multiple locations**
  - [ ] Test from office network
  - [ ] Test from mobile device (cellular)
  - [ ] Test from different ISP (VPN or ask colleague)
  - [ ] Use tools: https://www.whatsmydns.net
  - Verified by: _____ Time: _____

- [ ] **Quick smoke test**
  - [ ] Homepage loads completely
  - [ ] Navigation works
  - [ ] Click through to at least 3 service pages
  - [ ] Submit test form (use test email)
  - [ ] Check mobile menu
  - Tested by: _____ Time: _____

### T+15 Minutes: Comprehensive Verification

#### Detailed Testing
- [ ] **Run comprehensive smoke tests**
  - [ ] All pages load (homepage, services, network, resources)
  - [ ] All forms submit successfully
    - [ ] Rate request form
    - [ ] Contact form
    - [ ] Newsletter subscribe
  - [ ] Email notifications received
  - [ ] No console errors
  - [ ] No 404 errors
  - Tested by: _____ Time: _____

- [ ] **Check analytics tracking**
  - [ ] Open Google Analytics Real-Time
  - [ ] Verify page views appearing
  - [ ] Test event tracking (click CTA)
  - [ ] Verify events appear in GA4
  - Verified by: _____ Time: _____

- [ ] **Performance check**
  ```bash
  # Run Lighthouse on production
  npx lighthouse https://seashipping.com --view
  ```
  - [ ] Performance score acceptable
  - [ ] Core Web Vitals green
  - [ ] No major issues
  - Scores: Perf: ___ A11y: ___ BP: ___ SEO: ___
  - Verified by: _____ Time: _____

- [ ] **Mobile testing**
  - [ ] Test on actual mobile device
  - [ ] Homepage loads correctly
  - [ ] Mobile menu works
  - [ ] Forms work on mobile
  - [ ] Touch targets appropriate
  - Tested on: _____ by: _____ Time: _____

### T+30 Minutes: Monitoring & Communication

#### System Monitoring
- [ ] **Review error logs**
  - [ ] Vercel Functions logs (no errors)
  - [ ] Browser console (no errors)
  - [ ] Error monitoring service (if configured)
  - Status: _____ Reviewed by: _____ Time: _____

- [ ] **Monitor performance metrics**
  - [ ] Vercel Analytics dashboard
  - [ ] Response times normal
  - [ ] No timeouts or failures
  - Status: _____ Monitored by: _____ Time: _____

- [ ] **Check uptime monitor**
  - [ ] Site showing as UP
  - [ ] Response times acceptable
  - [ ] No alerts triggered
  - Status: _____ Verified by: _____ Time: _____

#### Stakeholder Communication
- [ ] **Send launch confirmation email**
  ```
  Subject: ✅ SeaShipping.com New Website Launch - LIVE

  Team,

  The new SeaShipping.com website is now LIVE!

  - Launch time: [TIME]
  - Status: Successful
  - All systems: Operational
  - All tests: Passing

  The site is now accessible at https://seashipping.com

  Please report any issues immediately to [CONTACT].

  Thank you to everyone who contributed to this successful launch!

  [Your name]
  Launch Commander
  ```
  - Sent by: _____ Time: _____

- [ ] **Post to internal channels**
  - [ ] Slack/Teams announcement
  - [ ] Let support team know
  - [ ] Notify sales team
  - Posted by: _____ Time: _____

### T+60 Minutes: Extended Verification

#### Final Checks Before Handoff
- [ ] **Run full test suite against production**
  ```bash
  # Update E2E tests to point to production (temporarily)
  BASE_URL=https://seashipping.com npm run test:e2e
  ```
  - [ ] Tests pass (or acceptable failures documented)
  - Tested by: _____ Time: _____

- [ ] **Verify SEO elements**
  - [ ] Sitemap accessible: https://seashipping.com/sitemap.xml
  - [ ] Robots.txt accessible: https://seashipping.com/robots.txt
  - [ ] Meta tags present (view source)
  - [ ] Structured data valid (Google Rich Results Test)
  - Verified by: _____ Time: _____

- [ ] **Check third-party integrations**
  - [ ] SendGrid emails sending
  - [ ] Google Analytics tracking
  - [ ] Any other integrations
  - Verified by: _____ Time: _____

- [ ] **Browser compatibility spot check**
  - [ ] Chrome (latest)
  - [ ] Safari (if on Mac)
  - [ ] Firefox (if available)
  - [ ] Mobile Safari (iPhone)
  - Tested by: _____ Time: _____

### T+2 Hours: Monitoring Handoff

#### Transition to Normal Operations
- [ ] **Document any issues encountered**
  - Issue 1: _____________
  - Issue 2: _____________
  - Issue 3: _____________

- [ ] **Create post-launch monitoring plan**
  - [ ] Next 24 hours: Check every 2 hours
  - [ ] Next week: Check daily
  - [ ] Assign monitoring responsibility
  - Assigned to: _____ Schedule: _____

- [ ] **Launch team standown**
  - [ ] Thank the team
  - [ ] Confirm on-call schedule
  - [ ] Set next check-in time
  - Next check-in: _____ Time: _____

### T+24 Hours: Post-Launch Review

#### Day 1 Post-Launch
- [ ] **Review metrics**
  - [ ] Google Analytics data
  - [ ] Error logs (any issues?)
  - [ ] Performance metrics
  - [ ] User feedback received
  - Reviewed by: _____ Date: _____

- [ ] **Address any urgent issues**
  - Issue 1: _____________ Status: _____
  - Issue 2: _____________ Status: _____
  - Issue 3: _____________ Status: _____

- [ ] **Send 24-hour status update**
  ```
  Subject: SeaShipping.com Launch - 24 Hour Update

  Team,

  The new website has been live for 24 hours. Here's the status:

  ✅ Uptime: [99.9%]
  ✅ Page views: [XXX]
  ✅ Forms submitted: [XX]
  ⚠️ Issues found: [0 critical, X minor]

  Overall: Launch successful, site performing well.

  [Details]

  [Your name]
  ```
  - Sent by: _____ Date: _____

## Emergency Procedures

### Rollback Decision Criteria

**Rollback if:**
- Site completely inaccessible for >15 minutes
- Critical functionality broken (forms, navigation)
- Data loss or corruption
- Security vulnerability exposed
- Unacceptable performance degradation
- Stakeholder directive

### Rollback Procedure

**Decision to rollback made by:** _____________ **Time:** _____

1. **Announce rollback decision**
   - Notify launch team immediately
   - Document reason for rollback

2. **Revert DNS to old WordPress site**
   - Update A/CNAME records to old values
   - Values: _____________
   - Allow 15-30 minutes for propagation

3. **Verify old site accessible**
   - Test from multiple locations
   - Confirm functionality

4. **Communicate rollback**
   - Notify stakeholders
   - Explain situation and next steps

5. **Post-rollback analysis**
   - Document what went wrong
   - Plan fixes
   - Schedule new launch date

### Issue Escalation

**Minor Issue (cosmetic, non-critical):**
- Document in issue tracker
- Fix in next release
- No immediate action required

**Major Issue (functionality broken):**
- Assign to developer immediately
- Deploy hotfix within 2-4 hours
- Communicate to affected users

**Critical Issue (site down, data loss):**
- Escalate to Launch Commander
- Consider rollback
- All hands on deck to resolve

## Post-Launch Marketing & Communications

### Social Media Posts (After T+2 Hours, once stable)

**LinkedIn:**
```
We're excited to announce the launch of our redesigned website!

The new SeaShipping.com features:
✨ Modern, responsive design
🚀 Improved performance
♿ Enhanced accessibility
📱 Better mobile experience

Visit us at https://seashipping.com and let us know what you think!

#logistics #shipping #webdesign #launch
```

**Twitter/X:**
```
🚢 Our new website is live! Check out the redesigned SeaShipping.com for a faster, more accessible experience. https://seashipping.com #shipping #logistics
```

- [ ] Posted by: _____ Date: _____

### Email Announcement (After T+24 Hours)

Send to customers and partners after 24 hours of stable operation:

```
Subject: Introducing Our New Website

Dear Valued Customer,

We're pleased to announce the launch of our redesigned website at SeaShipping.com!

Our new site features:
- Faster load times and improved performance
- Better mobile experience
- Enhanced accessibility
- Easier navigation and information finding
- Streamlined quote request process

We'd love to hear your feedback. If you encounter any issues or have suggestions, please reach out to support@seashipping.com.

Thank you for your continued partnership.

Best regards,
[SeaShipping Team]
```

- [ ] Sent by: _____ Date: _____

## Launch Retrospective (Within 1 Week)

### Schedule Post-Launch Meeting
- [ ] Date: _____ Time: _____
- [ ] Attendees: Launch team + stakeholders
- [ ] Agenda:
  - What went well
  - What could be improved
  - Lessons learned
  - Action items for next release

### Topics to Discuss
- Timeline adherence
- Issue resolution effectiveness
- Communication effectiveness
- Technical performance
- User feedback
- Process improvements

### Document Lessons Learned
- Update this document with improvements
- Share with broader team
- Apply learnings to future launches

---

## Launch Team Contacts

**Launch Commander:** _____________ Phone: _____ Email: _____

**Technical Lead:** _____________ Phone: _____ Email: _____

**QA Lead:** _____________ Phone: _____ Email: _____

**Communications Lead:** _____________ Phone: _____ Email: _____

**Support Lead:** _____________ Phone: _____ Email: _____

**Emergency Escalation:** _____________ Phone: _____ Email: _____

---

**Document History:**
- v1.0 - October 29, 2025 - Initial version

**Next Review:** After launch completion (retrospective)
