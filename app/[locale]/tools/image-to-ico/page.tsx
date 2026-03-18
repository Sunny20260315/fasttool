import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImageToIcoTool } from "@/components/tools/ImageToIcoTool";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "图片转 ICO - 免费在线工具" : "Image to ICO Converter | Online Free Image Conversion Tool - FastTool",
    description:
      params.locale === "zh"
        ? "在线将图片格式转换为 ICO，支持浏览器本地处理，保护隐私并快速下载。"
        : "Convert images to ICO format online with browser-side processing for speed and privacy."
  };
}

export default function ImageToIcoPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  return (
    <ToolLayout
      locale={params.locale}
      title={params.locale === "zh" ? "图片转 ICO" : "Image to ICO"}
      description={
        params.locale === "zh"
          ? "将各种图片格式快速转换为 ICO 格式。"
          : "Quickly convert various image formats to ICO."
      }
      introduction={
        params.locale === "zh"
          ? "该工具使用浏览器端 Canvas API 进行格式转换，在不上传原图的前提下完成转换，适合创建网站 favicon 和应用图标。"
          : "This tool uses browser-side Canvas API to convert images without uploading originals, ideal for creating website favicons and application icons."
      }
      howToSteps={
        params.locale === "zh"
          ? ["上传图片", "点击开始转换", "下载转换后的 ICO 图标"]
          : ["Upload your image", "Click convert", "Download the converted ICO icon"]
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
          question: params.locale === "zh" ? "转换后的图标尺寸是多少？" : "What is the size of the converted icon?",
          answer: params.locale === "zh" ? "转换后的图标尺寸会自动调整为适合 ICO 格式的大小，最大为 64x64 像素。" : "The converted icon size is automatically adjusted to be suitable for ICO format, up to 64x64 pixels."
        }
      ]}
    >
      <ImageToIcoTool locale={params.locale} />
    </ToolLayout>
  );
}
