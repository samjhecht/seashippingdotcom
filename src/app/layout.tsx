import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import { AnalyticsPageView } from '@/components/AnalyticsPageView'
import { CookieConsent } from '@/components/CookieConsent'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: "Sea Shipping Line - Global Logistics & Ocean Freight",
  description: "Federally licensed and bonded NVOCC with 37+ years of global shipping expertise. Specializing in ocean freight, FCL, LCL, and international logistics services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProduction = process.env.NODE_ENV === 'production'

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className={inter.className}>
        {isProduction && (
          <Suspense fallback={null}>
            <AnalyticsPageView />
          </Suspense>
        )}
        <Header />
        {children}
        <Footer />
        {isProduction && <CookieConsent />}
        {isProduction && <GoogleAnalytics gaId="G-V0F46NZK7J" />}
        <Analytics />
      </body>
    </html>
  );
}
