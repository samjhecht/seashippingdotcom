import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, BookOpen, Newspaper } from 'lucide-react';

const quickLinks = [
  {
    title: 'Forms',
    href: '/resources',
    icon: FileText,
    description: 'Access bills of lading, claims forms, and more',
  },
  {
    title: 'Why choose an FCL NVO',
    href: '/news/why-choose-fcl-nvo',
    icon: BookOpen,
    description: 'Learn about the benefits of working with an NVOCC',
  },
  {
    title: 'Trade Updates',
    href: '/news',
    icon: Newspaper,
    description: 'Latest industry news and newsletters',
  },
];

export function QuickLinks() {
  return (
    <section className="py-8 bg-gray-50" aria-label="Quick access links">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.title} href={link.href} className="block group">
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Icon className="h-8 w-8 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                          {link.title}
                        </h3>
                        <p className="text-sm text-gray-600">{link.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
