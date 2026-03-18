import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompressImageTool } from "@/components/tools/CompressImageTool";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "图片压缩_在线免费压缩图片大小工具 - FastTool" : "Image Compressor | Online Free Image Compression Tool - FastTool",
    description:
      params.locale === "zh"
        ? "在免费在线图片压缩工具，支持JPG、PNG、WebP等格式，无损压缩，快速减小文件体积，无需下载。"
        : "Compress image files online with browser-side processing for speed and privacy."
  };
}

export default function CompressImagePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  return (
    <ToolLayout
      locale={params.locale}
      title={params.locale === "zh" ? "图片压缩" : "Compress Image"}
      description={
        params.locale === "zh"
          ? "快速压缩 JPG/PNG/WebP 图片，平衡画质与体积。"
          : "Quickly compress JPG/PNG/WebP images while balancing quality and size."
      }
      introduction={
        params.locale === "zh"
          ? "该工具使用浏览器端压缩能力，在不上传原图的前提下降低文件体积，适合网站性能优化和社媒发布。"
          : "This tool uses browser-side compression to reduce image size without uploading originals, ideal for web performance and social posting."
      }
      howToSteps={
        params.locale === "zh"
          ? ["上传图片", "选择低压缩/中压缩/高压缩", "点击开始压缩并下载"]
          : ["Upload your image", "Choose low/medium/high compression", "Click compress and download"]
      }
      faq={[
        {
          question: params.locale === "zh" ? "会损失画质吗？" : "Will quality be lost?",
          answer:
            params.locale === "zh"
              ? "压缩会带来一定损失，你可以通过低/中/高压缩等级平衡体积与清晰度。"
              : "Compression can reduce quality slightly. Use low/medium/high levels to balance quality and file size."
        },
        {
          question: params.locale === "zh" ? "支持哪些格式？" : "Which formats are supported?",
          answer: params.locale === "zh" ? "常见图片格式如 JPG、PNG、WebP 均可处理。" : "Common formats including JPG, PNG and WebP are supported."
        }
      ]}
    >
      <CompressImageTool locale={params.locale} />
    </ToolLayout>
  );
}
