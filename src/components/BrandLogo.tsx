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
      className="inline-flex shrink-0 items-center rounded-md bg-white px-3 py-1.5 transition-opacity hover:opacity-90"
      aria-label={brand.brandFull}
    >
      <span className="text-2xl font-bold leading-none tracking-wide text-brand-secondary sm:text-3xl">
        CNWSL
      </span>
    </Link>
  );
}
