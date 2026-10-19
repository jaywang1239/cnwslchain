import type { Metadata } from "next";
import Link from "next/link";
import { localizeHref } from "@/lib/i18n";
import { getMessages } from "@/lib/i18n/messages";
import { requireZhEnLocale } from "@/lib/zh-only";
import {
  buildPageSocialMeta,
  buildSimpleBreadcrumbJsonLd,
  seoDescription,
  seoTitle,
} from "@/lib/seo";
import { absoluteUrl, localeAlternatesZhEn, siteConfig } from "@/lib/site";

type Fact = { k: string; v: string };
type Step = { title: string; body: string };
type Faq = { q: string; a: string };

type OfficialCopy = {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  crumbs: { home: string; self: string };
  h1: string;
  lead: string;
  sec1Title: string;
  sec1Body: string;
  facts: Fact[];
  sec1Note: string;
  sec2Title: string;
  sec2Lead: string;
  steps: Step[];
  sec3Title: string;
  sec3Paras: string[];
  sec4Title: string;
  sec4Paras: string[];
  sec5Title: string;
  sec5Lead: string;
  faqs: Faq[];
  ctaTitle: string;
  ctaBody: string;
  ctaContact: string;
  ctaAbout: string;
  ctaDownloads: string;
  updated: string;
};

/**
 * 官方身份页（品牌词落地页）。
 *
 * 目的有三个：
 * 1. 给「威仕龙 CNWSL 官网」这类品牌词一个**明确指向**的页面，正文里把公司全称、
 *    域名、邮箱、电话、工厂地址写全，方便搜索引擎把品牌词与本站绑定。
 * 2. 对客户讲清「怎么核验你上的是不是官网」，这是防冒用网站最实用的一页。
 * 3. 只做中英双语（`requireZhEnLocale()`），与 /price /cases /factory /guides/selection
 *    同一套收口模式；hreflang / sitemap / search-index 三处同步只声明 zh + en。
 *
 * 措辞红线：只陈述本司事实，**不点名任何第三方**，避免构成商业诋毁。
 */
