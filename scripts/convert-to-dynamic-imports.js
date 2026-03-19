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

console.log(`Found ${toolPages.length} tool pages to convert`);

// 转换每个工具页面
toolPages.forEach(pagePath => {
  console.log(`Converting ${pagePath}`);
  
  let content = fs.readFileSync(pagePath, 'utf8');
  
  // 找到工具组件的导入语句
  const importMatch = content.match(/import\s+\{\s*([^}]+)\s*\}\s+from\s+"@\/components\/tools\/([^"\']+)"/);
  
  if (importMatch) {
    const componentName = importMatch[1].trim();
    const componentPath = importMatch[2].trim();
    
    // 移除旧的导入语句
    content = content.replace(/import\s+\{\s*[^}]+\s*\}\s+from\s+"@\/components\/tools\/[^"\']+"\s*;/, '');
    
    // 在适当位置添加 dynamic 导入
    const dynamicImport = `import dynamic from "next/dynamic";

const ${componentName} = dynamic(() => import("@/components/tools/${componentPath}").then((module) => ({ default: module.${componentName} })), {
  ssr: false,
});
`;
    
    // 在最后一个 import 语句之后添加
    content = content.replace(/((?:import.*from.*;\s*)+)/, `$1${dynamicImport}`);
    
    // 写入修改后的内容
    fs.writeFileSync(pagePath, content, 'utf8');
    console.log(`✓ Converted ${pagePath}`);
  } else {
    console.log(`⚠ No tool component import found in ${pagePath}`);
  }
});

console.log('\nConversion completed!');
