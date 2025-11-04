/**
 * Core type definitions for Sea Shipping Line website
 */

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  icon: string;
  image: string;
  equipment?: string[];
  certifications?: string[];
}

export interface Office {
  id: string;
  city: string;
  code: string;
  address: string;
  phone: string;
  email: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Certification {
  id: string;
  name: string;
  image: string;
  link?: string;
  description?: string;
}
