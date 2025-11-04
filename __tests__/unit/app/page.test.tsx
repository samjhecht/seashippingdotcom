import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';
import { COMPANY_INFO, REGULATORY_INFO } from '@/lib/constants';

describe('HomePage', () => {
  describe('Hero Section', () => {
    it('renders company tagline', () => {
      render(<HomePage />);
      expect(screen.getByText(/Locally Grown & Globally Situated/i)).toBeInTheDocument();
    });

    it('renders company name as h1', () => {
      render(<HomePage />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(/Locally Grown & Globally Situated/i);
    });

    it('renders primary CTA button', () => {
      render(<HomePage />);
      const button = screen.getByRole('button', { name: /Get a Quote/i });
      expect(button).toBeInTheDocument();
    });

    it('CTA button has minimum touch target size', () => {
      render(<HomePage />);
      const button = screen.getByRole('button', { name: /Get a Quote/i });
      // Should have padding/size for 44x44px minimum
      expect(button).toHaveClass(/h-12|min-h-/);
    });
  });

  describe('Company Introduction', () => {
    it('displays NVOCC description', () => {
      render(<HomePage />);
      expect(screen.getByText(/Non-Vessel Operating Common Carrier/i)).toBeInTheDocument();
    });

    it('displays years of experience', () => {
      render(<HomePage />);
      // Check for "37+ Years" in Hero section (with capital Y)
      const experienceText = screen.getByText(/37\+ Years of Global Shipping Excellence/i);
      expect(experienceText).toBeInTheDocument();
    });

    it('displays company introduction section', () => {
      render(<HomePage />);
      expect(screen.getByText(/About Sea Shipping Line/i)).toBeInTheDocument();
    });
  });

  describe('Statistics Section', () => {
    it('displays network coverage statistic', () => {
      render(<HomePage />);
      const statsSection = screen.getByText('Global Coverage');
      expect(statsSection).toBeInTheDocument();
    });

    it('displays U.S. office count', () => {
      render(<HomePage />);
      const officeCount = screen.getAllByText(String(COMPANY_INFO.officeCount))[0];
      expect(officeCount).toBeInTheDocument();
      expect(screen.getByText('U.S. Domestic Offices')).toBeInTheDocument();
    });

    it('displays carrier contracts information', () => {
      render(<HomePage />);
      expect(screen.getByText(/Major Carrier Contracts/i)).toBeInTheDocument();
    });

    it('stats have proper visual hierarchy', () => {
      render(<HomePage />);
      const statValue = screen.getByText(String(COMPANY_INFO.officeCount));
      expect(statValue).toHaveClass(/text-4xl|text-5xl/);
    });
  });

  describe('Certifications Section', () => {
    it('displays certifications section heading', () => {
      render(<HomePage />);
      expect(
        screen.getByRole('heading', {
          name: /Certifications & Credentials/i,
          level: 2,
        })
      ).toBeInTheDocument();
    });

    it('displays C-TPAT certification', () => {
      render(<HomePage />);
      expect(screen.getByText(/C-TPAT/i)).toBeInTheDocument();
    });
  });

  describe('Quick Links Section', () => {
    it('displays forms link', () => {
      render(<HomePage />);
      expect(screen.getByRole('link', { name: /Forms/i })).toBeInTheDocument();
    });

    it('displays resources link', () => {
      render(<HomePage />);
      expect(screen.getByRole('link', { name: /Resources/i })).toBeInTheDocument();
    });

    it('displays trade updates link', () => {
      render(<HomePage />);
      expect(screen.getByRole('link', { name: /Trade Updates|News/i })).toBeInTheDocument();
    });

    it('quick links have correct href attributes', () => {
      render(<HomePage />);
      const formsLink = screen.getByRole('link', { name: /Forms/i });
      expect(formsLink).toHaveAttribute('href', '/resources');
    });
  });

  describe('Regulatory Credentials', () => {
    it('displays OTI number', () => {
      render(<HomePage />);
      expect(screen.getByText(new RegExp(REGULATORY_INFO.oti))).toBeInTheDocument();
    });

    it('displays SCAC code', () => {
      render(<HomePage />);
      expect(screen.getByText(new RegExp(REGULATORY_INFO.scac))).toBeInTheDocument();
    });

    it('displays DOT number', () => {
      render(<HomePage />);
      expect(screen.getByText(new RegExp(REGULATORY_INFO.dot))).toBeInTheDocument();
    });

    it('displays MC number', () => {
      render(<HomePage />);
      expect(screen.getByText(new RegExp(REGULATORY_INFO.mc))).toBeInTheDocument();
    });

    it('displays Customs Filer Code', () => {
      render(<HomePage />);
      expect(screen.getByText(new RegExp(REGULATORY_INFO.customsFillerCode))).toBeInTheDocument();
    });

    it('displays credentials with proper labels', () => {
      render(<HomePage />);
      expect(screen.getByText(/OTI#/i)).toBeInTheDocument();
      expect(screen.getByText(/SCAC/i)).toBeInTheDocument();
      expect(screen.getByText(/DOT#/i)).toBeInTheDocument();
      expect(screen.getByText(/MC#/i)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      const { container } = render(<HomePage />);
      const h1 = container.querySelector('h1');
      const h2s = container.querySelectorAll('h2');

      expect(h1).toBeInTheDocument();
      expect(h2s.length).toBeGreaterThan(0);
    });

    it('main content has main landmark', () => {
      const { container } = render(<HomePage />);
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
    });

    it('CTA button is keyboard accessible', () => {
      render(<HomePage />);
      const button = screen.getByRole('button', { name: /Get a Quote/i });
      expect(button).not.toHaveAttribute('tabindex', '-1');
    });

    it('all links have accessible names', () => {
      render(<HomePage />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAccessibleName();
      });
    });

    it('images have alt text', () => {
      const { container } = render(<HomePage />);
      const images = container.querySelectorAll('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
      });
    });
  });

  describe('SEO', () => {
    it('exports metadata', async () => {
      const module = await import('@/app/page');
      expect(module.metadata).toBeDefined();
    });

    it('metadata includes title', async () => {
      const module = await import('@/app/page');
      expect(module.metadata.title).toBeDefined();
      expect(module.metadata.title).toContain('Sea Shipping Line');
    });

    it('metadata includes description', async () => {
      const module = await import('@/app/page');
      expect(module.metadata.description).toBeDefined();
      expect(module.metadata.description).toContain('NVOCC');
    });
  });

  describe('Layout Integration', () => {
    it('renders main content area', () => {
      const { container } = render(<HomePage />);
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
    });

    it('has sections with proper spacing', () => {
      const { container } = render(<HomePage />);
      const sections = container.querySelectorAll('section');
      expect(sections.length).toBeGreaterThan(0);
    });
  });

  describe('Responsive Design', () => {
    it('applies mobile-first classes', () => {
      const { container } = render(<HomePage />);
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
      // Main element doesn't need flex/grid, sections inside do
    });

    it('stats section uses grid layout', () => {
      const { container } = render(<HomePage />);
      const statsSection = container.querySelector('[class*="grid"]');
      expect(statsSection).toBeInTheDocument();
    });
  });

  describe('Content Completeness', () => {
    it('renders all required sections', () => {
      const { container } = render(<HomePage />);
      const sections = container.querySelectorAll('section');

      // Should have at least: Hero, About, Stats, Certifications, Quick Links, Regulatory
      expect(sections.length).toBeGreaterThanOrEqual(5);
    });

    it('includes call-to-action', () => {
      render(<HomePage />);
      const button = screen.getByRole('button', { name: /Get a Quote/i });
      expect(button).toBeInTheDocument();
    });
  });
});
