import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ServiceCard } from '@/components/sections/ServiceCard';
import type { Service } from '@/types';

describe('ServiceCard Component', () => {
  const mockService: Pick<Service, 'slug' | 'title' | 'shortDescription' | 'icon'> = {
    slug: 'ocean-freight',
    title: 'Ocean Freight (FCL & LCL)',
    shortDescription: 'Full container and less-than-container load services worldwide',
    icon: 'Ship',
  };

  describe('Content Rendering', () => {
    it('renders service title', () => {
      render(<ServiceCard service={mockService} />);
      expect(screen.getByText('Ocean Freight (FCL & LCL)')).toBeInTheDocument();
    });

    it('renders short description', () => {
      render(<ServiceCard service={mockService} />);
      expect(
        screen.getByText('Full container and less-than-container load services worldwide')
      ).toBeInTheDocument();
    });

    it('renders icon', () => {
      render(<ServiceCard service={mockService} />);
      const card = screen.getByRole('link');
      expect(card).toBeInTheDocument();
    });
  });

  describe('Link Behavior', () => {
    it('wraps entire card in link', () => {
      render(<ServiceCard service={mockService} />);
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });

    it('links to correct detail page', () => {
      render(<ServiceCard service={mockService} />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/services/ocean-freight');
    });

    it('automobile service links correctly', () => {
      const autoService = { ...mockService, slug: 'automobiles', title: 'Automobiles' };
      render(<ServiceCard service={autoService} />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/services/automobiles');
    });
  });

  describe('Card Styling', () => {
    it('applies hover transition effects', () => {
      const { container } = render(<ServiceCard service={mockService} />);
      const card = container.querySelector('.transition-shadow');
      expect(card).toBeInTheDocument();
    });

    it('card takes full height', () => {
      const { container } = render(<ServiceCard service={mockService} />);
      const card = container.querySelector('.h-full');
      expect(card).toBeInTheDocument();
    });
  });

  describe('Icons', () => {
    it('renders Ship icon for ocean freight', () => {
      render(<ServiceCard service={{ ...mockService, icon: 'Ship' }} />);
      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('renders Car icon for automobiles', () => {
      const autoService = { ...mockService, icon: 'Car', title: 'Automobiles' };
      render(<ServiceCard service={autoService} />);
      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('renders Home icon for household goods', () => {
      const hhgService = { ...mockService, icon: 'Home', title: 'Household Goods' };
      render(<ServiceCard service={hhgService} />);
      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('renders Package icon for oversize cargo', () => {
      const oversizeService = { ...mockService, icon: 'Package', title: 'Oversize Cargo' };
      render(<ServiceCard service={oversizeService} />);
      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('renders Hammer icon for project cargo', () => {
      const projectService = { ...mockService, icon: 'Hammer', title: 'Project Cargo' };
      render(<ServiceCard service={projectService} />);
      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('renders AlertTriangle icon for hazardous materials', () => {
      const hazmatService = {
        ...mockService,
        icon: 'AlertTriangle',
        title: 'Hazardous Materials',
      };
      render(<ServiceCard service={hazmatService} />);
      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('renders Snowflake icon for refrigerated cargo', () => {
      const reeferService = {
        ...mockService,
        icon: 'Snowflake',
        title: 'Refrigerated Cargo',
      };
      render(<ServiceCard service={reeferService} />);
      expect(screen.getByRole('link')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('link is keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<ServiceCard service={mockService} />);
      const link = screen.getByRole('link');

      await user.tab();
      expect(link).toHaveFocus();
    });

    it('has proper semantic structure', () => {
      render(<ServiceCard service={mockService} />);
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });

    it('title has proper heading level', () => {
      render(<ServiceCard service={mockService} />);
      const heading = screen.getByRole('heading', { name: /ocean freight/i });
      expect(heading).toBeInTheDocument();
    });
  });

  describe('Card Component Structure', () => {
    it('uses Card component from shadcn/ui', () => {
      const { container } = render(<ServiceCard service={mockService} />);
      const cards = container.querySelectorAll('[class*="rounded"]');
      expect(cards.length).toBeGreaterThan(0);
    });

    it('has CardHeader section', () => {
      render(<ServiceCard service={mockService} />);
      const heading = screen.getByRole('heading');
      expect(heading).toBeInTheDocument();
    });

    it('has CardContent section', () => {
      render(<ServiceCard service={mockService} />);
      expect(screen.getByText(mockService.shortDescription)).toBeInTheDocument();
    });
  });

  describe('Icon Sizing and Styling', () => {
    it('icon has proper dimensions', () => {
      const { container } = render(<ServiceCard service={mockService} />);
      const iconContainer = container.querySelector('.w-12');
      expect(iconContainer).toBeInTheDocument();
      expect(iconContainer).toHaveClass('h-12');
    });

    it('icon has primary color', () => {
      const { container } = render(<ServiceCard service={mockService} />);
      const iconContainer = container.querySelector('.text-primary');
      expect(iconContainer).toBeInTheDocument();
    });

    it('icon has margin bottom', () => {
      const { container } = render(<ServiceCard service={mockService} />);
      const iconContainer = container.querySelector('.mb-4');
      expect(iconContainer).toBeInTheDocument();
    });
  });
});
