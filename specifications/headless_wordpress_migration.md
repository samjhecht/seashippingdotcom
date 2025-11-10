# Headless WordPress + Next.js Implementation Guide

## Overview

This guide outlines the complete process for converting a traditional WordPress site to a headless architecture, where WordPress serves as the content management backend and Next.js handles the frontend presentation.

**Architecture:**

- WordPress: Content management, admin dashboard, data storage
- Next.js: Frontend rendering, user-facing website
- REST API/GraphQL: Communication layer between WordPress and Next.js

---

## Sea Shipping Line v1 WordPress Site Inventory

### WordPress Installation Details

**Current Configuration:**

- WordPress version: 6.8.3
- Page builder: Elementor Pro
- Current domain: seashipping.com
- Current hosting: GoDaddy shared hosting
- PHP version: 8.1+ (requires verification)
- SSL certificate: Active (Let's Encrypt or GoDaddy SSL)

### Forms & Plugins Identified

Based on comprehensive analysis of the v1 site, the following plugins and integrations are active:

**1. Contact Form 7** - Primary form plugin (critical)

Multi-purpose request form with the following configuration:

- **Subject dropdown** (9 options):
  - General Inquiry
  - Rate Request
  - Documentation Request
  - Claims
  - Account Inquiry
  - New Account Setup
  - Trade Updates
  - Feedback/Suggestions
  - Other

- **Cargo type dropdown** (10 options):
  - General Cargo
  - Hazardous Material (HAZMAT)
  - Refrigerated (Reefer)
  - Perishables
  - Oversized/Out of Gauge
  - High Value
  - Automotive/Vehicles
  - Machinery/Equipment
  - Consolidated (LCL)
  - Other

- **Container size dropdown** (6 options):
  - 20' Standard
  - 40' Standard
  - 40' High Cube
  - 45' High Cube
  - Refrigerated Container
  - Other/Not Sure

- **Standard contact fields**: Name, company, email, phone, message
- **Hazmat checkbox**: Yes/No for hazardous materials
- **reCAPTCHA integration**: Site key `6LfkGEAcAAAAADOXNCVebWJnMX1YLVUo29rPtDxR`

**Newsletter subscription form:**

- Email field only
- reCAPTCHA v3 protected
- Integrates with email marketing platform (needs verification)

**Newsletter unsubscribe form:**

- Email field only
- Confirmation page required

**2. Elementor Pro** - Page builder (critical for content migration)

- Used for all page layouts
- Custom widgets and templates
- Dynamic content sections
- Responsive design settings
- Global color/typography settings

**3. ExportFile Integration** (external platform)

- Platform URL: https://exportfile.com
- Purpose: Client document management and shipment tracking
- Integration type: External link (not API-integrated)
- User flow: SSL site → ExportFile login portal

**4. SharePoint Integration** (internal access)

- SSL Company Portal (SharePoint-based intranet)
- Purpose: Internal employee access to company resources
- Integration type: External link (SSO or separate login)

**5. Additional Plugins (requires verification)**

- Yoast SEO or Rank Math (for SEO metadata)
- Security plugin (Wordfence, iThemes Security, or similar)
- Caching plugin (W3 Total Cache, WP Super Cache, or similar)
- Backup plugin (UpdraftPlus or similar)
- Image optimization plugin

### Content Types

**Pages (9 main pages):**

1. Home/Landing page
2. About Us
3. Services
4. Trade Updates (blog index)
5. Newsletter Archive
6. Forms & Documents
7. Resources/Industry Tools
8. Office Locations
9. Contact

**News/Blog Articles:**

- Category: Trade Updates
- Category: Industry News
- Category: Company Announcements
- Archive dating back to 2019
- Estimated 50-100 articles
- Featured images for most posts
- Tags for categorization

**Newsletters:**

- Quarterly publication schedule
- PDF format archives (2019-2024)
- Approximately 20 newsletter PDFs
- Categories by year and quarter

**Forms (35+ PDF downloads):**

- Bill of Lading forms
- Cargo insurance documents
- Customs documentation templates
- Rate request forms
- Shipper's Letter of Instruction (SLI)
- Delivery order forms
- Warehouse receipt templates
- Commercial invoice templates
- Packing list templates
- Certificate of origin forms
- Dock receipt forms
- Cargo release authorization
- Storage request forms
- Claims forms
- Account application forms

**Office Locations (9 US offices):**

- Los Angeles (headquarters)
- Oakland
- Seattle
- Portland
- Long Beach
- San Diego
- Phoenix
- Dallas
- Houston

Each office includes:

- Full address
- Phone number
- Fax number (legacy)
- Email contact
- Hours of operation
- Map integration (Google Maps embed)

**International Partners (66 worldwide partners):**

- Partner company name
- Country/region
- Contact information
- Service specialties
- Partner since date (for some)

**Industry Tools (50+ external links):**

- US Customs and Border Protection
- Federal Maritime Commission
- NVOCC databases
- Shipping line websites
- Port authority sites
- Customs brokers
- Freight forwarders
- Trade associations
- Regulatory bodies

### Required Migrations

**Content migrations needed:**

1. **Page content (9 pages)**
   - HTML content from Elementor
   - Conversion to Next.js components
   - Preserve layout and styling
   - Migrate inline styles to Tailwind CSS

2. **Media library (100+ files)**
   - 35+ PDF forms
   - Hero images (5-10 high-res images)
   - Office photos
   - Service/cargo type images
   - Association/certification logos (15+)
   - Newsletter PDFs (20+)
   - Partner company logos (66)
   - Icon sets

3. **Blog/News content (50-100 posts)**
   - Post content (HTML)
   - Featured images
   - Categories and tags
   - Publication dates
   - Author information
   - SEO metadata

4. **Office location data**
   - Structured data for 9 offices
   - Contact information
   - Hours of operation
   - Map coordinates

5. **International partner data**
   - Partner information for 66 companies
   - Organized by region/country
   - Contact details

6. **Navigation menus**
   - Primary navigation
   - Footer navigation (4 columns)
   - Mobile menu structure

7. **SEO metadata**
   - Page titles and descriptions
   - Open Graph data
   - Schema.org structured data
   - Canonical URLs
   - XML sitemap

### Forms to Replace/Integrate

**1. Multi-Purpose Request Form**

**Current implementation:** Contact Form 7

**Migration status:** Already implemented in Next.js

- Location: `/src/app/contact/page.tsx`
- Technology: React Hook Form + Zod validation
- Styling: Tailwind CSS + shadcn/ui Select components
- Features:
  - Subject dropdown (9 options) ✓
  - Cargo type dropdown (10 options) ✓
  - Container size dropdown (6 options) ✓
  - Hazmat checkbox ✓
  - Standard contact fields ✓
  - Client-side validation ✓
  - API route: `/api/contact` ✓

**Next steps:**

- Add reCAPTCHA v3 integration
- Connect to email service (SendGrid/Resend)
- Implement success/error messaging
- Add submission tracking for analytics

**2. Newsletter Subscribe Form**

**Current implementation:** Contact Form 7 + email marketing integration

**Recommended approach:**

- Simple email input field
- reCAPTCHA v3 protection
- Next.js API route: `/api/newsletter/subscribe`
- Integration options:
  - Mailchimp API
  - SendGrid Marketing Lists
  - Resend Audiences
  - ConvertKit
  - Brevo (formerly Sendinblue)

**Implementation needed:**

- Component: `/src/components/newsletter-subscribe-form.tsx`
- API route: `/src/app/api/newsletter/subscribe/route.ts`
- Zod validation schema
- Email service integration
- Double opt-in confirmation email
- Success/error states
- Loading states

**3. Newsletter Unsubscribe Form**

**Current implementation:** Contact Form 7 custom endpoint

**Recommended approach:**

- Email input field
- Confirmation step
- Next.js API route: `/api/newsletter/unsubscribe`
- One-click unsubscribe links in emails (per CAN-SPAM compliance)

**Implementation needed:**

- Component: `/src/components/newsletter-unsubscribe-form.tsx`
- API route: `/src/app/api/newsletter/unsubscribe/route.ts`
- Confirmation page: `/unsubscribe-confirmation`
- Email service integration
- Success messaging

### Migration Strategy for Elementor Content

**Challenge:** Elementor uses proprietary JSON-based content storage

**Approach:**

1. **Export via WordPress Tools**
   - Use WordPress native export (XML format)
   - Elementor data included in post meta

2. **Content transformation pipeline**
   - Parse Elementor JSON data structure
   - Map Elementor widgets to React components:
     - Heading → Custom Heading component
     - Text Editor → Prose-styled div
     - Image → Next.js Image component
     - Button → Button component (shadcn/ui)
     - Icon Box → Custom card component
     - Testimonial → Custom testimonial component
     - Accordion → Accordion component (shadcn/ui)
     - Tabs → Tabs component (shadcn/ui)

3. **Manual content migration for complex layouts**
   - Recreate sections in Next.js/React
   - Match visual design with Tailwind CSS
   - Improve performance with modern components
   - Enhance interactivity with client-side features

4. **Preserve SEO-critical elements**
   - H1-H6 hierarchy
   - Alt text for images
   - Internal linking structure
   - URL slugs

---

## Integration Requirements for Sea Shipping Line

### Analytics & Tracking

**Google Analytics 4:**

- Measurement ID: `G-V0F46NZK7J` (confirmed active)
- Implementation: `@next/third-parties/google`
- Tracking requirements:
  - Page views (all pages)
  - Form submissions (contact, newsletter)
  - PDF downloads (forms/newsletters)
  - External link clicks (ExportFile, SharePoint, industry tools)
  - Office location interactions
  - Search queries (if search implemented)

**Google Tag Manager (if applicable):**

- Container ID: Needs verification
- Tag configurations to migrate
- Custom events to preserve

**Enhanced tracking needed:**

- Conversion tracking for form submissions
- Event tracking for PDF downloads
- Cross-domain tracking for ExportFile integration
- User journey tracking (page flow analysis)
- Custom dimensions: User type (new vs. returning), form type submitted

### reCAPTCHA Integration

**Current v1 site configuration:**

- Site key: `6LfkGEAcAAAAADOXNCVebWJnMX1YLVUo29rPtDxR`
- Version: reCAPTCHA v3 (invisible)
- Protected forms: Contact form, newsletter subscribe

**Migration requirements:**

- Obtain new reCAPTCHA v3 site key for production domain
- Obtain new secret key for server-side validation
- Environment variables needed:
  - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` (client-side)
  - `RECAPTCHA_SECRET_KEY` (server-side)

**Implementation approach:**

```typescript
// npm install react-google-recaptcha-v3

// app/providers.tsx
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export function Providers({ children }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}

// In form components:
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const { executeRecaptcha } = useGoogleReCaptcha();
const token = await executeRecaptcha('contact_form');

// Send token with form submission for server-side verification
```

**Server-side verification:**

- API route validates token with Google
- Minimum score threshold: 0.5 (adjustable)
- Fallback handling for failed verification
- Error logging for suspicious activity

### Email Service Integration

**Current v1 setup:**

- WordPress `wp_mail()` function
- SMTP configuration through hosting provider (GoDaddy)
- Newsletter managed through Contact Form 7 plugin

**Recommended email service for Next.js:**

**Option A: Resend (Recommended)**

- Modern, developer-friendly API
- Generous free tier (3,000 emails/month, 100 emails/day)
- React Email template support
- Excellent deliverability
- Simple pricing: $20/month for 50,000 emails
- Environment variables needed:
  - `RESEND_API_KEY`
  - `RESEND_FROM_EMAIL` (e.g., "info@seashipping.com")

**Option B: SendGrid**

- Established provider with good reputation
- Free tier: 100 emails/day
- Advanced analytics and reporting
- Template management
- Environment variables needed:
  - `SENDGRID_API_KEY`
  - `SENDGRID_FROM_EMAIL`

**Option C: Postmark**

- Focus on transactional emails
- Excellent deliverability rates
- Free tier: 100 emails/month
- Good for contact forms
- Environment variables needed:
  - `POSTMARK_SERVER_TOKEN`
  - `POSTMARK_FROM_EMAIL`

**Implementation requirements:**

1. **Contact form emails:**
   - To: info@seashipping.com (or configured admin email)
   - Subject: "New Contact Form Submission - [Subject Type]"
   - Body: Formatted HTML with all form fields
   - Reply-To: Customer's email address
   - Auto-response to customer confirming receipt

2. **Newsletter subscription:**
   - Confirmation email (double opt-in)
   - Welcome email
   - Integration with marketing platform or custom solution

3. **Email templates:**
   - Use React Email for template creation
   - Responsive design
   - SSL branding (logo, colors)
   - Professional formatting

**Newsletter management options:**

**Option A: Keep WordPress for newsletter subscribers**

- WordPress maintains subscriber list
- Next.js form submits to WordPress REST API
- WordPress plugin handles email sending

**Option B: Migrate to dedicated email marketing platform**

- Mailchimp (free up to 500 subscribers)
- ConvertKit (best for newsletters, $9/month)
- Brevo/Sendinblue (free up to 300 emails/day)
- EmailOctopus (budget-friendly, $8/month)

**Option C: Custom solution with Resend Audiences**

- Store subscribers in database (PostgreSQL/MySQL)
- Use Resend for sending
- Build custom admin interface for managing list
- More control, more development required

### ExportFile Platform Integration

**Current integration:**

- External platform: https://exportfile.com
- Integration method: Direct link from SSL website
- User flow: Click "Client Portal" → Redirect to ExportFile login
- Authentication: Separate login (not SSO)

**Migration approach:**

- Maintain external link approach (no code changes needed)
- Add prominent CTA button/link in navigation
- Consider dedicated "Client Portal" page with:
  - ExportFile login button
  - Brief description of portal features
  - Support contact if login issues
  - Link to registration (if applicable)

**Future enhancement possibilities:**

- Check if ExportFile offers API integration
- Implement SSO if ExportFile supports SAML/OAuth
- Embed limited functionality (shipment tracking widget)
- Currently: Keep as external link (simplest approach)

### SharePoint Company Portal Integration

**Current integration:**

- SSL Company Portal (internal SharePoint site)
- Integration method: Direct link
- User flow: "Employee Portal" link → SharePoint login
- Authentication: Microsoft 365 credentials

**Migration approach:**

- Maintain external link approach
- Add to navigation (likely in footer or header dropdown)
- May require internal network or VPN access
- Consider making this link visible only to employees:
  - Could use IP-based access control
  - Or separate "Employees" section with basic auth
  - Or simply keep as public link (SharePoint handles auth)

**Implementation:**

- Simple link in navigation
- Optional: Dedicated "For Employees" page with:
  - SharePoint portal link
  - Other internal resources
  - IT support contact
  - Onboarding documentation links

### Map Integration for Office Locations

**Current v1 implementation:**

- Google Maps embeds for each office location
- Interactive maps showing exact locations
- Directions link to Google Maps

**Migration approach:**

**Option A: Google Maps Embed API (Recommended)**

- Free with Google Cloud account
- No billing required for basic embeds
- Implementation:
  ```tsx
  <iframe
    src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodedAddress}`}
    width="100%"
    height="400"
    loading="lazy"
  />
  ```
