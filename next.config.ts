import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/RESUME",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
