import type { Metadata } from "next";
import NewsListPage, { newsListMetadata } from "@/components/NewsListPage";

interface NewsIndexPageProps {
  /** Next 15 起 searchParams 为 Promise。 */
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  searchParams: searchParamsPromise,
}: NewsIndexPageProps): Promise<Metadata> {
  const searchParams = await searchParamsPromise;
  return newsListMetadata(undefined, searchParams.page);
}

export default async function NewsIndexPage({
  searchParams: searchParamsPromise,
}: NewsIndexPageProps) {
  const searchParams = await searchParamsPromise;
  return <NewsListPage rawPage={searchParams.page} />;
}
