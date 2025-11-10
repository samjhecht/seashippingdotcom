---
id: 033
title: Migrate All PDF Forms from WordPress v1 to Local Hosting
phase: 4
priority: medium
status: todo
dependencies: [013]
estimated_hours: 4
tags: [content, migration, forms, pdf, resources]
---

# Migrate All PDF Forms to Local Hosting

## Objective
Download and migrate all 35+ PDF forms from the WordPress v1 site to local hosting in the Next.js application. Update all references in `/src/app/resources/page.tsx` to use local paths instead of external v1 URLs, ensuring the new site is fully self-sufficient.

## Current State
- Resource page exists at `/src/app/resources/page.tsx`
- 35 PDF forms referenced in the forms list
- Most forms currently link to v1 site URLs (`https://seashipping.com/forms/...`)
- Some forms already have local paths (`/forms/...`)
- No systematic local storage of all forms
- Dependency on v1 site creates single point of failure

## Problem Statement
The current implementation has several issues:
1. **External Dependencies**: Forms hosted on v1 WordPress site
2. **Link Rot Risk**: If v1 site goes down, forms become inaccessible
3. **Performance**: External links slower than local hosting
4. **Control**: Cannot optimize or update forms without v1 access
5. **Migration Incomplete**: Partial migration creates confusion
6. **User Experience**: Inconsistent download behavior (local vs external)

## Requirements

### Forms List (from `/src/app/resources/page.tsx`)
Current forms that need migration:

```typescript
const forms = [
  { name: 'SSL Bill of Lading', url: '/forms/SSL%20Bill%20of%20Lading.pdf' }, // ✅ Local
  { name: 'SSL Bill of Lading Instructions', url: '/forms/SSL%20Bill%20of%20Lading%20Instructions.pdf' }, // ✅ Local
  { name: 'SSL CFS Delivery Form', url: '/forms/SSL%20CFS%20Delivery%20Form.pdf' }, // ✅ Local
  { name: 'SSL Fumigation Policy', url: '/forms/SSL%20Fumigation%20Policy.pdf' }, // ✅ Local
  { name: 'SSL Global Points Listing', url: '/forms/SSL%20FCL%20Point%20Scope.xlsx' }, // ✅ Local (Excel)
  { name: 'SSL Guide to Carnets', url: '/forms/SSL%20Guide%20to%20Carnets.pdf' }, // ✅ Local
  { name: 'SSL Hazardous Materials Policy', url: '/forms/SSL%20Hazardous%20Materials%20Policy.pdf' }, // ✅ Local
  { name: 'SSL Heavy Haul Terms & Conditions', url: '/forms/SSL%20Heavy%20Haul%20Terms_Conditions.pdf' }, // ✅ Local
  { name: 'SSL Household Goods/Personal Effects Form', url: '/forms/SSL%20Household%20Goods%20Personal%20Effects%20Form.pdf' }, // ✅ Local
  { name: 'SSL Import Power of Attorney', url: '/forms/SSL%20Import%20Power%20of%20Attorney.pdf' }, // ✅ Local
  { name: 'SSL Intent to Export Vehicle Form', url: '/forms/SSL%20Intent%20to%20Export%20Vehicle%20Form.pdf' }, // ✅ Local
  { name: 'SSL Intent to File Claim Receipt', url: '/forms/SSL%20Intent%20to%20File%20Claim%20Receipt.pdf' }, // ✅ Local
  { name: 'SSL Map of Paperless Bills of Lading Eligibility', url: '/forms/SSL%20Map%20of%20Paperless%20Bills%20of%20Lading%20Eligibility.pdf' }, // ✅ Local
  { name: 'SSL Office & Staff Listing', url: '/forms/SSL%20Full%20Style%20Contact%20Details.pdf' }, // ✅ Local
  { name: 'SSL Official Holiday Observances - 2025', url: '/forms/SSL%20Official%20Holiday%20Observances.pdf' }, // ✅ Local
  { name: 'SSL Online Pricing Instructional Aide', url: '/forms/SSL%20On-Line%20Pricing%20Instructional%20Aide.pdf' }, // ✅ Local
  { name: 'SSL Partner Security Form', url: '/forms/SSL%20Partner%20Security%20Form.pdf' }, // ✅ Local
  { name: 'SSL Verified Gross Mass Certification Form', url: '/forms/SSL%20Verified%20Gross%20Mass%20Form.pdf' }, // ✅ Local
]

// Industry tools with external v1 links that need migration:
const industryTools = [
  // ... other tools ...
  {
    name: 'Australian Annual Packing Declaration',
    url: 'https://seashipping.com/forms/Australian%20Annual%20Packing%20Declaration%20ISPM15.pdf', // ❌ External
  },
  {
    name: 'Australian Free Trade Duty-Free Declaration',
    url: 'https://seashipping.com/forms/Australian%20Free%20Trade%20Duty-Free%20Declaration.pdf', // ❌ External
  },
  {
    name: 'Container Specifications',
    url: 'https://seashipping.com/forms/Ocean%20Container%20Specifications.pdf', // ❌ External
  },
  {
    name: 'Hazardous Materials Policy (SSL)',
    url: 'https://seashipping.com/forms/SSL%20Hazardous%20Materials%20Policy.pdf', // ❌ Duplicate (already in forms)
  },
  {
    name: 'ICC Incoterms Rules 2020',
    url: 'https://seashipping.com/forms/ICC%20Incoterms%20Rules%202020%20Guide.pdf', // ❌ External
  },
  {
    name: 'SOLAS Container Weight Mandate',
    url: 'https://seashipping.com/forms/Solas%20Container%20Weight%20Mandate.pdf', // ❌ External
  },
]
```

