import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizeHref } from "@/lib/i18n/config";
import { getRequestLocale } from "@/lib/request-locale";

/**
 * 自定义 404 页（2026-10-06 新增）。
 *
 * 背景：此前线上 404 走 Next.js 内置页，标题是英文
 * "404: This page could not be found."，且没有任何站内出口，
 * 对中文站既是品牌体验损失，也白白浪费了误入流量的挽回机会。
 *
 * 设计约束：
 * - 不再改 messages.ts（改动面太大），故本文件自带 6 语种文案表，自包含。
 * - locale 解析包一层 try/catch：万一 headers() 在该渲染路径不可用，
 *   退化为中文而不是把 404 页本身打成 500。
 */

type Copy = {
  eyebrow: string;
  title: string;
  desc: string;
  links: { label: string; path: string }[];
  hint: string;
  cta: string;
};

const COPY: Record<Locale, Copy> = {
  zh: {
    eyebrow: "错误代码 404",
    title: "这个页面走丢了",
    desc: "地址栏里的链接没有对应的页面——可能是链接已过期，或者地址敲错了一个字符。",
    links: [
      { label: "产品中心", path: "/products" },
      { label: "下载中心", path: "/downloads" },
      { label: "技术博客", path: "/blog" },
      { label: "联系我们", path: "/contact" },
    ],
    hint: "想找具体型号？进产品中心按内高 / 内宽筛选，或直接电话联系我们。",
    cta: "返回首页",
  },
  en: {
    eyebrow: "Error 404",
    title: "This page has moved on",
    desc: "The link you followed does not match any page on this site — it may have expired, or the address may have a typo.",
    links: [
      { label: "Products", path: "/products" },
      { label: "Downloads", path: "/downloads" },
      { label: "Blog", path: "/blog" },
      { label: "Contact", path: "/contact" },
    ],
    hint: "Looking for a specific model? Browse products by inner height / width, or just call us.",
    cta: "Back to home",
  },
  vi: {
    eyebrow: "Lỗi 404",
    title: "Không tìm thấy trang này",
    desc: "Liên kết bạn vừa mở không tương ứng với trang nào trên website — có thể đã hết hiệu lực hoặc địa chỉ bị sai.",
    links: [
      { label: "Sản phẩm", path: "/products" },
      { label: "Tài liệu", path: "/downloads" },
      { label: "Blog", path: "/blog" },
      { label: "Liên hệ", path: "/contact" },
    ],
    hint: "Cần tìm mã cụ thể? Xem sản phẩm theo chiều cao / chiều rộng trong lòng, hoặc gọi trực tiếp cho chúng tôi.",
    cta: "Về trang chủ",
  },
  es: {
    eyebrow: "Error 404",
    title: "Esta página no existe",
    desc: "El enlace que ha seguido no corresponde a ninguna página del sitio: puede haber caducado o la dirección contiene un error.",
    links: [
      { label: "Productos", path: "/products" },
      { label: "Descargas", path: "/downloads" },
      { label: "Blog", path: "/blog" },
      { label: "Contacto", path: "/contact" },
    ],
    hint: "¿Busca un modelo concreto? Consulte por altura / anchura interior, o llámenos directamente.",
    cta: "Volver al inicio",
  },
  it: {
    eyebrow: "Errore 404",
    title: "Questa pagina non esiste",
    desc: "Il link che hai seguito non corrisponde a nessuna pagina del sito: potrebbe essere scaduto o l'indirizzo contiene un errore.",
    links: [
      { label: "Prodotti", path: "/products" },
      { label: "Download", path: "/downloads" },
      { label: "Blog", path: "/blog" },
      { label: "Contatti", path: "/contact" },
    ],
    hint: "Cerchi un modello specifico? Consulta per altezza / larghezza interna, oppure chiamaci.",
    cta: "Torna alla home",
  },
  ru: {
    eyebrow: "Ошибка 404",
    title: "Страница не найдена",
    desc: "Ссылка не соответствует ни одной странице сайта — возможно, она устарела или в адресе опечатка.",
    links: [
      { label: "Продукция", path: "/products" },
      { label: "Загрузки", path: "/downloads" },
      { label: "Блог", path: "/blog" },
      { label: "Контакты", path: "/contact" },
    ],
    hint: "Ищете конкретную модель? Смотрите продукцию по внутренней высоте / ширине или позвоните нам.",
    cta: "На главную",
  },
};

function resolveLocale(): Locale {
  try {
    return getRequestLocale();
  } catch {
    return "zh";
  }
}

export default function NotFound() {
  const locale = resolveLocale();
  const copy = COPY[locale] ?? COPY.zh;
  const home = locale === "zh" ? "/" : `/${locale}`;

  return (
    <section className="page-hero">
      <div className="mx-auto flex max-w-3xl flex-col items-start px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <p className="text-sm font-semibold tracking-widest text-white/70">
          {copy.eyebrow}
        </p>
        <p
          aria-hidden="true"
          className="mt-3 text-6xl font-bold leading-none text-white/25 sm:text-7xl"
        >
          404
        </p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-4xl">
          {copy.title}
        </h1>
        <p className="mt-4 max-w-xl text-base text-white/85">{copy.desc}</p>

        <ul className="mt-8 flex flex-wrap gap-3">
          {copy.links.map((item) => (
            <li key={item.path}>
              <Link
                href={localizeHref(item.path, locale)}
                className="inline-block rounded-md border border-white/45 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white hover:text-brand-secondary"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-white/70">{copy.hint}</p>

        <Link
          href={home}
          className="mt-6 inline-block rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-brand-secondary transition-colors hover:bg-white/85"
        >
          {copy.cta}
        </Link>
      </div>
    </section>
  );
}
