"use client";

import { useState } from "react";

interface AuditResult {
  domain: string;
  healthScore: number | null;
  dns: { records?: { type: string; name: string; data: string; ttl: number }[]; queryTime?: number; error?: string };
  propagation: { results?: { name: string; addresses: string[]; error?: string }[]; consistent?: boolean; error?: string };
  ssl: { score?: number; grade?: string; certificate?: Record<string, unknown>; issues?: { category: string; severity: string; message: string; points: number; maxPoints: number }[]; error?: string };
  whois: { score?: number; grade?: string; registrar?: string; createdDate?: string; expiresDate?: string; nameservers?: string[]; error?: string };
  headers: { scoring?: { score: number; passCount: number; warnCount: number; failCount: number }; error?: string };
  meta: { scoring?: { score: number; passCount: number; warnCount: number; failCount: number }; error?: string };
}

export default function Home() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!domain.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: domain.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Audit failed");
        return;
      }

      setResult(data);
    } catch {
      setError("Failed to connect. Please try again.");
    } finally {
      setLoading(false);
    }
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
      <main className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-3">Recon</h1>
          <p className="text-zinc-400 text-lg">
            Comprehensive domain audit. DNS, SSL, headers, meta tags, WHOIS — one scan.
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-xl mx-auto mb-16">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="example.com"
            className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-mono text-sm"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !domain.trim()}
            className="px-6 py-3 bg-zinc-100 text-zinc-900 rounded-lg font-medium text-sm hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Scanning..." : "Scan"}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="max-w-xl mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center text-zinc-500">
            <div className="inline-block w-6 h-6 border-2 border-zinc-700 border-t-zinc-300 rounded-full animate-spin mb-3" />
            <p>Running 5 checks in parallel...</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Health Score */}
            {result.healthScore !== null && (
              <div className="text-center mb-10">
                <div className={`text-6xl font-bold ${getScoreColor(result.healthScore)}`}>
                  {result.healthScore}
                </div>
                <div className="text-zinc-500 text-sm mt-1">Health Score for {result.domain}</div>
              </div>
            )}

            {/* Check Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* DNS */}
              <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-lg">
                <h3 className="text-sm font-medium text-zinc-400 mb-3">DNS Records</h3>
                {result.dns.error ? (
                  <p className="text-red-400 text-sm">{result.dns.error}</p>
                ) : (
                  <>
                    <div className="text-2xl font-bold">{result.dns.records?.length || 0} records</div>
                    <div className="text-zinc-500 text-xs mt-1">{result.dns.queryTime}ms query time</div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {Array.from(new Set(result.dns.records?.map((r) => r.type) || [])).map((type) => (
                        <span key={type} className="px-2 py-0.5 bg-zinc-800 rounded text-xs text-zinc-300">
                          {type}: {result.dns.records?.filter((r) => r.type === type).length}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* SSL */}
              <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-lg">
                <h3 className="text-sm font-medium text-zinc-400 mb-3">SSL Certificate</h3>
                {result.ssl.error ? (
                  <p className="text-red-400 text-sm">{result.ssl.error}</p>
                ) : (
                  <>
                    <div className="flex items-baseline gap-3">
                      <div className="text-2xl font-bold">{result.ssl.score}</div>
                      <span className={`px-2 py-0.5 rounded border text-xs font-medium ${getGradeBg(result.ssl.score || 0)}`}>
                        {result.ssl.grade}
                      </span>
                    </div>
                    <div className="text-zinc-500 text-xs mt-1">
                      {result.ssl.issues?.filter((i) => i.severity === "pass").length} pass / {result.ssl.issues?.filter((i) => i.severity !== "pass").length} issues
                    </div>
                  </>
                )}
              </div>

              {/* Headers */}
              <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-lg">
                <h3 className="text-sm font-medium text-zinc-400 mb-3">Security Headers</h3>
                {result.headers.error ? (
                  <p className="text-red-400 text-sm">{result.headers.error}</p>
                ) : result.headers.scoring ? (
                  <>
                    <div className="text-2xl font-bold">{result.headers.scoring.score}</div>
                    <div className="text-zinc-500 text-xs mt-1">
                      {result.headers.scoring.passCount} pass / {result.headers.scoring.warnCount} warn / {result.headers.scoring.failCount} fail
                    </div>
                  </>
                ) : null}
              </div>

              {/* Meta */}
              <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-lg">
                <h3 className="text-sm font-medium text-zinc-400 mb-3">Meta Tags</h3>
                {result.meta.error ? (
                  <p className="text-red-400 text-sm">{result.meta.error}</p>
                ) : result.meta.scoring ? (
                  <>
                    <div className="text-2xl font-bold">{result.meta.scoring.score}</div>
                    <div className="text-zinc-500 text-xs mt-1">
                      {result.meta.scoring.passCount} pass / {result.meta.scoring.warnCount} warn / {result.meta.scoring.failCount} fail
                    </div>
                  </>
                ) : null}
              </div>

              {/* WHOIS */}
              <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-lg">
                <h3 className="text-sm font-medium text-zinc-400 mb-3">WHOIS / RDAP</h3>
                {result.whois.error ? (
                  <p className="text-red-400 text-sm">{result.whois.error}</p>
                ) : (
                  <>
                    <div className="flex items-baseline gap-3">
                      <div className="text-2xl font-bold">{result.whois.score}</div>
                      <span className={`px-2 py-0.5 rounded border text-xs font-medium ${getGradeBg(result.whois.score || 0)}`}>
                        {result.whois.grade}
                      </span>
                    </div>
                    <div className="text-zinc-500 text-xs mt-1">
                      {result.whois.registrar && `Registrar: ${result.whois.registrar}`}
                    </div>
                  </>
                )}
              </div>

              {/* Propagation */}
              <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-lg">
                <h3 className="text-sm font-medium text-zinc-400 mb-3">DNS Propagation</h3>
                {result.propagation.error ? (
                  <p className="text-red-400 text-sm">{result.propagation.error}</p>
                ) : (
                  <>
                    <div className="text-2xl font-bold">
                      {result.propagation.consistent ? (
                        <span className="text-emerald-400">Consistent</span>
                      ) : (
                        <span className="text-amber-400">Propagating</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {result.propagation.results?.map((r) => (
                        <span
                          key={r.name}
                          className={`px-2 py-0.5 rounded text-xs ${
                            r.addresses.length > 0
                              ? "bg-emerald-500/10 text-emerald-400"
                              : r.error
                                ? "bg-red-500/10 text-red-400"
                                : "bg-zinc-800 text-zinc-500"
                          }`}
                        >
                          {r.name}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 text-zinc-600 text-xs">
              Powered by{" "}
              <a href="https://moltcorporation.com" target="_blank" className="text-zinc-400 hover:text-white">
                Moltcorp
              </a>
            </div>
          </div>
        )}

        {/* Features */}
        {!result && !loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-center">
            {[
              { label: "DNS Records", desc: "A, AAAA, MX, TXT, CNAME, NS, SOA" },
              { label: "SSL Certificate", desc: "Expiry, TLS version, key strength" },
              { label: "Security Headers", desc: "HSTS, CSP, XFO, and 8 more" },
              { label: "Meta Tags", desc: "OG, Twitter Cards, JSON-LD" },
              { label: "WHOIS / RDAP", desc: "Registrar, expiry, DNSSEC" },
              { label: "Propagation", desc: "4 global DNS resolvers" },
            ].map((f) => (
              <div key={f.label} className="p-4 bg-zinc-900/50 border border-zinc-800/50 rounded-lg">
                <div className="text-sm font-medium text-zinc-300">{f.label}</div>
                <div className="text-xs text-zinc-500 mt-1">{f.desc}</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
