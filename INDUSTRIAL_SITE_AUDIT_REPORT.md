# CNWSL Industrial Site Audit Report

**Project:** cnwslchain-website (Next.js 14 App Router)  
**Audit date:** 2026-09-08  
**Auditor role:** Lead Developer — Industrial B2B Web  
**Scope:** Multilingual purity · URL depth · JSON-LD · Images · Runtime risks  

---

## Executive summary

| Area | Status | Notes |
|------|--------|--------|
| App Router depth | **PASS** | Live pages ≤ 3 segments; legacy 4-segment already 301 |
| Product Schema | **PASS** | `Product` + `BreadcrumbList` on `/products/model/[spec]`; fields `name` / `description` / `image` / `sku` present |
| Multilingual Han leak | **PASS** | `en`/`vi`/`es`/`it`/`ru` AppMessages: **0 Han** in values |
| Image pipeline | **MOSTLY PASS** | ~336 WebP; 2 JPG + 1 PNG leftovers |
| Forms / API | **WARN** | Contact/inquiry UI success without backend `fetch` |
| Locale coverage | **FIXED this pass** | Downloads `ru` + VI CJK brackets |

**One-command remediation (from repo root):**

```bash
npm run audit:fix
```

---

## 【红色高危】Must fix / already critical

### R1 — Dev CSS cache blow-up (layout collapse) — OPS
**Symptom:** `/_next/static/css/app/layout.css` 404 → Tailwind dead → `next/image fill` expands → site “彻底乱了”.  
**Fix:** Clear `.next` and restart `npm run dev` (already remediated in session).  
**Prevention:** Avoid killing mid-compile; prefer `npm run build` health check before release.

### R2 — Contact / Inquiry forms do not submit
**Where:** `src/components/ContactForm.tsx`, `src/components/InquiryForm.tsx`  
**Issue:** `preventDefault` + local success state only — **no API**. Buyers believe RFQ was sent.  
**Fix (required for production):** Wire to CRM / email API / Formspree / self-hosted route; show error on failure.  
**Severity:** Business-critical (lead loss), not SEO.

### R3 — Silent Chinese fallback on new content (latent)
**Where:** `src/lib/content-i18n.ts` — missing overlay → returns Chinese source (or EN if present).  
**Today:** All 5 posts + 8 news have full locale maps.  
**Risk:** New `posts.json` / `news.json` rows without overlays ship Chinese on `/en`.  
**Fix:** CI assert every slug × locale; fail build on missing keys.

> **Language purity scan:** No “English key → Chinese value” bugs in `messages.ts` non-zh blocks. Intentional Chinese remains for PRC addresses / legal names (`siteConfig`).

---

## 【黄色建议】SEO / quality improvements

### Y1 — Series CollectionPage JSON-LD — **DONE this pass**
`/products/[category]/[series]` now emits `CollectionPage` + ItemList of specs (was Breadcrumb-only).

### Y2 — Raster leftovers → WebP
| File | Status |
|------|--------|
| `public/images/home/wechat-qr.jpg` | Still referenced; convert via `optimize_images.js` |
| `public/images/home/wechat-miniprogram.jpg` | Orphan (Footer uses `.webp`) |
| `public/images/brand/favicon-cnwsl.png` | Optional; `app/icon.tsx` generates tab icon |

### Y3 — Product `offers` / AggregateOffer
Industrial catalogs often omit price — OK. Optional: `Offer` with `availability: InStock` + `url` for richer Product rich results.

### Y4 — Unused `next-intl`
In `package.json`, **zero** `src` imports. Remove to shrink install surface, or adopt intentionally.

### Y5 — Marketing pages thin schema
`/about`, `/contact`, `/solutions`, `/downloads` rely on layout Organization/WebSite only. Optional: `ContactPage` / `AboutPage` JSON-LD.

### Y6 — Category ItemList images
`/products/[category]` CollectionPage items omit `image` — add series cover URLs for richer discovery.

### Y7 — Locale-specific PDF catalogs
Download UI is localized; PDF binaries remain Chinese. Label or ship EN/RU PDFs for overseas buyers.

