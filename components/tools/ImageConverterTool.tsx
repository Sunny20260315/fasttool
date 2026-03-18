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
  targetFormat: string;
  mimeType: string;
};

export function ImageConverterTool({ locale, targetFormat, mimeType }: Props) {
  const t = getMessages(locale);
  const [uploaded, setUploaded] = useState<UploadedImage[]>([]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<Array<{ file: File; url: string; originalFile: File }>>([]);

  useEffect(() => {
    return () => {
      results.forEach(result => URL.revokeObjectURL(result.url));
    };
  }, [results]);

  const convertImage = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to convert image'));
            return;
          }
          const convertedFile = new File([blob], `${file.name.split('.')[0]}.${targetFormat}`, { type: mimeType });
          resolve(convertedFile);
        }, mimeType);
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const runConversion = async () => {
    if (uploaded.length === 0) return;
    setProcessing(true);
    
    try {
      results.forEach(result => URL.revokeObjectURL(result.url));
      
      const convertedResults = await Promise.all(
        uploaded.map(async (item) => {
          const converted = await convertImage(item.file);
          const url = URL.createObjectURL(converted);
          return { file: converted, url, originalFile: item.file };
        })
      );
      
      setResults(convertedResults);
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
              {locale === "zh" ? "转换结果" : "Conversion Results"}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {results.map((result, index) => (
                <div key={index} className="space-y-2">
                  <ImagePreview 
                    title={`${result.file.name}`}
                    src={result.url} 
                    alt={`converted-image-${index}`}
                    description={`${formatFileSize(result.file.size)}`}
                  />
                  <DownloadButton
                    label={locale === "zh" ? "下载" : "Download"}
                    href={result.url}
                    filename={`converted-${result.originalFile.name.split('.')[0]}.${targetFormat}`}
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
            <p className="text-xs text-gray-500">{locale === "zh" ? "转换后总大小" : "Total Converted Size"}</p>
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
          <p className="mb-3 block text-sm text-gray-700">
            {locale === "zh" ? `转换为 ${targetFormat.toUpperCase()}` : `Convert to ${targetFormat.toUpperCase()}`}
          </p>
          <Button onClick={runConversion} disabled={uploaded.length === 0 || processing} className="mt-4 w-full">
            {processing ? t.tool.processing : 
              (locale === "zh" ? `转换 ${uploaded.length} 张图片` : `Convert ${uploaded.length} images`)}
          </Button>
        </SettingsPanel>

        {results.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">
              {locale === "zh" ? "批量下载" : "Batch Download"}
            </h3>
            <p className="text-xs text-gray-600">
              {locale === "zh" ? "点击下载每张转换后的图片" : "Click to download each converted image"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
