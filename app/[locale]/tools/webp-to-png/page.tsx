import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { isLocale } from "@/lib/i18n";

const PlaceholderTool = dynamic(() => import("@/components/tools/PlaceholderTool").then((module) => ({ default: module.PlaceholderTool })), {
  ssr: false,
});

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "WEBP 转 PNG - 免费在线工具" : "WEBP to PNG Converter | Online Free Image Conversion Tool - FastTool",
    description:
      params.locale === "zh"
        ? "在线将 WEBP 格式转换为 PNG，支持浏览器本地处理，保护隐私并快速下载。"
        : "Convert WEBP format to PNG online with browser-side processing for speed and privacy."
  };
}


export default function WebpToPngPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  return (
    <PlaceholderTool
      locale={params.locale}
      title="WEBP to PNG"
      description={params.locale === "zh" ? "将 WEBP 格式转换为 PNG。" : "Convert WEBP files to PNG."}
    />);
}