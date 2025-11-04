import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources | SSL Research Center | Forms, Tools & Tracking',
  description:
    'Comprehensive resources for ocean transportation professionals. Download forms, access industry tools, track cargo, and view carrier schedules.',
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
