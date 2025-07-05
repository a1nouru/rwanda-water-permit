import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [],
    remotePatterns: [],
    // Enable dangerously allow SVG to use SVG as images
    dangerouslyAllowSVG: true,
    // Add assets directory to the image paths
    unoptimized: true,
  },
};

export default nextConfig;
