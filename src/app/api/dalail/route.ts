import { NextRequest, NextResponse } from "next/server";
import { getTurso } from "@/lib/turso";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  try {
    const db = getTurso();

    let sql = "SELECT * FROM dalail";
    const conditions: string[] = [];
    const args: string[] = [];

    if (q) {
      conditions.push(
        "(title LIKE ? OR content_english LIKE ? OR content_urdu LIKE ? OR content_arabic LIKE ?)"
      );
      const like = `%${q}%`;
      args.push(like, like, like, like);
    }

    if (category && category !== "All") {
      conditions.push("category = ?");
      args.push(category);
    }

    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    sql += " ORDER BY rowid DESC";

    const result = await db.execute(sql, args);

    return NextResponse.json({ records: result.rows, total: result.rows.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch dalail records", details: message },
      { status: 500 }
    );
  }
}
