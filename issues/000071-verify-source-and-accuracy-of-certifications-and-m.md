---
id: '000071'
title: Verify source and accuracy of certifications and memberships
type: issue
status: open
priority: medium
labels:
  - ui-feedback
  - content-verification
  - homepage
createdAt: '2025-10-30T17:14:39.005Z'
updatedAt: '2025-10-30T17:14:39.005Z'
---
## User Feedback

**Question:** Where did you get these certifications and memberships? Were they listed somewhere on the existing SSL site?

## Location

- **Page:** Homepage (`/`)
- **Component:** Certifications section
- **CSS Selector:** `#main > section:nth-of-type(5) > div.container.mx-auto > div:nth-of-type(1) > div.grid.grid-cols-2:nth-of-type(1)`

## Screenshot

![Wingman Screenshot](https://api.wingmanux.com/annotations/01K8V1D9R46JMZV2BMGAHGWEMA/screenshot)

## Task

Need to verify the source of the certifications and memberships displayed in the Certifications section:
1. Check if these were extracted from the original SSL website
2. Verify accuracy of the displayed certifications
3. Confirm if all certifications shown are legitimate/current
4. Document the source URL if found on original site

## Technical Context

- **File:** `/src/components/sections/Certifications.tsx`
- **Selected Area:** 1023.99853515625×179.9857940673828 pixels at position (171.17897033691406, 163.53692626953125)

## Additional Notes

The certifications grid appears to show various industry memberships and certifications. Need to validate these against the live SSL website to ensure accuracy.
