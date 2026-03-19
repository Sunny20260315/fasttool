/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'dist',
  reactStrictMode: true,
  // 全局启用 Edge Runtime
  experimental: {
    runtime: 'edge', // 所有路由默认使用 Edge 运行时
  },
  images: {
    formats: ["image/avif", "image/webp"]
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxSize: 20 * 1024 * 1024,
        minSize: 10 * 1024 * 1024,
      };
    }
    config.optimization.minimize = true;
    return config;
  },
  compress: true,
  productionBrowserSourceMaps: false,
};

export default nextConfig;
