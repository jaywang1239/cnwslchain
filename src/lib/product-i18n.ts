import type { SeriesDetail } from "@/lib/product-catalog";
import type { Locale } from "@/lib/i18n/config";
import { localeHtmlLang } from "@/lib/i18n/config";

type NonZh = Exclude<Locale, "zh">;

const OPEN_TYPE: Record<string, Record<NonZh, string>> = {
  无尘: {
    en: "Cleanroom",
    vi: "Phòng sạch",
    es: "Sala limpia",
    it: "Cleanroom",
    ru: "Для чистых помещений",
  },
  桥式: {
    en: "Bridge-type",
    vi: "Kiểu cầu",
    es: "Tipo puente",
    it: "Tipo ponte",
    ru: "Мостового типа",
  },
  静音: {
    en: "Silent",
    vi: "Êm",
    es: "Silencioso",
    it: "Silenzioso",
    ru: "Бесшумная",
  },
  全封闭: {
    en: "Fully enclosed",
    vi: "Kín hoàn toàn",
    es: "Totalmente cerrado",
    it: "Completamente chiuso",
    ru: "Полностью закрытая",
  },
  开放式: {
    en: "Open",
    vi: "Mở",
    es: "Abierto",
    it: "Aperto",
    ru: "Открытая",
  },
  半封闭: {
    en: "Semi-enclosed",
    vi: "Bán kín",
    es: "Semicerrado",
    it: "Semicchiuso",
    ru: "Полузакрытая",
  },
  便携式: {
    en: "Portable",
    vi: "Di động",
    es: "Portátil",
    it: "Portatile",
    ru: "Портативная",
  },
};

const MATERIAL_SUFFIX: Record<string, Record<NonZh, string>> = {
  增强尼龙: {
    en: "reinforced nylon",
    vi: "nylon gia cường",
    es: "nailon reforzado",
    it: "nylon rinforzato",
    ru: "армированный нейлон",
  },
  低发尘: {
    en: "low-particle",
    vi: "phát bụi thấp",
    es: "baja emisión de partículas",
    it: "bassa emissione di particelle",
    ru: "с низким пылеобразованием",
  },
};

const SERIES_CODE: Record<string, Record<NonZh, string>> = {
  便携式: {
    en: "Portable",
    vi: "Di động",
    es: "Portátil",
    it: "Portatile",
    ru: "Портативная",
  },
};

