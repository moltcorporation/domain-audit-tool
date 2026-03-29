import Link from "next/link";

const sections = [
  {
    title: "What is WHOIS?",
    body: "WHOIS is a protocol for querying databases that store registration information about domain names. When someone registers a domain, their contact information, registration date, expiration date, and name server configuration are recorded. WHOIS lets anyone look up this data. The modern replacement is RDAP (Registration Data Access Protocol), which returns structured JSON instead of plain text.",
  },
  {
    title: "What data does a WHOIS lookup return?",
    body: "A WHOIS lookup returns: the domain registrar (where it was purchased), creation date, expiration date, last updated date, name servers (DNS providers), domain status codes (like clientTransferProhibited), and registrant contact information. Since GDPR (2018), most registrars redact personal contact details for privacy — you'll typically see the registrar's privacy service instead of the owner's name and email.",
  },
  {
    title: "When to use WHOIS lookups",
    body: "Common uses include: checking if a domain is available for registration, verifying when a domain expires (for acquisition or renewal), identifying who owns a domain (for business inquiries or abuse reports), checking domain age (older domains are generally more trustworthy for SEO), verifying name server configuration, and investigating suspicious or phishing domains.",
  },
  {
    title: "WHOIS vs RDAP",
    body: "WHOIS is the legacy protocol — it returns unstructured plain text that's inconsistent between registrars. RDAP is the modern replacement standardized by the IETF. RDAP returns structured JSON, supports HTTPS, has better internationalization, and gives registrars more control over what data is exposed. Most modern lookup tools (including this one) use RDAP under the hood while still calling it 'WHOIS' because that's what people search for.",
  },
  {
    title: "Domain status codes explained",
    body: "WHOIS data includes EPP status codes that tell you the domain's state. 'clientTransferProhibited' means the registrar has locked the domain from being transferred (standard security measure). 'serverHold' means the registry has suspended the domain. 'redemptionPeriod' means the domain expired and the owner has a limited time to renew before it's deleted. 'pendingDelete' means it will be available for registration soon.",
  },
  {
    title: "Privacy and GDPR impact",
    body: "Before GDPR (2018), WHOIS showed the registrant's full name, address, phone number, and email. After GDPR, most registrars redact personal data for individuals and show generic entries like 'REDACTED FOR PRIVACY' or their privacy proxy service. Business registrations may still show organization names. If you need to contact a domain owner, most registrars provide a web form that forwards messages without revealing the owner's email.",
  },
];

const faqs = [
  {
    question: "What is a WHOIS lookup?",
    answer:
      "A WHOIS lookup queries the registration database for a domain name and returns information about who registered it, when it was registered, when it expires, which registrar manages it, and what name servers it uses. Use the Recon tool to check any domain — enter the domain name and get instant results.",
  },
  {
    question: "Is WHOIS data public?",
    answer:
      "Historically, yes — all WHOIS data was public. Since GDPR (2018), personal contact information (name, address, phone, email) is typically redacted for privacy. You can still see the registrar, registration/expiration dates, name servers, and domain status codes. Organization names may still be visible depending on the registrar's policy.",
  },
  {
    question: "How do I find out who owns a domain?",
    answer:
      "Run a WHOIS lookup on the domain. If the owner hasn't enabled privacy protection and the registrar doesn't redact data by default, you'll see the registrant's name and contact information. If the data is redacted (common post-GDPR), you can try contacting the registrar's abuse or privacy contact, or use the forwarding form most registrars provide.",
  },
  {
    question: "How do I check when a domain expires?",
    answer:
      "Run a WHOIS lookup and look for the 'Expiry Date' or 'Registry Expiry Date' field. This tells you when the current registration period ends. If the domain isn't renewed before this date, it enters a grace period, then redemption period, and eventually becomes available for anyone to register.",
  },
  {
    question: "What is domain privacy protection?",
    answer:
      "Domain privacy (or WHOIS privacy) replaces your personal contact information in the WHOIS database with the privacy service's information. Most registrars offer this for free or a small fee. It prevents spam, unwanted solicitation, and identity exposure. Since GDPR, many registrars apply privacy redaction by default for individual registrants.",
  },
  {
    question: "What is the difference between WHOIS and RDAP?",
    answer:
      "WHOIS is the older protocol that returns plain text in inconsistent formats. RDAP (Registration Data Access Protocol) is the modern replacement that returns structured JSON over HTTPS, supports better access controls, and handles internationalized domain names. Most lookup tools now use RDAP behind the scenes. The results are the same — RDAP is just a better way to retrieve them.",
  },
];

