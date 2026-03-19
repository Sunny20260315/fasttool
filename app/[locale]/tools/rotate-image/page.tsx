import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

const RotateImageTool = dynamic(() => import("@/components/tools/RotateImageTool").then((module) => ({ default: module.RotateImageTool })), {
  ssr: false,
});

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "图片旋转 - 免费在线工具" : "Rotate Image | Online Free Image Rotation Tool - FastTool",
    description:
      params.locale === "zh"
        ? "在线旋转图片，支持浏览器本地处理，保护隐私并快速下载。"
        : "Rotate images online with browser-side processing for speed and privacy."
  };
}


export default function RotateImagePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  return (
    <ToolLayout
      locale={params.locale}
      title={params.locale === "zh" ? "图片旋转" : "Rotate Image"}
      description={
        params.locale === "zh"
          ? "按角度旋转图片并导出。"
          : "Rotate image by angle and export."
      }
      introduction={
        params.locale === "zh"
          ? "该工具使用浏览器端 Canvas API 进行图片旋转，在不上传原图的前提下完成处理，适合快速调整图片方向。"
          : "This tool uses browser-side Canvas API to rotate images without uploading originals, ideal for quickly adjusting image orientation."
      }
      howToSteps={
        params.locale === "zh"
          ? ["上传图片", "选择旋转角度", "点击开始旋转", "下载旋转后的图片"]
          : ["Upload your image", "Select rotation angle", "Click rotate", "Download the rotated image"]
      }
      faq={[
        {
          question: params.locale === "zh" ? "支持哪些输入格式？" : "Which input formats are supported?",
          answer:
            params.locale === "zh"
              ? "支持常见图片格式如 JPG、PNG、WebP、BMP 等。"
              : "Common formats including JPG, PNG, WebP, BMP, and more are supported."
        },
        {
          question: params.locale === "zh" ? "旋转后的图片质量如何？" : "What is the quality of the rotated image?",
          answer: params.locale === "zh" ? "旋转后的图片质量与原图保持一致。" : "The rotated image maintains the same quality as the original."
        }
      ]}
    >
      <RotateImageTool locale={params.locale} />
    </ToolLayout>);
}