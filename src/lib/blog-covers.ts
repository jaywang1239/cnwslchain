/**
 * 博客主图（抽象封面）覆盖表
 * ---------------------------------------------------------------------------
 * 2026-11-04：用户要求「文章主图要求不一样，可以抽象化，要做高级」。
 * 于是给每篇文章按主题各做一张抽象几何图（1600×1000，与详情页 aspect-[16/10]
 * 容器完全一致），统一深色底 + 单一主色相 + 细线几何 + 胶片颗粒，靠构图区分而不是
 * 靠配色乱跳。生成脚本：outputs/blog-covers/make_blog_covers.py（PIL + numpy）。
 *
 * 为什么不写进 data/posts.json：
 *   🔴 本地 data/ 是线上镜像且长期落后线上（本轮线上 20 篇、本地只有 13 篇），
 *   整文件提交会把线上新增的 7 篇回滚掉。所以主图在读取层做覆盖，
 *   只改 src/ 下的代码，data/ 一个字节不动。
 *
 * 键必须是 **slug**（不是 id）：线上 7 篇本地没有的文章也会命中同一张表。
 * 未列出的 slug 自动退回文章自带的 featuredImage。
 */
export const BLOG_ART_COVERS: Readonly<Record<string, string>> = {
  "cable-carrier-selection-guide": "/images/blog/art/cable-carrier-selection-guide.webp",
  "cable-carrier-selection-8-steps": "/images/blog/art/cable-carrier-selection-8-steps.webp",
  "cable-carrier-inner-width": "/images/blog/art/cable-carrier-inner-width.webp",
  "cable-carrier-inner-height": "/images/blog/art/cable-carrier-inner-height.webp",
  "cable-carrier-bend-radius": "/images/blog/art/cable-carrier-bend-radius.webp",
  "cable-carrier-length-calculation": "/images/blog/art/cable-carrier-length-calculation.webp",
  "cable-carrier-speed-acceleration": "/images/blog/art/cable-carrier-speed-acceleration.webp",
  "cable-carrier-material-comparison": "/images/blog/art/cable-carrier-material-comparison.webp",
  "low-noise-cable-carrier": "/images/blog/art/low-noise-cable-carrier.webp",
  "linear-module-cable-carrier": "/images/blog/art/linear-module-cable-carrier.webp",
  "robot-arm-cable-carrier": "/images/blog/art/robot-arm-cable-carrier.webp",
  "gantry-robot-cable-carrier": "/images/blog/art/gantry-robot-cable-carrier.webp",
  "smt-equipment-cable-carrier": "/images/blog/art/smt-equipment-cable-carrier.webp",
  "semiconductor-equipment-cable-carrier":
    "/images/blog/art/semiconductor-equipment-cable-carrier.webp",
  "cleanroom-cable-carrier-selection-guide":
    "/images/blog/art/cleanroom-cable-carrier-selection-guide.webp",
  "antistatic-esd-cable-carrier": "/images/blog/art/antistatic-esd-cable-carrier.webp",
  "cable-carrier-vs-tank-chain": "/images/blog/art/cable-carrier-vs-tank-chain.webp",
  "tpu-cable-carrier-performance": "/images/blog/art/tpu-cable-carrier-performance.webp",
  "lifespan-testing-and-warranty": "/images/blog/art/lifespan-testing-and-warranty.webp",
  "custom-cable-carrier-delivery-process":
    "/images/blog/art/custom-cable-carrier-delivery-process.webp",
};

/** 命中覆盖表就用抽象封面，否则保留文章自带图（可能为空 → 列表不渲染图）。 */
export function resolveFeaturedImage(slug: string, fallback: string): string {
  return BLOG_ART_COVERS[slug] ?? fallback;
}
