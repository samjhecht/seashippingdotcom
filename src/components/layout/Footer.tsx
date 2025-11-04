"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CopyToClipboardCard } from "@/components/ui/copy-to-clipboard-card";
import { COMPANY_INFO, REGULATORY_INFO } from "@/lib/constants";
import { FileText, MapPin } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Company Overview",
    links: [
      { name: "About", href: "/about" },
      { name: "News", href: "/news" },
      { name: "Newsletters", href: "/news/newsletters" },
      { name: "Contact", href: "/request" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "Ocean Freight (FCL & LCL)", href: "/services/ocean-freight" },
      { name: "Automobiles", href: "/services/automobiles" },
      { name: "Household Goods", href: "/services/household-goods" },
      { name: "Oversize Cargo", href: "/services/oversize-cargo" },
      { name: "Project Cargo", href: "/services/project-cargo" },
      { name: "Hazardous Materials", href: "/services/hazardous-materials" },
      { name: "Refrigerated Cargo", href: "/services/refrigerated-cargo" },
    ],
  },
  {
    title: "Useful Tools",
    links: [
      { name: "Forms", href: "/resources#forms" },
      { name: "Trade Tools", href: "/resources#tools" },
      { name: "ExportFile", href: "https://exportfile.com", external: true },
    ],
  },
  {
    title: "Help",
    links: [
      { name: "Track & Trace", href: "/help/tracking" },
      { name: "Carrier Scheduling", href: "/help/scheduling" },
      { name: "Carriers Serving USA", href: "/help/carriers" },
    ],
  },
];

const credentials = [
  { label: 'OTI#', value: REGULATORY_INFO.oti },
  { label: 'SCAC Code', value: REGULATORY_INFO.scac },
  { label: 'SVI#', value: REGULATORY_INFO.svi },
  { label: 'DOT#', value: REGULATORY_INFO.dot },
  { label: 'MC#', value: REGULATORY_INFO.mc },
  { label: 'CUSTOMS FILER CODE', value: REGULATORY_INFO.customsFillerCode },
];

const ctpatLinks = [
  {
    label: 'C-TPAT Certificate',
    href: '/documents/ctpat-certificate.pdf',
  },
  {
    label: 'CTPAT Statement of Support',
    href: '/documents/ctpat-statement.pdf',
  },
  {
    label: 'Official CTPAT Website',
    href: 'https://www.cbp.gov/border-security/ports-entry/cargo-security/ctpat',
    external: true,
  },
];

const officeLocations = [
  'New York (NYC)',
  'San Francisco/Oakland (SFO/OAK)',
  'Miami (MIA)',
  'Chicago (CHI)',
  'Los Angeles (LAX)',
  'Houston (HOU)',
  'Atlanta (ATL)',
  'Seattle (SEA)',
];

function FooterLinkComponent({ link }: { link: FooterLink }) {
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white transition-colors"
      >
        {link.name}
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      className="text-gray-300 hover:text-white transition-colors"
    >
      {link.name}
    </Link>
  );
}

function FooterSection({ section }: { section: FooterSection }) {
  return (
    <div>
      <h3 className="font-semibold text-white mb-4">{section.title}</h3>
      <ul className="space-y-2">
        {section.links.map((link) => (
          <li key={link.name}>
            <FooterLinkComponent link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <footer role="contentinfo" className="bg-black text-white">
      <div className="container mx-auto px-4">
        {/* Regulatory Credentials & C-TPAT Section */}
        <div className="py-8 border-b border-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Regulatory Credentials */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-center lg:text-left">
                Regulatory Credentials
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {credentials.map((credential, index) => (
                  <CopyToClipboardCard
                    key={index}
                    label={credential.label}
                    value={credential.value}
                    icon={<FileText className="h-4 w-4" />}
                    className="bg-gray-800 border-gray-700"
                  />
                ))}
              </div>
            </div>

            {/* C-TPAT Links */}
            <div className="flex flex-col justify-center">
              <h4 className="font-semibold mb-4 text-center lg:text-left">C-TPAT Certified</h4>
              <div className="flex flex-col gap-3">
                {ctpatLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-sm text-gray-300 hover:text-white underline transition-colors text-center lg:text-left"
                  >
                    {link.label}
                    {link.external && ' ↗'}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Office Locations Section */}
        <div className="py-8 border-b border-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 flex-shrink-0 mt-1" style={{ color: '#ee1c23' }} />
              <div className="flex-1">
                <h4 className="font-semibold mb-3">{COMPANY_INFO.name} - Office Locations</h4>
                <div className="text-sm text-gray-300 leading-relaxed">
                  {officeLocations.join(' | ')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links Section */}
        <div className="py-12 border-b border-white">
          {/* Mobile: Accordion */}
          <div className="block md:hidden">
            {isMounted ? (
              <Accordion type="multiple" className="space-y-4">
                {footerSections.map((section) => (
                  <AccordionItem key={section.title} value={section.title}>
                    <AccordionTrigger className="text-white hover:text-gray-300">
                      {section.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 pl-4">
                        {section.links.map((link) => (
                          <li key={link.name}>
                            <FooterLinkComponent link={link} />
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              // Fallback for SSR/initial render - show sections expanded
              <div className="space-y-6">
                {footerSections.map((section) => (
                  <div key={section.title}>
                    <h3 className="font-semibold text-white mb-4">
                      {section.title}
                    </h3>
                    <ul className="space-y-2 pl-4">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <FooterLinkComponent link={link} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:block">
            <div className="md:grid md:grid-cols-4 gap-8">
              {footerSections.map((section) => (
                <FooterSection key={section.title} section={section} />
              ))}
            </div>
          </div>
        </div>

        {/* Legal & Copyright Section */}
        <div className="py-8">
          <div className="text-center text-sm">
            <div className="space-x-4 text-gray-400 mb-4">
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
            <p className="text-gray-400 mb-2">
              © {currentYear} {COMPANY_INFO.name}. All rights reserved.
            </p>
            <p className="text-gray-400">
              Website by{" "}
              <a
                href="https://cretivdzine.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white underline transition-colors"
              >
                Cretiv D/zine
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
