import { NextResponse, NextRequest } from "next/server";
import { getSessionToken } from "./app/auth/session-token";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getSessionToken();

  const url = request.nextUrl;
  console.log("URL: ", url.pathname);
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
