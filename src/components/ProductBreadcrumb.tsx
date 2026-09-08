"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { BreadcrumbItem } from "@/lib/product-catalog";
import { localeFromPathname } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

interface ProductBreadcrumbProps {
  items: BreadcrumbItem[];
  tone?: "default" | "onInk";
}

export default function ProductBreadcrumb({
  items,
  tone = "default",
}: ProductBreadcrumbProps) {
  const pathname = usePathname() || "/";
  const locale = localeFromPathname(pathname);
  const ariaLabel = getMessages(locale).breadcrumb;
  const onInk = tone === "onInk";

  return (
    <nav aria-label={ariaLabel} className="mb-8">
      <ol
        className={`flex flex-wrap items-center gap-1 text-sm ${
          onInk ? "text-white/55" : "text-foreground/60"
        }`}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center">
              {index > 0 && (
                <span
                  className={`mx-2 ${onInk ? "text-white/25" : "text-foreground/30"}`}
                  aria-hidden="true"
                >
                  /
                </span>
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className={`transition-colors ${
                    onInk ? "hover:text-brand-accent" : "hover:text-brand-secondary"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={
                    isLast
                      ? onInk
                        ? "font-medium text-white"
                        : "font-medium text-brand-primary"
                      : undefined
                  }
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
