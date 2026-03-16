import Link from "next/link";

function LockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <rect x="16" y="28" width="32" height="28" rx="4" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
      <path d="M22 28V20a10 10 0 0120 0v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="42" r="4" fill="currentColor" />
      <path d="M32 46v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const comparisonRows = [
  {
    feature: "Speed",
    ours: "Instant — typically under 3 seconds",
    theirs: "Fast, but requires navigating DigiCert's product pages first",
  },
  {
    feature: "Scoring",
    ours: "Numeric score (0-100) with pass/warn/fail per check",
    theirs: "Basic pass/fail — no overall score",
  },
  {
    feature: "Primary purpose",
    ours: "Independent certificate analysis for any domain",
    theirs: "Selling DigiCert certificates — checker is a sales funnel",
  },
  {
    feature: "Certificate chain",
    ours: "Full chain validation with intermediates",
    theirs: "Deep chain validation — DigiCert wrote the book on PKI",
  },
  {
    feature: "Shareable reports",
    ours: "Permanent URL for every scan",
    theirs: "No shareable links — results are session-only",
  },
  {
    feature: "UI / UX",
    ours: "Modern interface with dark mode",
    theirs: "Functional but embedded in a marketing site",
  },
  {
    feature: "Pro tier",
    ours: "Unlimited checks and batch scanning ($9/mo)",
    theirs: "Free — but upsells DigiCert certificates",
  },
  {
    feature: "Ecosystem",
    ours: "Part of Moltcorp products (Headers, DNS, Meta, Uptime, WHOIS)",
    theirs: "Part of DigiCert's enterprise PKI platform",
  },
];

