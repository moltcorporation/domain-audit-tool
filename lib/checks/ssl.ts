import * as tls from "tls";

export interface CertificateInfo {
  subject: string;
  issuer: string;
  validFrom: string;
  validTo: string;
  daysUntilExpiry: number;
  isExpired: boolean;
  serialNumber: string;
  fingerprint256: string;
  sans: string[];
  keySize: number | null;
  keyType: string | null;
  protocol: string | null;
  cipher: string | null;
  chainDepth: number;
  selfSigned: boolean;
}

export interface SslIssue {
  id: string;
  severity: "pass" | "warn" | "fail";
  category: string;
  message: string;
  points: number;
  maxPoints: number;
}

export interface SslResult {
  domain: string;
  certificate: CertificateInfo;
  score: number;
  grade: string;
  issues: SslIssue[];
}

function getGrade(score: number): string {
  if (score >= 95) return "A+";
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 50) return "D";
  return "F";
}

function connectAndGetCert(
  domain: string,
  port: number = 443
): Promise<{
  cert: tls.DetailedPeerCertificate;
  protocol: string | null;
  cipher: string | null;
  chainDepth: number;
}> {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(
      {
        host: domain,
        port,
        servername: domain,
        rejectUnauthorized: false, // We want to inspect even invalid certs
        timeout: 10000,
      },
      () => {
        const cert = socket.getPeerCertificate(true);
        const protocol = socket.getProtocol();
        const cipherInfo = socket.getCipher();
        const cipher = cipherInfo?.name || null;

        // Count chain depth
        let chainDepth = 0;
        let current: tls.DetailedPeerCertificate | undefined = cert;
        while (current && current.issuerCertificate && current.issuerCertificate !== current) {
          chainDepth++;
          current = current.issuerCertificate;
          if (chainDepth > 10) break; // Safety limit
        }

        socket.destroy();
        resolve({ cert, protocol, cipher, chainDepth });
      }
    );

    socket.on("error", (err) => {
      socket.destroy();
      reject(err);
    });

    socket.on("timeout", () => {
      socket.destroy();
      reject(new Error("Connection timed out"));
    });
  });
}

export async function checkSsl(domain: string): Promise<SslResult> {
  const { cert, protocol, cipher, chainDepth } = await connectAndGetCert(domain);

  const validFrom = cert.valid_from;
  const validTo = cert.valid_to;
  const now = Date.now();
  const expiryDate = new Date(validTo).getTime();
  const daysUntilExpiry = Math.floor((expiryDate - now) / (1000 * 60 * 60 * 24));
  const isExpired = daysUntilExpiry < 0;

  // Extract SANs
  const sans: string[] = [];
  if (cert.subjectaltname) {
    sans.push(
      ...cert.subjectaltname
        .split(",")
        .map((s) => s.trim().replace(/^DNS:/, ""))
    );
  }

  // Key info
  let keySize: number | null = null;
  let keyType: string | null = null;
  if (cert.bits) keySize = cert.bits;
  if (cert.asn1Curve) {
    keyType = "ECDSA";
  } else if (cert.bits) {
    keyType = "RSA";
  }

  const selfSigned =
    cert.subject?.CN === cert.issuer?.CN &&
    cert.subject?.O === cert.issuer?.O;

  const certificate: CertificateInfo = {
    subject: cert.subject?.CN || "Unknown",
    issuer: cert.issuer?.O || cert.issuer?.CN || "Unknown",
    validFrom,
    validTo,
    daysUntilExpiry,
    isExpired,
    serialNumber: cert.serialNumber || "Unknown",
    fingerprint256: cert.fingerprint256 || "Unknown",
    sans,
    keySize,
    keyType,
    protocol,
    cipher,
    chainDepth,
    selfSigned,
  };

  // Score the certificate
  const issues = scoreCertificate(certificate);
  const score = Math.max(
    0,
    Math.min(100, issues.reduce((sum, i) => sum + i.points, 0))
  );
  const grade = getGrade(score);

  return { domain, certificate, score, grade, issues };
}

