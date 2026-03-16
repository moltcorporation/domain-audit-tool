import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MXToolbox Alternative — 5 Checks in One Scan | Recon",
  description:
    "Looking for an MXToolbox alternative? Recon runs DNS, SSL, security headers, meta tags, and WHOIS in one scan. Pro at $9/mo — not $129. No login required.",
  alternates: {
    canonical:
      "https://domain-audit-tool-moltcorporation.vercel.app/compare/mxtoolbox",
  },
  openGraph: {
    title: "MXToolbox Alternative — Recon",
    description:
      "Free alternative to MXToolbox. DNS, SSL, headers, meta tags, and WHOIS in one scan. Pro at $9/mo.",
    type: "website",
    siteName: "Recon",
  },
  twitter: {
    card: "summary_large_image",
    title: "MXToolbox Alternative — Recon",
    description:
      "5 domain checks in one scan. MXToolbox Pro is $129/mo — Recon Pro is $9/mo.",
  },
};

const faqs = [
  {
    question: "What is MXToolbox?",
    answer:
      "MXToolbox is a suite of network diagnostic tools focused on email deliverability, DNS lookups, and blacklist monitoring. Their free tier includes basic DNS lookups with ads, while their SuperTool Pro starts at $129/mo.",
  },
  {
    question: "Is Recon a good alternative to MXToolbox?",
    answer:
      "For domain auditing, yes. Recon runs 5 checks in one scan — DNS records, SSL certificates, security headers, meta tags, and WHOIS — and gives you a unified health score. MXToolbox requires separate tools for each check. If you specifically need email deliverability tools like blacklist monitoring or SMTP diagnostics, MXToolbox is more specialized.",
  },
  {
    question: "How much does MXToolbox cost vs Recon?",
    answer:
      "MXToolbox offers a free tier with basic lookups and advertising. Their paid plans start at $129/mo for SuperTool Pro. Recon is free for 5 audits per day, with Pro at $9/mo for unlimited scans — over 14x cheaper.",
  },
  {
    question: "What does Recon check that MXToolbox doesn't?",
    answer:
      "Recon runs all 5 checks in parallel and produces a single health score: DNS records (7 types), SSL certificate analysis, security headers scoring (11 headers), meta tag auditing (OG, Twitter Cards, JSON-LD), and WHOIS/RDAP registration data. MXToolbox separates these into individual tools.",
  },
  {
    question: "Do I need an account to use Recon?",
    answer:
      "No. Enter a domain and get results instantly. No signup, no email, no credit card. Reports are saved with shareable permanent URLs.",
  },
];

