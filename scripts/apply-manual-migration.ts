import { neon } from "@neondatabase/serverless";
import * as fs from "fs";

const sql = neon(process.env.DATABASE_URL!);

async function main() {
  console.log("🔄 Applying manual migrations...");

  const migration = fs.readFileSync("drizzle/0001_add_enrichment_fields.sql", "utf-8");
  const statements = migration.split(";").filter((s) => s.trim());

  for (const statement of statements) {
    try {
      await sql(statement);
      console.log("✓", statement.trim().substring(0, 50) + "...");
    } catch (err) {
      const error = err as any;
      if (error.message?.includes("already exists")) {
        console.log("⚠ Column already exists (skipped)");
      } else {
        console.error("❌ Error:", error.message);
      }
    }
  }

  console.log("\n✅ Migrations applied");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
