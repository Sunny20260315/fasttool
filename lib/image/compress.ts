// 导入浏览器图片压缩库
// browser-image-compression 是一个基于 Canvas API 的图片压缩库
// 它使用以下原理进行压缩：
// 1. 将图片绘制到 Canvas 上
// 2. 通过调整 Canvas 的尺寸和质量参数来减小图片大小
// 3. 将 Canvas 转换回 Blob/File 对象
import imageCompression from "browser-image-compression";

// 压缩选项类型定义
type CompressOptions = {
  quality: number; // 压缩质量，范围 0-1，值越小压缩率越高，质量越低
  maxSizeMB?: number; // 最大文件大小（MB），超过此大小会进一步压缩
};

/**
 * 压缩图片文件
 * @param file 原始图片文件
 * @param options 压缩选项
 * @returns 压缩后的图片文件
 */
export async function compressImage(file: File, options: CompressOptions) {
  // 调用 browser-image-compression 库进行压缩
  return imageCompression(file, {
    initialQuality: options.quality, // 设置初始压缩质量
    maxSizeMB: options.maxSizeMB ?? 10, // 设置最大文件大小，默认为 10MB
    useWebWorker: true // 使用 Web Worker 进行压缩，避免阻塞主线程
  });
  
  // 压缩原理详解：
  // 1. 读取原始图片文件
  // 2. 创建一个 Image 对象并加载图片
  // 3. 创建一个 Canvas 元素
  // 4. 根据压缩质量和最大尺寸计算新的图片尺寸
  // 5. 将图片绘制到 Canvas 上（这一步会根据质量参数进行压缩）
  // 6. 将 Canvas 转换回 Blob 对象
  // 7. 返回压缩后的文件
}

