import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl; //this is url path accessed by user
    const role = req.nextauth.token?.role; // this is the role of user from token
    
    const ownerOnlyPaths = ["/employee", "/summary"]; // Protect specific routes for "owner" role

    // this is to check if the user is trying to access a path that is only for owner
    const isOwnerOnly = ownerOnlyPaths.some((path) => //some is javascript method to check if at least one element in the array pass the test then it will return true or false
      pathname.startsWith(path)
    );

    if (isOwnerOnly && role !== "owner") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next(); // Allow access
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Allow only authenticated users and if user is not authenticated redirect to signIn automatic
    },
    pages: {
      signIn: "/auth/login", // Redirect to this page if not authenticated
      error: "/auth/login", // Error page
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/product/:path*",
    "/supplier/:path*",
    "/warehouse/:path*",
    "/employee/:path*",
    "/addEmployee",
    "/summary/:path*",
    "/auth/register/:path*",
  ],
};


// information
// 1. withAuth: is a function that is used to protect the routes and redirect to the login page if the user is not authenticated 
//  - withAuth is function from next-auth middleware
// pages : {sign in: "/auth/login"}: is the page that will be redirected if the user is not authenticated
// 2. matcher: is used to match the routes that will be protected by the middleware
// 3. config: is used to configure the middleware and define the routes that will be protected by the middleware
// 4. /dashboard/:path* : is the route that will be protected by the middleware and all the routes that start with /dashboard will be protected by the middleware
//  - path it means every route start with dashboard etc dashboaboard/ list, dashboard/color etc it will can't access without login



