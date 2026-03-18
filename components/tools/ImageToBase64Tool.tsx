"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n";
import { formatFileSize } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ImagePreview } from "@/components/ImagePreview";
import { SettingsPanel } from "@/components/SettingsPanel";
import { UploadArea, type UploadedImage } from "@/components/UploadArea";

type Props = {
  locale: Locale;
};

export function ImageToBase64Tool({ locale }: Props) {
  const t = getMessages(locale);
  const [uploaded, setUploaded] = useState<UploadedImage[]>([]);
  const [results, setResults] = useState<Array<{ fileName: string; base64: string; mimeType: string }>>([]);
  const [outputFormat, setOutputFormat] = useState<"dataUrl" | "plain">("dataUrl");

  const convertToBase64 = (file: File): Promise<{ fileName: string; base64: string; mimeType: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = outputFormat === "dataUrl" ? result : result.split(",")[1];
        resolve({
          fileName: file.name,
          base64,
          mimeType: file.type
        });
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      reader.readAsDataURL(file);
    });
  };

  const runConversion = async () => {
    if (uploaded.length === 0) return;
    
    const convertedResults = await Promise.all(
      uploaded.map(async (item) => {
        return await convertToBase64(item.file);
      })
    );
    
    setResults(convertedResults);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(locale === "zh" ? "已复制到剪贴板" : "Copied to clipboard");
    } catch {
      alert(locale === "zh" ? "复制失败" : "Failed to copy");
    }
  };

  const downloadAsText = (content: string, fileName: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
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
              {locale === "zh" ? "Base64 编码结果" : "Base64 Encoding Results"}
            </h3>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium text-gray-900">{result.fileName}</span>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => copyToClipboard(result.base64)}
                        className="text-xs"
                      >
                        {locale === "zh" ? "复制" : "Copy"}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => downloadAsText(result.base64, `${result.fileName}.txt`)}
                        className="text-xs"
                      >
                        {locale === "zh" ? "下载" : "Download"}
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-32 overflow-auto rounded-lg bg-gray-50 p-3 font-mono text-xs text-gray-600 break-all">
                    {result.base64.length > 500 
                      ? result.base64.substring(0, 500) + "..." 
                      : result.base64}
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    {locale === "zh" ? "长度" : "Length"}: {result.base64.length} {locale === "zh" ? "字符" : "characters"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <SettingsPanel title={t.tool.settings}>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {locale === "zh" ? "输出格式" : "Output Format"}
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="outputFormat"
                    checked={outputFormat === "dataUrl"}
                    onChange={() => setOutputFormat("dataUrl")}
                    className="text-indigo-500"
                  />
                  <span className="text-sm text-gray-700">
                    Data URL (data:image/...)
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="outputFormat"
                    checked={outputFormat === "plain"}
                    onChange={() => setOutputFormat("plain")}
                    className="text-indigo-500"
                  />
                  <span className="text-sm text-gray-700">
                    {locale === "zh" ? "纯 Base64" : "Plain Base64"}
                  </span>
                </label>
              </div>
            </div>
            <Button onClick={runConversion} disabled={uploaded.length === 0} className="w-full">
              {locale === "zh" ? `转换 ${uploaded.length} 张图片` : `Convert ${uploaded.length} images`}
            </Button>
          </div>
        </SettingsPanel>

        {results.length > 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <h3 className="mb-2 text-sm font-medium text-gray-700">
              {locale === "zh" ? "批量操作" : "Batch Operations"}
            </h3>
            <Button 
              variant="outline" 
              onClick={() => {
                const allBase64 = results.map(r => r.base64).join("\n\n");
                downloadAsText(allBase64, "base64-results.txt");
              }}
              className="w-full"
            >
              {locale === "zh" ? "下载所有结果" : "Download All Results"}
            </Button>
          </div>
        )}

        <div className="rounded-xl border border-gray-200 bg-blue-50 p-4">
          <h3 className="mb-2 text-sm font-medium text-gray-700">
            {locale === "zh" ? "使用说明" : "Usage Tips"}
          </h3>
          <ul className="space-y-1 text-xs text-gray-600">
            <li>• {locale === "zh" ? "Data URL 格式可直接用于 HTML img 标签的 src 属性" : "Data URL format can be directly used in HTML img tag src attribute"}</li>
            <li>• {locale === "zh" ? "纯 Base64 用于 API 传输或存储" : "Plain Base64 is used for API transmission or storage"}</li>
            <li>• {locale === "zh" ? "点击复制按钮可快速复制编码结果" : "Click copy button to quickly copy encoding result"}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
