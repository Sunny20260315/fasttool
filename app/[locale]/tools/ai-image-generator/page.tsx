import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AiImageGeneratorTool } from "@/components/tools/AiImageGeneratorTool";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "AI 生图 - 在线工具" : "AI Image Generator | Online Free AI Image Generation Tool - FastTool",
    description:
      params.locale === "zh"
        ? "前端纯实现 AI 生图工具，支持提示词、尺寸、风格和历史记录。"
        : "Frontend-only AI image generator with prompt, size, style and local history."
  };
}

export default function AiImageGeneratorPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();

  return (
    <ToolLayout
      locale={params.locale}
      title={params.locale === "zh" ? "AI 生图工具" : "AI Image Generator"}
      description={
        params.locale === "zh"
          ? "输入提示词并选择尺寸/风格，前端直连第三方接口生成图片。"
          : "Generate images from prompts using a frontend-only API call."
      }
      introduction={
        params.locale === "zh"
          ? "本工具无后端依赖，直接在前端调用第三方生图 API。图片仅在浏览器展示，历史记录保存在 localStorage。"
          : "This tool uses a frontend-only integration with third-party image APIs. Output is shown in-browser and history is stored in localStorage."
      }
      howToSteps={
        params.locale === "zh"
          ? ["输入提示词（必填）", "选择尺寸和风格", "点击生成并下载结果"]
          : ["Enter prompt (required)", "Choose size and style", "Generate and download result"]
      }
      faq={[
        {
          question: params.locale === "zh" ? "为什么会提示 CORS 错误？" : "Why do I get CORS errors?",
          answer:
            params.locale === "zh"
              ? "说明目标接口不支持前端跨域直连，可更换支持 CORS 的接口或使用开发代理。"
              : "The target API may not allow browser cross-origin requests. Use a CORS-enabled endpoint or a dev proxy."
        },
        {
          question: params.locale === "zh" ? "历史记录存在哪里？" : "Where is history stored?",
          answer:
            params.locale === "zh"
              ? "历史记录仅保存在当前浏览器 localStorage，不会上传到服务器。"
              : "History is stored only in your browser localStorage and never uploaded."
        }
      ]}
    >
      <AiImageGeneratorTool locale={params.locale} />
    </ToolLayout>
  );
}