const INTRO_PHRASES: Record<NonZh, Array<[RegExp | string, string]>> = {
  en: [
    [/静音(\d+)系列为威仕龙静音拖链/g, "Silent $1 Series is a CNWSL silent cable carrier"],
    [/(\d+)系列为威仕龙桥式拖链/g, "$1 Series is a CNWSL bridge-type cable carrier"],
    [/(WWC\d+)为威仕龙无尘拖链/g, "$1 is a CNWSL cleanroom cable carrier"],
    [/为威仕龙桥式拖链/g, "is a CNWSL bridge-type cable carrier"],
    [/为威仕龙无尘拖链/g, "is a CNWSL cleanroom cable carrier"],
    [/为威仕龙静音拖链/g, "is a CNWSL silent cable carrier"],
    [/为威仕龙便携式拖链/g, "is a CNWSL portable cable carrier"],
    [/内高/g, "inner height"],
    [/内宽/g, "inner width"],
    [/覆盖/g, "covering"],
    [/可选弯曲半径/g, "Available bend radii"],
    [/威仕龙/g, "CNWSL"],
    [/拖链/g, "cable carrier"],
  ],
  vi: [
    [/静音(\d+)系列为威仕龙静音拖链/g, "Dòng êm $1 là xích dẫn cáp êm CNWSL"],
    [/(\d+)系列为威仕龙桥式拖链/g, "Dòng $1 là xích dẫn cáp kiểu cầu CNWSL"],
    [/(WWC\d+)为威仕龙无尘拖链/g, "$1 là xích dẫn cáp phòng sạch CNWSL"],
    [/为威仕龙桥式拖链/g, "là xích dẫn cáp kiểu cầu CNWSL"],
    [/为威仕龙无尘拖链/g, "là xích dẫn cáp phòng sạch CNWSL"],
    [/为威仕龙静音拖链/g, "là xích dẫn cáp êm CNWSL"],
    [/为威仕龙便携式拖链/g, "là xích dẫn cáp di động CNWSL"],
    [/内高/g, "chiều cao trong"],
    [/内宽/g, "chiều rộng trong"],
    [/覆盖/g, "bao gồm"],
    [/可选弯曲半径/g, "Bán kính uốn tùy chọn"],
    [/威仕龙/g, "CNWSL"],
    [/拖链/g, "xích dẫn cáp"],
  ],
  es: [
    [/静音(\d+)系列为威仕龙静音拖链/g, "La serie silenciosa $1 es un portacables silencioso CNWSL"],
    [/(\d+)系列为威仕龙桥式拖链/g, "La serie $1 es un portacables tipo puente CNWSL"],
    [/(WWC\d+)为威仕龙无尘拖链/g, "$1 es un portacables de sala limpia CNWSL"],
    [/为威仕龙桥式拖链/g, "es un portacables tipo puente CNWSL"],
    [/为威仕龙无尘拖链/g, "es un portacables de sala limpia CNWSL"],
    [/为威仕龙静音拖链/g, "es un portacables silencioso CNWSL"],
    [/为威仕龙便携式拖链/g, "es un portacables portátil CNWSL"],
    [/内高/g, "altura interior"],
    [/内宽/g, "ancho interior"],
    [/覆盖/g, "cubre"],
    [/可选弯曲半径/g, "Radios de curvado disponibles"],
    [/威仕龙/g, "CNWSL"],
    [/拖链/g, "portacables"],
  ],
  it: [
    [/静音(\d+)系列为威仕龙静音拖链/g, "La serie silenziosa $1 è una catena portacavi silenziosa CNWSL"],
    [/(\d+)系列为威仕龙桥式拖链/g, "La serie $1 è una catena portacavi a ponte CNWSL"],
    [/(WWC\d+)为威仕龙无尘拖链/g, "$1 è una catena portacavi cleanroom CNWSL"],
    [/为威仕龙桥式拖链/g, "è una catena portacavi a ponte CNWSL"],
    [/为威仕龙无尘拖链/g, "è una catena portacavi cleanroom CNWSL"],
    [/为威仕龙静音拖链/g, "è una catena portacavi silenziosa CNWSL"],
    [/为威仕龙便携式拖链/g, "è una catena portacavi portatile CNWSL"],
    [/内高/g, "altezza interna"],
    [/内宽/g, "larghezza interna"],
    [/覆盖/g, "copre"],
    [/可选弯曲半径/g, "Raggi di curvatura disponibili"],
    [/威仕龙/g, "CNWSL"],
    [/拖链/g, "catena portacavi"],
  ],
  ru: [
    [/静音(\d+)系列为威仕龙静音拖链/g, "Бесшумная серия $1 — бесшумная кабельная цепь CNWSL"],
    [/(\d+)系列为威仕龙桥式拖链/g, "Серия $1 — кабельная цепь мостового типа CNWSL"],
    [/(WWC\d+)为威仕龙无尘拖链/g, "$1 — кабельная цепь CNWSL для чистых помещений"],
    [/为威仕龙桥式拖链/g, "— кабельная цепь мостового типа CNWSL"],
    [/为威仕龙无尘拖链/g, "— кабельная цепь CNWSL для чистых помещений"],
    [/为威仕龙静音拖链/g, "— бесшумная кабельная цепь CNWSL"],
    [/为威仕龙便携式拖链/g, "— портативная кабельная цепь CNWSL"],
    [/内高/g, "внутренняя высота"],
    [/内宽/g, "внутренняя ширина"],
    [/覆盖/g, "охватывает"],
    [/可选弯曲半径/g, "Доступные радиусы изгиба"],
    [/威仕龙/g, "CNWSL"],
    [/拖链/g, "кабельная цепь"],
  ],
};

