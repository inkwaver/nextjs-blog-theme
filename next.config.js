const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Image optimization configuration using remotePatterns
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'narek-ch.space',
        pathname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'], // Include AVIF and WebP formats
    loader: 'default', // Use the default loader
  },
  // Optionally, add any other Next.js config below
}

module.exports = withMDX(nextConfig)
