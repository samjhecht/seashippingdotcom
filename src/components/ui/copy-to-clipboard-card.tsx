'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CopyToClipboardCardProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

export function CopyToClipboardCard({
  value,
  label,
  icon,
  className,
}: CopyToClipboardCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Card className={cn('group hover:shadow-md transition-shadow', className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {icon && (
              <div className="flex-shrink-0 text-ssl-red" aria-hidden="true">
                {icon}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-sm text-muted-foreground mb-1">{label}</div>
              <div className="font-medium text-foreground truncate">{value}</div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className={cn(
              'flex-shrink-0 transition-colors',
              copied && 'text-green-600'
            )}
            aria-label={copied ? `Copied ${label}` : `Copy ${label}`}
          >
            {copied ? (
              <Check className="h-5 w-5" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
