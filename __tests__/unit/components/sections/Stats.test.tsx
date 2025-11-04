import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Stats } from '@/components/sections/Stats';

describe('Stats Component', () => {
  const mockStats = [
    { label: 'Worldwide Network', value: 'Global Coverage' },
    { label: 'U.S. Domestic Offices', value: '8' },
    { label: 'Major Carrier Contracts', value: 'All' },
  ];

  describe('Content Rendering', () => {
    it('renders all stats labels', () => {
      render(<Stats stats={mockStats} />);
      mockStats.forEach(stat => {
        expect(screen.getByText(stat.label)).toBeInTheDocument();
      });
    });

    it('renders all stats values', () => {
      render(<Stats stats={mockStats} />);
      mockStats.forEach(stat => {
        expect(screen.getByText(stat.value)).toBeInTheDocument();
      });
    });

    it('uses default stats when no props provided', () => {
      render(<Stats />);
      expect(screen.getByText('8')).toBeInTheDocument();
      expect(screen.getByText('U.S. Domestic Offices')).toBeInTheDocument();
      expect(screen.getByText('Worldwide Network')).toBeInTheDocument();
    });

    it('renders correct number of stat cards', () => {
      const { container } = render(<Stats stats={mockStats} />);
      const statCards = container.querySelectorAll('[class*="text-center"]');
      expect(statCards.length).toBe(mockStats.length);
    });
  });

  describe('Visual Hierarchy', () => {
    it('stat values are larger than labels', () => {
      render(<Stats stats={mockStats} />);
      const value = screen.getByText('8');
      expect(value).toHaveClass(/text-4xl/);
    });

    it('stat values have primary color', () => {
      render(<Stats stats={mockStats} />);
      const value = screen.getByText('8');
      expect(value).toHaveClass(/text-primary/);
    });

    it('stat labels have proper text color', () => {
      render(<Stats stats={mockStats} />);
      const label = screen.getByText(mockStats[0].label);
      expect(label).toHaveClass(/text-gray/);
    });
  });

  describe('Layout and Responsive Design', () => {
    it('renders as section element', () => {
      const { container } = render(<Stats />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('applies grid layout', () => {
      const { container } = render(<Stats />);
      const grid = container.querySelector('[class*="grid"]');
      expect(grid).toBeInTheDocument();
    });

    it('stacks vertically on mobile (grid-cols-1)', () => {
      const { container } = render(<Stats />);
      const grid = container.querySelector('[class*="grid-cols-1"]');
      expect(grid).toBeInTheDocument();
    });

    it('displays 3 columns on desktop (md:grid-cols-3)', () => {
      const { container } = render(<Stats />);
      const grid = container.querySelector('[class*="grid"]');
      expect(grid?.className).toMatch(/md:grid-cols-3/);
    });

    it('applies proper spacing between items', () => {
      const { container } = render(<Stats />);
      const grid = container.querySelector('[class*="gap"]');
      expect(grid).toBeInTheDocument();
    });

    it('centers text within stat cards', () => {
      const { container } = render(<Stats />);
      const statCard = container.querySelector('[class*="text-center"]');
      expect(statCard).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies background color', () => {
      const { container } = render(<Stats />);
      const section = container.querySelector('section');
      expect(section).toHaveClass(/bg-gray/);
    });

    it('applies vertical padding', () => {
      const { container } = render(<Stats />);
      const section = container.querySelector('section');
      expect(section).toHaveClass(/py-16/);
    });

    it('uses container for horizontal spacing', () => {
      const { container } = render(<Stats />);
      const containerDiv = container.querySelector('[class*="container"]');
      expect(containerDiv).toBeInTheDocument();
    });

    it('applies horizontal padding for mobile', () => {
      const { container } = render(<Stats />);
      const containerDiv = container.querySelector('[class*="px-4"]');
      expect(containerDiv).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('uses semantic section element', () => {
      const { container } = render(<Stats />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('stat values have proper text size for readability', () => {
      render(<Stats stats={mockStats} />);
      const value = screen.getByText('8');
      expect(value).toHaveClass(/text-4xl|text-5xl/);
    });

    it('has sufficient color contrast', () => {
      render(<Stats />);
      const label = screen.getByText(mockStats[0].label);
      expect(label).toHaveClass(/text-gray-600/);
    });
  });

  describe('Data Handling', () => {
    it('handles empty stats array gracefully', () => {
      const { container } = render(<Stats stats={[]} />);
      const grid = container.querySelector('[class*="grid"]');
      expect(grid?.children.length).toBe(0);
    });

    it('handles single stat', () => {
      const singleStat = [{ label: 'Test', value: '1' }];
      render(<Stats stats={singleStat} />);
      expect(screen.getByText('Test')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('handles many stats', () => {
      const manyStats = [
        { label: 'Stat 1', value: '100' },
        { label: 'Stat 2', value: '200' },
        { label: 'Stat 3', value: '300' },
        { label: 'Stat 4', value: '400' },
        { label: 'Stat 5', value: '500' },
      ];
      render(<Stats stats={manyStats} />);
      manyStats.forEach(stat => {
        expect(screen.getByText(stat.label)).toBeInTheDocument();
        expect(screen.getByText(stat.value)).toBeInTheDocument();
      });
    });
  });

  describe('Typography', () => {
    it('applies bold font weight to values', () => {
      render(<Stats stats={mockStats} />);
      const value = screen.getByText('8');
      expect(value).toHaveClass(/font-bold/);
    });

    it('applies proper text size to values on mobile', () => {
      render(<Stats stats={mockStats} />);
      const value = screen.getByText('8');
      expect(value).toHaveClass(/text-4xl/);
    });

    it('applies larger text size to values on desktop', () => {
      render(<Stats stats={mockStats} />);
      const value = screen.getByText('8');
      expect(value?.className).toMatch(/md:text-5xl/);
    });

    it('applies proper text size to labels', () => {
      render(<Stats stats={mockStats} />);
      const label = screen.getByText(mockStats[0].label);
      expect(label).toHaveClass(/text-lg/);
    });
  });
});