export default function MXToolboxComparison() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-950 font-sans">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(20,184,166,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-lg font-bold tracking-tight text-teal-400"
        >
          Recon
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/pricing"
            className="font-mono text-sm text-teal-400/60 transition-colors hover:text-teal-300"
          >
            Pricing
          </Link>
          <Link
            href="/"
            className="rounded-lg bg-teal-600 px-4 py-2 font-mono text-sm font-medium text-white transition-colors hover:bg-teal-500"
          >
            Scan your domain free
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12">
        <div className="flex flex-col gap-4">
          <h1 className="font-mono text-3xl font-bold text-white sm:text-4xl">
            MXToolbox Alternative
          </h1>
          <p className="text-lg text-teal-200/60">
            Recon runs 5 domain checks in one scan — DNS records, SSL
            certificates, security headers, meta tags, and WHOIS — while
            MXToolbox makes you run each one separately. Free for 5 audits/day.
            Pro at $9/mo, not $129.
          </p>
        </div>

        {/* Pricing comparison callout */}
        <div className="flex flex-col gap-2 rounded-lg border border-teal-800 bg-teal-950/50 p-6">
          <h2 className="font-mono text-lg font-semibold text-teal-300">
            The pricing gap
          </h2>
          <p className="text-sm text-teal-100/50">
            MXToolbox offers a free tier with basic lookups and ads. Their Pro
            tier jumps to{" "}
            <span className="font-mono font-bold text-red-400">$129/mo</span>.
            There&apos;s nothing in between. Recon fills that gap:{" "}
            <span className="font-mono font-bold text-teal-300">
              free for 5 scans/day
            </span>
            , Pro at{" "}
            <span className="font-mono font-bold text-teal-300">$9/mo</span>{" "}
            for unlimited audits. That&apos;s{" "}
            <span className="font-mono text-teal-300">over 14x cheaper</span>.
          </p>
        </div>

        {/* Feature comparison table */}
        <div className="flex flex-col gap-4">
          <h2 className="font-mono text-lg font-semibold text-teal-300">
            Feature comparison
          </h2>
          <div className="overflow-x-auto rounded-lg border border-teal-900/50 bg-gray-900/80">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-teal-900/50">
                  <th className="px-4 py-3 text-left font-mono text-xs font-medium text-teal-100/40">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left font-mono text-xs font-medium text-teal-400">
                    Recon
                  </th>
                  <th className="px-4 py-3 text-left font-mono text-xs font-medium text-teal-700">
                    MXToolbox
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Unified scan",
                    "5 checks in one request",
                    "Separate tools for each check",
                  ],
                  [
                    "DNS records",
                    "7 types in parallel (A, AAAA, MX, TXT, CNAME, NS, SOA)",
                    "Similar types, one at a time",
                  ],
                  [
                    "SSL analysis",
                    "Certificate scoring, TLS version, key strength",
                    "Basic SSL check available",
                  ],
                  [
                    "Security headers",
                    "11 headers scored (HSTS, CSP, XFO, etc.)",
                    "Not included — separate tool needed",
                  ],
                  [
                    "Meta tags",
                    "OG, Twitter Cards, JSON-LD auditing",
                    "Not available",
                  ],
                  [
                    "WHOIS / RDAP",
                    "Registration, expiry, DNSSEC scoring",
                    "Basic WHOIS lookup",
                  ],
                  [
                    "Health score",
                    "Unified score across all 5 checks",
                    "No unified scoring",
                  ],
                  [
                    "Shareable reports",
                    "Permanent URL for every scan",
                    "No shareable reports",
                  ],
                  ["Account required", "No", "Free tier: no. Pro: yes"],
                  [
                    "Pro pricing",
                    "$9/mo — unlimited scans",
                    "$129/mo — SuperTool Pro",
                  ],
                ].map(([feature, ours, theirs]) => (
                  <tr
                    key={feature}
                    className="border-b border-teal-950/50 last:border-0"
                  >
                    <td className="px-4 py-3 font-medium text-teal-100/60">
                      {feature}
                    </td>
                    <td className="px-4 py-3 text-teal-100">{ours}</td>
                    <td className="px-4 py-3 text-teal-100/40">{theirs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Honest pros/cons */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-lg border border-teal-900/50 bg-gray-900/50 p-6">
            <h2 className="font-mono text-lg font-semibold text-teal-300">
              When MXToolbox is better
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-teal-100/50">
              <li>
                You need{" "}
                <strong className="text-teal-200">
                  email deliverability tools
                </strong>{" "}
                — blacklist monitoring, SMTP diagnostics, mail flow analysis
              </li>
              <li>
                You need{" "}
                <strong className="text-teal-200">
                  DMARC, DKIM, and SPF analysis
                </strong>{" "}
                beyond basic TXT record lookups
              </li>
              <li>
                Your team needs{" "}
                <strong className="text-teal-200">
                  enterprise dashboards
                </strong>{" "}
                with historical monitoring and alerting
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-teal-900/50 bg-gray-900/50 p-6">
            <h2 className="font-mono text-lg font-semibold text-teal-300">
              When Recon is better
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-teal-100/50">
              <li>
                You want{" "}
                <strong className="text-teal-200">one scan, one report</strong>{" "}
                — not 5 separate tools
              </li>
              <li>
                You need{" "}
                <strong className="text-teal-200">
                  security headers + meta tag auditing
                </strong>{" "}
                that MXToolbox doesn&apos;t offer
              </li>
              <li>
                You want{" "}
                <strong className="text-teal-200">shareable reports</strong>{" "}
                with permanent URLs
              </li>
              <li>
                You need Pro features at{" "}
                <strong className="text-teal-200">$9/mo, not $129/mo</strong>
              </li>
            </ul>
          </div>
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-6">
          <h2 className="font-mono text-lg font-semibold text-teal-300">
            Frequently asked questions
          </h2>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 rounded-lg border border-teal-900/50 bg-gray-900/50 p-5"
            >
              <h3 className="font-mono text-sm font-semibold text-teal-200">
                {faq.question}
              </h3>
              <p className="text-sm text-teal-100/50">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-lg border border-teal-800 bg-teal-950/50 p-8 text-center">
          <h2 className="font-mono text-xl font-bold text-white">
            Try Recon — it&apos;s free
          </h2>
          <p className="max-w-md text-sm text-teal-200/60">
            No account needed. Enter a domain and get DNS, SSL, headers, meta
            tags, and WHOIS results in one scan.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-teal-600 px-6 py-3 font-mono text-sm font-medium text-white transition-colors hover:bg-teal-500"
          >
            Scan your domain
          </Link>
        </div>

        {/* More comparisons */}
        <div className="flex flex-col gap-3 rounded-lg border border-teal-900/50 bg-gray-900/50 p-5">
          <p className="font-mono text-sm font-medium text-teal-300">
            More comparisons
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/compare/ssl-labs"
              className="rounded-lg border border-teal-900/50 px-4 py-2 font-mono text-sm text-teal-300 transition-colors hover:border-teal-600 hover:bg-teal-950/50"
            >
              vs SSL Labs &rarr;
            </Link>
            <Link
              href="/compare/securityheaders"
              className="rounded-lg border border-teal-900/50 px-4 py-2 font-mono text-sm text-teal-300 transition-colors hover:border-teal-600 hover:bg-teal-950/50"
            >
              vs SecurityHeaders &rarr;
            </Link>
            <Link
              href="/compare/google-dns"
              className="rounded-lg border border-teal-900/50 px-4 py-2 font-mono text-sm text-teal-300 transition-colors hover:border-teal-600 hover:bg-teal-950/50"
            >
              vs Google DNS &rarr;
            </Link>
            <Link
              href="/compare/domaintools"
              className="rounded-lg border border-teal-900/50 px-4 py-2 font-mono text-sm text-teal-300 transition-colors hover:border-teal-600 hover:bg-teal-950/50"
            >
              vs DomainTools &rarr;
            </Link>
          </div>
        </div>

        {/* Related products */}
        <div className="flex flex-col gap-3 rounded-lg border border-teal-900/50 bg-gray-900/50 p-5">
          <p className="font-mono text-sm font-medium text-teal-300">
            Moltcorp Products
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://statusping-moltcorporation.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-teal-900/50 px-4 py-2 font-mono text-sm text-teal-300 transition-colors hover:border-teal-600 hover:bg-teal-950/50"
            >
              StatusPing &rarr;
            </a>
            <a
              href="https://federal-contract-tracker-moltcorporation.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-teal-900/50 px-4 py-2 font-mono text-sm text-teal-300 transition-colors hover:border-teal-600 hover:bg-teal-950/50"
            >
              Federal Contract Tracker &rarr;
            </a>
          </div>
        </div>
      </main>

      <footer className="relative z-10 flex flex-col items-center gap-3 px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-teal-700">
          <span className="font-medium text-teal-400">Recon</span>
          <a
            href="https://statusping-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-400"
          >
            StatusPing
          </a>
          <a
            href="https://federal-contract-tracker-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-400"
          >
            Federal Contract Tracker
          </a>
        </div>
        <span className="text-xs text-teal-800">
          Built by agents at{" "}
          <a
            href="https://moltcorporation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-500"
          >
            Moltcorp
          </a>
        </span>
      </footer>
    </div>
  );
}
