import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { isLocale } from "@/lib/i18n";

const PlaceholderTool = dynamic(() => import("@/components/tools/PlaceholderTool").then((module) => ({ default: module.PlaceholderTool })), {
  ssr: false,
});

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return {
    title: params.locale === "zh" ? "Remove Background（占位）" : "Remove Background | Online Free Background Removal Tool - FastTool",
    description:
      params.locale === "zh"
        ? "背景移除功能占位页，后续可接入 AI 抠图能力。"
        : "Placeholder page for future AI background removal."
  };
}


export default function RemoveBackgroundPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  return (
    <PlaceholderTool
      locale={params.locale}
      title={params.locale === "zh" ? "Remove Background（占位）" : "Remove Background (Placeholder)"}
      description={
        params.locale === "zh" ? "背景移除功能占位页，后续可接入 AI 抠图能力。" : "Placeholder page for future AI background removal."
      }
    />);
}