"use client";

import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n";
import { compressImage } from "@/lib/image/compress";
import { formatFileSize } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DownloadButton } from "@/components/DownloadButton";
import { ImagePreview } from "@/components/ImagePreview";
import { SettingsPanel } from "@/components/SettingsPanel";
import { UploadArea, type UploadedImage } from "@/components/UploadArea";

type Props = {
  locale: Locale;
};

type CompressionLevel = "low" | "medium" | "high";

const LEVEL_CONFIG: Record<
  CompressionLevel,
  { quality: number; maxSizeMB: number; label: { zh: string; en: string } }
> = {
  low: {
    quality: 0.9,
    maxSizeMB: 4,
    label: { zh: "低压缩", en: "Low Compression" }
  },
  medium: {
    quality: 0.7,
    maxSizeMB: 2,
    label: { zh: "中压缩", en: "Medium Compression" }
  },
  high: {
    quality: 0.5,
    maxSizeMB: 1,
    label: { zh: "高压缩", en: "High Compression" }
  }
};

export function CompressImageTool({ locale }: Props) {
  const t = getMessages(locale);
  const [uploaded, setUploaded] = useState<UploadedImage[]>([]);
  const [level, setLevel] = useState<CompressionLevel>("medium");
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<Array<{ file: File; url: string; originalFile: File }>>([]);

  useEffect(() => {
    return () => {
      results.forEach(result => URL.revokeObjectURL(result.url));
    };
  }, [results]);

  const totalSavings = useMemo(() => {
    if (uploaded.length === 0 || results.length === 0) return null;
    
    const totalOriginalSize = uploaded.reduce((sum, item) => sum + item.file.size, 0);
    const totalCompressedSize = results.reduce((sum, item) => sum + item.file.size, 0);
    const saved = totalOriginalSize - totalCompressedSize;
    
    if (saved <= 0) return null;
    const ratio = Math.round((saved / totalOriginalSize) * 100);
    
    return {
      size: saved,
      ratio,
      text: locale === "zh"
        ? `共减少 ${formatFileSize(saved)}（${ratio}%）`
        : `Saved ${formatFileSize(saved)} (${ratio}%)`
    };
  }, [uploaded, results, locale]);

  /**
   * 执行批量压缩
   * 核心原理：
   * 1. 并行处理多张图片，提高效率
   * 2. 使用 Promise.all 同时处理所有图片
   * 3. 为每张图片创建对象 URL 用于预览
   */
  const runCompression = async () => {
    // 检查是否有上传的图片
    if (uploaded.length === 0) return;
    
    // 设置处理状态
    setProcessing(true);
    
    try {
      // 清理之前的结果，释放内存
      results.forEach(result => URL.revokeObjectURL(result.url));
      
      // 获取当前选择的压缩等级配置
      const current = LEVEL_CONFIG[level];
      
      // 并行压缩所有上传的图片
      // 使用 Promise.all 可以同时处理多张图片，比串行处理更快
      const compressedResults = await Promise.all(
        uploaded.map(async (item) => {
          // 调用压缩函数处理单张图片
          const compressed = await compressImage(item.file, {
            quality: current.quality, // 压缩质量
            maxSizeMB: current.maxSizeMB // 最大文件大小
          });
          
          // 创建对象 URL 用于预览
          // URL.createObjectURL() 创建一个指向压缩后图片的临时 URL
          const url = URL.createObjectURL(compressed);
          
          // 返回压缩结果，包含压缩后的文件、预览 URL 和原始文件
          return { file: compressed, url, originalFile: item.file };
        })
      );
      
      // 更新压缩结果状态
      setResults(compressedResults);
    } finally {
      // 无论压缩成功还是失败，都设置处理状态为 false
      setProcessing(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <UploadArea
          locale={locale}
          multiple={true}
          onFileSelect={(files: UploadedImage[]) => {
            setUploaded(files);
            setResults([]);
          }}
        />

        {uploaded.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {locale === "zh" ? "图片预览" : "Image Previews"}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {uploaded.map((item, index) => (
                <ImagePreview 
                  key={index}
                  title={item.file.name}
                  src={item.previewUrl} 
                  alt={`original-image-${index}`}
                  description={`${formatFileSize(item.file.size)}`}
                />
              ))}
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {locale === "zh" ? "压缩结果" : "Compression Results"}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {results.map((result, index) => {
                const originalSize = uploaded[index]?.file.size || result.originalFile.size;
                const saved = originalSize - result.file.size;
                const ratio = saved > 0 ? Math.round((saved / originalSize) * 100) : 0;
                const savings = saved > 0 ? 
                  (locale === "zh" ? `减少 ${formatFileSize(saved)}（${ratio}%）` : `Saved ${formatFileSize(saved)} (${ratio}%)`) : 
                  "";
                
                return (
                  <div key={index} className="space-y-2">
                    <ImagePreview 
                      title={`${result.file.name}`}
                      src={result.url} 
                      alt={`compressed-image-${index}`}
                      description={`${formatFileSize(result.file.size)}${savings ? ` · ${savings}` : ""}`}
                    />
                    <DownloadButton
                      label={locale === "zh" ? "下载" : "Download"}
                      href={result.url}
                      filename={`compressed-${result.originalFile.name}`}
                      className="w-full"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-soft sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs text-gray-500">{locale === "zh" ? "原始图片总大小" : "Total Original Size"}</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {uploaded.length > 0 ? 
                formatFileSize(uploaded.reduce((sum, item) => sum + item.file.size, 0)) : 
                "-"
              }
            </p>
            <p className="mt-1 text-sm text-gray-600">
              {uploaded.length > 0 ? 
                (locale === "zh" ? `${uploaded.length} 张图片` : `${uploaded.length} images`) : 
                ""
              }
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs text-gray-500">{locale === "zh" ? "压缩后总大小" : "Total Compressed Size"}</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {results.length > 0 ? 
                formatFileSize(results.reduce((sum, item) => sum + item.file.size, 0)) : 
                "-"
              }
            </p>
            {totalSavings && (
              <p className="mt-1 text-sm text-emerald-600 font-medium">
                {totalSavings.text}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <SettingsPanel title={t.tool.settings}>
          <p className="mb-3 block text-sm text-gray-700">{locale === "zh" ? "压缩等级" : "Compression Level"}</p>
          <div className="grid grid-cols-1 gap-2">
            {(Object.keys(LEVEL_CONFIG) as CompressionLevel[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLevel(item)}
                className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                  level === item ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {LEVEL_CONFIG[item].label[locale]}
              </button>
            ))}
          </div>
          <Button onClick={runCompression} disabled={uploaded.length === 0 || processing} className="mt-4 w-full">
            {processing ? t.tool.processing : 
              (locale === "zh" ? `压缩 ${uploaded.length} 张图片` : `Compress ${uploaded.length} images`)}
          </Button>
        </SettingsPanel>

        {results.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">
              {locale === "zh" ? "批量下载" : "Batch Download"}
            </h3>
            <p className="text-xs text-gray-600">
              {locale === "zh" ? "点击下载每张压缩后的图片" : "Click to download each compressed image"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
