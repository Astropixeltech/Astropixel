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
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@opennextjs/**',
        'node_modules/wrangler/**',
      ],
    },
  },
};

export default nextConfig;
