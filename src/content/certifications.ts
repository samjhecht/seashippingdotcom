/**
 * Certifications, memberships, and regulatory credentials
 */

export interface Certification {
  id: string;
  name: string;
  image: string;
  link?: string;
  description?: string;
  type: 'certification' | 'membership' | 'credential';
}

export const certifications: Certification[] = [
  {
    id: 'ctpat',
    name: 'C-TPAT Certified',
    image: '/images/certifications/ctpat.png',
    description: 'Customs-Trade Partnership Against Terrorism',
    type: 'certification',
    link: 'https://www.cbp.gov/border-security/ports-entry/cargo-security/ctpat',
  },
  {
    id: 'fmc',
    name: 'FMC Licensed',
    image: '/images/certifications/fmc.png',
    description: 'Federal Maritime Commission License',
    type: 'credential',
    link: 'https://www.fmc.gov/',
  },
  {
    id: 'iata',
    name: 'IATA Member',
    image: '/images/certifications/iata.png',
    description: 'International Air Transport Association',
    type: 'membership',
    link: 'https://www.iata.org/',
  },
  {
    id: 'wca',
    name: 'WCA Member',
    image: '/images/certifications/wca.png',
    description: 'World Cargo Alliance',
    type: 'membership',
    link: 'https://www.wcaworld.com/',
  },
  {
    id: 'ncbfaa',
    name: 'NCBFAA Member',
    image: '/images/certifications/ncbfaa.png',
    description: 'National Customs Brokers & Forwarders Association of America',
    type: 'membership',
    link: 'https://www.ncbfaa.org/',
  },
  {
    id: 'iso',
    name: 'ISO 9001:2015',
    image: '/images/certifications/iso.png',
    description: 'Quality Management System Certification',
    type: 'certification',
  },
];

export const regulatoryCredentials = {
  oti: '024412NF',
  scac: 'SEAS',
  dot: '3849560',
  mc: '1234567',
  customsFillerCode: 'SEAS123',
  fmcNumber: 'FMC-024412',
} as const;

/**
 * Get certification by ID
 */
export function getCertificationById(id: string): Certification | undefined {
  return certifications.find((cert) => cert.id === id);
}

/**
 * Get certifications by type
 */
export function getCertificationsByType(
  type: Certification['type']
): Certification[] {
  return certifications.filter((cert) => cert.type === type);
}

/**
 * Get all certification names
 */
export function getCertificationNames(): string[] {
  return certifications.map((cert) => cert.name);
}
