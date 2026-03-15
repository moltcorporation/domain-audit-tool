import { getDb } from "@/lib/db";
import { audits, auditResults } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const [audit] = await getDb().select().from(audits).where(eq(audits.id, id));
  if (!audit) return { title: "Not Found" };
  return {
    title: `Recon Report: ${audit.domain}`,
    description: `Domain audit for ${audit.domain} — Health Score: ${audit.healthScore}/100 (${audit.grade})`,
  };
}

export default async function ReportPage({ params }: Props) {
  const { id } = await params;

  const [audit] = await getDb().select().from(audits).where(eq(audits.id, id));
  if (!audit) notFound();

  const results = await getDb()
    .select()
    .from(auditResults)
    .where(eq(auditResults.auditId, id));

  const checkMap: Record<string, { score: number | null; grade: string | null; data: Record<string, unknown> }> = {};
  for (const r of results) {
    checkMap[r.checkType] = { score: r.score, grade: r.grade, data: r.rawResult as Record<string, unknown> };
  }

  function getScoreColor(score: number) {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-amber-400";
    return "text-red-400";
  }

  function getGradeBg(score: number) {
    if (score >= 80) return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    if (score >= 60) return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    return "bg-red-500/20 text-red-400 border-red-500/30";
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <a href="/" className="text-sm text-zinc-500 hover:text-zinc-300 mb-4 inline-block">&larr; New scan</a>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{audit.domain}</h1>
          {audit.healthScore !== null && (
            <div className="mt-4">
              <span className={`text-5xl font-bold ${getScoreColor(audit.healthScore)}`}>
                {audit.healthScore}
              </span>
              {audit.grade && (
                <span className={`ml-3 px-3 py-1 rounded border text-sm font-medium ${getGradeBg(audit.healthScore)}`}>
                  {audit.grade}
                </span>
              )}
              <div className="text-zinc-500 text-sm mt-2">
                Health Score &middot; {new Date(audit.createdAt).toLocaleDateString()}
              </div>
            </div>
          )}
        </div>

        {/* Check Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* DNS */}
          {checkMap.dns && (
            <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-lg">
              <h3 className="text-sm font-medium text-zinc-400 mb-3">DNS Records</h3>
              {checkMap.dns.data.error ? (
                <p className="text-red-400 text-sm">{String(checkMap.dns.data.error)}</p>
              ) : (
                <>
                  <div className="text-2xl font-bold">
                    {Array.isArray(checkMap.dns.data.records) ? checkMap.dns.data.records.length : 0} records
                  </div>
                  {checkMap.dns.data.queryTime && (
                    <div className="text-zinc-500 text-xs mt-1">{String(checkMap.dns.data.queryTime)}ms</div>
                  )}
                </>
              )}
            </div>
          )}

          {/* SSL */}
          {checkMap.ssl && (
            <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-lg">
              <h3 className="text-sm font-medium text-zinc-400 mb-3">SSL Certificate</h3>
              {checkMap.ssl.data.error ? (
                <p className="text-red-400 text-sm">{String(checkMap.ssl.data.error)}</p>
              ) : (
                <div className="flex items-baseline gap-3">
                  <div className="text-2xl font-bold">{checkMap.ssl.score}</div>
                  {checkMap.ssl.grade && (
                    <span className={`px-2 py-0.5 rounded border text-xs font-medium ${getGradeBg(checkMap.ssl.score || 0)}`}>
                      {checkMap.ssl.grade}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Headers */}
          {checkMap.headers && (
            <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-lg">
              <h3 className="text-sm font-medium text-zinc-400 mb-3">Security Headers</h3>
              {checkMap.headers.data.error ? (
                <p className="text-red-400 text-sm">{String(checkMap.headers.data.error)}</p>
              ) : (
                <div className="text-2xl font-bold">{checkMap.headers.score}</div>
              )}
            </div>
          )}

          {/* Meta */}
          {checkMap.meta && (
            <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-lg">
              <h3 className="text-sm font-medium text-zinc-400 mb-3">Meta Tags</h3>
              {checkMap.meta.data.error ? (
                <p className="text-red-400 text-sm">{String(checkMap.meta.data.error)}</p>
              ) : (
                <div className="text-2xl font-bold">{checkMap.meta.score}</div>
              )}
            </div>
          )}

          {/* WHOIS */}
          {checkMap.whois && (
            <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-lg">
              <h3 className="text-sm font-medium text-zinc-400 mb-3">WHOIS / RDAP</h3>
              {checkMap.whois.data.error ? (
                <p className="text-red-400 text-sm">{String(checkMap.whois.data.error)}</p>
              ) : (
                <div className="flex items-baseline gap-3">
                  <div className="text-2xl font-bold">{checkMap.whois.score}</div>
                  {checkMap.whois.grade && (
                    <span className={`px-2 py-0.5 rounded border text-xs font-medium ${getGradeBg(checkMap.whois.score || 0)}`}>
                      {checkMap.whois.grade}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Propagation */}
          {checkMap.propagation && (
            <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-lg">
              <h3 className="text-sm font-medium text-zinc-400 mb-3">DNS Propagation</h3>
              {checkMap.propagation.data.error ? (
                <p className="text-red-400 text-sm">{String(checkMap.propagation.data.error)}</p>
              ) : (
                <div className="text-2xl font-bold">
                  {checkMap.propagation.data.consistent ? (
                    <span className="text-emerald-400">Consistent</span>
                  ) : (
                    <span className="text-amber-400">Propagating</span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="text-center mt-10 text-zinc-600 text-xs">
          Powered by{" "}
          <a href="https://moltcorporation.com" target="_blank" className="text-zinc-400 hover:text-white">
            Moltcorp
          </a>
        </div>
      </main>
    </div>
  );
}
