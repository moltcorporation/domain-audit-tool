import Link from "next/link";

const headers = [
  {
    name: "Content-Security-Policy (CSP)",
    severity: "critical",
    what: "Controls which resources (scripts, styles, images, fonts) the browser is allowed to load on your page. Prevents cross-site scripting (XSS) by blocking inline scripts and unauthorized external resources.",
    example: "Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'",
    tip: "Start with a report-only policy (Content-Security-Policy-Report-Only) to see what would break before enforcing it.",
  },
  {
    name: "Strict-Transport-Security (HSTS)",
    severity: "critical",
    what: "Tells browsers to always use HTTPS for your domain. After the first visit, the browser will refuse to connect over plain HTTP — even if a user types http:// or clicks an HTTP link. Prevents SSL stripping attacks.",
    example: "Strict-Transport-Security: max-age=31536000; includeSubDomains; preload",
    tip: "Start with a short max-age (e.g., 300 seconds) and increase it once you confirm HTTPS works everywhere, including subdomains.",
  },
  {
    name: "X-Content-Type-Options",
    severity: "high",
    what: "Prevents the browser from guessing (MIME-sniffing) the content type of a response. Without this header, a browser might treat a text file as JavaScript, opening an XSS vector.",
    example: "X-Content-Type-Options: nosniff",
    tip: "This is a one-liner with no configuration. There is no reason not to add it to every response.",
  },
  {
    name: "X-Frame-Options",
    severity: "high",
    what: "Controls whether your site can be embedded in an iframe on another site. Prevents clickjacking attacks where an attacker overlays invisible iframes to trick users into clicking things they didn't intend to.",
    example: "X-Frame-Options: DENY",
    tip: "Use DENY if your site should never be iframed. Use SAMEORIGIN if you need iframes within your own domain (e.g., for embedded widgets).",
  },
  {
    name: "Referrer-Policy",
    severity: "medium",
    what: "Controls how much referrer information is sent when users navigate away from your site. Prevents leaking sensitive URLs (with tokens, session IDs, or private paths) to third-party sites.",
    example: "Referrer-Policy: strict-origin-when-cross-origin",
    tip: "strict-origin-when-cross-origin is the best default — it sends the origin (domain) to other sites but keeps the full path private.",
  },
  {
    name: "Permissions-Policy",
    severity: "medium",
    what: "Controls which browser features (camera, microphone, geolocation, payment) your site and embedded iframes can use. Limits the damage if third-party scripts are compromised.",
    example: "Permissions-Policy: camera=(), microphone=(), geolocation=()",
    tip: "Disable all features you don't use. The () syntax means 'no one can use this feature, not even your own page.'",
  },
];

const faqs = [
  {
    question: "What are HTTP security headers?",
    answer:
      "HTTP security headers are instructions your web server sends to the browser along with your page content. They tell the browser how to behave — what resources to load, whether to allow iframes, whether to enforce HTTPS, and more. They're your first line of defense against common web attacks like XSS, clickjacking, and MIME sniffing.",
  },
  {
    question: "How do I check my security headers?",
    answer:
      "Use Recon — enter your URL and get an instant scored report showing which security headers are present, missing, or misconfigured. You'll see a numeric score out of 100, pass/warn/fail for each header, and copy-paste fix code for every issue. No signup required.",
  },
  {
    question: "Which security headers should I add first?",
    answer:
      "Start with the easiest wins: X-Content-Type-Options: nosniff (one line, no config), Strict-Transport-Security (if you're already on HTTPS), and X-Frame-Options: DENY (unless you need iframes). Then add Referrer-Policy and Permissions-Policy. Save Content-Security-Policy for last — it's the most powerful but also the most likely to break things if misconfigured.",
  },
  {
    question: "Do security headers affect SEO?",
    answer:
      "Not directly — Google doesn't use security headers as a ranking factor. However, HTTPS is a ranking signal, and HSTS ensures browsers always use HTTPS. More importantly, a security breach (defacement, malware injection) can devastate your SEO. Security headers are cheap insurance.",
  },
  {
    question: "Where do I add security headers?",
    answer:
      "Security headers are set on your web server or hosting platform. In Nginx, add them to your server block with add_header directives. In Apache, use Header set in .htaccess. On Vercel, use vercel.json headers config. On Netlify, use _headers file. On Cloudflare, use Transform Rules or Workers. Recon provides copy-paste code for each platform.",
  },
  {
    question: "Can security headers break my site?",
    answer:
      "Most security headers are safe to add with no side effects. The exception is Content-Security-Policy (CSP), which can block legitimate scripts, styles, or resources if configured too strictly. Always test CSP in report-only mode first. The other headers (HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy) rarely cause issues.",
  },
];