const faqs = [
  {
    question: "What is DigiCert's SSL checker?",
    answer:
      "DigiCert offers a free SSL Installation Diagnostics Tool at digicert.com/help. It checks your certificate chain, validates the installation, and flags common configuration issues. DigiCert is one of the world's largest Certificate Authorities, so their tool is deeply tied to their certificate products — it's primarily designed to help customers verify their DigiCert certificate installations.",
  },
  {
    question: "How does Recon compare to DigiCert's tool?",
    answer:
      "DigiCert's tool is focused on certificate installation validation for their own customers. Recon is vendor-neutral — it analyzes any domain's certificate regardless of who issued it. Recon also provides a numeric score (0-100), checks TLS version and cipher strength, and gives you a permanent shareable URL for every scan. DigiCert's tool is better for diagnosing installation issues with DigiCert-issued certificates specifically.",
  },
  {
    question: "Is DigiCert's SSL tool free?",
    answer:
      "Yes, DigiCert's SSL Installation Diagnostics Tool is free. However, it exists primarily as a support tool for DigiCert customers and as a lead generation funnel for DigiCert certificate sales. Recon is also free (10 checks/day) with a Pro tier ($9/mo) for unlimited checks and batch scanning.",
  },
  {
    question: "Should I use both tools?",
    answer:
      "If you use DigiCert certificates, their diagnostic tool is useful for verifying installations. For general-purpose SSL checking — quickly verifying any domain's certificate expiration, TLS version, key strength, and chain validity — Recon is faster and gives you a scored, shareable report. They serve different audiences well.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "DigiCert Recon Alternative — Recon",
    description:
      "DigiCert's SSL tools are built for enterprise buyers. Recon gives you instant certificate analysis with a scored report and shareable URLs.",
    url: "https://domain-audit-tool-moltcorporation.vercel.app/compare/digicert",
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "SSL Certificate Checker",
      applicationCategory: "SecurityApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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

export default function DigiCertComparison() {
  return (
    <div className="flex min-h-screen flex-col bg-emerald-50/30 font-sans dark:bg-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <LockIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            Recon
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/pricing"
            className="text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            Pricing
          </Link>
          <Link
            href="/"
            className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700 hover:shadow-emerald-300 dark:bg-emerald-500 dark:shadow-emerald-950/50 dark:hover:bg-emerald-400"
          >
            Scan your domain free
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12">
        <div className="flex flex-col items-center gap-5 text-center">
          <LockIcon className="h-14 w-14 text-emerald-600 dark:text-emerald-400" />
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            DigiCert Recon Alternative
            <span className="block text-emerald-600 dark:text-emerald-400">
              Vendor-Neutral, Instant Results
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-gray-600 dark:text-gray-400">
            DigiCert is a trusted Certificate Authority with a free SSL
            diagnostic tool — but it&apos;s built to support their certificate
            customers. Recon gives you{" "}
            <strong className="text-gray-900 dark:text-white">
              vendor-neutral analysis with a scored, shareable report
            </strong>{" "}
            for any domain, any issuer.
          </p>
        </div>

        {/* Honest positioning */}
        <div className="flex flex-col gap-4 rounded-xl border border-emerald-200 bg-emerald-50/60 p-6 dark:border-emerald-900/30 dark:bg-emerald-950/20">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            An honest comparison
          </h2>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            DigiCert is one of the most respected names in SSL/TLS. They issue
            certificates for some of the biggest organizations in the world, and
            their diagnostic tool reflects deep expertise in PKI and certificate
            chain validation. If you&apos;re a DigiCert customer troubleshooting
            an installation, their tool is purpose-built for that.
          </p>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Recon is built for a different use case: quickly checking any
            domain&apos;s certificate health regardless of who issued it,
            getting a numeric score you can track over time, and sharing results
            with your team via a permanent URL. No sales funnel, no upsells —
            just the data.
          </p>
        </div>

        {/* Comparison table */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recon vs DigiCert SSL Tools
          </h2>
          <div className="overflow-x-auto rounded-xl border border-emerald-100 dark:border-emerald-900/30">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-emerald-100 bg-emerald-50/50 dark:border-emerald-900/30 dark:bg-emerald-950/20">
                  <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-500">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-emerald-700 dark:text-emerald-400">
                    Recon
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-500">
                    DigiCert
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 last:border-0 dark:border-gray-800/50"
                  >
                    <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
                      {row.feature}
                    </td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                      {row.ours}
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-500">
                      {row.theirs}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* When to use each */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            When to use each tool
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2 rounded-lg border border-emerald-200 bg-emerald-50/50 p-5 dark:border-emerald-900/30 dark:bg-emerald-950/20">
              <h3 className="font-semibold text-emerald-700 dark:text-emerald-400">
                Choose Recon when...
              </h3>
              <ul className="flex flex-col gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                <li>You need results in seconds, not clicks</li>
                <li>You want a shareable report URL for your team</li>
                <li>You&apos;re checking certs from any CA, not just DigiCert</li>
                <li>You want a numeric score to track over time</li>
                <li>You use our other tools (Headers, DNS, Meta, Uptime)</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                Choose DigiCert when...
              </h3>
              <ul className="flex flex-col gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                <li>You&apos;re a DigiCert certificate customer</li>
                <li>You need to diagnose a certificate installation issue</li>
                <li>You want DigiCert-specific chain validation</li>
                <li>You&apos;re evaluating DigiCert certificates for purchase</li>
                <li>You need enterprise PKI support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-lg border border-emerald-100 bg-white p-5 dark:border-emerald-900/30 dark:bg-gray-900"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-900/30 dark:bg-emerald-950/20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Check your SSL certificate now
          </h2>
          <p className="max-w-md text-sm text-gray-600 dark:text-gray-400">
            Free. Instant. Scored report you can share with your team.
          </p>
          <Link
            href="/"
            className="rounded-xl bg-emerald-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700 hover:shadow-emerald-300 dark:bg-emerald-500 dark:shadow-emerald-950/50 dark:hover:bg-emerald-400"
          >
            Open Recon
          </Link>
        </div>

        {/* More comparisons */}
        <div className="flex flex-col gap-3 rounded-lg border border-emerald-100 bg-white p-5 dark:border-emerald-900/30 dark:bg-gray-900">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            More SSL checker comparisons
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/compare/ssl-labs" className="rounded-lg border border-emerald-200 px-4 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950/20">
              vs SSL Labs &rarr;
            </Link>
          </div>
        </div>

        {/* Related tools */}
        <div className="flex flex-col gap-3 rounded-lg border border-emerald-100 bg-white p-5 dark:border-emerald-900/30 dark:bg-gray-900">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Also check your site with
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Recon", href: "https://domain-audit-tool-moltcorporation.vercel.app" },
              { label: "StatusPing", href: "https://statusping-moltcorporation.vercel.app" },
              { label: "Contract Tracker", href: "https://federal-contract-tracker-moltcorporation.vercel.app" },
          <a href="https://qr-code-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">Qdot</a>
            ].map((tool) => (
              <a
                key={tool.label}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 dark:border-gray-700 dark:text-gray-300 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/20"
              >
                {tool.label} &rarr;
              </a>
            ))}
          </div>
        </div>
      </main>

      <footer className="flex flex-col items-center gap-3 border-t border-emerald-100 px-6 py-6 dark:border-emerald-900/20">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400 dark:text-gray-500">
          <span className="font-medium text-zinc-400">Moltcorp Products:</span>
          <a href="https://domain-audit-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">Recon</a>
          <a href="https://statusping-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">StatusPing</a>
          <a href="https://federal-contract-tracker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">Contract Tracker</a>
          <a href="https://qr-code-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">Qdot</a>
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-600">
          Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">Moltcorp</a>
        </span>
      </footer>
    </div>
  );
}
