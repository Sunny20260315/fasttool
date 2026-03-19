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
    title: params.locale === "zh" ? "图片转 BMP - 免费在线工具" : "Image to BMP Converter | Online Free Image Conversion Tool - FastTool",
    description:
      params.locale === "zh"
        ? "在线将图片格式转换为 BMP，支持浏览器本地处理，保护隐私并快速下载。"
        : "Convert images to BMP format online with browser-side processing for speed and privacy."
  };
}


export default function ImageToBmpPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  return (
    <ToolLayout
      locale={params.locale}
      title={params.locale === "zh" ? "图片转 BMP" : "Image to BMP"}
      description={
        params.locale === "zh"
          ? "将各种图片格式快速转换为 BMP 格式。"
          : "Quickly convert various image formats to BMP."
      }
      introduction={
        params.locale === "zh"
          ? "该工具使用浏览器端 Canvas API 进行格式转换，在不上传原图的前提下完成转换，适合需要无损格式的场景。"
          : "This tool uses browser-side Canvas API to convert images without uploading originals, ideal for scenarios requiring lossless format."
      }
      howToSteps={
        params.locale === "zh"
          ? ["上传图片", "点击开始转换", "下载转换后的 BMP 图片"]
          : ["Upload your image", "Click convert", "Download the converted BMP image"]
      }
      faq={[
        {
          question: params.locale === "zh" ? "支持哪些输入格式？" : "Which input formats are supported?",
          answer:
            params.locale === "zh"
              ? "支持常见图片格式如 JPG、PNG、WebP 等。"
              : "Common formats including JPG、PNG、WebP, and more are supported."
        },
        {
          question: params.locale === "zh" ? "转换后的图片质量如何？" : "What is the quality of the converted image?",
          answer: params.locale === "zh" ? "转换后的图片质量与原图保持一致。" : "The converted image maintains the same quality as the original."
        }
      ]}
    >
      <ImageConverterTool locale={params.locale} targetFormat="bmp" mimeType="image/bmp" />
    </ToolLayout>);
}