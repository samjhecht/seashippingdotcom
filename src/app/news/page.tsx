import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { COMPANY_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Industry News & Updates | Sea Shipping Line',
  description: `Stay informed with the latest shipping industry news, trade updates, and tariff information from ${COMPANY_INFO.name}. Expert insights on global logistics and freight forwarding.`,
};

interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
}

const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'U.S. Announces Trade Deal with China',
    date: 'June 12, 2025',
    category: 'Trade Policy',
    description: 'Major developments in U.S.-China trade relations as both nations announce a comprehensive trade agreement affecting global shipping and freight forwarding operations.',
    image: '/images/news/trade-deal.jpg',
    imageAlt: 'International trade and business meeting',
  },
  {
    id: '2',
    title: 'Trade Restrictions Between India and Pakistan',
    date: 'June 6, 2025',
    category: 'Trade Policy',
    description: 'New trade restrictions have been implemented between India and Pakistan, affecting cross-border shipping routes and supply chains in South Asia.',
    image: '/images/news/container-ship.jpg',
    imageAlt: 'Container ship at sea',
  },
  {
    id: '3',
    title: 'Trump Trade War Halts Ships, Strands Empty Containers',
    date: 'April 17, 2025',
    category: 'Industry Impact',
    description: 'Supply chain disruptions continue as tariff policies impact global shipping operations. According to FreightWaves, increased trade tensions have resulted in ships being held at ports and empty containers stranded at various locations.',
    image: '/images/news/port-crane.jpg',
    imageAlt: 'Port crane operations with containers',
  },
  {
    id: '4',
    title: 'USA Tariff Update',
    date: 'April 10, 2025',
    category: 'Tariff Policy',
    description: 'Latest tariff adjustments from U.S. Customs and Border Protection affect imports from multiple countries. Importers should review their classification codes and country of origin documentation for compliance.',
    image: '/images/news/port-crane.jpg',
    imageAlt: 'Port operations and tariff compliance',
  },
  {
    id: '5',
    title: 'Navigating Tariff Changes',
    date: 'March 4, 2025',
    category: 'Regulatory Update',
    description: 'New duties now in effect for imports from China, Hong Kong, Canada, and Mexico. Trade compliance specialists are available to help understand impacts on shipments and explore duty mitigation strategies.',
    image: '/images/news/shipping-news-hero.jpg',
    imageAlt: 'International shipping and logistics',
  },
  {
    id: '6',
    title: 'ILA-USMX Contract Agreement on Automation',
    date: 'January 8, 2025',
    category: 'Port Operations',
    description: 'The International Longshoremen\'s Association (ILA) and United States Maritime Alliance (USMX) have reached a tentative agreement on a new Master Contract, avoiding port strikes. The agreement includes wage increases and addresses port automation concerns.',
    image: '/images/news/container-ship.jpg',
    imageAlt: 'Container operations at port',
  },
  {
    id: '7',
    title: 'Port Strike Ends with Wage Hike and Contract Extension',
    date: 'October 3, 2024',
    category: 'Port Operations',
    description: 'The port strike concludes as ILA and USMX reach an agreement on substantial wage increases and contract extension terms, providing operational stability for East Coast ports.',
    image: '/images/news/container-ship.jpg',
    imageAlt: 'Container shipping operations',
  },
  {
    id: '8',
    title: 'Lithium-Ion Battery Transport Safety Alert',
    date: 'September 27, 2024',
    category: 'Safety Alert',
    description: 'Semi-truck carrying lithium-ion batteries overturns in San Pedro, sparking fire incident. Heightened attention to dangerous goods classification and proper handling procedures for hazmat shipments.',
    image: '/images/news/port-crane.jpg',
    imageAlt: 'Port safety and dangerous goods handling',
  },
  {
    id: '9',
    title: 'Port Importers Pull Goods Early Ahead of Strike',
    date: 'September 18, 2024',
    category: 'Market Activity',
    description: 'U.S. importers accelerate cargo imports as potential port strike looms. Early pulldowns affect port schedules and freight forwarding capacity across East Coast operations.',
    image: '/images/news/shipping-news-hero.jpg',
    imageAlt: 'Cargo import operations',
  },
  {
    id: '10',
    title: 'Port of Houston Container Terminal Update',
    date: 'September 17, 2024',
    category: 'Operational Update',
    description: 'Port of Houston Container Terminal provides updates regarding potential work stoppage and contingency planning for vessel operations and container movements.',
    image: '/images/news/container-ship.jpg',
    imageAlt: 'Container terminal operations',
  },
  {
    id: '11',
    title: 'Canada Labor Minister Ends CN and CPKC Work Stoppage',
    date: 'August 22, 2024',
    category: 'Labor News',
    description: 'Canada\'s labor minister intervenes to end work stoppage involving CN and CPKC rail carriers, restoring rail freight capacity between U.S. and Canada.',
    image: '/images/news/port-crane.jpg',
    imageAlt: 'Rail and port operations',
  },
  {
    id: '12',
    title: 'India Ports Face Strike, Affecting U.S. East Coast',
    date: 'August 19, 2024',
    category: 'International News',
    description: 'India ports could strike, compounding capacity issues into U.S. East Coast. Shippers advised to monitor South Asian port operations and adjust routing accordingly.',
    image: '/images/news/shipping-news-hero.jpg',
    imageAlt: 'International shipping routes',
  },
  {
    id: '13',
    title: 'Teamsters Canada Rail Conference Delivers Strike Notice',
    date: 'August 19, 2024',
    category: 'Labor News',
    description: 'Teamsters Canada Rail Conference delivers strike notice to CPKC while CN delivers lockout notice. Rail freight between U.S. and Canada faces operational uncertainty.',
    image: '/images/news/port-crane.jpg',
    imageAlt: 'Rail freight operations',
  },
  {
    id: '14',
    title: 'FMC Issues New Detention and Demurrage Rule Guidance',
    date: 'June 3, 2024',
    category: 'Regulatory',
    description: 'Federal Maritime Commission breaks down questions on new detention and demurrage regulations affecting container shipping and billing procedures.',
    image: '/images/news/container-ship.jpg',
    imageAlt: 'Container detention and storage',
  },
];

