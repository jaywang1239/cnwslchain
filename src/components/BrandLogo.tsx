import Link from "next/link";
import Image from "next/image";
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
      className="inline-flex shrink-0 items-center rounded-md bg-white px-2 py-1.5 transition-opacity hover:opacity-90"
      aria-label={brand.brandFull}
    >
      <Image
        src="/images/brand/logo.webp"
        alt={brand.brandFull}
        width={128}
        height={48}
        className="h-7 w-auto sm:h-8"
        priority
      />
    </Link>
  );
}
