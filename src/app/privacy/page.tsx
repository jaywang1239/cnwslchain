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

type Block = {
  title: string;
  paras?: string[];
  list?: string[];
  note?: string;
};

type PrivacyCopy = {
  metaTitle: string;
  metaDescription: string;
  crumbs: { home: string; self: string };
  h1: string;
  lead: string;
  effective: string;
  toc: string;
  blocks: Block[];
  contactTitle: string;
  contactParas: string[];
  backHome: string;
};

/**
 * 隐私政策页（2026-10-19 新增）。
 *
 * 为什么要有这一页：
 * 1. Google Ads 把「落地页缺少隐私政策」列为常见拒登原因，做 Google 推广前必须有；
 * 2. 《个人信息保护法》第 17 条要求处理个人信息前以显著方式告知处理规则；
 * 3. 欧盟客户（GDPR）会主动来要，缺页会直接损失询盘。
 *
 * 写作纪律（改这一页前先读）：
 * - 每一条都必须与代码实际行为一致，不能写模板话。核对依据：
 *   · 表单字段 → src/app/api/lead/route.ts 的 LeadPayload
 *   · 存储去向 → 同文件 persistLead（服务器本地 jsonl）+ sendResendEmail（Resend）
 *   · Cookie → src/components/LanguageSwitcher.tsx 只写一个 locale cookie
 *   · 站内无任何第三方统计/广告脚本（全仓 grep gtag/gtagmanager/baidu/clarity 为空）
 *   一旦以后接了 GA4、百度统计或广告像素，**必须回来改第三节和 Cookie 一节**，
 *   否则政策与实际不符，比没有政策更麻烦。
 * - 只做中英双语，与 /price /cases /official 同一套 zh-en 收口；
 *   hreflang / sitemap / search-index 三处同步只声明 zh + en。
 */
