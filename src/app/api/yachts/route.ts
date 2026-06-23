import { NextRequest, NextResponse } from "next/server";
import { getYachts, getYachtBySlug, getYachtsByCategory } from "@/lib/data";

// GET /api/yachts - Get all yachts
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const category = searchParams.get("category");

  try {
    if (slug) {
      const yacht = getYachtBySlug(slug);
      if (!yacht) {
        return NextResponse.json(
          { error: "Yacht not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(yacht);
    }

    if (category) {
      const yachts = getYachtsByCategory(category);
      return NextResponse.json(yachts);
    }

    const yachts = getYachts();
    return NextResponse.json(yachts);
  } catch (error) {
    console.error("Error fetching yachts:", error);
    return NextResponse.json(
      { error: "Failed to fetch yachts" },
      { status: 500 }
    );
  }
}
