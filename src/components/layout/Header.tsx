"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Facebook, Linkedin, Menu, Twitter, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavItem {
  name: string;
  href: string;
}

interface SocialLink {
  name: string;
  href: string;
  icon: typeof Facebook;
  label: string;
}

const navItems: NavItem[] = [
  { name: "HOME", href: "/" },
  { name: "SERVICES", href: "/services" },
  { name: "RESOURCES", href: "/resources" },
  { name: "NETWORK", href: "/network" },
  { name: "REQUEST", href: "/request" },
  { name: "SSLNEWS", href: "/news" },
];

const socialLinks: SocialLink[] = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/Sea-Shipping-Line-161620453885407/",
    icon: Facebook,
    label: "Visit Sea Shipping Line on Facebook",
  },
  {
    name: "X",
    href: "https://x.com/SeaShipping",
    icon: Twitter,
    label: "Visit Sea Shipping Line on X (Twitter)",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/sea-shipping-line/",
    icon: Linkedin,
    label: "Visit Sea Shipping Line on LinkedIn",
  },
];

const STICKY_SCROLL_THRESHOLD = 100;

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > STICKY_SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      role="banner"
      className={cn(
        "w-full transition-all duration-300 bg-white border-b border-gray-200",
        isSticky && "header-sticky fixed top-0 left-0 right-0 z-50 shadow-md"
      )}
    >
      {/* Skip to main content link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        Skip to main content
      </a>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
          >
            <Image
              src="/images/logo/ssl-logo.png"
              alt="Sea Shipping Line - Locally Grown & Globally Situated"
              width={240}
              height={60}
              priority
              className="h-12 md:h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Primary navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  pathname === item.href
                    ? "text-primary bg-accent"
                    : "text-foreground"
                )}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Social Links & CTA */}
          <div className="hidden md:flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
            <Button asChild className="ml-2">
              <Link href="/request">Contact Us</Link>
            </Button>
          </div>

          {/* Mobile Hamburger Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild suppressHydrationWarning>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-11 w-11"
                aria-label="Open menu"
                aria-expanded={isOpen}
                suppressHydrationWarning
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px]"
              aria-label="Mobile navigation"
              onOpenAutoFocus={(e) => {
                // Prevent auto-focus to maintain better keyboard navigation
                e.preventDefault();
              }}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <SheetTitle>Menu</SheetTitle>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-11 w-11"
                      aria-label="Close menu"
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </SheetClose>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-2 mb-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleNavClick}
                      className={cn(
                        "px-4 py-3 text-base font-medium rounded-md transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        "min-h-[44px] flex items-center",
                        pathname === item.href
                          ? "text-primary bg-accent"
                          : "text-foreground"
                      )}
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Contact CTA */}
                <Button asChild className="w-full mb-6 h-11">
                  <Link href="/request" onClick={handleNavClick}>
                    Contact Us
                  </Link>
                </Button>

                {/* Social Links */}
                <div className="mt-auto pt-6 border-t">
                  <p className="text-sm font-medium mb-4 text-muted-foreground">
                    Follow Us
                  </p>
                  <div className="flex gap-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[44px] min-w-[44px] flex items-center justify-center"
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
