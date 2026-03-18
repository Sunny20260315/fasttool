# FastTool

**免费在线图片转换 · PDF 转换工具大全**

FastTool 提供免费在线图片压缩、格式转换、PDF 压缩与转换等工具，无需注册，优先在浏览器端本地处理，速度快且更注重隐私。

---

## 功能特点

- **无需注册**：核心工具可直接使用，无需登录
- **本地处理**：图片与 PDF 在浏览器内处理，文件不离开设备
- **中英双语**：支持 `/en`、`/zh` 语言切换
- **响应式**：支持桌面与移动端

---

## 工具列表

### 图片工具

| 工具 | 说明 |
|------|------|
| 图片压缩 | 快速减小图片体积 |
| 图片尺寸调整 | 调整宽度和高度 |
| HEIC 转 JPG | 将 HEIC 转为 JPG |
| TIFF 转 JPG | 将 TIFF 转为 JPG |
| 图片转 ICO | 将图片转为 ICO |
| 图片转 JPG / PNG / BMP / WEBP | 常见格式互转 |
| 图片旋转 | 按角度旋转图片 |
| 图片裁剪 | 裁剪指定区域 |
| 图片转 Base64 | 将图片编码为 Base64 |
| Base64 转图片 | 将 Base64 还原为图片 |

### PDF 工具

| 工具 | 说明 |
|------|------|
| PDF 压缩 | 快速压缩 PDF 文件体积 |
| PDF 转图片 | 将 PDF 页面导出为图片 |

---

## 技术栈

- **Next.js 14**（App Router）
- **React 18** + **TypeScript**
- **Tailwind CSS**
- **shadcn 风格** UI 组件（Button、Card 等）
- **Lucide React** 图标

---

## 本地运行

```bash
# 安装依赖
npm install

# 开发模式
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000)，默认会按语言跳转到 `/en` 或 `/zh`。

```bash
# 构建生产
npm run build

# 启动生产服务
npm start
```

---

## 路由结构

- `/en`、`/zh` — 首页（中/英）
- `/en/tools`、`/zh/tools` — 所有工具列表
- `/en/tools/compress-image`、`/zh/tools/compress-image` 等 — 各工具页
- `/en/about`、`/zh/about` — 关于
- `/en/faq`、`/zh/faq` — 常见问题
- `/en/contact`、`/zh/contact` — 联系我们
- `/en/privacy`、`/zh/privacy` — 隐私
- `/en/blog`、`/zh/blog` — 博客

---

## 说明

- 主要图片处理在浏览器端完成（Canvas API + browser-image-compression）
- PDF 解析与导出使用 pdfjs-dist、pdf-lib 等
- 部分页面（如 remove-background）为占位，待后续实现

---

## License

Private. 保留所有权利。
