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
    title: params.locale === "zh" ? "图片裁剪 - 免费在线工具" : "Crop Image | Online Free Image Cropping Tool - FastTool",
    description:
      params.locale === "zh"
        ? "在线裁剪图片，支持浏览器本地处理，保护隐私并快速下载。"
        : "Crop images online with browser-side processing for speed and privacy."
  };
}


export default function CropImagePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  return (
    <PlaceholderTool
      locale={params.locale}
      title={params.locale === "zh" ? "图片裁剪" : "Crop Image"}
      description={params.locale === "zh" ? "裁剪图片并保留目标区域。" : "Crop image to selected area."}
    />);
}