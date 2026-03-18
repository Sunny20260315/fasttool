"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n";
import { resizeImage } from "@/lib/image/resize";
import { formatFileSize } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DownloadButton } from "@/components/DownloadButton";
import { ImagePreview } from "@/components/ImagePreview";
import { SettingsPanel } from "@/components/SettingsPanel";
import { UploadArea, type UploadedImage } from "@/components/UploadArea";

type Props = {
  locale: Locale;
};

type ResizeMode = "percentage" | "dimensions" | "preset";

export function ImageResizerTool({ locale }: Props) {
  const t = getMessages(locale);
  const [uploaded, setUploaded] = useState<UploadedImage | null>(null);
  const [resizeMode, setResizeMode] = useState<ResizeMode>("dimensions");
  
  // 尺寸设置
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(50);
  const [preset, setPreset] = useState<string>("");
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  
  // 输出设置
  const [outputFormat, setOutputFormat] = useState<string>("image/jpeg");
  
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ file: File; url: string } | null>(null);

  useEffect(() => {
    return () => {
      if (result?.url) URL.revokeObjectURL(result.url);
    };
  }, [result]);

  // 当上传图片时，初始化尺寸
  useEffect(() => {
    if (uploaded) {
      setWidth(uploaded.width);
      setHeight(uploaded.height);
      setResult(null);
    }
  }, [uploaded]);

  // 保持宽高比
  useEffect(() => {
    if (!uploaded || !maintainAspectRatio) return;
    
    const aspectRatio = uploaded.width / uploaded.height;
    
    if (resizeMode === "dimensions") {
      // 根据宽度自动计算高度，或根据高度自动计算宽度
      const newHeight = Math.round(width / aspectRatio);
      if (newHeight !== height && width > 0) {
        setHeight(newHeight);
      }
    }
  }, [width, uploaded, maintainAspectRatio, resizeMode]);

  // 预设尺寸
  const presets = [
    { name: locale === "zh" ? "自定义" : "Custom", value: "" },
    { name: "1920x1080 (Full HD)", value: "1920x1080" },
    { name: "1280x720 (HD)", value: "1280x720" },
    { name: "800x600", value: "800x600" },
    { name: "640x480", value: "640x480" },
    { name: "Instagram Square (1080x1080)", value: "1080x1080" },
    { name: "Instagram Portrait (1080x1350)", value: "1080x1350" },
    { name: "Twitter Post (1200x675)", value: "1200x675" },
  ];

  const handlePresetChange = (value: string) => {
    setPreset(value);
    if (value) {
      const [w, h] = value.split("x").map(Number);
      setWidth(w);
      setHeight(h);
    }
  };

  const runResize = async () => {
    if (!uploaded) return;
    
    let targetWidth = width;
    let targetHeight = height;

    // 根据模式计算目标尺寸
    if (resizeMode === "percentage") {
      targetWidth = Math.round(uploaded.width * (percentage / 100));
      targetHeight = Math.round(uploaded.height * (percentage / 100));
    } else if (resizeMode === "preset" && preset) {
      const [w, h] = preset.split("x").map(Number);
      targetWidth = w;
      targetHeight = h;
    }

    if (targetWidth <= 0 || targetHeight <= 0) {
      alert(locale === "zh" ? "请输入有效的尺寸" : "Please enter valid dimensions");
      return;
    }

    setProcessing(true);
    try {
      if (result?.url) URL.revokeObjectURL(result.url);
      
      const resized = await resizeImage(uploaded.file, targetWidth, targetHeight, outputFormat);
      const url = URL.createObjectURL(resized);
      setResult({ file: resized, url });
    } catch (error) {
      console.error("Resize error:", error);
      alert(locale === "zh" ? "调整尺寸失败" : "Failed to resize image");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <UploadArea
          locale={locale}
          onFileSelect={(file: UploadedImage) => {
            setUploaded(file);
            setResult(null);
          }}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <ImagePreview
            title={locale === "zh" ? "原图预览" : "Original Preview"}
            src={uploaded?.previewUrl}
            alt="original-image"
            description={uploaded ? `${uploaded.width} x ${uploaded.height}` : undefined}
          />
          <ImagePreview
            title={locale === "zh" ? "调整后预览" : "Resized Preview"}
            src={result?.url}
            alt="resized-image"
            description={result 
              ? `${result.file.name.split(".")[0]} (${formatFileSize(result.file.size)})`
              : t.tool.noResult}
          />
        </div>

        <div className="grid gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-soft sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs text-gray-500">{locale === "zh" ? "原始尺寸" : "Original Size"}</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {uploaded ? `${uploaded.width} x ${uploaded.height}` : "-"}
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs text-gray-500">{locale === "zh" ? "调整后尺寸" : "Resized Size"}</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {result ? `${result.file.name.split(".")[0].replace(/\D/g, "") || "N/A"}` : "-"}
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs text-gray-500">{locale === "zh" ? "文件大小" : "File Size"}</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {result ? formatFileSize(result.file.size) : uploaded ? formatFileSize(uploaded.file.size) : "-"}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <SettingsPanel title={t.tool.settings}>
          {/* 调整模式选择 */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {locale === "zh" ? "调整模式" : "Resize Mode"}
            </label>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setResizeMode("dimensions")}
                className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                  resizeMode === "dimensions"
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {locale === "zh" ? "指定尺寸" : "Dimensions"}
              </button>
              <button
                type="button"
                onClick={() => setResizeMode("percentage")}
                className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                  resizeMode === "percentage"
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {locale === "zh" ? "百分比缩放" : "Percentage"}
              </button>
              <button
                type="button"
                onClick={() => setResizeMode("preset")}
                className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                  resizeMode === "preset"
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {locale === "zh" ? "预设尺寸" : "Presets"}
              </button>
            </div>
          </div>

          {/* 按模式显示不同输入 */}
          {resizeMode === "dimensions" && (
            <div className="mb-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-600">
                    {locale === "zh" ? "宽度 (px)" : "Width (px)"}
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-gray-500 focus:outline-none"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">
                    {locale === "zh" ? "高度 (px)" : "Height (px)"}
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-gray-500 focus:outline-none"
                    min="1"
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={maintainAspectRatio}
                  onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                {locale === "zh" ? "保持宽高比" : "Maintain aspect ratio"}
              </label>
            </div>
          )}

          {resizeMode === "percentage" && (
            <div className="mb-4">
              <label className="block text-sm text-gray-600">
                {locale === "zh" ? "缩放百分比" : "Scale Percentage"}
              </label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="range"
                  value={percentage}
                  onChange={(e) => setPercentage(Number(e.target.value))}
                  className="flex-1"
                  min="1"
                  max="200"
                />
                <span className="w-16 text-right font-medium">{percentage}%</span>
              </div>
              {uploaded && (
                <p className="mt-2 text-xs text-gray-500">
                  {locale === "zh"
                    ? `结果：${Math.round(uploaded.width * (percentage / 100))} x ${Math.round(uploaded.height * (percentage / 100))}`
                    : `Result: ${Math.round(uploaded.width * (percentage / 100))} x ${Math.round(uploaded.height * (percentage / 100))}`}
                </p>
              )}
            </div>
          )}

          {resizeMode === "preset" && (
            <div className="mb-4">
              <label className="block text-sm text-gray-600">
                {locale === "zh" ? "选择预设" : "Select Preset"}
              </label>
              <select
                value={preset}
                onChange={(e) => handlePresetChange(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-gray-500 focus:outline-none"
              >
                {presets.map((p) => (
                  <option key={p.value || "custom"} value={p.value}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 输出格式设置 */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600">
              {locale === "zh" ? "输出格式" : "Output Format"}
            </label>
            <select
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-gray-500 focus:outline-none"
            >
              <option value="image/jpeg">JPEG</option>
              <option value="image/png">PNG</option>
              <option value="image/webp">WebP</option>
            </select>
          </div>

          <Button onClick={runResize} disabled={!uploaded || processing} className="w-full">
            {processing ? t.tool.processing : t.tool.run}
          </Button>
        </SettingsPanel>

        <DownloadButton
          label={t.tool.download}
          href={result?.url}
          filename={result?.file.name || "resized-image.jpg"}
        />
      </div>
    </div>
  );
}