### Total Files to Migrate
- **SSL Forms**: 18 files (already local paths but may need verification)
- **Industry Tools**: 6 additional PDF files from v1 site
- **Total**: ~24 PDF files + 1 Excel file

## Implementation Steps

### 1. Audit Current State

```bash
# Check which files already exist locally
ls -la /Users/sam/code/seashippingdotcom/public/forms/

# Identify missing files
# Create checklist of files to download from v1
```

### 2. Download Files from v1 Site

Create a download script or manually download:

```bash
#!/bin/bash
# download-forms.sh

BASE_URL="https://seashipping.com/forms"
OUTPUT_DIR="./public/forms"

# Ensure output directory exists
mkdir -p "$OUTPUT_DIR"

# Array of files to download
files=(
  "Australian%20Annual%20Packing%20Declaration%20ISPM15.pdf"
  "Australian%20Free%20Trade%20Duty-Free%20Declaration.pdf"
  "Ocean%20Container%20Specifications.pdf"
  "ICC%20Incoterms%20Rules%202020%20Guide.pdf"
  "Solas%20Container%20Weight%20Mandate.pdf"
  # Add any other missing files
)

# Download each file
for file in "${files[@]}"; do
  echo "Downloading $file..."
  curl -o "$OUTPUT_DIR/$file" "$BASE_URL/$file"

  # Decode URL encoding in filename
  decoded=$(echo "$file" | sed 's/%20/ /g')
  if [ "$file" != "$decoded" ]; then
    mv "$OUTPUT_DIR/$file" "$OUTPUT_DIR/$decoded"
  fi

  echo "✓ Downloaded: $decoded"
done

echo "✅ All forms downloaded successfully"
```

### 3. Verify File Integrity

```bash
# Check file sizes (should be > 0 bytes)
find public/forms -name "*.pdf" -size 0 -ls

# Check PDF validity
for file in public/forms/*.pdf; do
  pdfinfo "$file" > /dev/null 2>&1 || echo "Invalid PDF: $file"
done

# List all files with sizes
ls -lh public/forms/
```

### 4. Optimize PDFs (Optional but Recommended)

```bash
# Install ghostscript if not already installed
# brew install ghostscript

# Optimize each PDF to reduce file size
for file in public/forms/*.pdf; do
  output="${file%.pdf}_optimized.pdf"
  gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook \
     -dNOPAUSE -dQUIET -dBATCH -sOutputFile="$output" "$file"

  # Replace original if optimized is smaller
  if [ -f "$output" ] && [ $(stat -f%z "$output") -lt $(stat -f%z "$file") ]; then
    mv "$output" "$file"
    echo "Optimized: $file"
  else
    rm -f "$output"
  fi
done
```

