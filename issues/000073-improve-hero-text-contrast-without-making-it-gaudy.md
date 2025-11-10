---
id: '000073'
title: Improve hero text contrast without making it gaudy
type: issue
status: open
priority: high
labels:
  - ui-feedback
  - design
  - accessibility
  - hero-section
  - homepage
createdAt: '2025-10-30T17:17:39.492Z'
updatedAt: '2025-10-30T17:17:39.492Z'
---
## User Feedback

**Issue:** We need to come up with a way to make this text stand out over the background better than it currently does with the white font. But we don't want the solution to make it look gaudy.

## Location

- **Page:** Homepage (`/`)
- **Component:** Hero section
- **CSS Selector:** `#main > section.relative.h-\[500px\]:nth-of-type(1) > div.relative.z-10`

## Screenshot

![Wingman Screenshot](https://api.wingmanux.com/annotations/01K8V1ZD84TCF2T039S0J8ZZ20/screenshot)

## Problem

The white text on the hero background image lacks sufficient contrast, making it difficult to read. The current solution uses only text-shadow for readability.

## Design Constraints

- Must improve text legibility/contrast
- Should NOT look gaudy or over-designed
- Should maintain modern, clean aesthetic
- Should work across different background image brightness levels

## Potential Solutions to Evaluate

1. **Subtle gradient overlay**: Semi-transparent gradient behind text only (not full overlay)
2. **Frosted glass effect**: Backdrop blur with slight opacity behind text container
3. **Subtle vignette**: Darken just the text area slightly
4. **Enhanced text-shadow**: More sophisticated multi-layer text shadow
5. **Text container background**: Very subtle semi-transparent background behind text
6. **Darker overlay zones**: Strategic darkening only where text appears
7. **Text stroke/outline**: Subtle outline around white text

## Technical Context

- **File:** `/src/components/sections/Hero.tsx`
- **Selected Area:** 895.9942626953125×307.9829406738281 pixels at position (235.1846466064453, 226.9176025390625)
- **Current Implementation**: White text with `text-shadow: 2px 2px 4px rgba(0,0,0,0.8)`

## Success Criteria

- Text is easily readable across all background image variations
- Design remains clean and modern (not gaudy)
- Solution is subtle and professional
- Maintains visual hierarchy of hero section
