import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { Stats } from '@/components/sections/Stats';
import { Certifications } from '@/components/sections/Certifications';
import { QuickLinks } from '@/components/sections/QuickLinks';
import { COMPANY_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Sea Shipping Line - NVOCC | International Freight Forwarding',
  description: `Federally licensed NVOCC with ${COMPANY_INFO.yearsOfExperience} years of global shipping expertise. ${COMPANY_INFO.officeCount} U.S. offices, worldwide network coverage.`,
};

export default function HomePage() {
  return (
    <main id="main" role="main">
      <Hero />

      <QuickLinks />

      <section className="py-8" aria-labelledby="about-heading">
        <div className="container mx-auto px-4">
          <h2 id="about-heading" className="text-3xl font-bold mb-8 text-center">
            About Sea Shipping Line
          </h2>
          <div className="max-w-4xl mx-auto text-lg text-gray-700 space-y-4">
            <p>
              Sea Shipping Line is a federally licensed and bonded{' '}
              <strong>Non-Vessel Operating Common Carrier (NVOCC)</strong> with
              over {COMPANY_INFO.yearsOfExperience} years of global shipping
              expertise. We provide comprehensive international freight
              forwarding services to businesses worldwide.
            </p>
            <p>
              With {COMPANY_INFO.officeCount} U.S. domestic offices and a
              worldwide network of trusted partners, we deliver reliable
              shipping solutions tailored to your needs. Our service contracts
              with all major carriers ensure competitive rates and flexible
              scheduling.
            </p>
            <p>
              Whether you&apos;re shipping full container loads (FCL), less than
              container loads (LCL), oversized cargo, or specialized freight, our
              experienced team is here to help navigate the complexities of
              international logistics.
            </p>
          </div>
        </div>
      </section>

      <Stats />

      <Certifications />
    </main>
  );
}
