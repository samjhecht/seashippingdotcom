---
id: 013
title: Content Migration and Asset Optimization
phase: 5
priority: high
status: todo
dependencies: [009]
estimated_hours: 8
tags: [content, assets, images, optimization, migration]
---

# Content Migration and Asset Optimization

## Objective
Migrate all content from the current WordPress site and optimize assets for modern web delivery.

## Requirements
- Extract all content from current WordPress site
- Convert content to structured data (JSON/MDX)
- Extract and optimize all images
- Extract all PDFs and documents
- Create content management structure
- Optimize images for Next.js Image component
- Convert images to WebP format
- Create responsive image sets

## Implementation Steps

### 1. Content Audit and Extraction

**Pages to Extract:**
- Homepage content
- All service pages (7 pages)
- Resources page
- Network/offices pages (8 offices)
- About/company information
- News and newsletter content
- Help section content

**Assets to Extract:**
- Logo (high resolution)
- Hero images
- Service images
- Certification/membership badges
- Office photos (if any)
- Icons and graphics
- All PDFs and forms

### 2. Create Content Structure

```typescript
// src/content/offices.ts
export interface Office {
  id: string
  city: string
  code: string
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
  contact: {
    phone: string
    fax?: string
    email: string
  }
  coordinates?: {
    lat: number
    lng: number
  }
}

export const offices: Office[] = [
  {
    id: 'nyc',
    city: 'New York',
    code: 'NYC',
    address: {
      street: '123 Port Ave',
      city: 'New York',
      state: 'NY',
      zip: '10001'
    },
    contact: {
      phone: '+1 (212) 555-0100',
      email: 'nyc@seashipping.com'
    }
  },
  // ... 7 more offices
]
```

```typescript
// src/content/certifications.ts
export interface Certification {
  id: string
  name: string
  image: string
  link?: string
  description?: string
}

export const certifications: Certification[] = [
  {
    id: 'ctpat',
    name: 'C-TPAT Certified',
    image: '/images/certifications/ctpat.png',
    description: 'Customs-Trade Partnership Against Terrorism'
  },
  // ... other certifications
]
```

### 3. Image Optimization Process

**Tools:**
- sharp (Node.js image processing)
- Next.js Image Optimization API
- WebP conversion

**Optimization Script:**
```javascript
// scripts/optimize-images.js
const sharp = require('sharp');
const fs = require('fs/promises');
const path = require('path');

async function optimizeImage(inputPath, outputPath) {
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  // Generate multiple sizes
  const sizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

  for (const size of sizes) {
    if (size <= metadata.width) {
      await image
        .clone()
        .resize(size)
        .webp({ quality: 85 })
        .toFile(`${outputPath}-${size}w.webp`);

      // Also keep JPEG as fallback
      await image
        .clone()
        .resize(size)
        .jpeg({ quality: 85 })
        .toFile(`${outputPath}-${size}w.jpg`);
    }
  }
}

// Process all images in /public/images
async function main() {
  const imagesDir = path.join(__dirname, '../public/images');
  // ... implementation
}

main();
```

### 4. Image Directory Structure

```
public/
├── images/
│   ├── hero/
│   │   ├── hero-shipping-640w.webp
│   │   ├── hero-shipping-640w.jpg
│   │   ├── hero-shipping-1920w.webp
│   │   └── hero-shipping-1920w.jpg
│   ├── services/
│   │   ├── ocean-freight-640w.webp
│   │   └── ...
│   ├── certifications/
│   │   ├── ctpat.png
│   │   └── ...
│   └── logo/
│       ├── logo.svg
│       └── logo.png
├── documents/
│   ├── forms/
│   │   ├── bill-of-lading.pdf
│   │   └── ...
│   └── policies/
│       └── ...
```

### 5. Next.js Image Component Usage

```typescript
// Example: Using optimized images
import Image from 'next/image'

<Image
  src="/images/services/ocean-freight.jpg"
  alt="Ocean freight containers"
  width={1200}
  height={800}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={false} // true for above-fold images
/>
```

### 6. Create Image Manifest

```typescript
// src/lib/images.ts
export const images = {
  hero: {
    main: '/images/hero/hero-shipping.jpg',
    alt: 'Global shipping operations',
  },
  services: {
    oceanFreight: '/images/services/ocean-freight.jpg',
    automobiles: '/images/services/automobiles.jpg',
    // ... other services
  },
  certifications: {
    ctpat: '/images/certifications/ctpat.png',
    // ... other certifications
  },
  logo: {
    svg: '/images/logo/logo.svg',
    png: '/images/logo/logo.png',
  },
}
```

### 7. PDF and Document Management

```typescript
// src/content/documents.ts
export interface Document {
  id: string
  title: string
  category: 'forms' | 'policies' | 'guides'
  filename: string
  description?: string
  size?: string
  lastUpdated?: string
}

export const documents: Document[] = [
  {
    id: 'bill-of-lading',
    title: 'Bill of Lading',
    category: 'forms',
    filename: 'bill-of-lading.pdf',
    description: 'Standard bill of lading form',
    size: '245 KB',
  },
  // ... other documents
]
```

## Testing Requirements
- All images load correctly
- WebP format served to supporting browsers
- JPEG fallback works for older browsers
- Images are responsive across all viewports
- Lazy loading works correctly
- No layout shift (CLS) from images
- All documents accessible and downloadable

## Acceptance Criteria
- ✅ All content extracted from WordPress
- ✅ Content structured in JSON/TypeScript files
- ✅ All images extracted and optimized
- ✅ WebP format generated for all images
- ✅ Multiple image sizes generated
- ✅ Images optimized (< 200KB each)
- ✅ All PDFs and documents extracted
- ✅ Document manifest created
- ✅ Image manifest created
- ✅ Content validates against TypeScript types
- ✅ Images work with Next.js Image component
- ✅ Lazy loading configured
- ✅ No CLS from images
- ✅ All documents downloadable

## Notes
- Use Next.js Image component for automatic optimization
- Keep original images in a separate backup folder
- Compress PDFs if they're very large
- Consider adding alt text descriptions for accessibility
- Logo should be available in SVG format for scalability
- Maintain WordPress export as backup
- Update image paths in content files
- Test images on slow 3G connection
