import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only use standalone output in production
  ...(process.env.NODE_ENV === 'production' && { output: 'standalone' }),
  // Set the root directory to prevent lockfile warnings
  outputFileTracingRoot: __dirname,
  images: {
    unoptimized: true
  },
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
};

export default nextConfig;
