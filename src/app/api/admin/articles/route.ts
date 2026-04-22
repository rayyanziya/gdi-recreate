import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getAuthUser } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("articles")
    .select("id, slug, title, category, author, published, published_at, created_at")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ articles: data });
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { slug, title, excerpt, content, category, tags, author, author_role, cover_image, published } = body;

  if (!slug || !title || !excerpt || !content || !category || !author)
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

  const { data, error } = await supabase
    .from("articles")
    .insert({
      slug,
      title,
      excerpt,
      content,
      category,
      tags: tags || "[]",
      author,
      author_role: author_role || "",
      cover_image: cover_image || "",
      published: published ?? false,
      published_at: published ? new Date().toISOString() : null,
      created_by: user.userId,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505")
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ article: data }, { status: 201 });
}
