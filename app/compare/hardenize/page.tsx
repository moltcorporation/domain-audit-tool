import type { Metadata } from "next";
import Link from "next/link";

const baseUrl = "https://domain-audit-tool-moltcorporation.vercel.app";

export const metadata: Metadata = {
  title: "Hardenize Alternative — Free Domain Audits | Recon",
  description:
    "Hardenize charges enterprise pricing ($100+/mo). Recon runs DNS, SSL, security headers, meta tags, and WHOIS in one scan for free. Pro at $9/mo.",
  alternates: {
    canonical: `${baseUrl}/compare/hardenize`,
  },
  openGraph: {
    title: "Hardenize Alternative — Recon",
    description:
      "5 domain checks in one scan. Hardenize is enterprise-priced — Recon is free or $9/mo.",
    type: "website",
    siteName: "Recon",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hardenize Alternative — Recon",
    description:
      "Free domain audits. Hardenize charges $100+/mo — Recon Pro is $9/mo.",
  },
};

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
    feature: "Scope",
    ours: "DNS + SSL + headers + meta tags + WHOIS in one scan",
    competitor: "Broad — covers email, DNS, HTTP, certificates",
  },
  {
    feature: "Fix suggestions",
    ours: "Copy-paste fix code for every issue",
    competitor: "General guidance, no inline fixes",
  },
  {
    feature: "Scoring",
    ours: "Numeric score out of 100 with pass/warn/fail per header",
    competitor: "Pass/warning/fail per category, no overall score",
  },
  {
    feature: "Speed",
    ours: "Instant results — under 3 seconds",
    competitor: "Full scan takes 30–60 seconds",
  },
  {
    feature: "Cookie analysis",
    ours: "Checks Secure, HttpOnly, and SameSite on every cookie",
    competitor: "Basic cookie checks within broader scan",
  },
  {
    feature: "Info disclosure",
    ours: "Detects Server, X-Powered-By, and tech stack leaks",
    competitor: "Limited info disclosure detection",
  },
  {
    feature: "Shareable reports",
    ours: "Permanent URL for every scan result",
    competitor: "Reports behind account login",
  },
  {
    feature: "Free tier",
    ours: "Free with rate limits, no signup",
    competitor: "Free tier with account required",
  },
  {
    feature: "Paid plans",
    ours: "$9/mo for unlimited scans",
    competitor: "Enterprise pricing (custom quotes)",
  },
  {
    feature: "Target audience",
    ours: "Developers fixing header issues quickly",
    competitor: "Enterprise security teams running full audits",
  },
  {
    feature: "Ecosystem",
    ours: "Part of Moltcorp products (SSL, DNS, Meta, Uptime, WHOIS)",
    competitor: "Standalone platform",
  },
];

