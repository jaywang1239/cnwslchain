import type { Metadata } from "next";
import NewsListPage, { newsListMetadata } from "@/components/NewsListPage";

/**
 * 企业新闻（/news/company）。
 *
 * 静态段优先于 /news/[slug] 动态段，不会与文章详情冲突；
 * 但新闻 slug 不能取 "company"（当前 10 篇均不冲突）。
 */
interface CompanyNewsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  searchParams: searchParamsPromise,
}: CompanyNewsPageProps): Promise<Metadata> {
  const searchParams = await searchParamsPromise;
  return newsListMetadata("company", searchParams.page);
}

export default async function CompanyNewsPage({
  searchParams: searchParamsPromise,
}: CompanyNewsPageProps) {
  const searchParams = await searchParamsPromise;
  return <NewsListPage category="company" rawPage={searchParams.page} />;
}