const ZH: OfficialCopy = {
  metaTitle: "威仕龙 CNWSL 官方网站_唯一官网声明与核验方式",
  metaDescription:
    "本网站 www.cnwslchain.com 是浙江威仕龙塑胶有限公司（品牌：威仕龙 CNWSL）唯一对外官方网站。本页列明官方域名、企业邮箱、官方电话与工厂地址，并说明三步核验方法，帮你确认访问的是官网而不是同名主体的网站。",
  keywords: [
    "威仕龙官网",
    "CNWSL官网",
    "威仕龙拖链官网",
    "威仕龙塑胶",
    "唯一官方网站",
    "cnwslchain",
    "尼龙拖链厂家",
    "威仕龙 CNWSL",
  ],
  crumbs: { home: "首页", self: "官方声明" },
  h1: "威仕龙 CNWSL 唯一官方网站声明",
  lead: "www.cnwslchain.com 是浙江威仕龙塑胶有限公司（品牌「威仕龙 CNWSL」）唯一对外官方网站。除了这个域名，我们没有第二个官网，也没有授权任何第三方用「威仕龙」或「CNWSL」的名义运营网站。",
  sec1Title: "一、官方身份信息",
  sec1Body:
    "下面这几项是可以直接核对的硬信息。你手上如果有报价单、合同或者名片，逐项对一下就知道是不是我们发出的。",
  facts: [
    { k: "官方域名", v: "www.cnwslchain.com" },
    { k: "企业全称", v: "浙江威仕龙塑胶有限公司" },
    { k: "曾用名", v: "温州市威仕龙塑胶有限公司（2026 年更名）" },
    { k: "统一品牌", v: "威仕龙 CNWSL" },
    { k: "唯一生产实体", v: "浙江省温州市乐清市天成街道宁康东路2891号" },
    { k: "官方电话", v: "0086-0577-62328108" },
    { k: "官方邮箱", v: "info@cnwslchain.com" },
    { k: "资质", v: "IATF 16949:2016、ISO 9001:2015" },
  ],
  sec1Note:
    "深圳、常州两处是销售办事处，负责接单与就近服务，不承担生产；广东（东莞、佛山）与上海设有仓库，用于缩短发货时间。验厂只安排在乐清。",
  sec2Title: "二、三步核验：你访问的是不是官网",
  sec2Lead:
    "网上同名、近似的网站是存在的，与其让你猜，不如给一套能自己动手核验的办法。三步都过了，基本不会有问题。",
  steps: [
    {
      title: "第一步：逐字核对地址栏域名",
      body: "官方域名是 www.cnwslchain.com。重点看两处：chain 这个词有没有被换成别的单词或拼音，域名后面有没有多出 -cn、-china 之类的后缀。判断方法很简单——域名永远在地址栏第一个单斜杠之前，斜杠后面的都不用看。",
    },
    {
      title: "第二步：看邮件是从哪个域名发的",
      body: "本司的正式报价、合同、收款通知与发货文件，只从 @cnwslchain.com 发出。如果你收到的是其他域名发来的「正式报价」或「收款账号变更」，先别转账，打官方电话核实一遍再动。",
    },
    {
      title: "第三步：回拨官方电话，要工厂地址",
      body: "官方电话 0086-0577-62328108。挂掉对方来电后，自己拨一遍这个号码，能接通、能对上人，才算确认。要地址的话只有一个：浙江省温州市乐清市天成街道宁康东路2891号。说可以验厂却给不出乐清地址的，不是我们。",
    },
  ],
  sec3Title: "三、品牌和公司主体的关系",
  sec3Paras: [
    "「威仕龙 CNWSL」是浙江威仕龙塑胶有限公司的品牌，用在精密塑料拖链、护线管、软管和机床操作件这些产品上。CNWSL 就是公司英文缩写，不是另一家公司。",
    "公司 2010 年成立，注册名原为「温州市威仕龙塑胶有限公司」，2026 年更名为「浙江威仕龙塑胶有限公司」。IATF 16949、ISO 9001 这类证书是三年一个换证周期，过渡期内证书上仍可能显示原名，属于更名的正常情况，既不代表证书失效，也不代表是两家公司。",
    "工厂只有一个，在浙江省温州市乐清市天成街道宁康东路2891号。模具自己开发、注塑自己做、组装自己做，不是贸易商也不是贴牌代工。",
  ],
  sec4Title: "四、关于同名或近似名称的主体",
  sec4Paras: [
    "国内有若干企业在字号里使用「威仕龙」，也有个别网站使用与本司相近的域名。这些主体与浙江威仕龙塑胶有限公司之间没有股权关系、没有授权、也不是代理，它们的网站内容、报价和承诺不代表本司。",
    "判断不用记太多，把上面三步走一遍就够：域名逐字核对、邮件看 @ 后面的域名、电话自己回拨一次。",
    "如果发现有网站冒用本司名称、证书图片或工厂照片，把网址发到 info@cnwslchain.com，我们会核实并处理。",
  ],
  sec5Title: "五、常见问题",
  sec5Lead: "客户问得最多的几个问题，直接写在这里，省得来回确认。",
  faqs: [
    {
      q: "威仕龙拖链的官方网站是哪一个？",
      a: "www.cnwslchain.com。这是浙江威仕龙塑胶有限公司唯一的对外官方网站，中文版和英文版（/en）都在这个域名下，没有第二个官网。",
    },
    {
      q: "网上还能搜到别的「威仕龙」网站，是怎么回事？",
      a: "国内有企业用「威仕龙」作字号，也有域名相近的站点。它们与本司没有股权、授权或代理关系。核验只看三样：域名、邮件域名、工厂地址。",
    },
    {
      q: "为什么证书上的公司名和网站写的不一样？",
      a: "2026 年公司由「温州市威仕龙塑胶有限公司」更名为「浙江威仕龙塑胶有限公司」。证书按换证周期出具，过渡期内仍显示原名，属正常情况，可对照证书编号向出具机构查询。",
    },
    {
      q: "官网能下载哪些资料？",
      a: "产品目录 PDF、IATF 16949 证书等公开资料都在「下载中心」。选型可以看选型指南，也可以扫页脚的小程序码用微信选型。",
    },
    {
      q: "工厂在哪里，可以来验厂吗？",
      a: "工厂在浙江省温州市乐清市天成街道宁康东路2891号，可以预约验厂。深圳、常州是销售办事处，不安排验厂。",
    },
  ],
  ctaTitle: "需要确认身份或索取资料？",
  ctaBody:
    "报价、样品、验厂安排都可以直接走官方渠道。联系时请以本页的域名、邮箱和电话为准。",
  ctaContact: "联系官方",
  ctaAbout: "了解公司",
  ctaDownloads: "下载中心",
  updated: "本页更新：2026-10-19",
};

