import { NextRequest, NextResponse } from "next/server";
import { lookupDns } from "@/lib/checks/dns";
import { checkPropagation } from "@/lib/checks/propagation";
import { checkSsl } from "@/lib/checks/ssl";
import { lookupWhois } from "@/lib/checks/whois";
import { scoreHeaders } from "@/lib/checks/headers";
import { fetchAndParseMeta } from "@/lib/checks/meta-parser";
import { scoreMetaData } from "@/lib/checks/meta-scoring";

function cleanDomain(input: string): string {
  let domain = input.trim().toLowerCase();
  // Strip protocol
  domain = domain.replace(/^https?:\/\//, "");
  // Strip path, query, fragment
  domain = domain.split("/")[0].split("?")[0].split("#")[0];
  // Strip port
  domain = domain.split(":")[0];
  // Strip www. prefix for consistency
  domain = domain.replace(/^www\./, "");
  return domain;
}

const DOMAIN_REGEX = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*\.[a-z]{2,}$/;

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

  // Build response with graceful error handling per check
  const response: Record<string, unknown> = { domain };

  // DNS
  if (dnsResult.status === "fulfilled") {
    response.dns = dnsResult.value;
  } else {
    response.dns = { error: dnsResult.reason?.message || "DNS lookup failed" };
  }

  // Propagation
  if (propagationResult.status === "fulfilled") {
    response.propagation = propagationResult.value;
  } else {
    response.propagation = { error: propagationResult.reason?.message || "Propagation check failed" };
  }

  // SSL
  if (sslResult.status === "fulfilled") {
    response.ssl = sslResult.value;
  } else {
    response.ssl = { error: sslResult.reason?.message || "SSL check failed" };
  }

  // WHOIS
  if (whoisResult.status === "fulfilled") {
    response.whois = whoisResult.value;
  } else {
    response.whois = { error: whoisResult.reason?.message || "WHOIS lookup failed" };
  }

  // Headers
  if (headersResult.status === "fulfilled") {
    response.headers = headersResult.value;
  } else {
    response.headers = { error: headersResult.reason?.message || "Headers check failed" };
  }

  // Meta
  if (metaResult.status === "fulfilled") {
    response.meta = metaResult.value;
  } else {
    response.meta = { error: metaResult.reason?.message || "Meta check failed" };
  }

  // Composite health score (average of available scores, 0-100)
  const scores: number[] = [];
  if (sslResult.status === "fulfilled") scores.push(sslResult.value.score);
  if (whoisResult.status === "fulfilled") scores.push(whoisResult.value.score);
  if (headersResult.status === "fulfilled" && headersResult.value.scoring) {
    scores.push(headersResult.value.scoring.score);
  }
  if (metaResult.status === "fulfilled" && metaResult.value.scoring) {
    scores.push(metaResult.value.scoring.score);
  }
  // DNS: score based on record count (has A record = good)
  if (dnsResult.status === "fulfilled") {
    const hasA = dnsResult.value.records.some((r) => r.type === "A" || r.type === "AAAA");
    scores.push(hasA ? 100 : 50);
  }

  response.healthScore =
    scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;

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
