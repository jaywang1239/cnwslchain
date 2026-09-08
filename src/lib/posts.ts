import type { Locale } from "@/lib/i18n/config";
import { localeHtmlLang } from "@/lib/i18n/config";
import postsData from "../../data/posts.json";

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  /** Empty string = no cover; prefer none over a mismatched image. */
  featuredImage: string;
  category: string;
  publishedAt: string;
  isPublished: boolean;
  author: string;
}

export function hasFeaturedImage(post: Pick<Post, "featuredImage">): boolean {
  return Boolean(post.featuredImage?.trim());
}

export const POSTS_PER_PAGE = 3;

const posts = postsData as Post[];

/** Local `next dev` shows all posts; production applies timed-publish filters. */
export function isDevEnvironment(): boolean {
  return process.env.NODE_ENV === "development";
}

export function isPostVisible(post: Post, now: Date = new Date()): boolean {
  if (isDevEnvironment()) {
    return true;
  }

  return (
    post.isPublished === true &&
    new Date(post.publishedAt).getTime() <= now.getTime()
  );
}

function sortByPublishedAtDesc(a: Post, b: Post): number {
  return (
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getAllPosts(now: Date = new Date()): Post[] {
  return posts.filter((post) => isPostVisible(post, now)).sort(sortByPublishedAtDesc);
}

export function getPostBySlug(
  slug: string,
  now: Date = new Date()
): Post | undefined {
  const post = posts.find((item) => item.slug === slug);

  if (!post || !isPostVisible(post, now)) {
    return undefined;
  }

  return post;
}

export function getAllPostSlugs(now: Date = new Date()): string[] {
  return getAllPosts(now).map((post) => post.slug);
}

export function getPaginatedPosts(
  page: number,
  pageSize: number = POSTS_PER_PAGE,
  now: Date = new Date()
): {
  posts: Post[];
  total: number;
  totalPages: number;
  currentPage: number;
} {
  const all = getAllPosts(now);
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;

  return {
    posts: all.slice(start, start + pageSize),
    total,
    totalPages,
    currentPage,
  };
}

export function formatPublishedAt(
  isoDate: string,
  locale: Locale = "zh",
): string {
  return new Intl.DateTimeFormat(localeHtmlLang[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(isoDate));
}
