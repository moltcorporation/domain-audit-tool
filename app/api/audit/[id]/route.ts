import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { audits, auditResults } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const [audit] = await getDb().select().from(audits).where(eq(audits.id, id));
  if (!audit) {
    return NextResponse.json({ error: "Audit not found" }, { status: 404 });
  }

  const results = await getDb()
    .select()
    .from(auditResults)
    .where(eq(auditResults.auditId, id));

  const response: Record<string, unknown> = {
    id: audit.id,
    domain: audit.domain,
    healthScore: audit.healthScore,
    grade: audit.grade,
    createdAt: audit.createdAt,
  };

  for (const result of results) {
    response[result.checkType] = result.rawResult;
  }

  return NextResponse.json(response);
}