const PATENT_TITLES: Record<string, Record<NonZh, string>> = {
  "208-split-link": {
    en: "Split-type cable carrier link",
    vi: "Mắt xích dạng tách của xích dẫn cáp",
    es: "Eslabón partido para portacables",
    it: "Maglia a spezzoni per catena portacavi",
    ru: "Разъёмное звено кабельной цепи",
  },
  "209-chain-link-30zt": {
    en: "Cable carrier link (30ZT)",
    vi: "Mắt xích dẫn cáp (30ZT)",
    es: "Eslabón de portacables (30ZT)",
    it: "Maglia di catena portacavi (30ZT)",
    ru: "Звено кабельной цепи (30ZT)",
  },
  "226-crossbar": {
    en: "Cable carrier crossbar",
    vi: "Thanh ngang xích dẫn cáp",
    es: "Travesaño de portacables",
    it: "Traversa di catena portacavi",
    ru: "Поперечина кабельной цепи",
  },
  "316-new-chain": {
    en: "A new cable carrier",
    vi: "Một loại xích dẫn cáp mới",
    es: "Un nuevo portacables",
    it: "Una nuova catena portacavi",
    ru: "Новая кабельная цепь",
  },
  "318-beam-1": {
    en: "Cable carrier beam (I)",
    vi: "Thanh ngang xích dẫn cáp (I)",
    es: "Viga de portacables (I)",
    it: "Trave di catena portacavi (I)",
    ru: "Балка кабельной цепи (I)",
  },
  "319-beam-2": {
    en: "Cable carrier beam (II)",
    vi: "Thanh ngang xích dẫn cáp (II)",
    es: "Viga de portacables (II)",
    it: "Trave di catena portacavi (II)",
    ru: "Балка кабельной цепи (II)",
  },
  "320-cover-plate": {
    en: "Cable carrier cover plate",
    vi: "Tấm kín xích dẫn cáp",
    es: "Placa de cierre de portacables",
    it: "Piastra di chiusura per catena portacavi",
    ru: "Крышка кабельной цепи",
  },
  "415-chain-plate": {
    en: "A cable carrier side plate",
    vi: "Một tấm mắt xích dẫn cáp",
    es: "Una placa lateral de portacables",
    it: "Una piastra laterale di catena portacavi",
    ru: "Боковая пластина кабельной цепи",
  },
  "416-chain-link": {
    en: "A cable carrier link",
    vi: "Một mắt xích dẫn cáp",
    es: "Un eslabón de portacables",
    it: "Una maglia di catena portacavi",
    ru: "Звено кабельной цепи",
  },
  "418-chain-18": {
    en: "Cable carrier (18)",
    vi: "Xích dẫn cáp (18)",
    es: "Portacables (18)",
    it: "Catena portacavi (18)",
    ru: "Кабельная цепь (18)",
  },
  "441-new-chain": {
    en: "A new cable carrier structure",
    vi: "Một kết cấu xích dẫn cáp mới",
    es: "Una nueva estructura de portacables",
    it: "Una nuova struttura di catena portacavi",
    ru: "Новая конструкция кабельной цепи",
  },
  "63-dustproof-chain": {
    en: "A dust-proof cable carrier",
    vi: "Một loại xích chống bụi",
    es: "Un portacables antipolvo",
    it: "Una catena portacavi antipolvere",
    ru: "Пылезащитная кабельная цепь",
  },
  "65-divider-clip": {
    en: "Cable divider clip",
    vi: "Kẹp phân cáp",
    es: "Clip separador de cables",
    it: "Clip divisore cavi",
    ru: "Разделитель кабелей",
  },
  "66-cleanroom-chain": {
    en: "Cleanroom cable carrier",
    vi: "Xích dẫn cáp phòng sạch",
    es: "Portacables de sala limpia",
    it: "Catena portacavi cleanroom",
    ru: "Кабельная цепь для чистых помещений",
  },
};

const QR_ALT: Record<Locale, string> = {
  zh: "威仕龙 CNWSL 微信选型小程序码",
  en: "CNWSL WeChat selection mini program QR code",
  vi: "Mã QR mini chương trình chọn mẫu WeChat CNWSL",
  es: "Código QR del mini programa de selección WeChat de CNWSL",
  it: "Codice QR del mini programma di selezione WeChat CNWSL",
  ru: "QR-код мини-программы подбора WeChat CNWSL",
};

