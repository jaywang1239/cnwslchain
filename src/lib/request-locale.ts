import { headers } from "next/headers";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";

/**
 * Locale for the current request.
 * Middleware sets `x-locale` from the URL prefix (`/en/...` → en, unprefixed → zh).
 * Never infer from cookie here — URL language must win for SEO and content.
 */
export function getRequestLocale(): Locale {
  const value = headers().get("x-locale");
  return isLocale(value) ? value : defaultLocale;
}
