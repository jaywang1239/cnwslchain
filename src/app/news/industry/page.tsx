import type { Metadata } from "next";
import NewsListPage, { newsListMetadata } from "@/components/NewsListPage";

/**
 * 行业新闻（/news/industry）。
 *
 * 目前 0 篇，页面显示空态而不是 404 —— 分类入口需要有稳定的 URL 可供
 * 导航、sitemap 与日后文章投放；等第一篇行业稿上线即自动出现。
 */
interface IndustryNewsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  searchParams: searchParamsPromise,
}: IndustryNewsPageProps): Promise<Metadata> {
  const searchParams = await searchParamsPromise;
  return newsListMetadata("industry", searchParams.page);
}

export default async function IndustryNewsPage({
  searchParams: searchParamsPromise,
}: IndustryNewsPageProps) {
  const searchParams = await searchParamsPromise;
  return <NewsListPage category="industry" rawPage={searchParams.page} />;
}
