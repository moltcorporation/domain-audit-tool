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
    competitor: "Grade only \u2014 no inline fixes",
  },
  {
    feature: "Scoring",
    headerguard: "Numeric score out of 100 with pass/warn/fail per header",
    competitor: "Letter grade (A-F) with basic pass/fail",
  },
  {
    feature: "Report UI",
    headerguard: "Modern, clean interface with dark mode",
    competitor: "Basic text output",
  },
  {
    feature: "Cookie analysis",
    headerguard: "Checks Secure, HttpOnly, and SameSite on every cookie",
    competitor: "No cookie analysis",
  },
  {
    feature: "Info disclosure",
    headerguard: "Detects Server, X-Powered-By, and tech stack leaks",
    competitor: "Limited info disclosure checks",
  },
  {
    feature: "Shareable reports",
    headerguard: "Permanent URL for every scan result",
    competitor: "No shareable reports",
  },
  {
    feature: "Free tier",
    headerguard: "Free with rate limits",
    competitor: "Free",
  },
  {
    feature: "Pro tier",
    headerguard: "Unlimited scans and batch checking",
    competitor: "No paid tier or advanced features",
  },
  {
    feature: "Development",
    headerguard: "Actively developed by the Moltcorp team",
    competitor: "Solo project by Scott Helme",
  },
  {
    feature: "Ecosystem",
    headerguard: "Part of Moltcorp products (SSL, DNS, Meta, Uptime, WHOIS)",
    competitor: "Standalone tool",
  },
];

const faqs = [
  {
    question: "Is Recon really free?",
    answer:
      "Yes. You can scan any website for free with no signup. Free users have a rate limit on scans. If you need unlimited scans or batch checking, we offer a Pro tier.",
  },
  {
    question:
      "What does Recon check that SecurityHeaders.com does not?",
    answer:
      "Recon analyzes cookie security (Secure, HttpOnly, SameSite flags), detects information disclosure headers (Server, X-Powered-By), gives you a numeric score out of 100, and provides copy-paste fix code for every issue found. SecurityHeaders.com gives a letter grade and links to external docs.",
  },
  {
    question: "Can I share my Recon report with my team?",
    answer:
      "Yes. Every scan generates a permanent URL you can share. SecurityHeaders.com does not offer shareable reports.",
  },
  {
    question:
      "Do I need to migrate from SecurityHeaders.com to use Recon?",
    answer:
      "There is nothing to migrate. Just enter your URL on Recon and get your report. You can use both tools side by side if you want a second opinion.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "SecurityHeaders.com Alternative \u2014 Recon",
    description:
      "SecurityHeaders.com gives you a grade but no fixes. Recon gives you a score out of 100 with copy-paste fix code for every header.",
    url: "https://domain-audit-tool-moltcorporation.vercel.app/compare/securityheaders",
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Recon",
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

export default function SecurityHeadersComparison() {
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
            SecurityHeaders.com Alternative
            <span className="block text-indigo-600 dark:text-indigo-400">
              Better Scoring &amp; Fix Suggestions
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-slate-600 dark:text-slate-400">
            SecurityHeaders.com gives you a grade. Recon gives you a score
            out of 100{" "}
            <strong className="text-slate-900 dark:text-white">
              plus copy-paste fix code
            </strong>{" "}
            for every header issue. Free, modern, and actionable.
          </p>
        </div>

        {/* Key differentiator callout */}
        <div className="flex flex-col gap-4 rounded-xl border border-indigo-200 bg-indigo-50/60 p-6 dark:border-indigo-900/50 dark:bg-indigo-950/30">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            The problem with SecurityHeaders.com
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            SecurityHeaders.com by Scott Helme is a well-known tool that assigns
            a letter grade (A+ to F) based on which HTTP security headers your
            site sends. It is useful for a quick pass/fail check, but it stops
            there. You see that your{" "}
            <code className="rounded bg-indigo-100 px-1.5 py-0.5 text-xs font-mono text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
              Content-Security-Policy
            </code>{" "}
            is missing, but you get no guidance on what value to set. You have to
            leave the tool, search for documentation, and figure it out on your
            own.
          </p>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Recon solves this. Every issue in your report includes a
            ready-to-use header value you can copy and paste into your server
            config,{" "}
            <code className="rounded bg-indigo-100 px-1.5 py-0.5 text-xs font-mono text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
              next.config.js
            </code>
            , or{" "}
            <code className="rounded bg-indigo-100 px-1.5 py-0.5 text-xs font-mono text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
              .htaccess
            </code>
            . No guessing, no context-switching.
          </p>
        </div>

        {/* Comparison table */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Recon vs SecurityHeaders.com
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
                    SecurityHeaders.com
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

        {/* What Recon scans */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            What Recon scans
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Security Headers",
                desc: "HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, COOP.",
              },
              {
                title: "Information Disclosure",
                desc: "Server version, X-Powered-By, and other headers that leak your tech stack to attackers.",
              },
              {
                title: "Cookie Security",
                desc: "Checks Secure, HttpOnly, and SameSite flags on every cookie in the response.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-2 rounded-lg border border-indigo-100 bg-indigo-50/50 p-5 dark:border-indigo-900/50 dark:bg-indigo-950/30"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How to use */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            How to check your security headers
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Enter your URL",
                desc: "Paste any website URL into Recon.",
              },
              {
                step: "2",
                title: "Get your scored report",
                desc: "See pass/warn/fail for each header with a score out of 100.",
              },
              {
                step: "3",
                title: "Copy fixes and deploy",
                desc: "Use the provided fix code, deploy, and scan again to verify.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="flex flex-col gap-2 rounded-lg border border-indigo-100 bg-white p-5 dark:border-indigo-900/50 dark:bg-slate-900"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white shadow-md shadow-indigo-200 dark:bg-indigo-500 dark:shadow-indigo-950/50">
                  {s.step}
                </span>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {s.desc}
                </p>
              </div>
            ))}
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
            Ready to scan your security headers?
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Free. No signup. Scored report with copy-paste fixes.
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
            <Link href="/compare/mozilla-observatory" className="rounded-lg border border-indigo-200 px-4 py-2 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950/20">
              vs Mozilla Observatory &rarr;
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
