# 部署说明

## 推荐平台
Vercel

## 本地开发
```bash
cd /Users/spitir/Desktop/gpt-image-waterfall/web-app
npm install
npm run build:data
npm run dev
```

## 生产构建
```bash
npm run build:data
npm run build
```

## Vercel 部署要点
1. 将 `web-app` 连接到一个 Git 仓库
2. Framework Preset 选择 Next.js
3. Root Directory 设为 `web-app`（如果你把总目录整体上传到单仓库）
4. 环境变量可配置：
   - `NEXT_PUBLIC_SITE_URL`
5. 部署后把 `src/lib/site.ts` 里的正式域名替换掉

## 当前站点能力
- 首页 Hero + 搜索 + 分类 + 排序
- 分类页支持 URL 查询参数
- 详情页 SEO metadata
- robots / sitemap / OG image 已准备
