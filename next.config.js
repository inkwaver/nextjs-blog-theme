const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'narek-ch.space',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'], // Ensure AVIF and WebP formats are enabled
  },
};

module.exports = withMDX(nextConfig);
