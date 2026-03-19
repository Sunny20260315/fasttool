#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// 工具页面目录
const toolsDir = path.join(__dirname, '..', 'app', '[locale]', 'tools');

// 读取所有工具页面
const toolPages = [];

function readToolPages(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory() && entry.name !== 'node_modules') {
      const pagePath = path.join(fullPath, 'page.tsx');
      if (fs.existsSync(pagePath)) {
        toolPages.push(pagePath);
      } else {
        readToolPages(fullPath);
      }
    }
  }
}

readToolPages(toolsDir);

console.log(`Found ${toolPages.length} tool pages to fix`);

// 修复每个工具页面
toolPages.forEach(pagePath => {
  console.log(`Fixing ${pagePath}`);
  
  let content = fs.readFileSync(pagePath, 'utf8');
  
  // 检查文件中是否有动态导入语句
  if (content.includes('dynamic from "next/dynamic"')) {
    // 提取动态导入语句
    const dynamicImportMatch = content.match(/import dynamic from "next\/dynamic"[\s\S]*?};\s*/);
    
    if (dynamicImportMatch) {
      const dynamicImport = dynamicImportMatch[0];
      
      // 移除文件末尾的动态导入语句
      content = content.replace(/import dynamic from "next\/dynamic"[\s\S]*?};\s*/, '');
      
      // 移除文件末尾多余的 } 符号
      content = content.replace(/\s*}\s*$/, '');
      
      // 在所有 import 语句之后添加动态导入
      content = content.replace(/((?:import.*from.*;\s*)+)/, `$1\n${dynamicImport}`);
      
      // 确保文件末尾有正确的 } 符号
      if (!content.trim().endsWith('}')) {
        content = content.trim() + '\n}';
      }
      
      // 写入修改后的内容
      fs.writeFileSync(pagePath, content, 'utf8');
      console.log(`✓ Fixed ${pagePath}`);
    } else {
      console.log(`⚠ No dynamic import found in ${pagePath}`);
    }
  } else {
    console.log(`⚠ No dynamic import found in ${pagePath}`);
  }
});

console.log('\nFix completed!');