export default function WhoisGuide() {
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
    <div className="flex min-h-screen flex-col bg-[#0f0a1e] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-lg font-bold tracking-tight text-violet-400"
        >
          Recon
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/pricing"
            className="font-mono text-sm text-violet-400/60 transition-colors hover:text-violet-300"
          >
            Pricing
          </Link>
          <Link
            href="/"
            className="rounded-lg bg-violet-600 px-4 py-2 font-mono text-sm font-medium text-white transition-colors hover:bg-violet-500"
          >
            Scan your domain free
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12">
        <div className="flex flex-col gap-4">
          <p className="font-mono text-sm font-medium text-violet-400">
            Guide
          </p>
          <h1 className="font-mono text-3xl font-bold text-white sm:text-4xl">
            Recon Explained
          </h1>
          <p className="text-lg text-violet-200/50">
            WHOIS data tells you who registered a domain, when it was registered,
            when it expires, and where it&apos;s hosted. Here&apos;s what each
            field means and how to use it.
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-5">
          {sections.map((section, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 rounded-lg border border-violet-800/40 bg-violet-950/30 p-5"
            >
              <h2 className="font-mono text-lg font-semibold text-white">
                {section.title}
              </h2>
              <p className="text-sm leading-relaxed text-violet-200/50">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 rounded-lg border border-violet-700/50 bg-violet-900/20 p-8 text-center">
          <h2 className="font-mono text-2xl font-bold text-white">
            Look up any domain now
          </h2>
          <p className="max-w-md text-sm text-violet-200/50">
            Enter a domain and get instant WHOIS/RDAP data — registrar,
            registration and expiration dates, name servers, status codes, and
            contact info. Free, no signup required.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-violet-600 px-8 py-3 font-mono text-base font-medium text-white transition-colors hover:bg-violet-500"
          >
            Scan your domain free
          </Link>
        </div>

        {/* Compare tools */}
        <div className="flex flex-col gap-4">
          <h2 className="font-mono text-xl font-semibold text-white">
            Compare WHOIS lookup tools
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "DomainTools", href: "/compare/domaintools" },
              { name: "WHOIS.com", href: "/compare/whois-com" },
            ].map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="rounded-lg border border-violet-800/40 bg-violet-950/30 px-4 py-2.5 font-mono text-sm font-medium text-violet-300 transition-colors hover:border-violet-600 hover:text-violet-200"
              >
                vs {tool.name}
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-5">
          <h2 className="font-mono text-xl font-semibold text-white">
            Frequently asked questions
          </h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-lg border border-violet-800/40 bg-violet-950/30 p-5"
              >
                <h3 className="font-mono font-semibold text-white">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-violet-200/50">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="flex flex-col items-center gap-3 border-t border-violet-900/50 px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs text-violet-400/30">
          <span className="font-medium text-zinc-400">Recon — Domain Audit Tool</span>
          <span className="font-semibold text-violet-400">Recon</span>
          <a href="https://statusping-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-violet-300">StatusPing</a>
          <a href="https://federal-contract-tracker-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-violet-300">Federal Contract Tracker</a>
          <a href="https://qr-code-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-violet-300">Qdot</a>
          <a href="https://domain-audit-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-violet-300">Recon</a>
          <a href="https://domain-audit-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-violet-300">Recon</a>
          <a href="https://domain-audit-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-violet-300">Recon</a>
          <a href="https://domain-audit-tool-moltcorporation.vercel.app" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-violet-300">Recon</a>
        </div>
        <p className="font-mono text-xs text-violet-400/20">
          Built by agents at{" "}
          <a href="https://moltcorporation.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-violet-300">Moltcorp</a>
        </p>
      </footer>
    </div>
  );
}
