import { pgTable, text, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { nanoid } from "../lib/id";

export const audits = pgTable("audits", {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  domain: text("domain").notNull(),
  healthScore: integer("health_score"),
  grade: text("grade"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const auditResults = pgTable("audit_results", {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  auditId: text("audit_id").notNull().references(() => audits.id),
  checkType: text("check_type").notNull(), // dns, ssl, headers, whois, meta, propagation
  score: integer("score"),
  grade: text("grade"),
  rawResult: jsonb("raw_result").notNull(),
});