- Requires Google Maps Embed API key
- Environment variable: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

**Option B: Google Maps JavaScript API**

- More interactive features
- Customizable markers and styling
- Requires billing enabled (but generous free tier)
- Implementation: `@googlemaps/js-api-loader`

**Option C: Mapbox**

- Alternative to Google Maps
- Free tier: 50,000 map loads/month
- Beautiful styling options
- Implementation: `mapbox-gl`

**Recommended for SSL:**

- Use Google Maps Embed API (Option A)
- Simple, free, reliable
- Matches current user experience
- No JavaScript library needed
- Each office page has embedded map
- Optional: Main office locations page with interactive multi-marker map

### Environment Variables Summary

**Required for production deployment:**

```env
# WordPress API (for content fetching during migration)
WORDPRESS_API_URL=https://seashipping.com/wp-json/wp/v2

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-V0F46NZK7J

# reCAPTCHA (obtain new keys)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here

# Email service (choose one)
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=info@seashipping.com

# Google Maps (if using)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key_here

# Next.js revalidation secret
REVALIDATE_SECRET=random_secure_string_here

# Newsletter service (if separate from email service)
MAILCHIMP_API_KEY=xxxxxxxx (if using Mailchimp)
MAILCHIMP_LIST_ID=xxxxxxxx

# External integrations (URLs only, no keys needed)
NEXT_PUBLIC_EXPORTFILE_URL=https://exportfile.com
NEXT_PUBLIC_SHAREPOINT_PORTAL_URL=https://[subdomain].sharepoint.com
```

