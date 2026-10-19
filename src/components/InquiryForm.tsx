"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPathname, localizeHref } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

interface InquiryFormProps {
  productName: string;
}

export default function InquiryForm({ productName }: InquiryFormProps) {
  const pathname = usePathname() || "/";
  const locale = localeFromPathname(pathname);
  const form = getMessages(locale).form;
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(false);
    setSubmitting(true);

    const data = new FormData(event.currentTarget);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "inquiry",
          product: productName,
          name: data.get("name"),
          company: data.get("company"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message") || `Inquiry for ${productName}`,
          locale,
          pageUrl: typeof window !== "undefined" ? window.location.href : pathname,
        }),
      });
      if (!res.ok) throw new Error("submit_failed");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-brand-secondary/30 bg-brand-secondary/5 p-6 text-center">
        <p className="font-semibold text-brand-primary">{form.inquirySuccess}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="product" value={productName} />

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-brand-primary">
          {form.name} <span className="text-brand-accent">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          disabled={submitting}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary"
          placeholder={form.placeholders.name}
        />
      </div>

      <div>
        <label htmlFor="company" className="mb-1 block text-sm font-medium text-brand-primary">
          {form.company}
        </label>
        <input
          id="company"
          name="company"
          type="text"
          disabled={submitting}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary"
          placeholder={form.placeholders.company}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-brand-primary">
            {form.email} <span className="text-brand-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={submitting}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary"
            placeholder={form.placeholders.email}
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-brand-primary">
            {form.phone} <span className="text-brand-accent">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            disabled={submitting}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary"
            placeholder={form.placeholders.phone}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-brand-primary">
          {form.inquiryMessage}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          disabled={submitting}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary"
          placeholder={form.placeholders.inquiryMessage.replace("{product}", productName)}
        />
      </div>

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {form.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-brand-secondary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent disabled:opacity-60"
      >
        {submitting ? form.submitting : form.inquirySubmit}
      </button>

      {/* 提交即告知（2026-10-19）：/privacy 只有中英两版，提示也只在中英渲染。 */}
      {locale === "zh" || locale === "en" ? (
        <p className="mt-3 text-xs leading-relaxed text-foreground/50">
          {locale === "zh" ? "提交即表示你同意我们按" : "By submitting you agree to our "}
          <Link
            href={localizeHref("/privacy", locale)}
            className="underline underline-offset-2 hover:text-brand-secondary"
          >
            {locale === "zh" ? "隐私政策" : "Privacy Policy"}
          </Link>
          {locale === "zh"
            ? "处理本次询盘信息：仅用于回复与履约，不做群发营销，可随时要求删除。"
            : " for handling this inquiry: reply and fulfilment only, no marketing blasts, deletable on request."}
        </p>
      ) : null}
    </form>
  );
}
