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
 */
export default function LanguageSwitcher({ locale: localeProp }: { locale?: Locale }) {
  const pathname = usePathname() || "/";
  const pathLocale = localeFromPathname(pathname);
  const locale =
    pathLocale !== defaultLocale ? pathLocale : (localeProp ?? defaultLocale);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const label = getMessages(locale).language;

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
          {locales.map((item) => {
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

