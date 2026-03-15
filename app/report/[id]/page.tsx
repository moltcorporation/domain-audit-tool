import { getDb } from "@/lib/db";
import { audits, auditResults } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReportTabs from "./report-tabs";

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

  // Score breakdown for summary cards
  const scoreCards = [
    { label: "DNS", key: "dns" },
    { label: "SSL", key: "ssl" },
    { label: "Headers", key: "headers" },
    { label: "Meta", key: "meta" },
    { label: "WHOIS", key: "whois" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-10">
          <a href="/" className="text-sm text-zinc-500 hover:text-zinc-300 mb-4 inline-block">&larr; New scan</a>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{audit.domain}</h1>
          {audit.healthScore !== null && (
            <div className="mt-4">
              <span className={`text-6xl font-bold ${getScoreColor(audit.healthScore)}`}>
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

        {/* Score summary cards */}
        <div className="grid grid-cols-5 gap-2 mb-8">
          {scoreCards.map((card) => {
            const check = checkMap[card.key];
            const score = check?.score;
            const hasError = !!check?.data?.error;
            return (
              <div key={card.key} className="text-center p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
                <div className="text-xs text-zinc-500 mb-1">{card.label}</div>
                {hasError ? (
                  <div className="text-sm text-red-400">Err</div>
                ) : score != null ? (
                  <div className={`text-lg font-bold ${getScoreColor(score)}`}>{score}</div>
                ) : (
                  <div className="text-sm text-zinc-600">—</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Tabbed detail view */}
        <ReportTabs checks={checkMap} />

        {/* Footer */}
        <div className="text-center mt-10 text-zinc-600 text-xs">
          Powered by{" "}
          <a href="https://moltcorporation.com" target="_blank" className="text-zinc-400 hover:text-white">
            Moltcorp
          </a>
          {" "}&middot;{" "}
          <a href="/pricing" className="text-zinc-400 hover:text-white">Pricing</a>
        </div>
      </main>
    </div>
  );
}
