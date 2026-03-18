"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n";
import { formatFileSize } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export type UploadedImage = {
  file: File;
  previewUrl: string;
  width: number;
  height: number;
};

type Props = {
  locale: Locale;
  onFileSelect: ((files: UploadedImage[]) => void) | ((file: UploadedImage) => void);
  multiple?: boolean;
};

export function UploadArea({ locale, onFileSelect, multiple = false }: Props) {
  const t = getMessages(locale);
  const [dragOver, setDragOver] = useState(false);
  const [fileMeta, setFileMeta] = useState<UploadedImage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadImageMeta = async (file: File): Promise<UploadedImage> => {
    const previewUrl = URL.createObjectURL(file);
    const image = new Image();

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Image load failed"));
      image.src = previewUrl;
    });

    return {
      file,
      previewUrl,
      width: image.naturalWidth,
      height: image.naturalHeight
    };
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;
    
    const imageFiles = Array.from(files).filter(file => file.type.startsWith("image/"));
    if (imageFiles.length === 0) return;
    
    const uploadedImages = await Promise.all(imageFiles.map(loadImageMeta));
    setFileMeta(uploadedImages);
    
    // 处理单文件和多文件两种情况
    if (multiple || uploadedImages.length > 1) {
      (onFileSelect as (files: UploadedImage[]) => void)(uploadedImages);
    } else {
      (onFileSelect as (file: UploadedImage) => void)(uploadedImages[0]);
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
          className={`rounded-2xl border-2 border-dashed p-10 text-center transition ${
            dragOver ? "border-gray-400 bg-gray-50" : "border-gray-200"
          }`}
        >
          <UploadCloud className="mx-auto mb-3 h-8 w-8 text-gray-500" />
          <p className="text-sm text-gray-600">
            {multiple ? 
              (locale === "zh" ? "拖拽多张图片到这里或点击上传" : "Drag multiple images here or click to upload") : 
              t.tool.uploadHint
            }
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
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
              {locale === "zh" ? `已上传 ${fileMeta.length} 张图片` : `Uploaded ${fileMeta.length} images`}
            </p>
            <ul className="space-y-1">
              {fileMeta.map((meta, index) => (
                <li key={index}>
                  {meta.file.name} ({formatFileSize(meta.file.size)}, {meta.width}x{meta.height})
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
