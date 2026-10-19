import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

// This function can be marked async if using await inside
export const proxy = async (request: NextRequest) => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const user = session?.user;

  if (!user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
};

export const config = {
  matcher: ["/profile", "/settings"],
};
