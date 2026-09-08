import type { Metadata } from "next";
import Image from "next/image";
import { getAllDownloads, localizeDownload } from "@/lib/downloads";
import { localizeHref } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n/messages";
import { getRequestLocale } from "@/lib/request-locale";
import { buildPageSocialMeta, seoDescription } from "@/lib/seo";
import { absoluteUrl, localeAlternates } from "@/lib/site";

export function generateMetadata(): Metadata {
  const locale = getRequestLocale();
  const copy = getMessages(locale).downloads;
  const path = localizeHref("/downloads", locale);
  const description = seoDescription(copy.metaDescription);

  return {
    title: copy.metaTitle,
    description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: localeAlternates("/downloads").languages,
    },
    ...buildPageSocialMeta({
      title: copy.metaTitle,
      description,
      path,
      locale,
    }),
  };
}

function DownloadIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

export default function DownloadsPage() {
  const locale = getRequestLocale();
  const copy = getMessages(locale).downloads;
  const catalogs = getAllDownloads();

  return (
    <div className="bg-gray-50">
      <section className="page-hero px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            {copy.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            {copy.subtitle}
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {catalogs.map((item) => {
            const { title, description, imageAlt } = localizeDownload(
              item,
              locale,
            );

            return (
              <article
                key={item.id}
                className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                {item.imageSrc && (
                  <div className="relative aspect-[16/10] bg-white">
                    <Image
                      src={item.imageSrc}
                      alt={imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5 sm:p-8">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-brand-primary">
                      {title}
                    </h2>
                    <span className="rounded bg-brand-primary/10 px-2 py-0.5 text-xs font-medium text-brand-primary">
                      {item.format}
                    </span>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/70">
                    {description}
                  </p>
                  <a
                    href={item.fileUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex w-fit items-center gap-2 rounded-md bg-brand-secondary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-accent"
                  >
                    <DownloadIcon />
                    {copy.download}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
