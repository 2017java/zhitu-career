import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages 部署在 /zhitu-career/ 子路径下
  basePath: "/zhitu-career",
  // 静态导出不支持图片优化
  images: {
    unoptimized: true,
  },
  // 禁用trailingSlash以保持路由一致性
  trailingSlash: false,
};

export default nextConfig;
