import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  LOCALE_COOKIE,
  defaultLocale,
  isLocale,
  localeFromPathname,
  stripLocalePrefix,
  type Locale,
} from "@/lib/i18n/config";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function setLocaleCookie(response: NextResponse, locale: Locale) {
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
    sameSite: "lax",
  });
}

function withLocaleHeader(request: NextRequest, locale: Locale) {
  const headers = new Headers(request.headers);
  headers.set("x-locale", locale);
  return headers;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Explicit locale prefix in URL always wins (e.g. /en, /vi, /es, /it, /ru).
  const pathLocale = localeFromPathname(pathname);
  if (pathLocale !== defaultLocale) {
    const headers = withLocaleHeader(request, pathLocale);
    const url = request.nextUrl.clone();
    url.pathname = stripLocalePrefix(pathname);
    const response = NextResponse.rewrite(url, { request: { headers } });
    setLocaleCookie(response, pathLocale);
    return response;
  }

  // Unprefixed path = Chinese URL tree (canonical for CN + crawlers).
  // Policy (2026-09-28): an unprefixed URL ALWAYS serves Chinese. We no longer
  // geo- or cookie-redirect to /en here — that behaviour caused the site to keep
  // opening in English for visitors carrying a stale cnwsl_locale=en cookie.
  // Non-Chinese locales are reachable only through an explicit prefix (handled above).
  const headers = withLocaleHeader(request, defaultLocale);
  const response = NextResponse.next({ request: { headers } });

  // Always serving Chinese here, so reset any stale non-default locale cookie.
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (!isLocale(cookie) || cookie !== defaultLocale) {
    setLocaleCookie(response, defaultLocale);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next|images|videos|datasheets|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
