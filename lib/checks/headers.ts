export interface RuleResult {
  id: string;
  category: string;
  header: string;
  status: "pass" | "warn" | "fail";
  message: string;
  fix?: string;
  points: number;
  maxPoints: number;
}

export interface CategoryResult {
  category: string;
  label: string;
  earned: number;
  possible: number;
  rules: RuleResult[];
}

export interface ScoringResult {
  score: number;
  categories: CategoryResult[];
  passCount: number;
  warnCount: number;
  failCount: number;
}

type Headers = Record<string, string>;

function getHeader(headers: Headers, name: string): string | undefined {
  const lower = name.toLowerCase();
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === lower) return value;
  }
  return undefined;
}

function hasHeader(headers: Headers, name: string): boolean {
  return getHeader(headers, name) !== undefined;
}

export function scoreHeaders(headers: Headers): ScoringResult {
  const rules: RuleResult[] = [];

  // === Security Headers (60 pts) ===

  // HSTS (15 pts)
  const hsts = getHeader(headers, "strict-transport-security");
  if (hsts) {
    const maxAgeMatch = hsts.match(/max-age=(\d+)/);
    const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1]) : 0;
    if (maxAge >= 31536000) {
      rules.push({
        id: "hsts",
        category: "security",
        header: "Strict-Transport-Security",
        status: "pass",
        message: `HSTS enabled with max-age=${maxAge}`,
        points: 15,
        maxPoints: 15,
      });
    } else {
      rules.push({
        id: "hsts",
        category: "security",
        header: "Strict-Transport-Security",
        status: "warn",
        message: `HSTS max-age is ${maxAge} — should be at least 31536000 (1 year)`,
        fix: "Strict-Transport-Security: max-age=31536000; includeSubDomains",
        points: 8,
        maxPoints: 15,
      });
    }
  } else {
    rules.push({
      id: "hsts",
      category: "security",
      header: "Strict-Transport-Security",
      status: "fail",
      message: "Missing HSTS header — browsers won't enforce HTTPS",
      fix: "Strict-Transport-Security: max-age=31536000; includeSubDomains",
      points: 0,
      maxPoints: 15,
    });
  }

  // CSP (15 pts)
  const csp = getHeader(headers, "content-security-policy");
  if (csp) {
    const hasUnsafe =
      csp.includes("unsafe-inline") || csp.includes("unsafe-eval");
    if (hasUnsafe) {
      rules.push({
        id: "csp",
        category: "security",
        header: "Content-Security-Policy",
        status: "warn",
        message: "CSP present but uses unsafe-inline or unsafe-eval",
        fix: "Remove 'unsafe-inline' and 'unsafe-eval' from your CSP. Use nonces or hashes instead.",
        points: 8,
        maxPoints: 15,
      });
    } else {
      rules.push({
        id: "csp",
        category: "security",
        header: "Content-Security-Policy",
        status: "pass",
        message: "Content-Security-Policy is set",
        points: 15,
        maxPoints: 15,
      });
    }
  } else {
    rules.push({
      id: "csp",
      category: "security",
      header: "Content-Security-Policy",
      status: "fail",
      message: "Missing CSP — no protection against XSS and injection attacks",
      fix: "Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'",
      points: 0,
      maxPoints: 15,
    });
  }

  // X-Content-Type-Options (5 pts)
  const xcto = getHeader(headers, "x-content-type-options");
  if (xcto?.toLowerCase() === "nosniff") {
    rules.push({
      id: "xcto",
      category: "security",
      header: "X-Content-Type-Options",
      status: "pass",
      message: "X-Content-Type-Options: nosniff is set",
      points: 5,
      maxPoints: 5,
    });
  } else {
    rules.push({
      id: "xcto",
      category: "security",
      header: "X-Content-Type-Options",
      status: "fail",
      message: "Missing X-Content-Type-Options — browsers may MIME-sniff responses",
      fix: "X-Content-Type-Options: nosniff",
      points: 0,
      maxPoints: 5,
    });
  }

  // X-Frame-Options (5 pts)
  const xfo = getHeader(headers, "x-frame-options");
  if (xfo) {
    const val = xfo.toUpperCase();
    if (val === "DENY" || val === "SAMEORIGIN") {
      rules.push({
        id: "xfo",
        category: "security",
        header: "X-Frame-Options",
        status: "pass",
        message: `X-Frame-Options: ${val}`,
        points: 5,
        maxPoints: 5,
      });
    } else {
      rules.push({
        id: "xfo",
        category: "security",
        header: "X-Frame-Options",
        status: "warn",
        message: `X-Frame-Options is "${xfo}" — use DENY or SAMEORIGIN`,
        fix: "X-Frame-Options: DENY",
        points: 3,
        maxPoints: 5,
      });
    }
  } else {
    rules.push({
      id: "xfo",
      category: "security",
      header: "X-Frame-Options",
      status: "fail",
      message: "Missing X-Frame-Options — page can be embedded in iframes (clickjacking risk)",
      fix: "X-Frame-Options: DENY",
      points: 0,
      maxPoints: 5,
    });
  }

  // Referrer-Policy (5 pts)
  const rp = getHeader(headers, "referrer-policy");
  if (rp) {
    rules.push({
      id: "referrer",
      category: "security",
      header: "Referrer-Policy",
      status: "pass",
      message: `Referrer-Policy: ${rp}`,
      points: 5,
      maxPoints: 5,
    });
  } else {
    rules.push({
      id: "referrer",
      category: "security",
      header: "Referrer-Policy",
      status: "fail",
      message: "Missing Referrer-Policy — full URL may leak in referrer headers",
      fix: "Referrer-Policy: strict-origin-when-cross-origin",
      points: 0,
      maxPoints: 5,
    });
  }

  // Permissions-Policy (5 pts)
  const pp = getHeader(headers, "permissions-policy");
  if (pp) {
    rules.push({
      id: "permissions",
      category: "security",
      header: "Permissions-Policy",
      status: "pass",
      message: "Permissions-Policy is set",
      points: 5,
      maxPoints: 5,
    });
  } else {
    rules.push({
      id: "permissions",
      category: "security",
      header: "Permissions-Policy",
      status: "fail",
      message: "Missing Permissions-Policy — browser features aren't restricted",
      fix: "Permissions-Policy: camera=(), microphone=(), geolocation=()",
      points: 0,
      maxPoints: 5,
    });
  }

  // COOP (5 pts)
  const coop = getHeader(headers, "cross-origin-opener-policy");
  if (coop) {
    rules.push({
      id: "coop",
      category: "security",
      header: "Cross-Origin-Opener-Policy",
      status: "pass",
      message: `Cross-Origin-Opener-Policy: ${coop}`,
      points: 5,
      maxPoints: 5,
    });
  } else {
    rules.push({
      id: "coop",
      category: "security",
      header: "Cross-Origin-Opener-Policy",
      status: "warn",
      message: "Missing Cross-Origin-Opener-Policy",
      fix: "Cross-Origin-Opener-Policy: same-origin",
      points: 0,
      maxPoints: 5,
    });
  }

  // === Information Disclosure (20 pts) ===

  // Server header (10 pts)
  const server = getHeader(headers, "server");
  if (!server) {
    rules.push({
      id: "server",
      category: "disclosure",
      header: "Server",
      status: "pass",
      message: "No Server header — server software is not disclosed",
      points: 10,
      maxPoints: 10,
    });
  } else if (/\d/.test(server)) {
    rules.push({
      id: "server",
      category: "disclosure",
      header: "Server",
      status: "fail",
      message: `Server header reveals version: "${server}"`,
      fix: "Remove the Server header or strip the version number",
      points: 0,
      maxPoints: 10,
    });
  } else {
    rules.push({
      id: "server",
      category: "disclosure",
      header: "Server",
      status: "warn",
      message: `Server header present: "${server}" — consider removing it`,
      fix: "Remove the Server header entirely",
      points: 5,
      maxPoints: 10,
    });
  }

  // X-Powered-By (5 pts)
  if (!hasHeader(headers, "x-powered-by")) {
    rules.push({
      id: "powered-by",
      category: "disclosure",
      header: "X-Powered-By",
      status: "pass",
      message: "No X-Powered-By header — tech stack not disclosed",
      points: 5,
      maxPoints: 5,
    });
  } else {
    rules.push({
      id: "powered-by",
      category: "disclosure",
      header: "X-Powered-By",
      status: "fail",
      message: `X-Powered-By reveals: "${getHeader(headers, "x-powered-by")}"`,
      fix: "Remove the X-Powered-By header",
      points: 0,
      maxPoints: 5,
    });
  }

  // Tech stack headers (5 pts)
  const techHeaders = [
    "x-aspnet-version",
    "x-aspnetmvc-version",
    "x-generator",
  ];
  const foundTech = techHeaders.filter((h) => hasHeader(headers, h));
  if (foundTech.length === 0) {
    rules.push({
      id: "tech-stack",
      category: "disclosure",
      header: "Tech Stack Headers",
      status: "pass",
      message: "No tech stack headers found",
      points: 5,
      maxPoints: 5,
    });
  } else {
    rules.push({
      id: "tech-stack",
      category: "disclosure",
      header: "Tech Stack Headers",
      status: "fail",
      message: `Tech stack exposed via: ${foundTech.join(", ")}`,
      fix: `Remove these headers: ${foundTech.join(", ")}`,
      points: 0,
      maxPoints: 5,
    });
  }

  // === Cookie Security (20 pts) ===
  const setCookie = getHeader(headers, "set-cookie");
  if (setCookie) {
    const lower = setCookie.toLowerCase();
    const hasSecure = lower.includes("secure");
    const hasHttpOnly = lower.includes("httponly");
    const hasSameSite = lower.includes("samesite");

    rules.push({
      id: "cookie-secure",
      category: "cookies",
      header: "Set-Cookie: Secure",
      status: hasSecure ? "pass" : "fail",
      message: hasSecure
        ? "Cookies have Secure flag"
        : "Cookies missing Secure flag — sent over HTTP",
      fix: hasSecure ? undefined : "Add the Secure flag to all Set-Cookie headers",
      points: hasSecure ? 7 : 0,
      maxPoints: 7,
    });

    rules.push({
      id: "cookie-httponly",
      category: "cookies",
      header: "Set-Cookie: HttpOnly",
      status: hasHttpOnly ? "pass" : "fail",
      message: hasHttpOnly
        ? "Cookies have HttpOnly flag"
        : "Cookies missing HttpOnly flag — accessible to JavaScript",
      fix: hasHttpOnly
        ? undefined
        : "Add the HttpOnly flag to all Set-Cookie headers",
      points: hasHttpOnly ? 7 : 0,
      maxPoints: 7,
    });

    rules.push({
      id: "cookie-samesite",
      category: "cookies",
      header: "Set-Cookie: SameSite",
      status: hasSameSite ? "pass" : "warn",
      message: hasSameSite
        ? "Cookies have SameSite attribute"
        : "Cookies missing SameSite attribute",
      fix: hasSameSite
        ? undefined
        : "Add SameSite=Lax or SameSite=Strict to all Set-Cookie headers",
      points: hasSameSite ? 6 : 0,
      maxPoints: 6,
    });
  } else {
    // No cookies — full points (no risk)
    rules.push({
      id: "cookie-none",
      category: "cookies",
      header: "Set-Cookie",
      status: "pass",
      message: "No cookies set — no cookie security risks",
      points: 20,
      maxPoints: 20,
    });
  }

  // Group by category
  const categoryMap: Record<
    string,
    { label: string; rules: RuleResult[] }
  > = {
    security: { label: "Security Headers", rules: [] },
    disclosure: { label: "Information Disclosure", rules: [] },
    cookies: { label: "Cookie Security", rules: [] },
  };

  for (const rule of rules) {
    categoryMap[rule.category].rules.push(rule);
  }

  const categories: CategoryResult[] = Object.entries(categoryMap).map(
    ([category, data]) => ({
      category,
      label: data.label,
      earned: data.rules.reduce((sum, r) => sum + r.points, 0),
      possible: data.rules.reduce((sum, r) => sum + r.maxPoints, 0),
      rules: data.rules,
    })
  );

  const totalEarned = categories.reduce((sum, c) => sum + c.earned, 0);
  const totalPossible = categories.reduce((sum, c) => sum + c.possible, 0);
  const score = totalPossible > 0 ? Math.round((totalEarned / totalPossible) * 100) : 0;

  return {
    score,
    categories,
    passCount: rules.filter((r) => r.status === "pass").length,
    warnCount: rules.filter((r) => r.status === "warn").length,
    failCount: rules.filter((r) => r.status === "fail").length,
  };
}
