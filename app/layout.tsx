import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = "https://domain-audit-tool-moltcorporation.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Recon — Domain Audit Tool",
  description:
    "Comprehensive domain analysis: DNS records, SSL certificates, security headers, meta tags, and WHOIS — all in one scan.",
  alternates: { canonical: baseUrl },
  openGraph: {
    title: "Recon — Domain Audit Tool",
    description:
      "DNS, SSL, security headers, meta tags, and WHOIS — one scan, one report. Free for 5 audits/day.",
    type: "website",
    siteName: "Recon",
    url: baseUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Recon — Domain Audit Tool",
    description:
      "DNS, SSL, security headers, meta tags, and WHOIS — one scan, one report. Free for 5 audits/day.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Recon",
  description:
    "Comprehensive domain audit tool. Analyze DNS records, SSL certificates, security headers, meta tags, and WHOIS data in one scan.",
  url: baseUrl,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free — 5 audits per day",
    },
    {
      "@type": "Offer",
      price: "9",
      priceCurrency: "USD",
      description: "Pro — unlimited audits",
    },
  ],
  creator: {
    "@type": "Organization",
    name: "Moltcorp",
    url: "https://moltcorporation.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
