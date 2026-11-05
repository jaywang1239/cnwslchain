/**
 * Banner（首页主视觉）响应式图片档位。
 *
 * 背景：next.config.mjs 里 `images.unoptimized = true`（Hostinger 的 /_next/image 不稳），
 * 该模式下 next/image 不生成 srcset，浏览器永远整张下原图。
 * 主视觉单张原图 1280×547 / 82–102 KB，三张合计 282 KB 全在首屏拉完 —— 是全站最大一笔浪费。
 *
 * 物理解法（与分类图同款）：
 *   public/images/home/<name>.webp        原始 1280w（og:image、大屏仍用）
 *   public/images/home/<name>-960.webp    960w
 *   public/images/home/<name>-640.webp    640w（手机）
 *   public/images/home/<name>-blur.webp   48w LQIP，移动端 contain 留边的模糊铺底用
 *
 * 2026-11-05 实测：640 档 42–47 KB（-52%）；blur 约 300–400 B。
 */
export const HERO_IMAGE_WIDTHS = [640, 960, 1280] as const;

const WEBP_EXT = /^(.*)\.webp$/;

/** 拼 srcSet；非 .webp 输入原样返回，保证老数据不会炸。 */
export function heroImageSrcSet(src: string): string {
  const match = WEBP_EXT.exec(src);
  if (!match) return src;
  const base = match[1];
  return [
    `${base}-640.webp 640w`,
    `${base}-960.webp 960w`,
    `${src} ${HERO_IMAGE_WIDTHS[2]}w`,
  ].join(", ");
}

/**
 * 模糊铺底图。
 * 🔴 千万别再退回用原图 —— 2026-11-05 查到旧实现是 `backgroundImage: url(<原图>)`，
 * CSS background 不受 loading="lazy" 管辖，会在 CSS 解析阶段就把三张原图全部拉下来。
 */
export function heroImageBlur(src: string): string {
  const match = WEBP_EXT.exec(src);
  return match ? `${match[1]}-blur.webp` : src;
}
