import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: '/waymo-teardown', destination: '/waymo-teardown.html' },
    ];
  },
};

export default nextConfig;
