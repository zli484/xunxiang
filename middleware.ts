import { NextResponse, type NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const EXCLUDE_PATHS = [
    "api",
    "_next/static",
    "_next/image",
    "favicon.ico",
    "public",
  ];

  const res = NextResponse.next();

  //   console.log("req is", req);
  const url = req.nextUrl.pathname;

  // Create a supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });
  const session = (await supabase.auth.getSession()).data.session;

  if (url.startsWith("/sign-in") || url.startsWith("/auth/callback")) {
    return NextResponse.next();
  }

  // check if path is excluded
  for (const path of EXCLUDE_PATHS) {
    if (url.startsWith(`/${path}`)) {
      return NextResponse.next();
    }
  }

  if (session) {
    if (req.nextUrl.pathname === "/") {
      console.log("redirecting to /user");
      return NextResponse.redirect(new URL("/user", req.url));
    }
  }

  console.log("req.nextUrl.pathname", req.nextUrl.pathname);
  if (!session && req.nextUrl.pathname !== "/") {
    console.log("redirecting to /sign-in");
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
