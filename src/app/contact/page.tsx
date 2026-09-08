import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { localizeHref } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n/messages";
import { getRequestLocale } from "@/lib/request-locale";
import { buildPageSocialMeta, seoDescription } from "@/lib/seo";
import { absoluteUrl, localeAlternates, siteConfig } from "@/lib/site";

export function generateMetadata(): Metadata {
  const locale = getRequestLocale();
  const copy = getMessages(locale).contact;
  const path = localizeHref("/contact", locale);
  const description = seoDescription(copy.metaDescription);

  return {
    title: copy.metaTitle,
    description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: localeAlternates("/contact").languages,
    },
    ...buildPageSocialMeta({
      title: copy.metaTitle,
      description,
      path,
      locale,
    }),
  };
}

export default function ContactPage() {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const copy = messages.contact;
  const path = localizeHref("/contact", locale);
  const contactInfo = [
    { label: copy.labels.company, value: messages.legalName, kind: "text" as const },
    { label: copy.labels.phone, value: siteConfig.phone, kind: "phone" as const },
    { label: copy.labels.fax, value: siteConfig.fax, kind: "text" as const },
    { label: copy.labels.email, value: siteConfig.email, kind: "email" as const },
    { label: copy.labels.factory, value: messages.addressLines.factory, kind: "text" as const },
    { label: copy.labels.shenzhen, value: messages.addressLines.shenzhen, kind: "text" as const },
    { label: copy.labels.changzhou, value: messages.addressLines.changzhou, kind: "text" as const },
  ];

  const contactLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: copy.title,
    description: copy.metaDescription,
    url: absoluteUrl(path),
    mainEntity: {
      "@type": "Organization",
      name: messages.legalName,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      url: siteConfig.url,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactLd) }}
      />
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
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-brand-primary">{copy.formTitle}</h2>
            <p className="mt-2 text-sm text-foreground/70">{copy.formHint}</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-brand-primary">
                {copy.infoTitle}
              </h2>
              <dl className="mt-6 space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.label}>
                    <dt className="text-sm text-foreground/50">{item.label}</dt>
                    <dd className="mt-1 break-all text-sm font-medium text-brand-primary">
                      {item.kind === "email" ? (
                        <a
                          href={`mailto:${item.value}`}
                          className="text-brand-secondary hover:text-brand-primary"
                        >
                          {item.value}
                        </a>
                      ) : item.kind === "phone" ? (
                        <a href={`tel:${item.value}`}>{item.value}</a>
                      ) : (
                        item.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="relative aspect-[16/10] bg-white">
                <Image
                  src="/images/contact/factory.webp"
                  alt={copy.factoryPhotoAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>
              <div className="border-t border-gray-100 px-5 py-4 sm:px-8">
                <h2 className="text-lg font-semibold text-brand-primary">
                  {copy.labels.factory}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {messages.addressLines.factory}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
