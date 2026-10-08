/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: { cpus: 2 },
  // 2026-10-08 新增：不再在响应头暴露 X-Powered-By: Next.js。
  // 纯属指纹收敛——告诉扫描器"这是 Next.js 站"对我们没有任何好处。
  poweredByHeader: false,
  // Hostinger 共享主机不支持稳定的 /_next/image 优化（部分图返回 200 但空响应导致裂图），
  // 改走原始 /images/* 文件，已验证全部 200 可加载。
  // 副作用：next/image 不再生成 srcset，故分类图改用手工 srcSet（见 product-catalog.ts）。
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // —— 安全响应头 ——
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // HSTS：2 年 + 含子域。preload 暂不写，稳定后再决定是否提交 hstspreload.org
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // —— 页面缓存：CDN 缓存 1h，过期后后台静默刷新 1 天 ——
          { key: "Cache-Control", value: "public, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
      {
        // 构建产物（JS/CSS/字体）：长缓存 + 不可变
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // —— 域名归一化：裸域名 → www（301）——
      // 避免 cnwslchain.com 与 www.cnwslchain.com 被搜索引擎视为两个站点、分散权重。
      // canonical / sitemap / 外链统一使用 www 版本。
      {
        source: "/:path*",
        has: [{ type: "host", value: "cnwslchain.com" }],
        destination: "https://www.cnwslchain.com/:path*",
        permanent: true,
      },
      // Old 4-segment model URLs → flat 3-segment URLs (301 permanent)
      {
        source: "/products/:category/:series/:spec",
        destination: "/products/model/:spec",
        permanent: true,
      },
      {
        source: "/:locale(en|vi|es|it|ru)/products/:category/:series/:spec",
        destination: "/:locale/products/model/:spec",
        permanent: true,
      },
      // Legacy Chinese-only placeholder product pages → catalog
      {
        source: "/products/item/:slug",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/:locale(en|vi|es|it|ru)/products/item/:slug",
        destination: "/:locale/products",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
