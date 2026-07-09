import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/superadmin") && pathname !== "/superadmin/login") {
    const session = req.cookies.get("sa_session")?.value;
    if (session !== "authenticated") {
      return NextResponse.redirect(new URL("/superadmin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/superadmin/:path*"],
};
