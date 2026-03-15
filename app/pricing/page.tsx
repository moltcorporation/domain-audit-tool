import type { Metadata } from "next";
import { STRIPE_PAYMENT_LINK_URL } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Pricing — Recon",
  description: "Free and Pro plans for Recon domain audits. Unlimited scans for $9/mo.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <a href="/" className="text-sm text-zinc-500 hover:text-zinc-300 mb-4 inline-block">&larr; Back to Recon</a>
          <h1 className="text-3xl font-bold tracking-tight mb-3">Simple pricing</h1>
          <p className="text-zinc-400">Start free. Upgrade when you need more.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Free */}
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
            <h2 className="text-lg font-semibold mb-1">Free</h2>
            <div className="text-3xl font-bold mb-1">$0</div>
            <p className="text-zinc-500 text-sm mb-6">Forever</p>
            <ul className="space-y-3 text-sm text-zinc-300 mb-8">
              <li className="flex gap-2"><span className="text-zinc-500">&#10003;</span> 5 audits per day</li>
              <li className="flex gap-2"><span className="text-zinc-500">&#10003;</span> All 5 check types</li>
              <li className="flex gap-2"><span className="text-zinc-500">&#10003;</span> Shareable report URLs</li>
              <li className="flex gap-2"><span className="text-zinc-500">&#10003;</span> Health score</li>
            </ul>
            <a
              href="/"
              className="block text-center py-2.5 px-4 border border-zinc-700 rounded-lg text-sm text-zinc-300 hover:border-zinc-500 transition-colors"
            >
              Start scanning
            </a>
          </div>

          {/* Pro */}
          <div className="p-6 bg-zinc-900 border border-emerald-500/30 rounded-xl relative">
            <div className="absolute -top-3 left-6 px-3 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/30">
              Pro
            </div>
            <h2 className="text-lg font-semibold mb-1">Pro</h2>
            <div className="text-3xl font-bold mb-1">$9<span className="text-lg font-normal text-zinc-500">/mo</span></div>
            <p className="text-zinc-500 text-sm mb-6">Cancel anytime</p>
            <ul className="space-y-3 text-sm text-zinc-300 mb-8">
              <li className="flex gap-2"><span className="text-emerald-400">&#10003;</span> Unlimited audits</li>
              <li className="flex gap-2"><span className="text-emerald-400">&#10003;</span> All 5 check types</li>
              <li className="flex gap-2"><span className="text-emerald-400">&#10003;</span> Shareable report URLs</li>
              <li className="flex gap-2"><span className="text-emerald-400">&#10003;</span> Health score</li>
              <li className="flex gap-2"><span className="text-emerald-400">&#10003;</span> Priority support</li>
            </ul>
            <a
              href={STRIPE_PAYMENT_LINK_URL}
              className="block text-center py-2.5 px-4 bg-emerald-600 rounded-lg text-sm text-white font-medium hover:bg-emerald-500 transition-colors"
            >
              Upgrade to Pro
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
