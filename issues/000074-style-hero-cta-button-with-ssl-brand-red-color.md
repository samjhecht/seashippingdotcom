---
id: '000074'
title: Style hero CTA button with SSL brand red color
type: issue
status: open
priority: high
labels:
  - ui-feedback
  - branding
  - hero-section
  - homepage
  - styling
createdAt: '2025-10-30T17:19:53.187Z'
updatedAt: '2025-10-30T17:19:53.187Z'
---
## User Feedback

**Issue:** The "get a quote" text on the hero image on homepage isn't actually a link. We need to make it a button. It should be colored red (#ee1c23) with white text.

## Location

- **Page:** Homepage (`/`)
- **Component:** Hero section CTA button
- **CSS Selector:** `#main > section.relative.h-\[500px\]:nth-of-type(1) > div.relative.z-10 > button.inline-flex.items-center`

## Screenshot

![Wingman Screenshot](https://api.wingmanux.com/annotations/01K8V23EV25V7RYAY1TT06ZYJK/screenshot)

## Current State

The button already exists and is functional (navigates to `/request` page), but it's using the default shadcn/ui button styling instead of SSL brand colors.

## Required Changes

1. **Background color:** `#ee1c23` (SSL brand red)
2. **Text color:** White
3. **Button text:** "Get a Quote"
4. **Functionality:** Already working (navigates to `/request`)

## Design Specifications

- Background: `#ee1c23` (SSL red)
- Text: White (`#ffffff`)
- Should maintain existing hover states and accessibility
- Should remain prominent on hero background

## Technical Context

- **File:** `/src/components/sections/Hero.tsx`
- **Component:** Button component from shadcn/ui
- **Current Implementation:** Default button variant
- **Selected Area:** 166.02272033691406×47.99715805053711 pixels at position (600.17041015625, 486.90338134765625)

## Implementation Notes

This may require:
1. Creating a custom button variant in the shadcn button component, OR
2. Using inline className overrides to apply the brand color, OR
3. Adding the SSL red to the theme configuration and using it as a variant

The SSL red color (`#ee1c23`) should likely be added to the project's theme/color system for consistency across the site.
