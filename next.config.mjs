/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"]
  },
  productionBrowserSourceMaps: false,
  // 生成打包分析报告
  webpack: (config, { dev, isServer }) => {
    // 仅在客户端构建时应用分割配置
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          maxSize: 5 * 1024 * 1024, // 5MB
          minSize: 1000, // 1KB
          minRemainingSize: 0,
          minChunks: 1,
          maxAsyncRequests: 500,
          maxInitialRequests: 500,
          enforceSizeThreshold: 10000,
          cacheGroups: {
            defaultVendors: {
              test: /[\/]node_modules[\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            // 单独分割大型依赖
            swiper: {
              test: /[\/]node_modules[\/]swiper[\/]/,
              name: 'swiper',
              priority: 10,
              chunks: 'all',
            },
            canvas: {
              test: /[\/]node_modules[\/]canvas[\/]/,
              name: 'canvas',
              priority: 10,
              chunks: 'all',
            },
            xlsx: {
              test: /[\/]node_modules[\/]xlsx[\/]/,
              name: 'xlsx',
              priority: 10,
              chunks: 'all',
            },
            pdf: {
              test: /[\/]node_modules[\/](pdfjs-dist|pdf-lib)[\/]/,
              name: 'pdf',
              priority: 10,
              chunks: 'all',
            },
            heic: {
              test: /[\/]node_modules[\/](heic-convert|libheif)[\/]/,
              name: 'heic',
              priority: 10,
              chunks: 'all',
            },
            imageCompression: {
              test: /[\/]node_modules[\/]browser-image-compression[\/]/,
              name: 'image-compression',
              priority: 10,
              chunks: 'all',
            },
            lucide: {
              test: /[\/]node_modules[\/]lucide-react[\/]/,
              name: 'lucide',
              priority: 10,
              chunks: 'all',
            },
            codepage: {
              test: /[\/]node_modules[\/]codepage[\/]/,
              name: 'codepage',
              priority: 10,
              chunks: 'all',
            },
            esAbstract: {
              test: /[\/]node_modules[\/]es-abstract[\/]/,
              name: 'es-abstract',
              priority: 10,
              chunks: 'all',
            },
            caniuse: {
              test: /[\/]node_modules[\/]caniuse-lite[\/]/,
              name: 'caniuse-lite',
              priority: 10,
              chunks: 'all',
            },
            axeCore: {
              test: /[\/]node_modules[\/]axe-core[\/]/,
              name: 'axe-core',
              priority: 10,
              chunks: 'all',
            },
          },
        },
      };
    }
    
    return config;
  },
}

export default nextConfig