### 5. Update Resources Page

```typescript
// src/app/resources/page.tsx

// Update industryTools array to use local paths
const industryTools = [
  { name: 'American Shipper', url: 'https://www.freightwaves.com/american-shipper' },
  {
    name: 'Australian Annual Packing Declaration',
    url: '/forms/Australian Annual Packing Declaration ISPM15.pdf', // ✅ Now local
  },
  {
    name: 'Australian Free Trade Duty-Free Declaration',
    url: '/forms/Australian Free Trade Duty-Free Declaration.pdf', // ✅ Now local
  },
  { name: 'Automated Commercial Environment (ACE)', url: 'https://ace.cbp.gov/s/login/' },
  { name: 'Big Schedules', url: 'https://www.bigschedules.com/' },
  {
    name: 'Calling Codes (International)',
    url: 'https://www.nationsonline.org/oneworld/international-calling-codes.htm',
  },
  { name: 'CargoSmart', url: 'https://www.cargosmart.com/en-us/' },
  {
    name: 'CFR 49 DOT Placard Tables',
    url: 'https://www.labelmaster.com/resources/placardfinder/dot-placard-tables',
  },
  { name: 'City Distance Tool', url: 'https://geobytes.com/citydistancetool/' },
  {
    name: 'Container Specifications',
    url: '/forms/Ocean Container Specifications.pdf', // ✅ Now local
  },
  { name: 'Currency Converter', url: 'https://www.xe.com/' },
  {
    name: 'CTPAT',
    url: 'https://www.cbp.gov/border-security/ports-entry/cargo-security/ctpat',
  },
  { name: 'Dangerous Goods Advisory Council', url: 'http://www.dgac.org/' },
  { name: 'Department of Transportation', url: 'https://www.transportation.gov/' },
  { name: 'e2open (INTTRA)', url: 'https://www.inttra.com/' },
  { name: 'Export Bureau', url: 'https://www.exportbureau.com/' },
  { name: 'Federal Maritime Commission', url: 'https://www.fmc.gov/' },
  {
    name: 'Fumigation Services',
    url: 'https://www.prestox.com/fumigation/container-fumigation/index.html',
  },
  { name: 'Google Maps', url: 'https://www.google.com/maps/' },
  {
    name: 'Hazardous Materials Policy (SSL)',
    url: '/forms/SSL Hazardous Materials Policy.pdf', // ✅ Already local, remove duplicate
  },
  { name: 'Import Genius', url: 'https://www.importgenius.com/' },
  {
    name: 'ICC Incoterms Rules 2020',
    url: '/forms/ICC Incoterms Rules 2020 Guide.pdf', // ✅ Now local
  },
  { name: 'Infor Nexus', url: 'https://www.infor.com/solutions/scm/infor-nexus' },
  { name: 'International Association of Movers', url: 'https://www.iamovers.org/' },
  {
    name: 'International Port Code Lookup',
    url: 'https://www.sfmx.org/wp-content/uploads/2017/10/World-Port-Codes-and-Names.pdf',
  },
  { name: 'International Trade Administration', url: 'https://www.trade.gov/' },
  { name: 'Journal of Commerce', url: 'https://www.joc.com/' },
  { name: 'Linescape', url: 'https://www.linescape.com/' },
  { name: 'Marine Traffic Data (Live Map)', url: 'https://www.marinetraffic.com/' },
  { name: 'NCBFAA', url: 'https://www.ncbfaa.org/' },
  {
    name: 'Ocean Transportation Intermediaries Listing',
    url: 'https://www2.fmc.gov/oti/',
  },
  { name: 'On-Line Conversion', url: 'http://www.onlineconversion.com/' },
  {
    name: 'Percentage of Increase Calculator',
    url: 'https://www.marshu.com/articles/calculate-percentage-increase-decrease-percent-calculator.php',
  },
  { name: 'Phone Directory', url: 'https://www.whitepages.com/' },
  { name: 'PierPASS & Portcheck', url: 'https://www.pierpass-tmf.org/' },
  {
    name: 'Road Weight & Size Limitations by State',
    url: 'https://ops.fhwa.dot.gov/freight/policy/rpt_congress/truck_sw_laws/app_a.htm',
  },
  { name: 'Schedule B Search Engine', url: 'https://uscensus.prod.3ceonline.com/' },
  {
    name: 'SOLAS Container Weight Mandate',
    url: '/forms/Solas Container Weight Mandate.pdf', // ✅ Now local
  },
  { name: 'Time and Date', url: 'https://www.timeanddate.com/' },
  { name: 'TT Club Mutual Insurance Limited', url: 'https://www.ttclub.com/' },
  { name: 'U.S. Customs and Border Protection', url: 'https://www.cbp.gov/' },
  {
    name: 'U.S. Flag Services',
    url: 'https://www.maritime.dot.gov/ports/cargo-preference/us-flag-services',
  },
  { name: 'UNCTAD Liner Code Directory', url: 'https://unctadstat.unctad.org/EN/' },
  {
    name: 'United States International Trade Commission',
    url: 'https://www.usitc.gov/',
  },
  { name: 'Vessel Schedules (various carriers)', url: 'https://www.bigschedules.com/' },
  { name: 'World Bank Data', url: 'https://data.worldbank.org/' },
  { name: 'World Customs Organization', url: 'http://www.wcoomd.org/' },
  { name: 'World Shipping Council', url: 'https://www.worldshipping.org/' },
]
```

