import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { getDb } from "@/lib/db";
import { audits, auditResults, auditLogs } from "@/db/schema";
import { sql } from "drizzle-orm";
import { lookupDns } from "@/lib/checks/dns";
import { checkPropagation } from "@/lib/checks/propagation";
import { checkSsl } from "@/lib/checks/ssl";
import { lookupWhois } from "@/lib/checks/whois";
import { scoreHeaders } from "@/lib/checks/headers";
import { fetchAndParseMeta } from "@/lib/checks/meta-parser";
import { scoreMetaData } from "@/lib/checks/meta-scoring";
import { checkProAccess, buildCheckoutUrl } from "@/lib/stripe";

const FREE_LIMIT = 5;
const WINDOW_MS = 24 * 60 * 60 * 1000;

function cleanDomain(input: string): string {
  let domain = input.trim().toLowerCase();
  domain = domain.replace(/^https?:\/\//, "");
  domain = domain.split("/")[0].split("?")[0].split("#")[0];
  domain = domain.split(":")[0];
  domain = domain.replace(/^www\./, "");
  return domain;
}

const DOMAIN_REGEX = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*\.[a-z]{2,}$/;

function getGrade(score: number): string {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

export async function POST(req: NextRequest) {
  let body: { domain?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const rawDomain = body.domain;
  if (!rawDomain || typeof rawDomain !== "string") {
    return NextResponse.json({ error: "Missing domain" }, { status: 400 });
  }

  const domain = cleanDomain(rawDomain);
  if (!DOMAIN_REGEX.test(domain) || domain.length > 253) {
    return NextResponse.json({ error: "Invalid domain" }, { status: 400 });
  }

  // Check Pro status
  const proEmail = req.cookies.get("recon_pro_email")?.value;
  let isPro = false;
  if (proEmail) {
    isPro = await checkProAccess(proEmail);
  }

  // Rate limiting for free users
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  const ipHash = createHash("sha256").update(ip).digest("hex");

  if (!isPro) {
    try {
      const windowStart = new Date(Date.now() - WINDOW_MS);
      const [countResult] = await getDb()
        .select({ count: sql<number>`count(*)::int` })
        .from(auditLogs)
        .where(
          sql`${auditLogs.ipHash} = ${ipHash} AND ${auditLogs.auditedAt} >= ${windowStart}`
        );

      const used = countResult?.count ?? 0;

      if (used >= FREE_LIMIT) {
        return NextResponse.json(
          {
            error: "Daily audit limit reached. Upgrade to Pro for unlimited scans.",
            remaining: 0,
            limit: FREE_LIMIT,
            upgradeUrl: buildCheckoutUrl(),
          },
          { status: 429 }
        );
      }
    } catch {
      console.error("Rate limit check failed, allowing audit");
    }
  }

  const url = `https://${domain}`;

  // Run all checks in parallel
  const [dnsResult, propagationResult, sslResult, whoisResult, headersResult, metaResult] =
    await Promise.allSettled([
      lookupDns(domain),
      checkPropagation(domain),
      checkSsl(domain),
      lookupWhois(domain),
      fetchAndScoreHeaders(url),
      fetchAndScoreMeta(url),
    ]);

  // Build check results
  type CheckEntry = { type: string; score: number | null; grade: string | null; data: unknown };
  const checks: CheckEntry[] = [];

  // DNS
  if (dnsResult.status === "fulfilled") {
    const hasA = dnsResult.value.records.some((r) => r.type === "A" || r.type === "AAAA");
    checks.push({ type: "dns", score: hasA ? 100 : 50, grade: null, data: dnsResult.value });
  } else {
    checks.push({ type: "dns", score: null, grade: null, data: { error: dnsResult.reason?.message || "DNS lookup failed" } });
  }

  // Propagation
  if (propagationResult.status === "fulfilled") {
    checks.push({ type: "propagation", score: null, grade: null, data: propagationResult.value });
  } else {
    checks.push({ type: "propagation", score: null, grade: null, data: { error: propagationResult.reason?.message || "Propagation check failed" } });
  }

  // SSL
  if (sslResult.status === "fulfilled") {
    checks.push({ type: "ssl", score: sslResult.value.score, grade: sslResult.value.grade, data: sslResult.value });
  } else {
    checks.push({ type: "ssl", score: null, grade: null, data: { error: sslResult.reason?.message || "SSL check failed" } });
  }

  // WHOIS
  if (whoisResult.status === "fulfilled") {
    checks.push({ type: "whois", score: whoisResult.value.score, grade: whoisResult.value.grade, data: whoisResult.value });
  } else {
    checks.push({ type: "whois", score: null, grade: null, data: { error: whoisResult.reason?.message || "WHOIS lookup failed" } });
  }

  // Headers
  if (headersResult.status === "fulfilled") {
    checks.push({ type: "headers", score: headersResult.value.scoring?.score ?? null, grade: null, data: headersResult.value });
  } else {
    checks.push({ type: "headers", score: null, grade: null, data: { error: headersResult.reason?.message || "Headers check failed" } });
  }

  // Meta
  if (metaResult.status === "fulfilled") {
    checks.push({ type: "meta", score: metaResult.value.scoring?.score ?? null, grade: null, data: metaResult.value });
  } else {
    checks.push({ type: "meta", score: null, grade: null, data: { error: metaResult.reason?.message || "Meta check failed" } });
  }

  // Composite health score
  const scores = checks.map((c) => c.score).filter((s): s is number => s !== null);
  const healthScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
  const grade = healthScore !== null ? getGrade(healthScore) : null;

  // Save to database
  let auditId: string | null = null;
  try {
    const [audit] = await getDb().insert(audits).values({
      domain,
      healthScore,
      grade,
    }).returning({ id: audits.id });

    auditId = audit.id;

    await getDb().insert(auditResults).values(
      checks.map((c) => ({
        auditId: audit.id,
        checkType: c.type,
        score: c.score,
        grade: c.grade,
        rawResult: c.data,
      }))
    );
  } catch (err) {
    console.error("Failed to save audit results:", err);
  }

  // Log the audit for rate limiting
  try {
    await getDb().insert(auditLogs).values({ ipHash });
  } catch {
    console.error("Failed to log audit for rate limiting");
  }

  // Build response
  const response: Record<string, unknown> = { domain, healthScore, grade, auditId, isPro };
  for (const check of checks) {
    response[check.type] = check.data;
  }

  return NextResponse.json(response);
}

async function fetchAndScoreHeaders(url: string) {
  const res = await fetch(url, {
    method: "HEAD",
    redirect: "follow",
    signal: AbortSignal.timeout(10_000),
  });

  const headers: Record<string, string> = {};
  res.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const scoring = scoreHeaders(headers);
  return { url, finalUrl: res.url, headers, scoring };
}

async function fetchAndScoreMeta(url: string) {
  const parseResult = await fetchAndParseMeta(url);
  if (!parseResult.success) {
    return { error: parseResult.error, scoring: null };
  }
  const scoring = scoreMetaData(parseResult.data);
  return { data: parseResult.data, scoring };
}
