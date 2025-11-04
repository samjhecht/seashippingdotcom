import type { Service } from '@/types';

export const services: Service[] = [
  {
    id: 'fcl',
    slug: 'fcl',
    title: 'Full Container Load (FCL)',
    shortDescription: 'Full Container Transport is our core business',
    fullDescription:
      'Full Container Transport is our core business. FCL involves ISO standard containers that are loaded and unloaded under the single shipper and consignee control. Our company negotiates volume contracts with multiple vessel operators globally, offering competitive rates from USA to worldwide destinations plus door trucking services.',
    icon: 'Ship',
    features: [
      'ISO standard containers',
      'Single shipper and consignee control',
      'Volume contracts with multiple vessel operators globally',
      'Competitive rates from USA to worldwide destinations',
      'Door trucking services available',
      'Full container security and control',
    ],
    equipment: [
      '20ft Standard Containers',
      '40ft Standard Containers',
      '40ft High Cube Containers',
    ],
    certifications: ['NVOCC Licensed', 'FMC Bonded', 'C-TPAT Certified'],
    image: '/images/services/fcl.jpg',
  },
  {
    id: 'lcl',
    slug: 'lcl',
    title: 'Less than Container Load (LCL)',
    shortDescription: 'Cost-effective shipping for smaller cargo volumes',
    fullDescription:
      'Handles shipments too small for standard containers. We provide LCL rates from US to most global destinations, complemented by LTL (Less Than Truckload) trucking for complete door-to-door USA to overseas service.',
    icon: 'Package',
    features: [
      'Shipments too small for standard containers',
      'LCL rates US to most global destinations',
      'LTL trucking for door-to-door service',
      'Complete USA to overseas service',
      'Cost-effective for smaller shipments',
      'Consolidation services',
    ],
    equipment: [
      'Shared Container Space',
      'LTL Trucking',
      'Consolidation Facilities',
    ],
    certifications: ['NVOCC Licensed', 'FMC Bonded', 'C-TPAT Certified'],
    image: '/images/services/lcl.jpg',
  },
  {
    id: 'automobiles',
    slug: 'automobiles',
    title: 'Automobiles',
    shortDescription: 'Vehicle transportation specialty featuring ocean freight, loading, consolidation, and documentation',
    fullDescription:
      'Vehicle transportation specialty featuring ocean freight, loading, consolidation, and documentation. We utilize Roll-On Roll-Off (RORO) specialized carriers when cost-effective for your automobile shipping needs.',
    icon: 'Car',
    features: [
      'Roll-on/Roll-off (RORO) specialized carriers',
      'Ocean freight for vehicles',
      'Professional loading services',
      'Vehicle consolidation',
      'Complete documentation handling',
      'Cost-effective shipping solutions',
      'Secure vehicle transport',
    ],
    equipment: [
      'RORO Vessels',
      '20ft Containers',
      '40ft Containers',
      'Specialized vehicle securing equipment',
    ],
    certifications: ['NVOCC Licensed', 'FMC Bonded', 'C-TPAT Certified'],
    image: '/images/services/automobiles.jpg',
  },
  {
    id: 'household-goods',
    slug: 'household-goods',
    title: 'Household Goods',
    shortDescription: 'International household goods and personal effects transportation',
    fullDescription:
      'International household goods and personal effects transportation through partnerships with moving companies and freight forwarders. We provide comprehensive shipping services for individuals and families relocating internationally.',
    icon: 'Home',
    features: [
      'International household goods transport',
      'Personal effects shipping',
      'Partnerships with moving companies',
      'Freight forwarder network',
      'Door-to-door service available',
      'Customs clearance assistance',
      'Professional handling',
      'Secure packing and transport',
    ],
    equipment: [
      '20ft Containers',
      '40ft Containers',
      'Specialized packing materials',
      'Furniture pads and protection',
    ],
    certifications: ['NVOCC Licensed', 'FMC Bonded', 'C-TPAT Certified'],
    image: '/images/services/household-goods.jpg',
  },
  {
    id: 'oversize-cargo',
    slug: 'oversize-cargo',
    title: 'Oversize Cargoes',
    shortDescription: 'Out-of-gauge cargo exceeding standard container dimensions',
    fullDescription:
      'We specialize in out-of-gauge cargo exceeding container dimensions. We handle special projects, break-bulk, flat racks, and open-top containers. Examples of cargo we transport include autoclaves, aircraft, mining equipment, and yachts.',
    icon: 'Hammer',
    features: [
      'Out-of-gauge cargo handling',
      'Cargo exceeding container dimensions',
      'Special projects coordination',
      'Break-bulk shipping',
      'Flat rack containers',
      'Open-top containers',
      'Heavy equipment transport (autoclaves, aircraft, mining equipment)',
      'Yacht transportation',
    ],
    equipment: [
      'Flat Rack Containers',
      'Open Top Containers',
      'Break-bulk vessels',
      'Heavy lift gear',
      'Specialized securing equipment',
    ],
    certifications: ['NVOCC Licensed', 'FMC Bonded', 'C-TPAT Certified'],
    image: '/images/services/oversize.jpg',
  },
  {
    id: 'hazardous-materials',
    slug: 'hazardous-materials',
    title: 'Hazardous Materials',
    shortDescription: 'Hazmat-certified staff handles most standard hazardous shipments',
    fullDescription:
      'Our hazmat-certified staff handles most standard hazardous shipments. The company maintains exclusions per our Hazardous Materials Policy. We ensure proper handling, documentation, and compliance with all regulations for dangerous goods shipping.',
    icon: 'AlertTriangle',
    features: [
      'Hazmat-certified staff',
      'Standard hazardous shipment handling',
      'Proper documentation and compliance',
      'IMDG Code compliant handling',
      'DOT regulations compliance',
      'Specialized container arrangements',
      'Safety protocols and procedures',
      'Hazardous Materials Policy guidelines',
    ],
    equipment: [
      'Hazmat certified containers',
      'Specialized packaging materials',
      'Safety equipment',
      'Compliant shipping containers',
    ],
    certifications: [
      'Hazmat Certified Staff',
      'IMDG Code Compliant',
      'DOT Registered',
      'NVOCC Licensed',
      'C-TPAT Certified',
    ],
    image: '/images/services/hazmat.png',
  },
  {
    id: 'refrigerated-cargo',
    slug: 'refrigerated-cargo',
    title: 'Refrigerated Cargoes',
    shortDescription: 'Climate-controlled reefer containers for temperature-sensitive cargo',
    fullDescription:
      'We provide climate-controlled reefer containers for temperature-sensitive cargo transportation. Our refrigerated shipping solutions ensure your perishable goods and temperature-sensitive products maintain optimal conditions throughout transit.',
    icon: 'Snowflake',
    features: [
      'Climate-controlled reefer containers',
      'Temperature-sensitive cargo handling',
      'Continuous temperature monitoring',
      'Reliable cold chain logistics',
      'Perishable goods transportation',
      'Food products shipping',
      'Pharmaceutical transport',
      'Controlled atmosphere capabilities',
    ],
    equipment: [
      '20ft Refrigerated Containers',
      '40ft Refrigerated Containers',
      '40ft HC Refrigerated Containers',
      'Controlled Atmosphere containers',
      'Temperature monitoring systems',
    ],
    certifications: [
      'NVOCC Licensed',
      'FMC Bonded',
      'C-TPAT Certified',
      'Cold Chain Qualified',
    ],
    image: '/images/services/refrigerated.jpg',
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((service) => service.slug);
}
