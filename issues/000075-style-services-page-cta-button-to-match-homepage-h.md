---
id: '000075'
title: Style Services page CTA button to match homepage hero button
type: issue
status: open
priority: high
labels:
  - ui-feedback
  - branding
  - services-page
  - styling
  - consistency
createdAt: '2025-10-30T17:21:40.020Z'
updatedAt: '2025-10-30T17:21:40.020Z'
---
## User Feedback

**Issue:** This should be a button styled just like the "get a quote" one on the homepage.

## Location

- **Page:** Services page (`/services`)
- **Component:** CTA link/button in hero section
- **CSS Selector:** `#main > section.bg-gradient-to-br.from-blue-900:nth-of-type(1) > div.container.mx-auto > a.inline-flex.items-center`

## Screenshot

![Wingman Screenshot](https://api.wingmanux.com/annotations/01K8V26QFS72GJXKQKGXEE7ZM2/screenshot)

## Current State

The element is currently a link (`<a>`) with inline-flex styling, but should be styled as a button component to match the homepage hero CTA.

## Required Changes

Match the homepage "Get a Quote" button styling:
1. **Background color:** `#ee1c23` (SSL brand red)
2. **Text color:** White
3. **Component:** Should use Button component (not just a styled link)
4. **Visual consistency:** Match size, padding, hover states, and other visual properties of homepage CTA

## Design Specifications

- Background: `#ee1c23` (SSL red)
- Text: White (`#ffffff`)
- Should match homepage hero button in all aspects (size, padding, border-radius, hover effects)
- Maintain existing functionality (navigation to contact/request page)

## Technical Context

- **File:** Likely `/src/app/services/page.tsx`
- **Current Implementation:** Link styled with inline-flex
- **Target Implementation:** Button component with SSL brand styling
- **Selected Area:** 163.91334533691406×47.99715805053711 pixels at position (59.1761360168457, 444.8579406738281)

## Related Issues

- This should match the styling being implemented in issue #000074 (homepage hero CTA button)
- Consider creating a reusable "brand-cta" button variant for consistency

## Implementation Notes

For consistency, both this button and the homepage CTA should:
1. Use the same button component/variant
2. Share the same styling properties
3. Be part of a unified design system approach
