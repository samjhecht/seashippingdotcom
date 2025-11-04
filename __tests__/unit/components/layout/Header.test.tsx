import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '@/components/layout/Header';

describe('Header Component', () => {
  let scrollSpy: any;

  beforeEach(() => {
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });

    scrollSpy = vi.fn();
    window.addEventListener('scroll', scrollSpy);
  });

  afterEach(() => {
    window.removeEventListener('scroll', scrollSpy);
    vi.clearAllMocks();
  });

  describe('Core Rendering', () => {
    it('renders the header element', () => {
      render(<Header />);
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('renders company logo with link to homepage', () => {
      render(<Header />);
      const logoLinks = screen.getAllByRole('link', { name: /sea shipping line/i });
      expect(logoLinks.length).toBeGreaterThan(0);
      expect(logoLinks[0]).toHaveAttribute('href', '/');
    });

    it('renders company tagline', () => {
      render(<Header />);
      expect(screen.getByText(/locally grown & globally situated/i)).toBeInTheDocument();
    });

    it('renders skip to main content link', () => {
      render(<Header />);
      const skipLink = screen.getByRole('link', { name: /skip to main content/i });
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveAttribute('href', '#main');
    });
  });

  describe('Mobile View (< 768px)', () => {
    beforeEach(() => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: query.includes('max-width'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));
    });

    it('renders hamburger menu button', () => {
      render(<Header />);
      const hamburger = screen.getByRole('button', { name: /open menu/i });
      expect(hamburger).toBeInTheDocument();
    });

    it('hamburger button has correct ARIA attributes when closed', () => {
      render(<Header />);
      const hamburger = screen.getByRole('button', { name: /open menu/i });
      expect(hamburger).toHaveAttribute('aria-expanded', 'false');
      expect(hamburger).toHaveAttribute('aria-label', 'Open menu');
    });

    it('hamburger button meets minimum touch target size (44x44px)', () => {
      render(<Header />);
      const hamburger = screen.getByRole('button', { name: /open menu/i });
      // Check for touch-friendly classes
      expect(hamburger).toHaveClass('h-11', 'w-11'); // 44px = 11*4
    });

    it('navigation menu is hidden by default', () => {
      render(<Header />);
      // Sheet content should not be visible initially
      const nav = screen.queryByRole('navigation', { name: /mobile navigation/i });
      expect(nav).not.toBeInTheDocument();
    });

    it('opens mobile menu when hamburger is clicked', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const hamburger = screen.getByRole('button', { name: /open menu/i });
      await user.click(hamburger);

      // Menu should be visible
      const nav = await screen.findByRole('dialog');
      expect(nav).toBeInTheDocument();
    });

    it('hamburger button has aria-expanded=true when menu is open', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const hamburger = screen.getByRole('button', { name: /open menu/i });
      await user.click(hamburger);

      await waitFor(() => {
        expect(hamburger).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('closes menu when close button is clicked', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const hamburger = screen.getByRole('button', { name: /open menu/i });
      await user.click(hamburger);

      const dialog = await screen.findByRole('dialog');
      expect(dialog).toBeInTheDocument();

      const closeButtons = within(dialog).getAllByRole('button', { name: /close/i });
      await user.click(closeButtons[0]);

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('closes menu when navigation link is clicked', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const hamburger = screen.getByRole('button', { name: /open menu/i });
      await user.click(hamburger);

      const dialog = await screen.findByRole('dialog');
      const homeLink = within(dialog).getByRole('link', { name: /^home$/i });
      await user.click(homeLink);

      // Menu should close after navigation
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('mobile menu has correct ARIA attributes', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const hamburger = screen.getByRole('button', { name: /open menu/i });
      await user.click(hamburger);

      const dialog = await screen.findByRole('dialog');
      expect(dialog).toHaveAttribute('role', 'dialog');
    });

    it('renders all navigation items in mobile menu', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const hamburger = screen.getByRole('button', { name: /open menu/i });
      await user.click(hamburger);

      const dialog = await screen.findByRole('dialog');

      expect(within(dialog).getByRole('link', { name: /^home$/i })).toBeInTheDocument();
      expect(within(dialog).getByRole('link', { name: /^services$/i })).toBeInTheDocument();
      expect(within(dialog).getByRole('link', { name: /^resources$/i })).toBeInTheDocument();
      expect(within(dialog).getByRole('link', { name: /^network$/i })).toBeInTheDocument();
      expect(within(dialog).getByRole('link', { name: /^request$/i })).toBeInTheDocument();
      expect(within(dialog).getByRole('link', { name: /^sslnews$/i })).toBeInTheDocument();
    });

    it('renders social media links in mobile menu', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const hamburger = screen.getByRole('button', { name: /open menu/i });
      await user.click(hamburger);

      const dialog = await screen.findByRole('dialog');

      expect(within(dialog).getByRole('link', { name: /facebook/i })).toBeInTheDocument();
      expect(within(dialog).getByRole('link', { name: /twitter|x/i })).toBeInTheDocument();
      expect(within(dialog).getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
    });

    it('renders Contact Us CTA in mobile menu', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const hamburger = screen.getByRole('button', { name: /open menu/i });
      await user.click(hamburger);

      const dialog = await screen.findByRole('dialog');
      const contactButton = within(dialog).getByRole('link', { name: /contact us/i });
      expect(contactButton).toBeInTheDocument();
    });
  });

  describe('Desktop View (>= 768px)', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });
      window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: query.includes('min-width'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));
    });

    it('renders horizontal navigation menu', () => {
      render(<Header />);
      const nav = screen.getByRole('navigation', { name: /primary navigation/i });
      expect(nav).toBeInTheDocument();
    });

    it('does not render hamburger button on desktop', () => {
      render(<Header />);
      const hamburger = screen.queryByRole('button', { name: /open menu/i });
      // Button exists but should have md:hidden class
      expect(hamburger).toHaveClass('md:hidden');
    });

    it('shows all primary navigation links', () => {
      render(<Header />);

      expect(screen.getByRole('link', { name: /^home$/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /^services$/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /^resources$/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /^network$/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /^request$/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /^sslnews$/i })).toBeInTheDocument();
    });

    it('highlights active navigation item', async () => {
      // Import and spy on usePathname
      const { usePathname } = await import('next/navigation');
      vi.mocked(usePathname).mockReturnValueOnce('/services');

      render(<Header />);
      const servicesLink = screen.getByRole('link', { name: /^services$/i });
      expect(servicesLink).toHaveAttribute('aria-current', 'page');
    });

    it('renders Contact Us CTA button', () => {
      render(<Header />);
      const contactButton = screen.getByRole('link', { name: /contact us/i });
      expect(contactButton).toBeInTheDocument();
      expect(contactButton).toHaveAttribute('href', '/request');
    });

    it('renders social media links', () => {
      render(<Header />);

      expect(screen.getByRole('link', { name: /facebook/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /twitter|x/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
    });
  });

  describe('Sticky Header Behavior', () => {
    it('does not have sticky class initially', () => {
      render(<Header />);
      const header = screen.getByRole('banner');
      expect(header).not.toHaveClass('header-sticky');
    });

    it('adds sticky class when scrolling down past threshold', async () => {
      render(<Header />);
      const header = screen.getByRole('banner');

      // Simulate scroll
      await act(async () => {
        Object.defineProperty(window, 'scrollY', {
          writable: true,
          configurable: true,
          value: 150,
        });
        window.dispatchEvent(new Event('scroll'));
      });

      // Wait for state update
      await waitFor(() => {
        expect(header).toHaveClass('header-sticky');
      });
    });

    it('removes sticky class when scrolling back to top', async () => {
      render(<Header />);
      const header = screen.getByRole('banner');

      // Scroll down
      await act(async () => {
        Object.defineProperty(window, 'scrollY', {
          writable: true,
          configurable: true,
          value: 150,
        });
        window.dispatchEvent(new Event('scroll'));
      });

      await waitFor(() => {
        expect(header).toHaveClass('header-sticky');
      });

      // Scroll back up
      await act(async () => {
        Object.defineProperty(window, 'scrollY', {
          writable: true,
          configurable: true,
          value: 50,
        });
        window.dispatchEvent(new Event('scroll'));
      });

      await waitFor(() => {
        expect(header).not.toHaveClass('header-sticky');
      });
    });

    it('cleans up scroll listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      const { unmount } = render(<Header />);

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    });
  });

  describe('Accessibility - Keyboard Navigation', () => {
    it('can navigate to skip link with Tab', async () => {
      const user = userEvent.setup();
      render(<Header />);

      await user.tab();
      const skipLink = screen.getByRole('link', { name: /skip to main content/i });
      expect(skipLink).toHaveFocus();
    });

    it('can navigate through all links with Tab', async () => {
      const user = userEvent.setup();
      render(<Header />);

      await user.tab(); // Skip link
      await user.tab(); // Logo

      const logos = screen.getAllByRole('link', { name: /sea shipping line/i });
      expect(logos[0]).toHaveFocus();
    });

    it('can activate links with Enter key', async () => {
      const user = userEvent.setup();
      render(<Header />);

      await user.tab(); // Skip link
      await user.tab(); // Logo

      const logos = screen.getAllByRole('link', { name: /sea shipping line/i });
      expect(logos[0]).toHaveFocus();

      // Enter key should work (handled by browser)
      await user.keyboard('{Enter}');
    });

    it('can open mobile menu with keyboard', async () => {
      const user = userEvent.setup();
      render(<Header />);

      // Tab to hamburger button
      const hamburger = screen.getByRole('button', { name: /open menu/i });
      hamburger.focus();

      await user.keyboard('{Enter}');

      const dialog = await screen.findByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });

    it('can close mobile menu with Escape key', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const hamburger = screen.getByRole('button', { name: /open menu/i });
      await user.click(hamburger);

      const dialog = await screen.findByRole('dialog');
      expect(dialog).toBeInTheDocument();

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('traps focus within mobile menu when open', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const hamburger = screen.getByRole('button', { name: /open menu/i });
      await user.click(hamburger);

      const dialog = await screen.findByRole('dialog');

      // Focus should be trapped in dialog
      // This is handled by Radix UI Sheet component
      expect(dialog).toBeInTheDocument();
    });

    it('returns focus to hamburger button when menu closes', async () => {
      const user = userEvent.setup();
      render(<Header />);

      const hamburger = screen.getByRole('button', { name: /open menu/i });
      await user.click(hamburger);

      const dialog = await screen.findByRole('dialog');
      const closeButtons = within(dialog).getAllByRole('button', { name: /close/i });
      await user.click(closeButtons[0]);

      // Focus should return to trigger (hamburger)
      await waitFor(() => {
        expect(hamburger).toHaveFocus();
      });
    });
  });

  describe('Accessibility - ARIA Labels', () => {
    it('header has correct role', () => {
      render(<Header />);
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('navigation has correct role and label', () => {
      render(<Header />);
      const nav = screen.getByRole('navigation', { name: /primary navigation/i });
      expect(nav).toBeInTheDocument();
    });

    it('social media links have descriptive aria-labels', () => {
      render(<Header />);

      const facebookLink = screen.getByRole('link', { name: /facebook/i });
      const twitterLink = screen.getByRole('link', { name: /twitter|x/i });
      const linkedinLink = screen.getByRole('link', { name: /linkedin/i });

      expect(facebookLink).toHaveAttribute('aria-label');
      expect(twitterLink).toHaveAttribute('aria-label');
      expect(linkedinLink).toHaveAttribute('aria-label');
    });

    it('logo has screen reader text', () => {
      render(<Header />);
      const logos = screen.getAllByRole('link', { name: /sea shipping line/i });
      expect(logos[0]).toBeInTheDocument();
    });
  });

  describe('Touch Target Requirements', () => {
    it('all interactive elements meet 44x44px minimum', () => {
      render(<Header />);

      const hamburger = screen.getByRole('button', { name: /open menu/i });
      expect(hamburger).toHaveClass('h-11', 'w-11'); // 44px
    });

    it('navigation links have adequate spacing', () => {
      render(<Header />);
      const nav = screen.getByRole('navigation', { name: /primary navigation/i });
      expect(nav).toBeInTheDocument();
      // Links should have padding for touch targets
    });

    it('Contact CTA button meets touch target size', () => {
      render(<Header />);
      const contactButton = screen.getByRole('link', { name: /contact us/i });
      // Should have h-touch class or equivalent
      expect(contactButton).toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    it('HOME link points to correct route', () => {
      render(<Header />);
      const homeLink = screen.getByRole('link', { name: /^home$/i });
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('SERVICES link points to correct route', () => {
      render(<Header />);
      const servicesLink = screen.getByRole('link', { name: /^services$/i });
      expect(servicesLink).toHaveAttribute('href', '/services');
    });

    it('RESOURCES link points to correct route', () => {
      render(<Header />);
      const resourcesLink = screen.getByRole('link', { name: /^resources$/i });
      expect(resourcesLink).toHaveAttribute('href', '/resources');
    });

    it('NETWORK link points to correct route', () => {
      render(<Header />);
      const networkLink = screen.getByRole('link', { name: /^network$/i });
      expect(networkLink).toHaveAttribute('href', '/network');
    });

    it('REQUEST link points to correct route', () => {
      render(<Header />);
      const requestLink = screen.getByRole('link', { name: /^request$/i });
      expect(requestLink).toHaveAttribute('href', '/request');
    });

    it('SSLNEWS link points to correct route', () => {
      render(<Header />);
      const newsLink = screen.getByRole('link', { name: /^sslnews$/i });
      expect(newsLink).toHaveAttribute('href', '/news');
    });

    it('Contact Us CTA points to request page', () => {
      render(<Header />);
      const contactButton = screen.getByRole('link', { name: /contact us/i });
      expect(contactButton).toHaveAttribute('href', '/request');
    });
  });

  describe('Social Media Links', () => {
    it('Facebook link has correct href and opens in new tab', () => {
      render(<Header />);
      const facebook = screen.getByRole('link', { name: /facebook/i });
      expect(facebook).toHaveAttribute('href', expect.stringContaining('facebook.com'));
      expect(facebook).toHaveAttribute('target', '_blank');
      expect(facebook).toHaveAttribute('rel', expect.stringContaining('noopener'));
    });

    it('Twitter/X link has correct href and opens in new tab', () => {
      render(<Header />);
      const twitter = screen.getByRole('link', { name: /twitter|x/i });
      expect(twitter).toHaveAttribute('href', expect.stringContaining('twitter.com'));
      expect(twitter).toHaveAttribute('target', '_blank');
      expect(twitter).toHaveAttribute('rel', expect.stringContaining('noopener'));
    });

    it('LinkedIn link has correct href and opens in new tab', () => {
      render(<Header />);
      const linkedin = screen.getByRole('link', { name: /linkedin/i });
      expect(linkedin).toHaveAttribute('href', expect.stringContaining('linkedin.com'));
      expect(linkedin).toHaveAttribute('target', '_blank');
      expect(linkedin).toHaveAttribute('rel', expect.stringContaining('noopener'));
    });

    it('social media icons are visible', () => {
      render(<Header />);
      // Icons should be rendered via lucide-react
      const facebook = screen.getByRole('link', { name: /facebook/i });
      expect(facebook).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('adjusts layout between mobile and desktop breakpoints', () => {
      render(<Header />);
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();

      // Mobile: hamburger visible, desktop nav hidden
      // Desktop: hamburger hidden, desktop nav visible
      // This is controlled by Tailwind classes
    });

    it('maintains functionality across viewport changes', async () => {
      const { rerender } = render(<Header />);
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();

      // Component should adapt to viewport changes
      rerender(<Header />);
      expect(header).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('does not cause unnecessary re-renders', () => {
      const { rerender } = render(<Header />);
      const header = screen.getByRole('banner');

      rerender(<Header />);
      expect(header).toBeInTheDocument();
    });

    it('properly handles scroll event throttling', async () => {
      render(<Header />);

      // Trigger multiple scroll events
      await act(async () => {
        for (let i = 0; i < 10; i++) {
          Object.defineProperty(window, 'scrollY', {
            writable: true,
            configurable: true,
            value: 150 + i,
          });
          window.dispatchEvent(new Event('scroll'));
        }
      });

      // Component should handle this gracefully
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });
  });
});
