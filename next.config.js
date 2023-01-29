/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "brocotech.herokuapp.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    domains: ["brocotech.herokuapp.com", "localhost", "res.cloudinary.com"],
  },
  staticPageGenerationTimeout: 60,
};

module.exports = nextConfig;
