import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.v3cars.com",
      },
    ],
  },
};

export default nextConfig;
