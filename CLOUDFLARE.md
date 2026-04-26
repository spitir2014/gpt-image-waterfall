# Cloudflare 部署说明（静态导出版）

本文档针对当前仓库 `spitir2014/gpt-image-waterfall` 的 **Cloudflare Pages 静态部署方案**。

## 当前结论

这个项目现在已经改造成可静态导出：

- 使用 `Next.js 16`
- 采用 `output: "export"`
- 分类页与详情页均已静态化
- `robots.txt` / `sitemap.xml` / `opengraph-image` 也已兼容静态导出
- 本地 `npm run build` 已验证通过
- 如果云端构建环境没有 `../source-repo` 原始数据目录，会自动回退复用仓库内已有的 `src/data/cases.json`

因此，Cloudflare 上**不再使用** `@cloudflare/next-on-pages`，直接按静态站点部署即可。

---

## 一、Cloudflare 中文界面应该怎么填

进入：

- **Workers 和 Pages**
- **创建**
- **Pages**
- **连接到 Git**
- 选择仓库：`spitir2014/gpt-image-waterfall`

然后在配置页填写：

### 项目名称

```text
gpt-image-waterfall
```

### 生产分支

```text
main
```

### 框架预设

如果有，就选：

```text
Next.js
```

如果没有，就保持默认也可以。

### 构建命令

```bash
npm run build:data && npm run build
```

### 构建输出目录

```text
out
```

### 根目录

```text
留空
```

### 环境变量

新增：

变量名：

```text
NEXT_PUBLIC_SITE_URL
```

变量值：

```text
https://gpt-image-waterfall.pages.dev
```

> 后面如果你绑定正式域名，再把这个值改成正式域名。

---

## 二、为什么现在用 `out`

因为当前项目已经切换为：

```ts
output: "export"
```

Next.js 构建完成后会输出静态站点目录：

```text
out/
```

所以 Cloudflare 只需要把 `out/` 作为发布目录即可。

---

## 三、为什么不再用 `next-on-pages`

原因很简单：

- `@cloudflare/next-on-pages` 当前不支持 `Next.js 16`
- 你之前的报错就是依赖版本冲突导致的
- 当前项目本身适合纯静态部署，所以没必要继续走那条路

---

## 四、当前静态版的取舍

为了先保证 Cloudflare 能稳定上线，我已经把站点调整为静态导出版，因此有一个取舍：

### 当前保留
- 首页
- 分类页
- 详情页
- 图片展示
- Prompt 复制
- 收藏
- 最近浏览
- sitemap
- robots
- opengraph-image

### 当前暂时降级
- 基于 URL 参数的服务端搜索/排序联动

也就是说，页面仍然能展示搜索输入体验，但当前这版主要目标是：

**优先稳定部署到 Cloudflare。**

后面如果你愿意，我可以继续把搜索/筛选改成纯前端静态站兼容方案。

---

## 五、部署成功后你要检查什么

部署成功后，优先检查：

```text
/
/category/portrait-photography/
/p/convenience-store-neon-portrait-1/
/robots.txt
/sitemap.xml
```

如果这些都正常，说明 Cloudflare 静态部署已经成功。

---

## 六、如果后面要绑定正式域名

Cloudflare Pages 项目里：

- **自定义域**
- **设置自定义域**

绑定后，再回到环境变量，把：

```text
NEXT_PUBLIC_SITE_URL
```

改成你的正式域名，例如：

```text
https://gallery.xxx.com
```

然后重新部署一次。
