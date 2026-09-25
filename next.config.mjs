/** @type {import('next').NextConfig} */
const nextConfig = {
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
