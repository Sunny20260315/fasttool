"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Download, Loader2, RefreshCcw, Trash2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  generateImageWithApi,
  type ImageSize,
  type ImageStyle
} from "@/lib/ai/generate-image";

type Props = {
  locale: Locale;
};

type HistoryItem = {
  id: string;
  prompt: string;
  size: ImageSize;
  style: ImageStyle;
  imageSrc: string;
  createdAt: string;
};

const HISTORY_STORAGE_KEY = "ai-image-history-v1";

const SIZE_OPTIONS: ImageSize[] = ["512x512", "1024x1024", "1024x1792"];

const STYLE_OPTIONS: Array<{ value: ImageStyle; zh: string; en: string }> = [
  { value: "", zh: "默认", en: "Default" },
  { value: "anime", zh: "二次元", en: "Anime" },
  { value: "realistic", zh: "写实", en: "Realistic" },
  { value: "cartoon", zh: "卡通", en: "Cartoon" },
  { value: "oil-painting", zh: "油画", en: "Oil Painting" }
];

function fileNameFromPrompt(prompt: string) {
  const clean = prompt
    .slice(0, 24)
    .replace(/[^\w\u4e00-\u9fa5-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return `${clean || "ai-image"}-${Date.now()}.png`;
}

async function toDataUrlByFetch(src: string) {
  const response = await fetch(src);
  const blob = await response.blob();
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("图片读取失败"));
    reader.readAsDataURL(blob);
  });
}

export function AiImageGeneratorTool({ locale }: Props) {
  const isZh = locale === "zh";
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState<ImageSize>("512x512");
  const [style, setStyle] = useState<ImageStyle>("");
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as HistoryItem[];
      if (Array.isArray(parsed)) setHistory(parsed);
    } catch {
      // 忽略无效历史记录
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const canGenerate = useMemo(() => prompt.trim().length > 0 && !loading, [prompt, loading]);

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const result = await generateImageWithApi({
        prompt: prompt.trim(),
        size,
        style
      });

      // 为了能稳定保存到 localStorage，这里把输出统一转换成 dataURL。
      const dataUrl = await toDataUrlByFetch(result.imageSrc);
      setImageSrc(dataUrl);

      const record: HistoryItem = {
        id: `${Date.now()}`,
        prompt: prompt.trim(),
        size,
        style,
        imageSrc: dataUrl,
        createdAt: new Date().toISOString()
      };

      setHistory((prev) => [record, ...prev].slice(0, 20));
    } catch (err) {
      const message = err instanceof Error ? err.message : "生成失败，请检查网络或稍后重试";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async (src: string) => {
    const response = await fetch(src);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileNameFromPrompt(prompt || "ai-generated-image");
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{isZh ? "AI 生图参数" : "AI Image Form"}</CardTitle>
          <CardDescription>
            {isZh
              ? "纯前端调用第三方接口，无后端存储。"
              : "Frontend-only generation with third-party API."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-800">
              {isZh ? "提示词（必填）" : "Prompt (required)"}
            </label>
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder={
                isZh
                  ? "示例：治愈系猫咪，二次元风格，蓝天白云"
                  : "Example: healing cat, anime style, blue sky and clouds"
              }
              rows={4}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-indigo-400"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-800">{isZh ? "图片尺寸" : "Image Size"}</p>
            <div className="flex flex-wrap gap-2">
              {SIZE_OPTIONS.map((value) => (
                <label
                  key={value}
                  className={`cursor-pointer rounded-lg border px-3 py-1.5 text-sm transition ${
                    size === value ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="image-size"
                    value={value}
                    checked={size === value}
                    onChange={() => setSize(value)}
                    className="hidden"
                  />
                  {value}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-800">{isZh ? "风格" : "Style"}</label>
            <select
              value={style}
              onChange={(event) => setStyle(event.target.value as ImageStyle)}
              className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none transition focus:border-indigo-400"
            >
              {STYLE_OPTIONS.map((item) => (
                <option key={item.value || "default"} value={item.value}>
                  {isZh ? item.zh : item.en}
                </option>
              ))}
            </select>
          </div>

          <Button onClick={generate} disabled={!canGenerate} className="h-10 min-w-[130px]">
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {isZh ? "生成中..." : "Generating..."}
              </span>
            ) : isZh ? (
              "生成图片"
            ) : (
              "Generate"
            )}
          </Button>

          {error ? <p className="text-sm text-red-600">{isZh ? `生成失败：${error}` : `Generation failed: ${error}`}</p> : null}

          <p className="text-xs text-gray-500">
            {isZh
              ? "如遇跨域问题，请确认第三方接口支持 CORS；若不支持，可使用前端开发代理进行调试。"
              : "If CORS fails, make sure the API supports cross-origin access or use a local proxy during development."}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{isZh ? "生成结果" : "Result"}</CardTitle>
        </CardHeader>
        <CardContent>
          {imageSrc ? (
            <div className="space-y-4">
              <Image
                src={imageSrc}
                alt={isZh ? "AI 生成结果" : "AI generated result"}
                width={800}
                height={800}
                className="w-full max-w-[800px] rounded-xl border border-gray-200 object-contain"
                loading="lazy"
              />
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={async () => {
                    await downloadImage(imageSrc);
                  }}
                >
                  <Download className="mr-1 h-4 w-4" />
                  {isZh ? "下载图片" : "Download"}
                </Button>
                <Button variant="outline" onClick={generate} disabled={loading || !prompt.trim()}>
                  <RefreshCcw className="mr-1 h-4 w-4" />
                  {isZh ? "重新生成" : "Regenerate"}
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              {isZh ? "生成成功后会在这里展示图片。" : "Generated image will appear here."}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{isZh ? "历史记录（本地）" : "Local History"}</CardTitle>
          <CardDescription>
            {isZh ? "仅保存在当前浏览器 localStorage，可随时清空。" : "Stored in browser localStorage only."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-end">
            <Button variant="ghost" onClick={() => setHistory([])} disabled={history.length === 0}>
              <Trash2 className="mr-1 h-4 w-4" />
              {isZh ? "清空历史" : "Clear history"}
            </Button>
          </div>
          {history.length === 0 ? (
            <p className="text-sm text-gray-500">{isZh ? "暂无历史记录。" : "No history yet."}</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {history.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setPrompt(item.prompt);
                    setSize(item.size);
                    setStyle(item.style);
                    setImageSrc(item.imageSrc);
                  }}
                  className="rounded-xl border border-gray-200 bg-white p-3 text-left transition hover:bg-gray-50"
                >
                  <Image
                    src={item.imageSrc}
                    alt={item.prompt}
                    width={400}
                    height={300}
                    className="mb-2 h-28 w-full rounded-lg object-cover"
                    loading="lazy"
                  />
                  <p className="line-clamp-2 text-sm font-medium text-gray-800">{item.prompt}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {item.size} · {new Date(item.createdAt).toLocaleString()}
                  </p>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
