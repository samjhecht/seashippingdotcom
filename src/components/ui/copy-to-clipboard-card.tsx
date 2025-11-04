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
  compact?: boolean;
}

export function CopyToClipboardCard({
  value,
  label,
  icon,
  className,
  compact = false,
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
      <CardContent className={compact ? 'p-2' : 'p-4'}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {icon && (
              <div className="flex-shrink-0 text-ssl-red" aria-hidden="true">
                {icon}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className={cn(
                'text-muted-foreground',
                compact ? 'text-xs mb-0.5' : 'text-sm mb-1'
              )}>{label}</div>
              <div className={cn(
                'text-foreground truncate',
                compact ? 'text-sm font-normal' : 'font-medium'
              )}>{value}</div>
            </div>
          </div>
          <Button
            variant="ghost"
            size={compact ? 'sm' : 'icon'}
            onClick={handleCopy}
            className={cn(
              'flex-shrink-0 transition-colors',
              compact ? 'h-7 w-7 p-0' : '',
              copied && 'text-green-600'
            )}
            aria-label={copied ? `Copied ${label}` : `Copy ${label}`}
          >
            {copied ? (
              <Check className={compact ? 'h-3.5 w-3.5' : 'h-5 w-5'} />
            ) : (
              <Copy className={compact ? 'h-3.5 w-3.5' : 'h-5 w-5'} />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
