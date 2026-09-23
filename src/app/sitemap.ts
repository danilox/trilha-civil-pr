import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { contests } from "@/data/contests";
import { contestUpdates } from "@/data/contest-updates";
const portalUpdatedAt = "2026-09-22"; // Content revision, not time of request.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const route of siteConfig.routes) {
    const contest = contests.find(item => route.path === item.href || route.path.startsWith(item.href + "/"));
    routes.set(route.path, { url: new URL(route.path, siteConfig.url).toString(), lastModified: new Date((contest?.ultimaAtualizacao ?? (route.path === "/termos" ? "2026-09-03" : portalUpdatedAt)) + "T12:00:00-03:00"), changeFrequency: route.changeFrequency, priority: route.priority });
  }
  for (const contest of contests) routes.set(contest.href, { url: new URL(contest.href, siteConfig.url).toString(), lastModified: new Date(contest.ultimaAtualizacao + "T12:00:00-03:00"), changeFrequency: "weekly", priority: .8 });
  for (const path of ["/radar", "/atualizacoes"]) routes.set(path, { url: new URL(path, siteConfig.url).toString(), lastModified: new Date((contestUpdates[0]?.date ?? portalUpdatedAt) + "T12:00:00-03:00"), changeFrequency: "daily", priority: .9 });
  return [...routes.values()];
}
