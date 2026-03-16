import Link from "next/link";

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M32 4L8 16v16c0 14.4 10.24 27.84 24 32 13.76-4.16 24-17.6 24-32V16L32 4z"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M24 32l6 6 10-12"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const comparisonRows = [
  {
    feature: "Fix suggestions",
    headerguard: "Copy-paste fix code for every issue",
    competitor: "Links to external MDN docs",
  },
  {
    feature: "Scoring",
    headerguard: "Numeric score out of 100 with pass/warn/fail per header",
    competitor: "Letter grade (A+ to F) with detailed sub-scores",
  },
  {
    feature: "Scope",
    headerguard: "Security headers, cookies, info disclosure",
    competitor: "Headers, CSP, cookies, TLS, redirection, subresource integrity",
  },
  {
    feature: "CSP analysis",
    headerguard: "Checks presence and basic policy",
    competitor: "Deep CSP evaluation with unsafe-inline/eval detection",
  },
  {
    feature: "Speed",
    headerguard: "Results in 2-3 seconds",
    competitor: "Can take 10-30 seconds with full scan",
  },
  {
    feature: "UI / UX",
    headerguard: "Modern interface with dark mode",
    competitor: "Functional but dated interface",
  },
  {
    feature: "Shareable reports",
    headerguard: "Permanent URL for every scan",
    competitor: "Scan results via URL hash (not permanent)",
  },
  {
    feature: "Cookie analysis",
    headerguard: "Checks Secure, HttpOnly, SameSite flags",
    competitor: "Checks cookie flags as part of broader scan",
  },
  {
    feature: "Free tier",
    headerguard: "Free with daily rate limits",
    competitor: "Completely free, no limits",
  },
  {
    feature: "Ecosystem",
    headerguard: "Part of Moltcorp products (SSL, DNS, Meta, Uptime, WHOIS)",
    competitor: "Standalone Mozilla project",
  },
];

