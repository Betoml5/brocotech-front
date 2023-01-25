/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
  },
  staticPageGenerationTimeout: 60,
};

module.exports = nextConfig;
