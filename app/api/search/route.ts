import { NextRequest, NextResponse } from "next/server";
import { searchMediaPage } from "@/lib/anilist";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search") ?? "";
  const type = (searchParams.get("type") ?? "ANIME") as "ANIME" | "MANGA";
  const page = Number(searchParams.get("page") ?? "1");

  const data = await searchMediaPage(search, type, page);

  return NextResponse.json(data);
}