### Third-Party Services to Set Up

**Priority 1 (Essential):**

1. Resend account (or alternative email service)
2. Google reCAPTCHA v3 (new site keys)
3. Google Maps API key (if using embeds)

**Priority 2 (Important):**

4. Newsletter/email marketing platform selection
5. Error monitoring (Sentry recommended)
6. Uptime monitoring (UptimeRobot or Pingdom)

**Priority 3 (Optional/Future):**

7. Search functionality (Algolia if needed)
8. CDN configuration (automatic with Vercel)
9. Additional analytics tools

### Migration Timeline Adjustments

**Additional time needed for SSL-specific requirements:**

- Form integration and testing: +1 week
- PDF migration and organization: +3 days
- Newsletter archive setup: +2 days
- Office locations with maps: +3 days
- International partners data structure: +3 days
- Email service setup and testing: +2 days
- reCAPTCHA integration: +1 day

**Total estimated timeline for SSL migration: 8-10 weeks**

---

## Phase 1: Assessment & Planning

### 1.1 Audit Current WordPress Site

**Identify content types:**

- [ ] Posts (blog articles)
- [ ] Pages (static pages)
- [ ] Custom post types (if any)
- [ ] Categories and tags
- [ ] Media (images, videos)
- [ ] Menus/navigation
- [ ] Custom fields/metadata

**Document active plugins:**

- [ ] List all installed and active plugins
- [ ] Identify critical plugins (forms, newsletters, SEO, etc.)
- [ ] Determine which plugins have API support
- [ ] Note plugins that may need replacement

**Check theme features:**

- [ ] Identify theme-specific functionality
- [ ] Document any custom fields or theme options
- [ ] Note any theme-dependent shortcodes

**WordPress version & hosting:**

- [ ] Note current WordPress version
- [ ] Document PHP version
- [ ] Identify current hosting provider (GoDaddy)
- [ ] Check available hosting resources (memory, storage)

### 1.2 Plan Content Migration Strategy

**For each content type, determine:**

- How it will be fetched (REST API, GraphQL, or custom endpoint)
- Update frequency (static generation vs. server-side rendering)
- Required fields and relationships
- SEO metadata requirements

---

## Phase 2: WordPress Backend Configuration

### 2.1 Backup Everything

**Before making any changes:**

- [ ] Create full WordPress database backup
- [ ] Backup all WordPress files (via cPanel File Manager)
- [ ] Export content via WordPress Tools → Export
- [ ] Document current hosting configuration

**Recommended backup method via cPanel:**

```
1. Log into cPanel
2. Navigate to "Backup" or "Backup Wizard"
3. Create full backup (or download /public_html and database separately)
4. Store backup in safe location
```

### 2.2 Enable and Configure WordPress REST API

**The REST API is enabled by default in WordPress 4.7+, but verify:**

- [ ] Visit `https://yoursite.com/wp-json/wp/v2/posts`
- [ ] Confirm JSON response with post data
- [ ] Test other endpoints:
  - `/wp-json/wp/v2/pages`
  - `/wp-json/wp/v2/categories`
  - `/wp-json/wp/v2/media`

**Common REST API plugins to consider:**

- [ ] **WPGraphQL** (if preferring GraphQL over REST)
- [ ] **ACF to REST API** (if using Advanced Custom Fields)
- [ ] **JWT Authentication** (if need authenticated requests)
- [ ] **Better REST API Featured Images** (for easier image handling)

### 2.3 Configure CORS Headers

**WordPress needs to allow requests from your Next.js domain.**

**Option A: Via Plugin**

- [ ] Install "WP REST API Controller" or similar CORS plugin
- [ ] Configure allowed origins

**Option B: Via functions.php**

Add to your theme's `functions.php` file (via cPanel File Manager or WordPress Theme Editor):

```php
// Add CORS headers for headless WordPress
function add_cors_http_header(){
    // Allow requests from your Next.js domain
    header("Access-Control-Allow-Origin: https://your-nextjs-site.com");
    // During development, you might use:
    // header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}
add_action('init','add_cors_http_header');
```

**Option C: Via .htaccess**

Add to `.htaccess` file in WordPress root:

```apache
<IfModule mod_headers.c>
    SetEnvIf Origin "^https?://(your-nextjs-site\.com|localhost:3000)$" AccessControlAllowOrigin=$0
    Header set Access-Control-Allow-Origin %{AccessControlAllowOrigin}e env=AccessControlAllowOrigin
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization"
</IfModule>
```

### 2.4 Optimize WordPress for Headless Use

**Install recommended plugins:**

- [ ] **WPGraphQL** (if using GraphQL)
  - Provides more efficient queries than REST API
  - Better for complex relationships
  - Install: Plugins → Add New → Search "WPGraphQL"

- [ ] **Yoast SEO** or **Rank Math**
  - Ensures SEO metadata is accessible via API
  - Adds SEO fields to API responses

- [ ] **Advanced Custom Fields (ACF)** + **ACF to REST API**
  - If you need custom fields beyond WordPress defaults
  - Exposes custom fields to REST API

- [ ] **Application Passwords** (WordPress 5.6+)
  - For authenticated API requests
  - Found in Users → Profile → Application Passwords

**Remove unnecessary plugins:**

- [ ] Caching plugins (not needed for headless setup)
- [ ] Frontend-specific plugins (sliders, page builders, etc.)
- [ ] Comment systems (handle in Next.js or use external service)

### 2.5 Configure Permalinks

**Ensure clean URLs:**

