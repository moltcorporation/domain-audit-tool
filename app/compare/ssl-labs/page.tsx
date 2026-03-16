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
    theirs: "30-60 seconds, often queued behind other scans",
  },
  {
    feature: "Scoring",
    ours: "Numeric score (0-100) with pass/warn/fail per check",
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
    feature: "UI / UX",
    ours: "Modern interface with dark mode",
    theirs: "Functional but dated interface",
  },
  {
    feature: "Pro tier",
    ours: "Unlimited checks and batch scanning ($5/mo)",
    theirs: "Free only — no paid tier",
  },
  {
    feature: "Ecosystem",
    ours: "Part of Moltcorp suite (Headers, DNS, Meta, Uptime, WHOIS)",
    theirs: "Standalone tool by Qualys",
  },
];

const faqs = [
  {
    question: "Is Qualys SSL Labs still the best SSL checker?",
    answer:
      "SSL Labs remains the gold standard for deep TLS analysis — vulnerability scanning, cipher enumeration, and compliance testing. For quick certificate checks (expiration, TLS version, key strength), a faster tool like Recon gives you the answer in seconds instead of a minute.",
  },
  {
    question: "What does SSL Labs check that Recon does not?",
    answer:
      "SSL Labs performs full TLS handshake simulation across multiple client configurations, checks for known vulnerabilities (BEAST, POODLE, Heartbleed, ROBOT), evaluates cipher suite ordering, and tests protocol downgrade attacks. Recon focuses on the most common checks: certificate health, TLS version, key strength, and chain validation.",
  },
  {
    question: "Should I use both tools?",
    answer:
      "Yes. Use Recon for quick daily checks and monitoring — it's instant and gives you a scored report you can share. Use SSL Labs when you need a thorough security audit, compliance verification, or vulnerability assessment. They complement each other well.",
  },
  {
    question: "Is Recon free?",
    answer:
      "Yes. The free tier gives you 10 checks per day with full analysis. Pro ($5/mo) gives you unlimited checks and batch scanning for multiple domains.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "SSL Labs Alternative — Recon",
    description:
      "Qualys SSL Labs takes 30-60 seconds. Recon gives you instant results with a scored report and shareable URLs.",
    url: "https://domain-audit-tool-moltcorporation.vercel.app/compare/ssl-labs",
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

export default function SslLabsComparison() {
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
            SSL Labs Alternative
            <span className="block text-emerald-600 dark:text-emerald-400">
              Instant Results, No Queue
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-gray-600 dark:text-gray-400">
            Qualys SSL Labs is the industry standard for deep TLS analysis —
            but it takes 30-60 seconds and often has a queue. Recon gives
            you{" "}
            <strong className="text-gray-900 dark:text-white">
              instant results with a scored report
            </strong>{" "}
            you can share with your team.
          </p>
        </div>

        {/* Honest positioning */}
        <div className="flex flex-col gap-4 rounded-xl border border-emerald-200 bg-emerald-50/60 p-6 dark:border-emerald-900/30 dark:bg-emerald-950/20">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            An honest comparison
          </h2>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            SSL Labs by Qualys is more thorough than our tool. It performs
            full TLS handshake simulation across dozens of client
            configurations, checks for known vulnerabilities like Heartbleed
            and POODLE, evaluates cipher suite ordering, and tests for protocol
            downgrade attacks. If you need that level of analysis for
            compliance or a security audit, use SSL Labs.
          </p>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Recon is built for the other 95% of use cases: quickly
            checking if your cert is about to expire, verifying your TLS
            version, confirming your chain is valid, and sharing the results
            with your team. That takes us 3 seconds, not 60.
          </p>
        </div>

        {/* Comparison table */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recon vs Qualys SSL Labs
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
                    SSL Labs
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
                <li>You need results in seconds, not minutes</li>
                <li>You want a shareable report URL for your team</li>
                <li>You&apos;re checking cert expiration before it&apos;s too late</li>
                <li>You need unlimited checks via Pro tier</li>
                <li>You use our other tools (Headers, DNS, Meta, Uptime)</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                Choose SSL Labs when...
              </h3>
              <ul className="flex flex-col gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                <li>You need a full vulnerability scan (Heartbleed, POODLE, etc.)</li>
                <li>You&apos;re doing compliance or security audit work</li>
                <li>You need handshake simulation across client configs</li>
                <li>You want the industry-standard A+ grade for stakeholders</li>
                <li>You need cipher suite ordering analysis</li>
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
            <Link href="/compare/digicert" className="rounded-lg border border-emerald-200 px-4 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950/20">
              vs DigiCert &rarr;
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
              { label: "Security Headers", href: "https://domain-audit-tool-moltcorporation.vercel.app" },
              { label: "DNS Records", href: "https://domain-audit-tool-moltcorporation.vercel.app" },
              { label: "Meta Tags", href: "https://domain-audit-tool-moltcorporation.vercel.app" },
              { label: "Uptime Monitor", href: "https://statusping-moltcorporation.vercel.app" },
              { label: "WHOIS Lookup", href: "https://domain-audit-tool-moltcorporation.vercel.app" },
              { label: "Contract Tracker", href: "https://federal-contract-tracker-moltcorporation.vercel.app" },
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
          <span className="font-medium text-zinc-400">Recon — Domain Audit Tool</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">Recon</span>
          <a href="https://domain-audit-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">Recon</a>
          <a href="https://domain-audit-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">Recon</a>
          <a href="https://domain-audit-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">Recon</a>
          <a href="https://statusping-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">StatusPing</a>
          <a href="https://domain-audit-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">Recon</a>
          <a href="https://federal-contract-tracker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">Contract Tracker</a>
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-600">
          Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">Moltcorp</a>
        </span>
      </footer>
    </div>
  );
}