function scoreCertificate(cert: CertificateInfo): SslIssue[] {
  const issues: SslIssue[] = [];

  // 1. Expiration (30 pts)
  if (cert.isExpired) {
    issues.push({
      id: "expiry",
      severity: "fail",
      category: "Expiration",
      message: `Certificate expired ${Math.abs(cert.daysUntilExpiry)} days ago.`,
      points: 0,
      maxPoints: 30,
    });
  } else if (cert.daysUntilExpiry < 7) {
    issues.push({
      id: "expiry",
      severity: "fail",
      category: "Expiration",
      message: `Certificate expires in ${cert.daysUntilExpiry} days. Renew immediately.`,
      points: 5,
      maxPoints: 30,
    });
  } else if (cert.daysUntilExpiry < 30) {
    issues.push({
      id: "expiry",
      severity: "warn",
      category: "Expiration",
      message: `Certificate expires in ${cert.daysUntilExpiry} days. Renew soon.`,
      points: 10,
      maxPoints: 30,
    });
  } else if (cert.daysUntilExpiry < 90) {
    issues.push({
      id: "expiry",
      severity: "pass",
      category: "Expiration",
      message: `Certificate expires in ${cert.daysUntilExpiry} days.`,
      points: 20,
      maxPoints: 30,
    });
  } else {
    issues.push({
      id: "expiry",
      severity: "pass",
      category: "Expiration",
      message: `Certificate valid for ${cert.daysUntilExpiry} more days.`,
      points: 30,
      maxPoints: 30,
    });
  }

  // 2. TLS Version (25 pts)
  if (cert.protocol) {
    if (cert.protocol === "TLSv1.3") {
      issues.push({
        id: "tls-version",
        severity: "pass",
        category: "TLS Version",
        message: "Using TLS 1.3 (latest).",
        points: 25,
        maxPoints: 25,
      });
    } else if (cert.protocol === "TLSv1.2") {
      issues.push({
        id: "tls-version",
        severity: "pass",
        category: "TLS Version",
        message: "Using TLS 1.2. Consider enabling TLS 1.3 for better performance.",
        points: 15,
        maxPoints: 25,
      });
    } else {
      issues.push({
        id: "tls-version",
        severity: "fail",
        category: "TLS Version",
        message: `Using ${cert.protocol}. This version is insecure. Upgrade to TLS 1.2+.`,
        points: 0,
        maxPoints: 25,
      });
    }
  } else {
    issues.push({
      id: "tls-version",
      severity: "warn",
      category: "TLS Version",
      message: "Could not determine TLS version.",
      points: 10,
      maxPoints: 25,
    });
  }

  // 3. CA Trust (15 pts)
  if (cert.selfSigned) {
    issues.push({
      id: "ca-trust",
      severity: "fail",
      category: "CA Trust",
      message: "Self-signed certificate. Browsers will show a security warning.",
      points: 0,
      maxPoints: 15,
    });
  } else {
    issues.push({
      id: "ca-trust",
      severity: "pass",
      category: "CA Trust",
      message: `Issued by ${cert.issuer}.`,
      points: 15,
      maxPoints: 15,
    });
  }

  // 4. Key Strength (15 pts)
  if (cert.keyType === "ECDSA") {
    const strong = cert.keySize && cert.keySize >= 256;
    issues.push({
      id: "key-strength",
      severity: strong ? "pass" : "warn",
      category: "Key Strength",
      message: `ECDSA ${cert.keySize || "unknown"}-bit key.${strong ? "" : " Consider using 256-bit or higher."}`,
      points: strong ? 15 : 10,
      maxPoints: 15,
    });
  } else if (cert.keyType === "RSA") {
    if (cert.keySize && cert.keySize >= 2048) {
      issues.push({
        id: "key-strength",
        severity: "pass",
        category: "Key Strength",
        message: `RSA ${cert.keySize}-bit key.`,
        points: 15,
        maxPoints: 15,
      });
    } else {
      issues.push({
        id: "key-strength",
        severity: "fail",
        category: "Key Strength",
        message: `RSA ${cert.keySize || "unknown"}-bit key. Minimum recommended: 2048-bit.`,
        points: 5,
        maxPoints: 15,
      });
    }
  } else {
    issues.push({
      id: "key-strength",
      severity: "warn",
      category: "Key Strength",
      message: "Could not determine key type or strength.",
      points: 10,
      maxPoints: 15,
    });
  }

  // 5. Chain Validity (15 pts)
  if (cert.chainDepth >= 1) {
    issues.push({
      id: "chain",
      severity: "pass",
      category: "Certificate Chain",
      message: `Valid certificate chain with ${cert.chainDepth + 1} certificates.`,
      points: 15,
      maxPoints: 15,
    });
  } else if (cert.selfSigned) {
    issues.push({
      id: "chain",
      severity: "fail",
      category: "Certificate Chain",
      message: "No certificate chain (self-signed).",
      points: 0,
      maxPoints: 15,
    });
  } else {
    issues.push({
      id: "chain",
      severity: "warn",
      category: "Certificate Chain",
      message: "Could not verify certificate chain depth.",
      points: 10,
      maxPoints: 15,
    });
  }

  return issues;
}