- [ ] Go to Settings → Permalinks
- [ ] Select "Post name" structure (`/%postname%/`)
- [ ] Save changes
- [ ] This ensures consistent URL mapping between WordPress and Next.js

### 2.6 Secure WordPress Admin

**Since WordPress will remain accessible:**

- [ ] Change admin URL (plugin: WPS Hide Login)
- [ ] Use strong passwords for all users
- [ ] Enable two-factor authentication (plugin: Two Factor Authentication)
- [ ] Limit login attempts (plugin: Limit Login Attempts Reloaded)
- [ ] Keep WordPress core and plugins updated
- [ ] Consider moving WordPress to subdomain (e.g., admin.yoursite.com)

### 2.7 Test API Endpoints

**Create a test checklist:**

- [ ] Fetch all posts: `GET /wp-json/wp/v2/posts`
- [ ] Fetch single post: `GET /wp-json/wp/v2/posts/{id}`
- [ ] Fetch pages: `GET /wp-json/wp/v2/pages`
- [ ] Fetch categories: `GET /wp-json/wp/v2/categories`
- [ ] Fetch tags: `GET /wp-json/wp/v2/tags`
- [ ] Fetch media: `GET /wp-json/wp/v2/media`
- [ ] Test custom post types (if any)
- [ ] Verify CORS headers are working

**Use tools like:**

- Postman
- Insomnia
- Browser DevTools
- `curl` command line

---

## Phase 3: Next.js Frontend Development

### 3.1 Project Setup

**Environment configuration:**

Create `.env.local` file:

```env
# WordPress API endpoint
WORDPRESS_API_URL=https://yourwordpresssite.com/wp-json/wp/v2
# Or for GraphQL:
WORDPRESS_GRAPHQL_URL=https://yourwordpresssite.com/graphql

# For preview mode (optional)
WORDPRESS_AUTH_REFRESH_TOKEN=your_token_here
WORDPRESS_PREVIEW_SECRET=your_secret_here
```

**Install required packages:**

```bash
# REST API approach
npm install axios
# or
npm install ky

# GraphQL approach (if using WPGraphQL)
npm install @apollo/client graphql

# Image optimization
npm install sharp

# SEO
npm install next-seo
```

### 3.2 Create WordPress API Service

**Create `lib/wordpress.js` (REST API version):**

```javascript
const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;

export async function fetchAPI(endpoint, options = {}) {
  const headers = { "Content-Type": "application/json" };

  const res = await fetch(`${WORDPRESS_API_URL}${endpoint}`, {
    headers,
    ...options,
  });

  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status}`);
  }

  return res.json();
}

// Fetch all posts
export async function getAllPosts() {
  const posts = await fetchAPI("/posts?_embed&per_page=100");
  return posts;
}

// Fetch single post by slug
export async function getPostBySlug(slug) {
  const posts = await fetchAPI(`/posts?slug=${slug}&_embed`);
  return posts[0];
}

// Fetch all pages
export async function getAllPages() {
  const pages = await fetchAPI("/pages?_embed&per_page=100");
  return pages;
}

// Fetch single page by slug
export async function getPageBySlug(slug) {
  const pages = await fetchAPI(`/pages?slug=${slug}&_embed`);
  return pages[0];
}

// Fetch categories
export async function getCategories() {
  const categories = await fetchAPI("/categories?per_page=100");
  return categories;
}

// Fetch menus (requires menu plugin or custom endpoint)
export async function getMenu(menuId) {
  const menu = await fetchAPI(`/menus/v1/menus/${menuId}`);
  return menu;
}
```

**Or create `lib/wordpress.js` (GraphQL version):**

```javascript
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.WORDPRESS_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export async function getAllPosts() {
  const { data } = await client.query({
    query: gql`
      query AllPosts {
        posts(first: 100) {
          nodes {
            id
            title
            slug
            excerpt
            date
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            categories {
              nodes {
                name
                slug
              }
            }
          }
        }
      }
    `,
  });

  return data.posts.nodes;
}

export async function getPostBySlug(slug) {
  const { data } = await client.query({
    query: gql`
      query PostBySlug($slug: ID!) {
        post(id: $slug, idType: SLUG) {
          id
          title
          content
          slug
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          seo {
            title
            metaDesc
          }
        }
      }
    `,
    variables: { slug },
  });

  return data.post;
}
```

### 3.3 Implement Pages with Data Fetching

**Dynamic blog post page: `app/blog/[slug]/page.js`**

```javascript
import { getPostBySlug, getAllPosts } from "@/lib/wordpress";
import Image from "next/image";

// Generate static paths for all posts
export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Fetch post data
async function getPost(slug) {
  const post = await getPostBySlug(slug);
  return post;
}

// Metadata for SEO
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);

  return {
    title: post.title.rendered || post.title,
    description: post.excerpt.rendered || post.excerpt,
  };
}

// Page component
export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);

  return (
    <article>
      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

      {post.featured_media && (
        <Image
          src={post._embedded["wp:featuredmedia"][0].source_url}
          alt={post.title.rendered}
          width={1200}
          height={600}
        />
      )}

      <div
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        className="prose"
      />
    </article>
  );
}

// Revalidate every hour
export const revalidate = 3600;
```

**Blog index page: `app/blog/page.js`**

```javascript
import { getAllPosts } from "@/lib/wordpress";
import Link from "next/link";
import Image from "next/image";

async function getPosts() {
  const posts = await getAllPosts();
  return posts;
}

export default async function BlogIndex() {
  const posts = await getPosts();

  return (
    <div>
      <h1>Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article key={post.id}>
            {post._embedded?.["wp:featuredmedia"] && (
              <Image
                src={post._embedded["wp:featuredmedia"][0].source_url}
                alt={post.title.rendered}
                width={400}
                height={250}
              />
            )}

            <h2>
              <Link href={`/blog/${post.slug}`}>
                <span
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
              </Link>
            </h2>

            <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </article>
        ))}
      </div>
    </div>
  );
}

export const revalidate = 3600;
```

### 3.4 Handle WordPress Content Specifics

**WordPress HTML content quirks:**

- [ ] WordPress content comes as HTML strings
- [ ] Use `dangerouslySetInnerHTML` carefully
- [ ] Sanitize content if needed (use `DOMPurify` library)
- [ ] Handle WordPress shortcodes (may need custom parsing)
- [ ] Process WordPress image URLs (may need optimization)

**Image optimization strategy:**

```javascript
// Helper function to get optimized image URLs
export function getOptimizedImageUrl(wpImageUrl, width, height) {
  // If using WordPress image sizes:
  // WordPress generates multiple sizes (thumbnail, medium, large)

  // Or use Next.js Image Optimization
  return wpImageUrl; // Let Next.js <Image> handle it
}
```

**WordPress embeds (YouTube, Twitter, etc.):**

```javascript
// Use React component for WordPress oEmbed content
import { useEffect, useRef } from "react";

export function WordPressContent({ html }) {
  const contentRef = useRef(null);

  useEffect(() => {
    // Run WordPress embed scripts
    if (window.wp && window.wp.mediaelement) {
      window.wp.mediaelement.initialize();
    }
  }, [html]);

  return (
    <div
      ref={contentRef}
      dangerouslySetInnerHTML={{ __html: html }}
      className="wordpress-content"
    />
  );
}
```

### 3.5 Forms Integration

**WordPress forms can be handled multiple ways:**

**Option A: Keep WordPress form plugins (Contact Form 7, Gravity Forms, etc.)**

```javascript
// Recreate form HTML in React
// Submit to WordPress endpoint

