/**
 * 博客主图（真实产品/工况照片）覆盖表
 * ---------------------------------------------------------------------------
 * 2026-11-04 二次调整：抽象几何图被判定「太抽象、不像正经企业」，改为真实图片。
 * 每篇一张、互不重复，1600×1000（与详情页 aspect-[16/10] 容器一致），WebP q≈80，
 * 单张 35–190KB。生成脚本：outputs/real-photos/build_final.py。
 *
 * 两类构图：
 *   L 线（6 张）自家 CNWSL 产品棚拍：白底原图洪水填充成 #F4F5F7 背景，产品等比
 *     居中不裁切，像产品画册内页 —— 用于选型/结构/材质这类讲产品本身的文章。
 *   P 线（14 张）真实工况实拍：cover 裁 16:10 + 统一降饱和/轻暗角 —— 用于机器人、
 *     龙门、SMT、半导体、洁净室等讲应用场景的文章。
 * 两类都统一调色（sat 0.86 / contrast 1.05 / 轻锐化 / 暗角 0.12），保证 20 张成一套。
 * 图内一律不放文字（240px 卡片会糊）。
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
  "cable-carrier-selection-guide": "/images/blog/photo/cable-carrier-selection-guide.webp",
  "cable-carrier-selection-8-steps": "/images/blog/photo/cable-carrier-selection-8-steps.webp",
  "cable-carrier-inner-width": "/images/blog/photo/cable-carrier-inner-width.webp",
  "cable-carrier-inner-height": "/images/blog/photo/cable-carrier-inner-height.webp",
  "cable-carrier-bend-radius": "/images/blog/photo/cable-carrier-bend-radius.webp",
  "cable-carrier-length-calculation": "/images/blog/photo/cable-carrier-length-calculation.webp",
  "cable-carrier-speed-acceleration": "/images/blog/photo/cable-carrier-speed-acceleration.webp",
  "cable-carrier-material-comparison": "/images/blog/photo/cable-carrier-material-comparison.webp",
  "low-noise-cable-carrier": "/images/blog/photo/low-noise-cable-carrier.webp",
  "linear-module-cable-carrier": "/images/blog/photo/linear-module-cable-carrier.webp",
  "robot-arm-cable-carrier": "/images/blog/photo/robot-arm-cable-carrier.webp",
  "gantry-robot-cable-carrier": "/images/blog/photo/gantry-robot-cable-carrier.webp",
  "smt-equipment-cable-carrier": "/images/blog/photo/smt-equipment-cable-carrier.webp",
  "semiconductor-equipment-cable-carrier":
    "/images/blog/photo/semiconductor-equipment-cable-carrier.webp",
  "cleanroom-cable-carrier-selection-guide":
    "/images/blog/photo/cleanroom-cable-carrier-selection-guide.webp",
  "antistatic-esd-cable-carrier": "/images/blog/photo/antistatic-esd-cable-carrier.webp",
  "cable-carrier-vs-tank-chain": "/images/blog/photo/cable-carrier-vs-tank-chain.webp",
  "tpu-cable-carrier-performance": "/images/blog/photo/tpu-cable-carrier-performance.webp",
  "lifespan-testing-and-warranty": "/images/blog/photo/lifespan-testing-and-warranty.webp",
  "custom-cable-carrier-delivery-process":
    "/images/blog/photo/custom-cable-carrier-delivery-process.webp",
};

/** 命中覆盖表就用实拍主图，否则保留文章自带图（可能为空 → 列表不渲染图）。 */
export function resolveFeaturedImage(slug: string, fallback: string): string {
  return BLOG_ART_COVERS[slug] ?? fallback;
}
