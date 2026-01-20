/**
 * Centralized SEO configuration for SanityBoard
 */

export const seoConfig = {
  siteName: "SanityHarness",
  siteUrl: "https://sanityboard.lr7.dev",
  defaultTitle: "SanityHarness Leaderboard",
  titleTemplate: "%s | SanityHarness",
  defaultDescription:
    "AI agent evaluation leaderboard providing high-signal, agent-agnostic benchmarks for coding agents. Compare rankings by weighted score, pass rate, and model.",
  defaultImage: "/og-image.png",
  twitterHandle: "@lemon07r",
  locale: "en_US",
  type: "website",
} as const;

export type SeoProps = {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    type?: "website" | "article";
    article?: {
      publishedTime?: string;
      modifiedTime?: string;
      authors?: string[];
      tags?: string[];
    };
  };
  twitter?: {
    card?: "summary" | "summary_large_image";
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
  };
  jsonLd?: Record<string, unknown>;
};

/**
 * Generates a full URL from a path
 */
export function getCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${seoConfig.siteUrl}${cleanPath}`;
}

/**
 * Generates a full image URL from a path
 */
export function getImageUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${seoConfig.siteUrl}${cleanPath}`;
}

/**
 * Applies the title template
 */
export function formatTitle(title?: string): string {
  if (!title) return seoConfig.defaultTitle;
  if (title === seoConfig.siteName) return title;
  return seoConfig.titleTemplate.replace("%s", title);
}
