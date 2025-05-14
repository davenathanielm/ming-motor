import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { parse } from "cookie";
import { jwtVerify } from "jose";

const PUBLIC_ROUTES = ["/login", "/register", "/auth/login", "/auth/register"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log(">>> Middleware triggered on:", pathname);

  if (PUBLIC_ROUTES.includes(pathname)) {
    console.log(`>>> Skipping auth for PUBLIC route: ${pathname}`);
    return NextResponse.next();
  }

  const cookie = req.headers.get("cookie");
  console.log(">>> Raw cookie header:", cookie);

  const cookies = cookie ? parse(cookie) : {};
  const token = cookies.token;
  console.log(">>> Parsed token from cookies:", token);

  if (!token) {
    console.log(">>> No token found. Redirecting to /auth/login");
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  // else{
  //   console.log(">>> Token found. Proceeding with verification.");
  //   return NextResponse.next();
  // }



//   try {
//     const decoded = verify(token, process.env.JWT_SECRET!);
//     console.log(">>> Token is valid. Decoded payload:", decoded);
//     return NextResponse.next();
//   } catch (error) {
//     console.log(">>> Token verification failed:", error);
//     return NextResponse.redirect(new URL("/auth/login", req.url));
//   }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret); // ✅ Verify the token
    console.log("User ID:", payload.id); // 👈 You can use this later
    return NextResponse.next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.redirect(new URL("/auth/login", req.url));
}

}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|login|register|auth/login|auth/register).*)",
  ],
};  