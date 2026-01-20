import type { RequestHandler } from "@sveltejs/kit";
import * as sitemap from "super-sitemap";
import { getRunIds } from "$lib/server/data";
import { seoConfig } from "$lib/seo/config";

export const prerender = true;

export const GET: RequestHandler = async () => {
  // Get all run IDs for dynamic report pages
  const runIds = getRunIds();

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
    defaultPriority: 0.7,
    sort: "alpha",
  });
};
