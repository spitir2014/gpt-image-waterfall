# 仓库补充说明

这个仓库当前以 `web-app/` 目录本身作为 Git 仓库根目录，因此对外展示内容、部署说明与截图素材都已集中放在当前仓库内。

## 当前主要文件

- `README.md`：对外展示的仓库首页说明
- `DEPLOY.md`：部署说明
- `docs/`：GitHub README 使用的截图素材
- `public/images/`：站点实际使用图片资源
- `scripts/build-cases.mjs`：数据构建脚本

## 当前产品能力

- 首页产品化分发
- 分类 / 搜索 / 排序 / 标签发现
- Prompt 详情页
- 收藏与最近浏览
- SEO 基础设施

## 本地运行

```bash
npm install
npm run build:data
npm run dev
```

## 构建校验

```bash
npm run lint
npm run build
```
