import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUp, CalendarDays, Clock3, Facebook, Linkedin, Tag, Twitter, User } from "lucide-react";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";

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
      content: {
        zh: `
          <p>在 2026 年，WebP 格式已经成为网站图片优化的重要选择。本文将全面介绍 WebP 格式的特点、优势以及如何在实际项目中应用。</p>
          
          <h2>WebP 格式的核心优势</h2>
          <p>WebP 由 Google 开发，旨在提供更小的文件大小和更好的压缩效率。与传统的 JPEG 格式相比，WebP 通常可以减少 25-35% 的文件大小，同时保持相似的视觉质量。</p>
          
          <h2>浏览器兼容性</h2>
          <p>到 2026 年，WebP 格式已经获得了绝大多数现代浏览器的支持，包括 Chrome、Firefox、Safari 和 Edge。对于老旧浏览器，可以使用 JPEG 作为 fallback 方案。</p>
          
          <h2>在网站中实施 WebP</h2>
          <p>实施 WebP 格式的方法有多种，包括：</p>
          <ul>
            <li>使用图片转换工具将现有图片批量转换为 WebP</li>
            <li>在服务器端根据浏览器支持情况提供不同格式的图片</li>
            <li>使用 CDN 服务自动处理图片格式转换</li>
          </ul>
          
          <h2>性能影响</h2>
          <p>使用 WebP 格式可以显著提升网站加载速度，特别是对于图片密集型网站。这不仅可以改善用户体验，还可以提升 SEO 排名。</p>
        `,
        en: `
          <p>In 2026, WebP format has become an important choice for website image optimization. This article will comprehensively introduce the characteristics, advantages, and how to apply WebP format in actual projects.</p>
          
          <h2>Core Advantages of WebP Format</h2>
          <p>Developed by Google, WebP aims to provide smaller file sizes and better compression efficiency. Compared to traditional JPEG format, WebP can usually reduce file size by 25-35% while maintaining similar visual quality.</p>
          
          <h2>Browser Compatibility</h2>
          <p>By 2026, WebP format has gained support from the vast majority of modern browsers, including Chrome, Firefox, Safari, and Edge. For older browsers, JPEG can be used as a fallback solution.</p>
          
          <h2>Implementing WebP on Websites</h2>
          <p>There are several methods to implement WebP format:</p>
          <ul>
            <li>Use image conversion tools to batch convert existing images to WebP</li>
            <li>Provide different formats of images on the server side based on browser support</li>
            <li>Use CDN services to automatically handle image format conversion</li>
          </ul>
          
          <h2>Performance Impact</h2>
          <p>Using WebP format can significantly improve website loading speed, especially for image-intensive websites. This not only improves user experience but also boosts SEO rankings.</p>
        `
      },
      date: "2026-03-15",
      readTime: 8,
      slug: "webp-image-format-guide-2026",
      tags: [isZh ? "WebP" : "WebP", isZh ? "图片优化" : "Image Optimization"]
    },
    {
      id: 2,
      category: isZh ? "格式转换" : "Format Conversion",
      title: isZh ? "HEIC转JPG：2026年最佳转换方法" : "HEIC to JPG: Best Conversion Methods in 2026",
      excerpt: isZh ? "详解HEIC格式的特点，以及如何高质量、批量转换HEIC图片为JPG格式。" : "Exploring HEIC format features and how to convert HEIC images to JPG with high quality in batches.",
      content: {
        zh: `
          <p>HEIC 是苹果公司推出的一种高效图片格式，具有更好的压缩率和画质。然而，由于兼容性问题，很多场景下我们需要将 HEIC 转换为更通用的 JPG 格式。</p>
          
          <h2>HEIC 格式的特点</h2>
          <p>HEIC（High Efficiency Image Format）是一种基于 HEVC（H.265）视频压缩标准的图片格式，它可以在相同画质下比 JPG 小 50% 左右。</p>
          
          <h2>转换方法</h2>
          <p>有多种方法可以将 HEIC 转换为 JPG：</p>
          <ul>
            <li>使用在线转换工具</li>
            <li>使用桌面软件</li>
            <li>使用手机应用</li>
            <li>使用命令行工具</li>
          </ul>
          
          <h2>批量转换技巧</h2>
          <p>对于大量 HEIC 图片的转换，可以使用批量处理工具，提高效率并保持一致性。</p>
        `,
        en: `
          <p>HEIC is an efficient image format introduced by Apple, offering better compression and image quality. However, due to compatibility issues, we often need to convert HEIC to the more universal JPG format in many scenarios.</p>
          
          <h2>Characteristics of HEIC Format</h2>
          <p>HEIC (High Efficiency Image Format) is an image format based on the HEVC (H.265) video compression standard, which can be about 50% smaller than JPG at the same image quality.</p>
          
          <h2>Conversion Methods</h2>
          <p>There are several methods to convert HEIC to JPG:</p>
          <ul>
            <li>Using online conversion tools</li>
            <li>Using desktop software</li>
            <li>Using mobile apps</li>
            <li>Using command-line tools</li>
          </ul>
          
          <h2>Batch Conversion Tips</h2>
          <p>For converting a large number of HEIC images, batch processing tools can be used to improve efficiency and maintain consistency.</p>
        `
      },
      date: "2026-03-12",
      readTime: 6,
      slug: "heic-to-jpg-conversion-methods",
      tags: [isZh ? "HEIC" : "HEIC", isZh ? "格式转换" : "Format Conversion"]
    },
    {
      id: 3,
      category: isZh ? "网站性能" : "Web Performance",
      title: isZh ? "Core Web Vitals优化实战：提升LCP和CLS" : "Core Web Vitals Optimization: Improving LCP and CLS",
      excerpt: isZh ? "通过实际案例分析，学习如何优化网站的核心性能指标，提升用户体验。" : "Learn how to optimize core performance metrics through real-world case studies to enhance user experience.",
      content: {
        zh: `
          <p>Core Web Vitals 是 Google 推出的一组用户体验指标，包括 LCP（最大内容绘制）、FID（首次输入延迟）和 CLS（累积布局偏移）。本文将通过实际案例，介绍如何优化这些指标。</p>
          
          <h2>LCP 优化策略</h2>
          <p>LCP 是衡量页面加载速度的重要指标，优化方法包括：</p>
          <ul>
            <li>优化首屏图片</li>
            <li>减少服务器响应时间</li>
            <li>使用 CDN</li>
            <li>优化 CSS 和 JavaScript</li>
          </ul>
          
          <h2>CLS 优化策略</h2>
          <p>CLS 衡量页面布局的稳定性，优化方法包括：</p>
          <ul>
            <li>为图片和视频设置固定尺寸</li>
            <li>避免动态注入内容</li>
            <li>使用 CSS aspect-ratio 属性</li>
          </ul>
          
          <h2>实际案例分析</h2>
          <p>通过分析真实网站的性能数据，我们可以看到优化前后的明显差异，以及这些优化如何影响用户体验和 SEO 排名。</p>
        `,
        en: `
          <p>Core Web Vitals is a set of user experience metrics introduced by Google, including LCP (Largest Contentful Paint), FID (First Input Delay), and CLS (Cumulative Layout Shift). This article will introduce how to optimize these metrics through real-world case studies.</p>
          
          <h2>LCP Optimization Strategies</h2>
          <p>LCP is an important metric for measuring page loading speed. Optimization methods include:</p>
          <ul>
            <li>Optimizing above-the-fold images</li>
            <li>Reducing server response time</li>
            <li>Using CDN</li>
            <li>Optimizing CSS and JavaScript</li>
          </ul>
          
          <h2>CLS Optimization Strategies</h2>
          <p>CLS measures the stability of page layout. Optimization methods include:</p>
          <ul>
            <li>Setting fixed sizes for images and videos</li>
            <li>Avoiding dynamic content injection</li>
            <li>Using CSS aspect-ratio property</li>
          </ul>
          
          <h2>Real-world Case Analysis</h2>
          <p>By analyzing performance data of real websites, we can see the obvious difference before and after optimization, and how these optimizations affect user experience and SEO rankings.</p>
        `
      },
      date: "2026-03-10",
      readTime: 10,
      slug: "core-web-vitals-optimization",
      tags: [isZh ? "Core Web Vitals" : "Core Web Vitals", isZh ? "网站性能" : "Web Performance"]
    },
    {
      id: 4,
      category: isZh ? "图片优化" : "Image Optimization",
      title: isZh ? "图片压缩策略：平衡质量与性能" : "Image Compression Strategy: Balancing Quality and Performance",
      excerpt: isZh ? "探讨不同图片压缩方法的优缺点，以及如何为不同场景选择最佳压缩策略。" : "Explore the pros and cons of different image compression methods and how to choose the best strategy for different scenarios.",
      content: {
        zh: `
          <p>图片压缩是网站性能优化的重要组成部分。本文将探讨不同的图片压缩方法，以及如何在质量和性能之间取得平衡。</p>
          
          <h2>有损压缩 vs 无损压缩</h2>
          <p>有损压缩可以获得更小的文件大小，但会损失一定的画质；无损压缩则保持原始画质，但文件大小较大。</p>
          
          <h2>不同场景的压缩策略</h2>
          <ul>
            <li>首页大图：可以适当降低质量以获得更快的加载速度</li>
            <li>产品图片：需要保持较高的质量以展示产品细节</li>
            <li>缩略图：可以使用更高的压缩率</li>
          </ul>
          
          <h2>工具推荐</h2>
          <p>介绍一些常用的图片压缩工具，包括在线工具、桌面软件和命令行工具。</p>
        `,
        en: `
          <p>Image compression is an important part of website performance optimization. This article will explore different image compression methods and how to balance quality and performance.</p>
          
          <h2>Lossy vs Lossless Compression</h2>
          <p>Lossy compression can achieve smaller file sizes but at the cost of some image quality; lossless compression maintains original quality but results in larger file sizes.</p>
          
          <h2>Compression Strategies for Different Scenarios</h2>
          <ul>
            <li>Homepage hero images: Can be compressed more to achieve faster loading</li>
            <li>Product images: Need to maintain higher quality to show product details</li>
            <li>Thumbnails: Can use higher compression rates</li>
          </ul>
          
          <h2>Tool Recommendations</h2>
          <p>Introduce some commonly used image compression tools, including online tools, desktop software, and command-line tools.</p>
        `
      },
      date: "2026-03-08",
      readTime: 7,
      slug: "image-compression-strategy",
      tags: [isZh ? "图片压缩" : "Image Compression", isZh ? "性能优化" : "Performance Optimization"]
    },
    {
      id: 5,
      category: isZh ? "格式转换" : "Format Conversion",
      title: isZh ? "PDF转Word：2026年最可靠的转换工具" : "PDF to Word: Most Reliable Conversion Tools in 2026",
      excerpt: isZh ? "比较不同PDF转Word工具的性能和质量，帮助你选择最适合的解决方案。" : "Compare performance and quality of different PDF to Word tools to help you choose the best solution.",
      content: {
        zh: `
          <p>PDF 转 Word 是一项常见的需求，尤其是在需要编辑 PDF 内容时。本文将比较 2026 年最可靠的 PDF 转 Word 工具，帮助你选择最适合的解决方案。</p>
          
          <h2>在线工具 vs 桌面软件</h2>
          <p>在线工具使用方便，但可能有文件大小限制；桌面软件功能更强大，但需要安装。</p>
          
          <h2>转换质量评估</h2>
          <p>评估 PDF 转 Word 工具的质量主要看以下几个方面：</p>
          <ul>
            <li>文本识别准确性</li>
            <li>格式保留程度</li>
            <li>图片处理能力</li>
            <li>表格转换质量</li>
          </ul>
          
          <h2>工具推荐</h2>
          <p>推荐几款 2026 年表现优秀的 PDF 转 Word 工具，并分析它们的优缺点。</p>
        `,
        en: `
          <p>PDF to Word conversion is a common need, especially when you need to edit PDF content. This article will compare the most reliable PDF to Word tools in 2026 to help you choose the best solution.</p>
          
          <h2>Online Tools vs Desktop Software</h2>
          <p>Online tools are convenient but may have file size limitations; desktop software is more powerful but requires installation.</p>
          
          <h2>Conversion Quality Evaluation</h2>
          <p>Evaluating the quality of PDF to Word tools mainly looks at the following aspects:</p>
          <ul>
            <li>Text recognition accuracy</li>
            <li>Format retention</li>
            <li>Image processing capability</li>
            <li>Table conversion quality</li>
          </ul>
          
          <h2>Tool Recommendations</h2>
          <p>Recommend several excellent PDF to Word tools in 2026 and analyze their advantages and disadvantages.</p>
        `
      },
      date: "2026-03-05",
      readTime: 5,
      slug: "pdf-to-word-conversion-tools",
      tags: [isZh ? "PDF转Word" : "PDF to Word", isZh ? "格式转换" : "Format Conversion"]
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
  for (let i = 6; i <= 120; i++) {
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
    
    const content = {
      zh: `
        <p>本文将深入探讨${topic}的最新技术和最佳实践，帮助你提升网站性能和用户体验。</p>
        <h2>${topic}的重要性</h2>
        <p>${topic}在现代网站开发中扮演着重要角色，直接影响用户体验和网站性能。</p>
        <h2>最新技术趋势</h2>
        <p>2026年，${topic}领域出现了许多新的技术和方法，本文将详细介绍这些趋势。</p>
        <h2>最佳实践</h2>
        <p>通过实际案例和代码示例，展示如何在项目中有效实施${topic}的最佳实践。</p>
      `,
      en: `
        <p>This article will explore the latest techniques and best practices for ${topic} to help you improve website performance and user experience.</p>
        <h2>The Importance of ${topic}</h2>
        <p>${topic} plays an important role in modern website development, directly affecting user experience and website performance.</p>
        <h2>Latest Technology Trends</h2>
        <p>In 2026, many new technologies and methods have emerged in the field of ${topic}, which will be detailed in this article.</p>
        <h2>Best Practices</h2>
        <p>Through real-world cases and code examples, show how to effectively implement ${topic} best practices in projects.</p>
      `
    };
    
    const date = new Date(2026, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString();
    const readTime = Math.floor(Math.random() * 10) + 5; // 5-15分钟阅读时间
    
    additionalPosts.push({
      id: i,
      category: category[isZh ? 'zh' : 'en'],
      title,
      excerpt,
      content,
      date,
      readTime,
      slug: `${topic.toLowerCase().replace(/\s+/g, '-')}-${i}`,
      tags: [topic, category[isZh ? 'zh' : 'en']]
    });
  }
  
  // 合并所有文章
  return [...blogPosts, ...additionalPosts];
}

// 获取博客文章数据
function getBlogPost(locale: string, slug: string) {
  const posts = generateBlogPosts(locale);
  return posts.find(post => post.slug === slug);
}

export async function generateStaticParams(): Promise<{ locale: string; slug: string }[]> {
  const locales = ["en", "zh"];
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const posts = generateBlogPosts(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  
  const post = getBlogPost(params.locale, params.slug);
  if (!post) return {};
  
  return {
    title: post.title,
    description: post.excerpt
  };
}

export default function BlogDetailPage({
  params
}: {
  params: { locale: string; slug: string };
}) {
  if (!isLocale(params.locale)) notFound();
  
  const post = getBlogPost(params.locale, params.slug);
  if (!post) notFound();

  const isZh = params.locale === "zh";

  return (
    <main id="top" className="mx-auto w-full max-w-6xl px-6 py-10">
      <article>
        <header className="mb-10 rounded-2xl border border-gray-200 bg-white p-8 shadow-soft">
          <h1 className="text-[32px] font-semibold leading-tight text-gray-900">
            {post.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString(isZh ? "zh-CN" : "en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {isZh ? "轻秒编辑部" : "FastTool Editorial"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-4 w-4" />
              {isZh ? `${post.readTime}分钟` : `${post.readTime} min read`}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {post.tags && post.tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                  <Tag className="h-3.5 w-3.5" />
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <a href="#" aria-label="Share to Twitter" className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Share to Facebook" className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Share to LinkedIn" className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-12">
          <section className="lg:col-span-8">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-soft">
              <div className="mx-auto max-w-[780px] text-[17px] leading-[1.7] text-gray-700" dangerouslySetInnerHTML={{ __html: post.content[isZh ? 'zh' : 'en'] }} />
            </div>
          </section>

          <aside className="space-y-6 lg:col-span-4">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
              <h3 className="mb-3 text-xl font-semibold text-gray-900">{isZh ? "文章分类" : "Category"}</h3>
              <p className="text-sm text-gray-700">{post.category}</p>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
              <h3 className="mb-3 text-xl font-semibold text-gray-900">{isZh ? "热门文章" : "Popular Posts"}</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {generateBlogPosts(params.locale).slice(0, 3).map((popularPost) => (
                  <li key={popularPost.id}>
                    <Link href={`/${params.locale}/blog/${popularPost.slug}`} className="hover:text-indigo-500 transition">
                      {popularPost.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex h-[250px] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white text-sm text-gray-500 shadow-soft">
              AD 300 x 250
            </section>
            <section className="flex h-[600px] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white text-sm text-gray-500 shadow-soft">
              AD 300 x 600
            </section>
          </aside>
        </div>

        <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-8 shadow-soft">
          <h2 className="mb-5 text-2xl font-semibold text-gray-900">{isZh ? "相关文章" : "Related Articles"}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {generateBlogPosts(params.locale)
              .filter(relatedPost => relatedPost.id !== post.id && relatedPost.category === post.category)
              .slice(0, 3)
              .map((relatedPost) => (
                <Link key={relatedPost.id} href={`/${params.locale}/blog/${relatedPost.slug}`} className="rounded-xl border border-gray-200 p-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                  {relatedPost.title}
                </Link>
              ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-soft">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">{isZh ? "发表评论" : "Leave a Comment"}</h2>
          <form className="grid gap-4">
            <input
              type="text"
              placeholder={isZh ? "姓名" : "Name"}
              className="h-11 rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-indigo-400"
            />
            <input
              type="email"
              placeholder={isZh ? "邮箱" : "Email"}
              className="h-11 rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-indigo-400"
            />
            <textarea
              placeholder={isZh ? "评论内容" : "Comment"}
              rows={5}
              className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
            />
            <button
              type="button"
              className="w-fit rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              {isZh ? "提交评论" : "Submit"}
            </button>
          </form>
        </section>

        <div className="mt-6 flex justify-end">
          <a
            href="#top"
            className="inline-flex items-center gap-1 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <ArrowUp className="h-4 w-4" />
            {isZh ? "回到顶部" : "Back to top"}
          </a>
        </div>
      </article>
    </main>
  );
}
