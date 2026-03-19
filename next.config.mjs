/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'dist', // 保留你之前的输出目录
  experimental: {
    runtime: 'edge',
  },
  // 核心：拆分大文件 + 压缩
  webpack: (config, { dev, isServer }) => {
    // 1. 拆分 webpack 包，限制单个包大小
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxSize: 20 * 1024 * 1024, // 单个文件最大 20MB（低于 25MB 限制）
        minSize: 10 * 1024 * 1024, // 最小拆分单位 10MB
      };
    }
    // 2. 启用压缩
    config.optimization.minimize = true;
    return config;
  },
  // 3. 启用静态资源压缩
  compress: true,
  // 4. 可选：禁用 source map（减少文件体积）
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;