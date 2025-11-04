import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main" role="main" className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4" style={{ color: 'hsl(var(--primary))' }}>
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="mb-8" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-md font-medium transition-colors"
          style={{
            backgroundColor: 'hsl(var(--primary))',
            color: 'hsl(var(--primary-foreground))',
          }}
        >
          Return to Homepage
        </Link>
      </div>
    </main>
  );
}
