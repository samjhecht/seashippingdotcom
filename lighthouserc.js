module.exports = {
  ci: {
    collect: {
      // Start the server before running Lighthouse
      startServerCommand: 'npm run build && npm run start',
      startServerReadyPattern: 'Ready',
      startServerReadyTimeout: 30000,
      // Test multiple critical pages
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/services',
        'http://localhost:3000/services/ocean-freight',
        'http://localhost:3000/request',
      ],
      numberOfRuns: 3,
      settings: {
        // Test both mobile and desktop
        preset: 'desktop',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        // Emulate throttling for realistic testing
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
        },
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // Performance targets - stricter for desktop
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],

        // Core Web Vitals - Desktop targets
        'first-contentful-paint': ['error', { maxNumericValue: 1000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 1500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 150 }],
        'speed-index': ['error', { maxNumericValue: 2000 }],
        'interactive': ['error', { maxNumericValue: 2500 }],

        // Resource budgets - gzipped sizes
        'resource-summary:document:size': ['error', { maxNumericValue: 50000 }],
        'resource-summary:script:size': ['error', { maxNumericValue: 300000 }],
        'resource-summary:stylesheet:size': ['error', { maxNumericValue: 50000 }],
        'resource-summary:image:size': ['error', { maxNumericValue: 500000 }],
        'resource-summary:font:size': ['error', { maxNumericValue: 100000 }],
        'resource-summary:total:size': ['error', { maxNumericValue: 1000000 }],

        // Additional performance checks
        'unused-css-rules': ['warn', { maxLength: 1 }],
        'unused-javascript': ['warn', { maxLength: 1 }],
        'modern-image-formats': ['error', { maxLength: 0 }],
        'uses-optimized-images': ['warn', { maxLength: 0 }],
        'uses-text-compression': ['error', { maxLength: 0 }],
        'uses-responsive-images': ['warn', { maxLength: 0 }],
      },
    },
    upload: {
      // Upload to temporary public storage
      target: 'temporary-public-storage',
    },
  },
};
