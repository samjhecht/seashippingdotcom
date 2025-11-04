/**
 * Downloadable documents, forms, and PDFs
 */

export interface Document {
  id: string;
  title: string;
  category: 'forms' | 'policies' | 'guides' | 'brochures';
  filename: string;
  description?: string;
  size?: string;
  lastUpdated?: string;
  fileType: 'pdf' | 'doc' | 'xlsx';
}

export const documents: Document[] = [
  // Forms
  {
    id: 'bill-of-lading',
    title: 'Bill of Lading',
    category: 'forms',
    filename: 'bill-of-lading.pdf',
    description: 'Standard ocean freight bill of lading form',
    size: '245 KB',
    lastUpdated: '2024-01',
    fileType: 'pdf',
  },
  {
    id: 'commercial-invoice',
    title: 'Commercial Invoice',
    category: 'forms',
    filename: 'commercial-invoice.pdf',
    description: 'International shipping commercial invoice template',
    size: '180 KB',
    lastUpdated: '2024-01',
    fileType: 'pdf',
  },
  {
    id: 'packing-list',
    title: 'Packing List',
    category: 'forms',
    filename: 'packing-list.pdf',
    description: 'Detailed cargo packing list template',
    size: '165 KB',
    lastUpdated: '2024-01',
    fileType: 'pdf',
  },
  {
    id: 'power-of-attorney',
    title: 'Power of Attorney',
    category: 'forms',
    filename: 'power-of-attorney.pdf',
    description: 'Customs broker power of attorney form',
    size: '220 KB',
    lastUpdated: '2024-01',
    fileType: 'pdf',
  },
  {
    id: 'rate-request',
    title: 'Rate Request Form',
    category: 'forms',
    filename: 'rate-request-form.pdf',
    description: 'Shipping rate quote request form',
    size: '195 KB',
    lastUpdated: '2024-01',
    fileType: 'pdf',
  },

  // Policies
  {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    category: 'policies',
    filename: 'privacy-policy.pdf',
    description: 'Company privacy policy and data protection',
    size: '320 KB',
    lastUpdated: '2024-01',
    fileType: 'pdf',
  },
  {
    id: 'terms-conditions',
    title: 'Terms & Conditions',
    category: 'policies',
    filename: 'terms-conditions.pdf',
    description: 'Service terms and conditions',
    size: '385 KB',
    lastUpdated: '2024-01',
    fileType: 'pdf',
  },
  {
    id: 'hazmat-policy',
    title: 'Hazardous Materials Policy',
    category: 'policies',
    filename: 'hazmat-policy.pdf',
    description: 'Guidelines for shipping hazardous materials',
    size: '410 KB',
    lastUpdated: '2024-01',
    fileType: 'pdf',
  },

  // Guides
  {
    id: 'export-guide',
    title: 'Export Shipping Guide',
    category: 'guides',
    filename: 'export-shipping-guide.pdf',
    description: 'Comprehensive guide to international exports',
    size: '1.2 MB',
    lastUpdated: '2024-01',
    fileType: 'pdf',
  },
  {
    id: 'import-guide',
    title: 'Import Shipping Guide',
    category: 'guides',
    filename: 'import-shipping-guide.pdf',
    description: 'Comprehensive guide to international imports',
    size: '1.1 MB',
    lastUpdated: '2024-01',
    fileType: 'pdf',
  },
  {
    id: 'customs-clearance-guide',
    title: 'Customs Clearance Guide',
    category: 'guides',
    filename: 'customs-clearance-guide.pdf',
    description: 'Navigate customs clearance processes',
    size: '890 KB',
    lastUpdated: '2024-01',
    fileType: 'pdf',
  },
  {
    id: 'packaging-guide',
    title: 'Packaging & Labeling Guide',
    category: 'guides',
    filename: 'packaging-guide.pdf',
    description: 'Best practices for cargo packaging',
    size: '650 KB',
    lastUpdated: '2024-01',
    fileType: 'pdf',
  },

  // Brochures
  {
    id: 'company-brochure',
    title: 'Company Brochure',
    category: 'brochures',
    filename: 'company-brochure.pdf',
    description: 'Overview of our services and capabilities',
    size: '2.5 MB',
    lastUpdated: '2024-01',
    fileType: 'pdf',
  },
  {
    id: 'services-overview',
    title: 'Services Overview',
    category: 'brochures',
    filename: 'services-overview.pdf',
    description: 'Detailed breakdown of all shipping services',
    size: '1.8 MB',
    lastUpdated: '2024-01',
    fileType: 'pdf',
  },
];

/**
 * Get document by ID
 */
export function getDocumentById(id: string): Document | undefined {
  return documents.find((doc) => doc.id === id);
}

/**
 * Get documents by category
 */
export function getDocumentsByCategory(
  category: Document['category']
): Document[] {
  return documents.filter((doc) => doc.category === category);
}

/**
 * Get all forms
 */
export function getForms(): Document[] {
  return getDocumentsByCategory('forms');
}

/**
 * Get all policies
 */
export function getPolicies(): Document[] {
  return getDocumentsByCategory('policies');
}

/**
 * Get all guides
 */
export function getGuides(): Document[] {
  return getDocumentsByCategory('guides');
}

/**
 * Get all brochures
 */
export function getBrochures(): Document[] {
  return getDocumentsByCategory('brochures');
}

/**
 * Get document download URL
 */
export function getDocumentUrl(document: Document): string {
  return `/documents/${document.category}/${document.filename}`;
}
