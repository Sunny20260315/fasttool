import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlaceholderTool } from "@/components/tools/PlaceholderTool";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "PNG 转 WEBP - 免费在线工具" : "PNG to WEBP Converter | Online Free Image Conversion Tool - FastTool",
    description:
      params.locale === "zh"
        ? "在线将 PNG 格式转换为 WEBP，支持浏览器本地处理，保护隐私并快速下载。"
        : "Convert PNG format to WEBP online with browser-side processing for speed and privacy."
  };
}

export default function PngToWebpPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  return (
    <PlaceholderTool
      locale={params.locale}
      title="PNG to WEBP"
      description={params.locale === "zh" ? "将 PNG 格式转换为更小体积的 WEBP。" : "Convert PNG files into smaller WEBP images."}
    />
  );
}