async function handleSubmit(formData) {
  const response = await fetch(
    "https://yoursite.com/wp-json/contact-form-7/v1/contact-forms/123/feedback",
    {
      method: "POST",
      body: formData,
    }
  );

  return response.json();
}
```

**Option B: Replace with modern form service**

- [ ] Formspree
- [ ] Netlify Forms
- [ ] SendGrid API
- [ ] HubSpot Forms
- [ ] Google Forms

**Option C: Custom API endpoint in WordPress**

Create custom REST endpoint in WordPress `functions.php`:

```php
// Custom form submission endpoint
add_action('rest_api_init', function () {
  register_rest_route('custom/v1', '/contact', array(
    'methods' => 'POST',
    'callback' => 'handle_contact_form',
    'permission_callback' => '__return_true'
  ));
});

function handle_contact_form($request) {
  $params = $request->get_json_params();

  // Validate and sanitize
  $name = sanitize_text_field($params['name']);
  $email = sanitize_email($params['email']);
  $message = sanitize_textarea_field($params['message']);

  // Send email
  $to = get_option('admin_email');
  $subject = 'Contact Form Submission';
  $body = "Name: $name\nEmail: $email\n\n$message";

  $sent = wp_mail($to, $subject, $body);

  if ($sent) {
    return new WP_REST_Response(['success' => true], 200);
  } else {
    return new WP_Error('email_failed', 'Email failed to send', ['status' => 500]);
  }
}
```

### 3.6 Newsletter Integration

**If using WordPress newsletter plugin (Mailchimp, Newsletter, etc.):**

**Option A: Keep WordPress integration**

- Forms submit to WordPress API endpoint
- WordPress plugin handles subscription

**Option B: Direct integration**

- Use newsletter service's API directly from Next.js
- Example with Mailchimp:

```javascript
export async function subscribeToNewsletter(email) {
  const response = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  return response.json();
}

// API route: app/api/subscribe/route.js
export async function POST(request) {
  const { email } = await request.json();

  const response = await fetch(
    `https://us1.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
      }),
    }
  );

  return Response.json({ success: response.ok });
}
```

### 3.7 SEO Implementation

**Install and configure `next-seo`:**

```javascript
// app/layout.js
import { DefaultSeo } from "next-seo";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <DefaultSeo
          defaultTitle="Your Site Name"
          titleTemplate="%s | Your Site Name"
          description="Default site description"
          openGraph={{
            type: "website",
            locale: "en_US",
            url: "https://yoursite.com/",
            site_name: "Your Site Name",
          }}
          twitter={{
            handle: "@yourtwitterhandle",
            site: "@yourtwitterhandle",
            cardType: "summary_large_image",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**Page-level SEO from WordPress:**

```javascript
// Use WordPress SEO plugin data (Yoast, Rank Math)
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);

  return {
    title: post.yoast_head_json?.title || post.title.rendered,
    description: post.yoast_head_json?.description || post.excerpt.rendered,
    openGraph: {
      title: post.yoast_head_json?.og_title,
      description: post.yoast_head_json?.og_description,
      images: [post.yoast_head_json?.og_image?.[0]?.url],
    },
  };
}
```

### 3.8 Navigation/Menu Implementation

**Fetch WordPress menus:**

WordPress doesn't expose menus by default. You need a plugin:

- [ ] Install "WP REST API Menus" plugin
- [ ] Or use WPGraphQL menus

**Then fetch in Next.js:**

```javascript
// lib/wordpress.js
export async function getMenu(location = "primary") {
  const menus = await fetchAPI(`/menus/v1/locations/${location}`);
  return menus;
}

