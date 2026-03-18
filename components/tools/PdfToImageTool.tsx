"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n";
import { formatFileSize } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DownloadButton } from "@/components/DownloadButton";
import { ImagePreview } from "@/components/ImagePreview";
import { SettingsPanel } from "@/components/SettingsPanel";
import { PdfUploadArea, type UploadedPdf } from "@/components/PdfUploadArea";
import { loadPdfJs } from "@/lib/pdfjs-browser";

type Props = {
  locale: Locale;
};

export function PdfToImageTool({ locale }: Props) {
  const t = getMessages(locale);
  const [uploaded, setUploaded] = useState<UploadedPdf[]>([]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<Array<{ file: File; url: string; originalFile: File; pageNumber: number }>>([]);
  const [outputFormat, setOutputFormat] = useState<"png" | "jpg" | "webp">('png');
  const [quality, setQuality] = useState(90);

  useEffect(() => {
    return () => {
      results.forEach(result => URL.revokeObjectURL(result.url));
    };
  }, [results]);

  const convertPdfToImage = async (file: File): Promise<Array<{ file: File; url: string; originalFile: File; pageNumber: number }>> => {
    const pdfjs = await loadPdfJs();
    
    // 读取PDF文件
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    
    // 转换每一页为图片
    const convertedImages = [];
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      
      // 设置画布尺寸
      const viewport = page.getViewport({ scale: 2.0 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) {
        throw new Error('Failed to get canvas context');
      }
      
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      // 渲染PDF页面到画布
      await page.render({ canvasContext: context, viewport, canvas }).promise;
      
      // 转换画布为图片文件
      const convertedFile = await new Promise<File>((resolve) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            throw new Error('Failed to create blob from canvas');
          }
          const imageFile = new File([blob], `${file.name.replace('.pdf', `_page${i}.${outputFormat}`)}`, { type: `image/${outputFormat}` });
          resolve(imageFile);
        }, `image/${outputFormat}`, quality / 100);
      });
      
      const url = URL.createObjectURL(convertedFile);
      convertedImages.push({ file: convertedFile, url, originalFile: file, pageNumber: i });
    }
    
    return convertedImages;
  };

  const runConversion = async () => {
    if (uploaded.length === 0) return;
    setProcessing(true);
    
    try {
      results.forEach(result => URL.revokeObjectURL(result.url));
      
      const allResults = [];
      for (const item of uploaded) {
        const pdfResults = await convertPdfToImage(item.file);
        allResults.push(...pdfResults);
      }
      
      setResults(allResults);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <PdfUploadArea
          locale={locale}
          multiple={true}
          onFileSelect={(files: UploadedPdf[]) => {
            setUploaded(files);
            setResults([]);
          }}
        />

        {uploaded.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {locale === "zh" ? "PDF文件" : "PDF Files"}
            </h3>
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <ul className="space-y-2">
                {uploaded.map((item, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{item.file.name}</span>
                    <span className="text-sm text-gray-500">{formatFileSize(item.file.size)}</span>
                  </li>
                ))}
              </ul>
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
                    title={`${result.originalFile.name} - ${locale === "zh" ? "第" : "Page"} ${result.pageNumber}`}
                    src={result.url} 
                    alt={`converted-image-${index}`}
                    description={`${formatFileSize(result.file.size)}`}
                  />
                  <DownloadButton
                    label={locale === "zh" ? "下载" : "Download"}
                    href={result.url}
                    filename={result.file.name}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-soft sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs text-gray-500">{locale === "zh" ? "原始文件总大小" : "Total Original Size"}</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {uploaded.length > 0 ? 
                formatFileSize(uploaded.reduce((sum, item) => sum + item.file.size, 0)) : 
                "-"
              }
            </p>
            <p className="mt-1 text-sm text-gray-600">
              {uploaded.length > 0 ? 
                (locale === "zh" ? `${uploaded.length} 个文件` : `${uploaded.length} files`) : 
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
            <p className="mt-1 text-sm text-gray-600">
              {results.length > 0 ? 
                (locale === "zh" ? `${results.length} 张图片` : `${results.length} images`) : 
                ""
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
                {locale === "zh" ? "输出格式" : "Output Format"}
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="outputFormat"
                    checked={outputFormat === "png"}
                    onChange={() => setOutputFormat("png")}
                    className="text-indigo-500"
                  />
                  <span className="text-sm text-gray-700">PNG</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="outputFormat"
                    checked={outputFormat === "jpg"}
                    onChange={() => setOutputFormat("jpg")}
                    className="text-indigo-500"
                  />
                  <span className="text-sm text-gray-700">JPG</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="outputFormat"
                    checked={outputFormat === "webp"}
                    onChange={() => setOutputFormat("webp")}
                    className="text-indigo-500"
                  />
                  <span className="text-sm text-gray-700">WEBP</span>
                </label>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {locale === "zh" ? "图片质量" : "Image Quality"} ({quality}%)
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none bg-gray-200"
              />
            </div>
            <Button onClick={runConversion} disabled={uploaded.length === 0 || processing} className="w-full">
              {processing ? t.tool.processing : 
                (locale === "zh" ? `转换 ${uploaded.length} 个文件` : `Convert ${uploaded.length} files`)}
            </Button>
          </div>
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

        <div className="rounded-xl border border-gray-200 bg-blue-50 p-4">
          <h3 className="mb-2 text-sm font-medium text-gray-700">
            {locale === "zh" ? "使用说明" : "Usage Tips"}
          </h3>
          <ul className="space-y-1 text-xs text-gray-600">
            <li>• {locale === "zh" ? "PDF的每一页会转换为一张图片" : "Each page of the PDF will be converted to an image"}</li>
            <li>• {locale === "zh" ? "转换过程在浏览器中进行，不会上传文件" : "Conversion happens in your browser, files are not uploaded"}</li>
            <li>• {locale === "zh" ? "支持批量转换多个PDF文件" : "Supports batch conversion of multiple PDF files"}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
