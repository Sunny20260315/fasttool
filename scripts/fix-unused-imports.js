#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// 工具页面目录
const toolsDir = path.join(__dirname, '..', 'app', '[locale]', 'tools');

// 工具列表
const toolList = [
  'cad-to-pdf',
  'crop-image',
  'jpg-to-png',
  'png-to-jpg',
  'png-to-webp',
  'remove-background',
  'webp-to-png'
];

console.log(`Fixing unused imports in ${toolList.length} tool pages`);

// 处理每个工具页面
toolList.forEach(toolName => {
  const pagePath = path.join(toolsDir, toolName, 'page.tsx');
  
  if (fs.existsSync(pagePath)) {
    console.log(`Fixing ${toolName}`);
    
    // 读取文件内容
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // 移除未使用的 ToolLayout 导入
    content = content.replace(/import { ToolLayout } from "@\/components\/ToolLayout";\s*/, '');
    
    // 写入修改后的内容
    fs.writeFileSync(pagePath, content, 'utf8');
    console.log(`✓ Fixed ${toolName}`);
  } else {
    console.log(`⚠ Page not found: ${pagePath}`);
  }
});

console.log('\nFix completed!');