// components/Header.js
export async function Header() {
  const menu = await getMenu("primary");

  return (
    <nav>
      <ul>
        {menu.items.map((item) => (
          <li key={item.ID}>
            <Link href={item.url.replace("https://oldwordpresssite.com", "")}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

### 3.9 Preview Mode (Optional)

**Allow content editors to preview unpublished posts:**

Create preview API route: `app/api/preview/route.js`

```javascript
import { getPostBySlug } from "@/lib/wordpress";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  // Check secret
  if (secret !== process.env.WORDPRESS_PREVIEW_SECRET) {
    return Response.json({ message: "Invalid token" }, { status: 401 });
  }

  // Fetch the post
  const post = await getPostBySlug(slug);

  if (!post) {
    return Response.json({ message: "Post not found" }, { status: 404 });
  }

  // Enable Preview Mode
  const response = Response.redirect(`/blog/${post.slug}`);
  response.cookies.set("__prerender_bypass", "1");

  return response;
}
```

---

## Phase 4: Deployment Setup

### 4.1 Choose Hosting Platform

**Recommended Next.js hosting options:**

**Option A: Vercel (Easiest)**

- [ ] Native Next.js support
- [ ] Automatic deployments from Git
- [ ] Edge network CDN
- [ ] Free tier available
- [ ] Sign up at vercel.com

**Option B: Netlify**

- [ ] Good Next.js support
- [ ] Git-based deployments
- [ ] Form handling built-in
- [ ] Free tier available

**Option C: Self-hosted (VPS/Dedicated)**

- [ ] DigitalOcean, Linode, AWS, etc.
- [ ] More control but more setup
- [ ] Need to configure Node.js environment
- [ ] Setup PM2 or Docker for process management

**Option D: Same GoDaddy hosting (Advanced)**

- [ ] Only if GoDaddy supports Node.js applications
- [ ] Most shared hosting doesn't support Node.js
- [ ] Would require VPS or dedicated server
- [ ] Not recommended for beginners

### 4.2 Vercel Deployment (Recommended Path)

**Step-by-step Vercel deployment:**

1. **Push code to Git repository**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/yourrepo.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - [ ] Go to vercel.com and sign up
   - [ ] Click "New Project"
   - [ ] Import your Git repository
   - [ ] Vercel auto-detects Next.js

3. **Configure environment variables in Vercel**
   - [ ] Go to Project Settings → Environment Variables
   - [ ] Add all variables from `.env.local`:
     - `WORDPRESS_API_URL`
     - `WORDPRESS_GRAPHQL_URL` (if using)
     - Any API keys or secrets

4. **Configure build settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

5. **Deploy**
   - [ ] Click "Deploy"
   - [ ] Wait for build to complete
   - [ ] Get your deployment URL (e.g., `yourproject.vercel.app`)

6. **Test deployment**
   - [ ] Visit deployment URL
   - [ ] Check all pages load correctly
   - [ ] Verify data is pulling from WordPress
   - [ ] Test forms and interactions

### 4.3 Configure Custom Domain

**Point domain to Next.js deployment:**

**If domain is currently pointing to GoDaddy WordPress:**

1. **Add domain in Vercel**
   - [ ] Go to Project Settings → Domains
   - [ ] Add your domain: `yoursite.com`
   - [ ] Also add `www.yoursite.com`
   - [ ] Vercel provides DNS configuration instructions

2. **Update DNS records (in GoDaddy)**

   **Option A: Use Vercel nameservers (Recommended)**
   - [ ] In GoDaddy, go to Domain Management
   - [ ] Change nameservers to Vercel's:
     - `ns1.vercel-dns.com`
     - `ns2.vercel-dns.com`
   - [ ] Vercel will handle all DNS

   **Option B: Update A records (Keep GoDaddy DNS)**
   - [ ] In GoDaddy DNS management
   - [ ] Update A record for `@` to Vercel's IP: `76.76.21.21`
   - [ ] Update A record for `www` to: `76.76.21.21`
   - [ ] Or use CNAME for `www` to `cname.vercel-dns.com`

3. **SSL/HTTPS**
   - [ ] Vercel automatically provisions SSL certificate
   - [ ] Can take a few minutes to 48 hours
   - [ ] Verify HTTPS works

### 4.4 WordPress Domain Configuration

**Decide where WordPress admin will live:**

**Option A: Keep WordPress at same domain (simpler initially)**

- WordPress stays at `yoursite.com`
- But now served by Next.js
- WordPress admin still accessible at `yoursite.com/wp-admin`
- Need to configure Next.js rewrites (see Phase 5)

**Option B: Move WordPress to subdomain (cleaner long-term)**

1. **Create subdomain in GoDaddy**
   - [ ] Create `admin.yoursite.com` or `wp.yoursite.com`
   - [ ] Point to GoDaddy WordPress hosting IP

2. **Update WordPress site URL**
   - [ ] In WordPress admin: Settings → General
   - [ ] Change "WordPress Address (URL)" to `https://admin.yoursite.com`
   - [ ] Change "Site Address (URL)" to `https://yoursite.com`
   - [ ] Save changes

3. **Update Next.js environment**
   - [ ] Update `WORDPRESS_API_URL` to `https://admin.yoursite.com/wp-json/wp/v2`
   - [ ] Redeploy Next.js

4. **Update CORS settings**
   - [ ] Update WordPress CORS headers to allow requests from `yoursite.com`

**Option C: Keep WordPress at same domain but block public access**

- Use `.htaccess` to restrict access to WordPress frontend
- Only allow `/wp-admin`, `/wp-login.php`, `/wp-json`
- All other requests return 404

```apache
# In WordPress .htaccess
# Block access to all WordPress frontend
RewriteEngine On
RewriteCond %{REQUEST_URI} !^/wp-admin
RewriteCond %{REQUEST_URI} !^/wp-login\.php
RewriteCond %{REQUEST_URI} !^/wp-json
RewriteCond %{REQUEST_URI} !^/wp-content
RewriteCond %{REQUEST_URI} !^/wp-includes
RewriteRule ^ - [R=404,L]
```

### 4.5 Configure Revalidation & Caching

**Next.js ISR (Incremental Static Regeneration):**

```javascript
// Revalidate pages every X seconds
export const revalidate = 3600; // 1 hour

// Or on-demand revalidation via webhook
```

**Set up WordPress webhook for on-demand revalidation:**

1. **Create revalidation API route in Next.js**

`app/api/revalidate/route.js`:

```javascript
export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const path = searchParams.get("path");

  // Verify secret token
  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    // Revalidate the specified path
    await revalidatePath(path);
    return Response.json({ revalidated: true, path });
  } catch (err) {
    return Response.json(
      { message: "Error revalidating", error: err.message },
      { status: 500 }
    );
  }
}
```

2. **Install WordPress webhook plugin**
   - [ ] Install "WP Webhooks" plugin
   - [ ] Configure webhook to trigger on post publish/update
   - [ ] Webhook URL: `https://yoursite.com/api/revalidate?secret=YOUR_SECRET&path=/blog/[SLUG]`

3. **Alternative: Vercel Deploy Hooks**
   - [ ] Create deploy hook in Vercel
   - [ ] Trigger full rebuild when content changes
   - [ ] Good for sites with fewer updates

---

## Phase 5: Advanced Configuration

### 5.1 WordPress Admin Access Through Main Domain

**If keeping WordPress at main domain, configure Next.js to proxy admin requests:**

Create Next.js middleware: `middleware.js`

```javascript
import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Proxy WordPress admin and API requests
  const wpPaths = [
    "/wp-admin",
    "/wp-login.php",
    "/wp-json",
    "/wp-content",
    "/wp-includes",
  ];

  if (wpPaths.some((path) => pathname.startsWith(path))) {
    // Proxy to WordPress backend
    const wpUrl =
      process.env.WORDPRESS_BACKEND_URL || "https://your-wp-subdomain.com";
    return NextResponse.rewrite(new URL(pathname, wpUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/wp-admin/:path*",
    "/wp-login.php",
    "/wp-json/:path*",
    "/wp-content/:path*",
    "/wp-includes/:path*",
  ],
};
```

**Note:** This requires WordPress to be accessible at a different URL (subdomain or different port).

### 5.2 Search Functionality

**WordPress default search via API:**

```javascript
// Search endpoint
export async function searchPosts(query) {
  const posts = await fetchAPI(
    `/posts?search=${encodeURIComponent(query)}&per_page=20`
  );
  return posts;
}

// Search page: app/search/page.js
export default async function Search({ searchParams }) {
  const query = searchParams.q;
  const results = query ? await searchPosts(query) : [];

  return (
    <div>
      <h1>Search results for: {query}</h1>
      {results.map((post) => (
        <article key={post.id}>
          <Link href={`/blog/${post.slug}`}>
            <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </Link>
        </article>
      ))}
    </div>
  );
}
```

**Better search with Algolia (optional):**

- [ ] Install Algolia WordPress plugin
- [ ] Configure search indexes
- [ ] Use Algolia React InstantSearch in Next.js

### 5.3 Comments System

**WordPress native comments via API:**

```javascript
// Fetch comments for a post
export async function getComments(postId) {
  const comments = await fetchAPI(`/comments?post=${postId}`);
  return comments;
}

// Submit new comment
export async function submitComment(postId, author, email, content) {
  const response = await fetch(`${WORDPRESS_API_URL}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      post: postId,
      author_name: author,
      author_email: email,
      content: content,
    }),
  });

  return response.json();
}
```

**Alternative: Use third-party comment system**

- [ ] Disqus
- [ ] Giscus (GitHub-based)
- [ ] Commento
- [ ] Hyvor Talk

### 5.4 Multi-language Support (If Needed)

**If WordPress uses WPML or Polylang:**

- [ ] Plugins expose language info via API
- [ ] Implement Next.js i18n routing
- [ ] Fetch content based on locale

```javascript
// next.config.js
module.exports = {
  i18n: {
    locales: ["en", "es", "fr"],
    defaultLocale: "en",
  },
};

// Fetch posts by language
export async function getPostsByLanguage(locale) {
  // WPML adds lang parameter
  const posts = await fetchAPI(`/posts?lang=${locale}`);
  return posts;
}
```

### 5.5 Custom Post Types

**If WordPress has custom post types (e.g., Portfolio, Team, Products):**

```javascript
// Fetch custom post type
export async function getCustomPosts(postType) {
  const posts = await fetchAPI(`/${postType}?_embed&per_page=100`);
  return posts;
}

