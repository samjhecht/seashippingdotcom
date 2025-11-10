# Issue #026: Revamp Services Page to Match SSL Website

**Status:** ✅ Completed
**Priority:** High
**Labels:** ui-feedback, major-redesign, services-page
**Created:** 2025-10-30
**Completed:** 2025-10-30

## Original User Feedback

"The services page needs you to go back and thoroughly analyze all the content on the existing https://seashipping.com/services/ and then revamp ours to more closely match the content. The tabs per service shouldn't be links to other pages. They should be cards with text and then with the links for requesting rates at the bottom of each just like on https://seashipping.com/services/. There should also be a rotating and zooming hero image like on the https://seashipping.com/services/"

## Location

- **Page:** Services page (`/services`)
- **Files:**
  - `/src/app/services/page.tsx` - Complete rewrite
  - `/src/app/services/layout.tsx` - New metadata file
  - `/src/app/services/[slug]/` - Deleted (individual pages removed)

## Analysis of SSL Website

Analyzed https://seashipping.com/services/ and identified:
- Card-based layout (not tabs)
- No separate service detail pages
- Direct CTA buttons on each card
- 7 core services displayed

## Implementation

### 1. Rotating/Zooming Hero Image
**Lines 12-61:**
- Created array of 4 hero images
- `useEffect` hook rotates images every 5 seconds
- Zoom animation using `scale-110` transition over 5 seconds
- Fade transition between images (1 second duration)
- Dark overlay for text contrast
- Enhanced text shadows for readability

```tsx
const [currentImageIndex, setCurrentImageIndex] = useState(0);
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  }, 5000);
  return () => clearInterval(interval);
}, []);
```

### 2. Card-Based Service Layout
**Lines 64-113:**
- Grid layout: 1 column mobile, 2 tablet, 3 desktop
- Each card contains:
  - Service image (264px height)
  - Gradient overlay for text contrast
  - Service title overlaid on image
  - Description text (3-line clamp)
  - Full-width SSL red CTA button
- Hover effects:
  - Image scales to 105%
  - Shadow elevation increases
  - Smooth transitions

### 3. Removed Individual Service Pages
- Deleted `/src/app/services/[slug]/` directory
- All service information now on single page
- CTA buttons link to `/request?service=${id}` with pre-filled form

### 4. Additional Sections
- "Why Choose Sea Shipping Line?" - Company value prop
- Credentials section - Regulatory info with SSL red accents
- Contact cards with copy-to-clipboard
- Bottom CTA section

### 5. Converted to Client Component
- Added `'use client'` directive
- Created separate layout.tsx for metadata
- Enables useState and useEffect for hero rotation

## Files Modified
- ✅ Completely rewrote `/src/app/services/page.tsx`
- ✅ Created `/src/app/services/layout.tsx`
- ✅ Deleted `/src/app/services/[slug]/` directory

## Completion Criteria
- [x] Analyze SSL website services page structure
- [x] Implement rotating/zooming hero image
- [x] Create card-based service layout
- [x] Add CTA buttons to each service card
- [x] Remove individual service detail pages
- [x] Match SSL website content and structure
- [x] Ensure responsive design
- [x] Add proper metadata handling
- [x] Test all service card CTAs
- [x] Verify hero image rotation and zoom