const EN: OfficialCopy = {
  metaTitle: "CNWSL Official Website_Statement and Verification",
  metaDescription:
    "www.cnwslchain.com is the only official website of Zhejiang CNWSL Plastic Co., Ltd. (brand: Weishilong CNWSL). This page lists the official domain, email, phone and plant address, and explains three quick checks to confirm you are on the official site.",
  keywords: [
    "CNWSL official website",
    "Weishilong cable carrier",
    "CNWSL cable chain",
    "official website statement",
    "cnwslchain",
    "nylon cable carrier manufacturer",
  ],
  crumbs: { home: "Home", self: "Official statement" },
  h1: "CNWSL Official Website Statement",
  lead: "www.cnwslchain.com is the only official website of Zhejiang CNWSL Plastic Co., Ltd. (brand: Weishilong CNWSL). We operate no second website, and we have not authorised any third party to run a site under the Weishilong or CNWSL name.",
  sec1Title: "1. Official company details",
  sec1Body:
    "The details below can be checked directly. If you hold a quotation, contract or business card, compare them item by item to confirm it came from us.",
  facts: [
    { k: "Official domain", v: "www.cnwslchain.com" },
    { k: "Legal name", v: "Zhejiang CNWSL Plastic Co., Ltd." },
    {
      k: "Former name",
      v: "Wenzhou Weishilong Plastic Co., Ltd. (renamed in 2026)",
    },
    { k: "Brand", v: "Weishilong CNWSL" },
    {
      k: "Only manufacturing site",
      v: "No. 2891 Ningkang East Road, Tiancheng Street, Yueqing, Zhejiang, China",
    },
    { k: "Official phone", v: "0086-0577-62328108" },
    { k: "Official email", v: "info@cnwslchain.com" },
    { k: "Certifications", v: "IATF 16949:2016, ISO 9001:2015" },
  ],
  sec1Note:
    "Shenzhen and Changzhou are sales offices that handle orders and local support; they do not manufacture. Warehouses in Dongguan, Foshan and Shanghai shorten delivery times. Factory audits are arranged in Yueqing only.",
  sec2Title: "2. Three checks: is this the official site?",
  sec2Lead:
    "Similar-looking sites do exist. Rather than ask you to guess, here is a set of checks you can run yourself. Pass all three and you are safe.",
  steps: [
    {
      title: "Check 1: read the domain in the address bar",
      body: "The official domain is www.cnwslchain.com. Watch two things: whether the word chain has been swapped for another word or a pinyin spelling, and whether a suffix such as -cn or -china has been appended. The domain is always the part before the first single slash; ignore everything after it.",
    },
    {
      title: "Check 2: look at the email domain",
      body: "Our formal quotations, contracts, payment notices and shipping documents are sent from @cnwslchain.com only. If a \"formal quotation\" or a \"change of bank account\" reaches you from another domain, do not transfer money — call the official number and verify first.",
    },
    {
      title: "Check 3: call the official number back",
      body: "Official phone: 0086-0577-62328108. After any incoming call, dial this number yourself; if it connects and the person matches, you are talking to us. There is only one plant address: No. 2891 Ningkang East Road, Tiancheng Street, Yueqing, Zhejiang. Anyone offering a factory visit but unable to give a Yueqing address is not us.",
    },
  ],
  sec3Title: "3. How the brand relates to the company",
  sec3Paras: [
    "\"Weishilong CNWSL\" is the brand of Zhejiang CNWSL Plastic Co., Ltd., used on precision plastic cable carriers, protective conduits, hoses and machine-tool operating elements. CNWSL is simply the company abbreviation, not a separate business.",
    "The company was founded in 2010 under the registered name Wenzhou Weishilong Plastic Co., Ltd. and was renamed Zhejiang CNWSL Plastic Co., Ltd. in 2026. Certificates such as IATF 16949 and ISO 9001 are issued on a three-year cycle, so during the transition they may still show the former name. That is normal after a rename: it does not mean the certificate has lapsed, and it does not mean these are two companies.",
    "There is one plant only, at No. 2891 Ningkang East Road, Tiancheng Street, Yueqing, Zhejiang. We develop our own moulds, do our own injection moulding and our own assembly — we are neither a trading company nor an OEM labelling operation.",
  ],
  sec4Title: "4. About companies with a similar name",
  sec4Paras: [
    "Several Chinese companies use \"Weishilong\" in their trade name, and a few websites use domains close to ours. None of them has an equity relationship with Zhejiang CNWSL Plastic Co., Ltd., none is authorised by us, and none acts as our agent. Their website content, prices and commitments do not represent us.",
    "You do not need to memorise anything: run the three checks above — domain read character by character, email domain after the @, and one call back to the official number.",
    "If you find a website misusing our company name, certificate images or plant photos, send the URL to info@cnwslchain.com and we will investigate.",
  ],
  sec5Title: "5. Frequently asked questions",
  sec5Lead: "The questions customers ask most, answered once and for all.",
  faqs: [
    {
      q: "Which is the official CNWSL cable carrier website?",
      a: "www.cnwslchain.com. It is the only official website of Zhejiang CNWSL Plastic Co., Ltd. Both the Chinese site and the English site (/en) run on this domain. There is no second official site.",
    },
    {
      q: "Why do other Weishilong websites show up in search?",
      a: "Some Chinese companies use Weishilong as a trade name, and some sites use similar domains. They have no equity, authorisation or agency relationship with us. Verify on three points only: domain, email domain and plant address.",
    },
    {
      q: "Why does the company name on the certificate differ from the website?",
      a: "The company was renamed from Wenzhou Weishilong Plastic Co., Ltd. to Zhejiang CNWSL Plastic Co., Ltd. in 2026. Certificates follow a multi-year renewal cycle and may still show the former name during the transition. You can verify the certificate number with the issuing body.",
    },
    {
      q: "What can I download from the site?",
      a: "Product catalogue PDFs, the IATF 16949 certificate and other public documents are in the Download Centre. For selection, use the selection guide, or scan the WeChat mini-program code in the footer.",
    },
    {
      q: "Where is the factory, and can I visit?",
      a: "The plant is at No. 2891 Ningkang East Road, Tiancheng Street, Yueqing, Zhejiang, and visits can be arranged by appointment. Shenzhen and Changzhou are sales offices and do not host audits.",
    },
  ],
  ctaTitle: "Need to verify us or request documents?",
  ctaBody:
    "Quotations, samples and factory visits all go through the official channels. Please use the domain, email and phone number listed on this page.",
  ctaContact: "Contact us",
  ctaAbout: "About the company",
  ctaDownloads: "Download centre",
  updated: "Page updated: 19 October 2026",
};

