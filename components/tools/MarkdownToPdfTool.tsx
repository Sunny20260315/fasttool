"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n";
import { formatFileSize } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DownloadButton } from "@/components/DownloadButton";
import { SettingsPanel } from "@/components/SettingsPanel";
import { PdfUploadArea, type UploadedPdf } from "@/components/PdfUploadArea";
import { convertMarkdownToPdf, convertMarkdownToPdfBatch } from "@/lib/markdown-to-pdf-api";

type Props = {
  locale: Locale;
};

export function MarkdownToPdfTool({ locale }: Props) {
  const t = getMessages(locale);
  const [uploaded, setUploaded] = useState<UploadedPdf[]>([]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<Array<{ file: File; url: string; originalFile: File }>>([]);

  useEffect(() => {
    return () => {
      results.forEach(result => URL.revokeObjectURL(result.url));
    };
  }, [results]);

  const runConversion = async () => {
    if (uploaded.length === 0) return;
    setProcessing(true);
    
    try {
      results.forEach(result => URL.revokeObjectURL(result.url));
      
      let convertedResults: Array<{ file: File; url: string; originalFile: File }>;
      
      if (uploaded.length === 1) {
        const converted = await convertMarkdownToPdf(uploaded[0].file);
        const url = URL.createObjectURL(converted);
        convertedResults = [{ file: converted, url, originalFile: uploaded[0].file }];
      } else {
        const batchResults = await convertMarkdownToPdfBatch(uploaded.map(u => u.file));
        convertedResults = batchResults.map(result => ({
          file: result.file,
          url: URL.createObjectURL(result.file),
          originalFile: result.originalFile
        }));
      }
      
      setResults(convertedResults);
    } catch (error) {
      console.error('Conversion error:', error);
      alert(locale === "zh" ? "转换失败，请稍后重试" : "Conversion failed, please try again later");
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
          accept=".md,.markdown"
          placeholderText={locale === "zh" ? "拖拽多个 Markdown 文件到这里或点击上传" : "Drag multiple Markdown files here or click to upload"}
          onFileSelect={(files: UploadedPdf[]) => {
            setUploaded(files);
            setResults([]);
          }}
        />

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
          <p>
            {locale === "zh" 
              ? "✅ 现在支持中文！使用 Pandoc + XeLaTeX 引擎，完美处理中英文混合内容。" 
              : "✅ Chinese support now available! Using Pandoc + XeLaTeX engine for perfect handling of mixed Chinese-English content."}
          </p>
        </div>

        {uploaded.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {locale === "zh" ? "Markdown文件" : "Markdown Files"}
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
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{result.file.name}</span>
                    <DownloadButton
                      label={locale === "zh" ? "下载" : "Download"}
                      href={result.url}
                      filename={result.file.name}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">{locale === "zh" ? "原始文件名" : "Original File"}:</span>
                      <span className="ml-1 text-gray-700 truncate">{result.originalFile.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">{locale === "zh" ? "转换后大小" : "Converted Size"}:</span>
                      <span className="ml-1 text-gray-700">{formatFileSize(result.file.size)}</span>
                    </div>
                  </div>
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
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <SettingsPanel title={t.tool.settings}>
          <div className="space-y-4">
            <p className="block text-sm text-gray-700">
              {locale === "zh" 
                ? "将Markdown文件转换为高质量PDF格式。支持.md和.markdown文件扩展名，完美支持中文和复杂排版。" 
                : "Convert Markdown files to high-quality PDF format. Supports .md and .markdown file extensions with perfect Chinese and complex typesetting support."}
            </p>
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
              {locale === "zh" ? "点击下载每个转换后的文件" : "Click to download each converted file"}
            </p>
          </div>
        )}

        <div className="rounded-xl border border-gray-200 bg-green-50 p-4">
          <h3 className="mb-2 text-sm font-medium text-gray-700">
            {locale === "zh" ? "功能亮点" : "Features"}
          </h3>
          <ul className="space-y-1 text-xs text-gray-600">
            <li>• {locale === "zh" ? "完美中文支持" : "Perfect Chinese support"}</li>
            <li>• {locale === "zh" ? "高质量PDF输出" : "High-quality PDF output"}</li>
            <li>• {locale === "zh" ? "支持数学公式、表格、代码块" : "Supports math formulas, tables, code blocks"}</li>
            <li>• {locale === "zh" ? "基于Pandoc + XeLaTeX引擎" : "Powered by Pandoc + XeLaTeX engine"}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}