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

console.log(`Found ${toolPages.length} tool pages to rewrite`);

// 重写每个工具页面
toolPages.forEach(pagePath => {
  console.log(`Rewriting ${pagePath}`);
  
  let content = fs.readFileSync(pagePath, 'utf8');
  
  // 提取工具组件名称和路径
  const importMatch = content.match(/import\s+\{\s*([^}]+)\s*\}\s+from\s+"@\/components\/tools\/([^"\']+)"/);
  
  if (importMatch) {
    const componentName = importMatch[1].trim();
    const componentPath = importMatch[2].trim();
    
    // 提取其他导入语句
    const otherImports = content.match(/(import.*from.*;\s*)+/s)[0];
    
    // 提取页面内容
    const pageContent = content.replace(/import.*from.*;\s*/s, '').replace(/export\s+default\s+function\s+[^\(]+\([^\)]+\)\s*\{[^}]+\}/s, (match) => match);
    
    // 重写文件内容
    const newContent = `import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { ToolLayout } from "@/components/ToolLayout";
import { isLocale } from "@/lib/i18n";

const ${componentName} = dynamic(() => import("@/components/tools/${componentPath}").then((module) => ({ default: module.${componentName} })), {
  ssr: false,
});

${content.match(/export\s+async\s+function\s+generateMetadata[\s\S]+?}\n\n/)[0]}
${content.match(/export\s+default\s+function[\s\S]+$/)[0]}`;
    
    // 写入修改后的内容
    fs.writeFileSync(pagePath, newContent, 'utf8');
    console.log(`✓ Rewrote ${pagePath}`);
  } else {
    console.log(`⚠ No tool component import found in ${pagePath}`);
  }
});

console.log('\nRewrite completed!');
