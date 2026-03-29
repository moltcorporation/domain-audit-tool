import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://domain-audit-tool-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "SSL Labs Alternative — Instant SSL Checks | Recon",
  description:
    "Qualys SSL Labs takes 30-60 seconds. Recon gives you instant SSL results plus DNS, headers, meta tags, and WHOIS in one scan. Pro at $9/mo.",
  alternates: {
    canonical: `${baseUrl}/compare/ssl-labs`,
  },
  openGraph: {
    title: "SSL Labs Alternative — Recon",
    description:
      "Instant SSL checks plus 4 more domain audits in one scan. SSL Labs takes minutes — Recon takes seconds.",
    type: "website",
    siteName: "Recon",
  },
  twitter: {
    card: "summary_large_image",
    title: "SSL Labs Alternative — Recon",
    description:
      "Instant SSL checks plus DNS, headers, meta, and WHOIS in one scan.",
  },
};

const comparisonRows = [
  {
    feature: "Speed",
    ours: "Under 3 seconds",
    theirs: "30-60 seconds, often queued",
  },
  {
    feature: "Scope",
    ours: "SSL + DNS + headers + meta + WHOIS in one scan",
    theirs: "SSL only",
  },
  {
    feature: "Scoring",
    ours: "Numeric score (0-100) with unified health score",
    theirs: "Letter grade (A+ to F) with detailed sub-scores",
  },
  {
    feature: "TLS depth",
    ours: "Protocol version, cipher suite, key strength",
    theirs: "Full handshake simulation, cipher enumeration, vulnerability checks",
  },
  {
    feature: "Known vulnerabilities",
    ours: "Basic checks",
    theirs: "BEAST, POODLE, Heartbleed, ROBOT, Ticketbleed, and more",
  },
  {
    feature: "Shareable reports",
    ours: "Permanent URL for every scan",
    theirs: "Results expire, no permanent links",
  },
  {
    feature: "Account required",
    ours: "No",
    theirs: "No",
  },
  {
    feature: "Pro pricing",
    ours: "$9/mo — unlimited scans",
    theirs: "Free only — no paid tier",
  },
];

const faqs = [
  {
    question: "Is Qualys SSL Labs still the best SSL checker?",
    answer:
      "SSL Labs remains the gold standard for deep TLS analysis — vulnerability scanning, cipher enumeration, and compliance testing. For quick certificate checks (expiration, TLS version, key strength) plus a full domain audit, Recon gives you the answer in seconds instead of a minute.",
  },
  {
    question: "What does SSL Labs check that Recon does not?",
    answer:
      "SSL Labs performs full TLS handshake simulation across dozens of client configurations, checks for known vulnerabilities (BEAST, POODLE, Heartbleed, ROBOT), evaluates cipher suite ordering, and tests for protocol downgrade attacks. Recon focuses on the most common checks: certificate health, TLS version, key strength, and chain validation.",
  },
  {
    question: "What does Recon check that SSL Labs does not?",
    answer:
      "Recon runs 5 checks in one scan: SSL certificates, DNS records (7 types), security headers (11 headers scored), meta tags (OG, Twitter Cards, JSON-LD), and WHOIS/RDAP registration data. SSL Labs only checks SSL. If you need a full domain audit, Recon covers more ground.",
  },
  {
    question: "Should I use both tools?",
    answer:
      "Yes. Use Recon for quick daily checks and full domain audits — it's instant and covers 5 areas. Use SSL Labs when you need a thorough SSL-specific security audit, compliance verification, or vulnerability assessment. They complement each other well.",
  },
  {
    question: "Is Recon free?",
    answer:
      "Yes. The free tier gives you 5 full audits per day — each audit runs all 5 checks. Pro ($9/mo) gives you unlimited scans.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "SSL Labs Alternative — Recon",
    description:
      "Qualys SSL Labs takes 30-60 seconds. Recon gives you instant SSL results plus DNS, headers, meta tags, and WHOIS in one scan.",
    url: `${baseUrl}/compare/ssl-labs`,
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Recon",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      offers: [
        { "@type": "Offer", price: "0", priceCurrency: "USD" },
        { "@type": "Offer", price: "9", priceCurrency: "USD" },
      ],
    },
  },
  {
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
  },
];

