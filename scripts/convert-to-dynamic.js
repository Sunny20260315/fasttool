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

console.log(`Converting ${toolList.length} tool pages to dynamic imports`);

// 处理每个工具页面
toolList.forEach(toolName => {
  const pagePath = path.join(toolsDir, toolName, 'page.tsx');
  
  if (fs.existsSync(pagePath)) {
    console.log(`Processing ${toolName}`);
    
    // 读取文件内容
    const content = fs.readFileSync(pagePath, 'utf8');
    
    // 生成组件名称
    const componentName = toolName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('') + 'Tool';
    
    // 生成新的文件内容
    const newContent = content
      // 替换导入部分
      .replace(
        /import type \{ Metadata \} from "next";
import \{ notFound \} from "next\/navigation";
import \{ [^}]+ \} from "@\/components\/tools\/[^"\']+";
import \{ ToolLayout \} from "@\/components\/ToolLayout";
import \{ isLocale \} from "@\/lib\/i18n";/, 
        `import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

const ${componentName} = dynamic(() => import("@/components/tools/${toolName}").then((module) => ({ default: module.${componentName} })), {
  ssr: false,
});`
      );
    
    // 写入修改后的内容
    fs.writeFileSync(pagePath, newContent, 'utf8');
    console.log(`✓ Converted ${toolName}`);
  } else {
    console.log(`⚠ Page not found: ${pagePath}`);
  }
});

console.log('\nConversion completed!');
