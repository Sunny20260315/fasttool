/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 全局启用 Edge Runtime
  experimental: {
    runtime: 'edge', // 所有路由默认使用 Edge 运行时
  },
  images: {
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
