/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  /**
   * Security headers are declared here rather than only in netlify.toml.
   * netlify.toml headers apply to statically served assets, but HTML pages go
   * through the Next.js server handler function, which does not inherit them —
   * verified against the live deploy, where only X-Content-Type-Options
   * survived on `/`. Next applies these to its own responses, so they land on
   * every page.
   */
  /**
   * /why-taiwan-india was renamed to /markets when the firm's positioning widened
   * beyond the bilateral corridor. Permanent redirect so the old URL keeps working
   * and any accumulated ranking transfers rather than 404ing.
   */
  async redirects() {
    return [
      { source: '/why-taiwan-india', destination: '/markets', permanent: true },
      /* Trade missions were folded into business advisory — same practice, two
         cards. The old URL was published in the sitemap, so it redirects rather
         than 404s. */
      {
        source: '/capabilities/trade-mission',
        destination: '/capabilities/business-advisory',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ];
  },
};

export default nextConfig;
