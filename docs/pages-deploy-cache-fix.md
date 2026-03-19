# 0.pack / 0.pack.gz 是什么？以及 Pages 25MB 限制报错

## 已做的修复（Cloudflare Pages）

1. **next.config.mjs**：已开启 `output: "export"`，构建会生成 **`out/`** 目录（仅静态 HTML/JS/CSS，不含 webpack cache）。
2. **blog/[slug]**：已为静态导出添加 `generateStaticParams`。
3. **images**：已设置 `images.unoptimized: true`（静态导出必须）。

你需要在 **Cloudflare Pages 项目设置**里把 **Build output directory** 设为 **`out`**，这样只会部署 `out/`，不会带上 `cache/` 或 `0.pack`。

- 路径：Cloudflare Dashboard → Pages → 你的项目 → **Settings** → **Builds & deployments** → **Build configuration** → **Build output directory** 填 **`out`**。
- 保存后重新部署即可。

---

## 0.pack 是什么？

- **`0.pack`**（以及可能出现的 **`0.pack.gz`**）是 **Webpack 5 的持久化缓存文件**。
- 路径一般在：`node_modules/.cache/webpack/client-production/0.pack` 或 `.next/cache/...`。
- 用途：保存本次构建的中间结果，下次构建时复用，**加快增量构建**。
- 内容：二进制序列化的模块图、编译结果等，**不是业务代码**，用户访问站点用不到。

所以：**分包、代码分割只影响最终打出来的 JS/CSS，不会拆分或压缩这个 cache 文件**；这个文件本来就不该被部署。

---

## 为什么 Pages 会报 25 MiB 超限？

GitHub Pages 限制**单个文件 ≤ 25 MiB**。若部署时把**整个构建目录**（包含 `node_modules/.cache` 或 `.next/cache`）一起上传，就会把 84.8 MiB 的 `0.pack` 传上去，触发该错误。

---

## 正确做法：不要部署 cache

1. **只部署静态产出**  
   - 若使用 Next.js 静态导出（`output: 'export'`），部署时**只上传 `out/` 目录**里的内容。  
   - 不要上传：`node_modules`、`.next`、`node_modules/.cache`、`.next/cache`。

2. **在 CI 里禁用 webpack 持久化缓存（可选）**  
   部署到 Pages 的流水线里通常不需要利用本地 cache，可在构建时关掉，避免生成大文件：
   - 环境变量：`NEXT_DISABLE_CACHE=1` 或  
   - Next.js 配置里关闭 cache（若框架支持）。

3. **确保 .gitignore 包含 cache**  
   例如（你已有 `.next`、`node_modules`，可再确认）：
   ```
   .next
   node_modules
   .npm-cache
   ```

---

## 若使用 GitHub Actions 部署到 Pages

- **publish 步骤**里“要上传的目录”必须是**静态站点根目录**（例如 `out` 或 `dist`），不能是项目根或包含 `.next`/`node_modules` 的目录。
- 示例（仅上传静态导出结果）：
  ```yaml
  - name: Upload artifact
    uses: actions/upload-pages-artifact@v3
    with:
      path: 'out'   # 仅 out 目录，不要填 . 或 .next
  ```

---

## 总结

| 问题 | 说明 |
|------|------|
| 0.pack / 0.pack.gz 是什么？ | Webpack 持久化缓存，用于加速下次构建，不是站点资源。 |
| 分包能减小它吗？ | 不能，分包只影响最终 JS/CSS，不改变 cache 体积。 |
| 怎么解决 25 MiB 报错？ | 部署时只上传静态产出（如 `out/`），不要上传含 cache 的目录。 |