export default function SecurityHeadersGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Add HTTP Security Headers to Your Website",
    description:
      "Step-by-step guide to understanding and implementing HTTP security headers, including CSP, HSTS, X-Frame-Options, and more.",
    step: headers.map((h, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: `Add ${h.name}`,
      text: h.what,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans dark:bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
        <Link href="/" className="flex items-center gap-2">
          <svg
            viewBox="0 0 64 64"
            fill="none"
            className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
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
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            Recon
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/pricing"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
          >
            Pricing
          </Link>
          <Link
            href="/"
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-indigo-300 dark:bg-indigo-500 dark:shadow-indigo-950/50 dark:hover:bg-indigo-400"
          >
            Check your headers free
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            Guide
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            HTTP Security Headers
            <span className="block text-indigo-600 dark:text-indigo-400">
              Explained
            </span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Security headers are one of the easiest ways to protect your website
            against common attacks. Most take one line of configuration and cost
            nothing. Here&apos;s what each header does, why it matters, and how
            to add it.
          </p>
        </div>

        {/* Headers */}
        <div className="flex flex-col gap-5">
          {headers.map((header, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                  {i + 1}
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {header.name}
                </h2>
                <span
                  className={`ml-auto rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    header.severity === "critical"
                      ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      : header.severity === "high"
                        ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                  }`}
                >
                  {header.severity}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {header.what}
              </p>
              <code className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-mono text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {header.example}
              </code>
              <p className="text-xs text-indigo-600 dark:text-indigo-400">
                Tip: {header.tip}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-indigo-200 bg-indigo-50/60 p-8 text-center dark:border-indigo-900/50 dark:bg-indigo-950/30">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Check your security headers now
          </h2>
          <p className="max-w-md text-sm text-slate-600 dark:text-slate-400">
            Enter your URL and get an instant scored report. See which headers
            are missing, which are misconfigured, and get copy-paste fix code
            for every issue. Free — no signup required.
          </p>
          <Link
            href="/"
            className="rounded-xl bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-indigo-300 dark:bg-indigo-500 dark:shadow-indigo-950/50 dark:hover:bg-indigo-400"
          >
            Check your headers free
          </Link>
        </div>

        {/* Compare tools */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Compare security header checkers
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "SecurityHeaders.com", href: "/compare/securityheaders" },
              { name: "Mozilla Observatory", href: "/compare/mozilla-observatory" },
              { name: "Hardenize", href: "/compare/hardenize" },
            ].map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-indigo-300 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-600 dark:hover:text-indigo-400"
              >
                vs {tool.name}
              </Link>
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
                className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
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
      </main>

      <footer className="flex flex-col items-center gap-3 border-t border-slate-200 px-6 py-6 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 dark:text-slate-500">
          <span className="font-medium text-zinc-400">Recon — Domain Audit Tool</span>
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            Recon
          </span>
          <a href="https://statusping-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">StatusPing</a>
          <a href="https://federal-contract-tracker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">Federal Contract Tracker</a>
          <a href="https://domain-audit-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">Recon</a>
          <a href="https://domain-audit-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">Recon</a>
          <a href="https://domain-audit-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">Recon</a>
          <a href="https://domain-audit-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">Recon</a>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-600">
          Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">Moltcorp</a>
        </p>
      </footer>
    </div>
  );
}
