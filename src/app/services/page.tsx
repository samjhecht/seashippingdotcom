'use client';

import { services } from '@/content/services';
import { COMPANY_INFO, REGULATORY_INFO } from '@/lib/constants';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { CopyToClipboardCard } from '@/components/ui/copy-to-clipboard-card';
import { Phone, Mail } from 'lucide-react';

export default function ServicesPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = [
    '/images/services/fcl.jpg',
    '/images/services/lcl.jpg',
    '/images/services/oversize.jpg',
    '/images/services/refrigerated.jpg',
  ];

  // Rotate hero image every 5 seconds with zoom animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <main id="main" role="main">
      {/* Hero Section with Rotating/Zooming Image */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        {heroImages.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={img}
              alt="Sea Shipping Services"
              fill
              className={`object-cover transition-transform duration-5000 ${
                index === currentImageIndex ? 'scale-110' : 'scale-100'
              }`}
              priority={index === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/40 z-[5]" aria-hidden="true" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.9)' }}>
              Our Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}>
              Comprehensive ocean freight and logistics solutions for all your shipping needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Cards Grid */}
      <section className="py-16 bg-gray-50" aria-labelledby="services-heading">
        <div className="container mx-auto px-4">
          <h2 id="services-heading" className="sr-only">
            Available Shipping Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
              >
                {/* Service Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Service Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {service.fullDescription}
                  </p>

                  {/* CTA Button */}
                  <Button
                    asChild
                    className="w-full bg-ssl-red text-white hover:bg-ssl-red/90"
                  >
                    <Link href={`/request?service=${service.id}`}>
                      Request a {service.title} rate now
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why Choose Sea Shipping Line?
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            As a federally licensed and bonded Non-Vessel Operating Common
            Carrier (NVOCC) with over {COMPANY_INFO.yearsOfExperience} years of
            global shipping expertise, we move cargo between any point in the
            United States to any point worldwide.
          </p>
          <p className="text-lg md:text-xl text-gray-700">
            Our company negotiates volume contracts with multiple vessel operators globally,
            offering competitive rates and reliable service.
          </p>
        </div>
      </section>

      {/* Credentials Section */}
      <section
        className="py-16 bg-gray-50"
        aria-labelledby="credentials-heading"
      >
        <div className="container mx-auto px-4">
          <h2
            id="credentials-heading"
            className="text-3xl font-bold mb-8 text-center"
          >
            Our Credentials
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-ssl-red mb-1">
                OTI#
              </div>
              <div className="text-gray-600">{REGULATORY_INFO.oti}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-ssl-red mb-1">
                SCAC
              </div>
              <div className="text-gray-600">{REGULATORY_INFO.scac}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-ssl-red mb-1">DOT#</div>
              <div className="text-gray-600">{REGULATORY_INFO.dot}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-ssl-red mb-1">MC#</div>
              <div className="text-gray-600">{REGULATORY_INFO.mc}</div>
            </div>
            <div className="text-center col-span-2">
              <div className="text-2xl font-bold text-ssl-red mb-1">
                C-TPAT
              </div>
              <div className="text-gray-600">Certified</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-white" aria-labelledby="contact-heading">
        <div className="container mx-auto px-4">
          <h2
            id="contact-heading"
            className="text-3xl font-bold mb-8 text-center"
          >
            Contact Us
          </h2>
          <p className="text-center text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Get in touch with our team for shipping inquiries and rate quotes
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <CopyToClipboardCard
              value="+1 (800) 555-SHIP"
              label="Main Office"
              icon={<Phone className="h-5 w-5" />}
            />
            <CopyToClipboardCard
              value="info@seashipping.com"
              label="Email"
              icon={<Mail className="h-5 w-5" />}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white" aria-label="Contact">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Ship Your Cargo?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a competitive rate quote and expert shipping
            consultation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-ssl-red text-white hover:bg-ssl-red/90">
              <Link href="/request">Request a Rate</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-900">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