const ZH: PrivacyCopy = {
  metaTitle: "隐私政策_询盘信息如何收集与使用-威仕龙CNWSL",
  metaDescription:
    "威仕龙 CNWSL（www.cnwslchain.com）隐私政策：说明询盘表单收集哪些字段、存在哪里、保留多久、是否使用 Cookie 与第三方统计，以及你要求查询、更正、删除信息的联系方式与处理时限。",
  crumbs: { home: "首页", self: "隐私政策" },
  h1: "隐私政策",
  lead:
    "这一页说明：你在本网站留下信息时，我们具体收到什么、拿来做什么、存在哪里、留多久，以及你可以要求我们删掉。写的是我们实际的做法，不是通用模板。",
  effective: "生效日期：2026 年 10 月 15 日",
  toc: "内容提要",
  blocks: [
    {
      title: "一、谁在处理你的信息",
      paras: [
        `本网站 ${siteConfig.website} 由${siteConfig.legalName}（品牌：${siteConfig.brand}）运营。公司地址：${siteConfig.addresses.factory}。`,
        `数据相关事宜可直接联系：邮箱 ${siteConfig.email}，电话 ${siteConfig.phone}。我们在中国境内处理这些信息。`,
      ],
    },
    {
      title: "二、我们收集哪些信息",
      paras: [
        "只收集你主动填写并提交的内容，不抓取、不推测。具体字段如下：",
      ],
      list: [
        "询盘 / 联系表单：姓名、企业邮箱、电话、公司名称、感兴趣的产品类别、留言内容；",
        "提交时自动附带：提交页面的地址与该页面语种（用于判断这条询盘来自哪个产品页，方便对口回复）；",
        "如果你用邮件或 WhatsApp 联系我们，则按你实际提供的内容处理。",
      ],
      note:
        "我们不收集身份证号、护照号、银行卡与支付信息、精确地理位置、通讯录或设备指纹。本站不设账号体系，也不需要你注册。",
    },
    {
      title: "三、我们不做的事",
      paras: [
        "下面几条是我们主动说明的边界，也是你判断要不要留下联系方式的前提：",
      ],
      list: [
        "站内没有部署任何第三方广告或流量统计脚本 —— 没有 Google Analytics、没有百度统计、没有广告像素代码。我们不会知道你在站内看了哪些页面、停留多久。",
        "不购买、不租用第三方客户名单，也不做号码清洗后的批量外呼。",
        "不向任何第三方出售、出租或交换你的联系信息。",
        "不做未经你同意的营销群发。",
      ],
      note:
        "如果将来接入访问统计或广告转化追踪，我们会在本页明确写出工具名称、用途与关闭方式，并更新生效日期。",
    },
    {
      title: "四、Cookie 与本地存储",
      paras: [
        "本站只写入一个 Cookie：语言偏好（locale）。它记录你选择的界面语种，有效期一年，下次访问直接进入对应语种页面。",
        "这个 Cookie 不含姓名、邮箱等任何可识别个人身份的信息，也不用于跨站追踪或广告投放。你可以在浏览器里随时清除，网站的主要功能不受影响。",
      ],
    },
    {
      title: "五、信息用来做什么",
      list: [
        "回复你的询盘，提供选型建议、报价与样品安排；",
        "订单履约、发货通知与售后技术支持；",
        "满足合同、税务与出口单证方面的法定留存要求。",
      ],
      note:
        "我们不会把你的信息用于与上述目的无关的场景。",
    },
    {
      title: "六、信息存在哪里",
      paras: [
        "网站托管在 Hostinger International Ltd.，其服务器位于中国境外。你提交的表单内容会写入托管服务器的日志文件，并通过 Resend, Inc.（美国）转发到我们的企业邮箱。",
        "因此，你的信息会被传输至中国境外存储与处理。境外接收方仅为上述两家服务商，用途限于网站托管与邮件投递，不用于其自身的营销。",
        "如果你不希望信息出境，可以改用电话、传真或直接邮件联系，我们会按同样方式处理你的询盘。",
      ],
    },
    {
      title: "七、保留多久",
      list: [
        "未成交的询盘记录：自最后一次联系起 24 个月内删除或匿名化处理；",
        "已成交客户：按合同约定及税务、出口相关法规要求的期限保留；",
        "你可以随时要求我们提前删除，见第九节。",
      ],
    },
    {
      title: "八、向谁披露",
      paras: [
        "除下列情形外，我们不会向第三方提供你的信息：",
      ],
      list: [
        "你明确同意；",
        "为完成你委托的事项所必需（例如货代、报关行，且仅提供履约所需的最小信息）；",
        "法律法规要求或司法机关依法调取。",
      ],
    },
    {
      title: "九、你的权利",
      paras: ["你可以随时行使以下权利，我们不会因此拒绝为你报价或服务："],
      list: [
        "查询：确认我们是否存有你的信息，以及存了哪些；",
        "更正：要求修正不准确或已过期的信息；",
        "删除：要求删除你的询盘记录与联系方式；",
        "撤回同意：不再接受我们基于你此前同意所做的联系；",
        "拒绝营销：要求我们只做履约相关沟通，不发送任何推广内容。",
      ],
      note: `行使方式：发邮件至 ${siteConfig.email}，标题注明「数据请求 / Data Request」，说明你要办哪一项即可。我们会在 30 天内答复并完成处理。`,
    },
    {
      title: "十、未成年人",
      paras: [
        "本站面向企业采购、工程与技术人员，不面向 16 岁以下未成年人，也不会主动收集其个人信息。若发现误提交，告知我们后会立即删除。",
      ],
    },
    {
      title: "十一、政策更新",
      paras: [
        "本政策发生实质变更时，我们会更新本页的生效日期；涉及处理目的、处理方式或境外接收方变化时，会在页面显著位置提示。历史版本可向我们索取。",
      ],
    },
  ],
  contactTitle: "十二、联系我们",
  contactParas: [
    `数据相关疑问、投诉或权利请求，请联系：${siteConfig.email}；电话 ${siteConfig.phone}；地址 ${siteConfig.addresses.factory}。`,
    "如果你认为我们的处理方式损害了你的合法权益，也可以向所在地的个人信息保护监管机构投诉。",
  ],
  backHome: "返回首页",
};

