import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImageToBase64Tool } from "@/components/tools/ImageToBase64Tool";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "图片转 Base64 - 免费在线工具" : "Image to Base64 Converter | Online Free Image Encoding Tool - FastTool",
    description:
      params.locale === "zh"
        ? "在线将图片转换为 Base64 编码，支持浏览器本地处理，保护隐私。"
        : "Convert images to Base64 encoding online with browser-side processing for privacy."
  };
}

export default function ImageToBase64Page({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  return (
    <ToolLayout
      locale={params.locale}
      title={params.locale === "zh" ? "图片转 Base64" : "Image to Base64"}
      description={
        params.locale === "zh"
          ? "将图片编码为 Base64 文本。"
          : "Encode image files into Base64 text."
      }
      introduction={
        params.locale === "zh"
          ? "该工具使用浏览器端 FileReader API 进行 Base64 编码，在不上传原图的前提下完成处理，保护用户隐私。"
          : "This tool uses browser-side FileReader API for Base64 encoding without uploading originals, protecting user privacy."
      }
      howToSteps={
        params.locale === "zh"
          ? ["上传图片", "选择输出格式", "点击转换", "复制或下载 Base64 编码"]
          : ["Upload image", "Select output format", "Click convert", "Copy or download Base64 encoding"]
      }
      faq={[
        {
          question: params.locale === "zh" ? "什么是 Base64？" : "What is Base64?",
          answer:
            params.locale === "zh"
              ? "Base64 是一种基于64个可打印字符来表示二进制数据的编码方式，常用于在文本文件中存储或传输二进制数据。"
              : "Base64 is an encoding method that represents binary data using 64 printable characters, commonly used to store or transmit binary data in text files."
        },
        {
          question: params.locale === "zh" ? "支持哪些输入格式？" : "Which input formats are supported?",
          answer: params.locale === "zh" ? "支持常见图片格式如 JPG、PNG、WebP、GIF、BMP 等。" : "Common formats including JPG, PNG, WebP, GIF, BMP, and more are supported."
        }
      ]}
    >
      <ImageToBase64Tool locale={params.locale} />
    </ToolLayout>
  );
}
