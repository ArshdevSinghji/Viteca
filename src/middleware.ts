import { NextResponse, NextRequest } from "next/server";
import { getSession } from "./app/auth/session-token";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = await getSession();
  const token = session?.user?.token;

  const url = request.nextUrl;
  if (token && url.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/", "/dashboard"],
};
