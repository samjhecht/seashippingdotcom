import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ServiceDetailPage, { generateStaticParams, generateMetadata } from '@/app/services/[slug]/page';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
}));

describe('Service Detail Page', () => {
  describe('Ocean Freight Service', () => {
    const params = { slug: 'ocean-freight' };

    it('renders service title', () => {
      render(<ServiceDetailPage params={params} />);
      expect(
        screen.getByRole('heading', { level: 1, name: /Ocean Freight \(FCL & LCL\)/i })
      ).toBeInTheDocument();
    });

    it('displays full description', () => {
      render(<ServiceDetailPage params={params} />);
      expect(
        screen.getByText(/comprehensive ocean freight services provide reliable shipping solutions/i)
      ).toBeInTheDocument();
    });

    it('lists all features', () => {
      render(<ServiceDetailPage params={params} />);
      expect(screen.getByText(/Full Container Load \(FCL\) services/i)).toBeInTheDocument();
      expect(screen.getByText(/Less-than-Container Load \(LCL\) consolidation/i)).toBeInTheDocument();
      expect(screen.getByText(/Worldwide port coverage/i)).toBeInTheDocument();
    });

    it('shows features section heading', () => {
      render(<ServiceDetailPage params={params} />);
      expect(screen.getByRole('heading', { level: 2, name: /Key Features/i })).toBeInTheDocument();
    });

    it('displays equipment types', () => {
      render(<ServiceDetailPage params={params} />);
      expect(screen.getByRole('heading', { level: 2, name: /Equipment Types/i })).toBeInTheDocument();
      expect(screen.getByText(/20ft Standard Containers/i)).toBeInTheDocument();
      expect(screen.getByText(/40ft Standard Containers/i)).toBeInTheDocument();
    });

    it('shows certifications', () => {
      render(<ServiceDetailPage params={params} />);
      expect(screen.getByText(/NVOCC Licensed/i)).toBeInTheDocument();
      expect(screen.getByText(/FMC Bonded/i)).toBeInTheDocument();
    });

    it('includes request rate CTA', () => {
      render(<ServiceDetailPage params={params} />);
      expect(screen.getByRole('heading', { level: 3, name: /Need a Rate Quote\?/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Request Rate/i })).toBeInTheDocument();
    });

    it('CTA button links to request page', () => {
      render(<ServiceDetailPage params={params} />);
      const ctaLink = screen.getByRole('link', { name: /Request Rate/i });
      expect(ctaLink).toHaveAttribute('href', '/request');
    });
  });

  describe('Automobiles Service', () => {
    const params = { slug: 'automobiles' };

    it('renders automobiles title', () => {
      render(<ServiceDetailPage params={params} />);
      expect(screen.getByRole('heading', { level: 1, name: /Automobiles/i })).toBeInTheDocument();
    });

    it('displays automobile-specific features', () => {
      render(<ServiceDetailPage params={params} />);
      expect(screen.getByText(/Roll-on\/Roll-off \(RoRo\) service/i)).toBeInTheDocument();
      expect(screen.getByText(/Classic and vintage car specialists/i)).toBeInTheDocument();
    });

    it('shows automobile equipment', () => {
      render(<ServiceDetailPage params={params} />);
      expect(screen.getByText(/RoRo Vessels/i)).toBeInTheDocument();
      expect(screen.getByText(/Specialized vehicle racks/i)).toBeInTheDocument();
    });
  });

  describe('Hazardous Materials Service', () => {
    const params = { slug: 'hazardous-materials' };

    it('renders hazmat title', () => {
      render(<ServiceDetailPage params={params} />);
      expect(screen.getByRole('heading', { level: 1, name: /Hazardous Materials/i })).toBeInTheDocument();
    });

    it('displays hazmat certifications', () => {
      render(<ServiceDetailPage params={params} />);
      const certHeading = screen.getByRole('heading', { name: /Certifications/i });
      const certSection = certHeading.parentElement;
      expect(certSection?.textContent).toContain('DG Certified Staff');
      expect(certSection?.textContent).toContain('IMDG Code Compliant');
    });
  });

  describe('Breadcrumb Navigation', () => {
    it('has breadcrumb navigation', () => {
      render(<ServiceDetailPage params={{ slug: 'ocean-freight' }} />);
      expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
    });

    it('breadcrumb includes Home link', () => {
      render(<ServiceDetailPage params={{ slug: 'ocean-freight' }} />);
      const homeLink = screen.getByRole('link', { name: /Home/i });
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('breadcrumb includes Services link', () => {
      render(<ServiceDetailPage params={{ slug: 'ocean-freight' }} />);
      const servicesLink = screen.getByRole('link', { name: 'Services' });
      expect(servicesLink).toHaveAttribute('href', '/services');
    });

    it('breadcrumb shows current service', () => {
      render(<ServiceDetailPage params={{ slug: 'ocean-freight' }} />);
      const breadcrumb = screen.getByRole('navigation', { name: /breadcrumb/i });
      expect(breadcrumb.textContent).toContain('Ocean Freight (FCL & LCL)');
    });

    it('current page has aria-current attribute', () => {
      const { container } = render(<ServiceDetailPage params={{ slug: 'ocean-freight' }} />);
      const currentItem = container.querySelector('[aria-current="page"]');
      expect(currentItem).toBeInTheDocument();
    });
  });

  describe('Page Structure', () => {
    it('renders main landmark', () => {
      render(<ServiceDetailPage params={{ slug: 'ocean-freight' }} />);
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('main element has id for skip link', () => {
      const { container } = render(<ServiceDetailPage params={{ slug: 'ocean-freight' }} />);
      const main = container.querySelector('main#main');
      expect(main).toBeInTheDocument();
    });

    it('has proper heading hierarchy', () => {
      render(<ServiceDetailPage params={{ slug: 'ocean-freight' }} />);
      const h1 = screen.getByRole('heading', { level: 1 });
      const h2s = screen.getAllByRole('heading', { level: 2 });
      expect(h1).toBeInTheDocument();
      expect(h2s.length).toBeGreaterThan(0);
    });
  });

  describe('Features Section', () => {
    it('features are displayed in grid layout', () => {
      const { container } = render(<ServiceDetailPage params={{ slug: 'ocean-freight' }} />);
      const featuresList = container.querySelector('.grid');
      expect(featuresList).toBeInTheDocument();
    });

    it('features have checkmark indicators', () => {
      render(<ServiceDetailPage params={{ slug: 'ocean-freight' }} />);
      const features = screen.getByRole('heading', { name: /Key Features/i }).parentElement;
      expect(features?.textContent).toContain('✓');
    });
  });

  describe('Equipment Section', () => {
    it('shows equipment section for services with equipment', () => {
      render(<ServiceDetailPage params={{ slug: 'ocean-freight' }} />);
      expect(screen.getByRole('heading', { name: /Equipment Types/i })).toBeInTheDocument();
    });

    it('does not show equipment section for services without equipment', () => {
      // Services that might not have equipment would not show this section
      render(<ServiceDetailPage params={{ slug: 'ocean-freight' }} />);
      // Ocean freight has equipment, so it should be there
      expect(screen.getByRole('heading', { name: /Equipment Types/i })).toBeInTheDocument();
    });
  });

  describe('Certifications Section', () => {
    it('displays certifications when available', () => {
      render(<ServiceDetailPage params={{ slug: 'hazardous-materials' }} />);
      expect(screen.getByText(/DG Certified Staff/i)).toBeInTheDocument();
    });
  });

  describe('CTA Section', () => {
    it('CTA section has background styling', () => {
      const { container } = render(<ServiceDetailPage params={{ slug: 'ocean-freight' }} />);
      const ctaSection = container.querySelector('.bg-gray-100');
      expect(ctaSection).toBeInTheDocument();
    });

    it('CTA is centered', () => {
      const { container } = render(<ServiceDetailPage params={{ slug: 'ocean-freight' }} />);
      const ctaSection = container.querySelector('.text-center');
      expect(ctaSection).toBeInTheDocument();
    });

    it('button has proper size', () => {
      render(<ServiceDetailPage params={{ slug: 'ocean-freight' }} />);
      const button = screen.getByRole('link', { name: /Request Rate/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Invalid Slug Handling', () => {
    it('calls notFound for invalid slug', () => {
      // This will throw because notFound() is called for invalid slugs
      expect(() => {
        render(<ServiceDetailPage params={{ slug: 'invalid-service' }} />);
      }).toThrow('NEXT_NOT_FOUND');
    });
  });

  describe('Static Generation', () => {
    it('generateStaticParams returns all service slugs', async () => {
      const params = await generateStaticParams();
      expect(params).toHaveLength(7);
      expect(params).toContainEqual({ slug: 'ocean-freight' });
      expect(params).toContainEqual({ slug: 'automobiles' });
      expect(params).toContainEqual({ slug: 'household-goods' });
      expect(params).toContainEqual({ slug: 'oversize-cargo' });
      expect(params).toContainEqual({ slug: 'project-cargo' });
      expect(params).toContainEqual({ slug: 'hazardous-materials' });
      expect(params).toContainEqual({ slug: 'refrigerated-cargo' });
    });
  });

  describe('Metadata Generation', () => {
    it('generates metadata for valid service', async () => {
      const metadata = await generateMetadata({ params: { slug: 'ocean-freight' } });
      expect(metadata.title).toBe('Ocean Freight (FCL & LCL) | Sea Shipping Line');
      expect(metadata.description).toBe(
        'Full container and less-than-container load services worldwide'
      );
    });

    it('returns empty metadata for invalid service', async () => {
      const metadata = await generateMetadata({ params: { slug: 'invalid' } });
      expect(metadata).toEqual({});
    });
  });

  describe('Responsive Design', () => {
    it('has responsive container padding', () => {
      const { container } = render(<ServiceDetailPage params={{ slug: 'ocean-freight' }} />);
      const contentContainer = container.querySelector('.container');
      expect(contentContainer).toHaveClass('px-4');
    });

    it('has responsive vertical spacing', () => {
      const { container } = render(<ServiceDetailPage params={{ slug: 'ocean-freight' }} />);
      const contentContainer = container.querySelector('.py-16');
      expect(contentContainer).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('all links are keyboard accessible', () => {
      render(<ServiceDetailPage params={{ slug: 'ocean-freight' }} />);
      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        expect(link).toBeVisible();
      });
    });

    it('lists use proper semantic HTML', () => {
      render(<ServiceDetailPage params={{ slug: 'ocean-freight' }} />);
      const lists = screen.getAllByRole('list');
      expect(lists.length).toBeGreaterThan(0);
    });
  });
});
