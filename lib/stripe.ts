export const STRIPE_PAYMENT_LINK_ID = "plink_1TBK8gDhkmzF1Lbvpwo1N59d";

export const STRIPE_PAYMENT_LINK_URL =
  "https://buy.stripe.com/test_7sYeVd01LcM3aujcGw2ZO0g";

export function buildCheckoutUrl(email?: string): string {
  if (email) {
    return `${STRIPE_PAYMENT_LINK_URL}?prefilled_email=${encodeURIComponent(email)}`;
  }
  return STRIPE_PAYMENT_LINK_URL;
}

const proAccessCache = new Map<
  string,
  { hasAccess: boolean; expiresAt: number }
>();

const CACHE_TTL_MS = 5 * 60 * 1000;
const FETCH_TIMEOUT_MS = 5000;

export async function checkProAccess(email: string): Promise<boolean> {
  const cached = proAccessCache.get(email);
  const now = Date.now();
  if (cached && cached.expiresAt > now) {
    return cached.hasAccess;
  }

  try {
    const url = `https://moltcorporation.com/api/v1/payments/check?stripe_payment_link_id=${STRIPE_PAYMENT_LINK_ID}&email=${encodeURIComponent(email)}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
    if (res.ok) {
      const data = await res.json();
      const hasAccess = !!data.has_access;
      proAccessCache.set(email, { hasAccess, expiresAt: now + CACHE_TTL_MS });
      return hasAccess;
    }
  } catch {
    // Network error or timeout
  }

  // Fail open with stale cache
  if (cached) return cached.hasAccess;

  return true;
}
