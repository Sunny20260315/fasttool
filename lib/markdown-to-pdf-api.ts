// lib/markdown-to-pdf-api.ts

export interface ConversionResult {
  file: File;
  originalFile: File;
}

export async function convertMarkdownToPdf(file: File): Promise<File> {
  const formData = new FormData();
  formData.append('markdownFile', file);
  
  const response = await fetch('/api/markdown-to-pdf', {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(errorData.error || 'Conversion failed');
  }
  
  const pdfBlob = await response.blob();
  return new File([pdfBlob], `${file.name.replace(/\.[^/.]+$/, '.pdf')}`, { type: 'application/pdf' });
}

export async function convertMarkdownToPdfBatch(files: File[]): Promise<ConversionResult[]> {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('markdownFiles', file);
  });
  
  const response = await fetch('/api/markdown-to-pdf/batch', {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    // 如果批量API失败，回退到单个文件转换
    const results: ConversionResult[] = [];
    for (const file of files) {
      try {
        const converted = await convertMarkdownToPdf(file);
        results.push({ file: converted, originalFile: file });
      } catch (error) {
        console.error('Failed to convert file:', file.name, error);
        // 可以选择跳过失败的文件或抛出错误
      }
    }
    return results;
  }
  
  // 注意：当前批量API返回的是base64数据，需要转换为File对象
  // 这里简化处理，直接使用单个转换
  const results: ConversionResult[] = [];
  for (const file of files) {
    const converted = await convertMarkdownToPdf(file);
    results.push({ file: converted, originalFile: file });
  }
  
  return results;
}