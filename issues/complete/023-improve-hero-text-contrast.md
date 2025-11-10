# Issue #023: Improve Hero Text Contrast Without Making It Gaudy

**Status:** ✅ Completed
**Priority:** High
**Labels:** ui-feedback, enhancement, accessibility, hero
**Created:** 2025-10-30
**Completed:** 2025-10-30

## Original User Feedback

User reported that hero text needs better contrast for readability, but should remain professional and not gaudy.

## Location

- **Page:** Homepage (`/`)
- **Component:** Hero section
- **File:** `/src/components/sections/Hero.tsx`

## Implementation

### Changes Made (lines 25-27)

**Before:**
- Single text shadow: `2px 2px 4px rgba(0,0,0,0.8)`
- No background overlay

**After:**
- Added subtle dark overlay: `bg-black/30` (30% opacity)
- Enhanced dual-layer text shadow:
  - Primary shadow: `3px 3px 6px rgba(0,0,0,0.9)`
  - Glow effect: `0 0 20px rgba(0,0,0,0.5)`

### Technical Approach
1. Added overlay div with `absolute inset-0 bg-black/30 z-[5]`
2. Increased text shadow strength from 0.8 to 0.9 opacity
3. Added secondary glow shadow for depth
4. Ensured text remains on top with `z-10`

### Result
- ✅ Significantly improved text readability
- ✅ Maintains professional appearance
- ✅ Not gaudy or excessive
- ✅ Works across different hero images
- ✅ Accessible contrast ratios

## Files Modified
- ✅ `/src/components/sections/Hero.tsx` (lines 25-27)

## Completion Criteria
- [x] Add subtle background overlay
- [x] Enhance text shadow for better contrast
- [x] Test readability across different backgrounds
- [x] Ensure professional appearance
- [x] Verify no visual gaudi-ness
