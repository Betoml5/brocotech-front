/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "https://brocotech.herokuapp.com"],
  },
  staticPageGenerationTimeout: 60,
};

module.exports = nextConfig;
