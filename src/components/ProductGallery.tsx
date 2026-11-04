"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { defaultLocale, localeFromPathname, type Locale } from "@/lib/i18n/config";
import { getGalleryAriaLabel } from "@/lib/product-i18n";

export interface ProductImage {
  src: string;
  alt: string;
}

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
  /** 由服务端页面传入（middleware rewrite 后 pathname 已无 /en 前缀）。 */
  locale?: Locale;
}

export default function ProductGallery({
  images,
  productName,
  locale: localeProp,
}: ProductGalleryProps) {
  const pathname = usePathname() || "/";
  const pathLocale = localeFromPathname(pathname);
  const locale =
    pathLocale !== defaultLocale ? pathLocale : (localeProp ?? defaultLocale);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  if (!activeImage) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-gray-200 bg-white">
        <Image
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-6"
        />
      </div>

      {images.length > 1 && (
        <ul className="grid grid-cols-3 gap-3">
          {images.map((image, index) => {
            const isActive = index === activeIndex;

            return (
              <li key={image.src}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative aspect-[4/3] w-full overflow-hidden rounded-lg border bg-white transition-colors ${
                    isActive
                      ? "border-brand-secondary ring-2 ring-brand-secondary/30"
                      : "border-gray-200 hover:border-brand-secondary/50"
                  }`}
                  aria-label={getGalleryAriaLabel(
                    locale,
                    productName,
                    index + 1,
                  )}
                  aria-pressed={isActive}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="120px"
                    className="object-contain p-2"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
