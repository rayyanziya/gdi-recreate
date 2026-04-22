import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { hashPassword, signToken, setAuthCookie } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const { full_name, username, password } = await request.json();

  if (!full_name || !username || !password)
    return NextResponse.json({ error: "All fields required" }, { status: 400 });

  if (password.length < 6)
    return NextResponse.json(
      { error: "Password must be at least 6 characters" },
      { status: 400 }
    );

  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .eq("username", username)
    .maybeSingle();

  if (existing)
    return NextResponse.json(
      { error: "Username already taken" },
      { status: 409 }
    );

  const password_hash = await hashPassword(password);
  const { data: user, error } = await supabase
    .from("users")
    .insert({ full_name, username, password_hash })
    .select("id, username")
    .single();

  if (error || !user)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });

  const token = await signToken({ userId: user.id, username: user.username });
  const res = NextResponse.json({ ok: true });
  setAuthCookie(res, token);
  return res;
}
