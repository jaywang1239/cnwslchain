import type { Metadata } from "next";
import Image from "next/image";
import patentsData from "../../../data/patents.json";
import { localizeHref } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n/messages";
import { localizePatentTitle } from "@/lib/product-i18n";
import { getRequestLocale } from "@/lib/request-locale";
import { buildPageSocialMeta, seoDescription } from "@/lib/seo";
import { absoluteUrl, localeAlternates, siteConfig } from "@/lib/site";

const CERT_IMAGES = [
  "/images/certs/iatf-16949-certificate.webp",
  "/images/certs/sgs-rohs-report.webp",
  "/images/certs/pa-321x11-nat-datasheet.webp",
  "/images/certs/cleanroom-high-low-temp-test.webp",
  "/images/certs/cleanroom-fatigue-test.webp",
] as const;

export function generateMetadata(): Metadata {
  const locale = getRequestLocale();
  const copy = getMessages(locale).about;
  const path = localizeHref("/about", locale);
  const description = seoDescription(copy.metaDescription);
  const factoryImage = absoluteUrl("/images/about/factory.webp");

  return {
    title: copy.metaTitle,
    description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: localeAlternates("/about").languages,
    },
    ...buildPageSocialMeta({
      title: copy.metaTitle,
      description,
      path,
      locale,
      image: {
        url: factoryImage,
        width: 1600,
        height: 1000,
        alt: copy.factoryPhotoAlt,
      },
    }),
  };
}

const patents = patentsData as { title: string; slug: string; imageSrc: string }[];

export default function AboutPage() {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const copy = messages.about;
  const path = localizeHref("/about", locale);
  const certifications = copy.certifications.map((cert, index) => ({
    ...cert,
    imageSrc: CERT_IMAGES[index] ?? CERT_IMAGES[0],
  }));

  const aboutLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: copy.title,
    description: copy.metaDescription,
    url: absoluteUrl(path),
    mainEntity: {
      "@type": "Organization",
      name: messages.legalName,
      url: siteConfig.url,
      foundingDate: "2010",
      address: {
        "@type": "PostalAddress",
        streetAddress: messages.addressLines.factory,
        addressCountry: "CN",
      },
    },
  };

  return (
    <div className="bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutLd) }}
      />
      <section className="page-hero px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{copy.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">{copy.subtitle}</p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <h2 className="text-2xl font-bold text-brand-primary sm:text-3xl">
              {copy.introTitle}
            </h2>
            <div className="mt-6 space-y-4 text-foreground/80 leading-relaxed">
              {copy.introBody.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-gray-200 bg-white">
            <Image
              src="/images/about/factory.webp"
              alt={copy.factoryPhotoAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 640px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-brand-primary sm:text-3xl">
            {copy.milestonesTitle}
          </h2>
          <ol className="mt-10 space-y-8 border-l-2 border-brand-accent/40 pl-6">
            {copy.milestones.map((item) => (
              <li key={item.year} className="relative">
                <span className="absolute -left-[1.95rem] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-accent" />
                <p className="text-sm font-semibold text-brand-secondary">
                  {item.year}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-brand-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-foreground/70">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-brand-primary sm:text-3xl">
            {copy.patentsTitle}
          </h2>
        </div>

        <div className="mt-8 overflow-hidden">
          <ul className="flex w-max animate-product-marquee pause-on-hover gap-6 pr-6 [animation-duration:56s]">
            {[...patents, ...patents].map((patent, index) => {
              const title = localizePatentTitle(
                patent.title,
                patent.slug,
                locale,
              );

              return (
              <li
                key={`${patent.slug}-${index}`}
                className="w-[220px] shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm sm:w-[240px]"
              >
                <div className="relative aspect-[3/4] bg-white">
                  <Image
                    src={patent.imageSrc}
                    alt={title}
                    fill
                    sizes="240px"
                    className="object-contain p-3"
                  />
                </div>
                <div className="border-t border-gray-100 px-4 py-3">
                  <span className="mb-2 inline-block rounded bg-brand-accent/15 px-2 py-0.5 text-xs font-medium text-brand-accent">
                    {copy.patentsBadge}
                  </span>
                  <p className="line-clamp-2 text-sm font-medium text-brand-primary">
                    {title}
                  </p>
                </div>
              </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-brand-primary sm:text-3xl">
            {copy.certsTitle}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <article
                key={cert.name}
                className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-gray-50"
              >
                <div className="relative aspect-[3/4] bg-white">
                  <Image
                    src={cert.imageSrc}
                    alt={cert.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-3"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-brand-primary">
                    {cert.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/70">
                    {cert.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