const EN: PrivacyCopy = {
  metaTitle: "Privacy Policy | How CNWSL Handles Inquiry Data",
  metaDescription:
    "CNWSL (www.cnwslchain.com) privacy policy: which fields the inquiry form collects, where the data is stored, how long it is kept, whether cookies or analytics are used, and how to request access, correction or deletion.",
  crumbs: { home: "Home", self: "Privacy Policy" },
  h1: "Privacy Policy",
  lead:
    "This page explains what we actually receive when you leave your details on this site, what we do with it, where it is stored, how long we keep it, and how you can have it deleted. It describes our real practice, not a generic template.",
  effective: "Effective date: 15 October 2026",
  toc: "On this page",
  blocks: [
    {
      title: "1. Who processes your data",
      paras: [
        `This website, ${siteConfig.website}, is operated by ${siteConfig.legalName} (brand: ${siteConfig.brand}), located at ${siteConfig.addresses.factory}, China.`,
        `For any data-related matter, contact us at ${siteConfig.email} or ${siteConfig.phone}. Data is processed in China.`,
      ],
    },
    {
      title: "2. What we collect",
      paras: ["Only what you enter and submit yourself. We do not scrape or infer."],
      list: [
        "Inquiry / contact form: name, business email, phone, company, product category of interest, and your message;",
        "Submitted automatically with the form: the URL and language of the page you sent it from, used to route your inquiry to the right person;",
        "If you contact us by email or WhatsApp, we handle whatever you choose to share there.",
      ],
      note:
        "We do not collect ID or passport numbers, card or payment details, precise location, contact lists or device fingerprints. There is no account system and no registration.",
    },
    {
      title: "3. What we deliberately do not do",
      paras: [
        "These boundaries matter more than a compliance statement, so we state them plainly:",
      ],
      list: [
        "No third-party advertising or analytics scripts run on this site — no Google Analytics, no Baidu Tongji, no ad pixels. We do not know which pages you viewed or how long you stayed.",
        "We do not buy or rent third-party contact lists, and we do not run batch cold-calling on washed number lists.",
        "We do not sell, rent or trade your contact details to anyone.",
        "We do not send marketing blasts without your consent.",
      ],
      note:
        "If we ever add analytics or ad conversion tracking, this page will name the tool, its purpose and how to opt out, and the effective date will change.",
    },
    {
      title: "4. Cookies and local storage",
      paras: [
        "This site writes exactly one cookie: a locale preference. It remembers the interface language you picked, lasts one year, and takes you straight to that language on your next visit.",
        "It contains no name, email or other personally identifying value, and it is not used for cross-site tracking or advertising. You can clear it in your browser at any time; core functionality keeps working.",
      ],
    },
    {
      title: "5. How we use the data",
      list: [
        "To answer your inquiry with selection advice, pricing and samples;",
        "Order fulfilment, shipping notices and after-sales technical support;",
        "To meet statutory retention duties for contracts, tax and export documentation.",
      ],
      note: "We do not use your data for purposes unrelated to the above.",
    },
    {
      title: "6. Where the data is stored",
      paras: [
        "The site is hosted by Hostinger International Ltd., whose servers are outside China. Form submissions are written to a log file on the hosting server and forwarded to our business mailbox through Resend, Inc. (United States).",
        "Your data is therefore transferred to and stored outside China. The only overseas recipients are those two providers, and only for hosting and mail delivery, never for their own marketing.",
        "If you prefer not to have data leave China, you can reach us by phone, fax or direct email instead; we handle those inquiries the same way.",
      ],
    },
    {
      title: "7. How long we keep it",
      list: [
        "Inquiries that do not lead to an order: deleted or anonymised within 24 months of the last contact;",
        "Customers with orders: kept for the periods required by contract and by tax and export regulations;",
        "You may ask us to delete earlier at any time — see section 9.",
      ],
    },
    {
      title: "8. Who we share it with",
      paras: ["We disclose your data only in these cases:"],
      list: [
        "You explicitly agree;",
        "It is necessary to complete what you asked for (for example a freight forwarder or customs broker, receiving only the minimum required);",
        "A law or a competent authority requires it.",
      ],
    },
    {
      title: "9. Your rights",
      paras: [
        "You can exercise any of the following at any time, and we will not refuse to quote or serve you because you did:",
      ],
      list: [
        "Access: confirm whether we hold data about you and see what it is;",
        "Rectification: have inaccurate or outdated data corrected;",
        "Erasure: have your inquiry record and contact details deleted;",
        "Withdrawal of consent: stop contact based on consent you gave earlier;",
        "Objection to marketing: ask us to limit communication to order fulfilment only.",
      ],
      note: `To exercise them, email ${siteConfig.email} with the subject "Data Request" and say which right you are using. We respond and complete the request within 30 days.`,
    },
    {
      title: "10. Minors",
      paras: [
        "This site is aimed at corporate buyers, engineers and technical staff. It is not directed at anyone under 16, and we do not knowingly collect their data. If a submission is found to come from a minor, we delete it promptly.",
      ],
    },
    {
      title: "11. Changes to this policy",
      paras: [
        "When this policy changes materially, the effective date above is updated. If the purpose, the method of processing or an overseas recipient changes, we will flag it prominently on this page. Earlier versions are available on request.",
      ],
    },
  ],
  contactTitle: "12. Contact us",
  contactParas: [
    `For data questions, complaints or rights requests: ${siteConfig.email}; phone ${siteConfig.phone}; address ${siteConfig.addresses.factory}.`,
    "If you believe our processing infringes your rights, you may also complain to the data protection authority in your jurisdiction.",
  ],
  backHome: "Back to home",
};

