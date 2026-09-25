export const locales = ["zh", "en", "vi", "es", "it", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "zh";
export const LOCALE_COOKIE = "cnwsl_locale";

export const localePrefixes: Record<Exclude<Locale, "zh">, string> = {
  en: "en",
  vi: "vi",
  es: "es",
  it: "it",
  ru: "ru",
};

export const localeHtmlLang: Record<Locale, string> = {
  zh: "zh-CN",
  en: "en",
  vi: "vi",
  es: "es",
  it: "it",
  ru: "ru",
};

export const localeOg: Record<Locale, string> = {
  zh: "zh_CN",
  en: "en_US",
  vi: "vi_VN",
  es: "es_ES",
  it: "it_IT",
  ru: "ru_RU",
};

export const localeLabels: Record<Locale, { native: string; short: string }> = {
  zh: { native: "中文", short: "中文" },
  en: { native: "English", short: "EN" },
  vi: { native: "Tiếng Việt", short: "VI" },
  es: { native: "Español", short: "ES" },
  it: { native: "Italiano", short: "IT" },
  ru: { native: "Русский", short: "RU" },
};

/** Greater China → Chinese; all other countries → English (default landing). */
export const CHINESE_MARKET_COUNTRIES = new Set([
  "CN",
  "TW",
  "HK",
  "MO",
]);

/**
 * @deprecated Prefer {@link detectPreferredLocale}. Kept for callers that map a
 * single country code: Chinese markets → zh, everything else → en.
 */
export const countryToLocale: Record<string, Locale> = new Proxy(
  {} as Record<string, Locale>,
  {
    get(_target, prop: string) {
      if (!prop || typeof prop !== "string") return undefined;
      const code = prop.toUpperCase();
      return CHINESE_MARKET_COUNTRIES.has(code) ? "zh" : "en";
    },
    has(_target, prop: string) {
      return typeof prop === "string" && prop.length === 2;
    },
  },
);

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export function getCountryFromHeaders(headers: Headers): string | null {
  const raw =
    headers.get("x-vercel-ip-country") ||
    headers.get("cf-ipcountry") ||
    headers.get("x-country-code") ||
    headers.get("x-geo-country") ||
    "";
  const code = raw.trim().toUpperCase();
  if (!code || code === "XX" || code === "T1") return null;
  return code;
}

/** Landing fallback when geo is unknown: Chinese browser → zh, else en. */
export function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return "en";
  const parts = header
    .split(",")
    .map((item) => {
      const [tag, ...params] = item.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const q = qParam ? Number(qParam.split("=")[1]) : 1;
      return { tag: tag.toLowerCase(), q: Number.isFinite(q) ? q : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of parts) {
    if (tag.startsWith("zh")) return "zh";
  }
  return "en";
}

/**
 * Default site language for first visit:
 * 1) cookie (user switched language deliberately) — 保留
 * 2) 中文兜底（2026-09-24 王杰拍板）：未显式选择语言时一律返回 zh，
 *    关掉原「海外 IP 自动跳英文」地理重定向；英文仅经 /en 路径与语言切换器触达。
 *
 * vi/es/it/ru 仍经 URL + 语言切换器可用，不作为首访默认。
 */
export function detectPreferredLocale(request: {
  cookies: { get: (name: string) => { value: string } | undefined };
  headers: Headers;
}): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(cookie)) return cookie;

  // 中文兜底：不再依据 geo / Accept-Language 做 en 回退
  void request;
  return "zh";
}

export function localeFromPathname(pathname: string): Locale {
  for (const locale of locales) {
    if (locale === defaultLocale) continue;
    const prefix = `/${locale}`;
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return locale;
    }
  }
  return defaultLocale;
}

export function stripLocalePrefix(pathname: string): string {
  for (const locale of locales) {
    if (locale === defaultLocale) continue;
    const prefix = `/${locale}`;
    if (pathname === prefix) return "/";
    if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length);
  }
  return pathname;
}

export function localizeHref(href: string, locale: Locale): string {
  if (
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  ) {
    return href;
  }

  const bare = stripLocalePrefix(href) || "/";
  if (locale === defaultLocale) return bare;
  return bare === "/" ? `/${locale}` : `/${locale}${bare}`;
}

export function switchLocalePath(pathname: string, next: Locale): string {
  return localizeHref(stripLocalePrefix(pathname) || "/", next);
}

export function pathHasLocalePrefix(pathname: string): boolean {
  return localeFromPathname(pathname) !== defaultLocale;
}