const GALLERY_ARIA: Record<Locale, (name: string, index: number) => string> = {
  zh: (name, index) => `查看${name}${index}`,
  en: (name, index) => `View ${name} image ${index}`,
  vi: (name, index) => `Xem ảnh ${index} của ${name}`,
  es: (name, index) => `Ver imagen ${index} de ${name}`,
  it: (name, index) => `Visualizza immagine ${index} di ${name}`,
  ru: (name, index) => `Просмотреть изображение ${index} ${name}`,
};

const HERO_VIDEO: Record<
  Locale,
  { name: string; description: string; brand: string }
> = {
  zh: {
    name: "威仕龙无尘拖链运行演示",
    description:
      "威仕龙 CNWSL 无尘拖链在洁净工况下往复运行，低发尘、低噪音，适用于半导体、液晶面板与医药洁净室。",
    brand: "威仕龙 CNWSL",
  },
  en: {
    name: "CNWSL cleanroom cable carrier demo",
    description:
      "CNWSL cleanroom cable carriers run reciprocating motion in clean environments with low particle generation and low noise, suited to semiconductor, LCD and pharmaceutical cleanrooms.",
    brand: "CNWSL",
  },
  vi: {
    name: "Demo vận hành xích dẫn cáp phòng sạch CNWSL",
    description:
      "Xích dẫn cáp phòng sạch CNWSL chạy chuyển động qua lại trong môi trường sạch, phát bụi thấp và êm, phù hợp bán dẫn, LCD và phòng sạch dược phẩm.",
    brand: "CNWSL",
  },
  es: {
    name: "Demo de portacables de sala limpia CNWSL",
    description:
      "Los portacables de sala limpia CNWSL operan en movimiento alternativo en entornos limpios, con baja emisión de partículas y bajo ruido, aptos para semiconductores, LCD y salas limpias farmacéuticas.",
    brand: "CNWSL",
  },
  it: {
    name: "Demo catena portacavi cleanroom CNWSL",
    description:
      "Le catene portacavi cleanroom CNWSL operano in moto alternato in ambienti puliti, con bassa emissione di particelle e bassa rumorosità, adatte a semiconduttori, LCD e cleanroom farmaceutiche.",
    brand: "CNWSL",
  },
  ru: {
    name: "Демонстрация кабельной цепи CNWSL для чистых помещений",
    description:
      "Кабельные цепи CNWSL для чистых помещений работают в возвратно-поступательном режиме в чистых средах с низким пылеобразованием и низким шумом, подходят для полупроводников, LCD и фармацевтических чистых помещений.",
    brand: "CNWSL",
  },
};

const HAS_CJK = /[\u4e00-\u9fff]/;

function containsCjk(value: string): boolean {
  return HAS_CJK.test(value);
}

export function localizeOpenType(value: string, locale: Locale): string {
  if (locale === "zh" || !value) return value;
  const mapped = OPEN_TYPE[value]?.[locale];
  if (mapped) return mapped;

  let result = value;
  for (const [zh, locales] of Object.entries(OPEN_TYPE)) {
    if (result.includes(zh)) {
      result = result.split(zh).join(locales[locale]);
    }
  }
  return result;
}

