import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (a stray lockfile exists higher up in C:\Dev).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
