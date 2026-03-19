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

console.log(`Fixing duplicate imports in ${toolList.length} tool pages`);

// 处理每个工具页面
toolList.forEach(toolName => {
  const pagePath = path.join(toolsDir, toolName, 'page.tsx');
  
  if (fs.existsSync(pagePath)) {
    console.log(`Fixing ${toolName}`);
    
    // 读取文件内容
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // 移除文件末尾的重复动态导入语句
    content = content.replace(/\s*\)\;\s*import dynamic from "next\/dynamic"[\s\S]*?}\s*$/, ');\n}');
    
    // 写入修改后的内容
    fs.writeFileSync(pagePath, content, 'utf8');
    console.log(`✓ Fixed ${toolName}`);
  } else {
    console.log(`⚠ Page not found: ${pagePath}`);
  }
});

console.log('\nFix completed!');