const faqs = [
  {
    question: "Is Recon really free?",
    answer:
      "Yes. You can scan any website for free with no signup. Free users have a rate limit on scans. If you need unlimited scans, the Pro tier is $9/month.",
  },
  {
    question: "How does Recon compare to Hardenize for security headers?",
    answer:
      "Hardenize runs a comprehensive scan covering email, DNS, certificates, and HTTP in one report. Recon focuses specifically on HTTP security headers and gives you a numeric score plus copy-paste fix code for every issue. If you need a broad audit, Hardenize is thorough. If you want to fix your headers fast, Recon is more actionable.",
  },
  {
    question: "Does Hardenize have features Recon doesn't?",
    answer:
      "Yes. Hardenize covers email security (SPF, DKIM, DMARC), certificate transparency monitoring, DNS configuration, and scheduled rescans. It's designed for enterprise security teams running comprehensive audits. Recon intentionally focuses on headers to give deeper, more actionable results in that specific area.",
  },
  {
    question: "Can I use both tools together?",
    answer:
      "Absolutely. Many developers use Hardenize for a broad security overview and Recon specifically for fixing header issues. The tools complement each other — Hardenize identifies the problem areas, Recon gives you the fix code.",
  },
  {
    question: "Do I need an account to use Recon?",
    answer:
      "No. Just paste your URL and get your report. Hardenize requires account creation even for free scans. Recon has zero friction — scan instantly, share the report URL with your team.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Hardenize Alternative — Recon",
    description:
      "Hardenize covers everything but buries header details. Recon gives you a focused security header score with copy-paste fix code.",
    url: "https://domain-audit-tool-moltcorporation.vercel.app/compare/hardenize",
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

export default function HardenizeComparison() {
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
            Hardenize Alternative
            <span className="block text-indigo-600 dark:text-indigo-400">
              Focused Security Header Checker
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-slate-600 dark:text-slate-400">
            Hardenize runs a comprehensive scan across email, DNS, and HTTP —
            but if you just need to{" "}
            <strong className="text-slate-900 dark:text-white">
              fix your security headers fast
            </strong>
            , Recon gives you a score and copy-paste fixes in under 3
            seconds.
          </p>
        </div>

        {/* Key differentiator callout */}
        <div className="flex flex-col gap-4 rounded-xl border border-indigo-200 bg-indigo-50/60 p-6 dark:border-indigo-900/50 dark:bg-indigo-950/30">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            When broad coverage works against you
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Hardenize is an excellent tool for enterprise security teams who need
            a full-spectrum audit — email authentication, certificate
            transparency, DNS configuration, and HTTP headers all in one report.
            It&apos;s trusted by large organizations for a reason.
          </p>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            But that breadth comes at a cost: security header details get buried
            in a massive report. If a developer just needs to know which headers
            are missing and what to set them to, they have to dig through email
            and DNS sections to find the relevant information.
          </p>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Recon focuses entirely on HTTP security headers. Every issue
            comes with a ready-to-use header value you can copy into your{" "}
            <code className="rounded bg-indigo-100 px-1.5 py-0.5 text-xs font-mono text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
              next.config.js
            </code>
            ,{" "}
            <code className="rounded bg-indigo-100 px-1.5 py-0.5 text-xs font-mono text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
              nginx.conf
            </code>
            , or{" "}
            <code className="rounded bg-indigo-100 px-1.5 py-0.5 text-xs font-mono text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
              .htaccess
            </code>
            . No digging, no context-switching.
          </p>
        </div>

        {/* Comparison table */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Recon vs Hardenize
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
                    Hardenize
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
                      {row.ours}
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

        {/* When Hardenize is better */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            When Hardenize is the better choice
          </h2>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex gap-2">
              <span className="shrink-0 text-slate-400">&bull;</span>
              <span>
                You need a comprehensive security audit covering email (SPF,
                DKIM, DMARC), certificates, DNS, and HTTP in a single report.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-slate-400">&bull;</span>
              <span>
                You&apos;re an enterprise security team that needs scheduled
                rescans and monitoring over time.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-slate-400">&bull;</span>
              <span>
                You need certificate transparency monitoring and alerting for
                mis-issued certificates.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-slate-400">&bull;</span>
              <span>
                You manage many domains and need organization-level dashboards
                with compliance tracking.
              </span>
            </li>
          </ul>
        </div>

        {/* When Recon is better */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            When Recon is the better choice
          </h2>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex gap-2">
              <span className="shrink-0 text-slate-400">&bull;</span>
              <span>
                You want to check and fix your HTTP security headers specifically
                — not run a full infrastructure audit.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-slate-400">&bull;</span>
              <span>
                You want instant results with no account creation. Paste a URL,
                get a scored report in seconds.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-slate-400">&bull;</span>
              <span>
                You need copy-paste fix code you can drop directly into your
                server configuration.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-slate-400">&bull;</span>
              <span>
                You want a shareable report URL you can send to your team or
                include in a PR.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-slate-400">&bull;</span>
              <span>
                Budget matters — Recon Pro is $9/month vs Hardenize&apos;s
                enterprise-level pricing.
              </span>
            </li>
          </ul>
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
            Ready to fix your security headers?
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

        {/* Cross-links */}
        <div className="flex flex-col gap-3 text-sm text-slate-500 dark:text-slate-400">
          <p className="font-medium text-slate-700 dark:text-slate-300">
            More comparisons
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/compare/securityheaders"
              className="hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              vs SecurityHeaders.com
            </Link>
            <Link
              href="/compare/mozilla-observatory"
              className="hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              vs Mozilla Observatory
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
