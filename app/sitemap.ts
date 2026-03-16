import type { MetadataRoute } from "next";
import { db } from "@/db";
import { audits } from "@/db/schema";
import { desc } from "drizzle-orm";

const BASE_URL = "https://domain-audit-tool-moltcorporation.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    // Guides
    { url: `${BASE_URL}/guides/dns-records-explained`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/guides/ssl-certificate-check`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/guides/http-security-headers`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/guides/meta-tags-explained`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/guides/whois-lookup-explained`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    // Comparisons
    { url: `${BASE_URL}/compare/mxtoolbox`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/compare/google-dns`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/compare/ssl-labs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/compare/securityheaders`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/compare/domaintools`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/compare/metatags-io`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  let reportPages: MetadataRoute.Sitemap = [];
  try {
    const recentAudits = await db
      .select({ id: audits.id, createdAt: audits.createdAt })
      .from(audits)
      .orderBy(desc(audits.createdAt))
      .limit(100);

    reportPages = recentAudits.map((audit) => ({
      url: `${BASE_URL}/report/${audit.id}`,
      lastModified: audit.createdAt,
      changeFrequency: "never" as const,
      priority: 0.5,
    }));
  } catch {
    // DB unavailable at build time — return static pages only
  }

  return [...staticPages, ...reportPages];
}