function copyFor(locale: string): PrivacyCopy {
  return locale === "en" ? EN : ZH;
}

export function generateMetadata(): Metadata {
  const locale = requireZhEnLocale();
  const path = localizeHref("/privacy", locale);
  const copy = copyFor(locale);
  const title = seoTitle(copy.metaTitle);
  const description = seoDescription(copy.metaDescription);

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(path),
      languages: localeAlternatesZhEn("/privacy").languages,
    },
    ...buildPageSocialMeta({ title, description, path, locale }),
    // 政策页不需要参与排名竞争，但要能被抓取；显式声明索引策略减少误判
    robots: { index: true, follow: true },
  };
}

export default function PrivacyPage() {
  const locale = requireZhEnLocale();
  const messages = getMessages(locale);
  const copy = copyFor(locale);
  const path = localizeHref("/privacy", locale);

  const breadcrumb = buildSimpleBreadcrumbJsonLd([
    { name: messages.home, path: localizeHref("/", locale) },
    { name: copy.crumbs.self, path },
  ]);

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
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
          <p className="mt-4 text-xs text-white/60">{copy.effective}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <article className="space-y-10">
          {copy.blocks.map((block) => (
            <section key={block.title}>
              <h2 className="text-lg font-bold text-brand-primary sm:text-xl">
                {block.title}
              </h2>
              {block.paras?.map((p) => (
                <p
                  key={p}
                  className="mt-3 text-sm leading-7 text-foreground/75"
                >
                  {p}
                </p>
              ))}
              {block.list ? (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-foreground/75 marker:text-brand-primary/60">
                  {block.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {block.note ? (
                <p className="mt-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-7 text-foreground/70">
                  {block.note}
                </p>
              ) : null}
            </section>
          ))}

          <section className="rounded-xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-lg font-bold text-brand-primary">
              {copy.contactTitle}
            </h2>
            {copy.contactParas.map((p) => (
              <p key={p} className="mt-3 text-sm leading-7 text-foreground/75">
                {p}
              </p>
            ))}
            <Link
              href={localizeHref("/contact", locale)}
              className="mt-5 inline-flex items-center rounded-md bg-brand-primary px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              {messages.contactCta}
            </Link>
          </section>
        </article>

        <p className="mt-10 text-sm">
          <Link
            href={localizeHref("/", locale)}
            className="text-brand-secondary underline-offset-4 hover:underline"
          >
            {copy.backHome}
          </Link>
        </p>
      </div>
    </div>
  );
}
