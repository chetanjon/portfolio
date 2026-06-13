import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: '/waymo-teardown', destination: '/waymo-teardown.html' },
      { source: '/waymo-pickup', destination: '/waymo-pickup.html' },
    ];
  },
};

export default nextConfig;
