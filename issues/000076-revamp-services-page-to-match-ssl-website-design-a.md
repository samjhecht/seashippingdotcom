---
id: '000076'
title: Revamp Services page to match SSL website design and content
type: issue
status: open
priority: high
labels:
  - ui-feedback
  - services-page
  - content-extraction
  - redesign
  - animation
createdAt: '2025-10-30T17:23:35.441Z'
updatedAt: '2025-10-30T17:23:35.441Z'
---
## User Feedback

**Issue:** The services page needs to go back and thoroughly analyze all the content on the existing https://seashipping.com/services/ and then revamp ours to more closely match the content. The tabs per service shouldn't be links to other pages. They should be cards with text and then with the links for requesting rates at the bottom of each just like on https://seashipping.com/services/. There should also be a rotating and zooming hero image like on the https://seashipping.com/services/

## Location

- **Page:** Services page (`/services`)
- **Reference URL:** https://seashipping.com/services/

## Current Issues

1. **Service presentation:** Currently using individual service pages (`/services/fcl`, `/services/lcl`, etc.) instead of cards on a single page
2. **Missing hero animation:** Need rotating/zooming hero background image like original site
3. **Content mismatch:** Need to extract and match all content from live SSL services page
4. **Layout structure:** Should use card-based layout with CTAs at bottom of each card

## Required Changes

### 1. Hero Section
- Add rotating/zooming background image animation (similar to Ken Burns effect)
- Match hero styling and content from https://seashipping.com/services/

### 2. Services Layout
- Remove individual service pages (`/services/[slug]`)
- Create card-based layout on main `/services` page
- Each service should be a card containing:
  - Service title
  - Service description/content
  - "Request Rate" or similar CTA button at bottom
- Cards should NOT be clickable links to separate pages

### 3. Content Extraction
- Thoroughly analyze https://seashipping.com/services/
- Extract ALL service descriptions and content
- Match content exactly (don't make up or generate content)
- Include any additional information present on live site

### 4. Service Information
Services that should be displayed as cards:
- Full Container Load (FCL)
- Less than Container Load (LCL)
- Automobiles
- Household Goods
- Oversize Cargo
- Refrigerated Cargo
- Hazardous Materials

## Design Reference

Live SSL Services page structure:
- Hero with animated background
- Service cards arranged in grid
- Each card contains full description
- CTA buttons at bottom of each card
- No navigation to separate pages for each service

## Technical Context

- **Current File:** `/src/app/services/page.tsx`
- **Files to Remove/Refactor:** `/src/app/services/[slug]/page.tsx` and related service detail pages
- **Reference:** https://seashipping.com/services/

## Implementation Tasks

1. Extract content from https://seashipping.com/services/ using WebFetch
2. Implement hero with rotating/zooming background animation
3. Create card-based layout for all services on single page
4. Add "Request Rate" CTAs to each card (linking to `/request`)
5. Remove individual service detail pages
6. Update navigation/links if they point to service detail pages
7. Ensure content matches live SSL site exactly

## Priority

This is a major structural change to the Services page that affects:
- Page architecture (removing dynamic routes)
- Content presentation
- User navigation flow
- Visual design (hero animation)
