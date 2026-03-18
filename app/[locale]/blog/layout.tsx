import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "博客 - FastTool" : "Blog - FastTool",
    description:
      params.locale === "zh"
        ? "浏览图片优化、格式转换与网站性能提升相关的实战文章。"
        : "Read practical articles about image optimization, format conversion, and web performance."
  };
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