const faqs = [
  {
    question: "Is Mozilla Observatory still maintained?",
    answer:
      "Mozilla Observatory is still available and functional, but development has slowed. It was originally built by Mozilla's security team and remains a solid tool for comprehensive security analysis. Recon is a simpler, faster alternative focused specifically on actionable fixes.",
  },
  {
    question:
      "What does Mozilla Observatory check that Recon does not?",
    answer:
      "Mozilla Observatory has a broader scope: it checks subresource integrity, cross-origin resource sharing, redirection patterns, and does deep Content-Security-Policy evaluation including unsafe-inline and unsafe-eval detection. Recon focuses on security headers with copy-paste fixes rather than deep policy analysis.",
  },
  {
    question: "Should I use both tools?",
    answer:
      "Yes, they complement each other well. Use Recon for quick checks with actionable fixes you can deploy immediately. Use Mozilla Observatory for deeper CSP analysis and its broader security evaluation when you need a thorough audit.",
  },
  {
    question: "Is Recon free?",
    answer:
      "Yes. You can scan any website with no signup. Free users have a daily rate limit. Pro ($9/mo) gives you unlimited scans and batch checking.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Mozilla Observatory Alternative — Recon",
  description:
    "Mozilla Observatory is powerful but complex. Recon is a simpler alternative with scored reports and copy-paste fixes for every security header issue.",
  url: "https://domain-audit-tool-moltcorporation.vercel.app/compare/mozilla-observatory",
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "Recon",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
};

export default function MozillaObservatoryComparison() {
  return (
    <div className="page-gradient flex min-h-screen flex-col font-sans">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <header className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <ShieldIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            Recon
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/pricing"
            className="text-sm text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
          >
            Pricing
          </Link>
          <Link
            href="/"
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-indigo-300 dark:bg-indigo-500 dark:shadow-indigo-950/50 dark:hover:bg-indigo-400"
          >
            Scan your domain free
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-4 py-12">
        {/* Hero */}
        <div className="flex flex-col items-center gap-5 text-center">
          <ShieldIcon className="shield-glow h-14 w-14 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Mozilla Observatory Alternative
            <span className="block text-indigo-600 dark:text-indigo-400">
              Faster Results &amp; Copy-Paste Fixes
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-slate-600 dark:text-slate-400">
            Mozilla Observatory is a comprehensive security scanner, but
            it&apos;s slow and doesn&apos;t give you fix code. Recon is
            the faster alternative —{" "}
            <strong className="text-slate-900 dark:text-white">
              scored reports with copy-paste fixes
            </strong>{" "}
            for every header issue, in seconds.
          </p>
        </div>

        {/* Honest positioning */}
        <div className="flex flex-col gap-4 rounded-xl border border-indigo-200 bg-indigo-50/60 p-6 dark:border-indigo-900/50 dark:bg-indigo-950/30">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            An honest comparison
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Mozilla Observatory by Mozilla&apos;s security team is one of the
            most thorough web security scanners available. It evaluates
            Content-Security-Policy in depth, checks subresource integrity,
            cross-origin settings, and redirection patterns. If you need that
            level of CSP analysis, Observatory is hard to beat.
          </p>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Where Recon wins: speed and actionability. Observatory can
            take 30 seconds and sends you to MDN docs to figure out fixes.
            Recon gives you results in 2-3 seconds with the exact header
            values you need to copy into your config. For most developers doing
            a quick security check, that&apos;s the better workflow.
          </p>
        </div>

        {/* Comparison table */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Recon vs Mozilla Observatory
          </h2>
          <div className="overflow-x-auto rounded-xl border border-indigo-100 dark:border-indigo-900/50">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-indigo-100 bg-indigo-50/50 dark:border-indigo-900/50 dark:bg-indigo-950/30">
                  <th className="px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-500">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-indigo-700 dark:text-indigo-400">
                    Recon
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-500">
                    Mozilla Observatory
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-100 last:border-0 dark:border-slate-800/50"
                  >
                    <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">
                      {row.feature}
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                      {row.headerguard}
                    </td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-500">
                      {row.competitor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* When to use each */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            When to use each tool
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2 rounded-lg border border-indigo-200 bg-indigo-50/50 p-5 dark:border-indigo-900/50 dark:bg-indigo-950/30">
              <h3 className="font-semibold text-indigo-700 dark:text-indigo-400">
                Choose Recon when...
              </h3>
              <ul className="flex flex-col gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                <li>You want results in seconds, not 30 seconds</li>
                <li>You need copy-paste fix code, not docs links</li>
                <li>You&apos;re doing a quick check before deploying</li>
                <li>You want a shareable report URL for your team</li>
                <li>You use our other tools (SSL, DNS, Meta, Uptime)</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
              <h3 className="font-semibold text-slate-700 dark:text-slate-300">
                Choose Mozilla Observatory when...
              </h3>
              <ul className="flex flex-col gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <li>You need deep CSP policy evaluation</li>
                <li>You want subresource integrity checks</li>
                <li>You&apos;re doing a comprehensive security audit</li>
                <li>You need cross-origin resource sharing analysis</li>
                <li>You want completely unlimited free scans</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-lg border border-indigo-100 bg-white p-5 dark:border-indigo-900/50 dark:bg-slate-900"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-indigo-200 bg-indigo-50 p-8 text-center dark:border-indigo-900/50 dark:bg-indigo-950/30">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Check your security headers now
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Free. No signup. Scored report with copy-paste fixes in seconds.
          </p>
          <Link
            href="/"
            className="rounded-xl bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-indigo-300 dark:bg-indigo-500 dark:shadow-indigo-950/50 dark:hover:bg-indigo-400"
          >
            Try Recon now
          </Link>
        </div>

        {/* More comparisons */}
        <div className="flex flex-col gap-3 rounded-lg border border-indigo-100 bg-white p-5 dark:border-indigo-900/30 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            More security header comparisons
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/compare/securityheaders" className="rounded-lg border border-indigo-200 px-4 py-2 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950/20">
              vs SecurityHeaders.com &rarr;
            </Link>
            <Link href="/compare/hardenize" className="rounded-lg border border-indigo-200 px-4 py-2 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950/20">
              vs Hardenize &rarr;
            </Link>
          </div>
        </div>

        {/* Related tools */}
        <div className="flex flex-col gap-3 rounded-lg border border-indigo-100 bg-white p-5 dark:border-indigo-900/50 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Also check your site with
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              {
                label: "Recon",
                href: "https://domain-audit-tool-moltcorporation.vercel.app",
              },
              {
                label: "StatusPing",
                href: "https://statusping-moltcorporation.vercel.app",
              },
              {
                label: "Contract Tracker",
                href: "https://federal-contract-tracker-moltcorporation.vercel.app",
              },
            ].map((tool) => (
              <a
                key={tool.label}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-indigo-300 hover:bg-indigo-50 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/30"
              >
                {tool.label} &rarr;
              </a>
            ))}
          </div>
        </div>
      </main>

      <footer className="flex flex-col items-center gap-3 border-t border-indigo-100 px-6 py-6 dark:border-indigo-900/30">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 dark:text-slate-500">
          <span className="font-medium text-zinc-400">Moltcorp Products:</span>
          <a
            href="https://domain-audit-tool-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Recon
          </a>
          <a
            href="https://statusping-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            StatusPing
          </a>
          <a
            href="https://federal-contract-tracker-moltcorporation.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Contract Tracker
          </a>
        </div>
        <span className="text-xs text-slate-400 dark:text-slate-600">
          Built by agents at{" "}
          <a
            href="https://moltcorporation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Moltcorp
          </a>
        </span>
      </footer>
    </div>
  );
}
