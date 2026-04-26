# GPT Image Waterfall

一个把开源仓库 [`EvoLinkAI/awesome-gpt-image-2-prompts`](https://github.com/EvoLinkAI/awesome-gpt-image-2-prompts) 产品化改造成 **AI 图片 Prompt 灵感瀑布流图库** 的项目。

它不是 README 镜像站，而是一个更接近正式内容产品的浏览体验：支持首页分发、分类浏览、详情承接、Prompt 复制、收藏、最近浏览、标签发现与基础 SEO。

## 项目截图

### 首页

![首页截图](./docs/homepage-product-shot.png)

## 在线产品目标

围绕 AI 图片 Prompt 的消费与发现，打造一个更像 Pinterest / 小红书内容产品的站点，而不是工程师导向的数据清单页。

当前版本重点：

- 首页产品化分发
- 灵感瀑布流卡片浏览
- 分类 / 搜索 / 排序 / 标签发现
- Prompt 详情页与复制
- 收藏与最近浏览（本地持久化）
- 基础 SEO（metadata / robots / sitemap / OG image）

---

## 核心特性

### 1. 产品化首页
- Hero 首屏定位
- Featured Showcase 精选内容
- Trending 趋势分发
- Topics 专题入口
- CTA 承接区

### 2. Prompt 灵感浏览
- 瀑布流卡片布局
- 大图预览与摘要信息
- 分类筛选、关键词搜索、排序
- 标签云与内容发现入口

### 3. 详情页承接
- Prompt 正文浏览
- 一键复制 Prompt
- 案例侧边信息栏
- 相关推荐内容
- 浏览行为记录

### 4. 可运营能力雏形
- 本地收藏
- 最近浏览
- 标签入口
- 专题化内容结构

### 5. 工程能力
- Next.js 16 App Router
- TypeScript
- Tailwind CSS
- 构建时标准化数据生成

---

## 技术栈

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- 构建脚本：`scripts/build-cases.mjs`

---

## 目录结构

```text
web-app/
├── README.md
├── DEPLOY.md
├── docs/                      # 仓库展示截图等素材
├── public/images/             # 站点使用的图片资源
├── scripts/build-cases.mjs
├── src/app/
├── src/components/
├── src/data/cases.json
├── src/lib/
└── src/types/
```

---

## 本地启动

### 1. 进入项目

```bash
cd web-app
```

### 2. 安装依赖

```bash
npm install
```

### 3. 生成站点数据

```bash
npm run build:data
```

### 4. 启动开发环境

```bash
npm run dev
```

打开：

```text
http://localhost:3000
```

---

## 构建与校验

```bash
npm run lint
npm run build:data
npm run build
```

---

## 数据来源

主要来自原始仓库中的：

- `gpt_image2_prompts.json`
- `data/ingested_tweets.json`

项目会在构建阶段把原始数据统一整理成站点消费用的数据结构，例如：

- 标题
- 分类
- 标签
- 作者
- Prompt 文本
- 图片路径
- slug

---

## 当前已完成能力

- [x] 首页产品化改造
- [x] 分类页
- [x] Prompt 详情页
- [x] 搜索 / 排序 / 筛选
- [x] 收藏
- [x] 最近浏览
- [x] 标签云
- [x] 相关推荐
- [x] robots / sitemap / OG image
- [x] GitHub 仓库初始化与首版代码推送

---

## 下一步方向

接下来可以继续演进为：

- 收藏列表页
- 标签专题页
- 专题聚合页
- Prompt 相似推荐
- Cloudflare / Vercel 一键部署链路
- 用户体系与云端收藏同步

---

## 相关说明

- 原始仓库：
  `https://github.com/EvoLinkAI/awesome-gpt-image-2-prompts`
- 当前产品化仓库：
  `https://github.com/spitir2014/gpt-image-waterfall`
- 部署说明：
  见 `DEPLOY.md`
- Cloudflare 部署准备：
  见 `CLOUDFLARE.md`
- 版本记录：
  见 `CHANGELOG.md`
- License：
  见 `LICENSE`

---

## License

本仓库当前使用 **MIT License**。

说明：
- 本仓库代码部分按 MIT 开放
- 原始内容与素材仍需同时遵循来源仓库对应许可与说明
