---
id: '000072'
title: Add copy-to-clipboard cards for contact information on Services page
type: issue
status: open
priority: medium
labels:
  - ui-feedback
  - enhancement
  - ux-improvement
  - services-page
createdAt: '2025-10-30T17:16:07.567Z'
updatedAt: '2025-10-30T17:16:07.567Z'
---
## User Feedback

**Request:** Could we take advantage of a sleek component type we get with shadcn to have these in a little card with modern web ux for easy copy to clipboard interactions?

## Location

- **Page:** Services page (`/services`)
- **Component:** Contact information section
- **CSS Selector:** `#main > section.bg-white:nth-of-type(3) > div.container.mx-auto > div.grid.grid-cols-2`

## Screenshot

![Wingman Screenshot](https://api.wingmanux.com/annotations/01K8V1WKXNSYH9GV993MXKK9EP/screenshot)

## Enhancement Request

Replace plain text contact information display with modern, interactive shadcn Card components featuring:
- Sleek card design for phone numbers and email addresses
- One-click copy-to-clipboard functionality
- Visual feedback on copy (toast notification or button state change)
- Hover states for better UX
- Icons for visual clarity (phone, email, etc.)

## Suggested Implementation

Use shadcn/ui components:
- `Card` component for container
- `Button` with copy icon for interaction
- `useToast` hook for copy confirmation
- Lucide icons for visual enhancement

## Technical Context

- **File:** Likely `/src/app/services/page.tsx`
- **Selected Area:** 895.9942626953125×59.992897033691406 pixels at position (235.1846466064453, 935.1561889648438)
- **Current State:** Plain text display of contact information

## Design Goals

- Improve user experience with modern interaction patterns
- Make it easier for users to copy contact details
- Align with modern web UX best practices
- Leverage existing shadcn/ui component library
