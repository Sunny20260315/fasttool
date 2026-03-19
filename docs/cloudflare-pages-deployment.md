# Cloudflare Pages 部署指南

## 问题分析

错误信息：
```
Error: Output directory "dist" not found.
Failed: build output directory not found
```

**根本原因**：
- Cloudflare Pages 的 Wrangler 工具默认查找 `dist` 目录
- Next.js 的默认输出目录是 `.next`
- 项目中没有 `dist` 目录，导致部署失败

## 解决方案

### 方案一：通过 Cloudflare Pages 控制台配置（推荐）

1. **连接 Git 仓库**：
   - 登录 [Cloudflare Pages 控制台](https://dash.cloudflare.com/)
   - 点击 "Create a project" 或进入现有项目
   - 连接到你的 GitHub/GitLab/Bitbucket 仓库

2. **配置构建设置**：
   在项目设置中，找到 "Build & deployments" 部分，配置以下设置：

   **框架预设**：选择 "Next.js"

   **构建命令**：
   ```bash
   npm run build
   ```

   **构建输出目录**：
   ```
   .next
   ```

   **环境变量**（可选）：
   - `NODE_VERSION`: `18` 或更高版本

3. **部署项目**：
   - 保存配置后，Cloudflare Pages 会自动从 Git 仓库拉取代码
   - 执行构建命令，生成 `.next` 目录
   - 部署静态文件到 Cloudflare 的全球 CDN

### 方案二：使用 Wrangler CLI 部署

1. **安装 Wrangler CLI**：
   ```bash
   npm install -g wrangler
   ```

2. **登录 Cloudflare**：
   ```bash
   wrangler login
   ```

3. **创建项目**：
   ```bash
   wrangler pages project create fasttool
   ```

4. **部署项目**：
   ```bash
   wrangler pages deploy .next --project-name=fasttool
   ```

### 方案三：使用 `wrangler.toml` 配置文件

项目根目录已包含 `wrangler.toml` 文件，配置如下：

```toml
name = "fasttool"
compatibility_date = "2024-01-01"

[build]
command = "npm run build"
cwd = "."
```

## 验证构建输出

确保 `.next` 目录包含以下内容：

- `static/` - 静态资源文件
- `server/` - 服务器端代码
- `BUILD_ID` - 构建标识
- `build-manifest.json` - 构建清单

## 注意事项

1. **文件大小限制**：
   - Cloudflare Pages 单个文件限制为 25MB
   - 项目已通过代码分割和动态导入优化，确保所有文件符合要求

2. **中间件兼容性**：
   - 已移除 `output: "export"` 配置
   - 保留了 `middleware.ts` 用于多语言路由重定向

3. **静态资源**：
   - 所有静态资源应放在 `public/` 目录
   - 已移除 `app/favicon.ico`，保留 `public/favicon.ico`

## 部署后验证

部署成功后，访问以下 URL 验证：

- 首页：`https://your-project.pages.dev/`
- 多语言路由：`https://your-project.pages.dev/zh/`、`https://your-project.pages.dev/en/`
- 工具页面：`https://your-project.pages.dev/zh/tools/`

## 常见问题

### Q: 构建失败，提示 "Output directory not found"

**A**: 检查 Cloudflare Pages 控制台中的构建输出目录设置，确保设置为 `.next`

### Q: 部署后页面显示 404

**A**: 检查 `middleware.ts` 配置，确保路由重定向逻辑正确

### Q: 图片加载失败

**A**: 确保图片文件放在 `public/` 目录，并且路径引用正确

## 总结

通过以上任一方案，你应该能够成功将 Next.js 项目部署到 Cloudflare Pages。推荐使用方案一（控制台配置），因为它最简单且提供了图形界面来管理部署设置。