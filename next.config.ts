import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /projects consolidated into the /casestudies hub.
      { source: '/projects', destination: '/casestudies', permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: '/waymo-teardown', destination: '/waymo-teardown.html' },
      { source: '/waymo-pickup', destination: '/waymo-pickup.html' },
      { source: '/ditto-teardown', destination: '/ditto-teardown.html' },
      { source: '/wispr-flow-teardown', destination: '/wispr-flow-teardown.html' },
    ];
  },
};

export default nextConfig;
