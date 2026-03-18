"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { formatFileSize } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export type UploadedPdf = {
  file: File;
};

type Props = {
  locale: Locale;
  onFileSelect: ((files: UploadedPdf[]) => void) | ((file: UploadedPdf) => void);
  multiple?: boolean;
};

export function PdfUploadArea({ locale, onFileSelect, multiple = false }: Props) {
  const [dragOver, setDragOver] = useState(false);
  const [fileMeta, setFileMeta] = useState<UploadedPdf[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;
    
    // 根据目标格式过滤文件
    const filteredFiles = Array.from(files);
    
    // 处理不同的文件类型
    if (typeof onFileSelect === 'function') {
      // 这里可以根据具体的转换类型添加文件类型过滤逻辑
      // 暂时不过滤，让具体的工具组件处理文件类型验证
      
      const uploadedFiles = filteredFiles.map(file => ({
        file
      }));
      setFileMeta(uploadedFiles);
      
      // 处理单文件和多文件两种情况
      if (multiple || uploadedFiles.length > 1) {
        (onFileSelect as (files: UploadedPdf[]) => void)(uploadedFiles);
      } else {
        (onFileSelect as (file: UploadedPdf) => void)(uploadedFiles[0]);
      }
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={async (event) => {
            event.preventDefault();
            setDragOver(false);
            await handleFiles(event.dataTransfer.files);
          }}
          className={`rounded-2xl border-2 border-dashed p-10 text-center transition ${dragOver ? "border-gray-400 bg-gray-50" : "border-gray-200"}`}
        >
          <UploadCloud className="mx-auto mb-3 h-8 w-8 text-gray-500" />
          <p className="text-sm text-gray-600">
            {multiple ? 
              (locale === "zh" ? "拖拽多个 PDF 文件到这里或点击上传" : "Drag multiple PDF files here or click to upload") : 
              (locale === "zh" ? "拖拽 PDF 文件到这里或点击上传" : "Drag PDF file here or click to upload")
            }
          </p>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            multiple={multiple}
            className="hidden"
            onChange={async (event) => {
              await handleFiles(event.target.files);
            }}
          />
        </div>

        {fileMeta.length > 0 && (
          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-600">
            <p className="font-medium mb-2">
              {locale === "zh" ? `已上传 ${fileMeta.length} 个 PDF 文件` : `Uploaded ${fileMeta.length} PDF files`}
            </p>
            <ul className="space-y-1">
              {fileMeta.map((meta, index) => (
                <li key={index}>
                  {meta.file.name} ({formatFileSize(meta.file.size)})
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
