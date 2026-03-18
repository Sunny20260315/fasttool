"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { DownloadButton } from "@/components/DownloadButton";
import { ImagePreview } from "@/components/ImagePreview";
import { UploadArea, type UploadedImage } from "@/components/UploadArea";

type Props = {
  locale: Locale;
};

export function Base64ToImageTool({ locale }: Props) {
  const t = getMessages(locale);
  const [base64Text, setBase64Text] = useState("");
  const [uploaded, setUploaded] = useState<UploadedImage | null>(null);
  const [result, setResult] = useState<{ file: File; url: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 将 Base64 转换为图片文件
  const convertBase64ToImage = () => {
    if (!base64Text.trim()) {
      setError(locale === "zh" ? "请输入 Base64 文本" : "Please enter Base64 text");
      return;
    }

    try {
      // 清理 Base64 文本（移除可能的空白字符）
      const cleanedBase64 = base64Text.trim();
      
      // 检查是否为 Data URL 格式 (data:image/png;base64,...)
      let mimeType = "image/png";
      let base64Data = cleanedBase64;
      
      if (cleanedBase64.startsWith("data:")) {
        const matches = cleanedBase64.match(/^data:(image\/\w+);base64,(.*)$/);
        if (matches) {
          mimeType = matches[1];
          base64Data = matches[2];
        } else {
          // 尝试提取 MIME 类型
          const mimeMatch = cleanedBase64.match(/^data:(image\/\w+)/);
          if (mimeMatch) {
            mimeType = mimeMatch[1];
          }
          const dataParts = cleanedBase64.split(",");
          if (dataParts.length > 1) {
            base64Data = dataParts[1];
          }
        }
      }

      // 将 Base64 解码为二进制数据
      const binaryString = atob(base64Data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // 创建 Blob 并生成文件
      const blob = new Blob([bytes], { type: mimeType });
      const extension = mimeType.split("/")[1] || "png";
      const file = new File([blob], `converted-image.${extension}`, { type: mimeType });
      const url = URL.createObjectURL(file);

      setResult({ file, url });
      setError(null);
    } catch (err) {
      console.error("Conversion error:", err);
      setError(locale === "zh" ? "Base64 格式无效，无法转换" : "Invalid Base64 format, cannot convert");
      setResult(null);
    }
  };

  // 处理图片上传（用于反向操作：图片转 Base64）
  const handleImageUpload = async (file: UploadedImage) => {
    setUploaded(file);
    setResult(null);
    
    // 将图片转换为 Base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64Result = reader.result as string;
      setBase64Text(base64Result);
    };
    reader.readAsDataURL(file.file);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        {/* Base64 输入区域 */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {locale === "zh" ? "Base64 文本输入" : "Base64 Text Input"}
          </label>
          <textarea
            value={base64Text}
            onChange={(e) => {
              setBase64Text(e.target.value);
              setError(null);
            }}
            placeholder={locale === "zh" 
              ? "请输入 Base64 编码的文本（支持 data:image/png;base64,xxx 格式）" 
              : "Enter Base64 encoded text (supports data:image/png;base64,xxx format)"}
            className="h-40 w-full rounded-lg border border-gray-300 p-3 font-mono text-sm focus:border-gray-500 focus:outline-none"
          />
          
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}

          <Button onClick={convertBase64ToImage} className="mt-4 w-full">
            {locale === "zh" ? "转换为图片" : "Convert to Image"}
          </Button>
        </div>

        {/* 图片上传区域（可选功能） */}
        <UploadArea
          locale={locale}
          onFileSelect={handleImageUpload}
        />

        {/* 预览区域 */}
        <div className="grid gap-6 md:grid-cols-2">
          <ImagePreview
            title={locale === "zh" ? "Base64 预览" : "Base64 Preview"}
            src={uploaded?.previewUrl}
            alt="uploaded-image"
            description={uploaded ? `${uploaded.width} x ${uploaded.height}` : undefined}
          />
          <ImagePreview
            title={locale === "zh" ? "转换结果预览" : "Converted Image Preview"}
            src={result?.url}
            alt="converted-image"
            description={result 
              ? `${result.file.name} (${(result.file.size / 1024).toFixed(2)} KB)` 
              : t.tool.noResult}
          />
        </div>
      </div>

      {/* 设置面板 */}
      <div className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            {locale === "zh" ? "使用说明" : "Instructions"}
          </h3>
          
          <div className="space-y-3 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-900">
                {locale === "zh" ? "方法一：Base64 转图片" : "Method 1: Base64 to Image"}
              </p>
              <p className="mt-1">
                {locale === "zh" 
                  ? "在上方文本框中粘贴 Base64 编码，点击转换按钮即可生成图片。" 
                  : "Paste Base64 encoded text in the textarea above and click convert button."}
              </p>
            </div>
            
            <div>
              <p className="font-medium text-gray-900">
                {locale === "zh" ? "方法二：图片转 Base64" : "Method 2: Image to Base64"}
              </p>
              <p className="mt-1">
                {locale === "zh" 
                  ? "点击下方上传区域选择图片，会自动转换为 Base64 编码显示在文本框中。" 
                  : "Click upload area below to select an image, it will be converted to Base64 automatically."}
              </p>
            </div>
          </div>
        </div>

        <DownloadButton
          label={t.tool.download}
          href={result?.url}
          filename={result?.file.name || "converted-image.png"}
        />
      </div>
    </div>
  );
}
