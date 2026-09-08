"use client";

import { FormEvent, useState } from "react";
import { usePathname } from "next/navigation";
import { localeFromPathname } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

export default function ContactForm() {
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
          type: "contact",
          name: data.get("name"),
          company: data.get("company"),
          email: data.get("email"),
          phone: data.get("phone"),
          subject: data.get("subject"),
          message: data.get("message"),
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
        <p className="font-semibold text-brand-primary">{form.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1 block text-sm font-medium text-brand-primary"
          >
            {form.name} <span className="text-brand-accent">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            disabled={submitting}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary"
            placeholder={form.placeholders.name}
          />
        </div>
        <div>
          <label
            htmlFor="contact-company"
            className="mb-1 block text-sm font-medium text-brand-primary"
          >
            {form.company}
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            disabled={submitting}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary"
            placeholder={form.placeholders.company}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-email"
            className="mb-1 block text-sm font-medium text-brand-primary"
          >
            {form.email} <span className="text-brand-accent">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            disabled={submitting}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary"
            placeholder={form.placeholders.email}
          />
        </div>
        <div>
          <label
            htmlFor="contact-phone"
            className="mb-1 block text-sm font-medium text-brand-primary"
          >
            {form.phone} <span className="text-brand-accent">*</span>
          </label>
          <input
            id="contact-phone"
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
        <label
          htmlFor="contact-subject"
          className="mb-1 block text-sm font-medium text-brand-primary"
        >
          {form.subject}
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          disabled={submitting}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary"
          placeholder={form.placeholders.subject}
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-1 block text-sm font-medium text-brand-primary"
        >
          {form.message} <span className="text-brand-accent">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          disabled={submitting}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary"
          placeholder={form.placeholders.message}
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
        {submitting ? form.submitting : form.submit}
      </button>
    </form>
  );
}
