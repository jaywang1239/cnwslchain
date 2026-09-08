import { NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import path from "path";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

type LeadType = "contact" | "inquiry";

interface LeadPayload {
  type?: LeadType;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  subject?: string;
  message?: string;
  product?: string;
  locale?: string;
  pageUrl?: string;
}

function clean(value: unknown, max = 2000): string {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function persistLead(record: Record<string, unknown>) {
  const dir = path.join(process.cwd(), "data", "leads");
  await mkdir(dir, { recursive: true });
  const file = path.join(dir, "inbox.jsonl");
  await appendFile(file, `${JSON.stringify(record)}\n`, "utf8");
}

async function postWebhook(record: Record<string, unknown>) {
  const url = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (!url) return false;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
  });
  if (!res.ok) {
    throw new Error(`Webhook HTTP ${res.status}`);
  }
  return true;
}

async function sendResendEmail(record: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return false;

  const to = process.env.LEAD_INBOX_EMAIL?.trim() || siteConfig.email;
  const from =
    process.env.LEAD_FROM_EMAIL?.trim() || "CNWSL Website <onboarding@resend.dev>";
  const type = String(record.type || "contact");
  const subject =
    type === "inquiry"
      ? `[CNWSL Inquiry] ${record.product || "Product"} — ${record.name}`
      : `[CNWSL Contact] ${record.subject || "Website message"} — ${record.name}`;

  const lines = [
    `Type: ${type}`,
    `Name: ${record.name}`,
    `Email: ${record.email}`,
    `Phone: ${record.phone}`,
    `Company: ${record.company || "-"}`,
    `Product: ${record.product || "-"}`,
    `Subject: ${record.subject || "-"}`,
    `Locale: ${record.locale || "-"}`,
    `Page: ${record.pageUrl || "-"}`,
    "",
    String(record.message || ""),
  ];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: record.email,
      subject,
      text: lines.join("\n"),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend HTTP ${res.status}: ${body.slice(0, 200)}`);
  }
  return true;
}

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const type: LeadType = body.type === "inquiry" ? "inquiry" : "contact";
  const name = clean(body.name, 120);
  const email = clean(body.email, 160).toLowerCase();
  const phone = clean(body.phone, 60);
  const company = clean(body.company, 160);
  const subject = clean(body.subject, 200);
  const message = clean(body.message, 4000);
  const product = clean(body.product, 200);
  const locale = clean(body.locale, 12);
  const pageUrl = clean(body.pageUrl, 400);

  if (!name || !email || !phone || !isEmail(email)) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }
  if (type === "contact" && !message) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const record = {
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    receivedAt: new Date().toISOString(),
    type,
    name,
    email,
    phone,
    company,
    subject,
    message,
    product,
    locale,
    pageUrl,
  };

  const channels: string[] = [];
  const errors: string[] = [];

  try {
    await persistLead(record);
    channels.push("file");
  } catch (err) {
    errors.push(`file:${err instanceof Error ? err.message : String(err)}`);
  }

  try {
    if (await postWebhook(record)) channels.push("webhook");
  } catch (err) {
    errors.push(`webhook:${err instanceof Error ? err.message : String(err)}`);
  }

  try {
    if (await sendResendEmail(record)) channels.push("resend");
  } catch (err) {
    errors.push(`resend:${err instanceof Error ? err.message : String(err)}`);
  }

  if (channels.length === 0) {
    console.error("[lead] all channels failed", errors);
    return NextResponse.json(
      { ok: false, error: "delivery_failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, channels });
}
