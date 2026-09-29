import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'db.optimon.co.kr',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
