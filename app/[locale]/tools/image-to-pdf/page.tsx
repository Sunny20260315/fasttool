import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

const GenericPdfConverterTool = dynamic(() => import("@/components/tools/GenericPdfConverterTool").then((module) => ({ default: module.GenericPdfConverterTool })), {
  ssr: false,
});

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "图片转PDF - 免费在线工具" : "Image to PDF Converter | Online Free Image Conversion Tool - FastTool",
    description:
      params.locale === "zh"
        ? "在线将图片合并为 PDF，支持浏览器本地处理，保护隐私并快速下载。"
        : "Merge images into one PDF online with browser-side processing for privacy."
  };
}


export default function ImageToPdfPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  return (
    <ToolLayout
      locale={params.locale}
      title={params.locale === "zh" ? "图片转PDF" : "Image to PDF"}
      description={
        params.locale === "zh"
          ? "将图片合并为 PDF。"
          : "Merge images into one PDF."
      }
      introduction={
        params.locale === "zh"
          ? "该工具使用浏览器端技术将图片合并为 PDF，在不上传文件的前提下完成处理，保护用户隐私。"
          : "This tool uses browser-side technology to merge images into PDF without uploading originals, protecting user privacy."
      }
      howToSteps={
        params.locale === "zh"
          ? ["上传图片文件", "点击开始转换", "下载合并后的 PDF 文件"]
          : ["Upload image files", "Click convert", "Download merged PDF file"]
      }
      faq={[
        {
          question: params.locale === "zh" ? "支持哪些图片格式？" : "Which image formats are supported?",
          answer:
            params.locale === "zh"
              ? "支持常见图片格式如 JPG、PNG、WebP、GIF、BMP 等。" 
              : "Common formats including JPG, PNG, WebP, GIF, BMP, and more are supported."
        },
        {
          question: params.locale === "zh" ? "图片会按照什么顺序合并？" : "In what order will images be merged?",
          answer: params.locale === "zh" ? "图片会按照上传的顺序合并到 PDF 中。" : "Images will be merged into PDF in the order they are uploaded."
        }
      ]}
    >
      <GenericPdfConverterTool 
        locale={params.locale} 
        targetFormat="pdf" 
        mimeType="application/pdf" 
        description={params.locale === "zh" ? "将多张图片合并为一个 PDF 文件" : "Merge multiple images into a single PDF file"}
      />
    </ToolLayout>);
}