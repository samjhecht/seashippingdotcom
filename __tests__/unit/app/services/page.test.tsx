import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ServicesPage from '@/app/services/page';

describe('Services Listing Page', () => {
  describe('Page Structure', () => {
    it('renders page title', () => {
      render(<ServicesPage />);
      expect(screen.getByRole('heading', { level: 1, name: /our services/i })).toBeInTheDocument();
    });

    it('renders page description', () => {
      render(<ServicesPage />);
      expect(
        screen.getByText(/comprehensive shipping solutions for all your logistics needs/i)
      ).toBeInTheDocument();
    });

    it('renders main landmark for accessibility', () => {
      render(<ServicesPage />);
      expect(screen.getByRole('main')).toBeInTheDocument();
    });
  });

  describe('Service Cards Display', () => {
    it('displays all 7 service cards', () => {
      render(<ServicesPage />);
      const services = [
        'Ocean Freight (FCL & LCL)',
        'Automobiles',
        'Household Goods',
        'Oversize Cargo',
        'Project Cargo',
        'Hazardous Materials',
        'Refrigerated Cargo',
      ];
      services.forEach((service) => {
        expect(screen.getByText(service)).toBeInTheDocument();
      });
    });

    it('each service card shows short description', () => {
      render(<ServicesPage />);
      expect(
        screen.getByText(/Full container and less-than-container load services worldwide/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Specialized vehicle shipping services for cars, trucks, and motorcycles/i)
      ).toBeInTheDocument();
    });

    it('service cards are wrapped in links', () => {
      render(<ServicesPage />);
      const links = screen.getAllByRole('link');
      expect(links.length).toBe(7);
    });

    it('each service card links to correct detail page', () => {
      render(<ServicesPage />);
      const links = screen.getAllByRole('link');

      expect(links[0]).toHaveAttribute('href', '/services/ocean-freight');
      expect(links[1]).toHaveAttribute('href', '/services/automobiles');
      expect(links[2]).toHaveAttribute('href', '/services/household-goods');
      expect(links[3]).toHaveAttribute('href', '/services/oversize-cargo');
      expect(links[4]).toHaveAttribute('href', '/services/project-cargo');
      expect(links[5]).toHaveAttribute('href', '/services/hazardous-materials');
      expect(links[6]).toHaveAttribute('href', '/services/refrigerated-cargo');
    });
  });

  describe('Responsive Layout', () => {
    it('has responsive grid container', () => {
      const { container } = render(<ServicesPage />);
      const grid = container.querySelector('.grid');
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass('grid-cols-1');
      expect(grid).toHaveClass('md:grid-cols-2');
      expect(grid).toHaveClass('lg:grid-cols-3');
    });

    it('has proper spacing between cards', () => {
      const { container } = render(<ServicesPage />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('gap-8');
    });
  });

  describe('Container and Padding', () => {
    it('uses container max-width', () => {
      const { container } = render(<ServicesPage />);
      const containerDiv = container.querySelector('.container');
      expect(containerDiv).toBeInTheDocument();
    });

    it('has proper padding', () => {
      const { container } = render(<ServicesPage />);
      const mainElement = container.querySelector('main');
      expect(mainElement).toHaveClass('py-16');
    });
  });

  describe('Accessibility', () => {
    it('page has proper heading hierarchy', () => {
      render(<ServicesPage />);
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
    });

    it('all links are keyboard accessible', () => {
      render(<ServicesPage />);
      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        expect(link).toBeVisible();
      });
    });

    it('main element has id for skip link', () => {
      const { container } = render(<ServicesPage />);
      const main = container.querySelector('main');
      expect(main).toHaveAttribute('id', 'main');
    });
  });
});
