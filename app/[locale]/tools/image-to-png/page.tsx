import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImageConverterTool } from "@/components/tools/ImageConverterTool";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "图片转 PNG - 免费在线工具" : "Image to PNG Converter | Online Free Image Conversion Tool - FastTool",
    description:
      params.locale === "zh"
        ? "在线将图片格式转换为 PNG，支持浏览器本地处理，保护隐私并快速下载。"
        : "Convert images to PNG format online with browser-side processing for speed and privacy."
  };
}

export default function ImageToPngPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  return (
    <ToolLayout
      locale={params.locale}
      title={params.locale === "zh" ? "图片转 PNG" : "Image to PNG"}
      description={
        params.locale === "zh"
          ? "将各种图片格式快速转换为 PNG 格式。"
          : "Quickly convert various image formats to PNG."
      }
      introduction={
        params.locale === "zh"
          ? "该工具使用浏览器端 Canvas API 进行格式转换，在不上传原图的前提下完成转换，适合需要透明背景的图片。"
          : "This tool uses browser-side Canvas API to convert images without uploading originals, ideal for images that need transparent backgrounds."
      }
      howToSteps={
        params.locale === "zh"
          ? ["上传图片", "点击开始转换", "下载转换后的 PNG 图片"]
          : ["Upload your image", "Click convert", "Download the converted PNG image"]
      }
      faq={[
        {
          question: params.locale === "zh" ? "支持哪些输入格式？" : "Which input formats are supported?",
          answer:
            params.locale === "zh"
              ? "支持常见图片格式如 JPG、WebP、BMP 等。"
              : "Common formats including JPG, WebP, BMP, and more are supported."
        },
        {
          question: params.locale === "zh" ? "转换后的图片质量如何？" : "What is the quality of the converted image?",
          answer: params.locale === "zh" ? "转换后的图片质量与原图保持一致。" : "The converted image maintains the same quality as the original."
        }
      ]}
    >
      <ImageConverterTool locale={params.locale} targetFormat="png" mimeType="image/png" />
    </ToolLayout>
  );
}