export default function SslLabsComparison() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-950 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(20,184,166,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
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
            SSL Labs Alternative
          </h1>
          <p className="text-lg text-teal-200/60">
            Qualys SSL Labs is the gold standard for deep TLS analysis — but it
            takes 30-60 seconds and only checks SSL. Recon gives you{" "}
            <strong className="text-white">
              instant results across 5 checks
            </strong>{" "}
            — SSL, DNS, security headers, meta tags, and WHOIS — in one scan.
          </p>
        </div>

        {/* Honest positioning */}
        <div className="flex flex-col gap-3 rounded-lg border border-teal-800 bg-teal-950/50 p-6">
          <h2 className="font-mono text-lg font-semibold text-teal-300">
            An honest comparison
          </h2>
          <p className="text-sm text-teal-100/50">
            SSL Labs is more thorough for SSL specifically. It performs full TLS
            handshake simulation, checks for Heartbleed, POODLE, ROBOT, and
            other vulnerabilities, and evaluates cipher suite ordering. If you
            need that depth for compliance or a security audit, use SSL Labs.
          </p>
          <p className="text-sm text-teal-100/50">
            Recon is built for the other 95% of use cases: quickly checking your
            cert status, verifying TLS version, and getting a full domain health
            picture — all in under 3 seconds with a shareable report URL.
          </p>
        </div>

        {/* Speed comparison */}
        <div className="flex flex-col gap-2 rounded-lg border border-teal-800 bg-teal-950/50 p-6">
          <h2 className="font-mono text-lg font-semibold text-teal-300">
            The speed gap
          </h2>
          <p className="text-sm text-teal-100/50">
            SSL Labs:{" "}
            <span className="font-mono font-bold text-red-400">
              30-60 seconds
            </span>
            , often queued behind other scans. Recon:{" "}
            <span className="font-mono font-bold text-teal-300">
              under 3 seconds
            </span>
            , runs 5 checks in parallel. And while SSL Labs checks SSL only,
            Recon also gives you DNS, security headers, meta tags, and WHOIS in
            that same scan.
          </p>
        </div>

        {/* Comparison table */}
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
                    SSL Labs
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-teal-950/50 last:border-0"
                  >
                    <td className="px-4 py-3 font-medium text-teal-100/60">
                      {row.feature}
                    </td>
                    <td className="px-4 py-3 text-teal-100">{row.ours}</td>
                    <td className="px-4 py-3 text-teal-100/40">
                      {row.theirs}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* When to use each */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-lg border border-teal-900/50 bg-gray-900/50 p-6">
            <h2 className="font-mono text-lg font-semibold text-teal-300">
              Choose Recon when...
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-teal-100/50">
              <li>You need results in seconds, not minutes</li>
              <li>
                You want{" "}
                <strong className="text-teal-200">
                  SSL + 4 more checks
                </strong>{" "}
                in one scan
              </li>
              <li>You want a shareable report URL for your team</li>
              <li>
                You need Pro features at{" "}
                <strong className="text-teal-200">$9/mo</strong>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 rounded-lg border border-teal-900/50 bg-gray-900/50 p-6">
            <h2 className="font-mono text-lg font-semibold text-teal-300">
              Choose SSL Labs when...
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-teal-100/50">
              <li>You need vulnerability scanning (Heartbleed, POODLE, etc.)</li>
              <li>You&apos;re doing compliance or security audit work</li>
              <li>You need handshake simulation across client configs</li>
              <li>You want the industry-standard A+ grade</li>
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
            Check your SSL certificate now
          </h2>
          <p className="max-w-md text-sm text-teal-200/60">
            Free. Instant. SSL plus DNS, headers, meta tags, and WHOIS in one
            scan.
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
              href="/compare/mxtoolbox"
              className="rounded-lg border border-teal-900/50 px-4 py-2 font-mono text-sm text-teal-300 transition-colors hover:border-teal-600 hover:bg-teal-950/50"
            >
              vs MXToolbox &rarr;
            </Link>
            <Link
              href="/compare/securityheaders"
              className="rounded-lg border border-teal-900/50 px-4 py-2 font-mono text-sm text-teal-300 transition-colors hover:border-teal-600 hover:bg-teal-950/50"
            >
              vs SecurityHeaders &rarr;
            </Link>
            <Link
              href="/compare/digicert"
              className="rounded-lg border border-teal-900/50 px-4 py-2 font-mono text-sm text-teal-300 transition-colors hover:border-teal-600 hover:bg-teal-950/50"
            >
              vs DigiCert &rarr;
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
          <a href="https://qr-code-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">Qdot</a>
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
          <a href="https://qr-code-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">Qdot</a>
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
