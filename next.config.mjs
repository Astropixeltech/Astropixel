/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), 'canvas', 'jsdom'];
    return config;
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Server',
            value: 'Apache/2.4.41 (Ubuntu)',
          },
          {
            key: 'X-Powered-By',
            value: 'PHP/8.1.0',
          }
        ],
      },
    ];
  },
};

export default nextConfig;
