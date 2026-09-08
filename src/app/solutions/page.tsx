import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { localizeHref } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n/messages";
import { getRequestLocale } from "@/lib/request-locale";
import { buildPageSocialMeta, seoDescription, seoTitle } from "@/lib/seo";
import { absoluteUrl, localeAlternates } from "@/lib/site";

export function generateMetadata(): Metadata {
  const locale = getRequestLocale();
  const copy = getMessages(locale).solutions;
  const path = localizeHref("/solutions", locale);
  const title = seoTitle(copy.title);
  const description = seoDescription(copy.seo);

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: localeAlternates("/solutions").languages,
    },
    ...buildPageSocialMeta({
      title,
      description,
      path,
      locale,
    }),
  };
}

export default function SolutionsPage() {
  const locale = getRequestLocale();
  const copy = getMessages(locale).solutions;

  return (
    <div className="bg-gray-50">
      <section className="page-hero px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{copy.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">{copy.description}</p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {copy.items.map((solution) => (
            <article
              key={solution.id}
              className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="relative aspect-[16/10] bg-gray-100">
                <Image
                  src={`/images/solutions/${solution.id}.webp`}
                  alt={solution.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-8">
                <h2 className="text-2xl font-bold text-brand-primary">{solution.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  {solution.summary}
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {solution.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-foreground/80">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  href={localizeHref("/contact", locale)}
                  className="mt-8 inline-flex text-sm font-medium text-brand-secondary hover:text-brand-primary"
                >
                  {copy.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
