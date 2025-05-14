import { withAuth } from "next-auth/middleware";

// Protect these routes
export default withAuth({
  pages: {
    signIn: "/auth/login",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/product/:path*",
    "/supplier/:path*",
    "/warehouse/:path*",
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



