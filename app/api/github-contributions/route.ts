import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "bJOE2001";
  const year = searchParams.get("year") || "all";

  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=${encodeURIComponent(year)}`,
      {
        next: { revalidate: 3600 },
        headers: {
          "User-Agent": "Nextjs-Portfolio",
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `GitHub API error: ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch GitHub contributions" },
      { status: 500 }
    );
  }
}
