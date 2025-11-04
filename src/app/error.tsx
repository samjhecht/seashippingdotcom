'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error boundary caught:', error);
  }, [error]);

  return (
    <main id="main" role="main" className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'hsl(var(--destructive))' }}>
          Something went wrong
        </h1>
        <p className="mb-8" style={{ color: 'hsl(var(--muted-foreground))' }}>
          We apologize for the inconvenience. An error occurred while loading
          this page.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-md font-medium transition-colors"
            style={{
              backgroundColor: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
            }}
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-md font-medium transition-colors border"
            style={{
              borderColor: 'hsl(var(--border))',
              color: 'hsl(var(--foreground))',
            }}
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
