---
id: 004
title: Configure Tailwind CSS with Mobile-First Design Tokens
phase: 2
priority: high
status: todo
dependencies: [001]
estimated_hours: 3
tags: [design-system, tailwind, mobile-first, tokens]
---

# Configure Tailwind CSS with Mobile-First Design Tokens

## Objective
Configure Tailwind CSS with custom design tokens, mobile-first breakpoints, and color scheme based on Sea Shipping Line branding.

## Requirements
- Mobile-first responsive breakpoints
- Custom color palette matching current branding
- Typography scale with responsive sizing
- Spacing system
- Shadow and border utilities
- Dark mode support (optional future enhancement)

## Implementation Steps

1. **Extract Current Brand Colors**
   - Analyze current website (https://seashipping.com/)
   - Extract primary, secondary, and accent colors
   - Define color palette with proper naming
   - Ensure WCAG AA contrast ratios (4.5:1 minimum)

2. **Configure Tailwind Config**
   ```typescript
   // tailwind.config.ts
   export default {
     content: [
       './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
       './src/components/**/*.{js,ts,jsx,tsx,mdx}',
       './src/app/**/*.{js,ts,jsx,tsx,mdx}',
     ],
     theme: {
       screens: {
         'xs': '320px',   // Extra small phones
         'sm': '640px',   // Mobile devices
         'md': '768px',   // Tablets
         'lg': '1024px',  // Desktop
         'xl': '1280px',  // Large desktop
         '2xl': '1536px', // Extra large desktop
       },
       extend: {
         colors: {
           primary: {
             // Define based on brand analysis
           },
           secondary: {
             // Define based on brand analysis
           },
           accent: {
             // Define based on brand analysis
           },
         },
         fontFamily: {
           sans: ['var(--font-sans)', 'sans-serif'],
         },
         fontSize: {
           // Mobile-first responsive type scale
         },
       },
     },
   }
   ```

3. **Setup Typography Scale**
   - Base font size: 16px (minimum for mobile)
   - Responsive type scale using clamp()
   - Line heights: 1.5 for body, 1.2 for headings
   - Font weights: regular, medium, semibold, bold

4. **Configure Spacing System**
   - Use Tailwind's default spacing scale
   - Add custom spacings if needed for design
   - Ensure touch-friendly spacing on mobile (44x44px minimum)

5. **Add Custom Utilities**
   - Container utilities for max-width
   - Focus ring utilities for accessibility
   - Animation utilities with reduced motion support

6. **Setup CSS Custom Properties**
   ```css
   /* globals.css */
   :root {
     --font-sans: ...;
     --radius: 0.5rem;
     /* Add other CSS variables */
   }
   ```

7. **Create Design Token Documentation**
   - Document all colors with hex values
   - Document typography scale
   - Document spacing conventions
   - Create visual reference guide

## Testing Requirements
- All Tailwind utilities apply correctly
- Responsive breakpoints work as expected
- Colors meet WCAG AA contrast requirements
- Typography scales properly on all viewports
- Build succeeds with custom configuration

## Acceptance Criteria
- ✅ Tailwind configured with mobile-first breakpoints
- ✅ Brand colors extracted and defined
- ✅ Color contrast ratios meet WCAG AA (4.5:1)
- ✅ Typography scale configured
- ✅ Spacing system established
- ✅ Custom utilities added
- ✅ CSS custom properties defined
- ✅ Design tokens documented
- ✅ Configuration builds successfully

## Notes
- Current site uses blues, whites, and grays
- Maintain visual consistency with current branding
- All breakpoints should be mobile-first (min-width)
- Consider creating a Storybook for design system documentation
