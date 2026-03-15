"use client";

import { useState } from "react";

interface DnsRecord {
  type: string;
  name: string;
  data: string;
  ttl: number;
}

interface SslIssue {
  id: string;
  severity: string;
  category: string;
  message: string;
  points: number;
  maxPoints: number;
}

interface HeaderRule {
  id: string;
  header: string;
  status: string;
  message: string;
  fix?: string;
  points: number;
  maxPoints: number;
}

interface HeaderCategory {
  label: string;
  earned: number;
  possible: number;
  rules: HeaderRule[];
}

interface ResolverResult {
  name: string;
  addresses: string[];
  error?: string;
}

interface CheckData {
  score: number | null;
  grade: string | null;
  data: Record<string, unknown>;
}

const TABS = [
  { key: "dns", label: "DNS" },
  { key: "ssl", label: "SSL" },
  { key: "headers", label: "Headers" },
  { key: "meta", label: "Meta" },
  { key: "whois", label: "WHOIS" },
  { key: "propagation", label: "Propagation" },
] as const;

function statusIcon(status: string) {
  if (status === "pass" || status === "good") return <span className="text-emerald-400">&#10003;</span>;
  if (status === "warn" || status === "warning") return <span className="text-amber-400">&#9888;</span>;
  return <span className="text-red-400">&#10007;</span>;
}