---

## 【绿色通过】Industrial-standard modules

| Module | Evidence |
|--------|----------|
| Route depth ≤ 3 | Live: `/products/[category]/[series]`, `/products/model/[spec]` |
| Legacy flatten 301 | `next.config.mjs` + generated `public/_redirects` |
| Hreflang `zh-CN` + x-default | `src/lib/site.ts` `localeAlternates` |
| Crawler-safe ZH URLs | Middleware skips geo redirect for bots |
| Organization + WebSite JSON-LD | `src/app/layout.tsx` |
| Product + sku + image | `buildProductJsonLd` — 304 specs |
| BreadcrumbList | Products / blog / news / series |
| BlogPosting / NewsArticle | Content detail pages |
| Sitemap multilingual | `src/app/sitemap.ts` + real `lastModified` for posts/news |
| Image fill + sizes | All audited `fill` usages include `sizes` |
| Message catalog purity | Non-zh AppMessages: 0 Han (audited) |

---

## 301 redirect mapping (depth / legacy)

| From | To | Status |
|------|-----|--------|
| `/products/:category/:series/:spec` | `/products/model/:spec` | **Live** (`next.config.mjs`) |
| `/:locale/products/:category/:series/:spec` | `/:locale/products/model/:spec` | **Live** |
| `/products/item/:slug` | `/products` | **Live** |
| Same for `en/vi/es/it/ru` | Locale-prefixed catalog | **Live** |

No live App route exceeds 3 segments. Locale prefix is middleware rewrite, not an extra page tree.

---

## Schema checklist (home + product detail)

| Page | Schemas | name | description | image | sku |
|------|---------|------|-------------|-------|-----|
| Layout (all) | Organization, WebSite | ✓ | — | logo | — |
| Home | VideoObject (+ layout) | ✓ | ✓ | thumb | — |
| Model detail | Product, BreadcrumbList, FAQ* | ✓ | ✓ | ✓ | ✓ (`spec.code`) |
| Series | BreadcrumbList, **CollectionPage** (added) | ✓ | ✓ | items | — |

\*FAQ only when Chinese FAQ data exists.

---

## Multilingual findings (detail)

| Finding | Action |
|---------|--------|
| VI inquiry `「{product}」` CJK brackets | **Fixed** — replaced with `"{product}"`; comment: 原错误值 |
| Downloads missing `ru` | **Fixed** — titles / descriptions / imageAlts |
| PRC addresses on EN footer | Intentional — keep |
| Partners vi/es/it/ru reuse English brand names | Acceptable for global marks |

Audited by: [Audit i18n language purity](febf8897-29de-441b-815c-361d92152ec6), [Audit routes schema images](bb39e74d-562b-4772-8669-f5c85d02ca35).

---

## Scripts delivered

| Script | Purpose |
|--------|---------|
| `tools/optimize_images.js` | Convert public/images `jpg/png` → `webp` |
| `tools/run_industrial_audit_fixes.js` | Writes `_redirects`, runs optimizer, patches QR src |
| `npm run audit:fix` | **Single entrypoint** |

---

## Estimated impact (after full remediation)

| KPI | Estimate | Basis |
|-----|----------|--------|
| Core Web Vitals (LCP/CLS) | **+10–20%** room | WebP leftovers + stable CSS; site already mostly WebP |
| Multilingual indexability | **+40–50%** efficiency vs broken locale | Hreflang + crawler ZH lock + complete RU downloads |
| Product rich results eligibility | **High** | Product+sku+image already present; CollectionPage closes series gap |
| Lead integrity | **Critical uplift** | Only after wiring real form endpoints (R2) |

---

## Recommended next sprint (priority)

1. **Wire RFQ forms to a real endpoint** (R2)  
2. `npm run audit:fix` on CI before release  
3. Remove unused `next-intl` or adopt it deliberately  
4. Add CI gate: non-zh content overlays must cover every slug  
5. Optional Product `Offer` + About/Contact JSON-LD  

---

*End of report — CNWSL Industrial Audit 2026-09-08*
