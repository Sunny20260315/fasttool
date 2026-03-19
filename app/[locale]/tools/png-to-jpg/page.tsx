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
    title: params.locale === "zh" ? "PNG 转 JPG - 免费在线工具" : "PNG to JPG Converter | Online Free Image Conversion Tool - FastTool",
    description:
      params.locale === "zh"
        ? "在线将 PNG 格式转换为 JPG，支持浏览器本地处理，保护隐私并快速下载。"
        : "Convert PNG format to JPG online with browser-side processing for speed and privacy."
  };
}


export default function PngToJpgPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  return (
    <PlaceholderTool
      locale={params.locale}
      title="PNG to JPG"
      description={params.locale === "zh" ? "将 PNG 格式快速转换为 JPG。" : "Convert PNG files to JPG quickly."}
    />);
}