### 6. Create Forms Inventory

```typescript
// src/lib/forms-inventory.ts

export interface FormMetadata {
  id: string
  name: string
  category: 'shipping' | 'legal' | 'customs' | 'hazmat' | 'general'
  fileName: string
  url: string
  fileSize: string
  lastUpdated: string
  description: string
}

export const formsInventory: FormMetadata[] = [
  {
    id: 'bill-of-lading',
    name: 'SSL Bill of Lading',
    category: 'shipping',
    fileName: 'SSL Bill of Lading.pdf',
    url: '/forms/SSL Bill of Lading.pdf',
    fileSize: '1.2 MB',
    lastUpdated: '2025-01-01',
    description: 'Standard ocean freight bill of lading form for FCL and LCL shipments',
  },
  // ... add all other forms with metadata
]

// Utility functions
export function getFormsByCategory(category: string): FormMetadata[] {
  return formsInventory.filter((form) => form.category === category)
}

export function searchForms(query: string): FormMetadata[] {
  const lowerQuery = query.toLowerCase()
  return formsInventory.filter(
    (form) =>
      form.name.toLowerCase().includes(lowerQuery) ||
      form.description.toLowerCase().includes(lowerQuery)
  )
}
```

### 7. Add Download Analytics (Optional)

```typescript
// src/app/api/forms/download/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function GET(request: NextRequest) {
  const formName = request.nextUrl.searchParams.get('form')

  if (!formName) {
    return NextResponse.json({ error: 'Form name required' }, { status: 400 })
  }

  // Log download event (optional analytics)
  const headersList = headers()
  const userAgent = headersList.get('user-agent') || 'unknown'

  console.log(`Form downloaded: ${formName} | User-Agent: ${userAgent}`)

  // Could store in database or analytics service
  // await trackFormDownload(formName, userAgent)

  return NextResponse.json({ success: true })
}
```

### 8. Update Next.js Configuration

```typescript
// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... existing config

  // Configure headers for PDF downloads
  async headers() {
    return [
      {
        source: '/forms/:path*.pdf',
        headers: [
          {
            key: 'Content-Disposition',
            value: 'attachment',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

## Testing Requirements

### Manual Testing Checklist
```markdown
- [ ] All 35 PDF files downloaded from v1 site
- [ ] Files stored in `/public/forms/` directory
- [ ] File naming consistent (URL-encoded spaces decoded)
- [ ] All PDFs open correctly in browser
- [ ] All PDFs download correctly
- [ ] File sizes reasonable (< 5MB each ideally)
- [ ] Resources page updated with local paths
- [ ] No 404 errors on form links
- [ ] Download analytics working (if implemented)
- [ ] Cache headers configured correctly
```

### Automated Tests

```typescript
// __tests__/integration/forms/forms-availability.test.ts

