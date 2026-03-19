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

console.log(`Fixing actual components in ${toolList.length} tool pages`);

// 处理每个工具页面
toolList.forEach(toolName => {
  const pagePath = path.join(toolsDir, toolName, 'page.tsx');
  
  if (fs.existsSync(pagePath)) {
    console.log(`Fixing ${toolName}`);
    
    // 读取文件内容
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // 检测实际使用的组件
    const componentMatches = content.match(/<([A-Z][a-zA-Z0-9]+Tool)/g);
    const components = new Set();
    
    if (componentMatches) {
      componentMatches.forEach(match => {
        const component = match.substring(1);
        components.add(component);
      });
    }
    
    // 移除所有现有的导入和动态导入
    content = content.replace(/import.*from.*;\s*/g, '');
    content = content.replace(/const [^=]+ = dynamic\(.*?\}, \{[\s\S]*?\}\);/g, '');
    
    // 提取 generateMetadata 函数
    const metadataMatch = content.match(/export\s+async\s+function\s+generateMetadata[\s\S]+?}\n\n/);
    const metadataFunction = metadataMatch ? metadataMatch[0] : '';
    
    // 提取页面组件函数
    const pageMatch = content.match(/export\s+default\s+function[\s\S]+$/);
    const pageFunction = pageMatch ? pageMatch[0] : '';
    
    // 生成新的文件内容
    let newContent = `import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

`;
    
    // 添加动态导入
    components.forEach(component => {
      newContent += `const ${component} = dynamic(() => import("@/components/tools/${component}").then((module) => ({ default: module.${component} })), {
  ssr: false,
});

`;
    });
    
    newContent += `${metadataFunction}
${pageFunction}`;
    
    // 写入修改后的内容
    fs.writeFileSync(pagePath, newContent, 'utf8');
    console.log(`✓ Fixed ${toolName} with components: ${Array.from(components).join(', ')}`);
  } else {
    console.log(`⚠ Page not found: ${pagePath}`);
  }
});

console.log('\nFix completed!');
