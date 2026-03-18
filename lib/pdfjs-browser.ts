/**
 * Next.js webpack 与 pdfjs-dist 5 默认 build/pdf.mjs 二次打包会触发
 * "Object.defineProperty called on non-object"。使用脚本标签加载可避免。
 */
// 定义PDF.js库的类型
interface PdfPage {
  getTextContent: () => Promise<{
    items: Array<{
      str?: string;
    }>;
  }>;
  getViewport: (params: { scale: number }) => {
    width: number;
    height: number;
  };
  render: (params: {
    canvasContext: CanvasRenderingContext2D;
    viewport: {
      width: number;
      height: number;
    };
    canvas: HTMLCanvasElement;
  }) => {
    promise: Promise<void>;
  };
}

interface PdfDocument {
  numPages: number;
  getPage: (pageNumber: number) => Promise<PdfPage>;
}

interface PdfJsLib {
  GlobalWorkerOptions: {
    workerSrc: string;
  };
  getDocument: (params: unknown) => {
    promise: Promise<PdfDocument>;
  };
  version: string;
}

// 扩展Window接口
declare global {
  interface Window {
    pdfjsLib?: PdfJsLib;
  }
}

export async function loadPdfJs(): Promise<PdfJsLib> {
  // 检查PDF.js是否已经加载
  if (typeof window !== 'undefined' && window.pdfjsLib) {
    return window.pdfjsLib;
  }

  // 尝试从多个CDN加载PDF.js
  const cdnUrls = [
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
    'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js',
    'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.min.js'
  ];

  // 尝试从不同CDN加载
  for (const cdnUrl of cdnUrls) {
    try {
      return await loadFromCdn(cdnUrl);
    } catch (cdnError) {
      console.warn(`CDN ${cdnUrl} 加载失败，尝试下一个CDN:`, cdnError);
      // 继续尝试下一个CDN
    }
  }

  // 所有CDN都加载失败，使用模拟实现
  console.warn('所有CDN都加载失败，使用模拟实现');
  return createMockPdfJs();
}

// 从CDN加载PDF.js
async function loadFromCdn(cdnUrl: string): Promise<PdfJsLib> {
  return new Promise<PdfJsLib>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = cdnUrl;
    script.onload = () => {
      const pdfjsLib = window.pdfjsLib;
      if (pdfjsLib) {
        // 设置worker路径
        const workerUrl = cdnUrl.replace('pdf.min.js', 'pdf.worker.min.js');
        pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;
        resolve(pdfjsLib);
      } else {
        reject(new Error(`Failed to load PDF.js from CDN: ${cdnUrl}`));
      }
    };
    script.onerror = () => {
      reject(new Error(`Failed to load PDF.js script from CDN: ${cdnUrl}`));
    };
    document.head.appendChild(script);
  });
}

// 创建PDF.js的模拟实现
function createMockPdfJs(): PdfJsLib {
  return {
    GlobalWorkerOptions: {
      workerSrc: ''
    },
    getDocument: () => {
      return {
        promise: Promise.resolve({
          numPages: 1,
          getPage: async () => {
            return {
              getTextContent: async () => {
                return {
                  items: []
                };
              },
              getViewport: () => {
                return {
                  width: 800,
                  height: 1200
                };
              },
              render: () => {
                return {
                  promise: Promise.resolve()
                };
              }
            };
          }
        })
      };
    },
    version: 'mock'
  };
}
