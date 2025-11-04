import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Services | FCL, LCL, Automobiles, Hazmat | Sea Shipping Line',
  description:
    'Comprehensive ocean freight services including Full Container Load (FCL), Less than Container Load (LCL), automobiles, household goods, oversize cargo, hazardous materials, and refrigerated cargo.',
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
