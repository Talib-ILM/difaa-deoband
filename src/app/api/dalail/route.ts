import { NextRequest, NextResponse } from "next/server";
import { getPocketBase } from "@/lib/pocketbase";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  try {
    const pb = getPocketBase();

    const filterParts: string[] = [];

    if (q) {
      filterParts.push(
        `(title ~ "${q}" || content_english ~ "${q}" || content_urdu ~ "${q}" || content_arabic ~ "${q}")`
      );
    }

    if (category && category !== "All") {
      filterParts.push(`category = "${category}"`);
    }

    const filter = filterParts.length > 0 ? filterParts.join(" && ") : "";

    const result = await pb.collection("dalail").getList(1, 100, {
      filter,
      sort: "-created",
    });

    return NextResponse.json({ records: result.items, total: result.totalItems });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch dalail records", details: message },
      { status: 500 }
    );
  }
}