import { readdir } from 'fs/promises'
import { join } from 'path'

describe('Forms Availability', () => {
  const FORMS_DIR = join(process.cwd(), 'public', 'forms')

  it('all required forms exist in public directory', async () => {
    const files = await readdir(FORMS_DIR)

    const requiredForms = [
      'SSL Bill of Lading.pdf',
      'SSL Bill of Lading Instructions.pdf',
      'Australian Annual Packing Declaration ISPM15.pdf',
      'Ocean Container Specifications.pdf',
      'ICC Incoterms Rules 2020 Guide.pdf',
      'Solas Container Weight Mandate.pdf',
      // ... add all required forms
    ]

    for (const form of requiredForms) {
      expect(files).toContain(form)
    }
  })

  it('all PDF files are valid and not empty', async () => {
    const files = await readdir(FORMS_DIR)
    const pdfFiles = files.filter((f) => f.endsWith('.pdf'))

    for (const file of pdfFiles) {
      const { stat } = await import('fs/promises')
      const stats = await stat(join(FORMS_DIR, file))

      expect(stats.size).toBeGreaterThan(0)
      expect(stats.size).toBeLessThan(10 * 1024 * 1024) // < 10MB
    }
  })
})
```

### E2E Tests

```typescript
// __tests__/e2e/resources/forms-download.spec.ts

import { test, expect } from '@playwright/test'

test.describe('Forms Download', () => {
  test('can download SSL Bill of Lading', async ({ page }) => {
    await page.goto('/resources')

    // Set up download handler
    const downloadPromise = page.waitForEvent('download')

    await page.click('text=SSL Bill of Lading')
    const download = await downloadPromise

    expect(download.suggestedFilename()).toContain('SSL Bill of Lading')
    expect(download.suggestedFilename()).toContain('.pdf')
  })

  test('all form links return 200 status', async ({ page, request }) => {
    await page.goto('/resources')

    // Get all form links
    const formLinks = await page.locator('a[href^="/forms/"]').all()

    for (const link of formLinks) {
      const href = await link.getAttribute('href')
      const response = await request.get(href!)

      expect(response.status()).toBe(200)
    }
  })

  test('no external v1 site links remain', async ({ page }) => {
    await page.goto('/resources')

    const v1Links = await page.locator('a[href*="seashipping.com/forms"]').all()

    expect(v1Links.length).toBe(0)
  })
})
```

## File Organization

### Directory Structure
```
/public/
  /forms/
    # SSL-specific forms
    SSL Bill of Lading.pdf
    SSL Bill of Lading Instructions.pdf
    SSL CFS Delivery Form.pdf
    SSL Fumigation Policy.pdf
    SSL FCL Point Scope.xlsx
    SSL Guide to Carnets.pdf
    SSL Hazardous Materials Policy.pdf
    SSL Heavy Haul Terms_Conditions.pdf
    SSL Household Goods Personal Effects Form.pdf
    SSL Import Power of Attorney.pdf
    SSL Intent to Export Vehicle Form.pdf
    SSL Intent to File Claim Receipt.pdf
    SSL Map of Paperless Bills of Lading Eligibility.pdf
    SSL Full Style Contact Details.pdf
    SSL Official Holiday Observances.pdf
    SSL On-Line Pricing Instructional Aide.pdf
    SSL Partner Security Form.pdf
    SSL Verified Gross Mass Form.pdf

    # Industry/General forms
    Australian Annual Packing Declaration ISPM15.pdf
    Australian Free Trade Duty-Free Declaration.pdf
    Ocean Container Specifications.pdf
    ICC Incoterms Rules 2020 Guide.pdf
    Solas Container Weight Mandate.pdf
