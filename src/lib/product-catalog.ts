import catalogData from "../../data/product-catalog.json";
import specsData from "../../data/product-specs.json";
import {
  categoryCopy,
  getMessages,
  localizeHref,
  localizeSeriesName,
  type Locale,
} from "@/lib/i18n";
import {
  localizeMaterial,
  localizeOpenType,
  localizeSeriesCode,
} from "@/lib/product-i18n";

export interface ProductSeries {
  id: string;
  name: string;
  code: string;
  specCount: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  intro: string;
  applications: string[];
  series: ProductSeries[];
  imageSrc?: string;
  imageAlt?: string;
}

export const CATEGORY_IMAGE = {
  width: 1600,
  height: 1000,
} as const;

export interface SeriesDetail {
  intro: string;
  material: string;
  openType: string;
  tempRange: string;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface ProductSpec {
  id: string;
  categoryId: string;
  seriesId: string;
  innerHeight: number;
  innerWidth: number;
  code: string;
  connector: string;
  bendRadii: number[];
  material: string;
  openType: string;
  seoTitle?: string;
  seoDescription?: string;
  summary?: string;
  features?: string[];
  applications?: string[];
  faqs?: ProductFaq[];
  images?: ProductImage[];
  drawingUrl?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface CatalogFile {
  categories: ProductCategory[];
  seriesDetails: Record<string, SeriesDetail>;
}

const catalog = catalogData as CatalogFile;
const specs = specsData as ProductSpec[];

export function getAllCategories(): ProductCategory[] {
  return catalog.categories;
}

export function getSeriesImageSrc(seriesId: string): string {
  if (seriesId === "portable-std") {
    return "/images/products/categories/portable.webp";
  }
  return `/images/products/series/${seriesId}/a.webp`;
}

export function localizeCategory(
  category: ProductCategory,
  locale: Locale,
): ProductCategory {
  const copy = categoryCopy[category.id]?.[locale];
  if (!copy) {
    return category;
  }

  return {
    ...category,
    name: copy.name,
    description: copy.description,
    intro: copy.intro,
    applications: [...copy.applications],
    imageAlt: `${copy.name} | CNWSL`,
    series: category.series.map((series) => ({
      ...series,
      name: localizeSeriesName(series.name, locale),
      code: localizeSeriesCode(series.code, locale),
    })),
  };
}

export function localizeCategories(locale: Locale): ProductCategory[] {
  return getAllCategories().map((category) => localizeCategory(category, locale));
}

export function getCategoryById(categoryId: string): ProductCategory | undefined {
  return catalog.categories.find((category) => category.id === categoryId);
}

export function getSeriesById(
  categoryId: string,
  seriesId: string,
): ProductSeries | undefined {
  const category = getCategoryById(categoryId);
  return category?.series.find((series) => series.id === seriesId);
}

export function getSeriesDetail(seriesId: string): SeriesDetail | undefined {
  return catalog.seriesDetails[seriesId];
}

export function getAllCategoryParams(): { category: string }[] {
  return catalog.categories.map((category) => ({ category: category.id }));
}

export function getAllSeriesParams(): { category: string; series: string }[] {
  return catalog.categories.flatMap((category) =>
    category.series.map((series) => ({
      category: category.id,
      series: series.id,
    })),
  );
}

export function getSpecById(
  categoryId: string,
  seriesId: string,
  specId: string,
): ProductSpec | undefined {
  return specs.find(
    (spec) =>
      spec.categoryId === categoryId &&
      spec.seriesId === seriesId &&
      spec.id === specId,
  );
}

/** Lookup by stable model id (new 3-level URL: /products/model/[spec]). */
export function getSpecByModelId(specId: string): ProductSpec | undefined {
  return specs.find((spec) => spec.id === specId);
}

export function getSpecsBySeries(
  categoryId: string,
  seriesId: string,
): ProductSpec[] {
  return specs.filter(
    (spec) => spec.categoryId === categoryId && spec.seriesId === seriesId,
  );
}

export function getAllSpecParams(): {
  category: string;
  series: string;
  spec: string;
}[] {
  return specs.map((spec) => ({
    category: spec.categoryId,
    series: spec.seriesId,
    spec: spec.id,
  }));
}

/** Unique model ids for /products/model/[spec] static params. */
export function getAllModelParams(): { spec: string }[] {
  const seen = new Set<string>();
  const params: { spec: string }[] = [];
  for (const spec of specs) {
    if (seen.has(spec.id)) continue;
    seen.add(spec.id);
    params.push({ spec: spec.id });
  }
  return params;
}

/**
 * Spec/model page path — max 3 segments under the site root (zh):
 * /products/model/{specId}
 * Locale prefixes (/en, /vi, …) are added via localizeHref.
 */
export function getSpecPath(
  _categoryId: string,
  _seriesId: string,
  specId: string,
): string;
export function getSpecPath(specId: string): string;
export function getSpecPath(
  categoryIdOrSpecId: string,
  seriesId?: string,
  specId?: string,
): string {
  const id = specId ?? categoryIdOrSpecId;
  return `/products/model/${id}`;
}

export function buildProductBreadcrumbs(
  categoryId?: string,
  seriesId?: string,
  spec?: ProductSpec,
  locale: Locale = "zh",
): BreadcrumbItem[] {
  const m = getMessages(locale);
  const items: BreadcrumbItem[] = [
    { label: m.home, href: localizeHref("/", locale) },
    {
      label: m.nav.products,
      href: categoryId ? localizeHref("/products", locale) : undefined,
    },
  ];

  if (!categoryId) {
    return items;
  }

  const category = getCategoryById(categoryId);
  if (!category) {
    return items;
  }

  const localized = localizeCategory(category, locale);

  items.push({
    label: localized.name,
    href:
      seriesId || spec
        ? localizeHref(`/products/${categoryId}`, locale)
        : undefined,
  });

  if (seriesId) {
    const series = getSeriesById(categoryId, seriesId);
    if (series) {
      items.push({
        label: localizeSeriesName(series.name, locale),
        href: spec
          ? localizeHref(`/products/${categoryId}/${seriesId}`, locale)
          : undefined,
      });
    }
  }

  if (spec) {
    items.push({ label: `${spec.code}` });
  }

  return items;
}

export function getSpecDisplayTitle(
  spec: ProductSpec,
  seriesName: string,
  locale: Locale = "zh",
): string {
  const openType = localizeOpenType(spec.openType, locale);
  switch (locale) {
    case "en":
      return `${seriesName} ${openType} cable carrier, inner height ${spec.innerHeight} mm, inner width ${spec.innerWidth} mm`;
    case "vi":
      return `${seriesName} xích dẫn cáp ${openType}, chiều cao trong ${spec.innerHeight} mm, chiều rộng trong ${spec.innerWidth} mm`;
    case "es":
      return `${seriesName} portacables ${openType}, altura interior ${spec.innerHeight} mm, ancho interior ${spec.innerWidth} mm`;
    case "it":
      return `${seriesName} catena portacavi ${openType}, altezza interna ${spec.innerHeight} mm, larghezza interna ${spec.innerWidth} mm`;
    case "ru":
      return `${seriesName} кабельная цепь ${openType}, внутренняя высота ${spec.innerHeight} мм, внутренняя ширина ${spec.innerWidth} мм`;
    default:
      return `${seriesName} ${openType}拖链 内高${spec.innerHeight}mm 内宽${spec.innerWidth}mm`;
  }
}

export function getDefaultSpecSummary(
  spec: ProductSpec,
  seriesName: string,
  categoryName: string,
  locale: Locale = "zh",
): string {
  const radii = spec.bendRadii.map((r) => `R${r}`).join(" / ");
  const material = localizeMaterial(spec.material, locale);
  switch (locale) {
    case "en":
      return `${spec.code} is a CNWSL ${categoryName} ${seriesName} carrier with ${spec.innerHeight} mm inner height, ${spec.innerWidth} mm inner width, ${material}, and bend radii ${radii}.`;
    case "vi":
      return `${spec.code} thuộc dòng ${categoryName} ${seriesName} của CNWSL, chiều cao trong ${spec.innerHeight} mm, chiều rộng trong ${spec.innerWidth} mm, vật liệu ${material}, bán kính uốn ${radii}.`;
    case "es":
      return `${spec.code} es un portacables CNWSL de ${categoryName} ${seriesName}, con altura interior ${spec.innerHeight} mm, ancho interior ${spec.innerWidth} mm, material ${material} y radios de curvado ${radii}.`;
    case "it":
      return `${spec.code} è una catena portacavi CNWSL della serie ${categoryName} ${seriesName}, con altezza interna ${spec.innerHeight} mm, larghezza interna ${spec.innerWidth} mm, materiale ${material} e raggi di curvatura ${radii}.`;
    case "ru":
      return `${spec.code} — кабельная цепь CNWSL серии ${categoryName} ${seriesName} с внутренней высотой ${spec.innerHeight} мм, внутренней шириной ${spec.innerWidth} мм, материалом ${material} и радиусами изгиба ${radii}.`;
    default:
      return `${spec.code} 属于威仕龙 ${categoryName} ${seriesName}，内高 ${spec.innerHeight}mm、内宽 ${spec.innerWidth}mm，材质 ${material}，可选弯曲半径 ${radii}。`;
  }
}

export function getDefaultSpecFeatures(
  spec: ProductSpec,
  locale: Locale = "zh",
): string[] {
  const openType = localizeOpenType(spec.openType, locale);
  const material = localizeMaterial(spec.material, locale);
  const join = locale === "zh" ? "、" : ", ";
  const radii = spec.bendRadii.map((r) => `R${r}`).join(join);

  switch (locale) {
    case "en":
      return [
        `${openType} design for industrial cable protection`,
        `Inner height ${spec.innerHeight} mm / inner width ${spec.innerWidth} mm`,
        `Bend radii ${radii}`,
        `Material ${material}`,
        `Matching connector ${spec.connector}`,
      ];
    case "vi":
      return [
        `Thiết kế ${openType} bảo vệ cáp công nghiệp`,
        `Chiều cao trong ${spec.innerHeight} mm / chiều rộng trong ${spec.innerWidth} mm`,
        `Bán kính uốn ${radii}`,
        `Vật liệu ${material}`,
        `Đầu nối tương thích ${spec.connector}`,
      ];
    case "es":
      return [
        `Diseño ${openType} para protección de cables industriales`,
        `Altura interior ${spec.innerHeight} mm / ancho interior ${spec.innerWidth} mm`,
        `Radios de curvado ${radii}`,
        `Material ${material}`,
        `Conector compatible ${spec.connector}`,
      ];
    case "it":
      return [
        `Design ${openType} per protezione cavi industriali`,
        `Altezza interna ${spec.innerHeight} mm / larghezza interna ${spec.innerWidth} mm`,
        `Raggi di curvatura ${radii}`,
        `Materiale ${material}`,
        `Connettore abbinato ${spec.connector}`,
      ];
    case "ru":
      return [
        `Конструкция ${openType} для защиты промышленных кабелей`,
        `Внутренняя высота ${spec.innerHeight} мм / внутренняя ширина ${spec.innerWidth} мм`,
        `Радиусы изгиба ${radii}`,
        `Материал ${material}`,
        `Совместимый соединитель ${spec.connector}`,
      ];
    default:
      return [
        `${openType}结构，适用于工业设备线缆保护`,
        `内高 ${spec.innerHeight}mm / 内宽 ${spec.innerWidth}mm`,
        `可选弯曲半径 ${radii}`,
        `材质 ${material}`,
        `配套接头 ${spec.connector}`,
      ];
  }
}
