import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const secret = () =>
  new TextEncoder().encode(process.env.JWT_SECRET ?? "dev-secret-change-me");

export const hashPassword = (pw: string) => bcrypt.hash(pw, 12);
export const verifyPassword = (pw: string, hash: string) =>
  bcrypt.compare(pw, hash);

export async function signToken(payload: {
  userId: number;
  username: string;
}) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function verifyToken(
  token: string
): Promise<{ userId: number; username: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload as { userId: number; username: string };
  } catch {
    return null;
  }
}

export async function getAuthUser(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function setAuthCookie(res: NextResponse, token: string) {
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });
}

export function clearAuthCookie(res: NextResponse) {
  res.cookies.set("admin_token", "", { maxAge: 0, path: "/" });
}
