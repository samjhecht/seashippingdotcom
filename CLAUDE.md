# Claude Code Instructions for Sea Shipping Line Project

## Project Overview
This is a Next.js 15 application for Sea Shipping Line, a federally licensed NVOCC (Non-Vessel Operating Common Carrier) with 37+ years of global shipping expertise.

## Brand Guidelines

### Colors
- **SSL Brand Red**: `#ee1c23` - Use for CTA buttons and brand accents
- **Background**: Black (`bg-black`) for footer, not dark gray
- **Text**: White on dark backgrounds, dark gray on light backgrounds

### Typography
- Use pipe separators (`|`) for titles like "Memberships | Associations | Affiliations"
- Keep titles concise and professional

## Code Standards

### Component Structure
- Use `'use client'` directive only when necessary (useState, useEffect, event handlers)
- Keep server components as default when possible
- Import patterns: Group by category (Next.js, React, UI components, utils, types)

### Styling
- **Spacing**: Use `py-8` for vertical section padding (tighter than default)
- **Responsive**: Mobile-first approach with `md:` and `lg:` breakpoints
- **Footer**: Black background with white horizontal dividers between sections

### Button Styling
- Primary CTA buttons use inline `style={{ backgroundColor: '#ee1c23' }}` with hover handlers
- This avoids Tailwind CSS specificity issues with the Button component
- Include both `onMouseEnter` and `onMouseLeave` for hover states

## Footer Structure
The footer has specific sections separated by white borders:
1. **Regulatory Credentials & C-TPAT** (side-by-side on desktop, stacked on mobile)
2. **Office Locations** (with red MapPin icon)
3. **Navigation Links** (4-column grid on desktop, accordion on mobile)
4. **Legal & Copyright** (centered)

### Credentials Display
- Use `CopyToClipboardCard` component for all regulatory credentials
- Cards should have dark background (`bg-gray-800 border-gray-700`) on black footer
- Include FileText icon with each credential

## Page Layout (Homepage)

### Section Order
1. Hero (with red CTA button)
2. QuickLinks (no header, 3 cards)
3. About Sea Shipping Line
4. Stats (3 red boxes with white text)
5. Certifications (just title + horizontal logo banner)

### QuickLinks Section
- **No header** - Remove "Quick Access" heading
- Three cards: "Forms", "Why choose an FCL NVO", "Trade Updates"
- Middle card links to `/news/why-choose-fcl-nvo`

## Hydration Error Prevention
- Use `isMounted` state pattern for components with conditional rendering
- Provide SSR fallback content that matches client-side structure
- Only render accordions/dynamic components after mount

## Content Reference
- Always reference `COMPANY_INFO` and `REGULATORY_INFO` from `/src/lib/constants.ts`
- Office count: 8 owned & operated U.S. domestic offices
- Years of experience: 37+
- All regulatory credentials (OTI#, SCAC, SVI#, DOT#, MC#, Customs Filer Code) are in constants

## Image Handling
- Hero images should use `priority` prop
- Association/certification logos should use appropriate `sizes` attribute
- Use `imageSizes` constants from `/src/lib/images.ts`

## Accessibility
- Use semantic HTML (`<header>`, `<footer>`, `<nav>`, `<main>`)
- Include proper ARIA labels and landmarks
- Ensure minimum 44px touch targets for mobile
- Provide descriptive alt text for images

## SSL Website Reference
When user requests to match https://seashipping.com:
- Use WebFetch to check current content
- Match content structure and text exactly
- Keep our improved interactivity and responsive design
- Maintain SSL brand colors and styling

## Development Server
- Runs on port 8787: `http://localhost:8787`
- Use `npm run dev` to start
- Clear `.next` cache if encountering persistent errors