function scoreBar(earned: number, max: number) {
  const pct = max > 0 ? (earned / max) * 100 : 0;
  const color = pct >= 80 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function ReportTabs({ checks }: { checks: Record<string, CheckData> }) {
  const availableTabs = TABS.filter((t) => checks[t.key]);
  const [activeTab, setActiveTab] = useState(availableTabs[0]?.key || "dns");

  const active = checks[activeTab];

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 bg-zinc-900 p-1 rounded-lg mb-6 overflow-x-auto">
        {availableTabs.map((tab) => {
          const check = checks[tab.key];
          const hasError = !!check?.data?.error;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? "bg-zinc-800 text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {tab.label}
              {check?.score != null && !hasError && (
                <span className={`text-xs ${
                  check.score >= 80 ? "text-emerald-400" : check.score >= 60 ? "text-amber-400" : "text-red-400"
                }`}>
                  {check.score}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {active?.data?.error ? (
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
          <p className="text-red-400">{String(active.data.error)}</p>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
          {activeTab === "dns" && <DnsPanel data={active.data} />}
          {activeTab === "ssl" && <SslPanel data={active.data} />}
          {activeTab === "headers" && <HeadersPanel data={active.data} />}
          {activeTab === "meta" && <MetaPanel data={active.data} />}
          {activeTab === "whois" && <WhoisPanel data={active.data} />}
          {activeTab === "propagation" && <PropagationPanel data={active.data} />}
        </div>
      )}
    </div>
  );
}

function DnsPanel({ data }: { data: Record<string, unknown> }) {
  const records = (data.records || []) as DnsRecord[];
  const queryTime = data.queryTime as number | undefined;

  const grouped: Record<string, DnsRecord[]> = {};
  for (const r of records) {
    if (!grouped[r.type]) grouped[r.type] = [];
    grouped[r.type].push(r);
  }

  return (
    <div className="p-6">
      <div className="flex items-baseline justify-between mb-6">
        <h3 className="text-lg font-semibold">{records.length} DNS Records</h3>
        {queryTime && <span className="text-zinc-500 text-sm">{queryTime}ms</span>}
      </div>
      <div className="space-y-6">
        {Object.entries(grouped).map(([type, recs]) => (
          <div key={type}>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-zinc-800 rounded text-xs font-mono text-zinc-300">{type}</span>
              <span className="text-zinc-500 text-xs">{recs.length} record{recs.length !== 1 ? "s" : ""}</span>
            </div>
            <div className="border border-zinc-800 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500 text-xs">
                    <th className="text-left px-4 py-2 font-normal">Name</th>
                    <th className="text-left px-4 py-2 font-normal">Value</th>
                    <th className="text-right px-4 py-2 font-normal">TTL</th>
                  </tr>
                </thead>
                <tbody>
                  {recs.map((r, i) => (
                    <tr key={i} className="border-b border-zinc-800/50 last:border-0">
                      <td className="px-4 py-2 font-mono text-zinc-300 text-xs">{r.name}</td>
                      <td className="px-4 py-2 font-mono text-zinc-100 text-xs break-all">{r.data}</td>
                      <td className="px-4 py-2 text-right text-zinc-500 text-xs">{r.ttl}s</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SslPanel({ data }: { data: Record<string, unknown> }) {
  const cert = data.certificate as Record<string, unknown> | undefined;
  const issues = (data.issues || []) as SslIssue[];
  const score = data.score as number;
  const grade = data.grade as string;

  return (
    <div className="p-6">
      <div className="flex items-baseline gap-3 mb-6">
        <span className="text-3xl font-bold">{score}</span>
        <span className={`px-2 py-0.5 rounded border text-sm font-medium ${
          score >= 80 ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
          : score >= 60 ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
          : "bg-red-500/20 text-red-400 border-red-500/30"
        }`}>{grade}</span>
      </div>

      {cert && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Subject", value: cert.subject },
            { label: "Issuer", value: cert.issuer },
            { label: "Valid From", value: cert.validFrom ? new Date(String(cert.validFrom)).toLocaleDateString() : "—" },
            { label: "Valid To", value: cert.validTo ? new Date(String(cert.validTo)).toLocaleDateString() : "—" },
            { label: "Protocol", value: cert.protocol },
            { label: "Cipher", value: cert.cipher },
            { label: "Key", value: cert.keyType ? `${cert.keyType} ${cert.keySize}-bit` : "—" },
            { label: "Days Left", value: cert.daysUntilExpiry },
          ].map((item) => (
            <div key={item.label} className="bg-zinc-800/50 rounded-lg p-3">
              <div className="text-zinc-500 text-xs mb-1">{item.label}</div>
              <div className="text-sm font-mono text-zinc-200 truncate">{String(item.value ?? "—")}</div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        {issues.map((issue) => (
          <div key={issue.id} className="flex items-start gap-3 p-3 bg-zinc-800/30 rounded-lg">
            <div className="mt-0.5">{statusIcon(issue.severity)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-zinc-200">{issue.category}</span>
                <span className="text-xs text-zinc-500">{issue.points}/{issue.maxPoints}</span>
              </div>
              <p className="text-sm text-zinc-400 mt-0.5">{issue.message}</p>
              {scoreBar(issue.points, issue.maxPoints)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeadersPanel({ data }: { data: Record<string, unknown> }) {
  const scoring = data.scoring as { score: number; categories: HeaderCategory[]; passCount: number; warnCount: number; failCount: number } | undefined;

  if (!scoring) return <div className="p-6 text-zinc-500">No header data</div>;

  return (
    <div className="p-6">
      <div className="flex items-baseline gap-4 mb-6">
        <span className="text-3xl font-bold">{scoring.score}</span>
        <div className="flex gap-3 text-xs">
          <span className="text-emerald-400">{scoring.passCount} pass</span>
          <span className="text-amber-400">{scoring.warnCount} warn</span>
          <span className="text-red-400">{scoring.failCount} fail</span>
        </div>
      </div>

      <div className="space-y-6">
        {scoring.categories.map((cat) => (
          <div key={cat.label}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-zinc-300">{cat.label}</h4>
              <span className="text-xs text-zinc-500">{cat.earned}/{cat.possible}</span>
            </div>
            {scoreBar(cat.earned, cat.possible)}
            <div className="mt-3 space-y-2">
              {cat.rules.map((rule) => (
                <div key={rule.id} className="flex items-start gap-3 p-3 bg-zinc-800/30 rounded-lg">
                  <div className="mt-0.5">{statusIcon(rule.status)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-mono text-zinc-300">{rule.header}</div>
                    <p className="text-xs text-zinc-500 mt-0.5">{rule.message}</p>
                    {rule.fix && (
                      <code className="block text-xs text-emerald-400/70 bg-zinc-800 rounded px-2 py-1 mt-1 font-mono break-all">{rule.fix}</code>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetaPanel({ data }: { data: Record<string, unknown> }) {
  const scoring = data.scoring as { score: number; categories: { label: string; earned: number; possible: number; rules: { id: string; status: string; message: string; fix: string | null }[] }[]; passCount: number; warnCount: number; failCount: number } | undefined;
  const metaData = data.data as Record<string, unknown> | undefined;

  if (!scoring) return <div className="p-6 text-zinc-500">No meta data</div>;

  return (
    <div className="p-6">
      <div className="flex items-baseline gap-4 mb-6">
        <span className="text-3xl font-bold">{scoring.score}</span>
        <div className="flex gap-3 text-xs">
          <span className="text-emerald-400">{scoring.passCount} pass</span>
          <span className="text-amber-400">{scoring.warnCount} warn</span>
          <span className="text-red-400">{scoring.failCount} fail</span>
        </div>
      </div>

      {/* Key meta values */}
      {metaData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {[
            { label: "Title", value: metaData.title },
            { label: "Description", value: metaData.description },
            { label: "og:title", value: metaData.ogTitle },
            { label: "og:image", value: metaData.ogImage },
            { label: "twitter:card", value: metaData.twitterCard },
            { label: "Canonical", value: metaData.canonicalUrl },
          ].filter((item) => item.value).map((item) => (
            <div key={item.label} className="bg-zinc-800/50 rounded-lg p-3">
              <div className="text-zinc-500 text-xs mb-1">{item.label}</div>
              <div className="text-sm text-zinc-200 truncate">{String(item.value)}</div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-6">
        {scoring.categories.map((cat) => (
          <div key={cat.label}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-zinc-300">{cat.label}</h4>
              <span className="text-xs text-zinc-500">{cat.earned}/{cat.possible}</span>
            </div>
            {scoreBar(cat.earned, cat.possible)}
            <div className="mt-3 space-y-2">
              {cat.rules.map((rule) => (
                <div key={rule.id} className="flex items-start gap-3 p-3 bg-zinc-800/30 rounded-lg">
                  <div className="mt-0.5">{statusIcon(rule.status)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-zinc-400">{rule.message}</p>
                    {rule.fix && (
                      <code className="block text-xs text-emerald-400/70 bg-zinc-800 rounded px-2 py-1 mt-1 font-mono break-all">{rule.fix}</code>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhoisPanel({ data }: { data: Record<string, unknown> }) {
  const issues = (data.issues || []) as { category: string; severity: string; message: string; points: number; maxPoints: number }[];
  const score = data.score as number;
  const grade = data.grade as string;
  const nameservers = (data.nameservers || []) as string[];
  const statusCodes = (data.statusCodes || []) as string[];

  return (
    <div className="p-6">
      <div className="flex items-baseline gap-3 mb-6">
        <span className="text-3xl font-bold">{score}</span>
        <span className={`px-2 py-0.5 rounded border text-sm font-medium ${
          score >= 80 ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
          : score >= 60 ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
          : "bg-red-500/20 text-red-400 border-red-500/30"
        }`}>{grade}</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Registrar", value: data.registrar },
          { label: "Created", value: data.createdDate ? new Date(String(data.createdDate)).toLocaleDateString() : "—" },
          { label: "Expires", value: data.expiresDate ? new Date(String(data.expiresDate)).toLocaleDateString() : "—" },
          { label: "DNSSEC", value: data.dnssec ? "Enabled" : "Disabled" },
        ].map((item) => (
          <div key={item.label} className="bg-zinc-800/50 rounded-lg p-3">
            <div className="text-zinc-500 text-xs mb-1">{item.label}</div>
            <div className="text-sm text-zinc-200 truncate">{String(item.value ?? "—")}</div>
          </div>
        ))}
      </div>

      {nameservers.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-zinc-400 mb-2">Nameservers</h4>
          <div className="flex flex-wrap gap-2">
            {nameservers.map((ns) => (
              <span key={ns} className="px-3 py-1 bg-zinc-800 rounded font-mono text-xs text-zinc-300">{ns}</span>
            ))}
          </div>
        </div>
      )}

      {statusCodes.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-zinc-400 mb-2">Status Codes</h4>
          <div className="flex flex-wrap gap-2">
            {statusCodes.map((code) => (
              <span key={code} className="px-2 py-0.5 bg-violet-500/10 text-violet-400 rounded text-xs">{code}</span>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        {issues.map((issue, i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-zinc-800/30 rounded-lg">
            <div className="mt-0.5">{statusIcon(issue.severity)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-zinc-200">{issue.category}</span>
                <span className="text-xs text-zinc-500">{issue.points}/{issue.maxPoints}</span>
              </div>
              <p className="text-sm text-zinc-400 mt-0.5">{issue.message}</p>
              {scoreBar(issue.points, issue.maxPoints)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PropagationPanel({ data }: { data: Record<string, unknown> }) {
  const results = (data.results || []) as ResolverResult[];
  const consistent = data.consistent as boolean;

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <span className={`text-2xl font-bold ${consistent ? "text-emerald-400" : "text-amber-400"}`}>
          {consistent ? "Consistent" : "Propagating"}
        </span>
        <span className={`px-2 py-0.5 rounded text-xs ${
          consistent ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
        }`}>
          {results.filter((r) => r.addresses.length > 0).length}/{results.length} resolvers
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((r) => (
          <div key={r.name} className="bg-zinc-800/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${
                r.addresses.length > 0 ? "bg-emerald-400" : r.error ? "bg-red-400" : "bg-zinc-600"
              }`} />
              <span className="text-sm font-medium text-zinc-200">{r.name}</span>
            </div>
            {r.addresses.length > 0 ? (
              <div className="space-y-1">
                {r.addresses.map((addr) => (
                  <div key={addr} className="font-mono text-xs text-zinc-400">{addr}</div>
                ))}
              </div>
            ) : r.error ? (
              <div className="text-xs text-red-400">{r.error}</div>
            ) : (
              <div className="text-xs text-zinc-600">No records</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
