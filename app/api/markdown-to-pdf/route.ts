import { NextRequest } from 'next/server';

// 后端服务URL
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export async function POST(request: NextRequest) {
  try {
    // 获取原始请求的formData
    const formData = await request.formData();
    
    // 创建新的FormData用于转发
    const proxyFormData = new FormData();
    for (const [key, value] of formData.entries()) {
      proxyFormData.append(key, value);
    }
    
    // 转发到后端服务
    const response = await fetch(`${BACKEND_URL}/api/markdown-to-pdf`, {
      method: 'POST',
      body: proxyFormData,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Backend service error' }));
      return Response.json(errorData, { status: response.status });
    }
    
    // 返回PDF文件
    const pdfBuffer = await response.arrayBuffer();
    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': response.headers.get('Content-Disposition') || 'attachment; filename="converted.pdf"',
      },
    });
    
  } catch (error) {
    console.error('API Proxy Error:', error);
    return Response.json(
      { error: 'Failed to process request' }, 
      { status: 500 }
    );
  }
}