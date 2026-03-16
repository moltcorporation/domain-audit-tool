import Link from "next/link";

const steps = [
  {
    title: "Check your certificate expiration date",
    body: "Expired SSL certificates are the #1 cause of browser security warnings. When your certificate expires, every visitor sees a scary 'Your connection is not private' page — and most leave immediately. Check your expiration date and set a reminder to renew at least 2 weeks before it expires. If you use Let's Encrypt, certificates expire every 90 days (auto-renewal should be configured).",
  },
  {
    title: "Verify your certificate chain",
    body: "Your SSL certificate doesn't work alone — it's part of a chain that connects your certificate to a trusted root certificate authority (CA). If an intermediate certificate is missing, some browsers and devices will show security errors even though your certificate itself is valid. Use an SSL checker to verify the complete chain from your certificate through intermediates to the root CA.",
  },
  {
    title: "Check which protocols are supported",
    body: "TLS 1.2 and TLS 1.3 are the current standards. If your server still supports TLS 1.0 or TLS 1.1, it's vulnerable to known attacks and many compliance frameworks (PCI DSS, HIPAA) require you to disable them. TLS 1.3 is the fastest and most secure — enable it if your server supports it. Disable SSL 3.0, TLS 1.0, and TLS 1.1.",
  },
  {
    title: "Confirm the certificate matches your domain",
    body: "Your SSL certificate must match the exact domain visitors use. A certificate for example.com won't work on www.example.com unless it includes both names (via Subject Alternative Names or a wildcard). Check that your certificate covers all the domains and subdomains you serve traffic on. Mismatches cause browser warnings.",
  },
  {
    title: "Look for weak cryptographic configurations",
    body: "Check your key size — RSA keys should be at least 2048 bits (4096 is better). If you use ECDSA, 256 bits is the minimum. Also check your cipher suites: disable any that use DES, 3DES, RC4, or MD5. Modern configurations should prefer ECDHE key exchange and AES-GCM ciphers. Your SSL checker report will flag weak configurations.",
  },
  {
    title: "Set up expiration monitoring",
    body: "Don't rely on remembering to check manually. Set up automated monitoring that alerts you when your certificate is approaching expiration. Many outages happen because auto-renewal failed silently and nobody checked until visitors started seeing errors. StatusPing can monitor your HTTPS endpoints and alert you to certificate issues.",
  },
];

const faqs = [
  {
    question: "How do I check my SSL certificate?",
    answer:
      "Enter your domain in the Recon and get an instant report showing your certificate's expiration date, issuer, chain validity, protocol support, and key strength. You can also check in your browser by clicking the lock icon in the address bar, or use the command line: openssl s_client -connect yourdomain.com:443",
  },
  {
    question: "How often should I check my SSL certificate?",
    answer:
      "At minimum, check monthly and set up automated monitoring. If you use Let's Encrypt (90-day certificates), check that auto-renewal is working. For paid certificates (1-year), set a calendar reminder 30 days before expiration. The best approach is automated monitoring that alerts you to issues before they affect users.",
  },
  {
    question: "What happens when an SSL certificate expires?",
    answer:
      "Browsers display a full-page security warning like 'Your connection is not private' or 'NET::ERR_CERT_DATE_INVALID'. Most visitors will leave immediately. Search engines may also flag your site. The fix is straightforward — renew or replace the certificate — but the downtime and trust damage can be significant.",
  },
  {
    question: "What is an SSL certificate chain?",
    answer:
      "An SSL certificate chain (or chain of trust) connects your server's certificate to a trusted root Certificate Authority (CA). It typically includes three certificates: your server certificate, one or more intermediate certificates from the CA, and the root certificate (pre-installed in browsers). If an intermediate is missing, some browsers can't verify the chain and show errors.",
  },
  {
    question: "Is SSL the same as TLS?",
    answer:
      "Technically, SSL (Secure Sockets Layer) is the predecessor of TLS (Transport Layer Security). SSL 3.0 was the last SSL version before TLS 1.0 replaced it. Today, all 'SSL certificates' actually use TLS. The term 'SSL' persists in common usage, but the protocol running on modern servers is TLS 1.2 or TLS 1.3.",
  },
  {
    question: "Do I need a paid SSL certificate?",
    answer:
      "For most websites, no. Free certificates from Let's Encrypt provide the same encryption strength as paid certificates. Paid certificates (from DigiCert, Comodo, etc.) offer extended validation (EV), which shows your organization name in some browsers, and come with warranties and dedicated support. For most developers and small businesses, Let's Encrypt is sufficient.",
  },
];

