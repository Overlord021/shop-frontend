import { NextResponse } from "next/server";

const PROTECTED = ["/dashboard"];
const AUTH_ONLY = ["/sign-in", "/sign-up"];

function decodeBase64Url(str) {
  try {
    const base64 = str
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const padded =
      base64 +
      "=".repeat(
        (4 - (base64.length % 4)) % 4
      );

    return JSON.parse(
      Buffer.from(
        padded,
        "base64"
      ).toString("utf-8")
    );
  } catch {
    return null;
  }
}

function isValidToken(token) {
  if (
    !token ||
    typeof token !== "string"
  ) {
    return false;
  }

  const parts = token.split(".");

  if (parts.length !== 3) {
    return false;
  }

  const payload =
    decodeBase64Url(parts[1]);

  if (!payload) {
    return false;
  }

  if (
    payload.exp &&
    Date.now() >=
      payload.exp * 1000
  ) {
    return false;
  }

  return true;
}

export function middleware(request) {
  const pathname =
    request.nextUrl.pathname;

  const token =
    request.cookies.get(
      "token"
    )?.value;

  const authenticated =
    isValidToken(token);

  const isProtected =
    PROTECTED.some((route) =>
      pathname.startsWith(
        route
      )
    );

  const isAuthOnly =
    AUTH_ONLY.some((route) =>
      pathname.startsWith(
        route
      )
    );

  if (
    isProtected &&
    !authenticated
  ) {
    const response =
      NextResponse.redirect(
        new URL(
          "/sign-in",
          request.url
        )
      );

    response.cookies.delete(
      "token"
    );

    return response;
  }

  if (
    isAuthOnly &&
    authenticated
  ) {
    return NextResponse.redirect(
      new URL(
        "/dashboard",
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/sign-in",
    "/sign-up",
  ],
};