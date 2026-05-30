import { NextResponse } from "next/server";
import { getDocsState, updateDocsState, DocsState } from "@/lib/docs-state";

// Prevent Vercel from caching this API route statically
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const state = await getDocsState();
    return NextResponse.json(state);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch docs state" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: Partial<DocsState> = await request.json();
    const updatedState = await updateDocsState(body);
    return NextResponse.json(updatedState);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to update docs state" }, { status: 500 });
  }
}
