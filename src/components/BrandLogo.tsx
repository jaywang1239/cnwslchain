import Link from "next/link";
import { getMessages, localizeHref, type Locale } from "@/lib/i18n";

export default function BrandLogo({
  locale,
}: {
  locale: Locale;
  /** Kept for call-site compatibility. */
  tone?: "onInk" | "onLight";
}) {
  const home = localizeHref("/", locale);
  const brand = getMessages(locale);

  return (
    <Link
      href={home}
      className="inline-flex shrink-0 items-center justify-center rounded-md bg-brand-secondary px-3.5 py-2 transition-colors hover:bg-brand-accent sm:px-4 sm:py-2.5"
      aria-label={brand.brandFull}
    >
      <span className="text-base font-bold tracking-wide text-white sm:text-lg">
        CNWSL
      </span>
    </Link>
  );
}
