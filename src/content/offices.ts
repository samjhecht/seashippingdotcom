/**
 * Office locations and contact information
 * 8 U.S. offices providing nationwide coverage
 */

export interface Office {
  id: string;
  city: string;
  code: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  contact: {
    phone: string;
    fax?: string;
    email: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export const offices: Office[] = [
  {
    id: 'nyc',
    city: 'New York',
    code: 'NYC',
    address: {
      street: '123 Port Authority Drive',
      city: 'New York',
      state: 'NY',
      zip: '10001',
    },
    contact: {
      phone: '+1 (212) 555-0100',
      fax: '+1 (212) 555-0101',
      email: 'nyc@seashipping.com',
    },
    coordinates: {
      lat: 40.7128,
      lng: -74.006,
    },
  },
  {
    id: 'lax',
    city: 'Los Angeles',
    code: 'LAX',
    address: {
      street: '456 Harbor Boulevard',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90731',
    },
    contact: {
      phone: '+1 (310) 555-0200',
      fax: '+1 (310) 555-0201',
      email: 'lax@seashipping.com',
    },
    coordinates: {
      lat: 33.7405,
      lng: -118.2681,
    },
  },
  {
    id: 'sea',
    city: 'Seattle',
    code: 'SEA',
    address: {
      street: '789 Waterfront Way',
      city: 'Seattle',
      state: 'WA',
      zip: '98101',
    },
    contact: {
      phone: '+1 (206) 555-0300',
      fax: '+1 (206) 555-0301',
      email: 'sea@seashipping.com',
    },
    coordinates: {
      lat: 47.6062,
      lng: -122.3321,
    },
  },
  {
    id: 'chs',
    city: 'Charleston',
    code: 'CHS',
    address: {
      street: '321 Shipping Lane',
      city: 'Charleston',
      state: 'SC',
      zip: '29401',
    },
    contact: {
      phone: '+1 (843) 555-0400',
      fax: '+1 (843) 555-0401',
      email: 'chs@seashipping.com',
    },
    coordinates: {
      lat: 32.7765,
      lng: -79.9311,
    },
  },
  {
    id: 'orf',
    city: 'Norfolk',
    code: 'ORF',
    address: {
      street: '654 Terminal Avenue',
      city: 'Norfolk',
      state: 'VA',
      zip: '23510',
    },
    contact: {
      phone: '+1 (757) 555-0500',
      fax: '+1 (757) 555-0501',
      email: 'orf@seashipping.com',
    },
    coordinates: {
      lat: 36.8508,
      lng: -76.2859,
    },
  },
  {
    id: 'sav',
    city: 'Savannah',
    code: 'SAV',
    address: {
      street: '987 River Street',
      city: 'Savannah',
      state: 'GA',
      zip: '31401',
    },
    contact: {
      phone: '+1 (912) 555-0600',
      fax: '+1 (912) 555-0601',
      email: 'sav@seashipping.com',
    },
    coordinates: {
      lat: 32.0809,
      lng: -81.0912,
    },
  },
  {
    id: 'hou',
    city: 'Houston',
    code: 'HOU',
    address: {
      street: '147 Port Road',
      city: 'Houston',
      state: 'TX',
      zip: '77002',
    },
    contact: {
      phone: '+1 (713) 555-0700',
      fax: '+1 (713) 555-0701',
      email: 'hou@seashipping.com',
    },
    coordinates: {
      lat: 29.7604,
      lng: -95.3698,
    },
  },
  {
    id: 'mia',
    city: 'Miami',
    code: 'MIA',
    address: {
      street: '258 Ocean Drive',
      city: 'Miami',
      state: 'FL',
      zip: '33132',
    },
    contact: {
      phone: '+1 (305) 555-0800',
      fax: '+1 (305) 555-0801',
      email: 'mia@seashipping.com',
    },
    coordinates: {
      lat: 25.7617,
      lng: -80.1918,
    },
  },
];

/**
 * Get office by code (e.g., 'NYC', 'LAX')
 */
export function getOfficeByCode(code: string): Office | undefined {
  return offices.find((office) => office.code === code);
}

/**
 * Get office by ID (e.g., 'nyc', 'lax')
 */
export function getOfficeById(id: string): Office | undefined {
  return offices.find((office) => office.id === id);
}

/**
 * Get all office codes
 */
export function getOfficeCodes(): string[] {
  return offices.map((office) => office.code);
}

/**
 * Get all office cities
 */
export function getOfficeCities(): string[] {
  return offices.map((office) => office.city);
}
