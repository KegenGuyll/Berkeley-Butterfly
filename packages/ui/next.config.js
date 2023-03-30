/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "madden-assets-cdn.pulse.ea.com",
      },
    ],
  },
};

module.exports = nextConfig;
