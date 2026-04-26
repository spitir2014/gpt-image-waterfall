# Cloudflare 部署准备说明

本文档用于帮助你把当前项目部署到 Cloudflare Pages / Workers。

## 先说结论

当前项目是标准 Next.js 16 应用，已经补充了第一轮 Cloudflare 部署准备：

- 增加了 Cloudflare 相关脚本
- 调整了 `next.config.ts` 的图片配置
- 保留了 `build:data` 这一步，确保部署前能生成站点数据

> 说明：这是一版“部署准备”，目的是让你更顺利地接入 Cloudflare。首次部署时，仍建议按照本文档一步一步操作并观察 Cloudflare 控制台日志。

---

## 当前新增脚本

在 `package.json` 中新增了：

```json
{
  "scripts": {
    "build:prod": "npm run build:data && npm run build",
    "cf:install": "npm install -D @cloudflare/next-on-pages wrangler",
    "cf:build": "npm run build:data && npx @cloudflare/next-on-pages",
    "cf:preview": "npx wrangler pages dev .vercel/output/static"
  }
}
```

用途分别是：

- `build:prod`：标准生产构建
- `cf:install`：安装 Cloudflare 部署依赖
- `cf:build`：执行 Cloudflare 构建流程
- `cf:preview`：本地预览 Cloudflare 构建产物

---

## 第一次接入前你要知道

Cloudflare Pages 部署 Next.js 时，通常是：

1. 从 GitHub 拉代码
2. 安装依赖
3. 执行构建命令
4. 产出 Pages/Workers 可运行结果
5. 绑定 `*.pages.dev` 域名或你自己的域名

对你这个项目，关键点在于：

- 不能只 `next build`
- 必须先执行 `npm run build:data`
- 图片最好关闭 Next image 优化依赖，因此已配置：
  - `images.unoptimized = true`

---

## 推荐首次部署命令

如果 Cloudflare 控制台需要你填写 Build Command，优先使用：

```bash
npm install && npm run cf:install && npm run cf:build
```

如果后面你把 Cloudflare 依赖正式写入仓库并提交 lockfile，也可以简化。

---

## 部署完成后要验证什么

至少检查这些：

- 首页是否正常打开
- 分类页是否可访问
- 详情页是否可访问
- 图片是否正常显示
- 收藏 / 最近浏览是否在浏览器里正常工作
- `robots.txt` 是否正常
- `sitemap.xml` 是否正常

---

## 如果 Cloudflare 首次构建失败

重点检查：

1. Build Command 是否漏了 `build:data`
2. Node 版本是否过低（建议 20）
3. 是否成功安装了 `@cloudflare/next-on-pages`
4. 是否存在 Cloudflare 对 Next 版本的兼容提示

如果你把 Cloudflare 构建日志发给我，我可以继续直接帮你排查。
