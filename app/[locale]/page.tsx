import type { Metadata } from "next";
import {
  ArrowRight,
  ChevronDown,
  CloudUpload,
  ShieldCheck,
  SquareStack,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ToolsGrid } from "@/components/ToolsGrid";
import { getMessages, isLocale } from "@/lib/i18n";

import BannerCarousel from "@/components/BannerCarousel";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const t = getMessages(params.locale);
  return {
    title: t.site.title,
    description: t.site.description,
  };
}

export default function LocaleHomePage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const t = getMessages(params.locale);
  const faqItems =
    params.locale === "zh"
      ? [
          {
            question: "我的图片处理安全吗？",
            answer:
              "是的。所有处理都在你的浏览器本地完成，文件不会离开你的设备，确保隐私与安全。",
          },
          {
            question: "有文件大小限制吗？",
            answer:
              "一般建议单张图片不超过 20MB，超大文件会受浏览器内存与设备性能影响。",
          },
          {
            question: "支持哪些图片格式？",
            answer: "当前支持常见格式如 JPG、PNG、WEBP，后续会持续扩展。",
          },
          {
            question: "需要注册账号吗？",
            answer: "不需要。核心工具可直接使用，无需注册登录。",
          },
          {
            question: "处理速度快吗？",
            answer: "通常在几秒内完成，具体速度取决于图片大小和设备性能。",
          },
        ]
      : [
          {
            question: "Are my images processed securely?",
            answer:
              "Yes. All image processing happens locally in your browser. Your files never leave your device.",
          },
          {
            question: "Is there a file size limit?",
            answer:
              "For best experience, keep single files under 20MB. Very large files depend on browser memory and device performance.",
          },
          {
            question: "What formats are supported?",
            answer:
              "Common formats like JPG, PNG, and WEBP are supported, with more formats coming soon.",
          },
          {
            question: "Do I need to create an account?",
            answer:
              "No account is required. Core tools are available instantly.",
          },
          {
            question: "How fast is the processing?",
            answer:
              "Most operations finish in seconds, depending on image size and your device.",
          },
        ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <main className="w-full">
      {/* Banner Carousel */}
      <BannerCarousel locale={params.locale} />

      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        {/* 热门工具 */}
        <section id="tools" className="mb-16">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">{t.home.popularTitle}</h2>
            <Link
              href={`/${params.locale}/tools`}
              className="inline-flex items-center gap-1 text-sm text-[#1273cf] transition hover:text-[#0f67ba]"
            >
              {params.locale === "zh" ? "查看全部工具" : "View all tools"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ToolsGrid locale={params.locale} limit={6} />
        </section>

        <section className="relative left-1/2 right-1/2 -mx-[50vw] mb-16 w-screen bg-white py-14">
          <div className="mx-auto w-full max-w-6xl px-6">
            <h2 className="mt-5 mb-12 text-center text-2xl font-semibold tracking-tight text-gray-900">
              {params.locale === "zh"
                ? "为什么选择FastTool"
                : "Why Choose Lightweight FastTool"}
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <article className="lift-hover rounded-2xl border border-transparent p-4 text-center">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-[0_10px_24px_rgba(59,130,246,0.3)]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-base font-semibold text-gray-900">
                  {params.locale === "zh" ? "安全可靠" : "Secure and Reliable"}
                </h3>
                <p className="text-sm text-gray-600">
                  {params.locale === "zh"
                    ? "我们承诺在处理文件后的30分钟后自动将文件从网站服务器永久删除，100%保障你的隐私。"
                    : "Processed files are automatically removed after a short retention period to better protect your privacy."}
                </p>
              </article>

              <article className="lift-hover rounded-2xl border border-transparent p-4 text-center">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-[0_10px_24px_rgba(249,115,22,0.3)]">
                  <SquareStack className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-base font-semibold text-gray-900">
                  {params.locale === "zh" ? "批量处理" : "Batch Processing"}
                </h3>
                <p className="text-sm text-gray-600">
                  {params.locale === "zh"
                    ? "批量进行图片格式转换，支持多种图片格式互转，满足您的转换需求。"
                    : "Convert and optimize multiple images in one flow to improve efficiency."}
                </p>
              </article>

              <article className="lift-hover rounded-2xl border border-transparent p-4 text-center">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-500 text-white shadow-[0_10px_24px_rgba(16,185,129,0.3)]">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-base font-semibold text-gray-900">
                  {params.locale === "zh" ? "快速高效" : "Fast and Efficient"}
                </h3>
                <p className="text-sm text-gray-600">
                  {params.locale === "zh"
                    ? "图片文件拖拽至转换区或点击添加按钮，将文件上传至平台，稍等片刻即可快速转换。"
                    : "Drag and drop images, tune settings, and get optimized outputs in seconds."}
                </p>
              </article>

              <article className="lift-hover rounded-2xl border border-transparent p-4 text-center">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-400 to-violet-600 text-white shadow-[0_10px_24px_rgba(139,92,246,0.3)]">
                  <CloudUpload className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-base font-semibold text-gray-900">
                  {params.locale === "zh" ? "云端引擎" : "Cloud Engine"}
                </h3>
                <p className="text-sm text-gray-600">
                  {params.locale === "zh"
                    ? "基于浏览器运行，整个过程依赖本地与轻量服务协同，无需额外下载安装客户端软件。"
                    : "Browser-first processing with lightweight cloud coordination, no extra app installation required."}
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="mb-2">
          <h2 className="mb-5 text-2xl font-semibold text-gray-900">
            {t.home.faqTitle}
          </h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-soft">
            {faqItems.map((item, index) => (
              <details
                key={item.question}
                open={index === 0}
                className={`group lift-hover rounded-xl ${index !== faqItems.length - 1 ? "border-b border-gray-200" : ""}`}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[1.1rem] font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronDown className="h-5 w-5 shrink-0 text-gray-500 transition group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-[0.95rem] leading-8 text-gray-600">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}