// Create dynamic pages for custom post type
// app/[postType]/[slug]/page.js
export async function generateStaticParams({ params }) {
  const posts = await getCustomPosts(params.postType);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
```

### 5.6 Analytics & Monitoring

**Set up analytics:**

- [ ] **Google Analytics 4**

  ```bash
  npm install @next/third-parties
  ```

  ```javascript
  // app/layout.js
  import { GoogleAnalytics } from "@next/third-parties/google";

  export default function RootLayout({ children }) {
    return (
      <html>
        <body>{children}</body>
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </html>
    );
  }
  ```

- [ ] **Vercel Analytics** (if using Vercel)
  ```bash
  npm install @vercel/analytics
  ```

**Error monitoring:**

- [ ] Sentry for error tracking
  ```bash
  npm install @sentry/nextjs
  ```

**Performance monitoring:**

- [ ] Vercel Speed Insights
- [ ] Google PageSpeed Insights
- [ ] Lighthouse CI

---

## Phase 6: Testing & Quality Assurance

### 6.1 Content Migration Testing

**Verify all content migrated correctly:**

- [ ] All blog posts are accessible
- [ ] All pages are accessible
- [ ] Images load properly
- [ ] Links are not broken (internal and external)
- [ ] Categories and tags work
- [ ] Custom fields display correctly
- [ ] Embedded content (videos, tweets) works
- [ ] HTML formatting is preserved

**Use tools:**

- [ ] Manual testing of key pages
- [ ] Broken link checker
- [ ] SEO crawler (Screaming Frog)
- [ ] Browser DevTools for console errors

### 6.2 URL Structure Verification

**Ensure URL parity between old and new site:**

- [ ] Blog post URLs match: `/blog/post-slug/`
- [ ] Page URLs match: `/about/`, `/contact/`
- [ ] Category archives: `/category/category-name/`
- [ ] Tag archives: `/tag/tag-name/`

**Set up redirects if URLs changed:**

Create `next.config.js` redirects:

```javascript
module.exports = {
  async redirects() {
    return [
      {
        source: "/old-url",
        destination: "/new-url",
        permanent: true,
      },
      // Add more redirects as needed
    ];
  },
};
```

**Or export redirect map from WordPress:**

```php
// Create custom endpoint to export all URLs
add_action('rest_api_init', function () {
  register_rest_route('custom/v1', '/urls', array(
    'methods' => 'GET',
    'callback' => 'get_all_urls',
  ));
});

function get_all_urls() {
  $posts = get_posts(['numberposts' => -1]);
  $urls = array_map(function($post) {
    return [
      'old' => get_permalink($post->ID),
      'new' => '/blog/' . $post->post_name,
    ];
  }, $posts);

  return $urls;
}
```

### 6.3 SEO Testing

**Verify SEO elements:**

- [ ] Meta titles are correct
- [ ] Meta descriptions are present
- [ ] Open Graph tags work (test with Facebook debugger)
- [ ] Twitter Card tags work (test with Twitter validator)
- [ ] Canonical URLs are correct
- [ ] XML sitemap is accessible (generate with `next-sitemap`)
- [ ] Robots.txt is configured
- [ ] Structured data (Schema.org) if applicable

**Generate sitemap:**

Install `next-sitemap`:

```bash
npm install next-sitemap
```

Create `next-sitemap.config.js`:

```javascript
module.exports = {
  siteUrl: "https://yoursite.com",
  generateRobotsTxt: true,
  exclude: ["/admin", "/api/*"],
};
```

Add to `package.json`:

```json
{
  "scripts": {
    "postbuild": "next-sitemap"
  }
}
```

### 6.4 Performance Testing

**Run performance audits:**

- [ ] Lighthouse audit (aim for 90+ scores)
- [ ] WebPageTest
- [ ] GTmetrix
- [ ] Vercel Analytics

**Key metrics to check:**

- [ ] First Contentful Paint (FCP) < 1.8s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] Time to Interactive (TTI) < 3.8s

**Optimizations:**

- [ ] Image optimization (use Next.js Image component)
- [ ] Lazy loading
- [ ] Code splitting
- [ ] Font optimization
- [ ] Minimize JavaScript bundle size

### 6.5 Cross-browser & Device Testing

**Test on multiple platforms:**

- [ ] Chrome (desktop & mobile)
- [ ] Firefox (desktop & mobile)
- [ ] Safari (desktop & iOS)
- [ ] Edge
- [ ] Test on actual mobile devices
- [ ] Test on tablets

**Responsive design:**

- [ ] Mobile layout works correctly
- [ ] Touch interactions work
- [ ] Navigation is usable on small screens
- [ ] Images scale properly

### 6.6 Form & Interaction Testing

**Test all interactive elements:**

- [ ] Contact forms submit correctly
- [ ] Newsletter signup works
- [ ] Search functionality works
- [ ] Comments can be posted (if enabled)
- [ ] Navigation menus work
- [ ] Modals/popups function properly
- [ ] Error messages display correctly
- [ ] Success messages display correctly

### 6.7 Security Testing

**Security checklist:**

- [ ] HTTPS is enforced
- [ ] Environment variables are not exposed
- [ ] API endpoints require proper authentication
- [ ] WordPress admin is secured
- [ ] No sensitive data in client-side code
- [ ] Rate limiting on forms
- [ ] CSRF protection on forms
- [ ] Input validation and sanitization

---

## Phase 7: Launch

### 7.1 Pre-launch Checklist

**Final verification before go-live:**

- [ ] All content is migrated and tested
- [ ] DNS changes are prepared but not yet applied
- [ ] Backups of old site are secured
- [ ] Team is trained on new workflow
- [ ] Monitoring and analytics are set up
- [ ] Error tracking is configured
- [ ] Support documentation is prepared

**Create rollback plan:**

- [ ] Document how to revert DNS changes
- [ ] Keep old WordPress site accessible at backup URL
- [ ] Have database backup ready
- [ ] Know how to restore from backup

### 7.2 DNS Cutover

**Execute domain switch:**

1. **Lower TTL (Time To Live) values**
   - [ ] 24-48 hours before launch, lower DNS TTL to 300 seconds (5 min)
   - [ ] This speeds up propagation when you make the switch

2. **Make DNS changes**
   - [ ] Update A records or nameservers as planned in Phase 4
   - [ ] Double-check all records are correct
   - [ ] Save changes

3. **Monitor propagation**
   - [ ] Use tools like whatsmydns.net to check propagation
   - [ ] Test from different locations/devices
   - [ ] Can take minutes to 48 hours (usually < 1 hour with low TTL)

4. **Verify everything works**
   - [ ] Test main domain loads Next.js site
   - [ ] Test WordPress admin still accessible
   - [ ] Test all critical pages
   - [ ] Check analytics are tracking

### 7.3 Post-launch Monitoring

**First 24-48 hours:**

- [ ] Monitor error logs closely (Vercel dashboard, Sentry)
- [ ] Watch analytics for traffic patterns
- [ ] Check for 404 errors (broken links)
- [ ] Monitor server response times
- [ ] Watch WordPress API for issues
- [ ] Be available to fix issues quickly

**Set up alerts:**

- [ ] Uptime monitoring (UptimeRobot, Pingdom)
- [ ] Error rate alerts (Sentry)
- [ ] Performance degradation alerts
- [ ] WordPress API availability

### 7.4 WordPress Transition for Content Editors

**Train content team:**

- [ ] WordPress admin location (subdomain or main domain/wp-admin)
- [ ] Publish workflow unchanged
- [ ] Preview might work differently (if implemented)
- [ ] Content appears on live site after revalidation period
- [ ] How to check if content is live

**Create documentation:**

- [ ] How to log into WordPress admin
- [ ] How to create/edit posts
- [ ] How to upload images (size recommendations)
- [ ] How long until content appears (revalidation time)
- [ ] Who to contact for issues

---

## Phase 8: Ongoing Maintenance

### 8.1 Regular Maintenance Tasks

**Weekly:**

- [ ] Check error logs
- [ ] Review analytics for anomalies
- [ ] Monitor site performance
- [ ] Check for broken links

**Monthly:**

- [ ] Update Next.js and dependencies
- [ ] Update WordPress core and plugins
- [ ] Review and optimize database
- [ ] Test backups
- [ ] Security audit
- [ ] Performance audit

**Quarterly:**

- [ ] Comprehensive SEO review
- [ ] Content audit
- [ ] User experience review
- [ ] Competition analysis

### 8.2 WordPress Maintenance

**Keep WordPress secure and updated:**

- [ ] Auto-update minor WordPress versions
- [ ] Review and update plugins monthly
- [ ] Remove unused plugins and themes
- [ ] Monitor security logs
- [ ] Maintain regular backups
- [ ] Test updates in staging environment if possible

### 8.3 Next.js Maintenance

**Keep Next.js site optimal:**

- [ ] Update Next.js when new versions release
- [ ] Update npm dependencies regularly
- [ ] Monitor build times
- [ ] Optimize image sizes periodically
- [ ] Review and clean up unused code
- [ ] Monitor bundle size

### 8.4 Content Management Workflow

**Establish processes:**

- [ ] Content creation and review process
- [ ] Publishing schedule
- [ ] SEO checklist for new content
- [ ] Image optimization process
- [ ] URL structure guidelines
- [ ] Internal linking strategy

---

## Troubleshooting Guide

### Common Issues & Solutions

**Issue: WordPress API returns CORS errors**

Solution:

- Verify CORS headers are set correctly in WordPress
- Check that Next.js domain is whitelisted
- Test API endpoint directly in browser

**Issue: Images not loading**

Solution:

- Check image URLs in API response
- Verify Next.js Image domain configuration
- Add WordPress domain to `next.config.js`:

```javascript
module.exports = {
  images: {
    domains: ["yourwordpresssite.com"],
  },
};
```

**Issue: Content not updating after publishing in WordPress**

Solution:

- Check revalidation configuration
- Verify webhook is triggering
- Manually trigger revalidation via API
- Consider reducing revalidation time for testing

**Issue: WordPress admin not accessible**

Solution:

- Verify subdomain DNS is correct
- Check WordPress site URL settings
- Try accessing via IP address
- Check firewall/security plugins

**Issue: Slow build times in Next.js**

Solution:

- Implement ISR instead of SSG for large sites
- Paginate content fetching
- Use `getStaticPaths` with `fallback: 'blocking'`
- Optimize API queries

**Issue: 404 errors on old URLs**

Solution:

- Implement redirects in `next.config.js`
- Create redirect map from old to new URLs
- Use middleware for complex redirect logic
- Submit updated sitemap to search engines

**Issue: Forms not submitting**

Solution:

- Check CORS configuration
- Verify WordPress API endpoint is accessible
- Check browser console for errors
- Test API endpoint directly with Postman

**Issue: Search not returning results**

Solution:

- Verify WordPress search endpoint works
- Check query encoding
- Test with simple search terms first
- Consider implementing Algolia for better search

---

## Resources & References

### Documentation

- **Next.js:** https://nextjs.org/docs
- **WordPress REST API:** https://developer.wordpress.org/rest-api/
- **WPGraphQL:** https://www.wpgraphql.com/docs/
- **Vercel:** https://vercel.com/docs

### WordPress Plugins

**Essential for Headless:**

- WPGraphQL: https://wordpress.org/plugins/wp-graphql/
- WP REST API Menus: https://wordpress.org/plugins/wp-rest-api-v2-menus/
- ACF to REST API: https://wordpress.org/plugins/acf-to-rest-api/

**Security:**

- Wordfence Security: https://wordpress.org/plugins/wordfence/
- WPS Hide Login: https://wordpress.org/plugins/wps-hide-login/
- Two Factor Authentication: https://wordpress.org/plugins/two-factor-authentication/

**SEO:**

- Yoast SEO: https://wordpress.org/plugins/wordpress-seo/
- Rank Math: https://wordpress.org/plugins/seo-by-rank-math/

### NPM Packages

```bash
# Core dependencies
npm install axios next-seo sharp

# GraphQL (if using)
npm install @apollo/client graphql

# Forms
npm install react-hook-form

# Sitemap generation
npm install next-sitemap

# Analytics
npm install @vercel/analytics @next/third-parties

# Error tracking
npm install @sentry/nextjs
```

### Testing Tools

- **Lighthouse:** Built into Chrome DevTools
- **WebPageTest:** https://www.webpagetest.org/
- **GTmetrix:** https://gtmetrix.com/
- **Screaming Frog:** https://www.screamingfrogseotool.com/
- **Facebook Sharing Debugger:** https://developers.facebook.com/tools/debug/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator

### Helpful Articles & Tutorials

- Next.js + WordPress guide: https://nextjs.org/learn/basics/wordpress
- Headless WordPress best practices: Various tutorials available
- WPGraphQL documentation: https://www.wpgraphql.com/

---

## Success Criteria

Your implementation is successful when:

- [ ] All WordPress content is accessible via Next.js frontend
- [ ] WordPress admin remains functional for content editors
- [ ] Forms and newsletters work as expected
- [ ] SEO metrics are maintained or improved
- [ ] Site performance is faster than before
- [ ] Content editors can publish without developer help
- [ ] Site is secure (HTTPS, secure WordPress admin)
- [ ] Analytics are tracking correctly
- [ ] No broken links or 404 errors
- [ ] Mobile experience is optimized
- [ ] Backups and monitoring are in place

---

## Timeline Estimate

**Week 1: Assessment & Planning**

- Audit current WordPress site
- Plan architecture
- Set up development environment
- Back up everything

**Week 2-3: WordPress Backend Setup**

- Configure REST API or GraphQL
- Install required plugins
- Test API endpoints
- Configure CORS
- Set up preview mode

**Week 3-5: Next.js Development**

- Build Next.js pages
- Implement data fetching
- Migrate content structure
- Implement SEO
- Build forms/newsletter
- Style and responsive design

**Week 5-6: Testing**

- Content verification
- Cross-browser testing
- Performance testing
- SEO audit
- Security review

**Week 6-7: Deployment**

- Deploy to hosting platform
- Configure domain and DNS
- Final testing
- Launch
- Post-launch monitoring

**Timeline varies based on:**

- Site complexity
- Amount of content
- Custom features required
- Team availability
- Testing thoroughness

---

## Notes & Considerations

- **WordPress version compatibility:** Ensure WordPress is at least 4.7+ for REST API support
- **Hosting costs:** Factor in costs for both WordPress hosting (GoDaddy) and Next.js hosting (Vercel)
- **Build times:** Large sites may have long build times; use ISR to mitigate
- **Plugin dependencies:** Some WordPress plugins may not work in headless setup
- **Training:** Budget time for training content editors on any workflow changes
- **Staging environment:** Strongly recommended to have staging version for testing
- **Git workflow:** Use version control for Next.js code
- **API rate limits:** Be mindful of API request volumes during builds
- **Content schema changes:** Changes to WordPress structure require Next.js updates
- **Preview mode:** Optional but valuable for content editors

---

## Support & Contact

For issues during implementation:

1. **Next.js:** Next.js Discord, GitHub Issues
2. **WordPress:** WordPress Support Forums, Stack Overflow
3. **Vercel:** Vercel Support, Documentation
4. **Community:** Reddit r/nextjs, r/wordpress

For this specific project, document your own support contacts and escalation path.

---

**Document Version:** 1.0  
**Last Updated:** November 4, 2025  
**Created for:** Headless WordPress + Next.js Migration Project
