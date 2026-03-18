"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n";
import { formatFileSize } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DownloadButton } from "@/components/DownloadButton";
import { ImagePreview } from "@/components/ImagePreview";
import { SettingsPanel } from "@/components/SettingsPanel";
import { UploadArea, type UploadedImage } from "@/components/UploadArea";

type Props = {
  locale: Locale;
};

export function RotateImageTool({ locale }: Props) {
  const t = getMessages(locale);
  const [uploaded, setUploaded] = useState<UploadedImage[]>([]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<Array<{ file: File; url: string; originalFile: File }>>([]);
  const [rotation, setRotation] = useState(90);

  useEffect(() => {
    return () => {
      results.forEach(result => URL.revokeObjectURL(result.url));
    };
  }, [results]);

  const rotateImage = async (file: File, angle: number): Promise<File> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // 计算旋转后的画布尺寸
        const radians = (angle * Math.PI) / 180;
        const rotatedWidth = Math.abs(img.width * Math.cos(radians)) + Math.abs(img.height * Math.sin(radians));
        const rotatedHeight = Math.abs(img.width * Math.sin(radians)) + Math.abs(img.height * Math.cos(radians));
        
        canvas.width = rotatedWidth;
        canvas.height = rotatedHeight;
        
        // 移动原点到画布中心
        ctx?.translate(rotatedWidth / 2, rotatedHeight / 2);
        // 旋转画布
        ctx?.rotate(radians);
        // 绘制图片
        ctx?.drawImage(img, -img.width / 2, -img.height / 2);
        
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to rotate image'));
            return;
          }
          const rotatedFile = new File([blob], `rotated-${file.name}`, { type: file.type });
          resolve(rotatedFile);
        }, file.type);
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const runRotation = async () => {
    if (uploaded.length === 0) return;
    setProcessing(true);
    
    try {
      results.forEach(result => URL.revokeObjectURL(result.url));
      
      const rotatedResults = await Promise.all(
        uploaded.map(async (item) => {
          const rotated = await rotateImage(item.file, rotation);
          const url = URL.createObjectURL(rotated);
          return { file: rotated, url, originalFile: item.file };
        })
      );
      
      setResults(rotatedResults);
    } finally {
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
              {locale === "zh" ? "旋转结果" : "Rotation Results"}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {results.map((result, index) => (
                <div key={index} className="space-y-2">
                  <ImagePreview 
                    title={`${result.file.name}`}
                    src={result.url} 
                    alt={`rotated-image-${index}`}
                    description={`${formatFileSize(result.file.size)}`}
                  />
                  <DownloadButton
                    label={locale === "zh" ? "下载" : "Download"}
                    href={result.url}
                    filename={`rotated-${result.originalFile.name}`}
                    className="w-full"
                  />
                </div>
              ))}
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
            <p className="text-xs text-gray-500">{locale === "zh" ? "旋转后总大小" : "Total Rotated Size"}</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {results.length > 0 ? 
                formatFileSize(results.reduce((sum, item) => sum + item.file.size, 0)) : 
                "-"
              }
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <SettingsPanel title={t.tool.settings}>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {locale === "zh" ? "旋转角度" : "Rotation Angle"}
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="90"
                  value={rotation}
                  onChange={(e) => setRotation(parseInt(e.target.value))}
                  className="flex-1 h-2 rounded-lg appearance-none bg-gray-200"
                />
                <span className="text-sm font-medium text-gray-700 min-w-[40px]">
                  {rotation}°
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                onClick={() => setRotation(90)}
                className={rotation === 90 ? "bg-indigo-500 text-white border-indigo-500" : ""}
              >
                90°
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setRotation(180)}
                className={rotation === 180 ? "bg-indigo-500 text-white border-indigo-500" : ""}
              >
                180°
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setRotation(270)}
                className={rotation === 270 ? "bg-indigo-500 text-white border-indigo-500" : ""}
              >
                270°
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setRotation(0)}
                className={rotation === 0 ? "bg-indigo-500 text-white border-indigo-500" : ""}
              >
                0°
              </Button>
            </div>
            <Button onClick={runRotation} disabled={uploaded.length === 0 || processing} className="mt-4 w-full">
              {processing ? t.tool.processing : 
                (locale === "zh" ? `旋转 ${uploaded.length} 张图片` : `Rotate ${uploaded.length} images`)}
            </Button>
          </div>
        </SettingsPanel>

        {results.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">
              {locale === "zh" ? "批量下载" : "Batch Download"}
            </h3>
            <p className="text-xs text-gray-600">
              {locale === "zh" ? "点击下载每张旋转后的图片" : "Click to download each rotated image"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
