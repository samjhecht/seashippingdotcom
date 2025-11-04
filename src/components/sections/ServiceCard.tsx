import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Ship,
  Car,
  Home,
  Package,
  Hammer,
  AlertTriangle,
  Snowflake,
  LucideIcon,
} from 'lucide-react';
import type { Service } from '@/types';
import { imageSizes } from '@/lib/images';

const iconMap: Record<string, LucideIcon> = {
  Ship,
  Car,
  Home,
  Package,
  Hammer,
  AlertTriangle,
  Snowflake,
};

interface ServiceCardProps {
  service: Pick<Service, 'slug' | 'title' | 'shortDescription' | 'icon'> & {
    image?: string;
  };
  showImage?: boolean;
}

export function ServiceCard({ service, showImage = false }: ServiceCardProps) {
  const Icon = iconMap[service.icon];

  return (
    <Link href={`/services/${service.slug}`}>
      <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
        {showImage && service.image && (
          <div className="relative w-full h-48">
            <Image
              src={service.image}
              alt={`${service.title} service`}
              fill
              className="object-cover"
              sizes={imageSizes.thirdWidth}
              quality={85}
            />
          </div>
        )}
        <CardHeader>
          {!showImage && (
            <div className="w-12 h-12 mb-4 text-primary">
              {Icon && <Icon size={48} />}
            </div>
          )}
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            {service.title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{service.shortDescription}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
