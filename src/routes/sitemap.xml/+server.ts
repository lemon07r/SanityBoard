import type { RequestHandler } from "@sveltejs/kit";
import * as sitemap from "super-sitemap";
import { getRunIds, getRunData } from "$lib/server/data";
import { seoConfig } from "$lib/seo/config";

// Types from super-sitemap (not exported from main module)
type Changefreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";
type Priority = 0.0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0;
type PathObj = {
  path: string;
  lastmod?: string;
  changefreq?: Changefreq;
  priority?: Priority;
  alternates?: { lang: string; path: string }[];
};

export const prerender = true;

// Get the most recent run date for lastmod on homepage/about
function getMostRecentRunDate(): string {
  const runIds = getRunIds();
  let mostRecent = new Date(0);

  for (const id of runIds) {
    try {
      const run = getRunData(id);
      const runDate = new Date(run.metadata["Run Date"]);
      if (runDate > mostRecent) {
        mostRecent = runDate;
      }
    } catch {
      // Skip invalid runs
    }
  }

  return mostRecent.toISOString();
}

// Build a map of run IDs to their dates for report page lastmod
function getRunDatesMap(): Map<string, string> {
  const runIds = getRunIds();
  const dateMap = new Map<string, string>();

  for (const id of runIds) {
    try {
      const run = getRunData(id);
      dateMap.set(id, new Date(run.metadata["Run Date"]).toISOString());
    } catch {
      // Skip invalid runs
    }
  }

  return dateMap;
}

export const GET: RequestHandler = async () => {
  // Get all run IDs for dynamic report pages
  const runIds = getRunIds();
  const runDatesMap = getRunDatesMap();
  const mostRecentDate = getMostRecentRunDate();

  return await sitemap.response({
    origin: seoConfig.siteUrl,
    excludeRoutePatterns: [
      // Exclude any routes that shouldn't be indexed
      ".*\\+error.*",
    ],
    paramValues: {
      "/report/[id]": runIds,
    },
    defaultChangefreq: "weekly",
    defaultPriority: 0.6,
    sort: "alpha",
    processPaths: (paths: PathObj[]) => {
      return paths.map((pathObj) => {
        const { path } = pathObj;

        // Homepage: highest priority, updated when new runs are added
        if (path === "/") {
          return {
            ...pathObj,
            priority: 1.0,
            changefreq: "daily" as const,
            lastmod: mostRecentDate,
          };
        }

        // About and Submit pages: high priority, static content
        if (path === "/about" || path === "/submit") {
          return {
            ...pathObj,
            priority: 0.8,
            changefreq: "monthly" as const,
            lastmod: "2025-01-01T00:00:00.000Z",
          };
        }

        // Report pages: use run date as lastmod
        if (path.startsWith("/report/")) {
          const runId = path.replace("/report/", "");
          const lastmod = runDatesMap.get(runId);
          return {
            ...pathObj,
            priority: 0.6,
            changefreq: "monthly" as const,
            ...(lastmod && { lastmod }),
          };
        }

        return pathObj;
      });
    },
  });
};