export default function NewsPage() {
  return (
    <main id="main" role="main">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-700" aria-labelledby="news-heading">
        <div className="absolute inset-0">
          <Image
            src="/images/news/shipping-news-hero.jpg"
            alt="Global shipping and logistics"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 id="news-heading" className="text-4xl md:text-5xl font-bold mb-4">
            Industry News & Updates
          </h1>
          <p className="text-xl md:text-2xl">
            Stay informed with the latest developments in global shipping and trade
          </p>
        </div>
      </section>

      {/* News Articles Grid */}
      <section className="py-16 bg-gray-50" aria-label="News articles">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Filter/Category Bar */}
            <div className="mb-8">
              <p className="text-gray-600 text-center">
                Showing the latest shipping industry news, trade policy updates, and regulatory changes affecting international freight forwarding
              </p>
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsArticles.map((article) => (
                <Card
                  key={article.id}
                  className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  role="article"
                  aria-labelledby={`article-title-${article.id}`}
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle id={`article-title-${article.id}`} className="text-xl">
                      {article.title}
                    </CardTitle>
                    <CardDescription>
                      <time dateTime={new Date(article.date).toISOString()}>
                        {article.date}
                      </time>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-700 leading-relaxed">
                      {article.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section className="py-16 bg-blue-900 text-white" aria-labelledby="newsletter-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="newsletter-heading" className="text-3xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-xl mb-8">
              Subscribe to our newsletter for regular updates on shipping news, industry trends, and company announcements
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <p className="text-lg mb-6">
                For newsletter subscription and the latest updates, please contact our team.
              </p>
              <a
                href="/request"
                className="inline-block bg-white text-blue-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources Section */}
      <section className="py-16" aria-labelledby="resources-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 id="resources-heading" className="text-3xl font-bold mb-8 text-center">
              Additional Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Trade Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Stay compliant with changing international trade regulations. Our team provides guidance on customs procedures, documentation requirements, and regulatory updates.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Industry Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Access expert analysis on global shipping trends, port congestion updates, carrier schedules, and market conditions affecting your supply chain.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
