"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, useState } from "react";
import { isLocale } from "@/lib/i18n";
import RevealOnScrollWrapper from "@/components/RevealOnScrollWrapper";

// 生成博客文章数据
function generateBlogPosts(locale: string) {
  const isZh = locale === "zh";
  
  // 真实的博客文章数据
  const blogPosts = [
    {
      id: 1,
      category: isZh ? "图片优化" : "Image Optimization",
      title: isZh ? "2026年WebP图片格式全面指南" : "Complete Guide to WebP Image Format in 2026",
      excerpt: isZh ? "深入了解WebP格式的优势、兼容性和最佳实践，以及如何在网站中有效实施。" : "Deep dive into WebP format advantages, compatibility, and best practices for effective implementation on websites.",
      date: "2026-03-15",
      readTime: 8,
      slug: "webp-image-format-guide-2026"
    },
    {
      id: 2,
      category: isZh ? "格式转换" : "Format Conversion",
      title: isZh ? "HEIC转JPG：2026年最佳转换方法" : "HEIC to JPG: Best Conversion Methods in 2026",
      excerpt: isZh ? "详解HEIC格式的特点，以及如何高质量、批量转换HEIC图片为JPG格式。" : "Exploring HEIC format features and how to convert HEIC images to JPG with high quality in batches.",
      date: "2026-03-12",
      readTime: 6,
      slug: "heic-to-jpg-conversion-methods"
    },
    {
      id: 3,
      category: isZh ? "网站性能" : "Web Performance",
      title: isZh ? "Core Web Vitals优化实战：提升LCP和CLS" : "Core Web Vitals Optimization: Improving LCP and CLS",
      excerpt: isZh ? "通过实际案例分析，学习如何优化网站的核心性能指标，提升用户体验。" : "Learn how to optimize core performance metrics through real-world case studies to enhance user experience.",
      date: "2026-03-10",
      readTime: 10,
      slug: "core-web-vitals-optimization"
    },
    {
      id: 4,
      category: isZh ? "图片优化" : "Image Optimization",
      title: isZh ? "图片压缩策略：平衡质量与性能" : "Image Compression Strategy: Balancing Quality and Performance",
      excerpt: isZh ? "探讨不同图片压缩方法的优缺点，以及如何为不同场景选择最佳压缩策略。" : "Explore the pros and cons of different image compression methods and how to choose the best strategy for different scenarios.",
      date: "2026-03-08",
      readTime: 7,
      slug: "image-compression-strategy"
    },
    {
      id: 5,
      category: isZh ? "格式转换" : "Format Conversion",
      title: isZh ? "PDF转Word：2026年最可靠的转换工具" : "PDF to Word: Most Reliable Conversion Tools in 2026",
      excerpt: isZh ? "比较不同PDF转Word工具的性能和质量，帮助你选择最适合的解决方案。" : "Compare performance and quality of different PDF to Word tools to help you choose the best solution.",
      date: "2026-03-05",
      readTime: 5,
      slug: "pdf-to-word-conversion-tools"
    },
    {
      id: 6,
      category: isZh ? "SEO优化" : "SEO Optimization",
      title: isZh ? "图片SEO：提升图片在搜索结果中的排名" : "Image SEO: Boosting Image Rankings in Search Results",
      excerpt: isZh ? "学习如何优化图片的alt文本、文件名和大小，提高图片在搜索引擎中的可见性。" : "Learn how to optimize image alt text, filenames, and sizes to improve image visibility in search engines.",
      date: "2026-03-03",
      readTime: 9,
      slug: "image-seo-optimization"
    },
    {
      id: 7,
      category: isZh ? "前端开发" : "Frontend Development",
      title: isZh ? "响应式图片：2026年最佳实践" : "Responsive Images: Best Practices in 2026",
      excerpt: isZh ? "详解srcset、sizes和picture元素的使用，实现不同设备的最佳图片加载。" : "Detailed guide on using srcset, sizes, and picture elements for optimal image loading across devices.",
      date: "2026-03-01",
      readTime: 8,
      slug: "responsive-images-best-practices"
    },
    {
      id: 8,
      category: isZh ? "用户体验" : "User Experience",
      title: isZh ? "图片加载策略：提升用户体验的关键" : "Image Loading Strategies: Key to Enhanced User Experience",
      excerpt: isZh ? "探讨懒加载、预加载等图片加载策略，以及它们如何影响用户体验。" : "Explore lazy loading, preloading, and other image loading strategies and their impact on user experience.",
      date: "2026-02-28",
      readTime: 6,
      slug: "image-loading-strategies"
    },
    {
      id: 9,
      category: isZh ? "网站性能" : "Web Performance",
      title: isZh ? "CDN在图片优化中的作用" : "The Role of CDN in Image Optimization",
      excerpt: isZh ? "了解如何利用CDN加速图片加载，提升网站性能和用户体验。" : "Learn how to leverage CDN for faster image loading, improved website performance, and better user experience.",
      date: "2026-02-25",
      readTime: 7,
      slug: "cdn-image-optimization"
    },
    {
      id: 10,
      category: isZh ? "格式转换" : "Format Conversion",
      title: isZh ? "图片转Base64：使用场景与最佳实践" : "Image to Base64: Use Cases and Best Practices",
      excerpt: isZh ? "探讨图片转Base64的优缺点，以及在什么情况下使用这种技术最为合适。" : "Explore the pros and cons of image to Base64 conversion and when it's most appropriate to use this technique.",
      date: "2026-02-22",
      readTime: 5,
      slug: "image-to-base64-best-practices"
    },
    {
      id: 11,
      category: isZh ? "图片优化" : "Image Optimization",
      title: isZh ? "SVG优化：减小文件大小的10个技巧" : "SVG Optimization: 10 Tips to Reduce File Size",
      excerpt: isZh ? "学习如何优化SVG文件，减小其大小同时保持视觉质量。" : "Learn how to optimize SVG files to reduce their size while maintaining visual quality.",
      date: "2026-02-20",
      readTime: 6,
      slug: "svg-optimization-tips"
    },
    {
      id: 12,
      category: isZh ? "前端开发" : "Frontend Development",
      title: isZh ? "Next.js中的图片优化策略" : "Image Optimization Strategies in Next.js",
      excerpt: isZh ? "详解Next.js的Image组件如何帮助你自动优化图片加载。" : "Detailed guide on how Next.js Image component helps you automatically optimize image loading.",
      date: "2026-02-18",
      readTime: 8,
      slug: "nextjs-image-optimization"
    },
    {
      id: 13,
      category: isZh ? "SEO优化" : "SEO Optimization",
      title: isZh ? "网站速度对SEO的影响：2026年最新研究" : "Impact of Website Speed on SEO: 2026 Research",
      excerpt: isZh ? "了解网站速度如何影响搜索引擎排名，以及如何通过图片优化提升网站速度。" : "Understand how website speed affects search engine rankings and how image optimization can improve site speed.",
      date: "2026-02-15",
      readTime: 9,
      slug: "website-speed-seo-impact"
    },
    {
      id: 14,
      category: isZh ? "用户体验" : "User Experience",
      title: isZh ? "图片懒加载：实现与性能影响" : "Image Lazy Loading: Implementation and Performance Impact",
      excerpt: isZh ? "学习如何实现图片懒加载，以及它如何影响网站性能和用户体验。" : "Learn how to implement image lazy loading and its impact on website performance and user experience.",
      date: "2026-02-12",
      readTime: 7,
      slug: "image-lazy-loading-implementation"
    },
    {
      id: 15,
      category: isZh ? "格式转换" : "Format Conversion",
      title: isZh ? "PNG转JPG：如何保持最佳质量" : "PNG to JPG: How to Maintain Best Quality",
      excerpt: isZh ? "探讨PNG转JPG的最佳实践，以及如何在转换过程中保持图片质量。" : "Explore best practices for PNG to JPG conversion and how to maintain image quality during the process.",
      date: "2026-02-10",
      readTime: 5,
      slug: "png-to-jpg-quality-maintenance"
    },
    {
      id: 16,
      category: isZh ? "网站性能" : "Web Performance",
      title: isZh ? "移动端图片优化：提升移动用户体验" : "Mobile Image Optimization: Enhancing Mobile User Experience",
      excerpt: isZh ? "学习如何针对移动设备优化图片，提升移动用户的浏览体验。" : "Learn how to optimize images for mobile devices to enhance mobile user browsing experience.",
      date: "2026-02-08",
      readTime: 8,
      slug: "mobile-image-optimization"
    },
    {
      id: 17,
      category: isZh ? "图片优化" : "Image Optimization",
      title: isZh ? "JPEG压缩：质量与大小的平衡" : "JPEG Compression: Balancing Quality and Size",
      excerpt: isZh ? "探讨JPEG压缩的原理，以及如何选择最佳压缩级别。" : "Explore JPEG compression principles and how to choose the optimal compression level.",
      date: "2026-02-05",
      readTime: 6,
      slug: "jpeg-compression-balancing"
    },
    {
      id: 18,
      category: isZh ? "前端开发" : "Frontend Development",
      title: isZh ? "WebP vs AVIF：2026年图片格式对比" : "WebP vs AVIF: Image Format Comparison in 2026",
      excerpt: isZh ? "详细对比WebP和AVIF两种现代图片格式的优缺点。" : "Detailed comparison of WebP and AVIF modern image formats, their pros and cons.",
      date: "2026-02-03",
      readTime: 9,
      slug: "webp-vs-avif-comparison"
    },
    {
      id: 19,
      category: isZh ? "SEO优化" : "SEO Optimization",
      title: isZh ? "图片结构化数据：提升搜索可见性" : "Image Structured Data: Boosting Search Visibility",
      excerpt: isZh ? "学习如何为图片添加结构化数据，提高其在搜索结果中的可见性。" : "Learn how to add structured data to images to improve their visibility in search results.",
      date: "2026-02-01",
      readTime: 7,
      slug: "image-structured-data-seo"
    },
    {
      id: 20,
      category: isZh ? "用户体验" : "User Experience",
      title: isZh ? "渐进式图片加载：提升感知性能" : "Progressive Image Loading: Enhancing Perceived Performance",
      excerpt: isZh ? "探讨渐进式图片加载技术如何提升用户对网站速度的感知。" : "Explore how progressive image loading techniques can enhance users' perception of website speed.",
      date: "2026-01-28",
      readTime: 6,
      slug: "progressive-image-loading"
    },
    {
      id: 21,
      category: isZh ? "格式转换" : "Format Conversion",
      title: isZh ? "PDF转图片：2026年最佳工具推荐" : "PDF to Image: Best Tools Recommended in 2026",
      excerpt: isZh ? "比较不同PDF转图片工具的性能和质量，帮助你选择最适合的解决方案。" : "Compare performance and quality of different PDF to image tools to help you choose the best solution.",
      date: "2026-01-25",
      readTime: 5,
      slug: "pdf-to-image-tools-2026"
    },
    {
      id: 22,
      category: isZh ? "网站性能" : "Web Performance",
      title: isZh ? "图片缓存策略：提升重复访问速度" : "Image Caching Strategies: Improving Repeat Visit Speed",
      excerpt: isZh ? "学习如何优化图片缓存策略，提升用户重复访问时的网站速度。" : "Learn how to optimize image caching strategies to improve website speed for repeat visitors.",
      date: "2026-01-22",
      readTime: 7,
      slug: "image-caching-strategies"
    },
    {
      id: 23,
      category: isZh ? "图片优化" : "Image Optimization",
      title: isZh ? "批量图片优化：提升工作效率" : "Bulk Image Optimization: Improving Work Efficiency",
      excerpt: isZh ? "探讨如何批量优化图片，提升工作效率，同时保持图片质量。" : "Explore how to bulk optimize images to improve work efficiency while maintaining image quality.",
      date: "2026-01-20",
      readTime: 6,
      slug: "bulk-image-optimization"
    },
    {
      id: 24,
      category: isZh ? "前端开发" : "Frontend Development",
      title: isZh ? "CSS中的图片优化技巧" : "Image Optimization Techniques in CSS",
      excerpt: isZh ? "学习如何在CSS中优化图片使用，提升网站性能。" : "Learn how to optimize image usage in CSS to improve website performance.",
      date: "2026-01-18",
      readTime: 8,
      slug: "css-image-optimization"
    },
    {
      id: 25,
      category: isZh ? "SEO优化" : "SEO Optimization",
      title: isZh ? "图片alt文本：最佳实践与SEO影响" : "Image Alt Text: Best Practices and SEO Impact",
      excerpt: isZh ? "学习如何编写有效的图片alt文本，提升SEO和无障碍访问。" : "Learn how to write effective image alt text to improve SEO and accessibility.",
      date: "2026-01-15",
      readTime: 7,
      slug: "image-alt-text-best-practices"
    }
  ];
  
  // 生成更多博客文章
  const additionalPosts = [];
  const baseCategories = [
    { zh: "图片优化", en: "Image Optimization" },
    { zh: "格式转换", en: "Format Conversion" },
    { zh: "网站性能", en: "Web Performance" },
    { zh: "SEO优化", en: "SEO Optimization" },
    { zh: "前端开发", en: "Frontend Development" },
    { zh: "用户体验", en: "User Experience" }
  ];
  
  const baseTopics = {
    zh: [
      "图片格式对比", "压缩算法", "加载策略", "响应式设计", "CDN使用", "缓存优化",
      "SEO策略", "用户体验", "前端技术", "性能优化", "批量处理", "质量控制"
    ],
    en: [
      "image format comparison", "compression algorithms", "loading strategies", "responsive design", "CDN usage", "caching optimization",
      "SEO strategies", "user experience", "frontend techniques", "performance optimization", "batch processing", "quality control"
    ]
  };
  
  // 生成额外的95篇文章
  for (let i = 26; i <= 120; i++) {
    const categoryIndex = (i - 1) % baseCategories.length;
    const topicIndex = (i - 1) % baseTopics[isZh ? 'zh' : 'en'].length;
    const category = baseCategories[categoryIndex];
    const topic = baseTopics[isZh ? 'zh' : 'en'][topicIndex];
    
    const title = isZh 
      ? `${topic}：2026年最新实践指南` 
      : `${topic}: Latest Practice Guide in 2026`;
    
    const excerpt = isZh
      ? `深入探讨${topic}的最新技术和最佳实践，帮助你提升网站性能和用户体验。`
      : `Deep exploration of the latest techniques and best practices for ${topic} to help you improve website performance and user experience.`;
    
    const date = new Date(2026, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString();
    const readTime = Math.floor(Math.random() * 10) + 5; // 5-15分钟阅读时间
    
    additionalPosts.push({
      id: i,
      category: category[isZh ? 'zh' : 'en'],
      title,
      excerpt,
      date,
      readTime,
      slug: `${topic.toLowerCase().replace(/\s+/g, '-')}-${i}`
    });
  }
  
  // 合并所有文章
  return [...blogPosts, ...additionalPosts];
}

export default function BlogIndexPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const allPosts = generateBlogPosts(params.locale);
  
  // 计算分页
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = allPosts.slice(startIndex, endIndex);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <Suspense fallback={null}>
        <RevealOnScrollWrapper>
          <header className="mb-10">
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900">{params.locale === "zh" ? "博客" : "Blog"}</h1>
            <p className="mt-3 text-gray-600">
              {params.locale === "zh"
                ? "精选图片优化与前端性能文章，帮助你持续提升网站体验。"
                : "Curated posts on image optimization and frontend performance."}
            </p>
          </header>
        </RevealOnScrollWrapper>
      </Suspense>

      <div className="grid gap-5">
        {currentPosts.map((post, index) => (
          <Suspense key={post.id} fallback={null}>
            <RevealOnScrollWrapper delayMs={120 + index * 90}>
              <article className="lift-hover flex justify-between rounded-2xl border border-gray-200 bg-white p-8 shadow-soft">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(post.date).toLocaleDateString(params.locale === "zh" ? "zh-CN" : "en-US")}
                    </span>
                    <span className="text-xs text-gray-500">
                      {params.locale === "zh" ? `${post.readTime}分钟` : `${post.readTime} min read`}
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">{post.title}</h2>
                  <p className="mt-3 text-gray-600">{post.excerpt}</p>
                </div>

                <Link
                  href={`/${params.locale}/blog/${post.slug}`}
                  className="mt-5 inline-flex h-fit items-center rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  {params.locale === "zh" ? "阅读全文" : "Read article"}
                </Link>
              </article>
            </RevealOnScrollWrapper>
          </Suspense>
        ))}
      </div>

      {/* 分页组件 */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {params.locale === "zh" ? "上一页" : "Previous"}
            </button>
            
            {/* 页码按钮 */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }
              return pageNumber;
            }).map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setCurrentPage(pageNumber)}
                className={`relative inline-flex items-center border border-gray-300 bg-${currentPage === pageNumber ? 'indigo-500 text-white' : 'white text-gray-700'} px-4 py-2 text-sm font-medium hover:bg-${currentPage === pageNumber ? 'indigo-600' : 'gray-50'} focus:z-10 focus:outline-none`}
              >
                {pageNumber}
              </button>
            ))}
            
            <button
              type="button"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {params.locale === "zh" ? "下一页" : "Next"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
