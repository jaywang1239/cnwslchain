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
  website: "www.wslmj.com",
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
