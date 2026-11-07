export const siteConfig = {
  name: "CNWSL",
  legalName: "浙江威仕龙塑胶有限公司",
  registeredName: "温州市威仕龙塑胶有限公司",
  brand: "威仕龙 CNWSL",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cnwslchain.com",
  description:
    "浙江威仕龙塑胶有限公司（CNWSL）专注精密塑料拖链与高端注塑零部件，集模具设计、精密注塑与智能制造于一体。",
  phone: "0086-0577-62328108",
  fax: "0086-0577-62328106",
  mobile: "13275225528",
  email: "info@cnwslchain.com",
  /**
   * 2026-10-19：原值为 `www.wslmj.com`，该域名已无法解析（实测无 A 记录），
   * 且站内没有任何地方渲染它 —— 属于历史遗留的死配置。留着是个雷：哪天有人
   * 把它接到页面上，就会挂出一个打不开的「官网」，与 /official 的唯一官网声明
   * 直接冲突。这里统一改成主域名。
   */
  website: "www.cnwslchain.com",
  /**
   * 品牌词的常见写法，供 Organization.alternateName 使用。
   * 客户搜「威仕龙拖链」「CNWSL 拖链」时，结构化数据里带上这些写法，
   * 有助于搜索引擎把品牌词与本站绑定。
   */
  alternateNames: [
    "威仕龙拖链",
    "威仕龙 CNWSL",
    "CNWSL 威仕龙",
    "CNWSL拖链",
    "WSL cable carrier",
    "Weishilong CNWSL",
  ],
  qq: "1677331928",
  addresses: {
    factory: "浙江省温州市乐清市天成街道宁康东路2891号",
    shenzhen: "深圳市宝安区沙井街道上南东路128号",
    changzhou: "江苏省常州市天宁区听松大厦306",
  },
  /** Overseas social profiles (WSL / CNWSL brand), layout mirrors wywmotion.com */
  social: {
    facebook:
      process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK ??
      "https://www.facebook.com/WSLcabledragchain",
    linkedin:
      process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ??
      "https://www.linkedin.com/company/cnwsl",
    youtube:
      process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE ??
      "https://www.youtube.com/@WSLcabledragchain",
    instagram:
      process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ??
      "https://www.instagram.com/wslcabledragchain/",
    whatsapp:
      process.env.NEXT_PUBLIC_SOCIAL_WHATSAPP ??
      "https://wa.me/8613275225528",
  },
};

export function absoluteUrl(path: string): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function localeAlternates(path: string) {
  const bare = path
    .replace(/^\/(en|vi|es|it|ru)(?=\/|$)/, "")
    .replace(/\/$/, "") || "/";

  const hrefFor = (locale: "zh" | "en" | "vi" | "es" | "it" | "ru") => {
    if (locale === "zh") return bare;
    return bare === "/" ? `/${locale}` : `/${locale}${bare}`;
  };

  // hreflang: use zh-CN to match <html lang="zh-CN">; keep x-default on Chinese home.
  return {
    canonical: undefined as string | undefined,
    languages: {
      "zh-CN": absoluteUrl(hrefFor("zh")),
      en: absoluteUrl(hrefFor("en")),
      vi: absoluteUrl(hrefFor("vi")),
      es: absoluteUrl(hrefFor("es")),
      it: absoluteUrl(hrefFor("it")),
      ru: absoluteUrl(hrefFor("ru")),
      "x-default": absoluteUrl(hrefFor("zh")),
    },
  };
}

/**
 * 仅供「中英双语」页面使用（`/price`、`/cases`、`/factory`、`/guides/selection`）。
 *
 * 这四页只提供中文与英文，其余语种由页面内的 `requireZhEnLocale()` 直接 404
 * （见 `src/lib/zh-only.ts`）。因此 hreflang **只声明 zh-CN + en + x-default**，
 * 不能再像 `localeAlternates()` 那样把 6 个语种全写上——否则等于对外宣告了
 * 一堆并不存在的语言版本，正是 2026-10-14 体检查出的那类「地图与实际不符」问题。
 */
export function localeAlternatesZhEn(path: string) {
  const bare = path
    .replace(/^\/(en|vi|es|it|ru)(?=\/|$)/, "")
    .replace(/\/$/, "") || "/";
  const hrefFor = (locale: "zh" | "en") =>
    locale === "zh" ? bare : bare === "/" ? `/${locale}` : `/${locale}${bare}`;

  return {
    canonical: undefined as string | undefined,
    languages: {
      "zh-CN": absoluteUrl(hrefFor("zh")),
      en: absoluteUrl(hrefFor("en")),
      "x-default": absoluteUrl(hrefFor("zh")),
    },
  };
}

/** 语种输出顺序，zh 永远第一（hreflang 顺序稳定，便于 diff 与人工核对）。 */
const HREFLANG_ORDER = ["zh", "en", "vi", "es", "it", "ru"] as const;

/**
 * 按「这一页实际有哪几个语种」生成 hreflang。
 *
 * 为什么需要它：新闻详情页的可用语种是**逐篇不同**的（转载稿只有中文，见
 * `getNewsAvailableLocales()`），不能套 `localeAlternates()` 那种「6 个语种全写」。
 * 2026-11-07 体检实测：10 篇 MIR 转载稿用全语种写法，en/vi/es/it/ru 五个目标
 * 全部 404 —— 等于对外宣告了五个不存在的版本，和 10-14 那次 `/price` 的问题同源。
 *
 * 用法：`localeAlternatesFor(path, getNewsAvailableLocales(slug))`。
 * 中文永远输出（`zh-CN` + `x-default`），其余语种按 `available` 过滤。
 */
export function localeAlternatesFor(path: string, available: readonly string[]) {
  const bare = path
    .replace(/^\/(en|vi|es|it|ru)(?=\/|$)/, "")
    .replace(/\/$/, "") || "/";

  const hrefFor = (locale: string) => {
    if (locale === "zh") return absoluteUrl(bare);
    return absoluteUrl(bare === "/" ? `/${locale}` : `/${locale}${bare}`);
  };

  const languages: Record<string, string> = { "zh-CN": hrefFor("zh") };
  for (const locale of HREFLANG_ORDER) {
    if (locale === "zh" || !available.includes(locale)) continue;
    languages[locale] = hrefFor(locale);
  }
  languages["x-default"] = hrefFor("zh");

  return { canonical: undefined as string | undefined, languages };
}
