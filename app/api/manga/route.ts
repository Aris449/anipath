import { NextRequest, NextResponse } from "next/server";
import { getMangaPage } from "@/lib/anilist";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") ?? "1");

  const genre = searchParams.get("genre") ?? undefined;
  const tag = searchParams.get("tag") ?? undefined;
  const sort = searchParams.get("sort") ?? undefined;
  const format = searchParams.get("format") ?? undefined;
  const status = searchParams.get("status") ?? undefined;

  const data = await getMangaPage(page, {
    genre,
    tag,
    sort,
    format,
    status,
  });

  return NextResponse.json(data);
}