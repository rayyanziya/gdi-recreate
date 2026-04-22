import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyPassword, signToken, setAuthCookie } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (!username || !password)
    return NextResponse.json(
      { error: "Username and password required" },
      { status: 400 }
    );

  const { data: user } = await supabase
    .from("users")
    .select("id, username, password_hash")
    .eq("username", username)
    .maybeSingle();

  if (!user)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = await signToken({ userId: user.id, username: user.username });
  const res = NextResponse.json({ ok: true });
  setAuthCookie(res, token);
  return res;
}
