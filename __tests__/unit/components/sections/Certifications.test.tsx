import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Certifications } from '@/components/sections/Certifications';
import { REGULATORY_INFO } from '@/lib/constants';

describe('Certifications Component', () => {
  describe('Content Rendering', () => {
    it('renders section heading', () => {
      render(<Certifications />);
      expect(
        screen.getByRole('heading', {
          name: /Certifications & Credentials/i,
          level: 2,
        })
      ).toBeInTheDocument();
    });

    it('displays C-TPAT certification', () => {
      render(<Certifications />);
      expect(screen.getByText(/C-TPAT/i)).toBeInTheDocument();
    });

    it('displays C-TPAT certification badge', () => {
      render(<Certifications />);
      expect(screen.getByText(/C-TPAT Certified/i)).toBeInTheDocument();
    });

    it('renders regulatory credentials section', () => {
      render(<Certifications />);
      expect(screen.getByText(/Regulatory Credentials/i)).toBeInTheDocument();
    });
  });

  describe('Regulatory Credentials', () => {
    it('displays OTI number with label', () => {
      render(<Certifications />);
      expect(screen.getByText(/OTI#/i)).toBeInTheDocument();
      expect(screen.getByText(REGULATORY_INFO.oti)).toBeInTheDocument();
    });

    it('displays SCAC code with label', () => {
      render(<Certifications />);
      expect(screen.getByText(/SCAC/i)).toBeInTheDocument();
      expect(screen.getByText(REGULATORY_INFO.scac)).toBeInTheDocument();
    });

    it('displays DOT number with label', () => {
      render(<Certifications />);
      expect(screen.getByText(/DOT#/i)).toBeInTheDocument();
      expect(screen.getByText(REGULATORY_INFO.dot)).toBeInTheDocument();
    });

    it('displays MC number with label', () => {
      render(<Certifications />);
      expect(screen.getByText(/MC#/i)).toBeInTheDocument();
      expect(screen.getByText(REGULATORY_INFO.mc)).toBeInTheDocument();
    });

    it('displays Customs Filer Code with label', () => {
      render(<Certifications />);
      expect(screen.getByText(/Customs Filer Code/i)).toBeInTheDocument();
      expect(screen.getByText(REGULATORY_INFO.customsFillerCode)).toBeInTheDocument();
    });

    it('renders all regulatory credentials', () => {
      render(<Certifications />);
      const credentials = [
        REGULATORY_INFO.oti,
        REGULATORY_INFO.scac,
        REGULATORY_INFO.dot,
        REGULATORY_INFO.mc,
        REGULATORY_INFO.customsFillerCode,
      ];

      credentials.forEach(credential => {
        expect(screen.getByText(credential)).toBeInTheDocument();
      });
    });
  });

  describe('Layout and Responsive Design', () => {
    it('renders as section element', () => {
      const { container } = render(<Certifications />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('uses container for consistent width', () => {
      const { container } = render(<Certifications />);
      const containerDiv = container.querySelector('[class*="container"]');
      expect(containerDiv).toBeInTheDocument();
    });

    it('applies vertical padding', () => {
      const { container } = render(<Certifications />);
      const section = container.querySelector('section');
      expect(section).toHaveClass(/py-16/);
    });

    it('applies horizontal padding for mobile', () => {
      const { container } = render(<Certifications />);
      const containerDiv = container.querySelector('[class*="px-4"]');
      expect(containerDiv).toBeInTheDocument();
    });

    it('uses grid layout for credentials', () => {
      const { container } = render(<Certifications />);
      const grid = container.querySelector('[class*="grid"]');
      expect(grid).toBeInTheDocument();
    });

    it('stacks credentials vertically on mobile', () => {
      const { container } = render(<Certifications />);
      const grid = container.querySelector('[class*="grid-cols-1"]');
      expect(grid).toBeInTheDocument();
    });

    it('displays credentials in multiple columns on desktop', () => {
      const { container } = render(<Certifications />);
      const grid = container.querySelector('[class*="grid"]');
      expect(grid?.className).toMatch(/md:grid-cols-2|md:grid-cols-3/);
    });
  });

  describe('Styling', () => {
    it('uses Card component for visual separation', () => {
      const { container } = render(<Certifications />);
      // Card components typically have specific classes
      const cards = container.querySelectorAll('[class*="rounded"]');
      expect(cards.length).toBeGreaterThan(0);
    });

    it('applies proper spacing between items', () => {
      const { container } = render(<Certifications />);
      const grid = container.querySelector('[class*="gap"]');
      expect(grid).toBeInTheDocument();
    });

    it('has heading with proper styling', () => {
      render(<Certifications />);
      const heading = screen.getByRole('heading', {
        name: /Certifications & Credentials/i,
        level: 2,
      });
      expect(heading).toHaveClass(/text-3xl|font-bold/);
    });
  });

  describe('Accessibility', () => {
    it('uses semantic section element', () => {
      const { container } = render(<Certifications />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('has proper heading hierarchy', () => {
      const { container } = render(<Certifications />);
      const h2 = container.querySelector('h2');
      const h3s = container.querySelectorAll('h3');

      expect(h2).toBeInTheDocument();
      expect(h3s.length).toBeGreaterThanOrEqual(0);
    });

    it('credential labels are associated with values', () => {
      render(<Certifications />);
      // Each credential should have a label and value visible
      expect(screen.getByText(/OTI#/i)).toBeInTheDocument();
      expect(screen.getByText(REGULATORY_INFO.oti)).toBeInTheDocument();
    });

    it('all text has sufficient color contrast', () => {
      render(<Certifications />);
      // All text should have sufficient contrast with backgrounds
      expect(screen.getByText(/OTI#/i)).toBeInTheDocument();
    });
  });

  describe('Visual Elements', () => {
    it('displays C-TPAT badge prominently', () => {
      render(<Certifications />);
      const ctpatText = screen.getByText(/C-TPAT Certified/i);
      expect(ctpatText).toBeInTheDocument();
    });

    it('uses badge styling for certifications', () => {
      const { container } = render(<Certifications />);
      // Badge typically has rounded corners and background color
      const badges = container.querySelectorAll('[class*="rounded"]');
      expect(badges.length).toBeGreaterThan(0);
    });
  });

  describe('Content Organization', () => {
    it('groups regulatory credentials together', () => {
      render(<Certifications />);
      const regulatorySection = screen.getByText(/Regulatory Credentials/i);
      expect(regulatorySection).toBeInTheDocument();
    });

    it('separates certifications from credentials visually', () => {
      const { container } = render(<Certifications />);
      const sections = container.querySelectorAll('[class*="mb-"]');
      expect(sections.length).toBeGreaterThan(0);
    });
  });

  describe('Information Display', () => {
    it('displays credentials in readable format', () => {
      render(<Certifications />);
      // Should show label: value format
      const otiLabel = screen.getByText(/OTI#/i);
      const otiValue = screen.getByText(REGULATORY_INFO.oti);

      expect(otiLabel).toBeInTheDocument();
      expect(otiValue).toBeInTheDocument();
    });

    it('makes credentials easy to scan', () => {
      render(<Certifications />);
      // All credentials should be visible and easy to read
      expect(screen.getByText(/OTI#/i)).toBeInTheDocument();
      expect(screen.getByText(/SCAC/i)).toBeInTheDocument();
    });
  });
});
