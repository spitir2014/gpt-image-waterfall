import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background:
            "radial-gradient(circle at top left, rgba(34,211,238,0.4), transparent 24%), radial-gradient(circle at top right, rgba(232,121,249,0.35), transparent 24%), #07090d",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 24,
              background: "linear-gradient(135deg, #67e8f9, #ffffff, #f0abfc)",
              color: "#111827",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            GI
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, fontWeight: 700 }}>GPT Image Gallery</div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.72)" }}>
              AI Prompt Inspiration Waterfall
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 64, lineHeight: 1.1, fontWeight: 800, maxWidth: 880 }}>
            把开源 Prompt 案例，做成一个能刷、能搜、能复制的产品。
          </div>
          <div style={{ fontSize: 24, color: "rgba(255,255,255,0.8)", maxWidth: 900 }}>
            瀑布流浏览 · 分类筛选 · 详情页 · Prompt 一键复制 · SEO 分发准备
          </div>
        </div>
      </div>
    ),
    size
  );
}
