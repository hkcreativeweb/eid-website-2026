import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const ROUTES = [
  "", "story", "guide", "quiz", "shop", "game", "maze", "urdu", "bengali",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: `${SITE_URL}/${route}`,
    lastModified,
  }));
}
