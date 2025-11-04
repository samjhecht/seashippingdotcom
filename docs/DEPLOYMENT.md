# Deployment Guide - Sea Shipping Line

This guide covers the complete deployment process for the Sea Shipping Line website to Vercel.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Environment Variables](#environment-variables)
- [Domain Configuration](#domain-configuration)
- [Deployment Process](#deployment-process)
- [Post-Deployment Verification](#post-deployment-verification)
- [Monitoring and Analytics](#monitoring-and-analytics)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

- [x] Node.js 18+ installed
- [x] Git repository access
- [x] Vercel account (sign up at https://vercel.com)
- [x] Domain access (DNS management for seashipping.com)
- [x] Resend API key (for email services)
- [x] Google Analytics 4 property set up

## Initial Setup

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate with your Vercel account.

### 3. Link Project to Vercel

```bash
cd /path/to/seashippingdotcom
vercel link
```

Select or create a new Vercel project when prompted.

## Environment Variables

### Required Environment Variables

The following environment variables must be configured in the Vercel dashboard:

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment mode | Yes | `production` |
| `RESEND_API_KEY` | Resend email service API key | Yes | `re_xxxxx` |
| `RATE_REQUEST_EMAIL` | Email for rate requests | Yes | `operations@seashipping.com` |
| `CONTACT_EMAIL` | Email for contact forms | Yes | `info@seashipping.com` |
| `NEWSLETTER_EMAIL` | Email for newsletter signups | Yes | `marketing@seashipping.com` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 tracking ID | Yes | `G-V0F46NZK7J` |
| `NEXT_PUBLIC_SITE_URL` | Production site URL | Yes | `https://seashipping.com` |

### Setting Environment Variables in Vercel

#### Option 1: Via Vercel Dashboard

1. Go to your project on [vercel.com](https://vercel.com)
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable with appropriate values
4. Select the environments: Production, Preview, Development
5. Click **Save**

#### Option 2: Via Vercel CLI

```bash
# Add environment variables via CLI
vercel env add RESEND_API_KEY
vercel env add RATE_REQUEST_EMAIL
vercel env add CONTACT_EMAIL
vercel env add NEWSLETTER_EMAIL
vercel env add NODE_ENV
vercel env add NEXT_PUBLIC_SITE_URL

# Pull environment variables for local development
vercel env pull .env.local
```

### Local Development Setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in the values in `.env.local` with your development credentials

3. **NEVER commit `.env.local` to git** - it's already in `.gitignore`

## Domain Configuration

### 1. Add Domain in Vercel Dashboard

1. Go to your project → **Settings** → **Domains**
2. Add your custom domain: `seashipping.com`
3. Add www subdomain: `www.seashipping.com`
4. Vercel will provide DNS records

### 2. Configure DNS Records

Update your DNS settings with your domain registrar:

#### A Record (for apex domain)
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

#### CNAME Record (for www subdomain)
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### 3. SSL Certificate

SSL certificates are automatically provisioned by Vercel via Let's Encrypt. This process typically takes a few minutes after DNS records are configured.

### 4. Domain Redirect

The `vercel.json` configuration automatically redirects `www.seashipping.com` to `seashipping.com`.

## Deployment Process

### Development Workflow

```bash
# Run local development server (port 6969)
npm run dev

# Build and test production build locally
npm run build
npm start

# Run all tests before deploying
npm run test:all
```

### Deploy to Preview Environment

Preview deployments are created automatically for every push to any branch:

```bash
# Push to any branch to create a preview deployment
git push origin feature-branch
```

Or manually deploy:

```bash
vercel
```

Preview URL will be provided (e.g., `seashipping-abc123.vercel.app`)

### Deploy to Production

Production deployments are triggered by pushes to the `main` branch:

```bash
# Push to main branch
git push origin main
```

Or manually deploy to production:

```bash
vercel --prod
```

### Staging Environment (Optional)

To set up a dedicated staging environment:

1. Create a `staging` branch:
   ```bash
   git checkout -b staging
   ```

2. Configure staging domain in Vercel:
   - Add `staging.seashipping.com` as a domain
   - Link it to preview deployments from the `staging` branch

3. Deploy to staging:
   ```bash
   git push origin staging
   ```

## Pre-Deployment Checklist

Before deploying to production, verify:

### Code Quality
- [ ] All tests passing (`npm run test:all`)
- [ ] Linting passes (`npm run lint`)
- [ ] TypeScript compiles with zero errors (`npm run type-check`)
- [ ] Build succeeds locally (`npm run build`)

### Performance
- [ ] Lighthouse scores meet targets
  - Mobile: >90
  - Desktop: >95
- [ ] Images optimized
- [ ] Bundle size reviewed (`npm run analyze`)
- [ ] Core Web Vitals verified

### Accessibility
- [ ] Zero accessibility violations (`npm run test:a11y`)
- [ ] Keyboard navigation tested
- [ ] Screen reader compatibility verified
- [ ] Color contrast meets WCAG AA

### Content
- [ ] All content reviewed and approved
- [ ] All images have descriptive alt text
- [ ] All internal links verified
- [ ] Forms tested and working
- [ ] No broken links

### SEO
- [ ] Meta titles and descriptions optimized
- [ ] Open Graph tags configured
- [ ] Sitemap generates correctly (`/sitemap.xml`)
- [ ] Robots.txt configured (`/robots.txt`)
- [ ] Canonical URLs set

### Security
- [ ] Environment variables configured in Vercel
- [ ] No API keys or secrets in code
- [ ] Security headers configured
- [ ] HTTPS enforcement verified
- [ ] Rate limiting implemented (if applicable)

### Monitoring
- [ ] Google Analytics tracking verified
- [ ] Vercel Analytics enabled
- [ ] Error tracking configured (if using Sentry)

## Post-Deployment Verification

After deploying to production, run these verification tests:

### 1. Basic Smoke Tests

```bash
# Check main domain
curl -I https://seashipping.com

# Check www redirect
curl -I https://www.seashipping.com

# Check sitemap
curl https://seashipping.com/sitemap.xml

# Check robots.txt
curl https://seashipping.com/robots.txt
```

Expected results:
- Main domain returns 200 OK
- www redirects to non-www (301)
- Sitemap is accessible
- Robots.txt is accessible

### 2. SSL Certificate Verification

```bash
# Check SSL certificate
openssl s_client -connect seashipping.com:443 -servername seashipping.com < /dev/null
```

Verify:
- Certificate is valid
- Issued by Let's Encrypt
- Covers both www and non-www domains

### 3. Security Headers Check

```bash
# Check security headers
curl -I https://seashipping.com | grep -E 'Strict-Transport-Security|Content-Security-Policy|X-Frame-Options'
```

Expected headers:
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Frame-Options: DENY`
- `Content-Security-Policy: ...`

### 4. Performance Testing

```bash
# Run Lighthouse audit
npx lighthouse https://seashipping.com --view

# Check broken links
npx broken-link-checker https://seashipping.com
```

### 5. Functional Testing

Test all critical user flows:
- [ ] Homepage loads correctly
- [ ] All service pages accessible
- [ ] Rate request form submits successfully
- [ ] Contact form submits successfully
- [ ] Newsletter signup works
- [ ] Navigation menu functions
- [ ] Mobile responsive design works
- [ ] All images load properly

### 6. Analytics Verification

1. Visit the site and navigate through pages
2. Check Google Analytics Real-Time report
3. Verify events are being tracked
4. Check Vercel Analytics dashboard

## Monitoring and Analytics

### Google Analytics 4

- **Property ID**: G-V0F46NZK7J
- **Dashboard**: https://analytics.google.com
- **Key Metrics to Monitor**:
  - Page views
  - User engagement
  - Conversion rate (form submissions)
  - Traffic sources
  - Core Web Vitals

### Vercel Analytics

Access via Vercel dashboard → Your Project → Analytics

Monitors:
- Real User Monitoring (RUM)
- Web Vitals scores
- Page load performance
- Geographic distribution

### Uptime Monitoring (Recommended)

Set up external uptime monitoring:

**Option 1: UptimeRobot** (Free)
- https://uptimerobot.com
- Configure 5-minute checks
- Email/SMS alerts

**Option 2: Vercel Monitoring** (Paid)
- Included in Pro plan
- Automatic health checks
- Alert integrations

## Troubleshooting

### Build Failures

**Issue**: Build fails on Vercel but works locally

**Solution**:
1. Check Vercel build logs
2. Ensure all dependencies are in `package.json` (not just devDependencies)
3. Verify Node.js version compatibility
4. Clear Vercel build cache: Settings → General → Clear Build Cache

### Environment Variables Not Working

**Issue**: Features work locally but fail in production

**Solution**:
1. Verify environment variables are set in Vercel dashboard
2. Ensure variables are set for the correct environment (Production/Preview)
3. Redeploy after adding new environment variables
4. Check variable names match exactly (case-sensitive)

### Domain Not Resolving

**Issue**: Domain shows "Not Found" or doesn't connect

**Solution**:
1. Verify DNS records are correctly configured
2. Wait for DNS propagation (can take up to 48 hours)
3. Check domain is added in Vercel dashboard
4. Try flushing DNS cache locally: `sudo dscacheutil -flushcache` (macOS)

### SSL Certificate Issues

**Issue**: SSL certificate not provisioning

**Solution**:
1. Ensure DNS records point to Vercel
2. Wait up to 24 hours for certificate issuance
3. Remove and re-add domain in Vercel dashboard
4. Contact Vercel support if issues persist

### Forms Not Submitting

**Issue**: Contact or rate request forms fail

**Solution**:
1. Verify `RESEND_API_KEY` is set correctly
2. Check email recipient addresses are configured
3. Review Vercel function logs for errors
4. Test API endpoints directly

### Analytics Not Tracking

**Issue**: No data appearing in Google Analytics

**Solution**:
1. Verify `NEXT_PUBLIC_GA_ID` is set correctly
2. Ensure GA4 property is configured (not Universal Analytics)
3. Check browser ad blockers aren't blocking tracking
4. Test in incognito mode
5. Verify page views in GA Real-Time report

### Performance Issues

**Issue**: Slow page loads or poor Web Vitals scores

**Solution**:
1. Run Lighthouse audit to identify bottlenecks
2. Review bundle size: `npm run analyze`
3. Optimize images if needed
4. Check for large client-side JavaScript
5. Review Network tab in DevTools
6. Consider enabling Vercel Edge Caching

## Rollback Procedure

If critical issues are discovered post-deployment:

### Option 1: Instant Rollback (Vercel Dashboard)

1. Go to Vercel dashboard → Your Project → Deployments
2. Find the last working deployment
3. Click "..." menu → "Promote to Production"

### Option 2: Git Revert

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard <commit-hash>
git push --force origin main
```

## Continuous Deployment

The project is configured for continuous deployment:

- **Automatic**: Pushes to `main` trigger production deployments
- **Preview**: All other branches get preview deployments
- **Rollback**: Previous deployments remain accessible

## Support and Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Project Repository**: https://github.com/samjhecht/seashippingdotcom

## Maintenance Schedule

### Regular Tasks

- **Weekly**: Review Vercel Analytics and GA4 reports
- **Monthly**: Check for dependency updates
- **Quarterly**: Security audit and penetration testing
- **Annually**: SSL certificate renewal (automatic, verify only)

### Updates and Patches

```bash
# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Check for security vulnerabilities
npm audit
npm audit fix
```

## Conclusion

Following this deployment guide ensures a smooth and secure deployment of the Sea Shipping Line website. Always test thoroughly in preview environments before promoting to production.

For questions or issues, contact the development team or consult Vercel support.