function copyFor(locale: string): OfficialCopy {
  return locale === "en" ? EN : ZH;
}

export function generateMetadata(): Metadata {
  const locale = requireZhEnLocale();
  const path = localizeHref("/official", locale);
  const copy = copyFor(locale);
  const title = seoTitle(copy.metaTitle);
  const description = seoDescription(copy.metaDescription);

  return {
    title,
    description,
    keywords: copy.keywords,
    alternates: {
      canonical: absoluteUrl(path),
      languages: localeAlternatesZhEn("/official").languages,
    },
    ...buildPageSocialMeta({ title, description, path, locale }),
  };
}

export default function OfficialPage() {
  const locale = requireZhEnLocale();
  const messages = getMessages(locale);
  const copy = copyFor(locale);
  const path = localizeHref("/official", locale);

  const breadcrumb = buildSimpleBreadcrumbJsonLd([
    { name: messages.home, path: localizeHref("/", locale) },
    { name: copy.crumbs.self, path },
  ]);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="page-hero px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <nav className="mb-4 text-xs text-white/70" aria-label="breadcrumb">
            <Link href={localizeHref("/", locale)} className="hover:text-white">
              {copy.crumbs.home}
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span className="text-white/90">{copy.crumbs.self}</span>
          </nav>
          <h1 className="text-2xl font-bold leading-snug text-white sm:text-4xl">
            {copy.h1}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/85 sm:text-base">
            {copy.lead}
          </p>
          <p className="mt-4 text-xs text-white/60">{copy.updated}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <section aria-labelledby="identity">
          <h2
            id="identity"
            className="text-xl font-bold text-brand-primary sm:text-2xl"
          >
            {copy.sec1Title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            {copy.sec1Body}
          </p>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            {copy.facts.map((f) => (
              <div
                key={f.k}
                className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3"
              >
                <dt className="text-xs font-medium text-foreground/50">{f.k}</dt>
                <dd className="mt-1 break-all text-sm font-medium text-foreground/85">
                  {f.v}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-sm leading-relaxed text-foreground/60">
            {copy.sec1Note}
          </p>
        </section>

        <section className="mt-14" aria-labelledby="verify">
          <h2
            id="verify"
            className="text-xl font-bold text-brand-primary sm:text-2xl"
          >
            {copy.sec2Title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            {copy.sec2Lead}
          </p>
          <ol className="mt-6 space-y-4">
            {copy.steps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-xl border border-gray-200 p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-secondary text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-brand-primary">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                      {step.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14" aria-labelledby="brand">
          <h2
            id="brand"
            className="text-xl font-bold text-brand-primary sm:text-2xl"
          >
            {copy.sec3Title}
          </h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground/75">
            {copy.sec3Paras.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="similar">
          <h2
            id="similar"
            className="text-xl font-bold text-brand-primary sm:text-2xl"
          >
            {copy.sec4Title}
          </h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground/75">
            {copy.sec4Paras.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="faq">
          <h2
            id="faq"
            className="text-xl font-bold text-brand-primary sm:text-2xl"
          >
            {copy.sec5Title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            {copy.sec5Lead}
          </p>
          <dl className="mt-6 space-y-4">
            {copy.faqs.map((item) => (
              <div
                key={item.q}
                className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-4"
              >
                <dt className="text-sm font-semibold text-brand-primary">
                  {item.q}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          className="mt-14 rounded-xl border border-gray-200 bg-gray-50 p-6 sm:p-8"
          aria-labelledby="cta"
        >
          <h2
            id="cta"
            className="text-lg font-bold text-brand-primary sm:text-xl"
          >
            {copy.ctaTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/75">
            {copy.ctaBody}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={localizeHref("/contact", locale)}
              className="inline-flex rounded-md bg-brand-secondary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-accent"
            >
              {copy.ctaContact}
            </Link>
            <Link
              href={localizeHref("/about", locale)}
              className="inline-flex rounded-md border border-brand-secondary px-5 py-2.5 text-sm font-medium text-brand-secondary transition-colors hover:bg-brand-secondary hover:text-white"
            >
              {copy.ctaAbout}
            </Link>
            <Link
              href={localizeHref("/downloads", locale)}
              className="inline-flex rounded-md border border-gray-300 px-5 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:border-brand-secondary hover:text-brand-secondary"
            >
              {copy.ctaDownloads}
            </Link>
          </div>
          <p className="mt-5 text-xs text-foreground/50">
            {siteConfig.url.replace(/^https?:\/\//, "")} · {siteConfig.email} ·{" "}
            {siteConfig.phone}
          </p>
        </section>
      </div>
    </div>
  );
}
