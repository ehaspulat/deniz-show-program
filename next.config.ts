import type { NextConfig } from "next";

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Disable image optimization (required for GitHub Pages)
  }
};

export default nextConfig;
