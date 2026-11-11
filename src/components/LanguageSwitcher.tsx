"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  LOCALE_COOKIE,
  defaultLocale,
  localeFromPathname,
  localeHtmlLang,
  localeLabels,
  locales,
  switchLocalePath,
  type Locale,
} from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { pageAvailableLocales } from "@/lib/locale-availability";

function persistLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

/**
 * locale 由 Navbar 透传（源头是 layout 的服务端 getRequestLocale）。
 *
 * 改这里的原因（2026-11-04）：
 * 1. 不能靠 pathname 判语种 —— middleware rewrite 已剥掉 /en 前缀，
 *    localeFromPathname 一律返回 zh，切换器会在英文页上显示「中文」；
 * 2. 切换必须整页跳转（<a> 而非 <Link>）。App Router 的客户端导航不会
 *    重新渲染 layout，middleware 也不会重跑，结果是 URL 变了、导航仍是旧语种。
 *
 * 2026-11-11 修补：只列**该页真实存在**的语种（`pageAvailableLocales`）。
 * 原先不管页面有没有译文都列满 6 个语种，于是 `/en/cable-carrier`、
 * `/en/solutions/*` 这些仅英文页切到中文/越南语等会直接 404 —— 用户点了、
 * 爬虫跟了，都是死链。清单见 `lib/locale-availability.ts`。
 */
export default function LanguageSwitcher({
  locale: localeProp,
  availableLocales,
}: {
  locale?: Locale;
  availableLocales?: readonly Locale[];
}) {
  const pathname = usePathname() || "/";
  const pathLocale = localeFromPathname(pathname);
  const locale =
    pathLocale !== defaultLocale ? pathLocale : (localeProp ?? defaultLocale);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const label = getMessages(locale).language;

  /* 当前页可切换的语种：没有译文的语种不出现在列表里，避免死链。
   * 页面若标了 `data-available-locales`（新闻详情页这类「逐篇不同」的情况，
   * 数据只有服务端拿得到），以它为准；否则按路径规则推断。 */
  const [pageLocales, setPageLocales] = useState<readonly Locale[] | null>(null);
  useEffect(() => {
    const el = document.querySelector("[data-available-locales]");
    const raw = el?.getAttribute("data-available-locales") ?? "";
    const parsed = raw
      .split(",")
      .map((s) => s.trim())
      .filter((s): s is Locale => (locales as readonly string[]).includes(s));
    setPageLocales(parsed.length ? parsed : null);
  }, [pathname]);

  const offered = pageAvailableLocales(pathname, availableLocales ?? pageLocales ?? undefined);
  const options = locales.filter((item) => offered.includes(item));

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* 只有一种语言可选时，切换器没有意义（点开只看到自己），直接不渲染。 */
  if (options.length < 2) return null;

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-lg border border-white/20 px-2.5 py-1 text-xs font-semibold tracking-wide text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={label}
        onClick={() => setOpen((value) => !value)}
      >
        {localeLabels[locale].short}
        <svg className="h-3 w-3 opacity-80" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
          <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 min-w-[9.5rem] overflow-hidden rounded-md border border-gray-200 bg-white py-1 shadow-lg"
        >
          {options.map((item) => {
            const active = item === locale;
            return (
              <li key={item} role="option" aria-selected={active}>
                <a
                  href={switchLocalePath(pathname, item)}
                  hrefLang={localeHtmlLang[item]}
                  className={`block px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-brand-secondary/10 font-semibold text-brand-secondary"
                      : "text-brand-primary/90 hover:bg-gray-50 hover:text-brand-secondary"
                  }`}
                  onClick={() => {
                    persistLocale(item);
                    setOpen(false);
                  }}
                >
                  {localeLabels[item].native}
                </a>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

