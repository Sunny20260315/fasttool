#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// 工具页面目录
const toolsDir = path.join(__dirname, '..', 'app', '[locale]', 'tools');

// 工具列表
const toolList = [
  'ai-image-generator',
  'base64-to-image',
  'cad-to-pdf',
  'compress-image',
  'crop-image',
  'excel-to-pdf',
  'heic-to-jpg',
  'image-resizer',
  'image-to-base64',
  'image-to-bmp',
  'image-to-ico',
  'image-to-jpg',
  'image-to-pdf',
  'image-to-png',
  'image-to-webp',
  'jpg-to-png',
  'pdf-compress',
  'pdf-to-excel',
  'pdf-to-image',
  'pdf-to-ppt',
  'pdf-to-word',
  'png-to-jpg',
  'png-to-webp',
  'ppt-to-pdf',
  'remove-background',
  'rotate-image',
  'tiff-to-jpg',
  'webp-to-png',
  'word-to-pdf'
];

console.log(`Rewriting ${toolList.length} tool pages with clean dynamic imports`);

// 处理每个工具页面
toolList.forEach(toolName => {
  const pagePath = path.join(toolsDir, toolName, 'page.tsx');
  
  if (fs.existsSync(pagePath)) {
    console.log(`Rewriting ${toolName}`);
    
    // 生成组件名称
    const componentName = toolName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('') + 'Tool';
    
    // 读取原始文件内容
    const originalContent = fs.readFileSync(pagePath, 'utf8');
    
    // 提取 generateMetadata 函数
    const metadataMatch = originalContent.match(/export\s+async\s+function\s+generateMetadata[\s\S]+?}\n\n/);
    const metadataFunction = metadataMatch ? metadataMatch[0] : '';
    
    // 提取页面组件函数
    const pageMatch = originalContent.match(/export\s+default\s+function[\s\S]+$/);
    const pageFunction = pageMatch ? pageMatch[0] : '';
    
    // 生成新的文件内容
    const newContent = `import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

const ${componentName} = dynamic(() => import("@/components/tools/${componentName}").then((module) => ({ default: module.${componentName} })), {
  ssr: false,
});

${metadataFunction}
${pageFunction}`;
    
    // 写入修改后的内容
    fs.writeFileSync(pagePath, newContent, 'utf8');
    console.log(`✓ Rewrote ${toolName}`);
  } else {
    console.log(`⚠ Page not found: ${pagePath}`);
  }
});

console.log('\nRewrite completed!');