export default function SslCertificateGuide() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Check Your SSL Certificate",
    description:
      "Step-by-step guide to checking SSL certificate expiration, chain validity, protocol support, and cryptographic strength.",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body,
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
    <div className="flex min-h-screen flex-col bg-emerald-50/30 font-sans dark:bg-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="flex items-center justify-between border-b border-emerald-100 px-6 py-4 dark:border-gray-800">
        <Link href="/" className="flex items-center gap-2">
          <svg viewBox="0 0 64 64" fill="none" className="h-6 w-6 text-emerald-600 dark:text-emerald-400" aria-hidden="true">
            <rect x="16" y="28" width="32" height="28" rx="4" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
            <path d="M22 28V20a10 10 0 0120 0v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="32" cy="42" r="4" fill="currentColor" />
            <path d="M32 46v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            Recon
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/pricing"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
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
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            Guide
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            How to Check Your
            <span className="block text-emerald-600 dark:text-emerald-400">
              SSL Certificate
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            An expired or misconfigured SSL certificate means security warnings,
            lost visitors, and broken trust. Here&apos;s how to check your
            certificate&apos;s health and catch issues before they affect your
            users.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-5">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex gap-4 rounded-lg border border-emerald-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                {i + 1}
              </div>
              <div className="flex flex-col gap-1.5">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h2>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-xl border border-emerald-200 bg-emerald-50/60 p-8 text-center dark:border-emerald-900/30 dark:bg-emerald-950/20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Check your SSL certificate now
          </h2>
          <p className="max-w-md text-sm text-gray-600 dark:text-gray-400">
            Enter your domain and get an instant report — expiration date,
            issuer, chain status, protocol support, and key strength. Free, no
            signup required.
          </p>
          <Link
            href="/"
            className="rounded-xl bg-emerald-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700 hover:shadow-emerald-300 dark:bg-emerald-500 dark:shadow-emerald-950/50 dark:hover:bg-emerald-400"
          >
            Scan your domain free
          </Link>
        </div>

        {/* Compare tools */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Compare SSL checking tools
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "SSL Labs", href: "/compare/ssl-labs" },
              { name: "DigiCert", href: "/compare/digicert" },
            ].map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="rounded-lg border border-emerald-100 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-emerald-300 hover:text-emerald-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-emerald-600 dark:hover:text-emerald-400"
              >
                vs {tool.name}
              </Link>
            ))}
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
                className="rounded-lg border border-emerald-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
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
      </main>

      <footer className="flex flex-col items-center gap-3 border-t border-emerald-100 px-6 py-6 dark:border-gray-800">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400 dark:text-gray-500">
          <span className="font-medium text-zinc-400">Recon — Domain Audit Tool</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            Recon
          </span>
          <a href="https://statusping-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">StatusPing</a>
          <a href="https://federal-contract-tracker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">Federal Contract Tracker</a>
          <a href="https://domain-audit-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">Recon</a>
          <a href="https://domain-audit-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">Recon</a>
          <a href="https://domain-audit-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">Recon</a>
          <a href="https://domain-audit-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">Recon</a>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-600">
          Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">Moltcorp</a>
        </p>
      </footer>
    </div>
  );
}
