import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      }
      // {
      //   protocol: 'https',
      //   hostname: 'images.unsplash.com',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'video-images.vice.com',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'media-cdn.tripadvisor.com',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'c8.alamy.com',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'i.pinimg.com',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'www.livingfla.com',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'es.nycgo.com',
      // },
      // {
      //   protocol: 'http',
      //   hostname: 'www.wazwu.com',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'resizer.otstatic.com',
      // },
    ],
  },
};

export default nextConfig;
