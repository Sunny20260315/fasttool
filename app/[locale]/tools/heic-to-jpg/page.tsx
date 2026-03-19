import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

const HeicToJpgTool = dynamic(() => import("@/components/tools/HeicToJpgTool").then((module) => ({ default: module.HeicToJpgTool })), {
  ssr: false,
});

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "HEIC 转 JPG - 免费在线工具" : "HEIC to JPG Converter | Online Free Image Conversion Tool - FastTool",
    description:
      params.locale === "zh"
        ? "在线将 HEIC 格式转换为 JPG，支持浏览器本地处理，保护隐私并快速下载。"
        : "Convert HEIC format to JPG online with browser-side processing for speed and privacy."
  };
}


export default function HeicToJpgPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  return (
    <ToolLayout
      locale={params.locale}
      title={params.locale === "zh" ? "HEIC 转 JPG" : "HEIC to JPG"}
      description={
        params.locale === "zh"
          ? "将 HEIC 格式快速转换为 JPG 格式。"
          : "Quickly convert HEIC format to JPG."
      }
      introduction={
        params.locale === "zh"
          ? "该工具使用浏览器端 Canvas API 进行格式转换，在不上传原图的前提下完成转换，适合处理苹果设备拍摄的照片。"
          : "This tool uses browser-side Canvas API to convert images without uploading originals, ideal for processing photos taken with Apple devices."
      }
      howToSteps={
        params.locale === "zh"
          ? ["上传 HEIC 图片", "点击开始转换", "下载转换后的 JPG 图片"]
          : ["Upload HEIC images", "Click convert", "Download the converted JPG images"]
      }
      faq={[
        {
          question: params.locale === "zh" ? "支持哪些输入格式？" : "Which input formats are supported?",
          answer:
            params.locale === "zh"
              ? "支持 HEIC 格式图片。" 
              : "HEIC format images are supported."
        },
        {
          question: params.locale === "zh" ? "转换后的图片质量如何？" : "What is the quality of the converted image?",
          answer: params.locale === "zh" ? "转换后的图片质量与原图保持一致。" : "The converted image maintains the same quality as the original."
        }
      ]}
    >
      <HeicToJpgTool locale={params.locale} />
    </ToolLayout>);
}