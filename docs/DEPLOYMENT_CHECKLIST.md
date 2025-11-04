# Pre-Deployment Checklist - Sea Shipping Line

Use this checklist before deploying to production.

## Code Quality
- [ ] All tests passing (`npm run test:all`)
- [ ] Linting passes (`npm run lint`)
- [ ] TypeScript compiles (`npm run type-check`)
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors in browser

## Performance
- [ ] Lighthouse scores: Mobile >90, Desktop >95
- [ ] Images optimized
- [ ] Bundle size reviewed (`npm run analyze`)
- [ ] Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1

## Accessibility
- [ ] Zero accessibility violations (`npm run test:a11y`)
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast WCAG AA compliant
- [ ] Focus indicators visible

## Content
- [ ] All content reviewed and approved
- [ ] All images have alt text
- [ ] All internal links verified
- [ ] Forms tested and working
- [ ] No lorem ipsum or placeholder text

## SEO
- [ ] Meta titles and descriptions optimized
- [ ] Open Graph tags configured
- [ ] Sitemap accessible (`/sitemap.xml`)
- [ ] Robots.txt configured (`/robots.txt`)
- [ ] Canonical URLs set
- [ ] Structured data validated

## Security
- [ ] Environment variables in Vercel dashboard
- [ ] No secrets in code
- [ ] Security headers configured
- [ ] HTTPS enforced
- [ ] Forms have CSRF protection
- [ ] API rate limiting in place

## Environment Variables (Vercel Dashboard)
- [ ] `NODE_ENV=production`
- [ ] `RESEND_API_KEY` configured
- [ ] `RATE_REQUEST_EMAIL` set
- [ ] `CONTACT_EMAIL` set
- [ ] `NEWSLETTER_EMAIL` set
- [ ] `NEXT_PUBLIC_GA_ID` set
- [ ] `NEXT_PUBLIC_SITE_URL` set

## Monitoring
- [ ] Google Analytics tracking verified
- [ ] Vercel Analytics enabled
- [ ] Error tracking configured (if using Sentry)
- [ ] Uptime monitoring configured

## Domain & DNS
- [ ] Domain added in Vercel
- [ ] DNS A record configured
- [ ] DNS CNAME for www configured
- [ ] SSL certificate active
- [ ] www redirects to non-www

## Functional Testing
- [ ] Homepage loads
- [ ] All service pages accessible
- [ ] Rate request form works
- [ ] Contact form works
- [ ] Newsletter signup works
- [ ] Navigation menu functions
- [ ] Mobile responsive
- [ ] All images load

## Post-Deployment Verification
- [ ] `curl -I https://seashipping.com` returns 200
- [ ] `curl -I https://www.seashipping.com` redirects 301
- [ ] Sitemap accessible
- [ ] Robots.txt accessible
- [ ] Analytics tracking in real-time
- [ ] Forms submit successfully
- [ ] Email notifications received
- [ ] Security headers present
- [ ] Lighthouse audit run
- [ ] No broken links

## Documentation
- [ ] DEPLOYMENT.md reviewed
- [ ] Team notified of deployment
- [ ] Rollback plan understood
- [ ] Monitoring dashboards bookmarked

## Final Sign-off
- [ ] Product owner approval
- [ ] Stakeholder review
- [ ] Ready for production

---

**Date**: _______________
**Deployed By**: _______________
**Version/Commit**: _______________
