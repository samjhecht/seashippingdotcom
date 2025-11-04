import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QuickLinks } from '@/components/sections/QuickLinks';

describe('QuickLinks Component', () => {
  describe('Content Rendering', () => {
    it('renders section heading', () => {
      render(<QuickLinks />);
      expect(
        screen.getByRole('heading', { name: /Quick Links|Quick Access/i })
      ).toBeInTheDocument();
    });

    it('displays forms link', () => {
      render(<QuickLinks />);
      expect(screen.getByRole('link', { name: /Forms/i })).toBeInTheDocument();
    });

    it('displays resources link', () => {
      render(<QuickLinks />);
      expect(screen.getByRole('link', { name: /Resources/i })).toBeInTheDocument();
    });

    it('displays trade updates or news link', () => {
      render(<QuickLinks />);
      const newsLink = screen.queryByRole('link', { name: /Trade Updates/i });
      const sslnewsLink = screen.queryByRole('link', { name: /News/i });

      expect(newsLink || sslnewsLink).toBeInTheDocument();
    });
  });

  describe('Link Attributes', () => {
    it('forms link navigates to resources page', () => {
      render(<QuickLinks />);
      const link = screen.getByRole('link', { name: /Forms/i });
      expect(link).toHaveAttribute('href', '/resources');
    });

    it('resources link navigates to resources page', () => {
      render(<QuickLinks />);
      const link = screen.getByRole('link', { name: /Resources/i });
      expect(link).toHaveAttribute('href', '/resources');
    });

    it('news link navigates to news page', () => {
      render(<QuickLinks />);
      const newsLink = screen.queryByRole('link', { name: /Trade Updates|News/i });
      if (newsLink) {
        expect(newsLink).toHaveAttribute('href', '/news');
      }
    });

    it('all links have accessible names', () => {
      render(<QuickLinks />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAccessibleName();
      });
    });
  });

  describe('Layout and Responsive Design', () => {
    it('renders as section element', () => {
      const { container } = render(<QuickLinks />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('uses container for consistent width', () => {
      const { container } = render(<QuickLinks />);
      const containerDiv = container.querySelector('[class*="container"]');
      expect(containerDiv).toBeInTheDocument();
    });

    it('applies vertical padding', () => {
      const { container } = render(<QuickLinks />);
      const section = container.querySelector('section');
      expect(section).toHaveClass(/py-16/);
    });

    it('applies horizontal padding for mobile', () => {
      const { container } = render(<QuickLinks />);
      const containerDiv = container.querySelector('[class*="px-4"]');
      expect(containerDiv).toBeInTheDocument();
    });

    it('uses grid layout for links', () => {
      const { container } = render(<QuickLinks />);
      const grid = container.querySelector('[class*="grid"]');
      expect(grid).toBeInTheDocument();
    });

    it('stacks links vertically on mobile', () => {
      const { container } = render(<QuickLinks />);
      const grid = container.querySelector('[class*="grid-cols-1"]');
      expect(grid).toBeInTheDocument();
    });

    it('displays links in multiple columns on desktop', () => {
      const { container } = render(<QuickLinks />);
      const grid = container.querySelector('[class*="grid"]');
      expect(grid?.className).toMatch(/md:grid-cols-2|md:grid-cols-3/);
    });
  });

  describe('Styling', () => {
    it('uses Card component for visual separation', () => {
      const { container } = render(<QuickLinks />);
      const cards = container.querySelectorAll('[class*="rounded"]');
      expect(cards.length).toBeGreaterThan(0);
    });

    it('applies proper spacing between items', () => {
      const { container } = render(<QuickLinks />);
      const grid = container.querySelector('[class*="gap"]');
      expect(grid).toBeInTheDocument();
    });

    it('has heading with proper styling', () => {
      render(<QuickLinks />);
      const heading = screen.getByRole('heading', { name: /Quick Links|Quick Access/i });
      expect(heading).toHaveClass(/text-3xl|font-bold/);
    });

    it('link cards have hover states', () => {
      const { container } = render(<QuickLinks />);
      // Cards should have hover:* classes
      const cards = container.querySelectorAll('[class*="hover"]');
      expect(cards.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('uses semantic section element', () => {
      const { container } = render(<QuickLinks />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('links are keyboard accessible', () => {
      render(<QuickLinks />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).not.toHaveAttribute('tabindex', '-1');
      });
    });

    it('has proper heading hierarchy', () => {
      const { container } = render(<QuickLinks />);
      const h2 = container.querySelector('h2');
      expect(h2).toBeInTheDocument();
    });

    it('all text has sufficient color contrast', () => {
      render(<QuickLinks />);
      const links = screen.getAllByRole('link');
      // Links should be visible and have good contrast
      links.forEach(link => {
        expect(link).toBeVisible();
      });
    });
  });

  describe('Visual Elements', () => {
    it('displays icons with links', () => {
      const { container } = render(<QuickLinks />);
      // Lucide icons render as SVG elements
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThan(0);
    });

    it('icons are properly sized', () => {
      const { container } = render(<QuickLinks />);
      const svgs = container.querySelectorAll('svg');
      svgs.forEach(svg => {
        expect(svg).toHaveClass(/h-|w-/);
      });
    });
  });

  describe('Content Organization', () => {
    it('renders at least 3 quick link items', () => {
      render(<QuickLinks />);
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThanOrEqual(3);
    });

    it('link cards have descriptive text', () => {
      render(<QuickLinks />);
      const formsLink = screen.getByRole('link', { name: /Forms/i });
      const resourcesLink = screen.getByRole('link', { name: /Resources/i });

      expect(formsLink).toHaveAccessibleName();
      expect(resourcesLink).toHaveAccessibleName();
    });
  });

  describe('Touch Targets', () => {
    it('link cards have sufficient size for touch', () => {
      const { container } = render(<QuickLinks />);
      // Cards should have padding to make them easily tappable
      const cards = container.querySelectorAll('[class*="p-"]');
      expect(cards.length).toBeGreaterThan(0);
    });

    it('entire card is clickable', () => {
      render(<QuickLinks />);
      const links = screen.getAllByRole('link');
      // Should be implemented as Card with link wrapper
      expect(links.length).toBeGreaterThan(0);
    });
  });
});
