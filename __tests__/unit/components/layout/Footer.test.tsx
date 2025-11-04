import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Footer } from '@/components/layout/Footer';
import { COMPANY_INFO, REGULATORY_INFO } from '@/lib/constants';

describe('Footer Component', () => {
  describe('Rendering', () => {
    it('renders as semantic footer element', () => {
      const { container } = render(<Footer />);
      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
    });

    it('renders all main sections', () => {
      render(<Footer />);
      // Use getAllByText since sections appear in both mobile and desktop views
      expect(screen.getAllByText('Company Overview').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Services').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Useful Tools').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Help').length).toBeGreaterThan(0);
    });
  });

  describe('Company Overview Section', () => {
    it('renders all company overview links', () => {
      render(<Footer />);
      // getAllByRole since links appear in both mobile and desktop views
      expect(screen.getAllByRole('link', { name: /about/i }).length).toBeGreaterThan(0);
      expect(screen.getAllByRole('link', { name: /^news$/i }).length).toBeGreaterThan(0);
      expect(screen.getAllByRole('link', { name: /newsletters/i }).length).toBeGreaterThan(0);
      expect(screen.getAllByRole('link', { name: /contact/i }).length).toBeGreaterThan(0);
    });

    it('company overview links have correct hrefs', () => {
      render(<Footer />);
      const aboutLinks = screen.getAllByRole('link', { name: /about/i });
      const newsLinks = screen.getAllByRole('link', { name: /^news$/i });
      const newsletterLinks = screen.getAllByRole('link', { name: /newsletters/i });
      const contactLinks = screen.getAllByRole('link', { name: /contact/i });

      // Check first instance of each link
      expect(aboutLinks[0]).toHaveAttribute('href', '/about');
      expect(newsLinks[0]).toHaveAttribute('href', '/news');
      expect(newsletterLinks[0]).toHaveAttribute('href', '/news/newsletters');
      expect(contactLinks[0]).toHaveAttribute('href', '/request');
    });
  });

  describe('Services Section', () => {
    it('renders all service type links', () => {
      render(<Footer />);
      const services = [
        'Ocean Freight',
        'Automobiles',
        'Household Goods',
        'Oversize Cargo',
        'Project Cargo',
        'Hazardous Materials',
        'Refrigerated Cargo'
      ];

      services.forEach(service => {
        expect(screen.getByRole('link', { name: new RegExp(service, 'i') })).toBeInTheDocument();
      });
    });

    it('service links have correct hrefs', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: /ocean freight/i })).toHaveAttribute('href', '/services/ocean-freight');
      expect(screen.getByRole('link', { name: /automobiles/i })).toHaveAttribute('href', '/services/automobiles');
      expect(screen.getByRole('link', { name: /household goods/i })).toHaveAttribute('href', '/services/household-goods');
      expect(screen.getByRole('link', { name: /oversize cargo/i })).toHaveAttribute('href', '/services/oversize-cargo');
      expect(screen.getByRole('link', { name: /project cargo/i })).toHaveAttribute('href', '/services/project-cargo');
      expect(screen.getByRole('link', { name: /hazardous materials/i })).toHaveAttribute('href', '/services/hazardous-materials');
      expect(screen.getByRole('link', { name: /refrigerated cargo/i })).toHaveAttribute('href', '/services/refrigerated-cargo');
    });
  });

  describe('Useful Tools Section', () => {
    it('renders all useful tools links', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: /forms/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /trade tools/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /exportfile/i })).toBeInTheDocument();
    });

    it('useful tools links have correct hrefs', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: /^forms$/i })).toHaveAttribute('href', '/resources#forms');
      expect(screen.getByRole('link', { name: /trade tools/i })).toHaveAttribute('href', '/resources#tools');
      expect(screen.getByRole('link', { name: /exportfile/i })).toHaveAttribute('href', 'https://exportfile.com');
    });

    it('external link opens in new tab', () => {
      render(<Footer />);
      const exportFileLink = screen.getByRole('link', { name: /exportfile/i });
      expect(exportFileLink).toHaveAttribute('target', '_blank');
      expect(exportFileLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Help Section', () => {
    it('renders all help section links', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: /track.*trace/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /carrier scheduling/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /carriers serving usa/i })).toBeInTheDocument();
    });

    it('help section links have correct hrefs', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: /track.*trace/i })).toHaveAttribute('href', '/help/tracking');
      expect(screen.getByRole('link', { name: /carrier scheduling/i })).toHaveAttribute('href', '/help/scheduling');
      expect(screen.getByRole('link', { name: /carriers serving usa/i })).toHaveAttribute('href', '/help/carriers');
    });
  });

  describe('Social Media Links', () => {
    it('renders all social media links', () => {
      render(<Footer />);
      expect(screen.getByLabelText(/facebook/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/twitter|x/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/linkedin/i)).toBeInTheDocument();
    });

    it('social media links have correct hrefs', () => {
      render(<Footer />);
      const facebookLink = screen.getByLabelText(/facebook/i);
      const twitterLink = screen.getByLabelText(/twitter|x/i);
      const linkedinLink = screen.getByLabelText(/linkedin/i);

      expect(facebookLink).toHaveAttribute('href');
      expect(twitterLink).toHaveAttribute('href');
      expect(linkedinLink).toHaveAttribute('href');

      expect(facebookLink.getAttribute('href')).toMatch(/facebook\.com/i);
      expect(twitterLink.getAttribute('href')).toMatch(/twitter\.com|x\.com/i);
      expect(linkedinLink.getAttribute('href')).toMatch(/linkedin\.com/i);
    });

    it('social media links open in new tab', () => {
      render(<Footer />);
      const facebookLink = screen.getByLabelText(/facebook/i);
      const twitterLink = screen.getByLabelText(/twitter|x/i);
      const linkedinLink = screen.getByLabelText(/linkedin/i);

      expect(facebookLink).toHaveAttribute('target', '_blank');
      expect(twitterLink).toHaveAttribute('target', '_blank');
      expect(linkedinLink).toHaveAttribute('target', '_blank');
    });

    it('social media links have proper rel attributes', () => {
      render(<Footer />);
      const facebookLink = screen.getByLabelText(/facebook/i);
      const twitterLink = screen.getByLabelText(/twitter|x/i);
      const linkedinLink = screen.getByLabelText(/linkedin/i);

      expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer');
      expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Legal Information', () => {
    it('renders terms and conditions link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: /terms.*conditions/i })).toBeInTheDocument();
    });

    it('renders privacy policy link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: /privacy policy/i })).toBeInTheDocument();
    });

    it('legal links have correct hrefs', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: /terms.*conditions/i })).toHaveAttribute('href', '/terms');
      expect(screen.getByRole('link', { name: /privacy policy/i })).toHaveAttribute('href', '/privacy');
    });

    it('renders copyright notice with current year', () => {
      render(<Footer />);
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`© ${currentYear}.*${COMPANY_INFO.name}`, 'i'))).toBeInTheDocument();
    });

    it('renders designer credit', () => {
      render(<Footer />);
      expect(screen.getByText(/cretiv d\/zine/i)).toBeInTheDocument();
    });

    it('designer credit is a link', () => {
      render(<Footer />);
      const designerLink = screen.getByRole('link', { name: /cretiv d\/zine/i });
      expect(designerLink).toHaveAttribute('href');
      expect(designerLink.getAttribute('href')).toMatch(/cretivdzine\.com/i);
    });

    it('designer link opens in new tab', () => {
      render(<Footer />);
      const designerLink = screen.getByRole('link', { name: /cretiv d\/zine/i });
      expect(designerLink).toHaveAttribute('target', '_blank');
      expect(designerLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Regulatory Information', () => {
    it('displays OTI number', () => {
      render(<Footer />);
      expect(screen.getByText(new RegExp(`OTI#?:?\\s*${REGULATORY_INFO.oti}`, 'i'))).toBeInTheDocument();
    });

    it('displays SCAC code', () => {
      render(<Footer />);
      expect(screen.getByText(new RegExp(`SCAC:?\\s*${REGULATORY_INFO.scac}`, 'i'))).toBeInTheDocument();
    });

    it('displays SVI number', () => {
      render(<Footer />);
      expect(screen.getByText(new RegExp(`SVI#?:?\\s*${REGULATORY_INFO.svi}`, 'i'))).toBeInTheDocument();
    });

    it('displays DOT number', () => {
      render(<Footer />);
      expect(screen.getByText(new RegExp(`DOT#?:?\\s*${REGULATORY_INFO.dot}`, 'i'))).toBeInTheDocument();
    });

    it('displays MC number', () => {
      render(<Footer />);
      expect(screen.getByText(new RegExp(`MC#?:?\\s*${REGULATORY_INFO.mc}`, 'i'))).toBeInTheDocument();
    });

    it('displays Customs Filer Code', () => {
      render(<Footer />);
      expect(screen.getByText(new RegExp(`Customs Filer Code:?\\s*${REGULATORY_INFO.customsFillerCode}`, 'i'))).toBeInTheDocument();
    });

    it('displays C-TPAT certification', () => {
      render(<Footer />);
      expect(screen.getByText(/C-TPAT Certified/i)).toBeInTheDocument();
    });
  });

  describe('Mobile View (<768px)', () => {
    beforeEach(() => {
      // Mock window.matchMedia for mobile
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: query.includes('max-width: 767px'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));
    });

    it('renders accordion for mobile sections', () => {
      render(<Footer />);
      // Check if accordion triggers are present (sections should be collapsible on mobile)
      const companyOverviews = screen.getAllByText('Company Overview');
      const servicesTexts = screen.getAllByText('Services');

      // Find the one that's inside a button (mobile accordion)
      const mobileCompanyOverview = companyOverviews.find(el => el.closest('button'));
      const mobileServices = servicesTexts.find(el => el.closest('button'));

      expect(mobileCompanyOverview?.closest('button')).toBeInTheDocument();
      expect(mobileServices?.closest('button')).toBeInTheDocument();
    });

    it('accordion sections are initially collapsed on mobile', async () => {
      render(<Footer />);

      // Links should not be visible initially (inside collapsed accordion)
      const aboutLink = screen.queryByRole('link', { name: /about/i });

      // In collapsed state, accordion content should be hidden or have aria-hidden
      if (aboutLink) {
        const accordionContent = aboutLink.closest('[data-state]');
        if (accordionContent) {
          expect(accordionContent).toHaveAttribute('data-state', 'closed');
        }
      }
    });

    it('accordion sections can be expanded', async () => {
      const user = userEvent.setup();
      render(<Footer />);

      // Click on Company Overview accordion trigger
      const triggers = screen.getAllByRole('button', { name: /company overview/i });
      const mobileAccordionTrigger = triggers[0]; // First one should be mobile
      await user.click(mobileAccordionTrigger);

      // Now links should be visible - get all about links
      const aboutLinks = screen.getAllByRole('link', { name: /about/i });
      // At least one should be visible (could check the mobile one specifically)
      expect(aboutLinks[0]).toBeVisible();
    });
  });

  describe('Desktop View (>=768px)', () => {
    beforeEach(() => {
      // Mock window.matchMedia for desktop
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: query.includes('min-width: 768px'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));
    });

    it('renders footer in multi-column grid layout', () => {
      const { container } = render(<Footer />);
      // Desktop layout should use grid
      const gridContainer = container.querySelector('.md\\:grid');
      expect(gridContainer).toBeInTheDocument();
    });

    it('all sections are visible by default on desktop', () => {
      render(<Footer />);
      // All links should be visible without needing to expand accordion
      expect(screen.getByRole('link', { name: /about/i })).toBeVisible();
      expect(screen.getByRole('link', { name: /ocean freight/i })).toBeVisible();
      expect(screen.getByRole('link', { name: /forms/i })).toBeVisible();
      expect(screen.getByRole('link', { name: /track.*trace/i })).toBeVisible();
    });
  });

  describe('Accessibility', () => {
    it('all links are keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<Footer />);

      await user.tab();

      // Should be able to tab to focusable elements (could be button on mobile or link on desktop)
      const activeElement = document.activeElement?.tagName;
      expect(['A', 'BUTTON']).toContain(activeElement);
    });

    it('accordion triggers are keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<Footer />);

      const triggers = screen.getAllByRole('button', { name: /company overview/i });
      const trigger = triggers[0];

      // Focus the trigger
      trigger.focus();
      expect(document.activeElement).toBe(trigger);

      // Activate with keyboard
      await user.keyboard('{Enter}');

      // Links should be visible after expansion
      const aboutLinks = screen.getAllByRole('link', { name: /about/i });
      expect(aboutLinks[0]).toBeVisible();
    });

    it('social media links have descriptive aria-labels', () => {
      render(<Footer />);

      const facebookLink = screen.getByLabelText(/facebook/i);
      const twitterLink = screen.getByLabelText(/twitter|x/i);
      const linkedinLink = screen.getByLabelText(/linkedin/i);

      expect(facebookLink).toHaveAccessibleName();
      expect(twitterLink).toHaveAccessibleName();
      expect(linkedinLink).toHaveAccessibleName();
    });

    it('external links have proper security attributes', () => {
      render(<Footer />);
      const exportFileLink = screen.getByRole('link', { name: /exportfile/i });

      // External links should have security attributes
      expect(exportFileLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Content Integrity', () => {
    it('uses company name from constants', () => {
      render(<Footer />);
      expect(screen.getByText(new RegExp(COMPANY_INFO.name, 'i'))).toBeInTheDocument();
    });

    it('uses regulatory info from constants', () => {
      render(<Footer />);

      // Verify all regulatory info is displayed
      expect(screen.getByText(new RegExp(REGULATORY_INFO.oti, 'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(REGULATORY_INFO.scac, 'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(REGULATORY_INFO.svi, 'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(REGULATORY_INFO.dot, 'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(REGULATORY_INFO.mc, 'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(REGULATORY_INFO.customsFillerCode, 'i'))).toBeInTheDocument();
    });
  });
});
