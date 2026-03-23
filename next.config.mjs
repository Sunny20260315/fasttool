/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  output: 'export', // 静态导出，适配 Cloudflare Pages
  distDir: 'dist', // Cloudflare Pages 期望的输出目录
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true, // 禁用图片优化，避免生成超大优化文件
  },
  productionBrowserSourceMaps: false,
  webpack: (config, { dev, isServer }) => {
    if (!isServer && !dev) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxSize: 20 * 1024 * 1024,
        minSize: 1 * 1024 * 1024,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: 5,
            reuseExistingChunk: true,
            name: 'vendors',
          },
          default: {
            minChunks: 2,
            priority: 0,
            reuseExistingChunk: true,
            name: 'chunk-common',
          },
          swiper: {
            test: /[\\/]node_modules[\\/]swiper[\\/]/,
            name: 'chunk-swiper',
            priority: 10,
            chunks: 'all',
            enforce: true,
          },
          canvas: {
            test: /[\\/]node_modules[\\/]canvas[\\/]/,
            name: 'chunk-canvas',
            priority: 10,
            chunks: 'all',
            enforce: true,
          },
          xlsx: {
            test: /[\\/]node_modules[\\/]xlsx[\\/]/,
            name: 'chunk-xlsx',
            priority: 10,
            chunks: 'all',
            enforce: true,
          },
          pdf: {
            test: /[\\/]node_modules[\\/](pdfjs-dist|pdf-lib)[\\/]/,
            name: 'chunk-pdf',
            priority: 10,
            chunks: 'all',
            enforce: true,
          },
          heic: {
            test: /[\\/]node_modules[\\/](heic-convert|libheif)[\\/]/,
            name: 'chunk-heic',
            priority: 10,
            chunks: 'all',
            enforce: true,
          },
          imageCompression: {
            test: /[\\/]node_modules[\\/]browser-image-compression[\\/]/,
            name: 'chunk-image-compression',
            priority: 10,
            chunks: 'all',
            enforce: true,
          },
          lucide: {
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            name: 'chunk-lucide',
            priority: 10,
            chunks: 'all',
            enforce: true,
          },
          codepage: {
            test: /[\\/]node_modules[\\/]codepage[\\/]/,
            name: 'chunk-codepage',
            priority: 10,
            chunks: 'all',
            enforce: true,
          },
          esAbstract: {
            test: /[\\/]node_modules[\\/]es-abstract[\\/]/,
            name: 'chunk-es-abstract',
            priority: 10,
            chunks: 'all',
            enforce: true,
          },
          caniuse: {
            test: /[\\/]node_modules[\\/]caniuse-lite[\\/]/,
            name: 'chunk-caniuse-lite',
            priority: 10,
            chunks: 'all',
            enforce: true,
          },
          axeCore: {
            test: /[\\/]node_modules[\\/]axe-core[\\/]/,
            name: 'chunk-axe-core',
            priority: 10,
            chunks: 'all',
            enforce: true,
          },
        },
      };

      config.optimization.runtimeChunk = {
        name: 'runtime',
      };

      config.optimization.minimize = true;
    }

    return config;
  },
};

export default bundleAnalyzer(nextConfig);