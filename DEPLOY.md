# 部署说明

本文档面向当前 `web-app/` 这个 Next.js 产品化站点。

## 当前项目形态

这是一个基于开源 Prompt 数据构建的内容型网站，核心能力包括：

- 首页产品化分发
- Prompt 瀑布流浏览
- 分类 / 搜索 / 排序 / 标签发现
- 详情页承接与 Prompt 复制
- 收藏与最近浏览（浏览器本地存储）
- SEO 基础设施（metadata / sitemap / robots / OG image）

由于收藏与最近浏览是本地持久化，所以当前版本**无需数据库即可部署**。

---

## 推荐部署平台

当前优先推荐：

1. **Vercel**：最适合标准 Next.js 项目，部署最省心
2. **Cloudflare Pages / Workers**：可部署，但建议先做兼容适配
3. **阿里云 ECS**：适合需要自控服务环境时使用

---

## 本地开发

```bash
cd /Users/spitir/Desktop/gpt-image-waterfall/web-app
npm install
npm run build:data
npm run dev
```

默认访问：

```text
http://localhost:3000
```

---

## 生产构建

```bash
npm install
npm run build:data
npm run lint
npm run build
```

如果以上命令通过，说明项目可进入部署阶段。

---

## 环境变量

当前建议配置：

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

> 用于站点 metadata、canonical、分享信息等正式域名能力。

如果未配置，项目当前代码中仍有默认站点 URL，因此建议在正式部署前同步改成你的真实域名。

---

## Vercel 部署

### 方式一：仓库根目录直接部署
如果你把整个 `gpt-image-waterfall` 仓库推到 GitHub：

- Framework Preset：`Next.js`
- Root Directory：`web-app`
- Install Command：`npm install`
- Build Command：`npm run build:data && npm run build`

### 方式二：只部署 `web-app`
如果你单独把 `web-app` 拆成独立仓库，则 Root Directory 可留空。

### Vercel 需要检查的项

- Node 版本建议使用 20+
- 环境变量中补上 `NEXT_PUBLIC_SITE_URL`
- 首次部署后检查：
  - 首页
  - 分类页
  - 详情页
  - 图片资源
  - sitemap
  - robots

---

## Cloudflare 部署说明

当前项目不是原生为 Cloudflare 适配的，如果要部署到 Cloudflare，建议先做一轮改造，包括：

- 增加 Cloudflare 兼容构建链路
- 调整构建命令
- 校验静态资源与动态路由兼容性

如果需要，我可以继续直接把当前项目改成 **Cloudflare 可部署版**。

---

## 阿里云 ECS 部署说明

如果要部署到阿里云服务器，推荐：

- Node.js 20
- PM2 常驻运行
- Nginx 反向代理
- 可选 HTTPS 与域名绑定

基本流程：

1. 上传项目到服务器
2. `npm install`
3. `npm run build:data`
4. `npm run build`
5. `npm run start` 或 PM2 启动
6. Nginx 反向代理到对应端口

---

## 项目上线后建议检查

部署完成后建议手动验证：

- 首页是否正常加载
- 分类页 URL 查询参数是否正常
- 详情页是否可访问
- 复制 Prompt 功能是否正常
- 收藏 / 最近浏览是否正常
- 移动端显示是否正常
- `sitemap.xml` 是否可打开
- `robots.txt` 是否可打开

---

## 当前仓库关系

- 原始数据源仓库：
  `https://github.com/EvoLinkAI/awesome-gpt-image-2-prompts`
- 当前产品化仓库：
  `https://github.com/spitir2014/gpt-image-waterfall`

---

## 后续可继续做的部署增强

- Cloudflare 完整适配版构建
- Dockerfile
- docker-compose
- GitHub Actions 自动部署
- Vercel / Cloudflare 一键部署说明

## 版本发布

当前建议首个公开版本：

- `v0.1.0`
- 发布说明草稿见：`docs/release-v0.1.0.md`
