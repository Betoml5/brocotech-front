/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "brocotech.herokuapp.com",
      },
    ],
    domains: ["brocotech.herokuapp.com", "localhost"],
  },
  staticPageGenerationTimeout: 60,
};

module.exports = nextConfig;
