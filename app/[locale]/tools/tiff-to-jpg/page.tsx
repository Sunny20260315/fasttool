import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

const ImageConverterTool = dynamic(() => import("@/components/tools/ImageConverterTool").then((module) => ({ default: module.ImageConverterTool })), {
  ssr: false,
});

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "TIFF 转 JPG - 免费在线工具" : "TIFF to JPG Converter | Online Free Image Conversion Tool - FastTool",
    description:
      params.locale === "zh"
        ? "在线将 TIFF 格式转换为 JPG，支持浏览器本地处理，保护隐私并快速下载。"
        : "Convert TIFF format to JPG online with browser-side processing for speed and privacy."
  };
}


export default function TiffToJpgPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  return (
    <ToolLayout
      locale={params.locale}
      title={params.locale === "zh" ? "TIFF 转 JPG" : "TIFF to JPG"}
      description={
        params.locale === "zh"
          ? "将 TIFF 格式快速转换为 JPG 格式。"
          : "Quickly convert TIFF format to JPG."
      }
      introduction={
        params.locale === "zh"
          ? "该工具使用浏览器端 Canvas API 进行格式转换，在不上传原图的前提下完成转换，适合处理专业摄影和印刷行业的图片。"
          : "This tool uses browser-side Canvas API to convert images without uploading originals, ideal for processing photos from professional photography and printing industries."
      }
      howToSteps={
        params.locale === "zh"
          ? ["上传 TIFF 图片", "点击开始转换", "下载转换后的 JPG 图片"]
          : ["Upload TIFF images", "Click convert", "Download the converted JPG images"]
      }
      faq={[
        {
          question: params.locale === "zh" ? "支持哪些输入格式？" : "Which input formats are supported?",
          answer:
            params.locale === "zh"
              ? "支持 TIFF 格式图片。" 
              : "TIFF format images are supported."
        },
        {
          question: params.locale === "zh" ? "转换后的图片质量如何？" : "What is the quality of the converted image?",
          answer: params.locale === "zh" ? "转换后的图片质量与原图保持一致。" : "The converted image maintains the same quality as the original."
        }
      ]}
    >
      <ImageConverterTool locale={params.locale} targetFormat="jpg" mimeType="image/jpeg" />
    </ToolLayout>);
}