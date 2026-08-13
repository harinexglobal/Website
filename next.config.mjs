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
   * The site was regrouped into five sections — Who We Are, What We Do, Where
   * We Work, Insights, Let's Connect — so every top-level URL moved. These are
   * permanent redirects rather than deletions: the old paths were published in
   * a sitemap and shared in email, and a 404 is a worse answer than a hop.
   *
   * The two entries at the top predate the regrouping and still need to land,
   * so they are chained to the new locations rather than the old ones.
   *
   * `/capabilities/trade-mission` must precede `/capabilities/:slug`, or the
   * wildcard would swallow it and send it to a practice that no longer exists.
   */
  async redirects() {
    return [
      { source: '/why-taiwan-india', destination: '/where-we-work', permanent: true },
      {
        source: '/capabilities/trade-mission',
        destination: '/what-we-do/business-advisory',
        permanent: true,
      },

      { source: '/about', destination: '/who-we-are', permanent: true },
      { source: '/about/team', destination: '/who-we-are/team', permanent: true },
      { source: '/capabilities', destination: '/what-we-do', permanent: true },
      { source: '/capabilities/:slug', destination: '/what-we-do/:slug', permanent: true },
      { source: '/industries', destination: '/what-we-do/industries', permanent: true },
      { source: '/markets', destination: '/where-we-work', permanent: true },
      {
        source: '/markets/collaborators',
        destination: '/where-we-work/collaborators',
        permanent: true,
      },
      /* Contact is not a rename — it was merged. The form now lives on
         Let's Connect with the enquiry type as a selector. */
      { source: '/contact', destination: '/lets-connect', permanent: true },
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
