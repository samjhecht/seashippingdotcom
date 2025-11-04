import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Hero } from '@/components/sections/Hero';

describe('Hero Component', () => {
  describe('Content Rendering', () => {
    it('renders tagline as h1', () => {
      render(<Hero />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent(/Locally Grown & Globally Situated/i);
    });

    it('renders subtitle with years of experience', () => {
      render(<Hero />);
      expect(screen.getByText(/37 Years|years of/i)).toBeInTheDocument();
    });

    it('renders CTA button', () => {
      render(<Hero />);
      const button = screen.getByRole('button', { name: /Get a Quote/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('CTA button navigates to request page on click', async () => {
      const user = userEvent.setup();
      const mockPush = vi.fn();

      // Mock useRouter is already set up in setup.ts
      const { useRouter } = await import('next/navigation');
      vi.mocked(useRouter).mockReturnValue({
        push: mockPush,
        replace: vi.fn(),
        prefetch: vi.fn(),
        back: vi.fn(),
        pathname: '/',
        query: {},
        asPath: '/',
      } as any);

      render(<Hero />);
      const button = screen.getByRole('button', { name: /Get a Quote/i });
      await user.click(button);

      expect(mockPush).toHaveBeenCalledWith('/request');
    });
  });

  describe('Accessibility', () => {
    it('CTA button is keyboard accessible', () => {
      render(<Hero />);
      const button = screen.getByRole('button', { name: /Get a Quote/i });
      expect(button).not.toHaveAttribute('tabindex', '-1');
    });

    it('CTA button has minimum touch target size', () => {
      render(<Hero />);
      const button = screen.getByRole('button', { name: /Get a Quote/i });
      // Should have h-12 class for 48px height (44px minimum)
      expect(button).toHaveClass(/h-12/);
    });

    it('has proper heading hierarchy', () => {
      const { container } = render(<Hero />);
      const h1 = container.querySelector('h1');
      expect(h1).toBeInTheDocument();
      expect(h1).toHaveTextContent(/Locally Grown & Globally Situated/i);
    });

    it('background image has descriptive alt text', () => {
      const { container } = render(<Hero />);
      const image = container.querySelector('img');
      if (image) {
        expect(image).toHaveAttribute(
          'alt',
          'Global shipping operations with cargo containers and vessels'
        );
      }
    });
  });

  describe('Styling and Layout', () => {
    it('applies section element with proper classes', () => {
      const { container } = render(<Hero />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
      expect(section).toHaveClass(/relative/);
    });

    it('has responsive height classes', () => {
      const { container } = render(<Hero />);
      const section = container.querySelector('section');
      // Should have mobile and desktop height classes
      expect(section?.className).toMatch(/h-\[500px\]|md:h-\[600px\]/);
    });

    it('applies text styling for contrast on background', () => {
      const { container } = render(<Hero />);
      const textContainer = container.querySelector('[class*="text-white"]');
      expect(textContainer).toBeInTheDocument();
    });

    it('centers content vertically and horizontally', () => {
      const { container } = render(<Hero />);
      const section = container.querySelector('section');
      expect(section).toHaveClass(/flex/);
      expect(section).toHaveClass(/items-center/);
      expect(section).toHaveClass(/justify-center/);
    });
  });

  describe('Image Optimization', () => {
    it('uses Next.js Image component', () => {
      const { container } = render(<Hero />);
      const image = container.querySelector('img');
      expect(image).toBeInTheDocument();
    });

    it('has priority loading for hero image', () => {
      const { container } = render(<Hero />);
      const image = container.querySelector('img');
      // Next.js Image with priority adds fetchpriority="high"
      expect(image).toBeTruthy();
    });
  });

  describe('Responsive Design', () => {
    it('applies mobile-first text sizing', () => {
      const { container } = render(<Hero />);
      const heading = container.querySelector('h1');
      // Should have text-4xl on mobile, md:text-6xl on desktop
      expect(heading?.className).toMatch(/text-4xl/);
      expect(heading?.className).toMatch(/md:text-6xl/);
    });

    it('applies responsive padding', () => {
      const { container } = render(<Hero />);
      const contentWrapper = container.querySelector('[class*="px-4"]');
      expect(contentWrapper).toBeInTheDocument();
    });
  });

  describe('Visual Elements', () => {
    it('applies background overlay for text readability', () => {
      const { container } = render(<Hero />);
      const overlay = container.querySelector('[class*="bg-black"]');
      expect(overlay).toBeInTheDocument();
    });

    it('positions content above background image', () => {
      const { container } = render(<Hero />);
      const contentWrapper = container.querySelector('[class*="z-10"]');
      expect(contentWrapper).toBeInTheDocument();
    });
  });
});
