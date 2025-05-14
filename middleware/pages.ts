import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";
import { parse } from "cookie";

const PUBLIC_ROUTES = ["/login", "/register"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes without auth
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  const cookie = req.headers.get("cookie");
  const cookies = cookie ? parse(cookie) : {};
  const token = cookies.token;

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!);
    // Optionally, attach user info to request if needed
    return NextResponse.next();
  } catch (error) {
    // Invalid or expired token
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}
