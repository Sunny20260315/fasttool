"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import type { Locale } from "@/lib/i18n";
import { formatFileSize } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DownloadButton } from "@/components/DownloadButton";
import { SettingsPanel } from "@/components/SettingsPanel";
import { UploadArea, type UploadedImage } from "@/components/UploadArea";
import { ImagePreview } from "@/components/ImagePreview";

type Props = {
  locale: Locale;
};

type AspectRatio = "free" | "1:1" | "4:3" | "16:9" | "9:16" | "3:4";

const aspectRatioOptions: { value: AspectRatio; label: string }[] = [
  { value: "free", label: "自由" },
  { value: "1:1", label: "1:1" },
  { value: "4:3", label: "4:3" },
  { value: "16:9", label: "16:9" },
  { value: "9:16", label: "9:16" },
  { value: "3:4", label: "3:4" },
];

export function CropImageTool({ locale }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [uploaded, setUploaded] = useState<UploadedImage | null>(null);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("free");

  // 裁剪区域状态
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState<
    "move" | "resize-nw" | "resize-ne" | "resize-sw" | "resize-se" | null
  >(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cropStart, setCropStart] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // 图像显示状态
  const [imageScale, setImageScale] = useState(1);
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });

  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ file: File; url: string } | null>(
    null,
  );

  useEffect(() => {
    return () => {
      if (result?.url) URL.revokeObjectURL(result.url);
    };
  }, [result]);

  // 当上传图片时，初始化裁剪区域
  useEffect(() => {
    if (uploaded && containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;

      // 计算缩放比例，确保图片能完整显示
      const scaleX = containerWidth / uploaded.width;
      const scaleY = containerHeight / uploaded.height;
      const scale = Math.min(scaleX, scaleY, 1);

      setImageScale(scale);
      setImageOffset({
        x: (containerWidth - uploaded.width * scale) / 2,
        y: (containerHeight - uploaded.height * scale) / 2,
      });

      // 设置初始裁剪区域（取图片中心的正方形区域）
      const cropSize = Math.min(uploaded.width, uploaded.height) * 0.6;
      setCropArea({
        x: (uploaded.width - cropSize) / 2,
        y: (uploaded.height - cropSize) / 2,
        width: cropSize,
        height: cropSize,
      });

      setResult(null);
    }
  }, [uploaded]);

  // 获取宽高比值
  const getAspectRatioValue = (ratio: AspectRatio): number => {
    switch (ratio) {
      case "1:1":
        return 1;
      case "4:3":
        return 4 / 3;
      case "16:9":
        return 16 / 9;
      case "9:16":
        return 9 / 16;
      case "3:4":
        return 3 / 4;
      default:
        return 0;
    }
  };

  // 处理鼠标按下事件
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!uploaded || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - imageOffset.x) / imageScale;
      const y = (e.clientY - rect.top - imageOffset.y) / imageScale;

      // 检查是否点击在裁剪区域内
      const inCropArea =
        x >= cropArea.x &&
        x <= cropArea.x + cropArea.width &&
        y >= cropArea.y &&
        y <= cropArea.y + cropArea.height;

      if (inCropArea) {
        // 检查是否在边角（调整大小）
        const margin = 10;
        const nearLeft = Math.abs(x - cropArea.x) < margin;
        const nearRight = Math.abs(x - (cropArea.x + cropArea.width)) < margin;
        const nearTop = Math.abs(y - cropArea.y) < margin;
        const nearBottom =
          Math.abs(y - (cropArea.y + cropArea.height)) < margin;

        if (nearLeft && nearTop) {
          setDragType("resize-nw");
        } else if (nearRight && nearTop) {
          setDragType("resize-ne");
        } else if (nearLeft && nearBottom) {
          setDragType("resize-sw");
        } else if (nearRight && nearBottom) {
          setDragType("resize-se");
        } else {
          setDragType("move");
        }

        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
        setCropStart({ ...cropArea });
      }
    },
    [uploaded, cropArea, imageOffset, imageScale],
  );

  // 处理鼠标移动事件
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !uploaded || !containerRef.current) return;

      const deltaX = (e.clientX - dragStart.x) / imageScale;
      const deltaY = (e.clientY - dragStart.y) / imageScale;

      const newCropArea = { ...cropStart };

      if (dragType === "move") {
        newCropArea.x = Math.max(
          0,
          Math.min(uploaded.width - cropStart.width, cropStart.x + deltaX),
        );
        newCropArea.y = Math.max(
          0,
          Math.min(uploaded.height - cropStart.height, cropStart.y + deltaY),
        );
      } else if (dragType === "resize-nw") {
        const newWidth = cropStart.width - deltaX;
        const newHeight =
          aspectRatio === "free"
            ? cropStart.height - deltaY
            : newWidth / getAspectRatioValue(aspectRatio);
        newCropArea.width = Math.max(
          20,
          Math.min(uploaded.width - cropStart.x, newWidth),
        );
        newCropArea.height = Math.max(
          20,
          Math.min(uploaded.height - cropStart.y, newHeight),
        );
        newCropArea.x = cropStart.x + deltaX;
        newCropArea.y = cropStart.y + deltaY;
      } else if (dragType === "resize-ne") {
        const newWidth = cropStart.width + deltaX;
        const newHeight =
          aspectRatio === "free"
            ? cropStart.height - deltaY
            : newWidth / getAspectRatioValue(aspectRatio);
        newCropArea.width = Math.max(
          20,
          Math.min(uploaded.width - cropStart.x, newWidth),
        );
        newCropArea.height = Math.max(
          20,
          Math.min(uploaded.height - cropStart.y, newHeight),
        );
        newCropArea.y = cropStart.y + deltaY;
      } else if (dragType === "resize-sw") {
        const newWidth = cropStart.width - deltaX;
        const newHeight =
          aspectRatio === "free"
            ? cropStart.height + deltaY
            : newWidth / getAspectRatioValue(aspectRatio);
        newCropArea.width = Math.max(
          20,
          Math.min(uploaded.width - cropStart.x, newWidth),
        );
        newCropArea.height = Math.max(
          20,
          Math.min(uploaded.height - cropStart.y, newHeight),
        );
        newCropArea.x = cropStart.x + deltaX;
      } else if (dragType === "resize-se") {
        const newWidth = cropStart.width + deltaX;
        const newHeight =
          aspectRatio === "free"
            ? cropStart.height + deltaY
            : newWidth / getAspectRatioValue(aspectRatio);
        newCropArea.width = Math.max(
          20,
          Math.min(uploaded.width - cropStart.x, newWidth),
        );
        newCropArea.height = Math.max(
          20,
          Math.min(uploaded.height - cropStart.y, newHeight),
        );
      }

      // 如果有固定宽高比，调整高度
      if (aspectRatio !== "free") {
        const ratio = getAspectRatioValue(aspectRatio);
        newCropArea.height = newCropArea.width / ratio;
      }

      setCropArea(newCropArea);
    },
    [
      isDragging,
      dragType,
      dragStart,
      cropStart,
      uploaded,
      imageScale,
      aspectRatio,
    ],
  );

  // 处理鼠标松开事件
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragType(null);
  }, []);

  // 处理宽高比变化
  const handleAspectRatioChange = (value: string) => {
    const newRatio = value as AspectRatio;
    setAspectRatio(newRatio);

    if (newRatio !== "free" && uploaded && cropArea.width > 0) {
      const ratio = getAspectRatioValue(newRatio);
      setCropArea((prev) => ({
        ...prev,
        height: prev.width / ratio,
      }));
    }
  };

  // 执行裁剪
  const runCrop = async () => {
    if (!uploaded || !canvasRef.current) return;

    setProcessing(true);

    try {
      // 创建输出画布
      const outputCanvas = document.createElement("canvas");
      outputCanvas.width = cropArea.width;
      outputCanvas.height = cropArea.height;

      const ctx = outputCanvas.getContext("2d");
      if (!ctx) throw new Error("Failed to get canvas context");

      // 创建图片对象并等待加载完成
      const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = uploaded.previewUrl;
      });

      // 从原图中提取裁剪区域
      ctx.drawImage(
        image,
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height,
        0,
        0,
        cropArea.width,
        cropArea.height,
      );

      // 转换为 Blob
      const mimeType = uploaded.file.type || "image/png";
      const blob = await new Promise<Blob>((resolve, reject) => {
        outputCanvas.toBlob(
          (result) => {
            if (result) {
              resolve(result);
            } else {
              reject(new Error("Failed to create blob"));
            }
          },
          mimeType,
          0.92,
        );
      });

      const outputFile = new File([blob], `cropped_${uploaded.file.name}`, {
        type: mimeType,
      });
      const outputUrl = URL.createObjectURL(outputFile);

      setResult({ file: outputFile, url: outputUrl });
    } catch (error) {
      console.error("Crop failed:", error);
    } finally {
      setProcessing(false);
    }
  };

  // 重置裁剪区域
  const resetCrop = () => {
    if (!uploaded) return;

    const cropSize = Math.min(uploaded.width, uploaded.height) * 0.6;
    setCropArea({
      x: (uploaded.width - cropSize) / 2,
      y: (uploaded.height - cropSize) / 2,
      width: cropSize,
      height: cropSize,
    });
    setResult(null);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* 左侧：图片预览和裁剪区域 */}
      <div className="flex-1">
        <div
          ref={containerRef}
          className="relative w-full h-[400px] bg-slate-100 rounded-xl overflow-hidden cursor-crosshair"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {uploaded ? (
            <>
              {/* 原图 - 使用原生 img 是因为需要精确控制位置和缩放实现裁剪 */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={uploaded.previewUrl}
                alt={uploaded.file.name}
                className="absolute"
                style={{
                  transform: `translate(${imageOffset.x}px, ${imageOffset.y}px) scale(${imageScale})`,
                  transformOrigin: "top left",
                }}
                draggable={false}
              />

              {/* 遮罩层 */}
              <div
                className="absolute inset-0 bg-black/50"
                style={{
                  clipPath: `polygon(
                    0 0,
                    ${cropArea.x * imageScale + imageOffset.x}px 0,
                    ${cropArea.x * imageScale + imageOffset.x}px ${cropArea.y * imageScale + imageOffset.y}px,
                    ${(cropArea.x + cropArea.width) * imageScale + imageOffset.x}px ${cropArea.y * imageScale + imageOffset.y}px,
                    ${(cropArea.x + cropArea.width) * imageScale + imageOffset.x}px ${(cropArea.y + cropArea.height) * imageScale + imageOffset.y}px,
                    ${cropArea.x * imageScale + imageOffset.x}px ${(cropArea.y + cropArea.height) * imageScale + imageOffset.y}px,
                    ${cropArea.x * imageScale + imageOffset.x}px ${cropArea.y * imageScale + imageOffset.y}px,
                    0 ${cropArea.y * imageScale + imageOffset.y}px,
                    0 0
                  )`,
                }}
              />

              {/* 裁剪框 */}
              <div
                className="absolute border-2 border-white rounded-lg"
                style={{
                  left: cropArea.x * imageScale + imageOffset.x,
                  top: cropArea.y * imageScale + imageOffset.y,
                  width: cropArea.width * imageScale,
                  height: cropArea.height * imageScale,
                }}
              >
                {/* 四角调整手柄 */}
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-white rounded-full border-2 border-blue-500 cursor-nw-resize" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-blue-500 cursor-ne-resize" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white rounded-full border-2 border-blue-500 cursor-sw-resize" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-blue-500 cursor-se-resize" />
              </div>

              <canvas ref={canvasRef} className="hidden" />
            </>
          ) : (
            <UploadArea locale={locale} onFileSelect={setUploaded} />
          )}
        </div>

        {/* 裁剪区域尺寸显示 */}
        {uploaded && (
          <div className="mt-4 text-center text-sm text-slate-600">
            {locale === "zh" ? "裁剪区域" : "Crop Area"}:{" "}
            {Math.round(cropArea.width)} × {Math.round(cropArea.height)} px
          </div>
        )}
      </div>

      {/* 右侧：设置面板 */}
      <div className="lg:w-80">
        <SettingsPanel title={locale === "zh" ? "裁剪设置" : "Crop Settings"}>
          {/* 宽高比选择 */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700">
              {locale === "zh" ? "宽高比" : "Aspect Ratio"}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {aspectRatioOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAspectRatioChange(option.value)}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                    aspectRatio === option.value
                      ? "bg-blue-500 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* 裁剪区域位置和尺寸 */}
          <div className="mt-6 space-y-3">
            <label className="text-sm font-medium text-slate-700">
              {locale === "zh" ? "裁剪区域" : "Crop Area"}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-500">X</label>
                <input
                  type="number"
                  value={Math.round(cropArea.x)}
                  onChange={(e) =>
                    setCropArea((prev) => ({
                      ...prev,
                      x: Math.max(0, parseFloat(e.target.value) || 0),
                    }))
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500">Y</label>
                <input
                  type="number"
                  value={Math.round(cropArea.y)}
                  onChange={(e) =>
                    setCropArea((prev) => ({
                      ...prev,
                      y: Math.max(0, parseFloat(e.target.value) || 0),
                    }))
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500">
                  {locale === "zh" ? "宽度" : "Width"}
                </label>
                <input
                  type="number"
                  value={Math.round(cropArea.width)}
                  onChange={(e) => {
                    const newWidth = Math.max(
                      20,
                      parseFloat(e.target.value) || 20,
                    );
                    if (aspectRatio !== "free") {
                      const ratio = getAspectRatioValue(aspectRatio);
                      setCropArea((prev) => ({
                        ...prev,
                        width: newWidth,
                        height: newWidth / ratio,
                      }));
                    } else {
                      setCropArea((prev) => ({ ...prev, width: newWidth }));
                    }
                  }}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500">
                  {locale === "zh" ? "高度" : "Height"}
                </label>
                <input
                  type="number"
                  value={Math.round(cropArea.height)}
                  onChange={(e) => {
                    if (aspectRatio === "free") {
                      setCropArea((prev) => ({
                        ...prev,
                        height: Math.max(20, parseFloat(e.target.value) || 20),
                      }));
                    }
                  }}
                  disabled={aspectRatio !== "free"}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="mt-6 space-y-3">
            <Button
              onClick={runCrop}
              disabled={!uploaded || processing}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              {processing ? (
                <>
                  <svg
                    className="w-4 h-4 mr-2 animate-spin"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  {locale === "zh" ? "裁剪中..." : "Cropping..."}
                </>
              ) : locale === "zh" ? (
                "执行裁剪"
              ) : (
                "Crop Image"
              )}
            </Button>

            <Button
              onClick={resetCrop}
              variant="outline"
              disabled={!uploaded}
              className="w-full"
            >
              {locale === "zh" ? "重置区域" : "Reset Area"}
            </Button>
          </div>
        </SettingsPanel>

        {/* 结果预览 */}
        {result && (
          <ImagePreview
            title={locale === "zh" ? "裁剪结果" : "Crop Result"}
            src={result.url}
            alt="crop-result"
            description={`${result.file.name} (${formatFileSize(result.file.size)})`}
          />
        )}
        {result && (
          <div className="mt-4 flex justify-center">
            <DownloadButton
              label={locale === "zh" ? "下载图片" : "Download Image"}
              href={result.url}
              filename={result.file.name}
            />
          </div>
        )}
      </div>
    </div>
  );
}
