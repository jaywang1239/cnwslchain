/** @type {import('next').NextConfig} */
const nextConfig = {
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