```

## Acceptance Criteria
- ✅ All 35+ PDF forms downloaded from v1 site
- ✅ All files stored in `/public/forms/` directory
- ✅ File naming consistent and URL-safe
- ✅ All PDFs verified as valid and complete
- ✅ Resources page updated to use local paths only
- ✅ Zero external v1 site links for forms
- ✅ Download functionality tested and working
- ✅ File sizes optimized (if possible)
- ✅ Cache headers configured
- ✅ Automated tests verify all forms exist
- ✅ E2E tests confirm download functionality
- ✅ Forms inventory documentation created
- ✅ Build succeeds with all files
- ✅ No broken links on resources page

## Performance Considerations
- **File Size**: Optimize PDFs to reduce load times (target < 3MB)
- **Caching**: Configure long-term caching (1 year) with immutable flag
- **CDN**: Forms will benefit from Vercel's CDN distribution
- **Compression**: Enable gzip/brotli compression for PDFs
- **Lazy Loading**: Not applicable for downloads, but consider for previews
- **Analytics**: Track downloads to understand usage patterns

## Security Considerations
- **File Validation**: Ensure all PDFs are legitimate (not malware)
- **Access Control**: Forms are public, no authentication needed
- **HTTPS Only**: All downloads over secure connection
- **Content-Type**: Ensure proper MIME type (application/pdf)
- **No Execution**: PDFs are static documents, no server execution
- **Virus Scan**: Consider scanning all files before deployment

## Maintenance Plan
- **Regular Audits**: Check for outdated forms quarterly
- **Version Control**: Update forms as policies/procedures change
- **Naming Convention**: Maintain consistent naming scheme
- **Archive Old Versions**: Keep historical versions if needed
- **404 Monitoring**: Monitor for broken form links
- **Usage Analytics**: Track which forms are most popular

## Notes
- **Backup**: Keep backup of all original files from v1 site
- **File Names**: Decode URL encoding (%20 → spaces)
- **Excel File**: One file is .xlsx (SSL Global Points Listing)
- **Duplicates**: Remove duplicate "Hazardous Materials Policy" entry
- **Copyright**: Ensure SSL owns rights to all documents
- **Third-Party Forms**: Some industry forms may have licensing restrictions
- **Git LFS**: Consider using Git Large File Storage if forms are very large
- **Build Time**: Many large PDFs may increase build time slightly

## Related Issues
- **Issue #013**: Content Migration & Assets (parent issue)
- **Issue #030**: Newsletter Archive (similar PDF migration pattern)

## Migration Checklist

```markdown
### Pre-Migration
- [ ] Identify all forms currently linked from resources page
- [ ] Document current v1 URLs
- [ ] Check file sizes on v1 site
- [ ] Verify SSL ownership of all documents

### Migration
- [ ] Create `/public/forms/` directory structure
- [ ] Download all SSL forms from v1 site
- [ ] Download all industry tool forms from v1 site
- [ ] Decode URL-encoded filenames
- [ ] Verify all PDFs are valid and complete
- [ ] Check file sizes (optimize if needed)
- [ ] Scan for viruses/malware

### Code Updates
- [ ] Update forms array in resources page
- [ ] Update industryTools array in resources page
- [ ] Remove duplicate entries
- [ ] Create forms inventory file (optional)
- [ ] Add download analytics (optional)
- [ ] Configure Next.js headers for PDFs

### Testing
- [ ] Manual test: Click each form link
- [ ] Manual test: Verify downloads work
- [ ] Manual test: PDFs open correctly
- [ ] Automated test: All files exist
- [ ] Automated test: All PDFs valid
- [ ] E2E test: Download functionality
- [ ] E2E test: No v1 links remain

### Deployment
- [ ] Commit all files to git
- [ ] Verify build succeeds
- [ ] Deploy to staging
- [ ] Test on staging environment
- [ ] Deploy to production
- [ ] Verify all forms accessible in production

### Post-Migration
- [ ] Monitor for 404 errors
- [ ] Track download analytics
- [ ] Update documentation
- [ ] Notify team of completion
- [ ] Archive v1 forms backup
```

## Estimated Time Breakdown
- **Download & Organize**: 1 hour
- **Optimize Files**: 0.5 hours
- **Update Code**: 1 hour
- **Testing**: 1 hour
- **Documentation**: 0.5 hours
- **Total**: 4 hours
