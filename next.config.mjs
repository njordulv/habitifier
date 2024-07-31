/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa'

const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },
  reactStrictMode: true, // Enable React strict mode for improved error handling
  swcMinify: true, // Enable SWC minification for improved performance
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development', // Remove console.log in production
  },
}

export default withPWA({
  dest: 'public', // destination directory for the PWA files
  disable: process.env.NODE_ENV === 'development', // disable PWA in the development environment
  register: true, // register the PWA service worker
  skipWaiting: true, // skip waiting for service worker activation
  runtimeCaching: [
    {
      urlPattern: /^\/fonts\/.*$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'local-fonts',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        },
      },
    },
  ],
  fallbacks: {
    document: '/offline',
  },
})(nextConfig)
