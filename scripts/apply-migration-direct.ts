import { Pool } from "pg";
import * as fs from "fs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL_UNPOOLED,
});

async function main() {
  const client = await pool.connect();

  try {
    console.log("🔄 Applying manual migrations...");

    const migration = fs.readFileSync("drizzle/0001_add_enrichment_fields.sql", "utf-8");
    const statements = migration.split(";").filter((s) => s.trim());

    for (const statement of statements) {
      try {
        await client.query(statement);
        console.log("✓", statement.trim().substring(0, 60) + "...");
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
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
