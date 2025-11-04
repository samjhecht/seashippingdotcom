/**
 * Centralized image manifest for all site images
 * Provides type-safe access to image paths and metadata
 */

export interface ImageMetadata {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

export const images = {
  // Hero images
  hero: {
    main: {
      src: '/images/hero/hero-shipping.jpg',
      alt: 'Global shipping operations with cargo containers and vessels',
      width: 1920,
      height: 1080,
      priority: true,
    },
  },

  // Service images
  services: {
    oceanFreight: {
      src: '/images/services/ocean-freight.jpg',
      alt: 'Ocean freight container shipping',
      width: 800,
      height: 600,
    },
    automobiles: {
      src: '/images/services/automobiles.jpg',
      alt: 'Automobile shipping and logistics',
      width: 800,
      height: 600,
    },
    household: {
      src: '/images/services/household-goods.jpg',
      alt: 'Household goods and personal effects shipping',
      width: 800,
      height: 600,
    },
    breakBulk: {
      src: '/images/services/break-bulk.jpg',
      alt: 'Break bulk cargo handling',
      width: 800,
      height: 600,
    },
    projectCargo: {
      src: '/images/services/project-cargo.jpg',
      alt: 'Heavy machinery and project cargo',
      width: 800,
      height: 600,
    },
    hazmat: {
      src: '/images/services/hazmat.jpg',
      alt: 'Hazardous materials shipping',
      width: 800,
      height: 600,
    },
    temperature: {
      src: '/images/services/temperature-controlled.jpg',
      alt: 'Temperature-controlled shipping',
      width: 800,
      height: 600,
    },
  },

  // Certification logos
  certifications: {
    ctpat: {
      src: '/images/certifications/ctpat.png',
      alt: 'C-TPAT Certified',
      width: 200,
      height: 200,
    },
    fmc: {
      src: '/images/certifications/fmc.png',
      alt: 'FMC Licensed',
      width: 200,
      height: 200,
    },
    iata: {
      src: '/images/certifications/iata.png',
      alt: 'IATA Member',
      width: 200,
      height: 200,
    },
    wca: {
      src: '/images/certifications/wca.png',
      alt: 'WCA Member',
      width: 200,
      height: 200,
    },
    ncbfaa: {
      src: '/images/certifications/ncbfaa.png',
      alt: 'NCBFAA Member',
      width: 200,
      height: 200,
    },
    iso: {
      src: '/images/certifications/iso.png',
      alt: 'ISO 9001:2015 Certified',
      width: 200,
      height: 200,
    },
  },

  // Company logo
  logo: {
    svg: {
      src: '/images/logo/logo.svg',
      alt: 'Sea Shipping Company Logo',
      width: 240,
      height: 60,
    },
    png: {
      src: '/images/logo/logo.png',
      alt: 'Sea Shipping Company Logo',
      width: 240,
      height: 60,
    },
    icon: {
      src: '/images/logo/icon.png',
      alt: 'Sea Shipping Icon',
      width: 64,
      height: 64,
    },
  },

  // Office images (optional - can be used for office location pages)
  offices: {
    nyc: {
      src: '/images/offices/nyc.jpg',
      alt: 'New York office location',
      width: 800,
      height: 600,
    },
    lax: {
      src: '/images/offices/lax.jpg',
      alt: 'Los Angeles office location',
      width: 800,
      height: 600,
    },
    sea: {
      src: '/images/offices/sea.jpg',
      alt: 'Seattle office location',
      width: 800,
      height: 600,
    },
    chs: {
      src: '/images/offices/chs.jpg',
      alt: 'Charleston office location',
      width: 800,
      height: 600,
    },
    orf: {
      src: '/images/offices/orf.jpg',
      alt: 'Norfolk office location',
      width: 800,
      height: 600,
    },
    sav: {
      src: '/images/offices/sav.jpg',
      alt: 'Savannah office location',
      width: 800,
      height: 600,
    },
    hou: {
      src: '/images/offices/hou.jpg',
      alt: 'Houston office location',
      width: 800,
      height: 600,
    },
    mia: {
      src: '/images/offices/mia.jpg',
      alt: 'Miami office location',
      width: 800,
      height: 600,
    },
  },

  // Placeholder/default images
  placeholders: {
    service: {
      src: '/images/placeholders/service-placeholder.jpg',
      alt: 'Service image placeholder',
      width: 800,
      height: 600,
    },
    office: {
      src: '/images/placeholders/office-placeholder.jpg',
      alt: 'Office image placeholder',
      width: 800,
      height: 600,
    },
  },
} as const;

/**
 * Get image metadata by path
 * Useful for dynamic image lookups
 */
export function getImageByPath(path: string): ImageMetadata | undefined {
  const findImage = (obj: any): ImageMetadata | undefined => {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        if ('src' in obj[key] && obj[key].src === path) {
          return obj[key];
        }
        const found = findImage(obj[key]);
        if (found) return found;
      }
    }
    return undefined;
  };
  return findImage(images);
}

/**
 * Get all service images
 */
export function getServiceImages(): ImageMetadata[] {
  return Object.values(images.services);
}

/**
 * Get all certification images
 */
export function getCertificationImages(): ImageMetadata[] {
  return Object.values(images.certifications);
}

/**
 * Get all office images
 */
export function getOfficeImages(): ImageMetadata[] {
  return Object.values(images.offices);
}

/**
 * Generate responsive image sizes attribute
 */
export function generateSizes(config: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
}): string {
  const { mobile = '100vw', tablet = '50vw', desktop = '33vw' } = config;
  return `(max-width: 768px) ${mobile}, (max-width: 1200px) ${tablet}, ${desktop}`;
}

/**
 * Common image sizes configurations
 */
export const imageSizes = {
  hero: '100vw',
  fullWidth: '100vw',
  halfWidth: '(max-width: 768px) 100vw, 50vw',
  thirdWidth: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quarterWidth: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw',
  logo: '240px',
  icon: '64px',
  certification: '200px',
} as const;
