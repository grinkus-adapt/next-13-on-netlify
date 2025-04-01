/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  trailingSlash: true,
  // experimental: {
  //   adjustFontFallbacks: true,
  // },
  experimental: {
    forceSwcTransforms: true,
    // nextScriptWorkers: true,
    scrollRestoration: true,
    optimizePackageImports: ["@chakra-ui/react"],
  },
  images: {
    // dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [
      'www.workhuman.com',
      'www.workhumanpreprod.com',
      'images.ctfassets.net',
      'netlify.app',
      'embed-ssl.wistia.com',
      'thehive.workhuman.com',
      'cdn.prod.website-files.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "form-action 'self' *.facebook.com *.workhuman.com; frame-ancestors 'self' app.contentful.com; frame-src 'self' *.workhuman.com *.workhumanpreprod.com app.netlify.com *.googletagmanager.com *.doubleclick.net *.cdn.optimizely.com pixel.mathtag.com cdn.useproof.com *.cookiebot.com *.facebook.com *.twitter.com 862-jiq-698.mktoweb.com cookie.havasedge.com fast.wistia.net fast.wistia.com youtube.com www.youtube.com bat.bing.com  ; base-uri 'none'; object-src 'self'; child-src 'self' *.fls.doubleclick.net; upgrade-insecure-requests; report-uri https://68cebcfc7e2f58b08b59066f1.report-uri.com/r/d/csp/enforce",
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*.cookiebot.com',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/events/spotlight/:series',
        destination: '/spotlight-landing/:series',
      },
    ];
  },
}

module.exports = nextConfig