export function localizeMaterial(value: string, locale: Locale): string {
  if (locale === "zh" || !value) return value;

  let result = value;
  for (const [zh, locales] of Object.entries(MATERIAL_SUFFIX)) {
    if (result.includes(zh)) {
      result = result.split(zh).join(locales[locale]);
    }
  }

  // Strip any remaining Chinese descriptors; keep material codes intact.
  result = result
    .replace(/[\u4e00-\u9fff]+/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  return result || value.replace(/[\u4e00-\u9fff]+/g, "").trim() || value;
}

function localizeIntro(intro: string, locale: Locale, seriesId?: string): string {
  if (locale === "zh" || !intro) return intro;
  if (!containsCjk(intro)) return intro;

  let result = intro;
  for (const [pattern, replacement] of INTRO_PHRASES[locale]) {
    result = result.replace(pattern, replacement);
  }

  if (containsCjk(result)) {
    const openHint = seriesId?.startsWith("wwc")
      ? localizeOpenType("无尘", locale)
      : seriesId?.endsWith("j")
        ? localizeOpenType("静音", locale)
        : localizeOpenType("桥式", locale);
    const templates: Record<NonZh, string> = {
      en: `${seriesId ?? "CNWSL"} CNWSL ${openHint} cable carrier series.`,
      vi: `Dòng xích dẫn cáp ${openHint} CNWSL ${seriesId ?? ""}.`.trim(),
      es: `Serie de portacables ${openHint} CNWSL ${seriesId ?? ""}.`.trim(),
      it: `Serie di catene portacavi ${openHint} CNWSL ${seriesId ?? ""}.`.trim(),
      ru: `Серия кабельных цепей ${openHint} CNWSL ${seriesId ?? ""}.`.trim(),
    };
    return templates[locale];
  }

  return result.replace(/\s{2,}/g, " ").trim();
}

export function localizeSeriesDetail(
  detail: SeriesDetail | undefined,
  locale: Locale,
  seriesId?: string,
): SeriesDetail | undefined {
  if (!detail) return undefined;
  if (locale === "zh") return detail;

  return {
    intro: localizeIntro(detail.intro, locale, seriesId),
    material: localizeMaterial(detail.material, locale),
    openType: localizeOpenType(detail.openType, locale),
    tempRange: detail.tempRange,
  };
}

const IMAGE_ALT_PARTS: Record<string, Record<NonZh, string>> = {
  威仕龙: {
    en: "CNWSL",
    vi: "CNWSL",
    es: "CNWSL",
    it: "CNWSL",
    ru: "CNWSL",
  },
  系列产品图: {
    en: "series product photo",
    vi: "ảnh sản phẩm series",
    es: "foto de la serie",
    it: "foto della serie",
    ru: "фото серии",
  },
  纯白底洁净室电缆拖链: {
    en: "cleanroom cable drag chain on white background",
    vi: "xích dẫn cáp phòng sạch nền trắng",
    es: "portacables cleanroom sobre fondo blanco",
    it: "catena portacavi cleanroom su fondo bianco",
    ru: "кабель-канал для чистых помещений на белом фоне",
  },
  纯白底电缆拖链: {
    en: "cable drag chain on white background",
    vi: "xích dẫn cáp nền trắng",
    es: "portacables sobre fondo blanco",
    it: "catena portacavi su fondo bianco",
    ru: "кабель-канал на белом фоне",
  },
  无尘拖链: {
    en: "cleanroom cable drag chain",
    vi: "xích dẫn cáp phòng sạch",
    es: "portacables cleanroom",
    it: "catena portacavi cleanroom",
    ru: "кабель-канал для чистых помещений",
  },
  微型拖链: {
    en: "micro cable drag chain",
    vi: "xích dẫn cáp siêu nhỏ",
    es: "portacables micro",
    it: "catena portacavi micro",
    ru: "микро кабель-канал",
  },
  中型拖链: {
    en: "medium cable drag chain",
    vi: "xích dẫn cáp trung",
    es: "portacables mediano",
    it: "catena portacavi media",
    ru: "средний кабель-канал",
  },
  承重拖链: {
    en: "heavy-duty cable drag chain",
    vi: "xích dẫn cáp chịu tải",
    es: "portacables de carga",
    it: "catena portacavi heavy-duty",
    ru: "нагруженный кабель-канал",
  },
  静音拖链: {
    en: "silent cable drag chain",
    vi: "xích dẫn cáp êm",
    es: "portacables silencioso",
    it: "catena portacavi silenziosa",
    ru: "бесшумный кабель-канал",
  },
  便携式拖链: {
    en: "portable cable drag chain",
    vi: "xích dẫn cáp di động",
    es: "portacables portátil",
    it: "catena portacavi portatile",
    ru: "портативный кабель-канал",
  },
  系列: {
    en: "series",
    vi: "series",
    es: "serie",
    it: "serie",
    ru: "серия",
  },
  主图: {
    en: "main view",
    vi: "góc chính",
    es: "vista principal",
    it: "vista principale",
    ru: "основной вид",
  },
  侧面: {
    en: "side view",
    vi: "góc bên",
    es: "vista lateral",
    it: "vista laterale",
    ru: "вид сбоку",
  },
  细节: {
    en: "detail",
    vi: "chi tiết",
    es: "detalle",
    it: "dettaglio",
    ru: "деталь",
  },
  产品图: {
    en: "product photo",
    vi: "ảnh sản phẩm",
    es: "foto del producto",
    it: "foto prodotto",
    ru: "фото изделия",
  },
  实物图: {
    en: "product photo",
    vi: "ảnh thực tế",
    es: "foto real",
    it: "foto reale",
    ru: "реальное фото",
  },
  俯视: {
    en: "top view",
    vi: "góc trên",
    es: "vista superior",
    it: "vista dall'alto",
    ru: "вид сверху",
  },
};

export function localizeImageAlt(
  alt: string | undefined,
  locale: Locale,
  fallbackName?: string,
): string {
  const fallback = fallbackName?.trim() || "CNWSL";
  if (!alt) return fallback;
  if (locale === "zh") return alt;
  if (!containsCjk(alt)) return alt;

  let result = alt;
  for (const [zh, map] of Object.entries(IMAGE_ALT_PARTS)) {
    if (result.includes(zh)) {
      result = result.split(zh).join(map[locale]);
    }
  }
  // Strip leftover CJK so alts stay usable in non-Chinese locales.
  result = result.replace(/[\u4e00-\u9fff]+/g, " ").replace(/\s+/g, " ").trim();
  if (!result || result === "-" || result === "—") {
    return fallback;
  }
  return result.includes(fallback) ? result : `${fallback} ${result}`.trim();
}

export function localizeSeriesCode(code: string, locale: Locale): string {
  if (locale === "zh" || !code) return code;
  const mapped = SERIES_CODE[code]?.[locale];
  if (mapped) return mapped;

  let result = code;
  for (const [zh, locales] of Object.entries(SERIES_CODE)) {
    if (result.includes(zh)) {
      result = result.split(zh).join(locales[locale]);
    }
  }
  return result;
}

export function localizePatentTitle(title: string, slug: string, locale: Locale): string {
  if (locale === "zh") return title;
  const mapped = PATENT_TITLES[slug];
  return mapped?.[locale] ?? mapped?.en ?? slug;
}

export function getQrCodeAlt(locale: Locale): string {
  return QR_ALT[locale];
}

export function getGalleryAriaLabel(
  locale: Locale,
  productName: string,
  index: number,
): string {
  return GALLERY_ARIA[locale](productName, index);
}

export function getHeroVideoCopy(locale: Locale) {
  return {
    ...HERO_VIDEO[locale],
    inLanguage: localeHtmlLang[locale],
  };
}

export function localizeSpecSeoDescription(
  spec: {
    code: string;
    openType: string;
    material: string;
    innerHeight: number;
    innerWidth: number;
    seoDescription?: string;
  },
  categoryName: string,
  seriesName: string,
  locale: Locale,
): string {
  if (locale === "zh") {
    return (
      spec.seoDescription ??
      `${spec.code}，${categoryName} ${seriesName}，${spec.openType}拖链，内高 ${spec.innerHeight}mm / 内宽 ${spec.innerWidth}mm。`
    );
  }

  const openType = localizeOpenType(spec.openType, locale);
  const material = localizeMaterial(spec.material, locale);
  const templates: Record<NonZh, string> = {
    en: `${spec.code}, ${categoryName} ${seriesName}, ${openType} cable carrier, inner height ${spec.innerHeight} mm / inner width ${spec.innerWidth} mm, ${material}.`,
    vi: `${spec.code}, ${categoryName} ${seriesName}, xích dẫn cáp ${openType}, chiều cao trong ${spec.innerHeight} mm / chiều rộng trong ${spec.innerWidth} mm, ${material}.`,
    es: `${spec.code}, ${categoryName} ${seriesName}, portacables ${openType}, altura interior ${spec.innerHeight} mm / ancho interior ${spec.innerWidth} mm, ${material}.`,
    it: `${spec.code}, ${categoryName} ${seriesName}, catena portacavi ${openType}, altezza interna ${spec.innerHeight} mm / larghezza interna ${spec.innerWidth} mm, ${material}.`,
    ru: `${spec.code}, ${categoryName} ${seriesName}, кабельная цепь ${openType}, внутренняя высота ${spec.innerHeight} мм / внутренняя ширина ${spec.innerWidth} мм, ${material}.`,
  };
  return templates[locale];
}
