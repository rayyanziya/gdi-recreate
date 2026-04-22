import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getAuthUser } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ article: data });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const { slug, title, excerpt, content, category, tags, author, author_role, cover_image, published } = body;

  const { data: current } = await supabase
    .from("articles")
    .select("published")
    .eq("id", id)
    .single();

  const updateData: Record<string, unknown> = {
    slug, title, excerpt, content, category,
    tags: tags || "[]",
    author,
    author_role: author_role || "",
    cover_image: cover_image || "",
    published: published ?? false,
    updated_at: new Date().toISOString(),
  };

  if (published && !current?.published) {
    updateData.published_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("articles")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error || !data)
    return NextResponse.json({ error: error?.message || "Not found" }, { status: 500 });
  return NextResponse.json({ article: data });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { published } = await request.json();

  const updateData: Record<string, unknown> = {
    published,
    updated_at: new Date().toISOString(),
  };

  if (published) {
    const { data: current } = await supabase
      .from("articles")
      .select("published")
      .eq("id", id)
      .single();
    if (!current?.published) {
      updateData.published_at = new Date().toISOString();
    }
  }

  const { data, error } = await supabase
    .from("articles")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error || !data)
    return NextResponse.json({ error: error?.message || "Not found" }, { status: 500 });
  return NextResponse.json({ article: data });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { error } = await supabase.from("articles").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
